// Fail-closed self-test. It spends nothing: the API keys are removed first, and the model
// outputs are replayed from a saved pack. Each case removes or breaks one part of the reviewer
// and checks that the change routes up, never down, and that the pack says why at the top.
//
//   npm run selftest                 (uses packs/ju26-issue-2283.run2.json)
//   npm run selftest -- <pack.json>  (any saved pack)
//   npm run selftest -- --bad-key    (also makes one real, free, rejected call with an invalid Claude key)
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderMarkdown, replayFrom, review } from "./review.ts";
import type { Pack, Replay } from "./review.ts";
import { newLedger } from "./ledger.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const file = args.find((a) => a.endsWith(".json")) ?? join(ROOT, "packs", "ju26-issue-2283.run2.json");
const src = JSON.parse(readFileSync(file, "utf8"));

// Nothing below may reach a model.
delete process.env.ANTHROPIC_API_KEY;
delete process.env.GEMINI_API_KEY;
process.env.MODEL_RETRY_WAIT_MS = "10";

const opts = { repo: resolve(ROOT, "..", "tieto-messagepack"), branch: src.meta.branch as string, at: src.meta.commit as string, requirementId: src.meta.requirement_id as string, requirement: src.requirement as string, base: src.meta.base as string, tests: true, breaker: true, workRoot: join(ROOT, ".work"), ledger: newLedger() };
const saved = (): Replay => structuredClone(replayFrom(src, file, "full"));
const wholeParts = (p: Pack) => p.meta.missing.filter((m) => m.scope === "whole").map((m) => m.part);
const bannerFirst = (p: Pack) => {
  const md = renderMarkdown(p);
  const banner = md.indexOf("REVIEW INCOMPLETE");
  return banner > 0 && banner < md.indexOf("## Routing");
};
/** Every changed code line is on the owner's list. */
const readsEverything = (p: Pack) => p.routing.reading_load.code_lines > 0 && p.routing.reading_load.must_read_lines === p.routing.reading_load.code_lines;

let failed = 0;
async function check(name: string, run: () => Promise<string>) {
  try {
    console.log(`PASS  ${name}: ${await run()}`);
  } catch (e) {
    failed++;
    console.log(`FAIL  ${name}: ${String((e as Error).message).split("\n")[0]}`);
  }
}
const line = (p: Pack) => `${p.routing.level}, reads ${p.routing.reading_load.must_read_lines}/${p.routing.reading_load.code_lines} code lines`;

const normal = await review({ ...opts, replay: saved() });

await check("baseline: both models replayed", async () => {
  const rl = normal.routing.reading_load;
  assert.deepEqual(wholeParts(normal), [], "no part should be missing");
  assert.equal(rl.must_read_lines + rl.released_lines, rl.code_lines, "every code line is either must-read or released");
  assert.equal(normal.routing.lines.reduce((n, f) => n + (f.kind === "doc" || f.kind === "generated" ? 0 : f.must_read_lines), 0), rl.must_read_lines, "per-file ranges add up to the load");
  return line(normal);
});

await check("no API keys (live path, no replay)", async () => {
  const p = await review({ ...opts });
  assert.equal(p.routing.level, "full read");
  assert.ok(wholeParts(p).includes("author") && wholeParts(p).includes("breaker"), "banner must name author and breaker");
  assert.ok(readsEverything(p), "nothing may be released");
  assert.ok(p.files.filter((f) => f.kind !== "generated").every((f) => p.routing.must_read.some((m) => m.path === f.path)), "every non-generated file is on the list");
  assert.ok(bannerFirst(p), "banner must sit above the routing line");
  assert.equal(p.meta.cost_usd.total, 0);
  return line(p);
});

await check("author returned 0 claims", async () => {
  const r = saved();
  r.author!.claims = [];
  const p = await review({ ...opts, replay: r });
  assert.equal(p.routing.level, "full read");
  assert.ok(p.meta.missing.some((m) => m.part === "author" && m.reason.includes("0 claims")));
  assert.ok(readsEverything(p) && bannerFirst(p));
  return line(p);
});

await check("author output missing (call failed)", async () => {
  const r = saved();
  r.author = null;
  const p = await review({ ...opts, replay: r });
  assert.equal(p.routing.level, "full read");
  assert.ok(wholeParts(p).includes("author") && readsEverything(p) && bannerFirst(p));
  return line(p);
});

await check("breaker switched off (--no-breaker)", async () => {
  const p = await review({ ...opts, breaker: false, replay: saved() });
  assert.notEqual(p.routing.level, "light check", "focused read at minimum");
  assert.ok(wholeParts(p).includes("breaker") && bannerFirst(p));
  assert.equal(p.routing.reading_load.released_lines, 0, "an unchallenged claim releases nothing");
  return line(p);
});

await check("breaker output missing (call failed)", async () => {
  const r = saved();
  r.breaker = null;
  const p = await review({ ...opts, replay: r });
  assert.notEqual(p.routing.level, "light check");
  assert.ok(wholeParts(p).includes("breaker") && bannerFirst(p));
  assert.equal(p.routing.reading_load.released_lines, 0);
  return line(p);
});

await check("breaker silent on one claim", async () => {
  const releaser = normal.routing.reading_load.released_by[0]?.claim;
  const target = normal.claims.find((c) => c.id === releaser) ?? normal.claims.find((c) => c.releases_lines) ?? normal.claims[0];
  const r = saved();
  r.breaker!.verdicts = r.breaker!.verdicts.filter((v) => v.claim_id !== target.id);
  const p = await review({ ...opts, replay: r });
  assert.equal(p.claims.find((c) => c.id === target.id)!.releases_lines, false, "a claim without a verdict releases nothing");
  assert.ok(p.meta.missing.some((m) => m.part === "breaker" && m.reason.includes(target.id)), "banner names the claim");
  if (releaser) assert.ok(p.routing.reading_load.must_read_lines > normal.routing.reading_load.must_read_lines, "its lines go back on the list");
  else assert.ok(p.routing.reading_load.must_read_lines >= normal.routing.reading_load.must_read_lines);
  return `${target.id} unchallenged; ${line(p)}`;
});

await check("tests switched off (--no-tests)", async () => {
  const p = await review({ ...opts, tests: false, replay: saved() });
  assert.ok(wholeParts(p).includes("tests") && bannerFirst(p));
  assert.equal(p.routing.reading_load.released_lines, 0, "no test run, nothing released");
  assert.notEqual(p.routing.level, "light check");
  return line(p);
});

await check("requirement quote that is not in the requirement", async () => {
  const r = saved();
  r.author!.claims[0].requirement_quote = "The generator must also brew coffee on every build.";
  const p = await review({ ...opts, replay: r });
  const c = p.claims.find((x) => x.id === r.author!.claims[0].id)!;
  assert.equal(c.status, "disputed");
  assert.ok(c.quote_problem && !c.releases_lines);
  return `${c.id} disputed`;
});

await check("author confidence moves nothing", async () => {
  const up = saved();
  const down = saved();
  for (const c of up.author!.claims) c.confidence = "high";
  for (const c of down.author!.claims) c.confidence = "low";
  const a = await review({ ...opts, replay: up });
  const b = await review({ ...opts, replay: down });
  assert.equal(a.routing.level, b.routing.level);
  assert.deepEqual(a.routing.lines, b.routing.lines, "the reading list must not depend on stated confidence");
  return `all "high" and all "low" give the same list (${line(a)})`;
});

await check("the breaker can only add reading", async () => {
  const noBreaker = await review({ ...opts, replay: { ...saved(), layers: "author" } });
  const det = await review({ ...opts, replay: { ...saved(), layers: "det" } });
  assert.ok(noBreaker.meta.ablation, "a pack with a layer removed must say so");
  assert.ok(noBreaker.routing.reading_load.must_read_lines <= normal.routing.reading_load.must_read_lines, "adding the breaker never lowers the load");
  assert.ok(readsEverything(det), "deterministic layer alone releases no code line");
  return `load without models ${det.routing.reading_load.must_read_lines}, with Claude only ${noBreaker.routing.reading_load.must_read_lines}, with both ${normal.routing.reading_load.must_read_lines} of ${normal.routing.reading_load.code_lines}`;
});

await check("reviewer crash (the change cannot be read)", async () => {
  const p = await review({ ...opts, repo: join(ROOT, ".work", "no-such-repo") });
  assert.equal(p.routing.level, "full read");
  assert.ok(wholeParts(p).includes("reviewer") && bannerFirst(p));
  assert.ok(p.routing.must_read.length > 0, "the owner is sent to the whole change");
  return `${p.routing.level}: ${p.meta.missing.map((m) => m.part).join(", ")}`;
});

if (args.includes("--bad-key"))
  await check("Claude call rejected (invalid key, real call, free)", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-invalid-selftest";
    const p = await review({ ...opts });
    delete process.env.ANTHROPIC_API_KEY;
    assert.equal(p.routing.level, "full read");
    assert.ok(p.meta.missing.some((m) => m.part === "author" && m.reason.includes("failed")) && readsEverything(p) && bannerFirst(p));
    return `${line(p)}; ${p.meta.missing.find((m) => m.part === "author")!.reason.slice(0, 90)}`;
  });

console.log(failed ? `\n${failed} case(s) FAILED` : "\nAll fail-closed cases pass. No model produced output and nothing was spent.");
process.exit(failed ? 1 : 0);

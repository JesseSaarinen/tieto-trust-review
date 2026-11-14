// CLI: review | regrade | batch | stats | signoff | ledger
import { spawn } from "node:child_process";
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { review, renderMarkdown, replayFrom } from "./review.ts";
import type { Layers, Pack } from "./review.ts";
import { loadLedger, newLedger, recordEscape, recordFinding, recordReview, recordSignoff, saveLedger } from "./ledger.ts";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
try {
  process.loadEnvFile(join(ROOT, ".env"));
} catch {
  /* no .env: no model call is made and the pack fails closed (full read) */
}
const LEDGER = join(ROOT, "ledger.json");
const DEFAULT_REPO = resolve(ROOT, "..", "tieto-messagepack");

const [cmd, ...rest] = process.argv.slice(2);

async function main() {
  if (cmd === "review") {
    const { values } = parseArgs({
      args: rest,
      options: {
        branch: { type: "string" },
        req: { type: "string" },
        "req-file": { type: "string" },
        repo: { type: "string", default: DEFAULT_REPO },
        base: { type: "string" },
        out: { type: "string", default: join(ROOT, "packs") },
        "no-tests": { type: "boolean", default: false },
        "no-breaker": { type: "boolean", default: false },
        tag: { type: "string" },
        "no-ledger": { type: "boolean", default: false },
      },
    });
    if (!values.branch || !values.req) throw new Error("usage: review --branch <b> --req <REQ-id> [--req-file f] [--repo dir] [--base sha] [--no-tests] [--no-breaker] [--tag name] [--no-ledger]");
    const reqFile = values["req-file"] ?? join(ROOT, "requirements", `${values.req}.md`);
    const requirement = readFileSync(reqFile, "utf8");
    // Measurement runs (--no-ledger) neither read nor write the trust ledger.
    const ledger = values["no-ledger"] ? newLedger() : loadLedger(LEDGER);
    const pack = await review({
      repo: values.repo!,
      branch: values.branch,
      requirementId: values.req,
      requirement,
      base: values.base,
      tests: !values["no-tests"],
      breaker: !values["no-breaker"],
      workRoot: join(ROOT, ".work"),
      ledger,
    });
    mkdirSync(values.out!, { recursive: true });
    const name = `${values.branch.replace(/[\/]/g, "_")}${values.tag ? "." + values.tag : ""}`;
    save(values.out!, name, pack);
    if (!values["no-ledger"]) recordReview(ledger, [...new Set(pack.files.filter((f) => f.kind !== "generated").map((f) => f.area))], pack.meta.pack_id);
    if (!values["no-ledger"]) saveLedger(LEDGER, ledger);
    console.log(summary(name, pack));
    console.log(`  -> ${join(values.out!, name + ".md")}`);
    return;
  }

  // Rebuild packs from saved model outputs, with one or both models removed. No model is called.
  if (cmd === "regrade") {
    const { values } = parseArgs({
      args: rest,
      options: {
        pack: { type: "string" },
        tag: { type: "string" },
        layers: { type: "string", default: "all" },
        "no-tests": { type: "boolean", default: false },
        "no-breaker": { type: "boolean", default: false },
        suffix: { type: "string" },
        repo: { type: "string", default: DEFAULT_REPO },
        out: { type: "string", default: join(ROOT, "packs") },
      },
    });
    if (!values.pack && !values.tag) throw new Error("usage: regrade (--pack packs/x.json | --tag run1) [--layers det|author|full|all] [--no-tests] [--no-breaker] [--suffix name] [--repo dir] [--out dir]\n  det = deterministic checks and tests only (L0), author = + Claude with the breaker removed (L1), full = both models under today's rules (L2)");
    const want: Layers[] = values.layers === "all" ? ["det", "author", "full"] : [values.layers as Layers];
    if (want.some((l) => !["det", "author", "full"].includes(l))) throw new Error("--layers must be det, author, full or all");
    const sources = values.pack ? [values.pack] : readdirSync(values.out!).filter((f) => f.endsWith(`.${values.tag}.json`)).sort().map((f) => join(values.out!, f));
    if (!sources.length) throw new Error(`no packs match *.${values.tag}.json in ${values.out}`);
    for (const file of sources) {
      const src = JSON.parse(readFileSync(file, "utf8"));
      for (const layers of want) {
        const pack = await review({
          repo: values.repo!,
          branch: src.meta.branch,
          at: src.meta.commit,
          requirementId: src.meta.requirement_id,
          requirement: src.requirement,
          base: src.meta.base,
          tests: !values["no-tests"] && (src.meta.options?.tests ?? true),
          breaker: !values["no-breaker"],
          workRoot: join(ROOT, ".work"),
          ledger: newLedger(),
          replay: replayFrom(src, file, layers),
        });
        const name = `${basename(file, ".json")}.${values.suffix ?? LAYER_TAG[layers]}`;
        save(values.out!, name, pack);
        console.log(summary(name, pack));
      }
    }
    return;
  }

  // Run many reviews as child processes. Finished packs are skipped, so a batch that died can be started again.
  if (cmd === "batch") {
    const { values } = parseArgs({
      args: rest,
      options: {
        tag: { type: "string" },
        parallel: { type: "string", default: "4" },
        only: { type: "string", default: "" },
        force: { type: "boolean", default: false },
        "no-tests": { type: "boolean", default: false },
        "no-breaker": { type: "boolean", default: false },
        out: { type: "string", default: join(ROOT, "packs") },
      },
    });
    if (!values.tag) throw new Error("usage: batch --tag <name> [--parallel 4] [--only branch,branch] [--force] [--no-tests] [--no-breaker]");
    const only = values.only.split(",").map((x) => x.trim()).filter(Boolean);
    const unknown = only.filter((b) => !BRANCHES[b]);
    if (unknown.length) throw new Error(`unknown branch(es): ${unknown.join(", ")}`);
    const wanted = only.length ? only : Object.keys(BRANCHES);
    const todo = wanted.filter((b) => {
      const f = join(values.out!, `${b}.${values.tag}.json`);
      if (values.force || !existsSync(f)) return true;
      const p: Pack = JSON.parse(readFileSync(f, "utf8"));
      // Keep a finished pack; redo one where a model call failed or the reviewer crashed.
      return (p.meta.missing ?? []).some((m) => m.scope === "whole" && /failed|crashed/.test(m.reason));
    });
    const log = join(ROOT, ".work", `batch-${values.tag}.log`);
    mkdirSync(dirname(log), { recursive: true });
    const say = (line: string) => {
      console.log(line);
      appendFileSync(log, `${new Date().toISOString()} ${line}\n`);
    };
    say(`BATCH ${values.tag}: ${todo.length} to run, ${wanted.length - todo.length} already done, ${values.parallel} at a time`);
    const queue = [...todo];
    const worker = async () => {
      for (let b = queue.shift(); b; b = queue.shift()) {
        const branch = b;
        const args = ["src/cli.ts", "review", "--branch", branch, "--req", BRANCHES[branch], "--tag", values.tag!, "--no-ledger", "--out", values.out!];
        if (values["no-tests"]) args.push("--no-tests");
        if (values["no-breaker"]) args.push("--no-breaker");
        const out = await new Promise<string>((done) => {
          const child = spawn(process.execPath, args, { cwd: ROOT });
          let buf = "";
          child.stdout.on("data", (d) => (buf += d));
          child.stderr.on("data", (d) => (buf += d));
          child.on("error", (e) => done(`${branch}: FAILED to start (${e.message})`));
          child.on("close", (code) => done(buf.split("\n").find((l) => l.startsWith(branch + ".")) ?? `${branch}: FAILED, exit ${code}: ${buf.trim().split("\n").slice(-2).join(" / ").slice(0, 300)}`));
        });
        say(out);
      }
    };
    await Promise.all(Array.from({ length: Math.max(1, Number(values.parallel) || 4) }, worker));
    say(`BATCH DONE ${values.tag}`);
    console.log(stats(values.out!, values.tag));
    return;
  }

  // Table of saved packs for one tag: routing, reading load, cost, time.
  if (cmd === "stats") {
    const { values } = parseArgs({ args: rest, options: { tag: { type: "string" }, out: { type: "string", default: join(ROOT, "packs") } } });
    if (!values.tag) throw new Error("usage: stats --tag <name>");
    console.log(stats(values.out!, values.tag));
    return;
  }

  if (cmd === "signoff") {
    const { values } = parseArgs({
      args: rest,
      options: {
        pack: { type: "string" },
        owner: { type: "string" },
        decision: { type: "string" },
        risk: { type: "string", default: "" },
        ack: { type: "string", default: "" },
        read: { type: "string", default: "" },
        note: { type: "string", default: "" },
        "accept-finding": { type: "string", default: "" },
        "reject-finding": { type: "string", default: "" },
      },
    });
    if (!values.pack || !values.owner || !values.decision) throw new Error("usage: signoff --pack p.json --owner name --decision accept|request-changes|reject --risk text [--ack R1,R2] [--read a,b] [--accept-finding F1] [--reject-finding F2]");
    if (!["accept", "request-changes", "reject"].includes(values.decision)) throw new Error("decision must be accept, request-changes or reject");
    const pack: Pack = JSON.parse(readFileSync(values.pack, "utf8"));
    const acks = values.ack.split(",").map((s) => s.trim()).filter(Boolean);
    const missing = pack.refusals.map((r) => r.id).filter((id) => !acks.includes(id));
    if (values.decision === "accept" && missing.length)
      throw new Error(`Cannot accept: refusals not acknowledged: ${missing.join(", ")}. The AI refused to decide these; the owner must read them and pass --ack.`);
    if (values.decision === "accept" && !values.risk.trim()) throw new Error("Cannot accept without stating the residual risk you accept (--risk).");
    const read = values.read.split(",").map((s) => s.trim()).filter(Boolean);
    const unread = pack.routing.must_read.map((m) => m.path).filter((p) => !read.some((r) => p.endsWith(r)));
    const record = {
      record_type: "owner-signoff/v1",
      signed_at: new Date().toISOString(),
      owner: values.owner,
      decision: values.decision,
      requirement_id: pack.meta.requirement_id,
      branch: pack.meta.branch,
      commit: pack.meta.commit,
      pack_id: pack.meta.pack_id,
      routing: pack.routing.level,
      checked: {
        by_tests: pack.tests.status === "ran" ? `${pack.tests.passed} passed / ${pack.tests.failed} failed (${pack.tests.projects.join(", ")})` : `not run: ${pack.tests.reason}`,
        by_static_checks: pack.static_checks.filter((s) => s.result !== "n/a").map((s) => `${s.id} ${s.result}`),
        by_breaker: `${pack.meta.breaker_model}: ${pack.claims.filter((c) => c.breaker?.verdict === "upheld").length} upheld, ${pack.claims.filter((c) => c.breaker?.verdict === "disputed").length} disputed, ${pack.claims.filter((c) => c.breaker?.verdict === "cannot_tell").length} cannot tell`,
        claims_by_method: Object.fromEntries(["test run", "static check", "AI reading only", "not checked"].map((m) => [m, pack.claims.filter((c) => c.method === m).map((c) => c.id)])),
        by_owner: read,
      },
      not_checked: [...pack.not_checked, ...(unread.length ? [`Owner did not confirm reading: ${unread.join(", ")}`] : [])],
      refusals_acknowledged: acks,
      residual_risk_accepted: values.risk,
      note: values.note,
    };
    mkdirSync(join(ROOT, "records"), { recursive: true });
    const file = join(ROOT, "records", `${pack.meta.requirement_id}-${pack.meta.commit.slice(0, 8)}-${Date.now()}.json`);
    writeFileSync(file, JSON.stringify(record, null, 2));
    const ledger = loadLedger(LEDGER);
    const areas = [...new Set(pack.files.filter((f) => f.kind !== "generated").map((f) => f.area))];
    if (values.decision === "accept") recordSignoff(ledger, areas, pack.meta.pack_id);
    for (const id of values["accept-finding"].split(",").filter(Boolean)) recordFinding(ledger, areaOf(pack, id), true, `${pack.meta.pack_id}/${id}`);
    for (const id of values["reject-finding"].split(",").filter(Boolean)) recordFinding(ledger, areaOf(pack, id), false, `${pack.meta.pack_id}/${id}`);
    saveLedger(LEDGER, ledger);
    console.log(`Saved ${file}`);
    console.log(renderSignoff(record));
    return;
  }

  if (cmd === "ledger") {
    const [sub, ...a] = rest;
    const ledger = loadLedger(LEDGER);
    if (sub === "escape") {
      const { values } = parseArgs({ args: a, options: { area: { type: "string" }, note: { type: "string", default: "" } } });
      if (!values.area) throw new Error("usage: ledger escape --area src/X/Y --note text");
      recordEscape(ledger, values.area, values.note);
      saveLedger(LEDGER, ledger);
    }
    console.log("| Area | Status | Reviews | Sign-offs | Findings accepted | False alarms | Escapes | Clean since escape |\n|---|---|---|---|---|---|---|---|");
    for (const [k, v] of Object.entries(ledger.areas).sort())
      console.log(`| ${k} | ${v.status} | ${v.reviews} | ${v.signoffs} | ${v.findings_accepted} | ${v.findings_rejected} | ${v.escapes} | ${v.clean_since_escape}/${ledger.earn_back_after} |`);
    return;
  }

  console.log("commands: review | regrade | batch | stats | signoff | ledger [escape]");
}

const LAYER_TAG: Record<Layers, string> = { det: "L0", author: "L1", full: "L2" };

// The measurement set: 4 agent-written branches and 28 planted-bug branches, each with the requirement it was cut from.
const BRANCHES: Record<string, string> = Object.fromEntries([
  ...["2283", "2297", "2129", "2234"].map((i) => [`ju26-issue-${i}`, `REQ-${i}`]),
  ...["02", "04", "07", "10", "13", "17", "20", "23"].map((n) => [`seeded-${n}`, "REQ-2283"]),
  ...["01", "06", "09", "12", "15", "18", "22", "25", "28"].map((n) => [`seeded-${n}`, "REQ-2234"]),
  ...["03", "08", "14", "19", "24", "27"].map((n) => [`seeded-${n}`, "REQ-2129"]),
  ...["05", "11", "16", "21", "26"].map((n) => [`seeded-${n}`, "REQ-2297"]),
]);

function save(dir: string, name: string, pack: Pack) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${name}.json`), JSON.stringify(pack, null, 2));
  writeFileSync(join(dir, `${name}.md`), renderMarkdown(pack));
}

function summary(name: string, pack: Pack): string {
  const d = pack.claims.filter((c) => c.status === "disputed").length;
  const rl = pack.routing.reading_load;
  const u = pack.meta.usage;
  const whole = pack.meta.missing.filter((m) => m.scope === "whole");
  const inTok = (x: typeof u.author) => (x ? x.input_tokens + x.cache_read_tokens + x.cache_write_tokens : 0);
  return [
    `${name}: ${pack.routing.level}`,
    `read ${rl.must_read_lines}/${rl.code_lines} code lines${rl.share === null ? "" : ` (${Math.round(rl.share * 100)}%)`}`,
    `claims ${pack.claims.length} (disputed ${d}, releasing ${pack.claims.filter((c) => c.releases_lines).length})`,
    `refusals ${pack.refusals.length}`,
    `findings ${pack.findings.length}`,
    `tests ${pack.tests.status}`,
    ...(u.author || u.breaker ? [`tokens author ${inTok(u.author)} in/${u.author?.output_tokens ?? 0} out, breaker ${inTok(u.breaker)} in/${u.breaker?.output_tokens ?? 0} out`, `cost ${pack.meta.cost_usd.total === null ? "unknown" : "$" + pack.meta.cost_usd.total.toFixed(3)}`] : []),
    `${pack.meta.seconds.total}s`,
    ...(whole.length ? [`MISSING: ${whole.map((m) => `${m.part} (${m.reason})`).join("; ")}`] : []),
  ].join(" | ");
}

function stats(dir: string, tag: string): string {
  const rows = ["| Pack | Routing | Must read / code lines | Load | Claims (disputed, releasing) | Refusals | Findings | Missing parts | Cost | Seconds |", "|---|---|---|---|---|---|---|---|---|---|"];
  let cost = 0;
  let unknown = 0;
  let n = 0;
  const shares: number[] = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith(`.${tag}.json`)).sort()) {
    const p: Pack = JSON.parse(readFileSync(join(dir, f), "utf8"));
    if (!p.routing.reading_load) continue; // a pack from before reading load existed
    const rl = p.routing.reading_load;
    n++;
    if (rl.share !== null) shares.push(rl.share);
    if (p.meta.cost_usd.total === null) unknown++;
    else cost += p.meta.cost_usd.total;
    rows.push(`| ${basename(f, ".json")} | ${p.routing.level} | ${rl.must_read_lines} / ${rl.code_lines} | ${rl.share === null ? "-" : Math.round(rl.share * 100) + "%"} | ${p.claims.length} (${p.claims.filter((c) => c.status === "disputed").length}, ${p.claims.filter((c) => c.releases_lines).length}) | ${p.refusals.length} | ${p.findings.length} | ${p.meta.missing.filter((m) => m.scope === "whole").map((m) => m.part).join(", ") || "-"} | ${p.meta.cost_usd.total === null ? "?" : "$" + p.meta.cost_usd.total.toFixed(3)} | ${p.meta.seconds.total} |`);
  }
  const sorted = [...shares].sort((a, b) => a - b);
  const median = sorted.length ? (sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2) : 0;
  const pc = (x: number) => `${Math.round(x * 100)}%`;
  rows.push("", `${n} pack(s), total cost $${cost.toFixed(2)} at list price${unknown ? `, ${unknown} with unknown cost` : ""}${n ? `, mean $${(cost / n).toFixed(3)} per pack` : ""}`);
  if (shares.length) rows.push(`Reading load: mean ${pc(shares.reduce((s, x) => s + x, 0) / shares.length)}, median ${pc(median)}, from ${pc(sorted[0])} to ${pc(sorted[sorted.length - 1])}`);
  return rows.join("\n");
}

function areaOf(pack: Pack, findingId: string): string {
  const f = pack.findings.find((x) => x.id === findingId);
  return pack.files.find((x) => x.path === f?.path)?.area ?? "unknown";
}

export function renderSignoff(r: Record<string, any>): string {
  return [
    `### Owner sign-off: ${r.decision.toUpperCase()}`,
    `**${r.owner}** signed ${r.requirement_id} at \`${String(r.commit).slice(0, 10)}\` (pack \`${r.pack_id}\`, ${r.routing}) on ${r.signed_at}.`,
    `**Checked:** tests: ${r.checked.by_tests}; static: ${r.checked.by_static_checks.join(", ")}; breaker: ${r.checked.by_breaker}; owner read: ${r.checked.by_owner.join(", ") || "nothing beyond the pack"}.`,
    `**Not checked:**\n${r.not_checked.map((n: string) => "- " + n).join("\n")}`,
    `**Refusals acknowledged:** ${r.refusals_acknowledged.join(", ") || "none"}`,
    `**Residual risk accepted:** ${r.residual_risk_accepted || "-"}`,
  ].join("\n");
}

if (!existsSync(LEDGER)) saveLedger(LEDGER, loadLedger(LEDGER));
main().catch((e) => {
  console.error(String(e?.message ?? e));
  process.exit(1);
});

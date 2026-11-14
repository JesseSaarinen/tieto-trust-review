// Builds the evidence pack: story + claims (Claude), deterministic checks, test run,
// breaker verdicts (Gemini), refusals, and the owner's reading list.
//
// The routing rule in one place:
//   Every changed line starts on the owner's reading list. A code line comes off only when a
//   claim that cites it is backed by tests the tool found passing in the real run AND the
//   breaker upheld that claim. Generated snapshots come off only through static check S2.
//   Either model can put lines back (dispute, refusal, finding); neither can take one off.
//   So a missing or failed part of the reviewer can only add reading (fail closed).
import { createHash } from "node:crypto";
import { annotatedDiff, changedFiles, defaultBase, fileHunks, fileLineCount, resolveRef, sha } from "./git.ts";
import type { ChangedFile, Hunk } from "./git.ts";
import { codeArea, fileKind, runStaticChecks } from "./static.ts";
import type { FileKind, Refusal, StaticCheck } from "./static.ts";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { removeWorktree, runTests, testProjectsFor } from "./tests.ts";
import type { TestRun } from "./tests.ts";
import { CLAUDE_MODEL, ModelCallError, PROMPT_VERSION, costUsd, haveKeys, runAuthor, runBreaker } from "./models.ts";
import type { AuthorOutput, BreakerOutput, Claim, Usage, Verdict } from "./models.ts";
import type { Ledger } from "./ledger.ts";

export type CheckMethod = "test run" | "static check" | "AI reading only" | "not checked";
export type ClaimResult = Claim & {
  method: CheckMethod;
  evidence: string[];
  status: "backed" | "disputed" | "unverified";
  breaker?: Verdict;
  citation_problems: string[];
  /** Set when requirement_quote is not in the requirement text. Disputes the claim, like a bad line citation. */
  quote_problem?: string;
  /** True when this claim takes its cited lines off the owner's reading list. */
  releases_lines: boolean;
};
export type Finding = { id: string; path: string; line: number | null; description: string; severity: string; source: string };
export type LineRange = [number, number];
/** A part of the reviewer that did not run or failed. "whole" parts force the change up on their own. */
export type MissingPart = { part: "change" | "static checks" | "tests" | "author" | "breaker" | "reviewer"; scope: "whole" | "partial"; reason: string; effect: string };
/** Per changed file: which new-file lines the owner must read and which evidence released. The scoring session overlaps these with the answer key. */
export type FileLines = { path: string; kind: FileKind; changed_lines: number; must_read: LineRange[]; must_read_lines: number; released: LineRange[]; released_lines: number };
export type ReadingLoad = {
  /** Changed code lines (non-generated, non-doc) the owner must read. */
  must_read_lines: number;
  code_lines: number;
  /** must_read_lines / code_lines; null when the change has no code lines. */
  share: number | null;
  released_lines: number;
  released_by: { claim: string; lines: number }[];
  kept: { why: string; lines: number }[];
  generated_lines: number;
  generated_released: boolean;
  doc_lines: number;
  doc_lines_flagged: number;
  all_lines: number;
  /** (must-read code + unreleased generated + flagged doc lines) / all changed lines. */
  share_of_all: number | null;
};
export type Routing = {
  level: "light check" | "focused read" | "full read";
  reasons: string[];
  must_read: { path: string; lines?: string; why: string; ranges?: LineRange[] }[];
  not_required: { what: string; count: number; why: string }[];
  real_files: number;
  total_files: number;
  reading_load: ReadingLoad;
  lines: FileLines[];
};
export type RequirementCoverage = { sentences: number; quoted: number; not_quoted: string[]; bad_quotes: { claim: string; quote: string }[] };
export type Pack = {
  meta: {
    requirement_id: string;
    branch: string;
    base: string;
    commit: string;
    generated_at: string;
    author_model: string;
    breaker_model: string;
    prompt_version: string;
    /** How the run was asked to behave. A run with tests or the breaker switched off is not a normal run. */
    options: { tests: boolean; breaker: boolean };
    /** Fail closed: every part of the reviewer that was missing or failed. Shown as a banner above the routing line. */
    missing: MissingPart[];
    /** `breaker` is the sum over breaker calls; `breaker_calls` keeps Gemini's own usage record per call. */
    usage: { author: Usage | null; breaker: Usage | null; breaker_calls?: unknown[] };
    /** List-price cost of the model calls in this pack (see PRICES in models.ts). null = model has no price entry. */
    cost_usd: { author: number | null; breaker: number | null; total: number | null };
    seconds: { author: number | null; breaker: number | null; tests: number | null; tests_cached: boolean; total: number };
    /** Set on packs rebuilt offline from a saved pack (no model call). */
    regraded_from?: { pack_id: string; file: string; layers: Layers };
    /** Set on measurement packs where a layer was removed on purpose. Not a live routing. */
    ablation?: string;
    pack_id: string;
  };
  requirement: string;
  files: (ChangedFile & { kind: FileKind; area: string })[];
  story: AuthorOutput["story"];
  claims: ClaimResult[];
  static_checks: StaticCheck[];
  tests: TestRun;
  refusals: Refusal[];
  findings: Finding[];
  out_of_scope: AuthorOutput["out_of_scope"];
  routing: Routing;
  requirement_coverage: RequirementCoverage;
  not_checked: string[];
  /** Raw model outputs, so the pack can be regraded offline. null = that model did not answer. */
  raw: { author_text: string | null; breaker_text: string | null };
};

/** det = deterministic checks and tests only; author = + Claude, breaker removed; full = both models. */
export type Layers = "det" | "author" | "full";
export type Replay = { author: AuthorOutput | null; breaker: BreakerOutput | null; author_model: string; breaker_model: string; prompt_version: string; pack_id: string; file: string; layers: Layers };
type Opts = { repo: string; branch: string; requirementId: string; requirement: string; base?: string; tests: boolean; breaker: boolean; workRoot: string; ledger: Ledger; /** Review this exact commit instead of the branch tip (regrade). */ at?: string; replay?: Replay };

const MAX_GEN_SAMPLES = 2;
const NO_AUTHOR = "there is no story and no claim, so no evidence can release a line: full read of every non-generated file";
const NO_BREAKER = "no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line";
const NO_TESTS = "no claim can be backed by a test run, so no line is released: the owner reads every changed code line";
const EMPTY_AUTHOR: AuthorOutput = { story: { summary: "No story: the author model did not produce one. Nothing below is backed by a model; read the change itself.", why: "", touches_beyond_requirement: [], confidence_overview: "none" }, claims: [], concerns: [], out_of_scope: [], refusal_candidates: [] };
/** "C1", "c1" and "C-1" are the same claim. */
const idKey = (s: string) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const msgOf = (e: unknown) => String((e as Error)?.message ?? e).replace(/\s+/g, " ").slice(0, 300);
const noTests = (projects: string[], status: TestRun["status"], reason: string): TestRun => ({ status, reason, projects, passed: 0, failed: 0, skipped: 0, cases: [], environment_blocked: 0, project_results: [] });

/** Never throws: a crash in any layer still returns a pack, and that pack routes up. */
export async function review(o: Opts): Promise<Pack> {
  const started = Date.now();
  try {
    return await build(o, started);
  } catch (e) {
    return crashPack(o, e, started);
  }
}

async function build(o: Opts, started: number): Promise<Pack> {
  const missing: MissingPart[] = [];
  const ref = resolveRef(o.repo, o.at ?? o.branch);
  const base = o.base ?? defaultBase(o.repo, ref);
  const commit = sha(o.repo, ref);
  const files = changedFiles(o.repo, base, ref).map((f) => ({ ...f, kind: fileKind(f.path), area: codeArea(f.path) }));
  const hunks = new Map<string, Hunk[]>();
  for (const f of files) hunks.set(f.path, fileHunks(o.repo, base, ref, f.path));

  // 1. Deterministic checks and contract/safety/honesty triggers.
  let checks: StaticCheck[] = [];
  let refusals: Refusal[] = [];
  try {
    ({ checks, refusals } = runStaticChecks(files.map((f) => ({ file: f, kind: f.kind, hunks: hunks.get(f.path)! }))));
  } catch (e) {
    missing.push({ part: "static checks", scope: "whole", reason: `crashed (${msgOf(e)})`, effect: "the refuse-to-decide rules did not run, so nothing is released: full read, generated files included" });
  }

  // 2. Tests. Results are cached per commit: repeated reviews of the same commit reuse one test run.
  let projects: string[] = [];
  let tests: TestRun;
  let testsCached = false;
  try {
    projects = testProjectsFor(o.repo, ref, files.map((f) => f.path));
    const cacheFile = join(o.workRoot, "testcache", `${commit}.json`);
    let cached: TestRun | null = null;
    if (o.tests && existsSync(cacheFile)) {
      try {
        cached = JSON.parse(readFileSync(cacheFile, "utf8")) as TestRun;
      } catch {
        cached = null; // unreadable cache entry: run the tests again
      }
    }
    if (!o.tests) tests = noTests(projects, "skipped", "tests disabled for this run (--no-tests)");
    else if (cached) {
      tests = cached;
      testsCached = true;
    } else {
      tests = runTests(o.repo, commit, projects, o.workRoot, base);
      mkdirSync(dirname(cacheFile), { recursive: true });
      writeFileSync(cacheFile, JSON.stringify(tests));
      removeWorktree(o.repo, o.workRoot, commit);
    }
  } catch (e) {
    tests = noTests(projects, "error", `the test runner crashed (${msgOf(e)})`);
  }
  if (tests.status !== "ran") missing.push({ part: "tests", scope: "whole", reason: tests.reason ?? tests.status, effect: NO_TESTS });
  else {
    if (tests.environment_blocked) missing.push({ part: "tests", scope: "partial", reason: `${tests.environment_blocked} test(s) were blocked by this machine (Windows Application Control)`, effect: "a claim that names a blocked test is not backed and releases nothing" });
    for (const pr of tests.project_results.filter((x) => x.status !== "tests ran")) missing.push({ part: "tests", scope: "partial", reason: `test project ${pr.project.split("/").pop()}: ${pr.status}`, effect: "claims that rely on tests in that project are not backed and release nothing" });
  }

  // 3. Model input: requirement + annotated diff (generated snapshots sampled, not dumped).
  const gen = files.filter((f) => f.kind === "generated");
  const real = files.filter((f) => f.kind !== "generated");
  const diffText = [
    ...real.map((f) => `### ${f.path}  [${f.kind}, ${f.status}, +${f.added}/-${f.removed}]\n${annotatedDiff(hunks.get(f.path)!)}`),
    ...gen.slice(0, MAX_GEN_SAMPLES).map((f) => `### ${f.path}  [generated snapshot SAMPLE, +${f.added}/-${f.removed}]\n${annotatedDiff(hunks.get(f.path)!)}`),
  ].join("\n\n");
  const checkText = checks.map((c) => `${c.id} ${c.name}: ${c.result} - ${c.detail}`).join("\n");
  const input = `REQUIREMENT ${o.requirementId}\n${o.requirement}\n\nCHANGED FILES (${files.length}; ${gen.length} are generated test snapshots, ${MAX_GEN_SAMPLES} shown as samples)\n${files.map((f) => `- ${f.path} [${f.kind}] +${f.added}/-${f.removed}`).join("\n").slice(0, 20000)}\n\nSTATIC CHECKS (deterministic, already run)\n${checkText}\n\nANNOTATED DIFF (left column = line number in the new file)\n${diffText}`;

  // Author (Claude). Missing key, failed call or 0 claims all end in the same place: no claims, nothing released.
  const keys = haveKeys();
  const rp = o.replay;
  let author: AuthorOutput | null = null;
  let authorModel = "none";
  let authorUsage: Usage | null = null;
  let authorSec: number | null = null;
  let authorRaw: string | null = null;
  if (rp) {
    authorModel = rp.author_model;
    if (rp.layers === "det") missing.push({ part: "author", scope: "whole", reason: "removed for measurement (deterministic layer only)", effect: NO_AUTHOR });
    else if (!rp.author) missing.push({ part: "author", scope: "whole", reason: "the saved pack holds no author output", effect: NO_AUTHOR });
    else author = rp.author;
  } else if (!keys.anthropic) missing.push({ part: "author", scope: "whole", reason: "ANTHROPIC_API_KEY missing, no Claude call made", effect: NO_AUTHOR });
  else {
    authorModel = CLAUDE_MODEL;
    const t = Date.now();
    try {
      const r = await runAuthor(input);
      author = r.out;
      authorModel = r.model;
      authorUsage = r.usage;
      authorRaw = r.raw;
    } catch (e) {
      if (e instanceof ModelCallError) {
        authorUsage = e.usage ?? null;
        authorRaw = e.raw ?? null;
      }
      missing.push({ part: "author", scope: "whole", reason: `Claude call failed (${msgOf(e)})`, effect: NO_AUTHOR });
    }
    authorSec = Math.round((Date.now() - t) / 1000);
  }
  if (author && !author.claims.length) missing.push({ part: "author", scope: "whole", reason: "the author returned 0 claims", effect: NO_AUTHOR });
  const a = author ?? EMPTY_AUTHOR;

  // Breaker (Gemini). Not run, failed, or silent on a claim: that claim was never challenged and releases nothing.
  let breaker: BreakerOutput | null = null;
  let breakerModel = "none";
  let breakerUsage: Usage | null = null;
  let breakerSec: number | null = null;
  let breakerRaw: string | null = null;
  const breakerCalls: unknown[] = [];
  const ablated = rp?.layers === "author" && a.claims.length > 0;
  if (!a.claims.length) missing.push({ part: "breaker", scope: "whole", reason: "not run, because there were no claims to break", effect: NO_BREAKER });
  else if (ablated) {
    /* measurement only: the breaker is removed on purpose and the pack says so (meta.ablation) */
  } else if (!o.breaker) missing.push({ part: "breaker", scope: "whole", reason: "switched off for this run (--no-breaker)", effect: NO_BREAKER });
  else if (rp) {
    breakerModel = rp.breaker_model;
    if (rp.breaker) breaker = rp.breaker;
    else missing.push({ part: "breaker", scope: "whole", reason: "the saved pack holds no breaker output", effect: NO_BREAKER });
  } else if (!keys.gemini) missing.push({ part: "breaker", scope: "whole", reason: "GEMINI_API_KEY missing, no Gemini call made", effect: NO_BREAKER });
  else {
    const bin = `${input}\n\nCLAIMS TO BREAK\n${JSON.stringify(a.claims.map(({ id, text, requirement_quote, citations, tests }) => ({ id, text, requirement_quote, citations, tests })), null, 1)}\n\nTEST RUN: ${tests.status}${tests.reason ? " (" + tests.reason + ")" : ""}`;
    const t = Date.now();
    try {
      const r = await runBreaker(bin);
      breaker = r.out;
      breakerModel = r.model;
      breakerUsage = r.usage;
      breakerRaw = r.raw;
      breakerCalls.push({ attempts: r.attempts, seconds: r.seconds, usage: r.usage_raw });
      // The breaker sometimes answers with a short or empty verdict list (2 of the first 19 runs). Ask once more for
      // the claims it skipped; whatever is still unanswered after that stays unchallenged and releases nothing.
      const skipped = a.claims.filter((c) => !r.out.verdicts.some((v) => idKey(v.claim_id) === idKey(c.id))).map((c) => c.id);
      if (skipped.length) {
        try {
          const r2 = await runBreaker(`${bin}\n\nYou were asked this before and gave no verdict for: ${skipped.join(", ")}. Give one verdict for each of these claims now.`);
          breakerCalls.push({ attempts: r2.attempts, seconds: r2.seconds, usage: r2.usage_raw, reason: `asked again for ${skipped.join(", ")}` });
          const merged: BreakerOutput = {
            verdicts: [...r.out.verdicts, ...r2.out.verdicts.filter((v) => skipped.some((id) => idKey(id) === idKey(v.claim_id)))],
            missed_problems: [...r.out.missed_problems, ...r2.out.missed_problems.filter((m) => !r.out.missed_problems.some((k) => k.path === m.path && k.line === m.line))],
          };
          breaker = merged;
          breakerRaw = JSON.stringify(merged);
          breakerUsage = { input_tokens: r.usage.input_tokens + r2.usage.input_tokens, output_tokens: r.usage.output_tokens + r2.usage.output_tokens, cache_read_tokens: r.usage.cache_read_tokens + r2.usage.cache_read_tokens, cache_write_tokens: 0, thinking_tokens: (r.usage.thinking_tokens ?? 0) + (r2.usage.thinking_tokens ?? 0) };
        } catch {
          /* the first answer stands */
        }
      }
    } catch (e) {
      if (e instanceof ModelCallError) {
        breakerUsage = e.usage ?? null;
        breakerRaw = e.raw ?? null;
        breakerModel = e.model ?? breakerModel;
      }
      missing.push({ part: "breaker", scope: "whole", reason: `Gemini call failed (${msgOf(e)})`, effect: NO_BREAKER });
    }
    breakerSec = Math.round((Date.now() - t) / 1000);
  }
  const b = breaker ?? { verdicts: [], missed_problems: [] };

  // 4. Grade each claim by how it was actually checked. Model statements are never evidence on their own.
  const paths = new Set(files.map((f) => f.path));
  const lineCount = new Map<string, number>();
  const reqNorm = normText(o.requirement);
  const worst = { disputed: 0, cannot_tell: 1, upheld: 2 };
  const claims: ClaimResult[] = a.claims.map((c) => {
    const problems: string[] = [];
    for (const ci of c.citations) {
      if (!paths.has(ci.path)) problems.push(`cites ${ci.path}, which this change does not touch`);
      else {
        if (!lineCount.has(ci.path)) lineCount.set(ci.path, fileLineCount(o.repo, ref, ci.path));
        const n = lineCount.get(ci.path)!;
        if (ci.start_line < 1 || ci.end_line > n || ci.start_line > ci.end_line) problems.push(`cites ${ci.path} L${ci.start_line}-${ci.end_line}, outside the file (${n} lines)`);
      }
    }
    const quote = (c.requirement_quote ?? "").trim();
    const quote_problem = quote && !quoteFound(quote, reqNorm) ? `quotes "${quote.slice(0, 120)}${quote.length > 120 ? "…" : ""}", which is not in the requirement text` : undefined;
    const evidence: string[] = [];
    let testFailed = false;
    // "test run" needs every named test to be found in the real run and to pass. One missing, blocked or failed test is not evidence.
    let allPassed = c.tests.length > 0;
    if (tests.status === "ran")
      for (const t of c.tests) {
        const hits = t.trim() ? tests.cases.filter((k) => k.name.includes(t)) : [];
        if (!hits.length) {
          allPassed = false;
          evidence.push(`named test \`${t}\` not found in the test run`);
        } else if (hits.some((h) => h.outcome === "Blocked")) {
          allPassed = false;
          evidence.push(`test \`${t}\` blocked by the machine (not evidence either way)`);
        } else if (hits.some((h) => h.outcome === "Failed")) {
          allPassed = false;
          testFailed = true;
          evidence.push(`test \`${t}\` FAILED`);
        } else if (hits.every((h) => h.outcome === "Passed")) evidence.push(`test \`${t}\` passed (${hits.length} case${hits.length > 1 ? "s" : ""})`);
        else {
          allPassed = false;
          evidence.push(`test \`${t}\` did not run (${[...new Set(hits.map((h) => h.outcome))].join(", ")})`);
        }
      }
    else {
      allPassed = false;
      if (c.tests.length) evidence.push(`tests named (${c.tests.join(", ")}) but not run: ${tests.reason}`);
    }
    const passingStatic = c.static_checks.filter((id) => checks.find((k) => k.id === id)?.result === "pass");
    for (const id of passingStatic) evidence.push(`static check ${id} passed`);
    const method: CheckMethod = allPassed ? "test run" : passingStatic.length ? "static check" : c.citations.length && !problems.length ? "AI reading only" : "not checked";
    // Two verdicts for one claim: the harsher one counts.
    const v = b.verdicts.filter((x) => idKey(x.claim_id) === idKey(c.id)).sort((x, y) => (worst[x.verdict] ?? 1) - (worst[y.verdict] ?? 1))[0];
    const disputed = testFailed || problems.length > 0 || !!quote_problem || v?.verdict === "disputed";
    const status: ClaimResult["status"] = disputed ? "disputed" : method === "test run" || method === "static check" ? "backed" : "unverified";
    return {
      ...c,
      method,
      evidence,
      breaker: v,
      citation_problems: problems,
      quote_problem,
      status,
      // Only a passing test run releases lines, and only if the breaker upheld the claim. A static check backs a claim but does not vouch for the lines it cites.
      releases_lines: status === "backed" && method === "test run" && (ablated || v?.verdict === "upheld"),
    };
  });
  claims.sort((x, y) => rank(x) - rank(y));
  const silent = breaker ? claims.filter((c) => !c.breaker).map((c) => c.id) : [];
  if (silent.length) missing.push({ part: "breaker", scope: "partial", reason: `gave no verdict for claim(s) ${silent.join(", ")}`, effect: "those claims count as unchallenged and release nothing" });

  // 5. Refusals: deterministic ones plus AI-suggested ones (marked as AI reading).
  let rid = refusals.length;
  for (const rc of a.refusal_candidates) {
    const dup = refusals.some((r) => r.rule === rc.rule && r.files.some((f) => f.path === rc.path));
    const range: LineRange | undefined = rc.start_line && rc.end_line && rc.end_line >= rc.start_line ? [rc.start_line, rc.end_line] : undefined;
    if (!dup) refusals.push({ id: `R${++rid}`, rule: rc.rule, what: rc.what, why: rc.why, files: [range ? { path: rc.path, range } : { path: rc.path }], source: "AI reading" });
  }

  // 6. Findings (what the planted-bug measurement scores against).
  const findings: Finding[] = [];
  let fid = 0;
  const F = (f: Omit<Finding, "id">) => findings.push({ id: `F${++fid}`, ...f });
  for (const c of claims.filter((x) => x.status === "disputed")) {
    const byBreaker = c.breaker?.verdict === "disputed";
    const cite = (byBreaker ? c.breaker?.citations?.[0] : undefined) ?? (c.citations[0] ? { path: c.citations[0].path, line: c.citations[0].start_line } : null);
    const why = byBreaker ? c.breaker!.reason : [...c.citation_problems, ...(c.quote_problem ? [c.quote_problem] : []), ...c.evidence.filter((e) => e.includes("FAILED"))].join("; ");
    F({ path: cite?.path ?? "", line: cite?.line ?? null, description: `Claim ${c.id} disputed: ${why}`, severity: "medium", source: byBreaker ? "breaker (Gemini)" : "evidence check" });
  }
  for (const x of a.concerns) F({ ...x, line: x.line > 0 ? x.line : null, source: "author (Claude)" });
  for (const x of b.missed_problems) F({ ...x, line: x.line > 0 ? x.line : null, source: "breaker (Gemini)" });
  for (const pr of tests.project_results)
    for (const e of pr.new_errors ?? [])
      F({ path: files.find((f) => e.startsWith(f.path.split("/").pop()!))?.path ?? "", line: Number(/\((\d+),/.exec(e)?.[1]) || null, description: `New compile error vs base in ${pr.project.split("/").pop()} (the base has other build errors on this machine, so this may share their cause): ${e}`, severity: "medium", source: "test run" });
  for (const t of tests.cases.filter((k) => k.outcome === "Failed")) F({ path: "", line: null, description: `Test failed: ${t.name}${t.message ? " - " + t.message.slice(0, 200) : ""}`, severity: "high", source: "test run" });
  for (const s of checks.filter((k) => k.result === "fail" && ["S1", "S2", "S7", "S8"].includes(k.id))) F({ path: s.files[0] ?? "", line: null, description: `${s.id} ${s.name}: ${s.detail}`, severity: "medium", source: "static check" });

  // 7. Routing: the reading list, line by line.
  const routing = route({ files, hunks, claims, refusals, findings, tests, checks, ledger: o.ledger, missing, ablated });

  const not_checked: string[] = [];
  for (const m of missing) not_checked.push(`Reviewer part missing or failed: ${m.part}: ${m.reason}. Effect: ${m.effect}.`);
  if (tests.environment_blocked) not_checked.push(`${tests.environment_blocked} test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.`);
  for (const pr of tests.project_results.filter((x) => x.status !== "tests ran"))
    not_checked.push(`Test project ${pr.project.split("/").pop()}: ${pr.status}${pr.new_errors?.length ? `; the change adds ${pr.new_errors.length} new compile error(s), e.g. ${pr.new_errors[0].slice(0, 160)}` : pr.errors[0] ? " (" + pr.errors[0].slice(0, 160) + ")" : ""}.`);
  not_checked.push("A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.");
  not_checked.push("Behaviour on other target frameworks / Unity / NativeAOT was not exercised.");
  not_checked.push("Performance and allocation impact were not measured.");
  if (gen.length) not_checked.push(`${gen.length - Math.min(gen.length, MAX_GEN_SAMPLES)} generated snapshot files were not shown to the models; covered only by static check S2${tests.status === "ran" ? " and the snapshot tests" : ""}.`);

  const authorCost = costUsd(authorModel, authorUsage);
  const breakerCost = costUsd(breakerModel, breakerUsage);
  // A call that was made but has no price entry makes the total unknown, never a silent 0.
  const unpriced = (authorUsage && authorCost === null) || (breakerUsage && breakerCost === null);
  const totalCost = unpriced ? null : Math.round(((authorCost ?? 0) + (breakerCost ?? 0)) * 10000) / 10000;
  const pack: Pack = {
    meta: {
      requirement_id: o.requirementId,
      branch: o.branch,
      base,
      commit,
      generated_at: new Date().toISOString(),
      author_model: authorModel,
      breaker_model: breakerModel,
      prompt_version: rp ? rp.prompt_version : PROMPT_VERSION,
      options: { tests: o.tests, breaker: o.breaker },
      missing,
      usage: { author: authorUsage, breaker: breakerUsage, ...(breakerCalls.length ? { breaker_calls: breakerCalls } : {}) },
      cost_usd: rp ? { author: 0, breaker: 0, total: 0 } : { author: authorCost, breaker: breakerCost, total: totalCost },
      seconds: { author: authorSec, breaker: breakerSec, tests: tests.durationSec ?? null, tests_cached: testsCached, total: Math.round((Date.now() - started) / 1000) },
      ...(rp ? { regraded_from: { pack_id: rp.pack_id, file: rp.file, layers: rp.layers } } : {}),
      ...(ablated ? { ablation: "Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing." } : {}),
      pack_id: "",
    },
    requirement: o.requirement,
    files,
    story: a.story,
    claims,
    static_checks: checks,
    tests: { ...tests, cases: tests.cases.length > 400 ? tests.cases.filter((c) => c.outcome !== "Passed") : tests.cases },
    refusals,
    findings,
    out_of_scope: a.out_of_scope,
    routing,
    requirement_coverage: requirementCoverage(o.requirement, claims),
    not_checked,
    raw: { author_text: rp ? (author ? JSON.stringify(author) : null) : authorRaw, breaker_text: rp ? (breaker ? JSON.stringify(breaker) : null) : breakerRaw },
  };
  pack.meta.pack_id = packId(pack);
  return pack;
}

/** Model outputs to replay from a saved pack. Packs from before raw outputs were saved (run1) are rebuilt from their graded claims and findings. */
export function replayFrom(src: any, file: string, layers: Layers): Replay {
  let author: AuthorOutput | null = null;
  let breaker: BreakerOutput | null = null;
  const parse = <T>(t: string | null | undefined): T | null => {
    try {
      return t ? (JSON.parse(t) as T) : null;
    } catch {
      return null;
    }
  };
  if (src.raw) {
    author = parse<AuthorOutput>(src.raw.author_text);
    breaker = parse<BreakerOutput>(src.raw.breaker_text);
  } else {
    if (src.claims?.length)
      author = {
        story: src.story,
        claims: src.claims.map((c: any) => ({ id: c.id, text: c.text, requirement_quote: c.requirement_quote, kind: c.kind, confidence: c.confidence, citations: c.citations, tests: c.tests, static_checks: c.static_checks })),
        concerns: src.findings.filter((f: any) => f.source === "author (Claude)").map((f: any) => ({ path: f.path, line: f.line ?? 0, description: f.description, severity: f.severity })),
        out_of_scope: src.out_of_scope ?? [],
        refusal_candidates: src.refusals.filter((r: any) => r.source === "AI reading").map((r: any) => ({ rule: r.rule, what: r.what, why: r.why, path: r.files[0]?.path ?? "", start_line: 0, end_line: 0 })),
      };
    if (src.meta.breaker_model && src.meta.breaker_model !== "none")
      breaker = {
        verdicts: src.claims.filter((c: any) => c.breaker).map((c: any) => c.breaker),
        missed_problems: src.findings.filter((f: any) => f.source === "breaker (Gemini)" && !/^Claim \S+ disputed:/.test(f.description)).map((f: any) => ({ path: f.path, line: f.line ?? 0, description: f.description, severity: f.severity })),
      };
  }
  return { author, breaker, author_model: src.meta.author_model, breaker_model: src.meta.breaker_model, prompt_version: src.meta.prompt_version ?? "v1", pack_id: src.meta.pack_id, file: file.split(/[\\/]/).pop()!, layers };
}

const packId = (pack: Pack) => createHash("sha256").update(JSON.stringify({ ...pack, meta: { ...pack.meta, generated_at: "" } })).digest("hex").slice(0, 12);
const rank = (c: ClaimResult) => (c.status === "disputed" ? 0 : c.status === "unverified" ? 1 : 2);

/** A crash anywhere above still ends in a pack. It carries no evidence and sends the owner to the whole change. */
function crashPack(o: Opts, e: unknown, started: number): Pack {
  const missing: MissingPart[] = [{ part: "reviewer", scope: "whole", reason: `crashed (${msgOf(e)})`, effect: "nothing in this pack is evidence: full read of the whole change" }];
  let base = o.base ?? "";
  let commit = "";
  let files: Pack["files"] = [];
  const hunks = new Map<string, Hunk[]>();
  try {
    const ref = resolveRef(o.repo, o.at ?? o.branch);
    base ||= defaultBase(o.repo, ref);
    commit = sha(o.repo, ref);
    files = changedFiles(o.repo, base, ref).map((f) => ({ ...f, kind: fileKind(f.path), area: codeArea(f.path) }));
    for (const f of files) hunks.set(f.path, fileHunks(o.repo, base, ref, f.path));
  } catch (e2) {
    files = [];
    missing.push({ part: "change", scope: "whole", reason: `could not be read from git (${msgOf(e2)})`, effect: "the reviewer does not know what changed: full read of the whole change" });
  }
  const tests = noTests([], "error", "the reviewer crashed before or during the test step");
  let routing: Routing;
  try {
    routing = route({ files, hunks, claims: [], refusals: [], findings: [], tests, checks: [], ledger: o.ledger, missing, ablated: false });
  } catch {
    const zero: ReadingLoad = { must_read_lines: 0, code_lines: 0, share: null, released_lines: 0, released_by: [], kept: [], generated_lines: 0, generated_released: false, doc_lines: 0, doc_lines_flagged: 0, all_lines: 0, share_of_all: null };
    routing = { level: "full read", reasons: missing.map((m) => `Fail closed: ${m.part} ${m.reason}. ${cap(m.effect)}.`), must_read: [{ path: "(the whole change)", lines: "every changed file", why: "the reviewer crashed" }], not_required: [], real_files: files.length, total_files: files.length, reading_load: zero, lines: [] };
  }
  if (!routing.must_read.length) routing.must_read.push({ path: "(the whole change)", lines: "every changed file", why: "the reviewer crashed" });
  const pack: Pack = {
    meta: { requirement_id: o.requirementId, branch: o.branch, base, commit, generated_at: new Date().toISOString(), author_model: "none", breaker_model: "none", prompt_version: PROMPT_VERSION, options: { tests: o.tests, breaker: o.breaker }, missing, usage: { author: null, breaker: null }, cost_usd: { author: null, breaker: null, total: null }, seconds: { author: null, breaker: null, tests: null, tests_cached: false, total: Math.round((Date.now() - started) / 1000) }, pack_id: "" },
    requirement: o.requirement,
    files,
    story: EMPTY_AUTHOR.story,
    claims: [],
    static_checks: [],
    tests,
    refusals: [],
    findings: [],
    out_of_scope: [],
    routing,
    requirement_coverage: requirementCoverage(o.requirement, []),
    not_checked: missing.map((m) => `Reviewer part missing or failed: ${m.part}: ${m.reason}. Effect: ${m.effect}.`),
    raw: { author_text: null, breaker_text: null },
  };
  pack.meta.pack_id = packId(pack);
  return pack;
}

// ---------- requirement quotes ----------

/** Words only: lower-case letters and digits, single spaces. A quote then matches whatever the issue's formatting was
 * (headings, backticks, bold, a colon the author added), and an invented quote still does not. */
function normText(s: string): string {
  return s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}
/** A quote may skip text with "..." or "[...]"; every piece must be in the requirement, in order. */
function quoteParts(q: string): string[] {
  return q
    .split(/\s*(?:\[\s*(?:\.\.\.|…)\s*\]|\.\.\.|…)\s*/)
    .map(normText)
    .filter((p) => p.length > 2);
}
function quoteFound(q: string, reqNorm: string): boolean {
  const parts = quoteParts(q);
  if (!parts.length) return false;
  let at = 0;
  for (const p of parts) {
    const i = (" " + reqNorm + " ").indexOf(" " + p + " ", at);
    if (i < 0) return false;
    at = i + p.length;
  }
  return true;
}
/** The trace in the other direction: which requirement sentences does no claim quote? */
function requirementCoverage(requirement: string, claims: ClaimResult[]): RequirementCoverage {
  const prose = requirement.replace(/```[\s\S]*?```/g, "\n");
  const sentences = prose
    .split(/\n+/)
    .filter((l) => !/^\s*(#|Source:)/.test(l))
    .flatMap((l) => l.split(/(?<=[.!?:])\s+(?=[A-Z`*\[(])/))
    .map((s) => s.replace(/^\s*[-*]\s+/, "").trim())
    .filter((s) => s.split(/\s+/).length >= 6);
  const quotes = claims.filter((c) => !c.quote_problem).flatMap((c) => quoteParts(c.requirement_quote ?? ""));
  const touches = (sentence: string) => {
    const n = normText(sentence);
    return quotes.some((q) => n.includes(q) || q.includes(n) || (q.length > 60 && (n.includes(q.slice(0, 40)) || n.includes(q.slice(-40)))));
  };
  const not_quoted = sentences.filter((s) => !touches(s));
  return { sentences: sentences.length, quoted: sentences.length - not_quoted.length, not_quoted, bad_quotes: claims.filter((c) => c.quote_problem).map((c) => ({ claim: c.id, quote: c.requirement_quote })) };
}

// ---------- routing ----------

/** One changed line. Added lines carry their new-file number; a removed line is pinned to the new-file line that follows it. */
type Unit = { n: number; del: boolean };
function changedUnits(hunks: Hunk[]): Unit[] {
  const out: Unit[] = [];
  for (const h of hunks) {
    let last = Number(/\+(\d+)/.exec(h.header)?.[1] ?? 1) - 1;
    for (const l of h.lines) {
      if (l.kind === "-") out.push({ n: last + 1, del: true });
      else {
        last = l.newLine ?? last + 1;
        if (l.kind === "+") out.push({ n: last, del: false });
      }
    }
  }
  return out;
}
/** A removed line counts as cited when the citation covers the line before or after the gap. */
const covers = (u: Unit, s: number, e: number) => (s <= u.n && u.n <= e) || (u.del && s <= u.n - 1 && u.n - 1 <= e);
function toRanges(nums: number[]): LineRange[] {
  const out: LineRange[] = [];
  for (const n of [...new Set(nums)].sort((x, y) => x - y)) {
    const lastR = out[out.length - 1];
    if (lastR && n <= lastR[1] + 1) lastR[1] = n;
    else out.push([n, n]);
  }
  return out;
}
const fmtRanges = (r: LineRange[], max = 12) => r.slice(0, max).map(([s, e]) => (s === e ? `L${s}` : `L${s}-${e}`)).join(", ") + (r.length > max ? `, +${r.length - max} more` : "");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pct = (x: number | null) => (x === null ? "n/a" : `${Math.round(x * 100)}%`);

function route(x: {
  files: Pack["files"];
  hunks: Map<string, Hunk[]>;
  claims: ClaimResult[];
  refusals: Refusal[];
  findings: Finding[];
  tests: TestRun;
  checks: StaticCheck[];
  ledger: Ledger;
  missing: MissingPart[];
  ablated: boolean;
}): Routing {
  const { files, hunks, claims, refusals, findings, tests, checks, ledger, missing } = x;
  const reasons: string[] = [];
  const whole = missing.filter((m) => m.scope === "whole");
  // No story or no rule check: every non-generated file in full. No rule check or no readable change: generated files too.
  const blockReal = whole.filter((m) => m.part === "author" || m.part === "static checks" || m.part === "change" || m.part === "reviewer");
  const blockAll = whole.filter((m) => m.part === "static checks" || m.part === "change" || m.part === "reviewer");
  for (const m of whole) reasons.push(`Fail closed: ${m.part} ${m.reason}. ${cap(m.effect)}.`);

  const hard = refusals.filter((r) => (r.rule === "contracts" || r.rule === "safety") && r.source === "static check");
  const soft = refusals.filter((r) => !hard.includes(r));
  if (hard.length) reasons.push(`Refused to decide (${hard.map((r) => `${r.rule}: ${r.what}`).join("; ")}). The owner reads these files in full.`);
  if (soft.length) reasons.push(`${soft.length} refusal(s) on ${[...new Set(soft.map((r) => r.rule))].join("/")} grounds need a human look.`);
  const probation = new Set([...new Set(files.map((f) => f.area))].filter((a) => ledger.areas[a]?.status === "probation"));
  for (const a of probation) reasons.push(`Area ${a} is on probation in the trust ledger after a missed bug: nothing in it is released.`);
  const disputed = claims.filter((c) => c.status === "disputed");
  if (disputed.length) reasons.push(`${disputed.length} claim(s) disputed by the breaker or by the evidence check.`);
  const unverifiedBehavior = claims.filter((c) => c.status === "unverified" && c.kind === "behavior");
  if (unverifiedBehavior.length) reasons.push(`${unverifiedBehavior.length} behaviour claim(s) rest on AI reading only (no passing test).`);
  const flagged = findings.filter((f) => f.path && (f.severity === "high" || f.severity === "medium"));
  const high = findings.filter((f) => f.severity === "high" && f.source !== "static check");
  if (high.length) reasons.push(`${high.length} high-severity finding(s).`);
  if (tests.status === "ran" && tests.failed) reasons.push(`${tests.failed} test(s) failed.`);
  if (tests.status === "build-failed") reasons.push("The change breaks the test build (the base commit builds).");

  const s2 = checks.find((c) => c.id === "S2");
  const releasing = claims.filter((c) => c.releases_lines);
  const must: Routing["must_read"] = [];
  const lines: FileLines[] = [];
  const keptWhy = new Map<string, number>();
  const releasedBy = new Map<string, number>();
  const tally = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);
  let codeLines = 0;
  let mustCode = 0;
  let genLines = 0;
  let genKept = 0;
  let docLines = 0;
  let docFlagged = 0;
  const genMust: string[] = [];

  for (const f of files) {
    const units = changedUnits(hunks.get(f.path) ?? []);
    const isGen = f.kind === "generated";
    const isDoc = f.kind === "doc";
    // Reasons that put the whole file's diff on the list.
    const wholeWhy: string[] = [];
    for (const m of isGen ? blockAll : blockReal) wholeWhy.push(`${m.part} missing or failed`);
    for (const r of hard) if (r.files.some((y) => y.path === f.path)) wholeWhy.push(`${r.id} ${r.rule}`);
    for (const r of soft) for (const y of r.files) if (y.path === f.path && !y.range) wholeWhy.push(`${r.id} ${r.rule}${r.source === "AI reading" ? " (AI-suggested)" : ""}`);
    if (!isGen && probation.has(f.area)) wholeWhy.push("area on probation");
    for (const fi of flagged) if (fi.path === f.path && fi.line === null) wholeWhy.push(`${fi.id} ${fi.source}`);
    if (isGen && s2?.result !== "pass") wholeWhy.push(s2 ? "S2 failed: the snapshots do not change uniformly" : "S2 did not run");
    // Reasons that put single lines back on the list. Any model output can add one.
    const keep: { s: number; e: number; why: string; cat: string }[] = [];
    for (const r of soft) for (const y of r.files) if (y.path === f.path && y.range) keep.push({ s: y.range[0], e: y.range[1], why: `${r.id} ${r.rule} (AI-suggested)`, cat: "refused" });
    for (const fi of flagged) if (fi.path === f.path && fi.line !== null) keep.push({ s: fi.line, e: fi.line, why: `${fi.id} ${fi.source}`, cat: "named by a finding" });
    for (const c of disputed) for (const ci of c.citations) if (ci.path === f.path) keep.push({ s: ci.start_line, e: ci.end_line, why: `claim ${c.id} disputed`, cat: "claim disputed" });
    for (const c of unverifiedBehavior) for (const ci of c.citations) if (ci.path === f.path) keep.push({ s: ci.start_line, e: ci.end_line, why: `claim ${c.id} only AI-read`, cat: "claim rests on AI reading only" });
    const cites = (pred: (c: ClaimResult) => boolean, u: Unit) => claims.filter((c) => pred(c) && c.citations.some((ci) => ci.path === f.path && covers(u, ci.start_line, ci.end_line)));

    const mustNums: number[] = [];
    const relNums: number[] = [];
    const why = new Set<string>();
    // A file that is on the list in full still shows the line-level reasons, so the owner knows where to look first.
    if (wholeWhy.length) for (const r of keep) if (units.some((u) => covers(u, r.s, r.e))) why.add(`${r.why} (L${r.s}${r.e > r.s ? "-" + r.e : ""})`);
    let mustCount = 0;
    for (const u of units) {
      let keepIt = true;
      let cat = "";
      if (wholeWhy.length) {
        for (const w of wholeWhy) why.add(w);
        cat = wholeWhy.some((w) => w.includes("missing or failed")) ? "reviewer part missing or failed" : wholeWhy.some((w) => w.includes("probation")) ? "area on probation" : wholeWhy.some((w) => /^S2 /.test(w)) ? "generated files not vouched for" : wholeWhy.some((w) => /^F\d/.test(w)) && !wholeWhy.some((w) => /^R\d/.test(w)) ? "named by a finding" : "refused";
      } else if (isGen) keepIt = false; // released by static check S2
      else {
        const k = keep.filter((r) => covers(u, r.s, r.e));
        if (k.length) {
          for (const r of k) why.add(r.why);
          cat = k[0].cat;
        } else if (isDoc) keepIt = false; // prose: read with the story, not counted as code
        else {
          const rel = cites((c) => c.releases_lines, u);
          if (rel.length) {
            keepIt = false;
            tally(releasedBy, rel[0].id);
          } else {
            const tested = cites((c) => c.method === "test run" && c.status === "backed", u);
            const any = cites(() => true, u);
            if (tested.length) {
              why.add(`${tested.map((c) => c.id).join(", ")} passed its tests but the breaker did not uphold it`);
              cat = "passing test, but not upheld by the breaker";
            } else if (any.length) {
              why.add(`${any.map((c) => c.id).join(", ")} has no passing test behind it`);
              cat = "cited only by claims without a passing test";
            } else {
              why.add("no claim covers these lines");
              cat = "no claim covers the line";
            }
          }
        }
      }
      if (keepIt) {
        mustNums.push(u.n);
        mustCount++;
        if (!isGen && !isDoc) tally(keptWhy, cat);
      } else if (!isDoc) relNums.push(u.n);
    }
    if (isGen) {
      genLines += units.length;
      genKept += mustCount;
      if (mustCount) genMust.push(f.path);
    } else if (isDoc) {
      docLines += units.length;
      docFlagged += mustCount;
    } else {
      codeLines += units.length;
      mustCode += mustCount;
    }
    // Lines a finding or an AI refusal points at that are not changed lines: shown to the owner, not counted as changed lines.
    const context = wholeWhy.length ? [] : keep.filter((r) => !units.some((u) => covers(u, r.s, r.e)));
    for (const r of context) why.add(`${r.why} (unchanged line)`);
    const ranges = toRanges([...mustNums, ...context.flatMap((r) => (r.e - r.s < 40 ? Array.from({ length: r.e - r.s + 1 }, (_, i) => r.s + i) : [r.s, r.e]))]);
    if (!isGen || mustCount) lines.push({ path: f.path, kind: f.kind, changed_lines: units.length, must_read: toRanges(mustNums), must_read_lines: mustCount, released: toRanges(relNums), released_lines: isDoc ? 0 : units.length - mustCount });
    if ((mustCount || context.length) && !isGen)
      must.push({ path: f.path, lines: wholeWhy.length ? `whole file diff (${units.length} changed line${units.length === 1 ? "" : "s"})` : `${fmtRanges(ranges)} (${mustCount} of ${units.length} changed lines)`, why: [...why].join("; "), ranges });
  }
  if (genMust.length) must.push({ path: `${genMust.length} generated snapshot file(s), e.g. ${genMust[0]}`, lines: `whole file diffs (${genKept} changed lines)`, why: s2?.result === "fail" ? "S2 failed: the snapshots do not change uniformly" : "no static check vouches for them" });
  must.sort((p, q) => Number(q.lines?.startsWith("whole")) - Number(p.lines?.startsWith("whole")));

  const releasedLines = codeLines - mustCode;
  const allLines = codeLines + genLines + docLines;
  const reading_load: ReadingLoad = {
    must_read_lines: mustCode,
    code_lines: codeLines,
    share: codeLines ? Math.round((mustCode / codeLines) * 1000) / 1000 : null,
    released_lines: releasedLines,
    released_by: [...releasedBy].map(([claim, n]) => ({ claim, lines: n })),
    kept: [...keptWhy].map(([w, n]) => ({ why: w, lines: n })).sort((p, q) => q.lines - p.lines),
    generated_lines: genLines,
    generated_released: genLines > 0 && genKept === 0,
    doc_lines: docLines,
    doc_lines_flagged: docFlagged,
    all_lines: allLines,
    share_of_all: allLines ? Math.round(((mustCode + genKept + docFlagged) / allLines) * 1000) / 1000 : null,
  };

  let level: Routing["level"] = "light check";
  if (mustCode || docFlagged || genKept || refusals.length || disputed.length || whole.length || (tests.status === "ran" && tests.failed) || tests.status === "build-failed") level = "focused read";
  if (blockReal.length || hard.length || probation.size || genKept || (codeLines > 0 && mustCode === codeLines)) level = "full read";

  if (codeLines) {
    const by = releasing.filter((c) => releasedBy.has(c.id)).map((c) => c.id);
    if (releasedLines) reasons.push(`Evidence took ${releasedLines} of ${codeLines} changed code lines off the list (${by.join(", ")}: tests found passing in the real run${x.ablated ? "; breaker removed for this measurement" : ", claim upheld by the breaker"}). ${mustCode} stay with the owner.`);
    else if (!whole.length) reasons.push(`No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all ${codeLines}.`);
  }
  if (level === "light check") reasons.push("Every changed code line is covered by a claim that a passing test backs and the breaker upheld; no refusal, no dispute: the owner reads the story and the evidence, not the diff.");

  const gen = files.filter((f) => f.kind === "generated");
  const docs = files.filter((f) => f.kind === "doc");
  const not_required: Routing["not_required"] = [];
  if (gen.length && !genKept) not_required.push({ what: "generated test snapshots (.g.cs)", count: gen.length, why: `static check S2: all change the same way${tests.status === "ran" ? "; snapshot tests compare them with real generator output" : ""}` });
  const readPaths = new Set(must.map((m) => m.path));
  const quietDocs = docs.filter((d) => !readPaths.has(d.path));
  if (quietDocs.length) not_required.push({ what: "doc file(s)", count: quietDocs.length, why: "prose; covered by the story" });
  if (releasedLines) not_required.push({ what: "changed code line(s) released by evidence", count: releasedLines, why: `each is cited by a claim with tests found passing in the real run${x.ablated ? " (breaker removed for this measurement)" : " and upheld by the breaker"}: ${[...releasedBy.keys()].join(", ")}` });
  return { level, reasons, must_read: must, not_required, real_files: files.length - gen.length, total_files: files.length, reading_load, lines };
}

// ---------- Markdown rendering ----------

const icon = (s: ClaimResult["status"]) => (s === "disputed" ? "DISPUTED" : s === "unverified" ? "unverified" : "backed");
const tok = (u: Usage | null) => (u ? `${(u.input_tokens + u.cache_read_tokens + u.cache_write_tokens).toLocaleString("en-US")} in / ${u.output_tokens.toLocaleString("en-US")} out` : "no call");
const usd = (n: number | null) => (n === null ? "price unknown" : `$${n.toFixed(2)}`);

export function renderMarkdown(p: Pack): string {
  const L: string[] = [];
  const c = p.claims;
  const rl = p.routing.reading_load;
  L.push(`# Evidence pack: ${p.meta.requirement_id} on \`${p.meta.branch}\``);
  L.push("");
  // Fail closed: the banner comes before anything else, above the routing line.
  const wholeMissing = p.meta.missing.filter((m) => m.scope === "whole");
  if (p.meta.missing.length) {
    L.push(`> **${wholeMissing.length ? "REVIEW INCOMPLETE" : "REVIEW PARTLY INCOMPLETE"}: ${p.meta.missing.length} part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.`);
    for (const m of p.meta.missing) L.push(`> - **${m.part}**: ${m.reason}. Effect: ${m.effect}.`);
    L.push("");
  }
  if (p.meta.ablation) L.push(`> **MEASUREMENT PACK, not a live routing.** ${p.meta.ablation}\n`);
  if (p.meta.regraded_from) L.push(`> Rebuilt offline from pack \`${p.meta.regraded_from.pack_id}\` (${p.meta.regraded_from.file}), layers: ${p.meta.regraded_from.layers}. No model was called.\n`);
  L.push(`> AI review is advice with evidence, never the approval. A named owner signs below.`);
  L.push("");
  L.push(`## Routing: **${p.routing.level.toUpperCase()}**`);
  L.push(
    rl.code_lines
      ? `**Reading load: ${rl.must_read_lines} of ${rl.code_lines} changed code lines (${pct(rl.share)}).**${rl.generated_lines ? ` Generated snapshots: ${rl.generated_lines} lines ${rl.generated_released ? "released by static check S2" : "NOT released"}.` : ""}${rl.doc_lines ? ` Docs: ${rl.doc_lines} lines, read with the story${rl.doc_lines_flagged ? ` (${rl.doc_lines_flagged} flagged)` : ""}.` : ""} Of everything changed: ${pct(rl.share_of_all)}.`
      : `**Reading load:** no code lines changed.${rl.doc_lines ? ` Docs: ${rl.doc_lines} lines${rl.doc_lines_flagged ? ` (${rl.doc_lines_flagged} flagged)` : ""}.` : ""}`,
  );
  L.push("");
  for (const r of p.routing.reasons) L.push(`- ${r}`);
  if (rl.kept.length) L.push(`- Why lines stay: ${rl.kept.map((k) => `${k.lines} ${k.why}`).join("; ")}.`);
  if (p.routing.must_read.length) {
    L.push("");
    L.push(`**The owner must read** (${p.routing.must_read.length} file${p.routing.must_read.length === 1 ? "" : "s"}):`);
    for (const m of p.routing.must_read) L.push(`- \`${m.path}\`${m.lines ? ` ${m.lines}` : ""}: ${m.why}`);
  }
  if (p.routing.not_required.length) {
    L.push("");
    L.push(`**Not required to read:**`);
    for (const n of p.routing.not_required) L.push(`- ${n.count} ${n.what}: ${n.why}`);
  }
  L.push("");
  L.push(
    `| | |\n|---|---|\n| Requirement | ${p.meta.requirement_id}: ${p.requirement.split("\n")[0].replace(/^# REQ-\d+: /, "")} |\n| Commit | \`${p.meta.commit.slice(0, 10)}\` (base \`${p.meta.base.slice(0, 10)}\`) |\n| Files | ${p.routing.total_files} changed, ${p.routing.real_files} real (${p.routing.total_files - p.routing.real_files} generated) |\n| Author model | ${p.meta.author_model} (prompt ${p.meta.prompt_version}): ${tok(p.meta.usage.author)}${p.meta.seconds.author !== null ? `, ${p.meta.seconds.author} s` : ""}${p.meta.usage.author ? `, ${usd(p.meta.cost_usd.author)}` : ""} |\n| Breaker model | ${p.meta.breaker_model}: ${tok(p.meta.usage.breaker)}${p.meta.seconds.breaker !== null ? `, ${p.meta.seconds.breaker} s` : ""}${p.meta.usage.breaker ? `, ${usd(p.meta.cost_usd.breaker)}` : ""} |\n| Cost and time | ${p.meta.regraded_from ? "regraded offline, no model call" : `${usd(p.meta.cost_usd.total)} at list price, ${p.meta.seconds.total} s for this pack${p.meta.seconds.tests_cached ? ` (tests reused from an earlier run of this commit: ${p.meta.seconds.tests ?? "?"} s)` : ""}`} |\n| Tests | ${testLine(p)} |\n| Pack id | \`${p.meta.pack_id}\` |`,
  );

  const disputed = c.filter((x) => x.status === "disputed");
  L.push("");
  L.push(`## 1. Disputed claims (${disputed.length})`);
  if (!disputed.length) L.push(c.length && p.meta.breaker_model !== "none" && !p.meta.ablation ? "None. The breaker tried and could not disprove any claim." : "None, but no breaker challenged the claims in this pack.");
  for (const x of disputed) L.push(claimBlock(x));

  L.push("");
  L.push(`## 2. Refused to decide (${p.refusals.length})`);
  if (!p.refusals.length) L.push("Nothing hit the contracts, safety or honesty rules.");
  else {
    L.push("| # | Rule | What | Why a human decides | Where | Found by |\n|---|---|---|---|---|---|");
    for (const r of p.refusals) L.push(`| ${r.id} | ${r.rule} | ${esc(r.what)} | ${esc(r.why)} | ${r.files.map((f) => `\`${f.path.split("/").pop()}\`${f.range ? ` L${f.range[0]}-${f.range[1]}` : f.lines?.length ? " L" + f.lines.slice(0, 6).join(",") : ""}`).join(", ")} | ${r.source} |`);
  }

  L.push("");
  L.push(`## 3. The story`);
  L.push(p.story.summary);
  if (p.story.why) L.push(`\n**Why:** ${p.story.why}`);
  if (p.story.touches_beyond_requirement.length) L.push(`\n**Touches beyond the requirement:**\n${p.story.touches_beyond_requirement.map((t) => `- ${t}`).join("\n")}`);
  L.push(`\n**How sure (the author's own view; it moves nothing):** ${p.story.confidence_overview}`);

  L.push("");
  L.push(`## 4. Claims (${c.length})`);
  L.push("| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |\n|---|---|---|---|---|---|---|");
  for (const x of c) L.push(`| ${x.id} | ${icon(x.status)} | ${esc(x.text)} | ${x.requirement_quote ? "\"" + esc(x.requirement_quote.slice(0, 90)) + (x.requirement_quote.length > 90 ? "…" : "") + "\"" + (x.quote_problem ? " **(not in the requirement)**" : "") : "(scope)"} | ${x.method} | ${x.breaker?.verdict ?? "-"} | ${x.releases_lines ? "yes" : "no"} |`);
  L.push("");
  for (const x of c.filter((y) => y.status !== "disputed")) L.push(claimBlock(x));
  const rc = p.requirement_coverage;
  L.push(`**Requirement trace, both ways:** every quote was checked against the requirement text${rc.bad_quotes.length ? `; ${rc.bad_quotes.length} claim(s) quote text that is not in it (${rc.bad_quotes.map((b) => b.claim).join(", ")}) and are disputed` : " and found there"}. The claims quote ${rc.quoted} of its ${rc.sentences} sentences.`);
  if (rc.not_quoted.length) {
    L.push(`Requirement sentences no claim quotes (${rc.not_quoted.length}; an issue body is mostly context, so skim this for anything the change should have done; first ${Math.min(6, rc.not_quoted.length)} shown, all in the JSON):`);
    for (const s of rc.not_quoted.slice(0, 6)) L.push(`- ${esc(s.slice(0, 180))}${s.length > 180 ? "…" : ""}`);
  }

  L.push("");
  L.push(`## 5. Findings (${p.findings.length})`);
  if (!p.findings.length) L.push("None.");
  else {
    L.push("| # | Severity | Where | What | Source |\n|---|---|---|---|---|");
    for (const f of p.findings) L.push(`| ${f.id} | ${f.severity} | ${f.path ? `\`${f.path.split("/").pop()}\`${f.line ? " L" + f.line : ""}` : "-"} | ${esc(f.description.slice(0, 400))} | ${f.source} |`);
  }
  if (p.out_of_scope.length) {
    L.push(`\n**Out of scope changes:**`);
    for (const o of p.out_of_scope) L.push(`- \`${o.path}\`: ${o.description}`);
  }

  L.push("");
  L.push(`## 6. Static checks`);
  if (!p.static_checks.length) L.push("Did not run.");
  else {
    L.push("| # | Check | Result | Detail |\n|---|---|---|---|");
    for (const s of p.static_checks) L.push(`| ${s.id} | ${s.name} | ${s.result} | ${esc(s.detail.slice(0, 300))} |`);
  }

  L.push("");
  L.push(`## 7. Tests`);
  L.push(testLine(p));
  if (p.tests.logTail && p.tests.status !== "ran") L.push("```\n" + p.tests.logTail + "\n```");
  const failed = p.tests.cases.filter((t) => t.outcome === "Failed");
  for (const t of failed) L.push(`- FAILED \`${t.name}\`: ${t.message?.slice(0, 300) ?? ""}`);

  L.push("");
  L.push(`## 8. What was NOT checked`);
  for (const n of p.not_checked) L.push(`- ${n}`);

  L.push("");
  L.push(`## 9. Owner sign-off`);
  L.push("Sign with: `npm run signoff -- --pack <this pack's .json> --owner \"<name>\" --decision accept|request-changes|reject --risk \"<residual risk you accept>\" --ack R1,R2 --read <files you read>`");
  L.push("Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.");
  return L.join("\n") + "\n";
}

function claimBlock(x: ClaimResult): string {
  const lines = [`**${x.id} (${icon(x.status)}, ${x.kind}, author confidence ${x.confidence}):** ${x.text}`];
  if (x.citations.length) lines.push(`- Lines: ${x.citations.map((ci) => `\`${ci.path.split("/").pop()}\` L${ci.start_line}-${ci.end_line}`).join(", ")}`);
  lines.push(`- Checked by: **${x.method}**${x.evidence.length ? " (" + x.evidence.join("; ") + ")" : ""}`);
  if (x.citation_problems.length) lines.push(`- Citation problems: ${x.citation_problems.join("; ")}`);
  if (x.quote_problem) lines.push(`- Requirement quote problem: ${x.quote_problem}`);
  if (x.breaker) lines.push(`- Breaker: **${x.breaker.verdict}**: ${x.breaker.reason}`);
  return lines.join("\n") + "\n";
}

function testLine(p: Pack): string {
  const t = p.tests;
  if (t.status === "ran") return `ran ${t.passed + t.failed + t.skipped + t.environment_blocked} tests in ${t.project_results.filter((x) => x.status === "tests ran").map((x) => x.project.split("/").pop()).join(", ")} on SDK ${t.sdk}: ${t.passed} passed, ${t.failed} failed, ${t.environment_blocked ? t.environment_blocked + " blocked by the machine, " : ""}${t.skipped} skipped (${t.durationSec}s)`;
  return `not run: ${t.reason}`;
}

const esc = (s: string) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");

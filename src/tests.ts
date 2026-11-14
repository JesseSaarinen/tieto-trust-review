// Runs the target repo's own tests on the reviewed commit, in a throwaway git worktree
// so the shared checkout is never switched. Results become "test run" evidence.
import { execFileSync, spawnSync } from "node:child_process";
import type { SpawnSyncReturns } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { git } from "./git.ts";

export type TestCase = { name: string; outcome: "Passed" | "Failed" | "NotExecuted" | string; message?: string };
export type TestRun = {
  status: "ran" | "skipped" | "build-failed" | "error";
  reason?: string;
  sdk?: string;
  projects: string[];
  passed: number;
  failed: number;
  skipped: number;
  cases: TestCase[];
  durationSec?: number;
  logTail?: string;
  environment_blocked: number;
  project_results: { project: string; status: "tests ran" | "build failed" | "build failed on base too" | "blocked by the machine" | "no results"; errors: string[]; new_errors?: string[] }[];
};

// Failures caused by the machine, not the code (e.g. Windows Application Control blocking a fresh DLL).
const ENV_FAILURE = /Application Control policy|0x800711C7|blocked this file/i;

export function findDotnet(): string | null {
  const cands = [
    process.env.DOTNET_EXE,
    "dotnet",
    join(process.env.ProgramFiles ?? "C:/Program Files", "dotnet", "dotnet.exe"),
    join(process.env.LOCALAPPDATA ?? "", "Microsoft", "dotnet", "dotnet.exe"),
    join(process.env.USERPROFILE ?? "", ".dotnet", "dotnet.exe"),
  ].filter(Boolean) as string[];
  for (const c of cands) {
    try {
      execFileSync(c, ["--version"], { stdio: "pipe" });
      return c;
    } catch {
      /* next */
    }
  }
  return null;
}

/** Test projects to run: the ones whose test files changed. */
export function testProjectsFor(repo: string, ref: string, changed: string[]): string[] {
  const projs = new Set<string>();
  const tree = git(repo, ["ls-tree", "-r", "--name-only", ref, "tests"]).split("\n");
  const csprojs = tree.filter((p) => p.endsWith(".csproj"));
  for (const f of changed) {
    if (!f.startsWith("tests/") || f.endsWith(".g.cs")) continue;
    let d = dirname(f);
    while (d && d !== "." && d !== "tests") {
      const hit = csprojs.find((c) => dirname(c) === d);
      if (hit) {
        projs.add(hit);
        break;
      }
      d = dirname(d);
    }
  }
  return [...projs];
}

function parseTrx(xml: string): TestCase[] {
  const out: TestCase[] = [];
  for (const m of xml.matchAll(/<UnitTestResult\b([^>]*?)(\/>|>([\s\S]*?)<\/UnitTestResult>)/g)) {
    const attrs = m[1];
    const name = /testName="([^"]*)"/.exec(attrs)?.[1] ?? "?";
    const outcome = /outcome="([^"]*)"/.exec(attrs)?.[1] ?? "?";
    const msg = m[3] ? /<Message>([\s\S]*?)<\/Message>/.exec(m[3])?.[1] : undefined;
    out.push({ name: name.replace(/&quot;/g, '"').replace(/&amp;/g, "&"), outcome, message: msg?.slice(0, 600) });
  }
  return out;
}

export function runTests(repo: string, commit: string, projects: string[], workRoot: string, baseCommit?: string, timeoutMin = 25): TestRun {
  const empty: TestRun = { status: "skipped", projects, passed: 0, failed: 0, skipped: 0, cases: [], environment_blocked: 0, project_results: [] };
  if (!projects.length) return { ...empty, reason: "no test project touched by this change" };
  const dotnet = findDotnet();
  if (!dotnet) return { ...empty, reason: ".NET SDK not installed on this machine, so no test was run" };

  mkdirSync(workRoot, { recursive: true });
  const wt = resolve(workRoot, `wt-${commit.slice(0, 10)}`);
  if (!existsSync(wt)) git(repo, ["worktree", "add", "--detach", wt, commit]);
  const resultsDir = join(wt, ".trust-review-results");
  rmSync(resultsDir, { recursive: true, force: true });

  const started = Date.now();
  let log = "";
  let sdk = "";
  try {
    sdk = execFileSync(dotnet, ["--version"], { cwd: wt, encoding: "utf8" }).trim();
  } catch (e) {
    return { ...empty, status: "error", reason: `dotnet could not resolve the SDK pinned in global.json: ${String(e).slice(0, 300)}` };
  }
  let buildFailed = false;
  const project_results: TestRun["project_results"] = [];
  for (const [i, p] of projects.entries()) {
    const dir = join(resultsDir, `p${i}`);
    let r: SpawnSyncReturns<string> | undefined;
    let trx = "";
    for (let attempt = 0; attempt < 2; attempt++) {
      rmSync(dir, { recursive: true, force: true });
      r = spawnSync(
        dotnet,
        ["test", p, "-c", "Release", "-f", "net8.0", "--logger", "trx", "--results-directory", dir, "-p:TreatWarningsAsErrors=false"],
        { cwd: wt, encoding: "utf8", timeout: timeoutMin * 60_000, maxBuffer: 512 * 1024 * 1024 },
      );
      trx = existsSync(dir) ? readdirSync(dir).filter((x) => x.endsWith(".trx")).map((x) => readFileSync(join(dir, x), "utf8")).join("\n") : "";
      const blockedWhole = /total="0"/.test(trx) && (ENV_FAILURE.test(trx) || /could not load dependent assembly/i.test(trx));
      if (!blockedWhole) break; // retry once: Windows Application Control sometimes clears a new DLL on the second load
    }
    log += (r!.stdout ?? "") + (r!.stderr ?? "");
    const errors = [...new Set((r!.stdout ?? "").split("\n").filter((l) => /error (CS|MSB|NU)\d+/.test(l)).map((l) => l.replace(/\s*\[[^\]]*\]\s*$/, "").replace(/^.*[\\/]/, "").trim()))].slice(0, 6);
    const ran = /<UnitTestResult\b/.test(trx);
    const blocked = !ran && (ENV_FAILURE.test(trx) || /could not load dependent assembly/i.test(trx));
    let status: TestRun["project_results"][number]["status"] = ran ? "tests ran" : blocked ? "blocked by the machine" : errors.length ? "build failed" : "no results";
    let new_errors: string[] = [];
    if (status === "build failed" && baseCommit) {
      // Was it already broken before the change? Build the same project on the base commit
      // (if it exists there) and keep only the errors the change adds.
      const bwt = resolve(workRoot, `wt-${baseCommit.slice(0, 10)}`);
      if (!existsSync(bwt)) git(repo, ["worktree", "add", "--detach", bwt, baseCommit]);
      if (existsSync(join(bwt, p))) {
        const b = spawnSync(dotnet, ["build", p, "-c", "Release"], { cwd: bwt, encoding: "utf8", timeout: timeoutMin * 60_000, maxBuffer: 256 * 1024 * 1024 });
        const baseErrs = new Set((b.stdout ?? "").split("\n").filter((l) => /error (CS|MSB|NU)\d+/.test(l)).map(errKey));
        if (baseErrs.size) {
          status = "build failed on base too";
          new_errors = [...new Set((r!.stdout ?? "").split("\n").filter((l) => /error (CS|MSB|NU)\d+/.test(l) && !baseErrs.has(errKey(l))).map((l) => l.replace(/\s*\[[^\]]*\]\s*$/, "").replace(/^.*[\\/]/, "").trim()))].slice(0, 6);
        }
      }
    }
    if (status === "build failed") buildFailed = true;
    project_results.push({ project: p, status, errors: new_errors.length ? new_errors : errors, new_errors });
  }
  const cases: TestCase[] = [];
  if (existsSync(resultsDir))
    for (const f of readdirSync(resultsDir, { recursive: true }).map(String).filter((x) => x.endsWith(".trx"))) cases.push(...parseTrx(readFileSync(join(resultsDir, f), "utf8")));
  for (const c of cases) if (c.outcome === "Failed" && ENV_FAILURE.test(c.message ?? "")) c.outcome = "Blocked";
  const environment_blocked = cases.filter((c) => c.outcome === "Blocked").length;
  const passed = cases.filter((c) => c.outcome === "Passed").length;
  const failed = cases.filter((c) => c.outcome === "Failed").length;
  return {
    environment_blocked,
    project_results,
    status: buildFailed && !cases.length ? "build-failed" : cases.length ? "ran" : "error",
    reason: buildFailed && !cases.length
      ? "build failed (introduced by this change: the base commit builds)"
      : cases.length
        ? undefined
        : project_results.some((p) => p.status === "blocked by the machine")
          ? "this machine blocked the freshly built test assemblies (Windows Application Control); not a code failure"
          : project_results.every((p) => p.status === "build failed on base too")
          ? "test project does not build on this machine, on the base commit either (pre-existing, not caused by this change)"
          : "no test results produced",
    sdk,
    projects,
    passed,
    failed,
    skipped: cases.length - passed - failed - environment_blocked,
    cases,
    durationSec: Math.round((Date.now() - started) / 1000),
    logTail: log.split("\n").filter((l) => /error|Failed|Passed!|Failed!|Total tests/.test(l)).slice(-25).join("\n"),
  };
}

export function removeWorktree(repo: string, workRoot: string, commit: string) {
  const wt = resolve(workRoot, `wt-${commit.slice(0, 10)}`);
  try {
    git(repo, ["worktree", "remove", "--force", wt]);
  } catch {
    /* ignore */
  }
}

/** "File.cs(12,53): error CS0117" -> "File.cs|CS0117|<message>" so base and change errors compare across worktrees. */
function errKey(line: string): string {
  const file = /([\w.]+\.cs)\(\d+,\d+\)/.exec(line)?.[1] ?? "";
  const code = /error (\w+)/.exec(line)?.[1] ?? "";
  const msg = /error \w+: (.*?)(\s*\[[^\]]*\])?\s*$/.exec(line)?.[1] ?? "";
  return `${file}|${code}|${msg}`;
}

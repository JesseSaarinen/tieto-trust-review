// Thin wrappers around git. Everything the reviewer knows about a change comes from here.
import { execFileSync } from "node:child_process";

export function git(repo: string, args: string[]): string {
  return execFileSync("git", ["-C", repo, ...args], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"], // stderr goes into the thrown error, not onto the console
  });
}

export function resolveRef(repo: string, branch: string): string {
  for (const cand of [branch, `origin/${branch}`]) {
    try {
      git(repo, ["rev-parse", "--verify", "--quiet", `${cand}^{commit}`]);
      return cand;
    } catch {
      /* try next */
    }
  }
  throw new Error(`Branch not found: ${branch}`);
}

export function defaultBase(repo: string, ref: string): string {
  // The agent branches are cut from origin/HEAD; the merge-base is the "before" state.
  return git(repo, ["merge-base", ref, "origin/HEAD"]).trim();
}

export function sha(repo: string, ref: string): string {
  return git(repo, ["rev-parse", ref]).trim();
}

export type ChangedFile = {
  path: string;
  status: string; // A, M, D, R...
  added: number;
  removed: number;
};

export function changedFiles(repo: string, base: string, ref: string): ChangedFile[] {
  const numstat = git(repo, ["diff", "--numstat", "--no-renames", base, ref]).trim();
  const status = git(repo, ["diff", "--name-status", "--no-renames", base, ref]).trim();
  const st = new Map<string, string>();
  for (const line of status.split("\n").filter(Boolean)) {
    const [s, p] = line.split("\t");
    st.set(p, s);
  }
  return numstat
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [a, r, p] = line.split("\t");
      return {
        path: p,
        status: st.get(p) ?? "M",
        added: a === "-" ? 0 : Number(a),
        removed: r === "-" ? 0 : Number(r),
      };
    });
}

export type DiffLine = { kind: "+" | "-" | " "; text: string; newLine?: number; oldLine?: number };
export type Hunk = { header: string; lines: DiffLine[] };

export function fileHunks(repo: string, base: string, ref: string, path: string, context = 4): Hunk[] {
  const raw = git(repo, ["diff", `-U${context}`, "--no-renames", base, ref, "--", path]);
  const hunks: Hunk[] = [];
  let cur: Hunk | null = null;
  let o = 0;
  let n = 0;
  for (const line of raw.split("\n")) {
    const m = /^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
    if (m) {
      cur = { header: line, lines: [] };
      hunks.push(cur);
      o = Number(m[1]);
      n = Number(m[2]);
      continue;
    }
    if (!cur) continue;
    if (line.startsWith("\\")) continue;
    const k = line[0];
    if (k === "+") cur.lines.push({ kind: "+", text: line.slice(1), newLine: n++ });
    else if (k === "-") cur.lines.push({ kind: "-", text: line.slice(1), oldLine: o++ });
    else if (k === " ") cur.lines.push({ kind: " ", text: line.slice(1), newLine: n++, oldLine: o++ });
  }
  return hunks;
}

/** Diff rendered with new-file line numbers so the models can cite real lines. */
export function annotatedDiff(hunks: Hunk[]): string {
  const out: string[] = [];
  for (const h of hunks) {
    out.push(h.header);
    for (const l of h.lines) {
      const num = l.kind === "-" ? "    " : String(l.newLine).padStart(4);
      out.push(`${num} ${l.kind} ${l.text}`);
    }
  }
  return out.join("\n");
}

export function fileLineCount(repo: string, ref: string, path: string): number {
  try {
    return git(repo, ["show", `${ref}:${path}`]).split("\n").length;
  } catch {
    return 0;
  }
}

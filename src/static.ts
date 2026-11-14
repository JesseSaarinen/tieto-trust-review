// Deterministic checks. No model involved: these are the "static check" evidence
// and the triggers for the three refuse-to-decide rules.
import type { ChangedFile, Hunk } from "./git.ts";

export type FileKind = "generated" | "template" | "test" | "doc" | "src" | "build";

export function fileKind(path: string): FileKind {
  const p = path.replace(/\\/g, "/");
  if (/\.g\.cs$/.test(p)) return "generated";
  if (/\.tt$/.test(p)) return "template";
  if (/(^|\/)tests?\//i.test(p) || /Tests?\.cs$/.test(p) || /\/[^/]*Tests[^/]*\//.test(p)) return "test";
  if (/\.(md|txt)$/i.test(p) && !/AnalyzerReleases|PublicAPI/.test(p)) return "doc";
  if (/\.(csproj|props|targets|json|yml|yaml|sln)$/i.test(p)) return "build";
  return "src";
}

/** Code area used by the trust ledger: first three path segments under src/ or tests/. */
export function codeArea(path: string): string {
  const parts = path.replace(/\\/g, "/").split("/");
  if (parts[0] === "src" || parts[0] === "tests") return parts.slice(0, Math.min(3, parts.length - 1)).join("/");
  return parts[0];
}

export type StaticCheck = {
  id: string;
  name: string;
  result: "pass" | "fail" | "n/a";
  detail: string;
  files: string[];
};

export type Refusal = {
  id: string;
  rule: "contracts" | "safety" | "honesty";
  what: string;
  why: string;
  /** `lines` are new-file line numbers a static rule matched; `range` is the new-file range an AI-suggested refusal points at. Neither = the whole file. */
  files: { path: string; lines?: number[]; range?: [number, number] }[];
  source: "static check" | "AI reading";
};

type FileDiff = { file: ChangedFile; kind: FileKind; hunks: Hunk[] };

const added = (h: Hunk[]) => h.flatMap((x) => x.lines.filter((l) => l.kind === "+"));
const removed = (h: Hunk[]) => h.flatMap((x) => x.lines.filter((l) => l.kind === "-"));

// Assemblies that ship to users. A new public symbol here is a contract.
const SHIPPED = /^src\/(MessagePack|MessagePack\.Annotations|MessagePack\.UnityClient|MessagePack\.AspNetCoreMvcFormatter|MessagePack\.ReactiveProperty|MessagePack\.ImmutableCollection)\//;
// Linear-time on purpose: "public" at line start, then a type keyword or a member-ish token.
const PUBLIC_DECL = /^\s*public\s+(?!.*\boverride\b)\S/;
const WIRE = /\b(writer|reader)\.(Write|Read|Try|Skip|Advance)|MessagePackCode\.|\bSerialize\(|\bDeserialize\(/;
const UNSAFE = /\bunsafe\b|\bstackalloc\b|Unsafe\.|Marshal\.|MemoryMarshal\.|fixed\s*\(/;
const ASSERTY = /\bAssert\.|\.Should|Verify|Throws|Snapshot|VerifyAsync|ExpectedDiagnostic|DiagnosticResult/;

export function runStaticChecks(files: FileDiff[]): { checks: StaticCheck[]; refusals: Refusal[] } {
  const checks: StaticCheck[] = [];
  const refusals: Refusal[] = [];
  let rid = 0;
  const R = (r: Omit<Refusal, "id" | "source">) => refusals.push({ id: `R${++rid}`, source: "static check", ...r });

  // S1: templates and their generated .cs counterparts change together.
  const paths = new Set(files.map((f) => f.file.path));
  const tt = files.filter((f) => f.kind === "template").map((f) => f.file.path);
  const unpaired = tt.filter((p) => !paths.has(p.replace(/\.tt$/, ".cs")));
  const ttCs = files
    .filter((f) => f.file.path.endsWith(".cs") && paths.has(f.file.path.replace(/\.cs$/, ".tt")))
    .map((f) => f.file.path);
  checks.push({
    id: "S1",
    name: "T4 templates and their compiled .cs change together",
    result: tt.length === 0 ? "n/a" : unpaired.length ? "fail" : "pass",
    detail: tt.length === 0 ? "no templates changed" : unpaired.length ? `template changed without its .cs: ${unpaired.join(", ")}` : `${tt.length} template(s), each with its .cs counterpart changed`,
    files: [...tt, ...ttCs],
  });
  if (unpaired.length)
    R({ rule: "honesty", what: "Generated code may not match its template", why: "A .tt template changed but its generated .cs did not, so what ships is not what the template says.", files: unpaired.map((path) => ({ path })) });

  // S2: generated snapshot files change uniformly (one mechanical edit repeated).
  const gen = files.filter((f) => f.kind === "generated");
  if (gen.length) {
    const shapes = new Map<string, number>();
    for (const f of gen)
      for (const l of [...added(f.hunks).map((x) => "+" + x.text.trim()), ...removed(f.hunks).map((x) => "-" + x.text.trim())])
        shapes.set(l, (shapes.get(l) ?? 0) + 1);
    const distinct = [...shapes.keys()].filter((k) => k.length > 1);
    const uniform = distinct.length <= 6;
    checks.push({
      id: "S2",
      name: "Generated snapshot files change uniformly",
      result: uniform ? "pass" : "fail",
      detail: `${gen.length} generated file(s); ${distinct.length} distinct changed line shape(s)${uniform ? ": " + distinct.slice(0, 6).map((d) => "`" + d.slice(0, 80) + "`").join(", ") : " (too varied to be one mechanical change)"}`,
      files: gen.map((g) => g.file.path),
    });
    if (!uniform)
      R({ rule: "honesty", what: "Generated files changed in varied ways", why: "Snapshot files should all change the same way when a template changes; varied edits suggest hand-edited snapshots.", files: gen.slice(0, 20).map((g) => ({ path: g.file.path })) });
  } else checks.push({ id: "S2", name: "Generated snapshot files change uniformly", result: "n/a", detail: "no generated files changed", files: [] });

  // S3: public API in shipped assemblies (contracts).
  const apiHits: { path: string; lines: number[] }[] = [];
  for (const f of files) {
    if (f.kind !== "src" || !SHIPPED.test(f.file.path)) continue;
    const ls = added(f.hunks).filter((l) => PUBLIC_DECL.test(l.text)).map((l) => l.newLine!);
    if (ls.length) apiHits.push({ path: f.file.path, lines: ls });
  }
  const publicApiFiles = files.filter((f) => /PublicAPI\.(Un)?[Ss]hipped\.txt$/.test(f.file.path));
  checks.push({
    id: "S3",
    name: "No new public API in shipped assemblies",
    result: apiHits.length || publicApiFiles.length ? "fail" : "pass",
    detail: apiHits.length || publicApiFiles.length ? `public declarations added: ${apiHits.map((h) => `${h.path} L${h.lines.join(",")}`).join("; ")}${publicApiFiles.length ? "; PublicAPI files changed" : ""}` : "no public declarations added in shipped assemblies",
    files: [...apiHits.map((h) => h.path), ...publicApiFiles.map((f) => f.file.path)],
  });
  if (apiHits.length || publicApiFiles.length)
    R({ rule: "contracts", what: "New public API in a shipped package", why: "Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides.", files: [...apiHits, ...publicApiFiles.map((f) => ({ path: f.file.path }))] });

  // S4: analyzer rules (user-visible diagnostics).
  const rel = files.filter((f) => /AnalyzerReleases\.(Unshipped|Shipped)\.md$/.test(f.file.path));
  const newIds = new Set<string>();
  for (const f of files) for (const l of added(f.hunks)) for (const m of l.text.matchAll(/MsgPack\d{3}/g)) newIds.add(m[0]);
  const descr = files.filter((f) => f.kind === "src" && added(f.hunks).some((l) => /new DiagnosticDescriptor\(/.test(l.text)));
  const ruleChange = rel.length > 0 || descr.length > 0;
  checks.push({
    id: "S4",
    name: "No new user-visible analyzer rules",
    result: ruleChange ? "fail" : "pass",
    detail: ruleChange ? `analyzer release notes or descriptors changed (${[...rel, ...descr].map((f) => f.file.path).join(", ")}); rule ids mentioned in added lines: ${[...newIds].join(", ") || "none"}` : `no rule descriptors or release notes changed${newIds.size ? `; existing ids mentioned: ${[...newIds].join(", ")}` : ""}`,
    files: [...rel, ...descr].map((f) => f.file.path),
  });
  if (ruleChange)
    R({ rule: "contracts", what: "New or changed analyzer rules", why: "New diagnostics break builds that treat warnings as errors and become part of the package's contract.", files: [...rel, ...descr].map((f) => ({ path: f.file.path })) });

  // S5: wire format (serialized output) - reader/writer calls in runtime code or formatter templates.
  const wire: { path: string; lines: number[] }[] = [];
  for (const f of files) {
    if (!(f.kind === "template" || (f.kind === "src" && /^src\/MessagePack\//.test(f.file.path)))) continue;
    const ls = [...added(f.hunks), ...removed(f.hunks)].filter((l) => WIRE.test(l.text));
    if (ls.length) wire.push({ path: f.file.path, lines: ls.map((l) => l.newLine ?? l.oldLine ?? 0) });
  }
  checks.push({
    id: "S5",
    name: "Serialized output (wire format) untouched",
    result: wire.length ? "fail" : "pass",
    detail: wire.length ? `reader/writer calls changed in: ${wire.map((w) => w.path).join(", ")}` : "no reader/writer calls changed in runtime code or formatter templates",
    files: wire.map((w) => w.path),
  });
  if (wire.length)
    R({ rule: "contracts", what: "Change may alter serialized bytes", why: "Wire format is shared with other services and stored data; a model cannot know every consumer.", files: wire });

  // S6: untrusted input handling (runtime deserialization, unsafe code).
  const unsafe: { path: string; lines: number[] }[] = [];
  for (const f of files) {
    if (f.kind === "test" || f.kind === "doc" || f.kind === "generated") continue;
    const runtimeReader = /^src\/MessagePack\//.test(f.file.path) || f.kind === "template";
    const ls = added(f.hunks).filter((l) => UNSAFE.test(l.text) || (runtimeReader && /\breader\./.test(l.text)));
    if (ls.length) unsafe.push({ path: f.file.path, lines: ls.map((l) => l.newLine!) });
  }
  checks.push({
    id: "S6",
    name: "No changes to untrusted-input handling",
    result: unsafe.length ? "fail" : "pass",
    detail: unsafe.length ? `deserialization or unsafe code changed in: ${unsafe.map((u) => `${u.path} L${u.lines.slice(0, 8).join(",")}`).join("; ")}` : "no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code)",
    files: unsafe.map((u) => u.path),
  });
  if (unsafe.length)
    R({ rule: "safety", what: "Code that reads untrusted input changed", why: "Deserializers parse bytes from the network; mistakes become security bugs. Needs a human with security context.", files: unsafe });

  // S7: tests weakened (assertions removed, test methods deleted).
  const weakened: { path: string; lines: number[] }[] = [];
  for (const f of files.filter((x) => x.kind === "test")) {
    const rm = removed(f.hunks).filter((l) => ASSERTY.test(l.text) || /\[(Fact|Theory|InlineData)/.test(l.text));
    if (rm.length) weakened.push({ path: f.file.path, lines: rm.map((l) => l.oldLine!) });
  }
  checks.push({
    id: "S7",
    name: "Existing tests not weakened",
    result: weakened.length ? "fail" : "pass",
    detail: weakened.length ? `assertions or test cases removed in: ${weakened.map((w) => `${w.path} (old L${w.lines.join(",")})`).join("; ")}` : "no assertions or test cases removed",
    files: weakened.map((w) => w.path),
  });
  if (weakened.length)
    R({ rule: "honesty", what: "Existing tests weakened", why: "An agent that edits the tests can make anything pass. A human checks the removed assertions were really wrong.", files: weakened.map((w) => ({ path: w.path })) }); // the matched lines are old-file numbers (removed lines), so the refusal names the whole file

  // S8: new tests actually assert something.
  const empty: { path: string; lines: number[] }[] = [];
  let newTests = 0;
  for (const f of files.filter((x) => x.kind === "test")) {
    for (const h of f.hunks) {
      const ls = h.lines;
      for (let i = 0; i < ls.length; i++) {
        if (ls[i].kind !== "+" || !/\[(Fact|Theory)\b/.test(ls[i].text)) continue;
        newTests++;
        // body = following added lines until next attribute or end of hunk
        let j = i + 1;
        let body = "";
        while (j < ls.length && !(j > i + 2 && /\[(Fact|Theory)\b/.test(ls[j].text))) {
          if (ls[j].kind === "+") body += ls[j].text + "\n";
          j++;
        }
        if (!ASSERTY.test(body) && !/await\s+\w*Verify|\bRun\w*Async\(|Test\w*Async\(|Assert/.test(body))
          empty.push({ path: f.file.path, lines: [ls[i].newLine!] });
      }
    }
  }
  checks.push({
    id: "S8",
    name: "New tests contain an assertion",
    result: newTests === 0 ? "n/a" : empty.length ? "fail" : "pass",
    detail: newTests === 0 ? "no new test methods" : empty.length ? `${empty.length} of ${newTests} new test(s) have no visible assertion: ${empty.map((e) => `${e.path} L${e.lines}`).join("; ")}` : `${newTests} new test(s), each with an assertion or verifier call`,
    files: empty.map((e) => e.path),
  });
  if (empty.length)
    R({ rule: "honesty", what: "New tests that check nothing", why: "A test without an assertion passes whatever the code does; it is not evidence.", files: empty });

  return { checks, refusals };
}

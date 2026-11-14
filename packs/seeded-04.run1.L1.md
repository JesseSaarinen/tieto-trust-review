# Evidence pack: REQ-2283 on `seeded-04`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `503928a07a5b` (seeded-04.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 117 of 224 changed code lines (52%).** Docs: 10 lines, read with the story. Of everything changed: 50%.

- 3 refusal(s) on safety/honesty/contracts grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 107 of 224 changed code lines off the list (C5, C6, C4: tests found passing in the real run; breaker removed for this measurement). 117 stay with the owner.
- Why lines stay: 82 no claim covers the line; 35 refused.

**The owner must read** (3 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F2 author (Claude) (L1446); claim C1 only AI-read (L985); claim C1 only AI-read (L1429-1434); R3 contracts (AI-suggested)
- `src/MessagePack/MessagePackSecurity.cs` whole file diff (6 changed lines): F1 author (Claude) (L134); R1 safety (AI-suggested); R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-506, L542-550, L581-632, L675-685 (82 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 107 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C5, C4, C6

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `8ce35489e6fc` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | MessagePackSecurity.GetEqualityComparer<T> returns EqualityComparer<string>.Default for string even when HashCollisionResistant is true. | This changes how untrusted deserialized data is hashed and may reintroduce hash-flooding DoS on some runtimes. Static check S6 reported pass but did not catch it. | `MessagePackSecurity.cs` | AI reading |
| R2 | honesty | Unrelated runtime security change bundled into a source-generator crash fix. | Goes beyond the requirement and is not mentioned or tested anywhere in the change. | `MessagePackSecurity.cs` | AI reading |
| R3 | contracts | The analyzer now silently drops all diagnostics lacking an in-compilation source location, and the docs declare this as policy. | This changes user-visible analyzer behavior (which diagnostics appear) beyond fixing the crash. | `TypeCollector.cs` | AI reading |

## 3. The story
The fix makes the type collector avoid indexing `DeclaringSyntaxReferences[0]` in two diagnostic paths: BothStringAndIntKeyAreNull and MemberNeedsKey. It also wraps the analyzer's report callback so it silently drops any diagnostic whose location is not a source tree in the current compilation. Three new tests compile a library to a metadata-only image. They then check two things: the analyzer/generator run produces no diagnostics, and the expected resolver hint name is generated. The change also edits README, MsgPack004 docs and, unrelatedly, the runtime `MessagePackSecurity.GetEqualityComparer<T>`.

**Why:** Members of a generic value type from metadata have no syntax, so `DeclaringSyntaxReferences[0]` throws. That made the generator and analyzer fail and the resolver silently disappear (REQ-2283).

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: string keys now bypass the hash-collision-resistant comparer even when HashCollisionResistant is on (runtime, untrusted-data path)
- Report wrapper drops every analyzer diagnostic without an in-compilation source location, including Location.None diagnostics for the project's own types
- README.md and doc/analyzers/MsgPack004.md document a new 'reported by the defining assembly' policy

**How sure (the author's own view; it moves nothing):** Medium. The two changed indexing sites are clearly safe now. The tests use the issue's own repro shape and check that the resolver is generated. I cannot see whether the third site named in the issue (old line ~735) was reached or fixed. I also cannot confirm the VerifyCS harness runs MsgPack00xMessagePackAnalyzer. The MessagePackSecurity edit is unrelated and weakens a security default; the static check S6 did not flag it.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a FirstOrDefault-based helper that returns null for metadata properties. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | - | no |
| C7 | unverified | Scope: MessagePackSecurity.GetEqualityComparer<T> now returns EqualityComparer<string>.Default for string even when HashCollisionResistant is set. This runtime change is unrelated to the generator crash. | (scope) | AI reading only | - | no |
| C8 | unverified | Scope: the README and MsgPack004 docs add user-facing statements that diagnostics for metadata types are reported only by the defining project. | (scope) | AI reading only | - | no |
| C5 | backed | One test reproduces the issue's exact lib/app record struct sources, covering the record-struct row of the trigger table. Another covers the plain struct row. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C6 | backed | Whether the analyzer half (AD0001) is exercised depends on VerifyCS.Test including MsgPack00xMessagePackAnalyzer. This is not visible in the diff; the second check in the helper runs only the generator. | "`MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException`" | test run | - | yes |
| C2 | backed | The MemberNeedsKey diagnostic is built eagerly, even when no reporter exists, which is likely the generator crash site. It now uses FirstOrDefault() so a metadata member yields a null location instead of throwing. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C3 | backed | Analyzer diagnostics whose location is not in a source tree of the current compilation are dropped instead of reported. This prevents the analyzer from reporting against metadata or nonexistent locations. | "that collection is empty for a metadata symbol" | test run | - | yes |
| C4 | backed | The tests build the defining code as a metadata-only image (MetadataReference.CreateFromImage). They then check that the generator run has no warning-or-higher diagnostics and that the expected resolver hint name is produced. This directly targets the 'no generated resolver' symptom. | "A clean build, with a generated resolver in `app`." | test run | - | yes |

**C1 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a FirstOrDefault-based helper that returns null for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C7 (unverified, scope, author confidence high):** Scope: MessagePackSecurity.GetEqualityComparer<T> now returns EqualityComparer<string>.Default for string even when HashCollisionResistant is set. This runtime change is unrelated to the generator crash.
- Lines: `MessagePackSecurity.cs` L132-141
- Checked by: **AI reading only**

**C8 (unverified, docs, author confidence high):** Scope: the README and MsgPack004 docs add user-facing statements that diagnostics for metadata types are reported only by the defining project.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L49-52
- Checked by: **AI reading only**

**C5 (backed, test, author confidence high):** One test reproduces the issue's exact lib/app record struct sources, covering the record-struct row of the trigger table. Another covers the plain struct row.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L507-541
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference` passed (2 cases))

**C6 (backed, test, author confidence low):** Whether the analyzer half (AD0001) is exercised depends on VerifyCS.Test including MsgPack00xMessagePackAnalyzer. This is not visible in the diff; the second check in the helper runs only the generator.
- Lines: `GenericsFormatterTests.cs` L637-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic is built eagerly, even when no reporter exists, which is likely the generator crash site. It now uses FirstOrDefault() so a metadata member yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence medium):** Analyzer diagnostics whose location is not in a source tree of the current compilation are dropped instead of reported. This prevents the analyzer from reporting against metadata or nonexistent locations.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, test, author confidence medium):** The tests build the defining code as a metadata-only image (MetadataReference.CreateFromImage). They then check that the generator run has no warning-or-higher diagnostics and that the expected resolver hint name is produced. This directly targets the 'no generated resolver' symptom.
- Lines: `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)

**Requirement coverage:** 5 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (21; first 8):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:
- \| `Item` declared as \| result \|

## 5. Findings (3)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `MessagePackSecurity.cs` L134 | Under UntrustedData / HashCollisionResistant, string keys now use the default comparer. The comment claims string hashing is randomized per process, but that is not true on .NET Framework (netstandard2.0 consumers) unless explicitly configured. This silently removes hash-flooding protection for string-keyed dictionaries deserialized from untrusted input. Unrelated to REQ-2283. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The wrapper drops every diagnostic whose Location is not in source, including Location.None. Any existing diagnostic for the project's own types that falls back to a null location (for example when a GetIdentifierLocation/GetLocation helper returns null) is now silently suppressed rather than reported. This is a broad change to analyzer output, not limited to metadata types. | author (Claude) |
| F3 | low | `TypeCollector.cs` L985 | The issue names three direct `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The diff changes only two hunks (old ~984 and ~1076). The visible diff does not show whether the third site was already safe, was this one, or remains unfixed. | author (Claude) |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Runtime change bypassing the collision-resistant comparer for string; not needed for the generator/analyzer crash.
- `README.md`: New section documenting cross-assembly generic support and the diagnostic-routing policy.
- `doc/analyzers/MsgPack004.md`: New section stating MsgPack004 only reports on members declared in the current project.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 3 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2283 on `seeded-10`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `759f363a961a` (seeded-10.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 157 of 218 changed code lines (72%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 71%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- Evidence took 61 of 218 changed code lines off the list (C4, C5, C6: tests found passing in the real run; breaker removed for this measurement). 157 stay with the owner.
- Why lines stay: 128 no claim covers the line; 29 refused.

**The owner must read** (3 files):
- `doc/analyzers/MsgPack004.md` whole file diff (5 changed lines): F1 author (Claude) (L52); R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F2 author (Claude) (L1446); F3 author (Claude) (L985); R1 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-552, L580-636, L649-650, L659-660, L675-685 (128 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 61 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C5, C6, C4

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `54089b73d3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s) |
| Pack id | `986d70a454e7` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Analyzer diagnostics for members of referenced-assembly types are now suppressed, and any diagnostic without an in-compilation source location is dropped. | This changes which user-visible analyzer diagnostics fire. That is a product decision, not a crash fix, and S4 only checks descriptors. | `TypeCollector.cs` | AI reading |
| R2 | honesty | Documentation added beyond the requirement, with MsgPack004.md stating behavior the code does not implement and contradicting README. | These are changes beyond the requirement, and the docs misdescribe the behavior. | `MsgPack004.md` | AI reading |

## 3. The story
Stops the generator and analyzer from crashing on closed generic structs that come from a referenced assembly. Two places that read `DeclaringSyntaxReferences[0]` now tolerate an empty list. Every diagnostic the analyzer reports now passes through a new filter, `ReportIfLocatedInCompilation`, which drops any diagnostic whose location is not in a source tree of the current compilation. Three tests compile a library to metadata and check that the consuming project builds without warnings and gets its resolver. Two doc sections are added.

**Why:** Issue #2283: for metadata types `DeclaringSyntaxReferences` is empty, so indexing `[0]` threw `IndexOutOfRangeException`. The generator then produced no resolver at all.

**Touches beyond the requirement:**
- A global filter on all analyzer diagnostics: any diagnostic with no in-compilation source location is now silently dropped, not just ones caused by metadata types.
- `GetPropertyIdentifierLocation` uses `as` instead of a hard cast, which changes behavior for non-`PropertyDeclarationSyntax` declarations in source.
- README and doc/analyzers/MsgPack004.md text, and the two docs contradict each other.

**How sure (the author's own view; it moves nothing):** High that the two edited index sites no longer throw. Medium that the crash is fully fixed: the issue names three indexing sites and only two are visibly changed. Medium on whether the tests cover the analyzer as well as the generator. Low on the docs: MsgPack004.md describes behavior the code does not have.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | backed | The BothStringAndIntKeyAreNull diagnostic no longer indexes `DeclaringSyntaxReferences[0]`. It uses a `FirstOrDefault`-based helper that returns null for metadata properties. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | - | yes |
| C2 | backed | The MemberNeedsKey diagnostic uses `FirstOrDefault()?` instead of `[0]`, so an unkeyed public member of a metadata type no longer throws. | "that collection is empty for a metadata symbol" | test run | - | yes |
| C3 | backed | Analyzer diagnostics are now reported only when their location is in a source tree of the current compilation. Diagnostics about metadata members are therefore dropped in the consuming project. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C4 | backed | The tests compile the defining source into a real metadata-only image, so the referenced types have no syntax, matching the bug's trigger. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C5 | backed | The tests assert that the generator run reports no warning-or-higher diagnostics and that the expected resolver hint name is generated. One test reproduces the issue's exact record-struct repro. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C6 | backed | The analyzer (AD0001) path is exercised through `VerifyCS.Test`. The diff does not show whether this source-generator verifier actually runs `MsgPack00xMessagePackAnalyzer`. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw" | test run | - | yes |
| C7 | backed | Scope: no public API, wire format or analyzer rule descriptors changed. The docs and the global diagnostic filter go beyond a minimal crash fix. | (scope) | static check | - | no |

**C1 (backed, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes `DeclaringSyntaxReferences[0]`. It uses a `FirstOrDefault`-based helper that returns null for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic uses `FirstOrDefault()?` instead of `[0]`, so an unkeyed public member of a metadata type no longer throws.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence high):** Analyzer diagnostics are now reported only when their location is in a source tree of the current compilation. Diagnostics about metadata members are therefore dropped in the consuming project.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, test, author confidence high):** The tests compile the defining source into a real metadata-only image, so the referenced types have no syntax, matching the bug's trigger.
- Lines: `GenericsFormatterTests.cs` L661-674, `GenericsFormatterTests.cs` L647-647
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C5 (backed, test, author confidence medium):** The tests assert that the generator run reports no warning-or-higher diagnostics and that the expected resolver hint name is generated. One test reproduces the issue's exact record-struct repro.
- Lines: `GenericsFormatterTests.cs` L553-579, `GenericsFormatterTests.cs` L651-658
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C6 (backed, test, author confidence low):** The analyzer (AD0001) path is exercised through `VerifyCS.Test`. The diff does not show whether this source-generator verifier actually runs `MsgPack00xMessagePackAnalyzer`.
- Lines: `GenericsFormatterTests.cs` L637-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C7 (backed, scope, author confidence high):** Scope: no public API, wire format or analyzer rule descriptors changed. The docs and the global diagnostic filter go beyond a minimal crash fix.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S7 passed)

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

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `MsgPack004.md` L52 | The doc says members of a referenced-assembly type are reported in the consuming project at the using member. The code does the opposite: `ReportIfLocatedInCompilation` drops them, and README line 1642 says they are reported only by the defining assembly. The two docs contradict each other, and MsgPack004.md is false. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter applies to every analyzer diagnostic, not only metadata-member ones. Any existing diagnostic created with a null/Location.None location for a source type is now silently suppressed. This could hide real MsgPack00x reports that previously surfaced. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (lines 735, 1009, 1101 in 3.1.8). Only two are visibly changed in this diff. If a third direct index remains elsewhere in `GetObjectInfo`, another metadata path could still throw. Check with a grep for `DeclaringSyntaxReferences[0]`. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1434 | The hard cast was replaced with `as PropertyDeclarationSyntax`. For a source property declared as a positional record parameter (ParameterSyntax), BothStringAndIntKeyAreNull now gets a null location and is silently dropped by the filter, instead of being reported. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1077 | An unkeyed public member on a metadata type is no longer reported in the consumer. The generator may still emit or assume a formatter for that type, with no warning anywhere if the defining assembly did not run the analyzer (for example, a third-party package). | author (Claude) |

**Out of scope changes:**
- `README.md`: New user-facing section on generic types from referenced assemblies; not needed to fix the crash.
- `doc/analyzers/MsgPack004.md`: New section describing analyzer behavior for referenced types; inaccurate relative to the code.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global `ReportIfLocatedInCompilation` wrapper on all analyzer diagnostics, broader than replacing the `[0]` indexing.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

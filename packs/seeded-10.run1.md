# Evidence pack: REQ-2283 on `seeded-10`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `54089b73d3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s) |
| Pack id | `759f363a961a` |

## Routing: **FOCUSED READ**
- 2 refusal(s) on contracts/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.

**The owner must read** (4):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R1 contracts (AI-suggested)
- `doc/analyzers/MsgPack004.md`: R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1434-1434: claim C1 disputed

**Not required to read:**
- 1 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes `DeclaringSyntaxReferences[0]`. It uses a `FirstOrDefault`-based helper that returns null for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **disputed**: Neither named test exercises BothStringAndIntKeyAreNull (TypeCollector.cs:983-986) or GetPropertyIdentifierLocation (TypeCollector.cs:1434), because every Key attribute in ClosedGenericStruct_FromMetadataReference (GenericsFormatterTests.cs:517) and ClosedGenericRecordStruct_FromMetadataReference (GenericsFormatterTests.cs:559) uses integer key 0 (intKey != null). Also, the quoted requirement identifies three DeclaringSyntaxReferences[0] sites in GetObjectInfo (lines 735, 1009, 1101 in v3.1.8, corresponding to ~711, 985, 1077 with the 24-line offset), and the diff updates only two of them.


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

**How sure:** High that the two edited index sites no longer throw. Medium that the crash is fully fixed: the issue names three indexing sites and only two are visibly changed. Medium on whether the tests cover the analyzer as well as the generator. Low on the docs: MsgPack004.md describes behavior the code does not have.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C1 | DISPUTED | The BothStringAndIntKeyAreNull diagnostic no longer indexes `DeclaringSyntaxReferences[0]`. It uses a `FirstOrDefault`-based helper that returns null for metadata properties. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | disputed |
| C2 | backed | The MemberNeedsKey diagnostic uses `FirstOrDefault()?` instead of `[0]`, so an unkeyed public member of a metadata type no longer throws. | "that collection is empty for a metadata symbol" | test run | upheld |
| C3 | backed | Analyzer diagnostics are now reported only when their location is in a source tree of the current compilation. Diagnostics about metadata members are therefore dropped in the consuming project. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell |
| C4 | backed | The tests compile the defining source into a real metadata-only image, so the referenced types have no syntax, matching the bug's trigger. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld |
| C5 | backed | The tests assert that the generator run reports no warning-or-higher diagnostics and that the expected resolver hint name is generated. One test reproduces the issue's exact record-struct repro. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld |
| C6 | backed | The analyzer (AD0001) path is exercised through `VerifyCS.Test`. The diff does not show whether this source-generator verifier actually runs `MsgPack00xMessagePackAnalyzer`. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw" | test run | cannot_tell |
| C7 | backed | Scope: no public API, wire format or analyzer rule descriptors changed. The docs and the global diagnostic filter go beyond a minimal crash fix. | (scope) | static check | upheld |

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic uses `FirstOrDefault()?` instead of `[0]`, so an unkeyed public member of a metadata type no longer throws.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs:1077, which replaces DeclaringSyntaxReferences[0] with DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), yielding null (Location.None) instead of throwing on metadata symbols. Checked ClosedGenericStruct_FromMetadataReference_UnkeyedMember (GenericsFormatterTests.cs:590-626), which compiles a generic struct with an unattributed public int Unkeyed property (line 603) into a metadata image and consumes MyGenericStruct<int>, exercising MemberNeedsKey on a metadata member.

**C3 (backed, behavior, author confidence high):** Analyzer diagnostics are now reported only when their location is in a source tree of the current compilation. Diagnostics about metadata members are therefore dropped in the consuming project.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs:239 and 1444-1450 filter diagnostics passed to this.reportDiagnostic by diagnostic.Location.IsInSource && this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree), which drops Location.None diagnostics such as MemberNeedsKey on metadata members. However, the diff does not show MsgPack00xMessagePackAnalyzer.cs, the unseen parts of TypeCollector.cs (where GetObjectInfo takes ISymbol callerSymbol, which can be in the consuming compilation), or CSharpSourceGeneratorVerifier (GenericsFormatterTests.cs:7, 638), so the diff alone cannot confirm whether all metadata-member diagnostics are dropped or whether the named test runs the analyzer.

**C4 (backed, test, author confidence high):** The tests compile the defining source into a real metadata-only image, so the referenced types have no syntax, matching the bug's trigger.
- Lines: `GenericsFormatterTests.cs` L661-674, `GenericsFormatterTests.cs` L647-647
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked CompileToMetadataReferenceAsync (GenericsFormatterTests.cs:661-674), which emits the defining compilation to a MemoryStream and calls MetadataReference.CreateFromImage(stream.ToArray()) (line 673), creating PE metadata symbols with empty DeclaringSyntaxReferences, and adds that reference to both test runs (lines 647 and 652) for generic struct and record struct types.

**C5 (backed, test, author confidence medium):** The tests assert that the generator run reports no warning-or-higher diagnostics and that the expected resolver hint name is generated. One test reproduces the issue's exact record-struct repro.
- Lines: `GenericsFormatterTests.cs` L553-579, `GenericsFormatterTests.cs` L651-658
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked RunWithMetadataReferenceAsync (GenericsFormatterTests.cs:653-658), which runs MessagePackGenerator via CSharpGeneratorDriver, asserts no diagnostics of Warning severity or higher (catching CS8785), and asserts expectedResolverHintName is in GeneratedSources. Checked ClosedGenericRecordStruct_FromMetadataReference (lines 553-579), which reproduces Lib.Item<T> and App.Cmd from REQ-2283 with AppResolver added to verify resolver generation.

**C6 (backed, test, author confidence low):** The analyzer (AD0001) path is exercised through `VerifyCS.Test`. The diff does not show whether this source-generator verifier actually runs `MsgPack00xMessagePackAnalyzer`.
- Lines: `GenericsFormatterTests.cs` L637-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: RunWithMetadataReferenceAsync (GenericsFormatterTests.cs:638-648) uses VerifyCS.Test, aliased to CSharpSourceGeneratorVerifier<MessagePack.SourceGenerator.MessagePackGenerator> (line 7), while lines 653-655 run only CSharpGeneratorDriver. Because CSharpSourceGeneratorVerifier is not shown in the diff and Roslyn's base source-generator test harness does not attach DiagnosticAnalyzers unless overridden, the diff alone does not show whether MsgPack00xMessagePackAnalyzer (AD0001) runs.

**C7 (backed, scope, author confidence high):** Scope: no public API, wire format or analyzer rule descriptors changed. The docs and the global diagnostic filter go beyond a minimal crash fix.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S7 passed)
- Breaker: **upheld**: Checked all four changed files: only private members in TypeCollector.cs were modified or added, leaving public APIs, wire format, and analyzer rule descriptors untouched, while README.md:1639-1642, doc/analyzers/MsgPack004.md:49-52, and the ReportIfLocatedInCompilation filter (TypeCollector.cs:239, 1444-1450) go beyond replacing [0] with FirstOrDefault().


## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C1 disputed: Neither named test exercises BothStringAndIntKeyAreNull (TypeCollector.cs:983-986) or GetPropertyIdentifierLocation (TypeCollector.cs:1434), because every Key attribute in ClosedGenericStruct_FromMetadataReference (GenericsFormatterTests.cs:517) and ClosedGenericRecordStruct_FromMetadataReference (GenericsFormatterTests.cs:559) uses integer key 0 (intKey != null). Also, the quot | breaker (Gemini) |
| F2 | medium | `MsgPack004.md` L52 | The doc says members of a referenced-assembly type are reported in the consuming project at the using member. The code does the opposite: `ReportIfLocatedInCompilation` drops them, and README line 1642 says they are reported only by the defining assembly. The two docs contradict each other, and MsgPack004.md is false. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter applies to every analyzer diagnostic, not only metadata-member ones. Any existing diagnostic created with a null/Location.None location for a source type is now silently suppressed. This could hide real MsgPack00x reports that previously surfaced. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (lines 735, 1009, 1101 in 3.1.8). Only two are visibly changed in this diff. If a third direct index remains elsewhere in `GetObjectInfo`, another metadata path could still throw. Check with a grep for `DeclaringSyntaxReferences[0]`. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1434 | The hard cast was replaced with `as PropertyDeclarationSyntax`. For a source property declared as a positional record parameter (ParameterSyntax), BothStringAndIntKeyAreNull now gets a null location and is silently dropped by the filter, instead of being reported. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1077 | An unkeyed public member on a metadata type is no longer reported in the consumer. The generator may still emit or assume a formatter for that type, with no warning anywhere if the defining assembly did not run the analyzer (for example, a third-party package). | author (Claude) |
| F7 | medium | `MsgPack004.md` L52 | MsgPack004.md lines 51-52 claim that unattributed public members of types defined in referenced assemblies are reported in the consuming project at the member that uses the type, which is the exact opposite of the implemented behavior: TypeCollector.cs:1077 locates MemberNeedsKey on the member itself (null/Location.None for metadata), ReportIfLocatedInCompilation (TypeCollector.cs:239, 1446) drops | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops any diagnostic with !diagnostic.Location.IsInSource, silently suppressing valid diagnostics on symbols in the current compilation whenever a location helper returns null (Location.None). In particular, GetPropertyIdentifierLocation (line 1434) casts syntax via 'as PropertyDeclarationSyntax', which returns null for positional record/record struct primary-construct | breaker (Gemini) |
| F9 | medium | `TypeCollector.cs` L711 | REQ-2283 identified three direct DeclaringSyntaxReferences[0] indexing sites inside GetObjectInfo (lines 735, 1009, 1101 in v3.1.8). Accounting for the 24-line offset (1009 -> 985 and 1101 -> 1077), only two were fixed; the remaining site around line 711 is untouched and will still throw IndexOutOfRangeException if a metadata closed generic value type hits that diagnostic path. | breaker (Gemini) |

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
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

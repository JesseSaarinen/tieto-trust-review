# Evidence pack: REQ-2283 on `seeded-02`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `737920087446` |

## Routing: **FOCUSED READ**
- 2 refusal(s) on contracts/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.

**The owner must read** (4):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R1 contracts (AI-suggested)
- `README.md`: R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1434-1434: claim C1 disputed

**Not required to read:**
- 1 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic now uses a helper that returns null instead of indexing `DeclaringSyntaxReferences[0]`. A property from metadata therefore no longer throws at this site.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **disputed**: While line 985 and GetPropertyIdentifierLocation at line 1434 replace DeclaringSyntaxReferences[0] with FirstOrDefault(), neither named test exercises this path: ClosedGenericStruct_FromMetadataReference uses [Key(0)] at line 517 and ClosedGenericRecordStruct_FromMetadataReference uses [property: Key(0)] at line 559, so intKey == null && stringKey == null at line 983 is always false and line 985 is never reached.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | The analyzer now silently suppresses every diagnostic whose location is not in the current compilation, including those with no location. | This changes which analyzer warnings users see across all rules, not only for this bug. That is a user-visible analyzer behavior decision. | `TypeCollector.cs` | AI reading |
| R2 | honesty | README and MsgPack004 docs assert a policy ('reported by the assembly that defines it') that the requirement did not ask for. The policy holds only if the defining project runs the analyzer. | This is a documentation commitment beyond the bug fix and may overstate the guarantee. | `README.md` | AI reading |

## 3. The story
Stops the generator and analyzer from crashing when a `[MessagePackObject]` type has a member whose type is a closed generic struct from a referenced assembly. Two diagnostic sites in `TypeCollector` no longer read `DeclaringSyntaxReferences[0]` directly (lines 985, 1077). Separately, every analyzer diagnostic now passes through a new filter (line 239, lines 1444-1450). The filter drops any diagnostic whose location is not a source tree of the current compilation. Three metadata-reference tests and two doc paragraphs are added.

**Why:** For a type that comes from metadata, `DeclaringSyntaxReferences` is empty, so indexing `[0]` throws `IndexOutOfRangeException`. That exception makes the generator emit nothing, so the consuming assembly ships without a resolver.

**Touches beyond the requirement:**
- The diagnostic filter at line 239 applies to every diagnostic `TypeCollector` reports, not only to metadata types. Any diagnostic whose location is null / `Location.None` is now silently dropped, even for types declared in source.
- README.md and MsgPack004.md gain new user-facing paragraphs. They state that diagnostics for referenced types are reported by the defining project.
- The issue names three crashing `[0]` sites. Only two are visibly changed; the third (issue's line 735) is not in the diff.

**How sure:** High that the reported repro no longer crashes: the new tests compile the defining code to a real metadata image and check both generator diagnostics and the resolver hint name. Medium on completeness, because one of the three sites named in the issue is not touched in the visible diff. Lower confidence that the global diagnostic filter hides nothing that was previously reported.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C1 | DISPUTED | The BothStringAndIntKeyAreNull diagnostic now uses a helper that returns null instead of indexing `DeclaringSyntaxReferences[0]`. A property from metadata therefore no longer throws at this site. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | disputed |
| C7 | unverified | The README and MsgPack004 docs add user-facing statements about how diagnostics for referenced types are reported. The requirement did not ask for this. | (scope) | AI reading only | upheld |
| C2 | backed | The MemberNeedsKey diagnostic now uses `FirstOrDefault()`. This diagnostic is built unconditionally, even when `reportDiagnostic` is null, so it is the most likely site where the generator itself crashed. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | upheld |
| C3 | backed | Diagnostics whose location is not in a syntax tree of the analyzed compilation are no longer reported. This applies to metadata types and also to any diagnostic created with a null location. | "A clean build, with a generated resolver in `app`." | test run | upheld |
| C4 | backed | The tests really exercise the metadata-only path and the requirement's expected outcome. They: emit the defining source to a PE image; reference it via `MetadataReference.CreateFromImage`; run the analyzer and generator verifier; assert that no warning-or-higher generator diagnostics appear (this would include CS8785); and assert that the resolver hint name is produced. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld |
| C5 | backed | The record-struct test uses exactly the `Item<T>` / `Cmd` repro from the issue, with the latest language version. | "public partial record struct Item<T>([property: Key(0)] string Key);" | test run | upheld |
| C6 | backed | No public API, analyzer rule descriptors, or wire format are changed. The new members are private. | (scope) | static check | upheld |

**C7 (unverified, docs, author confidence high):** The README and MsgPack004 docs add user-facing statements about how diagnostics for referenced types are reported. The requirement did not ask for this.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L49-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643 and doc/analyzers/MsgPack004.md lines 49-52 against REQ-2283: both files add user-facing documentation about referenced-assembly member diagnostics being reported only in the defining assembly, which was not requested in the issue.

**C2 (backed, behavior, author confidence medium):** The MemberNeedsKey diagnostic now uses `FirstOrDefault()`. This diagnostic is built unconditionally, even when `reportDiagnostic` is null, so it is the most likely site where the generator itself crashed.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1075-1081 and GenericsFormatterTests.cs line 603: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation() at line 1077, the Diagnostic instance is constructed before the accessibility check at line 1078 and before this.reportDiagnostic?.Invoke at line 1080 (so it executes even when reportDiagnostic is null in the generator), and ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises it via an unkeyed public property on a metadata generic struct.

**C3 (backed, behavior, author confidence medium):** Diagnostics whose location is not in a syntax tree of the analyzed compilation are no longer reported. This applies to metadata types and also to any diagnostic created with a null location.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 239 and 1444-1450: this.reportDiagnostic wraps reportAnalyzerDiagnostic in ReportIfLocatedInCompilation, which checks diagnostic.Location.IsInSource && this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree). Both foreign syntax trees and null locations (which become Location.None where IsInSource is false) fail this check and are not reported, as exercised by ClosedGenericStruct_FromMetadataReference_UnkeyedMember.

**C4 (backed, test, author confidence high):** The tests really exercise the metadata-only path and the requirement's expected outcome. They: emit the defining source to a PE image; reference it via `MetadataReference.CreateFromImage`; run the analyzer and generator verifier; assert that no warning-or-higher generator diagnostics appear (this would include CS8785); and assert that the resolver hint name is produced.
- Lines: `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 633-674: CompileToMetadataReferenceAsync emits defineSource to a MemoryStream PE image (line 667) and wraps it with MetadataReference.CreateFromImage (line 673); RunWithMetadataReferenceAsync runs VerifyCS.Test with that metadata reference (lines 638-648), runs CSharpGeneratorDriver directly (lines 653-655), asserts no Warning-or-higher diagnostics are produced (line 656), and asserts expectedResolverHintName is in the generated hint names (line 658).

**C5 (backed, test, author confidence high):** The record-struct test uses exactly the `Item<T>` / `Cmd` repro from the issue, with the latest language version.
- Lines: `GenericsFormatterTests.cs` L551-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 551-580: defineSource declares Lib.Item<T> and usageSource declares App.Cmd matching the issue repro types, and line 579 passes LanguageVersion.Latest.

**C6 (backed, scope, author confidence high):** No public API, analyzer rule descriptors, or wire format are changed. The new members are private.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all hunks in TypeCollector.cs and the other changed files: no public APIs in shipped assemblies, analyzer rule descriptors, or serialization code were modified, and both new helper methods in TypeCollector.cs (GetPropertyIdentifierLocation at line 1434 and ReportIfLocatedInCompilation at line 1444) are private.


## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L983 | Claim C1 disputed: While line 985 and GetPropertyIdentifierLocation at line 1434 replace DeclaringSyntaxReferences[0] with FirstOrDefault(), neither named test exercises this path: ClosedGenericStruct_FromMetadataReference uses [Key(0)] at line 517 and ClosedGenericRecordStruct_FromMetadataReference uses [property: Key(0)] at line 559, so intKey == null && stringKey == null at line 983 is always f | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is `Location.None`, not just those for metadata types. Helpers like `GetIdentifierLocation`, `GetLocation`, and `GetParameterListLocation` can return null even for source types (e.g. a partial/synthesized member without matching syntax), so diagnostics that previously surfaced with no location may now be silently swallowed. It also only checks the p | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1077 | The issue names three `DeclaringSyntaxReferences[0]` sites (its lines 735, 1009, 1101); only two are changed in this diff. If the third, earlier site still indexes `[0]` and is reachable for metadata types, other shapes of referenced generic structs may still crash. That would include those that only the generator path hits, where `reportDiagnostic` is null and the filter does not help. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1080 | For a referenced type with an unkeyed public member, the consumer now gets no diagnostic and the generator proceeds. The docs say the defining project reports it, but that is only true if the defining project runs the MessagePack analyzer. A NuGet package built without it gives the consumer no warning about a type that may not serialize as expected. | author (Claude) |
| F5 | low | `GenericsFormatterTests.cs` L641 | `SkipGeneratedSourcesCheck` means the content of the generated resolver is never checked. The tests only check that the resolver exists (by hint name) and that no diagnostics appear, not that a formatter for `MyGenericStruct<int>` / `Item<int>` is produced correctly. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops any diagnostic whose Location is Location.None (because Location.None.IsInSource is false), even though Roslyn analyzers are permitted to report Location.None diagnostics and only forbid locations in a foreign SyntaxTree. Because it filters on IsInSource rather than checking whether the analyzed symbol belongs to this.compilation.Assembly, diagnostics on types de | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New section 'Generic types from referenced assemblies' documenting diagnostic-ownership behavior.
- `doc/analyzers/MsgPack004.md`: New section saying the analyzer only reports on members declared in the current project.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global diagnostic filter (`ReportIfLocatedInCompilation`) changes reporting for all diagnostics. Replacing the `[0]` indexing alone would have fixed the crash.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s)

## 8. What was NOT checked
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

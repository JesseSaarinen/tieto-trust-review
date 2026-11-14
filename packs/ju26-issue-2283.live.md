# Evidence pack: REQ-2283 on `ju26-issue-2283`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `9df83c3840` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s) |
| Pack id | `34ef9fc970f1` |

## Routing: **FOCUSED READ**
- 2 refusal(s) on contracts/honesty grounds need a human look.

**The owner must read** (2):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R1 contracts (AI-suggested)
- `README.md`: R2 honesty (AI-suggested)

**Not required to read:**
- 1 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Analyzer now suppresses all diagnostics whose location is outside the current compilation, including Location.None. | This changes user-visible analyzer behavior; some previously reported warnings or errors may disappear. That is a product decision, not a crash fix. | `TypeCollector.cs` | AI reading |
| R2 | honesty | README and MsgPack004.md documentation committing to a policy that referenced-assembly diagnostics belong to the defining project. | Neither the documentation nor the policy was requested by the requirement; the owner should decide whether to adopt it publicly. | `README.md` | AI reading |

## 3. The story
Fixes a crash in the MessagePack source generator and analyzer when a [MessagePackObject] type has a member whose type is a closed generic struct from another assembly. In TypeCollector, two places read `DeclaringSyntaxReferences[0]` directly; they now use null-safe lookups (line 985 through a new helper at 1434, line 1077 with `FirstOrDefault()`). Separately, every analyzer diagnostic now passes through a new filter (239, 1444-1450). The filter silently drops any diagnostic whose location is not a source tree in the current compilation. Three new tests build the defining code into a real metadata-only assembly. They assert no diagnostics and that the resolver is generated. README and MsgPack004.md gain a paragraph describing the new suppression policy.

**Why:** Metadata symbols have no syntax references, so indexing `[0]` throws. The MemberNeedsKey diagnostic at old line 1076 is built unconditionally, so it crashes even in the generator, where no diagnostics are reported. That stops the resolver from being generated, which is the core harm in the issue.

**Touches beyond the requirement:**
- A global diagnostic filter (TypeCollector.cs 239, 1444-1450) that drops every analyzer diagnostic located outside the current compilation's syntax trees, including those with Location.None. This is a policy change, not only a crash fix.
- README.md section 'Generic types from referenced assemblies' (1639-1643).
- doc/analyzers/MsgPack004.md section 'Types from referenced assemblies' (48-52).

**How sure:** High that line 1077 was a real crash site and is now safe. Medium that the tests would fail without the fix: the unkeyed-member test clearly reaches line 1077, but the diff does not show which path the all-keyed struct and record-struct tests hit. The issue names three indexing sites (735, 1009, 1101 in 3.1.8). Only two edits are visible, and the diff does not show whether the third exists or is fixed. Medium-low that the new diagnostic filter has no unintended suppression for source types.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C7 | unverified | Only two indexing sites are edited, while the issue names three (735, 1009, 1101 in 3.1.8). The diff shows no change near the first one, so it is unverified whether a third `[0]` access remains. | "I did not narrow down which of the three fires." | AI reading only | upheld |
| C8 | unverified | The README and MsgPack004 docs add user-facing text stating that diagnostics for referenced-assembly types are not reported by the consumer. This documents the new filter policy, which the requirement did not ask for. | (scope) | AI reading only | upheld |
| C1 | backed | The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()?.GetSyntax().GetLocation()`. This expression is evaluated even when reportDiagnostic is null (the generator path), so this was a generator crash site. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld |
| C2 | backed | The BothStringAndIntKeyAreNull diagnostic now gets its location from a new private helper. The helper uses `FirstOrDefault()` and an `as PropertyDeclarationSyntax` cast, returning null for metadata properties instead of throwing. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | static check | upheld |
| C3 | backed | Analyzer diagnostics are now reported only when their location is in source and in a syntax tree of the current compilation; all others, including Location.None, are dropped. The generator path, where reportAnalyzerDiagnostic is null, is unaffected. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell |
| C4 | backed | The tests build the defining type into a real assembly image, referenced as metadata only, which matches the 'from a referenced assembly' trigger. One test reproduces the issue's record struct repro verbatim. Each test runs the analyzer+generator verifier, which fails on unexpected diagnostics such as AD0001/CS8785. Each also asserts that a generator driver run produces no warnings and emits the expected resolver hint name. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | cannot_tell |
| C5 | backed | The tests check that the resolver is actually generated, not just that nothing crashes, which addresses the silent-missing-resolver symptom. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld |
| C6 | backed | The source change is confined to TypeCollector.cs. It adds no public API, rule descriptors, or runtime serializer changes. | (scope) | static check | upheld |

**C7 (unverified, scope, author confidence low):** Only two indexing sites are edited, while the issue names three (735, 1009, 1101 in 3.1.8). The diff shows no change near the first one, so it is unverified whether a third `[0]` access remains.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1077-1077
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked all hunks in TypeCollector.cs against REQ-2283: only lines 985 and 1077 (matching 1009 and 1101 in 3.1.8 with a 24-line offset) were modified, and no hunk appears near line 711 (735 in 3.1.8), so whether that third DeclaringSyntaxReferences[0] access remains cannot be ruled out from the diff.

**C8 (unverified, docs, author confidence high):** The README and MsgPack004 docs add user-facing text stating that diagnostics for referenced-assembly types are not reported by the consumer. This documents the new filter policy, which the requirement did not ask for.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643 and doc/analyzers/MsgPack004.md lines 48-52 against REQ-2283: both files add user-facing documentation stating that member diagnostics for types from referenced assemblies are reported only when compiling the defining assembly, which was not requested in REQ-2283.

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()?.GetSyntax().GetLocation()`. This expression is evaluated even when reportDiagnostic is null (the generator path), so this was a generator crash site.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1075-1081: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation() instead of indexing [0], and the Diagnostic variable is still constructed unconditionally before both the accessibility check and this.reportDiagnostic?.Invoke(diagnostic), confirming it executed on the generator path when reportDiagnostic was null and is exercised by ClosedGenericStruct_FromMetadataReference_UnkeyedMember (and by private backing fields in all three metadata struct tests).

**C2 (backed, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from a new private helper. The helper uses `FirstOrDefault()` and an `as PropertyDeclarationSyntax` cast, returning null for metadata properties instead of throwing.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **static check** (static check S3 passed)
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1429-1434: BothStringAndIntKeyAreNull now passes GetPropertyIdentifierLocation(item), which uses property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and null-conditional access to return null rather than throwing on metadata properties.

**C3 (backed, behavior, author confidence medium):** Analyzer diagnostics are now reported only when their location is in source and in a syntax tree of the current compilation; all others, including Location.None, are dropped. The generator path, where reportAnalyzerDiagnostic is null, is unaffected.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: In TypeCollector.cs lines 239 and 1444-1450, TypeCollector wraps non-null reportAnalyzerDiagnostic in ReportIfLocatedInCompilation (dropping Location.None and trees outside this.compilation) while leaving null unchanged. However, the diff does not show MsgPack00xMessagePackAnalyzer.cs (which may report analyzer diagnostics outside TypeCollector), the callers of TypeCollector's private constructor to confirm reportAnalyzerDiagnostic is null on the generator path, or CSharpSourceGeneratorVerifier to confirm ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually executes the analyzer.

**C4 (backed, test, author confidence medium):** The tests build the defining type into a real assembly image, referenced as metadata only, which matches the 'from a referenced assembly' trigger. One test reproduces the issue's record struct repro verbatim. Each test runs the analyzer+generator verifier, which fails on unexpected diagnostics such as AD0001/CS8785. Each also asserts that a generator driver run produces no warnings and emits the expected resolver hint name.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 653-658 verify the generator driver run and expected resolver hint name, and lines 661-674 emit DefiningProject to a metadata-only image. However, whether VerifyCS.Test (lines 7, 638-648) actually runs MsgPack00xMessagePackAnalyzer to catch AD0001 depends on CSharpSourceGeneratorVerifier, which is not shown in the diff (standard CSharpSourceGeneratorTest does not run analyzers unless overridden). Also, ClosedGenericRecordStruct_FromMetadataReference (lines 575-576) adds an explicit [GeneratedMessagePackResolver] partial class AppResolver rather than relying on the default GeneratedMessagePackResolver as in the issue repro, and CompileToMetadataReferenceAsync compiles DefiningProject without running MessagePackGenerator on it.

**C5 (backed, test, author confidence high):** The tests check that the resolver is actually generated, not just that nothing crashes, which addresses the silent-missing-resolver symptom.
- Lines: `GenericsFormatterTests.cs` L650-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 650-658: RunWithMetadataReferenceAsync runs MessagePackGenerator via CSharpGeneratorDriver, asserts there are no warning-or-higher diagnostics, collects all GeneratedSources hint names, and asserts that expectedResolverHintName is present.

**C6 (backed, scope, author confidence high):** The source change is confined to TypeCollector.cs. It adds no public API, rule descriptors, or runtime serializer changes.
- Lines: `TypeCollector.cs` L1434-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked the changed-files list, static checks S3-S5, and all hunks in TypeCollector.cs (lines 239, 985, 1077, 1434-1450): TypeCollector.cs is the only modified source file, both added helpers are private, and no public API, analyzer rule descriptors, or runtime serialization code changed.


## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every analyzer diagnostic whose location is not in source, including Location.None. Any existing diagnostic for a source-declared type whose location helper returns null (e.g. GetParameterListLocation, GetIdentifierLocation) was previously reported at Location.None and is now silently suppressed. This could hide real user errors beyond the metadata case. No test covers that it doe | author (Claude) |
| F2 | low | `TypeCollector.cs` L239 | Problems in referenced-assembly types are now never surfaced in the consumer. This assumes the defining assembly ran the analyzer, which may be false for NuGet packages built without MessagePack's analyzer. A real misconfiguration could then go unreported anywhere. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (including one near line 735 in 3.1.8); this diff edits two. If a third unconditional `[0]` access remains in GetObjectInfo, other shapes of metadata generic struct could still crash. That cannot be confirmed from the visible hunks. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L507 | It is not demonstrated that ClosedGenericStruct_FromMetadataReference and ClosedGenericRecordStruct_FromMetadataReference fail without the fix. Their members are all keyed, so they may not reach line 1077, and the diff does not show which crash path they exercise. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops every diagnostic whose location is Location.None (since Location.None.IsInSource is false), which silently suppresses valid diagnostics for types declared in the current compilation whenever a location helper returns null. For example, GetPropertyIdentifierLocation (line 1434) casts the property syntax as PropertyDeclarationSyntax, returning null for in-source po | breaker (Gemini) |
| F6 | medium | `TypeCollector.cs` L1076 | In the true branch of the same unconditional ternary fixed on line 1077, Diagnostic.Create(MsgPack00xMessagePackAnalyzer.AOTDerivedKeyAttribute, derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation()) still assumes syntax exists. If a closed generic value type from a referenced assembly has any public or private member annotated with a custom attribute derived from KeyAttribute (with  | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New documentation section describing that referenced-assembly type diagnostics are reported only by the defining project.
- `doc/analyzers/MsgPack004.md`: New section documenting the same suppression policy for MsgPack004.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global ReportIfLocatedInCompilation filter (239, 1444-1450) changes diagnostic reporting for all diagnostics, not just the crashing indexing sites.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s)

## 8. What was NOT checked
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

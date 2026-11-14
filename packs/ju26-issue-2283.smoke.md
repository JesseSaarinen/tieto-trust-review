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
| Pack id | `619780c71ab1` |

## Routing: **FOCUSED READ**
- 2 refusal(s) on honesty/contracts grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test or static check).

**The owner must read** (5):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R1 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md`: R2 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C4 disputed; claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1077-1077: claim C4 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1434-1434: claim C2 only AI-read

**Not required to read:**
- 1 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (1)
**C4 (DISPUTED, behavior, author confidence low):** All three `DeclaringSyntaxReferences[0]` sites named in the issue are fixed. Only two edited sites are visible in the diff; the site the issue calls line 735 is not visibly changed.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1077-1077
- Checked by: **AI reading only**
- Breaker: **disputed**: The claim asserts that all three DeclaringSyntaxReferences[0] sites named in REQ-2283 are fixed, which is contradicted both by the diff and by the claim's own second sentence. TypeCollector.cs has only 3 removed lines in total (+26/-3): line 239 (constructor callback) and the two DeclaringSyntaxReferences[0] sites at lines 985 and 1077. The third site cited in REQ-2283 (line 735 in 3.1.8, around line 711 with the 24-line offset) is untouched in this diff.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | A global filter that suppresses any analyzer diagnostic not located in the current compilation's source trees. | This is a behavior change beyond the crash fix and can silently hide existing diagnostics for source types. A human should decide whether to scope it to metadata symbols only. | `TypeCollector.cs` | AI reading |
| R2 | contracts | User-visible analyzer behavior change: MsgPack004 and related diagnostics are no longer reported for members of referenced-assembly types, and the docs present this as policy. | This changes what users see from an existing analyzer rule and documents it as intended behavior. That is a product decision rather than a bug fix. | `MsgPack004.md` | AI reading |

## 3. The story
Stops the generator and the MsgPack00x analyzer from crashing on a closed generic struct from a referenced assembly. Two diagnostic sites in `TypeCollector.GetObjectInfo` that indexed `DeclaringSyntaxReferences[0]` now use `FirstOrDefault()`. The analyzer's report callback is also wrapped in a new filter that drops any diagnostic whose location is not in a source tree of the current compilation. Three metadata-reference tests were added, one of them the issue's exact repro. README and MsgPack004 docs gained a paragraph on this behavior.

**Why:** For a metadata symbol, `DeclaringSyntaxReferences` is empty. Indexing `[0]` throws, the generator then contributes nothing, and the app ships without a resolver.

**Touches beyond the requirement:**
- A new reporting filter (`ReportIfLocatedInCompilation`) applies to every analyzer diagnostic, not just ones about metadata types.
- README gained a section on generic types from referenced assemblies.
- doc/analyzers/MsgPack004.md gained a section stating that members from referenced assemblies are not reported.

**How sure:** High that the two edited sites can no longer throw. Medium that the visible changes cover every crash path: the issue names three indexing sites and only two visibly change. The record-struct repro test passing is the main evidence for the rest. Medium that the global filter has no side effects on diagnostics for source types that were previously reported with no location.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C4 | DISPUTED | All three `DeclaringSyntaxReferences[0]` sites named in the issue are fixed. Only two edited sites are visible in the diff; the site the issue calls line 735 is not visibly changed. | "I did not narrow down which of the three fires." | AI reading only | disputed |
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic location now comes from a new null-safe helper, `GetPropertyIdentifierLocation`. It returns null for metadata properties instead of indexing `[0]`. | "that collection is empty for a metadata symbol" | AI reading only | upheld |
| C1 | backed | The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()`. This expression is evaluated unconditionally, so it is the likely generator (CS8785) crash site. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld |
| C3 | backed | The analyzer's report callback is wrapped so that only diagnostics located in a syntax tree of the current compilation are reported. Diagnostics about metadata types, which now have Location.None, are silently dropped. | "A clean build, with a generated resolver in `app`." | test run | upheld |
| C5 | backed | The tests compile the defining source to an emitted image and reference it as metadata only, so the defining types have no syntax. This matches the trigger condition. One test uses the issue's exact `Item<T>` / `Cmd` repro. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld |
| C6 | backed | The tests check that the generator produces no warning-or-higher diagnostics, which would catch CS8785. They also check that the expected resolver hint name is generated, which covers the 'no resolver' symptom. The diff does not show that the tests fail without the fix. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld |
| C7 | backed | No public API, analyzer rule descriptor, or wire format changes. The new members are private, and the docs are the only non-code additions. | (scope) | static check | upheld |

**C2 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic location now comes from a new null-safe helper, `GetPropertyIdentifierLocation`. It returns null for metadata properties instead of indexing `[0]`.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1434. Line 985 passes GetPropertyIdentifierLocation(item), which uses DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and null-conditional navigation, returning null instead of indexing [0] when DeclaringSyntaxReferences is empty on metadata properties.

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()`. This expression is evaluated unconditionally, so it is the likely generator (CS8785) crash site.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1075-1081 and test ClosedGenericStruct_FromMetadataReference_UnkeyedMember. Line 1077 replaces DeclaringSyntaxReferences[0] with DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(). Within the ContainingType and non-derivedKeyAttribute branch (lines 1073-1077), Diagnostic.Create is evaluated eagerly before both the public-accessibility check on line 1078 and this.reportDiagnostic?.Invoke on line 1080, which explains why the generator crashed even when reportDiagnostic was null and even on structs whose unkeyed fields were private compiler-generated backing fields.

**C3 (backed, behavior, author confidence medium):** The analyzer's report callback is wrapped so that only diagnostics located in a syntax tree of the current compilation are reported. Diagnostics about metadata types, which now have Location.None, are silently dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S4 passed)
- Breaker: **upheld**: Checked TypeCollector.cs lines 239 and 1444-1450 and test ClosedGenericStruct_FromMetadataReference_UnkeyedMember. Line 239 wraps reportAnalyzerDiagnostic in ReportIfLocatedInCompilation, which only forwards diagnostics when diagnostic.Location.IsInSource is true and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) holds, dropping Location.None diagnostics created for metadata members.

**C5 (backed, test, author confidence medium):** The tests compile the defining source to an emitted image and reference it as metadata only, so the defining types have no syntax. This matches the trigger condition. One test uses the issue's exact `Item<T>` / `Cmd` repro.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 507-674. CompileToMetadataReferenceAsync (lines 661-674) emits defineSource into a PE image in memory and wraps it via MetadataReference.CreateFromImage so the referenced generic structs have no DeclaringSyntaxReferences, and ClosedGenericRecordStruct_FromMetadataReference (lines 551-580) uses the exact Item<T> and Cmd declarations from REQ-2283.

**C6 (backed, test, author confidence medium):** The tests check that the generator produces no warning-or-higher diagnostics, which would catch CS8785. They also check that the expected resolver hint name is generated, which covers the 'no resolver' symptom. The diff does not show that the tests fail without the fix.
- Lines: `GenericsFormatterTests.cs` L637-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 637-658. RunWithMetadataReferenceAsync runs VerifyCS.Test (failing on analyzer or generator diagnostics) and also runs CSharpGeneratorDriver directly, asserting no warning-or-higher diagnostics in runResult.Diagnostics (line 656, which catches warning CS8785) and asserting expectedResolverHintName is present in GeneratedSources (lines 657-658). As stated, a diff alone does not show pre-fix failure.

**C7 (backed, scope, author confidence high):** No public API, analyzer rule descriptor, or wire format changes. The new members are private, and the docs are the only non-code additions.
- Lines: `TypeCollector.cs` L1429-1450, `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files. GetPropertyIdentifierLocation (line 1434) and ReportIfLocatedInCompilation (line 1444) in TypeCollector.cs are private, no DiagnosticDescriptor or wire-format serialization code is touched, and the only other non-test edits are markdown documentation in README.md and doc/analyzers/MsgPack004.md.


## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C4 disputed: The claim asserts that all three DeclaringSyntaxReferences[0] sites named in REQ-2283 are fixed, which is contradicted both by the diff and by the claim's own second sentence. TypeCollector.cs has only 3 removed lines in total (+26/-3): line 239 (constructor callback) and the two DeclaringSyntaxReferences[0] sites at lines 985 and 1077. The third site cited in REQ-2283 (line 735 | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter applies to every analyzer diagnostic. Any diagnostic about a type declared in source that is created with a null location is now silently dropped instead of reported with Location.None, for example when `GetIdentifierLocation` or `GetParameterListLocation` returns null. This is broader than the metadata-symbol case and could hide existing warnings. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101), but only two edits are visible. If the third site still indexes `[0]`, other type shapes from metadata may still crash. Grep for remaining `DeclaringSyntaxReferences[0]` occurrences. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1446 | Problems with metadata types, such as an unkeyed public member, are now dropped without any signal in the consuming project. The consuming project's generator still emits a formatter for the closed type. If the defining assembly was not built with this analyzer, nobody is warned. | author (Claude) |
| F5 | low | `README.md` L1642 | The doc says diagnostics are reported by the defining assembly. That only holds if the defining project runs the MessagePack analyzer, which is not guaranteed for third-party NuGet packages. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax, but for a positional record or record struct declared in the current compilation (e.g. record Cmd([property: Key(null!)] string Scope)), the synthesized IPropertySymbol's declaring syntax is ParameterSyntax rather than PropertyDeclarationSyntax. GetPropertyIdentifierLo | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: A new user-facing section on generic types from referenced assemblies; not needed to fix the crash.
- `doc/analyzers/MsgPack004.md`: A new section documenting that MsgPack004 no longer reports on referenced-assembly members.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: A global analyzer diagnostic filter (`ReportIfLocatedInCompilation`) that affects all diagnostics. Null-safe location lookups alone would have stopped the crash.

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

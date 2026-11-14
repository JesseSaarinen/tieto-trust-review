# Evidence pack: REQ-2283 on `seeded-10`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 77 of 218 changed code lines (35%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 38%.

- 3 refusal(s) on honesty/contracts grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 high-severity finding(s).
- Evidence took 141 of 218 changed code lines off the list (C1, C5, C6, C8, C9: tests found passing in the real run, claim upheld by the breaker). 77 stay with the owner.
- Why lines stay: 45 passing test, but not upheld by the breaker; 15 refused; 7 no claim covers the line; 5 named by a finding; 5 claim disputed.

**The owner must read** (4 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R1 honesty (AI-suggested); F5 author (Claude)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1077, L1429-1451 (27 of 29 changed lines): F1 breaker (Gemini); claim C3 disputed; F4 author (Claude); F7 breaker (Gemini); F8 breaker (Gemini); no claim covers these lines; R2 contracts (AI-suggested); F2 author (Claude); F9 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581-627, L660, L685 (50 of 189 changed lines): no claim covers these lines; C7 passed its tests but the breaker did not uphold it

**Not required to read:**
- 141 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C9, C5, C6, C8

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `54089b73d3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 11,818 in / 8,914 out, 78 s, $0.23 |
| Breaker model | gemini-4-carbon: 51,914 in / 50,887 out, 552 s, $0.61 |
| Cost and time | $0.84 at list price, 630 s for this pack (tests reused from an earlier run of this commit: 43 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s) |
| Pack id | `845cf8d8f76e` |

## 1. Disputed claims (1)
**C3 (DISPUTED, behavior, author confidence low):** The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper returns null instead of indexing `DeclaringSyntaxReferences[0]` when the property has no source declaration. No test exercises this path, because no test uses a null key.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **disputed**: GetPropertyIdentifierLocation on TypeCollector.cs line 1434 did not only replace [0] with FirstOrDefault(); it also replaced the explicit (PropertyDeclarationSyntax) cast with 'as PropertyDeclarationSyntax'. Consequently, contrary to the claim and the cited XML comment on line 1433, it also returns null when a property IS declared in source via a record or record struct primary constructor (where GetSyntax() is ParameterSyntax), causing ReportIfLocatedInCompilation to silently drop BothStringAndIntKeyAreNull for source positional record properties. Also, from the diff alone one can only verify that the 3 new tests do not use a null key, not the entire test suite.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The MsgPack004 documentation describes behaviour (reporting metadata-type members in the consumer) that the code and tests contradict. | The docs do not match the implementation, and the README added in the same change says the opposite. | `MsgPack004.md` L48-52 | AI reading |
| R2 | contracts | User-visible analyzer behaviour change: all collector diagnostics without an in-compilation source location are now suppressed, and diagnostics for referenced-assembly types are deliberately never reported in consumers. | This is a policy decision about which analyzer diagnostics users see. It goes beyond fixing the crash and is documented in the README as a user-facing rule. | `TypeCollector.cs` L1436-1450 | AI reading |
| R3 | honesty | README section added that is not required by the bug fix. | The change goes beyond the requirement and states a reporting policy the owner should approve. | `README.md` L1639-1643 | AI reading |

## 3. The story
The fix stops the generator and analyzer crashing when a `[MessagePackObject]` type has a member whose type is a closed generic struct from a referenced assembly. It changes two diagnostic sites in `TypeCollector` that indexed `DeclaringSyntaxReferences[0]`. One now uses a new `GetPropertyIdentifierLocation` helper and the other uses `FirstOrDefault()`. It also wraps the collector's diagnostic reporter in a filter that silently drops any diagnostic whose location is not a source tree of the current compilation. Three tests compile a defining assembly to an image, reference it as metadata only, and check for no diagnostics and a generated resolver. Two doc sections were added.

**Why:** For metadata symbols `DeclaringSyntaxReferences` is empty, so `[0]` threw `IndexOutOfRangeException`. The generator then emitted nothing, which left the consuming assembly without a resolver.

**Touches beyond the requirement:**
- The reporter filter at TypeCollector.cs line 239 applies to every diagnostic the collector reports, not just metadata ones. Any diagnostic created with a null location (Location.None) is now dropped, including for source types.
- The cast at line 985 changed from a hard cast to `as PropertyDeclarationSyntax`. A source property whose syntax is not a property declaration (for example a positional record parameter) now gets a null location, and the filter drops that diagnostic.
- README.md and doc/analyzers/MsgPack004.md gained new sections. The two disagree with each other, and the MsgPack004 text disagrees with the code.

**How sure (the author's own view; it moves nothing):** Medium. The crash sites at lines 985 and 1077 and the metadata-only test harness look correct. However, the issue named three crashing sites (old lines 735, 1009, 1101) and only two are visibly changed. The BothStringAndIntKeyAreNull path at line 985 is not exercised by any test. The blanket filter changes behaviour for all diagnostics. The MsgPack004 doc describes behaviour the code does not have.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C3 | DISPUTED | The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper returns null instead of indexing `DeclaringSyntaxReferences[0]` when the property has no source declaration. No test exercises this path, because no test uses a null key. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | disputed | no |
| C10 | unverified | The new README section says closed generic value types from referenced assemblies are supported. It says diagnostics about their members are reported by the defining assembly rather than the consumer. This matches the filter in C2. | (scope) | AI reading only | upheld | no |
| C11 | unverified | The new MsgPack004.md section says members of referenced-assembly types are reported in the consuming project at the using member. The code drops those diagnostics (C2) and test C7 asserts no diagnostic, so this doc statement is not backed by the change. | (scope) | AI reading only | upheld | no |
| C1 | backed | The collector's reporter is now wrapped so that every diagnostic passes through ReportIfLocatedInCompilation before reaching the analyzer callback. When no callback is given it stays null. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C2 | backed | ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its syntax tree belongs to the current compilation. Diagnostics about metadata members, which have a null location, are silently dropped instead of being reported or throwing. | "that collection is empty for a metadata symbol" | test run | upheld | yes |
| C4 | backed | The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws. | "instead of using `FirstOrDefault()` the way the neighbouring `GetIdentifierLocation` / `Ge…" | test run | upheld | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a closed generic plain struct `MyGenericStruct<int>`, defined in a metadata-only assembly, as a keyed member. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`. | "`struct Item<T>` \| **crash**" | test run | upheld | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app pair nearly verbatim: a record struct `Item<T>` and a record `Cmd` with an `Item<int>` member. It adds a GeneratedMessagePackResolver, compiles at LanguageVersion.Latest, and asserts that `App.AppResolver.g.cs` is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember defines a metadata struct with a public unkeyed member. It asserts that the consuming project gets no diagnostics at all and that the resolver is still generated. This pins down the 'drop, don't report' behaviour. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell | no |
| C8 | backed | RunWithMetadataReferenceAsync runs the verifier with the defining assembly added only as a metadata reference. It then runs the generator directly and asserts two things: no Warning-or-higher diagnostics, which would include CS8785, and that the expected resolver hint name is among the generated sources. Whether the VerifyCS step also runs MsgPack00xMessagePackAnalyzer, the AD0001 path, is not visible in this diff. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C9 | backed | The helpers CompileToMetadataReferenceAsync and CreateCompilation, together with the new usings, emit the defining source to an in-memory image. The test then references it via MetadataReference.CreateFromImage, so the defining types have no syntax. Emit failures throw. | "which is what makes this specific to metadata symbols" | test run | upheld | yes |
| C12 | backed | Scope: the only source change is in TypeCollector.cs. There are no new public declarations, no new rule descriptors and no wire-format changes. However, the reporter filter changes delivery of all collector diagnostics, not just those for metadata types. | (scope) | static check | upheld | no |

**C10 (unverified, docs, author confidence medium):** The new README section says closed generic value types from referenced assemblies are supported. It says diagnostics about their members are reported by the defining assembly rather than the consumer. This matches the filter in C2.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: the added section states that closed generic types (including generic value types and record structs) from referenced assemblies can be used as members of MessagePackObject types and that diagnostics on their members are reported by the defining assembly rather than the consuming project, matching C2's filter.

**C11 (unverified, docs, author confidence low):** The new MsgPack004.md section says members of referenced-assembly types are reported in the consuming project at the using member. The code drops those diagnostics (C2) and test C7 asserts no diagnostic, so this doc statement is not backed by the change.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52 against TypeCollector.cs lines 1077 and 1446: MsgPack004.md claims unattributed public members of referenced-assembly types are reported in the consuming project at the member using the type, whereas TypeCollector creates MemberNeedsKey with a null location for metadata members and ReportIfLocatedInCompilation drops it.

**C1 (backed, behavior, author confidence high):** The collector's reporter is now wrapped so that every diagnostic passes through ReportIfLocatedInCompilation before reaching the analyzer callback. When no callback is given it stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 236-243: reportAnalyzerDiagnostic is only stored in this.reportDiagnostic on line 239, staying null when reportAnalyzerDiagnostic is null and wrapping it in ReportIfLocatedInCompilation otherwise.

**C2 (backed, behavior, author confidence medium):** ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its syntax tree belongs to the current compilation. Diagnostics about metadata members, which have a null location, are silently dropped instead of being reported or throwing.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1436-1450: ReportIfLocatedInCompilation checks diagnostic.Location.IsInSource and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree), so diagnostics created with a null location (Location.None) have IsInSource == false and are dropped without calling report.

**C4 (backed, behavior, author confidence medium):** The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 590-626: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), avoiding IndexOutOfRangeException on unkeyed metadata members (both public ones tested by ClosedGenericStruct_FromMetadataReference_UnkeyedMember and private backing fields evaluated before line 1078).

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference uses a closed generic plain struct `MyGenericStruct<int>`, defined in a metadata-only assembly, as a keyed member. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: ClosedGenericStruct_FromMetadataReference defines plain struct MyGenericStruct<T> in defineSource, uses MyGenericStruct<int> on MyObject.Value in usageSource with MyResolver, and calls RunWithMetadataReferenceAsync expecting TempProject.MyResolver.g.cs.

**C6 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app pair nearly verbatim: a record struct `Item<T>` and a record `Cmd` with an `Item<int>` member. It adds a GeneratedMessagePackResolver, compiles at LanguageVersion.Latest, and asserts that `App.AppResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580: ClosedGenericRecordStruct_FromMetadataReference uses Lib.Item<T> record struct and App.Cmd record with Item<int> Member, adds AppResolver with GeneratedMessagePackResolver, compiles with LanguageVersion.Latest, and checks for App.AppResolver.g.cs.

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember defines a metadata struct with a public unkeyed member. It asserts that the consuming project gets no diagnostics at all and that the resolver is still generated. This pins down the 'drop, don't report' behaviour.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 582-626 delegate all assertions to RunWithMetadataReferenceAsync (lines 633-659), where line 656 only checks Diagnostics with Severity >= Warning rather than no diagnostics at all, and whether VerifyCS.Test on line 638 runs MsgPack00xMessagePackAnalyzer (or whether MessagePackGenerator passes a non-null reportAnalyzerDiagnostic) is not shown in the diff (as C8 notes). Without knowing whether reportAnalyzerDiagnostic is non-null, the diff alone cannot confirm this test exercises ReportIfLocatedInCompilation ('drop, don't report') rather than this.reportDiagnostic simply being null.

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs the verifier with the defining assembly added only as a metadata reference. It then runs the generator directly and asserts two things: no Warning-or-higher diagnostics, which would include CS8785, and that the expected resolver hint name is among the generated sources. Whether the VerifyCS step also runs MsgPack00xMessagePackAnalyzer, the AD0001 path, is not visible in this diff.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659: RunWithMetadataReferenceAsync adds definingAssembly as an additional MetadataReference to VerifyCS.Test, then runs MessagePackGenerator via CSharpGeneratorDriver asserting no Warning-or-higher diagnostics (which includes Roslyn's CS8785 generator-failure warning) and asserting expectedResolverHintName is in GeneratedSources, while CSharpSourceGeneratorVerifier's analyzer registration is outside the diff.

**C9 (backed, test, author confidence high):** The helpers CompileToMetadataReferenceAsync and CreateCompilation, together with the new usings, emit the defining source to an in-memory image. The test then references it via MetadataReference.CreateFromImage, so the defining types have no syntax. Emit failures throw.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4, 6, and 661-684: CompileToMetadataReferenceAsync and CreateCompilation parse and emit the defining source into a MemoryStream, throw InvalidOperationException when emitResult.Success is false, and return MetadataReference.CreateFromImage so referenced types are metadata-only.

**C12 (backed, scope, author confidence medium):** Scope: the only source change is in TypeCollector.cs. There are no new public declarations, no new rule descriptors and no wire-format changes. However, the reporter filter changes delivery of all collector diagnostics, not just those for metadata types.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all 4 changed files and TypeCollector.cs line 239: TypeCollector.cs is the only production code file modified, only private helpers were added, and wrapping this.reportDiagnostic applies ReportIfLocatedInCompilation to every diagnostic reported through the collector.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 7 of its 26 sentences.
Requirement sentences no claim quotes (19; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C3 disputed: GetPropertyIdentifierLocation on TypeCollector.cs line 1434 did not only replace [0] with FirstOrDefault(); it also replaced the explicit (PropertyDeclarationSyntax) cast with 'as PropertyDeclarationSyntax'. Consequently, contrary to the claim and the cited XML comment on line 1433, it also returns null when a property IS declared in source via a record or record struct primary  | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including Location.None diagnostics about source types. Previously those were reported, since analyzers may report Location.None. Any existing collector diagnostic whose location helper can return null for a source type would now vanish silently. No test checks that existing source-type diagnostics still fire. | author (Claude) |
| F3 | low | `TypeCollector.cs` L985 | The hard cast changed to `as PropertyDeclarationSyntax`. For a source property whose syntax is not a PropertyDeclarationSyntax (for example a positional record parameter with a null key), the location becomes null and the BothStringAndIntKeyAreNull diagnostic is now silently dropped. This path has no test. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1077 | The issue lists three crashing `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101), but the diff changes only two. If a third site remains elsewhere in GetObjectInfo, other metadata generic value types could still crash. Reviewers should grep for remaining `DeclaringSyntaxReferences[0]` usages. | author (Claude) |
| F5 | medium | `MsgPack004.md` L52 | The doc says unattributed public members of referenced-assembly types are flagged in the consuming project. The code drops these diagnostics and ClosedGenericStruct_FromMetadataReference_UnkeyedMember asserts none are reported. It also contradicts README line 1642. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1077 | For a metadata type with an unkeyed public member, the generator now proceeds silently and generates a formatter in the consuming assembly. The member problem is never surfaced anywhere if the defining assembly did not run the analyzer. | author (Claude) |
| F7 | high | `TypeCollector.cs` L1076 | In the ternary branch immediately above line 1077, AOTDerivedKeyAttribute still evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() unconditionally (even in the generator when reportDiagnostic is null and before line 1078's accessibility check). If a closed generic struct from a referenced assembly has a member annotated with a custom attribute derived from KeyAttribute,  | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts GetSyntax() 'as PropertyDeclarationSyntax', which evaluates to null for positional properties declared in source on a record or record struct primary constructor (whose syntax node is ParameterSyntax). Because ReportIfLocatedInCompilation on line 1446 requires diagnostic.Location.IsInSource, BothStringAndIntKeyAreNull is now silently dropped for positional recor | breaker (Gemini) |
| F9 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation (and README.md line 1642) assumes member diagnostics on referenced-assembly types are reported when compiling the defining assembly, but contract assemblies that only reference MessagePack.Annotations without MessagePack.SourceGenerator (or compile without analyzers, as CompileToMetadataReferenceAsync on GenericsFormatterTests.cs line 664 does) never run MsgPack00xMess | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: A new user-facing documentation section about generic types from referenced assemblies, including a policy statement about where diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: A new section describing cross-assembly reporting behaviour that the code does not implement.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: A blanket reporter filter (lines 239 and 1436-1450) that changes delivery of all collector diagnostics, broader than replacing the `[0]` indexing.

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

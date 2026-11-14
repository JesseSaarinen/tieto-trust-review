# Evidence pack: REQ-2283 on `seeded-20`

> Rebuilt offline from pack `27ddb79f16a0` (seeded-20.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 63 of 218 changed code lines (29%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 30%.

- 3 refusal(s) on honesty/contracts grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 155 of 218 changed code lines off the list (C1, C2, C4, C5, C6, C9: tests found passing in the real run, claim upheld by the breaker). 63 stay with the owner.
- Why lines stay: 25 refused; 20 claim disputed; 8 no claim covers the line; 5 named by a finding; 5 claim rests on AI reading only.

**The owner must read** (3 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1077, L1429-1451 (26 of 29 changed lines): F2 author (Claude); claim C3 only AI-read; F8 breaker (Gemini); F6 breaker (Gemini); no claim covers these lines; R2 honesty (AI-suggested); F3 author (Claude); F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581, L627-660, L685 (37 of 189 changed lines): no claim covers these lines; claim C7 disputed; F1 breaker (Gemini); R1 honesty (AI-suggested); F4 author (Claude)

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 155 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C2, C9, C4, C5, C6

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `24b4baece4` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (46s) |
| Pack id | `89ec5255a517` |

## 1. Disputed claims (1)
**C7 (DISPUTED, test, author confidence medium):** RunWithMetadataReferenceAsync runs the source-generator verifier with the defining assembly added only as an AdditionalReference, with the generated-source snapshot check skipped. It relies on the verifier failing on any unexpected diagnostic, such as CS8785 or AD0001.
- Lines: `GenericsFormatterTests.cs` L628-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **disputed**: In GenericsFormatterTests.cs lines 628-648, the requirement ('A clean build, with a generated resolver in app.') is only partly met and lines 631 and 633 in the cited range are contradicted: line 631 documents that RunWithMetadataReferenceAsync verifies 'that the resolver named expectedResolverHintName is generated', yet line 641 sets TestBehaviors = TestBehaviors.SkipGeneratedSourcesCheck (and lines 650-659 ignore expectedResolverHintName), so none of the three named tests verifies that a resolver is generated. Furthermore, CS8785 has DiagnosticSeverity.Warning (unlike AD0001, which is an analyzer diagnostic), and Microsoft.CodeAnalysis.Testing defaults SourceGeneratorTest.CompilerDiagnostics to CompilerDiagnostics.Errors; with SkipGeneratedSourcesCheck enabled at line 641, VerifyCS.Test will ignore CS8785 unless CSharpSourceGeneratorVerifier (not shown in the diff) overrides CompilerDiagnostics to include warnings.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test helper's resolver-generation check asserts nothing meaningful and ignores its expectedResolverHintName parameter. | The comment claims it verifies the resolver is generated (the user-visible symptom), but the assertions cannot fail for that defect. | `GenericsFormatterTests.cs` L650-659 | AI reading |
| R2 | honesty | Blanket suppression of all diagnostics lacking an in-compilation source location. | It goes beyond the requirement and changes which analyzer warnings users see across all types, not just metadata ones. | `TypeCollector.cs` L1436-1450 | AI reading |
| R3 | contracts | User-facing docs declare a new analyzer reporting policy (diagnostics for referenced-assembly types are reported only by the defining project). | This is a user-visible behavior commitment about analyzer output that the owner should decide. | `README.md` L1639-1643 | AI reading |

## 3. The story
Stops `TypeCollector` from indexing `DeclaringSyntaxReferences[0]` in two diagnostic paths: line 985 now uses a new `GetPropertyIdentifierLocation` helper and line 1077 uses `FirstOrDefault()`. It also wraps every analyzer diagnostic report in a filter that drops any diagnostic whose location is not a syntax tree of the current compilation. Three tests compile a defining library to metadata and use its closed generic struct or record struct as a member type. README and the MsgPack004 doc gain notes saying diagnostics for referenced-assembly types belong to the defining project.

**Why:** When a closed generic value type comes from a referenced assembly, `GetObjectInfo` runs on a symbol with no syntax. The `[0]` indexing then throws, the generator contributes nothing, and the app ships with no resolver.

**Touches beyond the requirement:**
- A blanket filter on all analyzer diagnostics (line 239, lines 1444-1450). It silently drops any diagnostic without an in-compilation source location, not only those for metadata types.
- Two user-facing docs (README, MsgPack004.md) that state a new policy: diagnostics for referenced-assembly types are reported only by the defining project.

**How sure (the author's own view; it moves nothing):** Medium. The two changed indexing sites are clearly safe now. However, the issue names three sites (old lines 735, 1009, 1101); the diff touches only two, roughly 25 lines below the old 1009 and 1101, so the third (~735) looks untouched. The verifier part of the tests plausibly catches CS8785/AD0001. The second half of the test helper asserts nothing useful, and its `expectedResolverHintName` parameter is never used. The line-985 change has no test.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C7 | DISPUTED | RunWithMetadataReferenceAsync runs the source-generator verifier with the defining assembly added only as an AdditionalReference, with the generated-source snapshot check skipped. It relies on the verifier failing on any unexpected diagnostic, such as CS8785 or AD0001. | "A clean build, with a generated resolver in `app`." | test run | disputed | no |
| C3 | unverified | The BothStringAndIntKeyAreNull diagnostic uses a new helper `GetPropertyIdentifierLocation`, which returns null when the property has no source declaration. Because it uses an `as` cast, it also returns null rather than throwing when the declaring syntax is not a PropertyDeclarationSyntax. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | AI reading only | upheld | no |
| C10 | unverified | README gains a section stating that closed generic types from referenced assemblies are supported as members and that their member diagnostics are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C11 | unverified | MsgPack004 doc gains a section stating the analyzer only reports on members declared in the project being compiled. | (scope) | AI reading only | upheld | no |
| C1 | backed | The analyzer's report callback is wrapped so a diagnostic is reported only when its Location is in source and its SourceTree belongs to the current compilation. Otherwise it is silently dropped. A null report callback stays null. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C2 | backed | The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`, so an unkeyed public member of a metadata type no longer throws IndexOutOfRangeException. The resulting location-less diagnostic is then dropped by the C1 filter. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | test run | upheld | yes |
| C4 | backed | Test ClosedGenericStruct_FromMetadataReference compiles a generic `[MessagePackObject]` struct into a metadata-only reference. It then runs the generator and analyzers on a class with a `MyGenericStruct<int>` member and expects no diagnostics. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | upheld | yes |
| C5 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact lib/app pair (record struct `Item<T>`, record `Cmd` with an `Item<int>` member) as a metadata reference, using LanguageVersion.Latest. | "Then `dotnet build` on `app`." | test run | upheld | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with an unkeyed public member. It expects no diagnostics, which asserts that MemberNeedsKey for metadata members is suppressed in the consuming project. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C8 | backed | The second half of RunWithMetadataReferenceAsync does not verify that a resolver was generated. It only asserts there are no Error-severity generator diagnostics (CS8785 is a warning) plus `Assert.NotNull` on a list that can never be null. `expectedResolverHintName` is never used. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C9 | backed | The test helpers CompileToMetadataReferenceAsync and CreateCompilation compile the defining source against net8.0 and MessagePack references, emit it to memory (throwing on failure), and wrap the image as a MetadataReference, so no syntax for it is available. The new usings support these helpers. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C12 | backed | Source changes are confined to diagnostic location and reporting in TypeCollector. No public API, analyzer rule descriptors or formatter/wire-format code changed. | (scope) | static check | upheld | no |

**C3 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic uses a new helper `GetPropertyIdentifierLocation`, which returns null when the property has no source declaration. Because it uses an `as` cast, it also returns null rather than throwing when the declaring syntax is not a PropertyDeclarationSyntax.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985 and lines 1429-1434: BothStringAndIntKeyAreNull calls GetPropertyIdentifierLocation(item), which uses FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and returns null both when DeclaringSyntaxReferences is empty and when the declaring syntax is not a PropertyDeclarationSyntax.

**C10 (unverified, docs, author confidence high):** README gains a section stating that closed generic types from referenced assemblies are supported as members and that their member diagnostics are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: adds the 'Generic types from referenced assemblies' subsection stating closed generic types (including generic value types and record structs) from referenced assemblies can be used as members of [MessagePackObject] types and that member diagnostics are reported by the defining assembly.

**C11 (unverified, docs, author confidence high):** MsgPack004 doc gains a section stating the analyzer only reports on members declared in the project being compiled.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: adds the 'Types from referenced assemblies' section stating the analyzer only reports on members declared in the project being compiled and that members of types from referenced assemblies are reported by their defining project.

**C1 (backed, behavior, author confidence high):** The analyzer's report callback is wrapped so a diagnostic is reported only when its Location is in source and its SourceTree belongs to the current compilation. Otherwise it is silently dropped. A null report callback stays null.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 239 and lines 1436-1450: when reportAnalyzerDiagnostic is null, this.reportDiagnostic stays null; otherwise it delegates to ReportIfLocatedInCompilation, which only invokes report(diagnostic) when diagnostic.Location.IsInSource and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) are both true. ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises dropping a metadata member diagnostic.

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`, so an unkeyed public member of a metadata type no longer throws IndexOutOfRangeException. The resulting location-less diagnostic is then dropped by the C1 filter.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077: MemberNeedsKey now resolves its location via item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), avoiding IndexOutOfRangeException when DeclaringSyntaxReferences is empty on metadata members and producing Location.None, which ReportIfLocatedInCompilation drops when invoked at line 1080. Tested by ClosedGenericStruct_FromMetadataReference_UnkeyedMember.

**C4 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference compiles a generic `[MessagePackObject]` struct into a metadata-only reference. It then runs the generator and analyzers on a class with a `MyGenericStruct<int>` member and expects no diagnostics.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: ClosedGenericStruct_FromMetadataReference defines generic [MessagePackObject] struct MyGenericStruct<T> in defineSource, consumes MyGenericStruct<int> on MyObject in usageSource, and calls RunWithMetadataReferenceAsync with no expected diagnostics.

**C5 (backed, test, author confidence medium):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact lib/app pair (record struct `Item<T>`, record `Cmd` with an `Item<int>` member) as a metadata reference, using LanguageVersion.Latest.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580: ClosedGenericRecordStruct_FromMetadataReference reproduces Lib.Item<T> (partial record struct) as the metadata reference and App.Cmd (sealed partial record with an Item<int> member) as the consuming source, passing LanguageVersion.Latest to RunWithMetadataReferenceAsync.

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with an unkeyed public member. It expects no diagnostics, which asserts that MemberNeedsKey for metadata members is suppressed in the consuming project.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 582-626: ClosedGenericStruct_FromMetadataReference_UnkeyedMember includes an unattributed public property Unkeyed on MyGenericStruct<T> in the metadata assembly and verifies via RunWithMetadataReferenceAsync that no MemberNeedsKey diagnostic is reported in the consuming compilation.

**C8 (backed, test, author confidence high):** The second half of RunWithMetadataReferenceAsync does not verify that a resolver was generated. It only asserts there are no Error-severity generator diagnostics (CS8785 is a warning) plus `Assert.NotNull` on a list that can never be null. `expectedResolverHintName` is never used.
- Lines: `GenericsFormatterTests.cs` L650-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 650-659 (and line 633): line 656 only asserts there are no Error-severity diagnostics (missing warning CS8785 and GeneratorRunResult.Exception), lines 657-658 only call Assert.NotNull on a ToList() result that is never null even when empty, and expectedResolverHintName is completely unused.

**C9 (backed, test, author confidence high):** The test helpers CompileToMetadataReferenceAsync and CreateCompilation compile the defining source against net8.0 and MessagePack references, emit it to memory (throwing on failure), and wrap the image as a MetadataReference, so no syntax for it is available. The new usings support these helpers.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and lines 661-684: CompileToMetadataReferenceAsync and CreateCompilation parse the source with the specified LanguageVersion, compile against net8.0 and MessagePack references as a DynamicallyLinkedLibrary, emit to a MemoryStream (throwing InvalidOperationException on failure), and wrap the emitted PE bytes via MetadataReference.CreateFromImage, using types from the newly imported Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing namespaces.

**C12 (backed, scope, author confidence high):** Source changes are confined to diagnostic location and reporting in TypeCollector. No public API, analyzer rule descriptors or formatter/wire-format code changed.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four modified files in the diff: production code changes exist only in TypeCollector.cs (private constructor diagnostic wrapper at line 239, diagnostic location calls at lines 985 and 1077, and two private helpers at lines 1434-1450), with no public API, analyzer descriptor, or wire-format/formatter changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L631 | Claim C7 disputed: In GenericsFormatterTests.cs lines 628-648, the requirement ('A clean build, with a generated resolver in app.') is only partly met and lines 631 and 633 in the cited range are contradicted: line 631 documents that RunWithMetadataReferenceAsync verifies 'that the resolver named expectedResolverHintName is generated', yet line 641 sets TestBehaviors = TestBehaviors.SkipGeneratedS | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The changed sites sit about 25 lines below the old 1009 and 1101, so the third site (~old 735, ~new 710) appears unchanged. If that path fires for some metadata types, the crash remains. No test shows which path the record-struct repro actually hits. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic without an in-compilation source location, including ones for source types whose location helper returned null (for example GetIdentifierLocation casts that yield null) or any diagnostic intentionally reported at Location.None. Legitimate warnings can disappear silently; this hides problems rather than fixing their location. | author (Claude) |
| F4 | medium | `GenericsFormatterTests.cs` L658 | `Assert.NotNull(hintNames)` can never fail, and `expectedResolverHintName` is unused. The 'resolver was actually generated' check the comment promises does not exist. Assert.Empty only looks at Error severity, while CS8785 is a warning. | author (Claude) |
| F5 | low | `TypeCollector.cs` L985 | The changed BothStringAndIntKeyAreNull path has no test exercising it with a metadata type. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation uses 'as PropertyDeclarationSyntax', which returns null for positional record and record struct properties declared in source in the current compilation (e.g., 'public record Cmd([property: Key((string?)null!)] string Scope)'), because Roslyn's DeclaringSyntaxReferences[0].GetSyntax() for a positional record property is ParameterSyntax, not PropertyDeclarationSyntax.  | breaker (Gemini) |
| F7 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation filters diagnostics by diagnostic.Location.IsInSource rather than checking whether the analyzed type belongs to this.compilation.Assembly. Consequently, any Location.None diagnostic legitimately produced for a type in the current compilation (for instance via GetParameterListLocation at line 1454 when method is null or an implicitly declared constructor with empty Decl | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | Immediately above the fixed MemberNeedsKey branch on line 1077, the AOTDerivedKeyAttribute branch still calls derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() unconditionally (even in MessagePackGenerator where reportDiagnostic is null and before line 1078 checks accessibility). If a closed generic value type in a referenced assembly has a member annotated with an attribute deri | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New documentation section defining a policy for diagnostics on referenced-assembly types; not required to fix the crash.
- `doc/analyzers/MsgPack004.md`: New documentation section on analyzer scope; not required to fix the crash.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global diagnostic filter (line 239, lines 1436-1450) is broader than replacing the `[0]` indexing.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (46s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

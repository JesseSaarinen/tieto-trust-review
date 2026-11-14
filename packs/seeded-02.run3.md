# Evidence pack: REQ-2283 on `seeded-02`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 78 of 218 changed code lines (36%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 39%.

- 3 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 140 of 218 changed code lines off the list (C1, C4, C5, C7, C8: tests found passing in the real run, claim upheld by the breaker). 78 stay with the owner.
- Why lines stay: 47 passing test, but not upheld by the breaker; 15 refused; 7 no claim covers the line; 6 claim rests on AI reading only; 3 named by a finding.

**The owner must read** (4 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (28 of 29 changed lines): C3 passed its tests but the breaker did not uphold it; F3 author (Claude); claim C2 only AI-read; F7 breaker (Gemini); no claim covers these lines; R1 honesty (AI-suggested); F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581-627, L660, L685 (50 of 189 changed lines): no claim covers these lines; C6 passed its tests but the breaker did not uphold it

**Not required to read:**
- 140 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C8, C5, C4, C7

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 11,794 in / 9,715 out, 85 s, $0.24 |
| Breaker model | gemini-4-carbon: 51,816 in / 40,004 out, 561 s, $0.50 |
| Cost and time | $0.75 at list price, 646 s for this pack (tests reused from an earlier run of this commit: 34 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `c4969ea8947a` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | A global filter silently suppresses every analyzer diagnostic whose location is not in the current compilation, including Location.None diagnostics on the user's own source types. | This is a user-visible change in analyzer behaviour beyond fixing the crash. A human should decide whether swallowing diagnostics, rather than reporting them at Location.None or at the referencing member, is acceptable. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | New documentation promises a policy (diagnostics for referenced types are reported only by the defining assembly) that the requirement did not ask for. | These docs codify a design decision introduced by this change, not by the requirement. | `MsgPack004.md` L48-52 | AI reading |
| R3 | honesty | README section documenting the same new diagnostics policy and support claim. | Beyond the requirement. It states support (including generic record structs) that the tests verify only to the extent of producing a resolver hint name. | `README.md` L1639-1643 | AI reading |

## 3. The story
Stops the source generator and the MsgPack00x analyzer from crashing when a `[MessagePackObject]` member's type is a closed generic struct defined in a referenced assembly. Two diagnostic paths in `TypeCollector.GetObjectInfo` indexed `DeclaringSyntaxReferences[0]`, which is empty for metadata symbols. They now use null-safe lookups (lines 985, 1077, plus a new helper at 1434). Separately, every diagnostic the analyzer reports through `TypeCollector` now goes through a wrapper (239, 1444-1450). The wrapper drops any diagnostic whose location is not in a syntax tree of the current compilation. Three new tests compile a defining assembly to a metadata-only image and then check two things: no diagnostics from the verifier, and a resolver hint name in the generator's output. README and MsgPack004.md gain paragraphs describing the new behaviour.

**Why:** REQ-2283 asks for a clean build and a generated resolver when a closed generic value type comes from a referenced assembly. Today the generator throws and silently emits no resolver.

**Touches beyond the requirement:**
- The diagnostic filter at TypeCollector.cs 239/1444-1450 applies to every analyzer diagnostic, not only the two crash sites. It silently drops any diagnostic whose location is Location.None, including ones about the user's own source types where a location helper returns null.
- New documentation in README.md (1639-1643) and doc/analyzers/MsgPack004.md (48-52) promising that diagnostics for referenced types are reported by the defining assembly.

**How sure (the author's own view; it moves nothing):** Medium. Line 1077 is evaluated unconditionally on the ternary path, and the old code indexed [0] there, so the switch to FirstOrDefault plausibly removes the generator crash. The tests reproduce the issue's record-struct case with a real metadata reference and assert that a resolver is generated. The issue names three [0] indexing sites, but only two are visibly changed; I cannot see whether the third (issue's line 735) was already safe or is unreachable. I also cannot confirm that VerifyCS.Test runs the MsgPack00x analyzer, so the AD0001 half of the fix is less certain than the CS8785 half.

## 4. Claims (11)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic gets its location from the new GetPropertyIdentifierLocation helper. The helper uses FirstOrDefault and an `as PropertyDeclarationSyntax` cast, and returns null for metadata properties instead of throwing. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld | no |
| C9 | unverified | README gains a section saying closed generic types from referenced assemblies, including generic value types and record structs, are supported. It also says member diagnostics for such types are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C1 | backed | The MemberNeedsKey diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses FirstOrDefault()?, so a member of a metadata type with no syntax yields a null location instead of throwing IndexOutOfRangeException. The ternary is evaluated even when reportDiagnostic is null, so this also affects the generator path. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C3 | backed | When an analyzer callback is supplied, reportDiagnostic is wrapped so a diagnostic is forwarded only if its location IsInSource and its SourceTree belongs to the current compilation. Diagnostics with null or metadata locations are dropped rather than reported. When no callback is supplied (generator path), reportDiagnostic stays null. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C4 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact repro. A `partial record struct Item<T>` compiled into a separate metadata-only assembly is used as `Item<int>` in a positional record `Cmd`, and the test requires no diagnostics plus a generated `App.AppResolver.g.cs`. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference covers the plain `struct Item<T>` row of the issue's trigger table. A generic struct from a metadata reference is used as `MyGenericStruct<int>`, with a resolver expected. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with a public member that has no [Key]. It asserts no crash and no diagnostics in the consuming project. This locks in the new suppression of MemberNeedsKey for referenced types. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | cannot_tell | no |
| C7 | backed | RunWithMetadataReferenceAsync runs VerifyCS.Test with the defining assembly as an additional reference, failing on any unexpected diagnostic and skipping the generated-sources check. It then runs MessagePackGenerator directly and asserts two things: no warning-or-higher driver diagnostics (which catches CS8785), and the expected resolver hint name among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C8 | backed | CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against .NET 8 reference assemblies plus MessagePack. The image is referenced via MetadataReference.CreateFromImage, so the consuming compilation sees metadata symbols with no syntax. The new usings at lines 4 and 6 support these helpers. | "Item` is declared in `lib`, `Cmd` in `app`" | test run | upheld | yes |
| C10 | backed | MsgPack004.md gains a section saying the analyzer reports only on members declared in the project being compiled. Unattributed members of referenced types must be fixed in their defining project. | (scope) | static check | upheld | no |
| C11 | backed | Scope: production code changes are confined to TypeCollector.cs. No public API, analyzer rule descriptors or wire-format code are added or changed, and no existing tests were weakened. | (scope) | static check | upheld | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic gets its location from the new GetPropertyIdentifierLocation helper. The helper uses FirstOrDefault and an `as PropertyDeclarationSyntax` cast, and returns null for metadata properties instead of throwing.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Verified in TypeCollector.cs line 985 that BothStringAndIntKeyAreNull now uses GetPropertyIdentifierLocation(item), and lines 1429-1434 define GetPropertyIdentifierLocation using FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax with ?.Identifier.GetLocation(), returning null without throwing when a property comes from metadata.

**C9 (unverified, docs, author confidence medium):** README gains a section saying closed generic types from referenced assemblies, including generic value types and record structs, are supported. It also says member diagnostics for such types are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Verified README.md lines 1639-1643 add the 'Generic types from referenced assemblies' subsection stating that closed generic types including generic value types and record structs can be used as members and that diagnostics about their members are reported by the defining assembly.

**C1 (backed, behavior, author confidence medium):** The MemberNeedsKey diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses FirstOrDefault()?, so a member of a metadata type with no syntax yields a null location instead of throwing IndexOutOfRangeException. The ternary is evaluated even when reportDiagnostic is null, so this also affects the generator path.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Verified in TypeCollector.cs line 1077 that item.DeclaringSyntaxReferences[0].GetSyntax().GetLocation() was replaced with item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), yielding null (Location.None in Diagnostic.Create) when DeclaringSyntaxReferences is empty. Confirmed lines 1075-1080 evaluate the ternary unconditionally before this.reportDiagnostic?.Invoke(diagnostic), and CSharpGeneratorDriver in RunWithMetadataReferenceAsync exercises ClosedGenericStruct_FromMetadataReference_UnkeyedMember through MessagePackGenerator.

**C3 (backed, behavior, author confidence medium):** When an analyzer callback is supplied, reportDiagnostic is wrapped so a diagnostic is forwarded only if its location IsInSource and its SourceTree belongs to the current compilation. Diagnostics with null or metadata locations are dropped rather than reported. When no callback is supplied (generator path), reportDiagnostic stays null.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: Lines 239 and 1444-1450 confirm the wrapper logic around reportAnalyzerDiagnostic, but two parts of the claim depend on code not shown in the diff: (1) callers of the private TypeCollector constructor at line 236 are not shown, so the diff alone does not confirm the generator path passes null; and (2) the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses VerifyCS.Test (CSharpSourceGeneratorVerifier<MessagePackGenerator>, line 7) plus CSharpGeneratorDriver without analyzers (line 653), and CSharpSourceGeneratorVerifier is not in the diff to confirm GetDiagnosticAnalyzers() runs MsgPack00xMessagePackAnalyzer and actually invokes ReportIfLocatedInCompilation.

**C4 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact repro. A `partial record struct Item<T>` compiled into a separate metadata-only assembly is used as `Item<int>` in a positional record `Cmd`, and the test requires no diagnostics plus a generated `App.AppResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Verified in GenericsFormatterTests.cs lines 543-580 that ClosedGenericRecordStruct_FromMetadataReference compiles partial record struct Item<T>([property: Key(0)] string Key) into a metadata-only reference, consumes Item<int> in sealed partial record Cmd([property: Key(0)] string Scope), and calls RunWithMetadataReferenceAsync expecting zero diagnostics and App.AppResolver.g.cs.

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference covers the plain `struct Item<T>` row of the issue's trigger table. A generic struct from a metadata reference is used as `MyGenericStruct<int>`, with a resolver expected.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Verified in GenericsFormatterTests.cs lines 499-541 that ClosedGenericStruct_FromMetadataReference compiles plain struct MyGenericStruct<T> into a metadata reference, uses MyGenericStruct<int> in MyObject, and expects TempProject.MyResolver.g.cs with no diagnostics.

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with a public member that has no [Key]. It asserts no crash and no diagnostics in the consuming project. This locks in the new suppression of MemberNeedsKey for referenced types.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 582-626 define a metadata generic struct with unkeyed public property Unkeyed and call RunWithMetadataReferenceAsync, but whether this test locks in the suppression of MemberNeedsKey (rather than merely passing because reportDiagnostic is null in the generator) depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator>.Test (line 7, not shown in the diff) overrides GetDiagnosticAnalyzers() to run MsgPack00xMessagePackAnalyzer.

**C7 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs VerifyCS.Test with the defining assembly as an additional reference, failing on any unexpected diagnostic and skipping the generated-sources check. It then runs MessagePackGenerator directly and asserts two things: no warning-or-higher driver diagnostics (which catches CS8785), and the expected resolver hint name among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Verified in GenericsFormatterTests.cs lines 628-659 that RunWithMetadataReferenceAsync adds definingAssembly to VerifyCS.Test.TestState.AdditionalReferences with TestBehaviors.SkipGeneratedSourcesCheck and no expected diagnostics, then runs MessagePackGenerator via CSharpGeneratorDriver and asserts no Warning-or-higher diagnostics and that expectedResolverHintName is in GeneratedSources.

**C8 (backed, test, author confidence high):** CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against .NET 8 reference assemblies plus MessagePack. The image is referenced via MetadataReference.CreateFromImage, so the consuming compilation sees metadata symbols with no syntax. The new usings at lines 4 and 6 support these helpers.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Verified in GenericsFormatterTests.cs lines 4, 6, and 661-684 that CompileToMetadataReferenceAsync and CreateCompilation compile the source against ReferenceAssemblies.Net.Net80 plus ReferencesSet.MessagePack into a MemoryStream and wrap the PE bytes with MetadataReference.CreateFromImage, supported by the Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing usings.

**C10 (backed, docs, author confidence medium):** MsgPack004.md gains a section saying the analyzer reports only on members declared in the project being compiled. Unattributed members of referenced types must be fixed in their defining project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **static check** (static check S4 passed)
- Breaker: **upheld**: Verified doc/analyzers/MsgPack004.md lines 48-52 add the 'Types from referenced assemblies' section stating the analyzer only reports on members declared in the project being compiled and unattributed public members of referenced types must be fixed in their defining project.

**C11 (backed, scope, author confidence high):** Scope: production code changes are confined to TypeCollector.cs. No public API, analyzer rule descriptors or wire-format code are added or changed, and no existing tests were weakened.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S7 passed)
- Breaker: **upheld**: Verified across the changed-files list and diff that TypeCollector.cs is the only modified production file, both added helpers are private, no rule descriptors or serialization templates changed, and no existing tests or assertions were removed.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 7 of its 26 sentences.
Requirement sentences no claim quotes (19; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is Location.None, not only those for metadata symbols. Any TypeCollector diagnostic about a source type whose location helper returns null is now silently swallowed. Examples are GetPropertyIdentifierLocation on a positional record property, where the syntax is a ParameterSyntax rather than a PropertyDeclarationSyntax, and GetIdentifierLocation or G | author (Claude) |
| F2 | low | `TypeCollector.cs` L1434 | For a record positional property (`[property: Key(...)]` on a primary constructor parameter), DeclaringSyntaxReferences yields a ParameterSyntax. The `as PropertyDeclarationSyntax` cast returns null, so BothStringAndIntKeyAreNull on the user's own positional record now gets no location and is then dropped by the filter at 1446. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (its lines 735, 1009, 1101). Only two are visibly changed (985, 1077). The site corresponding to the issue's line 735 (around new line 710) is not in the diff, so it is unclear whether it is still reachable for metadata types and could still crash on other shapes. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L638 | The AD0001 half of the fix depends on VerifyCS.Test (CSharpSourceGeneratorVerifier) actually running MsgPack00xMessagePackAnalyzer. The diff does not show that. If it only runs the generator, the analyzer crash path is untested; the direct driver run at 653-656 covers only the generator. | author (Claude) |
| F5 | low | `GenericsFormatterTests.cs` L658 | The tests check only that a resolver hint name exists. They do not check that the resolver can serialize `Item<int>` at runtime. The defining assembly is compiled without the generator, so no formatter for Item<T> exists anywhere. Trimmed/AOT behaviour, which the issue cites as the real impact, is not verified. | author (Claude) |
| F6 | low | `README.md` L1642 | The claim that diagnostics are 'reported by the assembly that defines it' holds only if the defining assembly also runs the MessagePack analyzer. For third-party NuGet types, such diagnostics are now never surfaced. | author (Claude) |
| F7 | medium | `TypeCollector.cs` L1076 | The true branch of the same ternary fixed on line 1077 still evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() unconditionally (even for private members and even when reportDiagnostic is null in the generator). If a closed generic [MessagePackObject] type from a referenced assembly has a member with an attribute deriving from KeyAttribute or IgnoreMemberAttribute, its m | breaker (Gemini) |
| F8 | low | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts the syntax node with 'as PropertyDeclarationSyntax', which returns null for synthesized properties of positional records and record structs declared in source in the current compilation (whose DeclaringSyntaxReferences[0] is a ParameterSyntax, e.g., record Cmd([property: Key(null!)] string Scope)). Because a null location becomes Location.None (IsInSource == fal | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New user-facing documentation section about generic types from referenced assemblies and where their diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: New documentation section stating that the analyzer skips members of referenced types.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global diagnostic filter (239, 1444-1450) changes reporting for all TypeCollector diagnostics, beyond the null-safe indexing the issue asked for.

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
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

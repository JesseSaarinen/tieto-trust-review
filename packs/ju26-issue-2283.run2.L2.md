# Evidence pack: REQ-2283 on `ju26-issue-2283`

> Rebuilt offline from pack `07481956050b` (ju26-issue-2283.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 70 of 218 changed code lines (32%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 33%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- Evidence took 148 of 218 changed code lines off the list (C1, C3, C4, C6, C7, C8: tests found passing in the real run, claim upheld by the breaker). 70 stay with the owner.
- Why lines stay: 42 claim disputed; 15 refused; 6 no claim covers the line; 4 named by a finding; 3 cited only by claims without a passing test.

**The owner must read** (3 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1429-1451 (25 of 29 changed lines): F1 breaker (Gemini); F3 author (Claude); claim C2 disputed; F7 breaker (Gemini); C12 has no passing test behind it; R1 contracts (AI-suggested); F4 author (Claude); F8 breaker (Gemini); no claim covers these lines
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542-581, L627, L660, L685 (45 of 189 changed lines): C9 has no passing test behind it; no claim covers these lines; claim C5 disputed; F2 breaker (Gemini)

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 148 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C3, C4, C6, C7, C8

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `9df83c3840` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s) |
| Pack id | `7fb806785852` |

## 1. Disputed claims (2)
**C2 (DISPUTED, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a new helper, GetPropertyIdentifierLocation, which returns null for a property with no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **disputed**: TypeCollector.cs line 1434 also changes the hard cast (PropertyDeclarationSyntax) from line 985 to a safe cast (as PropertyDeclarationSyntax), which the claim omits, and contradicts its cited XML doc at lines 1430-1433: GetPropertyIdentifierLocation returns null not only for metadata properties with no source declaration, but also for source-declared positional record and record-struct properties whose syntax node is ParameterSyntax (e.g., [property: Key(null!)] string Key), causing ReportIfLocatedInCompilation at line 1446 to silently drop BothStringAndIntKeyAreNull even in the defining project. In addition, no test covers this path.

**C5 (DISPUTED, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App code verbatim at LanguageVersion.Latest. It expects no diagnostics and a generated App.AppResolver.g.cs.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **disputed**: GenericsFormatterTests.cs lines 562-577 do not reproduce the issue's App code verbatim: lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's App snippet has no custom resolver class and relies on the default auto-generated GeneratedMessagePackResolver (and CompileToMetadataReferenceAsync at line 635 compiles Lib without running MessagePackGenerator, unlike the issue's ProjectReference).


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Analyzer diagnostics are now suppressed whenever their location is not source in the current compilation. | This changes which user-visible analyzer diagnostics are emitted, including potentially for source types with null locations. That is a product decision about analyzer behaviour. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | README and MsgPack004 docs declare a new reporting policy for referenced types. | These are documentation changes beyond the bug fix that commit the project to a policy the requirement did not ask for. | `README.md` L1639-1643 | AI reading |

## 3. The story
Stops the source generator and the MsgPack00x analyzer from crashing when a [MessagePackObject] member's type is a closed generic struct from a referenced assembly. It does this in three ways. First, every diagnostic the TypeCollector reports now goes through a new filter that drops any diagnostic whose location is not source in the current compilation. Second, two sites that indexed `DeclaringSyntaxReferences[0]` now tolerate a symbol with no syntax. Third, three new tests compile a defining assembly to a metadata-only image and check that the consuming project builds with no diagnostics and gets a resolver.

**Why:** For metadata symbols `DeclaringSyntaxReferences` is empty, so indexing `[0]` threw IndexOutOfRangeException. The generator then produced no resolver at all, which breaks trimmed and NativeAOT apps.

**Touches beyond the requirement:**
- The new diagnostic filter (TypeCollector.cs 239, 1436-1450) applies to every diagnostic the TypeCollector reports, not only those about metadata types. Any diagnostic created with a null or Location.None location is now silently dropped.
- README.md gains a new section, and doc/analyzers/MsgPack004.md documents a new policy: problems in referenced types are only reported by the defining project.

**How sure (the author's own view; it moves nothing):** High that the reported repro (a record struct with keyed members) no longer crashes; the record-struct test mirrors the issue. Medium that all crash sites are covered. The issue names three `[0]` sites (old lines 735, 1009, 1101), but only two visibly change here. Low test coverage for the BothStringAndIntKeyAreNull path. The broad filter is a behaviour change the owner should decide on.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | DISPUTED | The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a new helper, GetPropertyIdentifierLocation, which returns null for a property with no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | disputed | no |
| C5 | DISPUTED | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App code verbatim at LanguageVersion.Latest. It expects no diagnostics and a generated App.AppResolver.g.cs. | "A clean build, with a generated resolver in `app`." | test run | disputed | no |
| C9 | unverified | The new usings Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing only support the test helpers (MetadataReference, ReferenceAssemblies, TestBehaviors). | (scope) | AI reading only | upheld | no |
| C10 | unverified | README gains a section saying closed generic types from referenced assemblies are supported and that member diagnostics for them are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C11 | unverified | MsgPack004.md documents that the analyzer only reports on members declared in the project being compiled. | (scope) | AI reading only | upheld | no |
| C1 | backed | The collector's reportDiagnostic delegate is wrapped so a diagnostic is forwarded only when its Location.IsInSource is true and its SourceTree belongs to the compilation being analyzed; all other diagnostics are dropped. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | upheld | yes |
| C3 | backed | The MemberNeedsKey diagnostic location now uses DeclaringSyntaxReferences.FirstOrDefault(), so a metadata member yields a null location instead of throwing. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C4 | backed | Test ClosedGenericStruct_FromMetadataReference checks a plain generic struct with a keyed T member, defined in a metadata-only assembly and used as MyGenericStruct<int>. It expects no diagnostics and a generated TempProject.MyResolver.g.cs. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with an unattributed public member. It drives the MemberNeedsKey path and requires that no diagnostic surfaces in the consuming project. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C7 | backed | RunWithMetadataReferenceAsync does two things. First, it runs the verifier with the defining assembly as an additional reference, with no expected diagnostics. Second, it runs the MessagePackGenerator directly via CSharpGeneratorDriver and asserts there is no warning-or-higher generator diagnostic (which would include CS8785) and that the expected resolver hint name is produced. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C8 | backed | The helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image and return MetadataReference.CreateFromImage. The referenced type therefore truly has no syntax references, matching the metadata-symbol trigger. They throw if the defining compile fails. | "that collection is empty for a metadata symbol" | test run | upheld | yes |
| C12 | backed | Production changes are confined to TypeCollector.cs and add only private members. There are no new rule descriptors, no public API and no runtime serializer changes. | (scope) | static check | upheld | no |

**C9 (unverified, scope, author confidence high):** The new usings Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing only support the test helpers (MetadataReference, ReferenceAssemblies, TestBehaviors).
- Lines: `GenericsFormatterTests.cs` L4-6
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 against the added code at lines 507-684: Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing only provide types used by the new test methods and helpers (MetadataReference, Compilation, GeneratorDriverRunResult, DiagnosticSeverity, LanguageNames, OutputKind, ReferenceAssemblies, TestBehaviors).

**C10 (unverified, docs, author confidence high):** README gains a section saying closed generic types from referenced assemblies are supported and that member diagnostics for them are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: adds the Generic types from referenced assemblies subsection stating closed generic types (including generic value types and record structs) from referenced assemblies are supported as member types and that member diagnostics are reported by the defining assembly.

**C11 (unverified, docs, author confidence high):** MsgPack004.md documents that the analyzer only reports on members declared in the project being compiled.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: adds a section stating the analyzer only reports on members declared in the project being compiled and that unattributed public members on types from referenced assemblies are reported by their defining project.

**C1 (backed, behavior, author confidence high):** The collector's reportDiagnostic delegate is wrapped so a diagnostic is forwarded only when its Location.IsInSource is true and its SourceTree belongs to the compilation being analyzed; all other diagnostics are dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S3 passed)
- Breaker: **upheld**: Checked TypeCollector.cs line 239 and lines 1444-1450: reportDiagnostic wraps a non-null reportAnalyzerDiagnostic delegate in ReportIfLocatedInCompilation, which forwards a diagnostic only when diagnostic.Location.IsInSource is true and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) holds, dropping all others. ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises this drop path via MemberNeedsKey.

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location now uses DeclaringSyntaxReferences.FirstOrDefault(), so a metadata member yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077: item.DeclaringSyntaxReferences[0].GetSyntax().GetLocation() is replaced by item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), yielding a null location when DeclaringSyntaxReferences is empty on a metadata member. ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises this branch.

**C4 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference checks a plain generic struct with a keyed T member, defined in a metadata-only assembly and used as MyGenericStruct<int>. It expects no diagnostics and a generated TempProject.MyResolver.g.cs.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: MyGenericStruct<T> with [Key(0)] public T Content is compiled to a metadata-only reference, consumed as MyGenericStruct<int>, and verified with no expected diagnostics and generated hint name TempProject.MyResolver.g.cs.

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with an unattributed public member. It drives the MemberNeedsKey path and requires that no diagnostic surfaces in the consuming project.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 582-626: MyGenericStruct<T> is compiled to metadata with an unattributed public int Unkeyed property, driving the MemberNeedsKey path at TypeCollector.cs line 1077 while verifying no diagnostic is reported in the consuming compilation.

**C7 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync does two things. First, it runs the verifier with the defining assembly as an additional reference, with no expected diagnostics. Second, it runs the MessagePackGenerator directly via CSharpGeneratorDriver and asserts there is no warning-or-higher generator diagnostic (which would include CS8785) and that the expected resolver hint name is produced.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659: RunWithMetadataReferenceAsync first runs VerifyCS.Test with definingAssembly in AdditionalReferences and no expected diagnostics, then runs MessagePackGenerator directly via CSharpGeneratorDriver, asserting no warning-or-higher diagnostics (which covers CS8785 emitted by GeneratorDriver on generator exceptions) and asserting expectedResolverHintName is present in GeneratedSources.

**C8 (backed, test, author confidence high):** The helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image and return MetadataReference.CreateFromImage. The referenced type therefore truly has no syntax references, matching the metadata-symbol trigger. They throw if the defining compile fails.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 661-684: CompileToMetadataReferenceAsync and CreateCompilation emit defineSource to an in-memory PE stream, throw InvalidOperationException when emitResult.Success is false, and wrap the bytes via MetadataReference.CreateFromImage so referenced symbols have empty DeclaringSyntaxReferences.

**C12 (backed, scope, author confidence high):** Production changes are confined to TypeCollector.cs and add only private members. There are no new rule descriptors, no public API and no runtime serializer changes.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked all four changed files: TypeCollector.cs is the sole production source file changed, adding only private methods GetPropertyIdentifierLocation (line 1434) and ReportIfLocatedInCompilation (line 1444), with no new analyzer descriptors, public API, or runtime serializer changes.

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
| F1 | medium | `TypeCollector.cs` L985 | Claim C2 disputed: TypeCollector.cs line 1434 also changes the hard cast (PropertyDeclarationSyntax) from line 985 to a safe cast (as PropertyDeclarationSyntax), which the claim omits, and contradicts its cited XML doc at lines 1430-1433: GetPropertyIdentifierLocation returns null not only for metadata properties with no source declaration, but also for source-declared positional record and record | breaker (Gemini) |
| F2 | medium | `GenericsFormatterTests.cs` L575 | Claim C5 disputed: GenericsFormatterTests.cs lines 562-577 do not reproduce the issue's App code verbatim: lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's App snippet has no custom resolver class and relies on the default auto-generated GeneratedMessagePackResolver (and CompileToMetadataReferenceAsync at line 635 compiles Lib without  | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). Only two are visibly changed, at new lines 985 and 1077. If a third direct `[0]` index (around the old line 735 region) remains outside the diff, other metadata-type shapes could still crash. Verify that no `DeclaringSyntaxReferences[0]` remains in TypeCollector.cs. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, not just those for metadata types. A diagnostic about a source type that is created with a null location is now silently suppressed, where before it was reported without a location. Examples: GetIdentifierLocation, GetLocation or GetParameterListLocation returning null, or Location.None. This can hide legitimate analyzer warnings. | author (Claude) |
| F5 | low | `TypeCollector.cs` L985 | The BothStringAndIntKeyAreNull path (a Key attribute with neither an int nor a string value on a metadata member) has no test exercising it. | author (Claude) |
| F6 | low | `TypeCollector.cs` L239 | Problems in a referenced type, such as an unkeyed public member, are now invisible to the consumer. If the defining assembly does not run the analyzer (for example, a third-party NuGet package), the consumer gets no warning while the generated formatter may silently skip or mis-handle that member. | author (Claude) |
| F7 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts syntax using 'as PropertyDeclarationSyntax', which returns null for positional record and record-struct properties declared in source (whose DeclaringSyntaxReferences[0].GetSyntax() is ParameterSyntax, e.g. [property: Key(null!)] string Key). Combined with ReportIfLocatedInCompilation at line 1446 dropping any diagnostic whose Location.IsInSource is false, BothS | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops all diagnostics where diagnostic.Location.IsInSource is false (Location.None), rather than checking whether the analyzed symbol belongs to this.compilation.Assembly. Roslyn permits analyzers to report Location.None diagnostics; only locations in foreign SyntaxTrees are forbidden. Consequently, any diagnostic on a type in the current compilation whose location hel | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New documentation section describing a reporting policy for referenced types; not required to fix the crash.
- `doc/analyzers/MsgPack004.md`: New documentation of the analyzer's scope for referenced types; not required to fix the crash.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global location filter on reportDiagnostic (lines 239, 1436-1450) changes the reporting of all collector diagnostics, broader than replacing the `[0]` indexing.

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
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

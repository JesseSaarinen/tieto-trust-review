# Evidence pack: REQ-2283 on `seeded-23`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 80 of 218 changed code lines (37%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 40%.

- 3 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 138 of 218 changed code lines off the list (C1, C6, C7, C9, C10: tests found passing in the real run, claim upheld by the breaker). 80 stay with the owner.
- Why lines stay: 47 passing test, but not upheld by the breaker; 15 refused; 8 claim rests on AI reading only; 7 no claim covers the line; 2 cited only by claims without a passing test; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (28 of 29 changed lines): C4 passed its tests but the breaker did not uphold it; claim C2 only AI-read; F5 breaker (Gemini); claim C3 only AI-read; no claim covers these lines; R1 honesty (AI-suggested); F1 author (Claude); F6 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542, L581-627, L660, L685 (52 of 189 changed lines): C11 has no passing test behind it; no claim covers these lines; C8 passed its tests but the breaker did not uphold it

**Not required to read:**
- 138 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C6, C7, C9, C10

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `71dd291f81` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 11,794 in / 7,777 out, 91 s, $0.20 |
| Breaker model | gemini-4-carbon: 9,515 in / 27,110 out, 259 s, $0.29 |
| Cost and time | $0.49 at list price, 350 s for this pack (tests reused from an earlier run of this commit: 38 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s) |
| Pack id | `d8123467624b` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | A global filter silently discards diagnostics without an in-compilation source location. | It goes beyond the crash fix and changes user-visible analyzer output for every type, including `Location.None` diagnostics on source types. A human should decide whether to drop these diagnostics or keep reporting them. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | Documentation commits the project to a policy that member diagnostics for referenced types are never reported in the consuming project. | This is a product decision not asked for by the requirement. | `MsgPack004.md` L48-52 | AI reading |
| R3 | honesty | The README advertises support for referenced generic value types and states the new diagnostic policy. | The added user-facing documentation commits to behaviour beyond the bug fix. | `README.md` L1639-1643 | AI reading |

## 3. The story
Fixes a crash in the generator and analyzer when a `[MessagePackObject]` type has a member whose type is a closed generic struct from a referenced assembly. Two diagnostic sites in `TypeCollector` no longer index `DeclaringSyntaxReferences[0]`; they use null-safe lookups instead. Separately, the analyzer's diagnostic callback is wrapped in a filter that drops any diagnostic whose location is not a source location inside the current compilation. Three new tests compile a defining assembly to a metadata-only reference, then check that the consumer builds with no diagnostics and that its resolver is generated. README and MsgPack004.md gain paragraphs describing the new reporting behaviour.

**Why:** Metadata symbols have an empty `DeclaringSyntaxReferences`. Indexing `[0]` threw `IndexOutOfRangeException`, which killed the generator (CS8785) and the analyzer (AD0001). The assembly was then left with no generated resolver.

**Touches beyond the requirement:**
- A global reporting filter (`ReportIfLocatedInCompilation`, line 239 and lines 1436-1450). It silently drops every diagnostic with no in-compilation source location, including `Location.None` ones, not only those about metadata types.
- README section and MsgPack004.md section documenting that consumers no longer see member diagnostics for referenced types.
- The issue names three `[0]` sites (lines 735, 1009, 1101). The diff changes only two of them. The third may be gone in this version or may still be present; this cannot be told from the diff.

**How sure (the author's own view; it moves nothing):** High that the two edited sites no longer throw for metadata properties. Medium that the new tests reproduce the original crash: the record-struct test mirrors the issue repro, but I cannot confirm the verifier runs the analyzer. Medium-low on the side effects of the broad reporting filter.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper instead of `[0]` plus a hard cast. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | upheld | no |
| C3 | unverified | `GetPropertyIdentifierLocation` returns null when the property has no syntax reference, or when its syntax is not a `PropertyDeclarationSyntax` (it uses an `as` cast rather than a hard cast). | "instead of using `FirstOrDefault()` the way the neighbouring `GetIdentifierLocation` / `Ge…" | AI reading only | upheld | no |
| C11 | unverified | The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support `MetadataReference`, `ReferenceAssemblies`, and `TestBehaviors` in the new test helpers. | (scope) | AI reading only | upheld | no |
| C12 | unverified | The README gains a section stating that referenced closed generic types, including value types and record structs, are supported. It also states that their member diagnostics are reported only by the defining assembly. | (scope) | AI reading only | upheld | no |
| C13 | unverified | MsgPack004.md gains a section stating that the analyzer reports only on members declared in the current project. | (scope) | AI reading only | upheld | no |
| C1 | backed | The MemberNeedsKey diagnostic now computes its location with `DeclaringSyntaxReferences.FirstOrDefault()?`. This yields a null location instead of throwing when the member comes from metadata. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | upheld | yes |
| C4 | backed | The constructor wraps a non-null analyzer report callback so that every diagnostic passes through `ReportIfLocatedInCompilation`. A null callback stays null. | (scope) | test run | cannot_tell | no |
| C5 | backed | `ReportIfLocatedInCompilation` forwards a diagnostic only when its location is in source and its syntax tree belongs to the current compilation. All other diagnostics are dropped silently, including those with `Location.None`. | (scope) | test run | cannot_tell | no |
| C6 | backed | Test `ClosedGenericStruct_FromMetadataReference` puts a generic struct in a metadata-only assembly, uses `MyGenericStruct<int>` as a member, and expects no diagnostics plus a generated `TempProject.MyResolver.g.cs`. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Item<T>`/`Cmd` repro, with the library supplied as metadata, and expects `App.AppResolver.g.cs` to be generated. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C8 | backed | Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` uses a referenced generic struct with an unkeyed public member. It asserts that no diagnostic surfaces in the consumer, which locks in the suppression behaviour of C5. | (scope) | test run | cannot_tell | no |
| C9 | backed | `RunWithMetadataReferenceAsync` first runs the source-generator verifier with no expected diagnostics. It then runs `CSharpGeneratorDriver` directly, asserts there are no warning-or-higher diagnostics, and asserts the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C10 | backed | `CompileToMetadataReferenceAsync` and `CreateCompilation` emit the defining source to an in-memory image and wrap it with `MetadataReference.CreateFromImage`. The referenced types therefore have no syntax, matching the metadata-symbol condition in the issue. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C14 | backed | Scope: the only production change is in `TypeCollector.cs`. No public API, analyzer rule descriptors, or wire format are changed. | (scope) | static check | upheld | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper instead of `[0]` plus a hard cast.
- Lines: `TypeCollector.cs` L985-985
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985: BothStringAndIntKeyAreNull now passes GetPropertyIdentifierLocation(item) instead of indexing item.DeclaringSyntaxReferences[0] and casting to PropertyDeclarationSyntax.

**C3 (unverified, behavior, author confidence high):** `GetPropertyIdentifierLocation` returns null when the property has no syntax reference, or when its syntax is not a `PropertyDeclarationSyntax` (it uses an `as` cast rather than a hard cast).
- Lines: `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1429-1434: GetPropertyIdentifierLocation uses property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax followed by ?.Identifier.GetLocation(), returning null both when DeclaringSyntaxReferences is empty and when the syntax node is not a PropertyDeclarationSyntax.

**C11 (unverified, test, author confidence high):** The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support `MetadataReference`, `ReferenceAssemblies`, and `TestBehaviors` in the new test helpers.
- Lines: `GenericsFormatterTests.cs` L4-6
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6: Microsoft.CodeAnalysis (for MetadataReference, Compilation, OutputKind, DiagnosticSeverity, LanguageNames) and Microsoft.CodeAnalysis.Testing (for ReferenceAssemblies and TestBehaviors) are the two added usings.

**C12 (unverified, docs, author confidence high):** The README gains a section stating that referenced closed generic types, including value types and record structs, are supported. It also states that their member diagnostics are reported only by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: the new subsection states that closed generic types from referenced assemblies, including generic value types and record structs, can be used as [MessagePackObject] members and that diagnostics on their members are reported by the defining assembly.

**C13 (unverified, docs, author confidence high):** MsgPack004.md gains a section stating that the analyzer reports only on members declared in the current project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: the new section states that MsgPack004 only reports on members declared in the project being compiled and that members of referenced types are reported by their defining project.

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic now computes its location with `DeclaringSyntaxReferences.FirstOrDefault()?`. This yields a null location instead of throwing when the member comes from metadata.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 590-626: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), returning null (converted to Location.None by Diagnostic.Create) instead of indexing [0] and throwing IndexOutOfRangeException on metadata members, and ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises this path via the generator driver.

**C4 (backed, behavior, author confidence high):** The constructor wraps a non-null analyzer report callback so that every diagnostic passes through `ReportIfLocatedInCompilation`. A null callback stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs line 239 does wrap a non-null reportAnalyzerDiagnostic in diagnostic => ReportIfLocatedInCompilation(reportAnalyzerDiagnostic, diagnostic) while preserving null, but the claim cites ClosedGenericStruct_FromMetadataReference_UnkeyedMember as its test, and RunWithMetadataReferenceAsync (GenericsFormatterTests.cs lines 638-658) only invokes CSharpSourceGeneratorVerifier<MessagePackGenerator> and CSharpGeneratorDriver without directly referencing MsgPack00xMessagePackAnalyzer. Because CSharpSourceGeneratorVerifier is not shown in the diff, we cannot verify from the diff alone whether the non-null analyzer callback branch is exercised.

**C5 (backed, behavior, author confidence high):** `ReportIfLocatedInCompilation` forwards a diagnostic only when its location is in source and its syntax tree belongs to the current compilation. All other diagnostics are dropped silently, including those with `Location.None`.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs lines 1444-1450 forward a diagnostic only when diagnostic.Location.IsInSource is true and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) holds (dropping Location.None and external trees), matching the claim text. However, whether the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually invokes ReportIfLocatedInCompilation depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (not shown in the diff) registers MsgPack00xMessagePackAnalyzer.

**C6 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference` puts a generic struct in a metadata-only assembly, uses `MyGenericStruct<int>` as a member, and expects no diagnostics plus a generated `TempProject.MyResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: ClosedGenericStruct_FromMetadataReference compiles MyGenericStruct<T> into a metadata assembly, uses MyGenericStruct<int> as a member of MyObject, and calls RunWithMetadataReferenceAsync expecting zero diagnostics and TempProject.MyResolver.g.cs.

**C7 (backed, test, author confidence medium):** Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Item<T>`/`Cmd` repro, with the library supplied as metadata, and expects `App.AppResolver.g.cs` to be generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580: ClosedGenericRecordStruct_FromMetadataReference compiles the issue's partial record struct Item<T> as metadata, consumes Item<int> in sealed partial record Cmd, and verifies App.AppResolver.g.cs is generated with LanguageVersion.Latest.

**C8 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` uses a referenced generic struct with an unkeyed public member. It asserts that no diagnostic surfaces in the consumer, which locks in the suppression behaviour of C5.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: ClosedGenericStruct_FromMetadataReference_UnkeyedMember (GenericsFormatterTests.cs lines 590-626) compiles a metadata generic struct with an unkeyed public member and runs RunWithMetadataReferenceAsync, but whether this test locks in the diagnostic suppression in ReportIfLocatedInCompilation (C5) depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (line 7, not shown in the diff) runs MsgPack00xMessagePackAnalyzer; if only MessagePackGenerator runs with a null reportAnalyzerDiagnostic callback, C5 is never called.

**C9 (backed, test, author confidence medium):** `RunWithMetadataReferenceAsync` first runs the source-generator verifier with no expected diagnostics. It then runs `CSharpGeneratorDriver` directly, asserts there are no warning-or-higher diagnostics, and asserts the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659: RunWithMetadataReferenceAsync runs VerifyCS.Test with no expected diagnostics (lines 638-648) and then runs CSharpGeneratorDriver directly, asserting no warning-or-higher diagnostics and checking Assert.Contains(expectedResolverHintName, hintNames) (lines 653-658).

**C10 (backed, test, author confidence high):** `CompileToMetadataReferenceAsync` and `CreateCompilation` emit the defining source to an in-memory image and wrap it with `MetadataReference.CreateFromImage`. The referenced types therefore have no syntax, matching the metadata-symbol condition in the issue.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 661-684: CompileToMetadataReferenceAsync and CreateCompilation emit defineSource to a MemoryStream as a DynamicallyLinkedLibrary and wrap the bytes via MetadataReference.CreateFromImage, producing metadata-only symbols with no DeclaringSyntaxReferences.

**C14 (backed, scope, author confidence high):** Scope: the only production change is in `TypeCollector.cs`. No public API, analyzer rule descriptors, or wire format are changed.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked the changed-files list and full diff: TypeCollector.cs is the only production source file modified, and all changes in it are private helpers or internal implementation details with no public API, analyzer descriptor, or serialization wire-format changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 5 of its 26 sentences.
Requirement sentences no claim quotes (21; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source. That includes `Location.None`, which Roslyn permits analyzers to report. Any existing diagnostic for a source type whose location helper returns null (e.g. `GetIdentifierLocation`, `GetParameterListLocation`, or the new `GetPropertyIdentifierLocation` on a positional record property) will now disappear silently rather than surface. | author (Claude) |
| F2 | low | `TypeCollector.cs` L985 | For a source record's positional property, the syntax is a `ParameterSyntax`, so the `as PropertyDeclarationSyntax` cast yields null. The BothStringAndIntKeyAreNull diagnostic is then filtered out entirely, where it previously crashed. No test covers line 985 at all. | author (Claude) |
| F3 | low | `TypeCollector.cs` L735 | The issue names three `DeclaringSyntaxReferences[0]` sites (735, 1009, 1101). The diff changes only two. If an unguarded `[0]` remains in another `GetObjectInfo` diagnostic path, a different metadata shape could still crash. This cannot be confirmed from the diff. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L638 | The helper is built on the generator verifier (`CSharpSourceGeneratorVerifier<MessagePackGenerator>`). It is not shown whether this runs `MsgPack00xMessagePackAnalyzer`, so the AD0001 half of the bug may be untested. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1076 | Line 1076 still calls derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() without null-propagation right next to the fixed line 1077, and SyntaxNode.GetLocation() is an instance method. If a closed generic struct from a referenced assembly has a member (even a private one) with a custom KeyAttribute-derived attribute, its metadata AttributeData has no syntax reference, and because  | breaker (Gemini) |
| F6 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops every diagnostic with Location.None (since Location.None.IsInSource is false), silently suppressing legitimate errors in the current compilation in at least two cases: (1) for a record positional property in source such as [MessagePackObject] public record R([property: Key(null!)] string X), DeclaringSyntaxReferences[0].GetSyntax() is a ParameterSyntax rather tha | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global `ReportIfLocatedInCompilation` filter (lines 239 and 1436-1450) changes which diagnostics reach users for all types, not just referenced ones.
- `README.md`: New documentation section on generic types from referenced assemblies.
- `doc/analyzers/MsgPack004.md`: New documentation of the analyzer's reporting scope.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

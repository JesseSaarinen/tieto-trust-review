# Evidence pack: REQ-2283 on `seeded-07`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 110 of 218 changed code lines (51%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 50%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 108 of 218 changed code lines off the list (C3, C5, C6, C9: tests found passing in the real run, claim upheld by the breaker). 110 stay with the owner.
- Why lines stay: 79 passing test, but not upheld by the breaker; 15 refused; 7 no claim covers the line; 5 claim rests on AI reading only; 4 named by a finding.

**The owner must read** (3 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (28 of 29 changed lines): C1 passed its tests but the breaker did not uphold it; F3 author (Claude); claim C4 only AI-read; F8 breaker (Gemini); F9 breaker (Gemini); no claim covers these lines; R1 honesty (AI-suggested); claim C2 disputed; F1 breaker (Gemini); F2 author (Claude); F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581-660, L685 (82 of 189 changed lines): no claim covers these lines; C7 passed its tests but the breaker did not uphold it; C8 passed its tests but the breaker did not uphold it

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 108 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3, C9, C5, C6

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `e44b45bd35` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 11,794 in / 8,566 out, 74 s, $0.22 |
| Breaker model | gemini-4-carbon: 51,768 in / 36,679 out, 372 s, $0.45 |
| Cost and time | $0.67 at list price, 447 s for this pack (tests reused from an earlier run of this commit: 45 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (45s) |
| Pack id | `371a352268af` |

## 1. Disputed claims (1)
**C2 (DISPUTED, behavior, author confidence medium):** ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source. Because of the `||`, any source location passes, including one in another compilation's tree. Metadata-located (Location.None) diagnostics are dropped.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **disputed**: First, cited lines 1437-1442 of TypeCollector.cs document the opposite of line 1446: the XML remarks state diagnostics from another compilation are dropped so analyzers do not report outside this.compilation, whereas line 1446 uses ||, making this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) dead code (Location.SourceTree is non-null iff Location.IsInSource is true, so ContainsSyntaxTree only ever receives null). Second, the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember (GenericsFormatterTests.cs lines 590-626, 635, 673) compiles the referenced type to a PE byte image via MetadataReference.CreateFromImage, so it never produces a source location in another compilation's tree and does not test the cross-compilation || behavior claimed.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Global suppression of every TypeCollector diagnostic that lacks a source location. | This goes beyond fixing the crash. It changes which analyzer diagnostics users see, which is a product decision the requirement did not ask for. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | New user-facing docs committing to a diagnostics policy for referenced types. | These documentation promises are not required by the bug fix, and MsgPack004.md partly contradicts the implemented `\|\|` check. | `README.md` L1639-1643 | AI reading |

## 3. The story
Stops the source generator and the MsgPack00x analyzer from crashing when a [MessagePackObject] member's type is a closed generic struct from a referenced assembly. Two diagnostic sites that read `DeclaringSyntaxReferences[0]` now tolerate an empty collection. TypeCollector's diagnostic callback is wrapped in a filter meant to drop diagnostics with no location in the current compilation. Three tests compile a defining assembly to a metadata-only image, run the analyzers and generator against a consuming project, and assert there are no diagnostics and that the resolver is generated. README and MsgPack004.md gain notes about types from referenced assemblies.

**Why:** REQ-2283: an IndexOutOfRangeException in GetObjectInfo on metadata symbols made the generator drop the whole resolver (CS8785) and the analyzer fail (AD0001).

**Touches beyond the requirement:**
- A global filter on every diagnostic TypeCollector reports, not just the crashing sites. Any diagnostic without a source location is now silently dropped.
- A policy decision to suppress member diagnostics for referenced types, documented as user-facing behaviour in README and MsgPack004.md.

**How sure (the author's own view; it moves nothing):** Medium. The two patched sites clearly no longer index an empty array. The tests reproduce the issue's record-struct case and a plain generic struct. The issue names three indexing sites; only two appear in the diff, and the third (issue line 735) is untouched. The filter's condition uses `||`, which does not do what its doc comment says. The BothStringAndIntKeyAreNull path is not exercised by any test. I could not confirm the new tests fail without the fix.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | DISPUTED | ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source. Because of the `\|\|`, any source location passes, including one in another compilation's tree. Metadata-located (Location.None) diagnostics are dropped. | "so `GetObjectInfo` runs against a type that has no syntax." | test run | disputed | no |
| C4 | unverified | The BothStringAndIntKeyAreNull diagnostic now uses the new GetPropertyIdentifierLocation helper. The helper returns null when the property has no PropertyDeclarationSyntax, instead of indexing [0] and hard-casting. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld | no |
| C10 | unverified | README gains a section saying closed generic types from referenced assemblies are supported as members and that their member diagnostics are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C11 | unverified | MsgPack004.md gains a section saying the analyzer only reports on members declared in the project being compiled. | (scope) | AI reading only | upheld | no |
| C1 | backed | TypeCollector's constructor wraps the non-null analyzer diagnostic callback so that every reported diagnostic goes through ReportIfLocatedInCompilation; a null callback stays null. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C3 | backed | The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()?`, so a metadata member yields a null location instead of throwing IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference checks a plain generic struct MyGenericStruct<T> from a metadata-only assembly used as MyGenericStruct<int>. It expects no diagnostics and a generated TempProject.MyResolver.g.cs. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App record-struct repro with metadata-only referencing. It expects no diagnostics and a generated App.AppResolver.g.cs. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember checks that a referenced generic struct with an unattributed public member produces no diagnostic in the consuming project and still yields a resolver. This exercises the MemberNeedsKey path and the location filter. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | cannot_tell | no |
| C8 | backed | RunWithMetadataReferenceAsync runs the analyzer+generator verifier with no expected diagnostics, so AD0001/CS8785 would fail it. It then runs the generator directly and asserts there are no warning-or-higher diagnostics and that the expected resolver hint name is generated. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | cannot_tell | no |
| C9 | backed | The test helpers compile the defining source to an in-memory image and reference it via MetadataReference.CreateFromImage, so its symbols have no syntax. The new usings support this. | "that collection is empty for a metadata symbol." | test run | upheld | yes |
| C12 | backed | Scope: no public API, analyzer rule descriptor or runtime serializer code is changed. The new members are private. The behavioural reach goes beyond the crash fix because the location filter applies to every diagnostic TypeCollector reports. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now uses the new GetPropertyIdentifierLocation helper. The helper returns null when the property has no PropertyDeclarationSyntax, instead of indexing [0] and hard-casting.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985 and lines 1429-1434: BothStringAndIntKeyAreNull now calls GetPropertyIdentifierLocation(item), which uses FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and ?.Identifier.GetLocation() to return null when no PropertyDeclarationSyntax is present instead of indexing [0] and hard-casting, and the claim accurately lists no tests.

**C10 (unverified, docs, author confidence high):** README gains a section saying closed generic types from referenced assemblies are supported as members and that their member diagnostics are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: adds the Generic types from referenced assemblies section stating that closed generic types (including generic value types and record structs) from referenced assemblies can be used as [MessagePackObject] members and that diagnostics on their members are reported by the defining assembly.

**C11 (unverified, docs, author confidence high):** MsgPack004.md gains a section saying the analyzer only reports on members declared in the project being compiled.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: adds the Types from referenced assemblies section stating that the analyzer only reports on members declared in the project being compiled.

**C1 (backed, behavior, author confidence high):** TypeCollector's constructor wraps the non-null analyzer diagnostic callback so that every reported diagnostic goes through ReportIfLocatedInCompilation; a null callback stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs line 239 wraps a non-null reportAnalyzerDiagnostic in ReportIfLocatedInCompilation and preserves null, and ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises the null callback path via CSharpGeneratorDriver (GenericsFormatterTests.cs line 653). However, whether that test exercises the non-null analyzer callback branch depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (GenericsFormatterTests.cs lines 7 and 638) attaches MsgPack00xMessagePackAnalyzer, which is not shown in the diff.

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()?`, so a metadata member yields a null location instead of throwing IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077: item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation() returns null when DeclaringSyntaxReferences is empty, passing null (Location.None) to Diagnostic.Create instead of throwing IndexOutOfRangeException. Because line 1077 executes unconditionally before line 1080, ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises it via CSharpGeneratorDriver at GenericsFormatterTests.cs line 653.

**C5 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference checks a plain generic struct MyGenericStruct<T> from a metadata-only assembly used as MyGenericStruct<int>. It expects no diagnostics and a generated TempProject.MyResolver.g.cs.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541 and 633-659: ClosedGenericStruct_FromMetadataReference compiles MyGenericStruct<T> into a metadata-only reference, uses MyGenericStruct<int> as a member of MyObject, and verifies zero diagnostics and generation of TempProject.MyResolver.g.cs.

**C6 (backed, test, author confidence medium):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App record-struct repro with metadata-only referencing. It expects no diagnostics and a generated App.AppResolver.g.cs.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580 against REQ-2283: ClosedGenericRecordStruct_FromMetadataReference compiles Lib.Item<T> to a metadata-only reference, consumes Item<int> in App.Cmd alongside AppResolver, and asserts no diagnostics and generation of App.AppResolver.g.cs.

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember checks that a referenced generic struct with an unattributed public member produces no diagnostic in the consuming project and still yields a resolver. This exercises the MemberNeedsKey path and the location filter.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Checked GenericsFormatterTests.cs lines 582-626: MyGenericStruct<T> defines an unattributed public int Unkeyed property, which exercises the MemberNeedsKey Diagnostic.Create path (TypeCollector.cs line 1077) during generator execution (line 653). However, MessagePackGenerator passes a null diagnostic callback, so whether this test exercises the location filter (ReportIfLocatedInCompilation, TypeCollector.cs line 1444) depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (lines 7 and 638) runs MsgPack00xMessagePackAnalyzer, which is not shown in the diff.

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs the analyzer+generator verifier with no expected diagnostics, so AD0001/CS8785 would fail it. It then runs the generator directly and asserts there are no warning-or-higher diagnostics and that the expected resolver hint name is generated.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Checked GenericsFormatterTests.cs lines 628-659: lines 653-658 run MessagePackGenerator directly, assert no warning-or-higher diagnostics (which catches CS8785), and assert expectedResolverHintName is generated. However, whether VerifyCS.Test (CSharpSourceGeneratorVerifier<MessagePackGenerator>.Test, lines 7 and 638-648) also registers MsgPack00xMessagePackAnalyzer so that AD0001 would fail it depends on CSharpSourceGeneratorVerifier, which is not shown in the diff.

**C9 (backed, test, author confidence high):** The test helpers compile the defining source to an in-memory image and reference it via MetadataReference.CreateFromImage, so its symbols have no syntax. The new usings support this.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and 661-684: CompileToMetadataReferenceAsync and CreateCompilation emit the defining compilation to an in-memory PE stream and load it via MetadataReference.CreateFromImage so its symbols have no syntax references, supported by the added Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing usings.

**C12 (backed, scope, author confidence medium):** Scope: no public API, analyzer rule descriptor or runtime serializer code is changed. The new members are private. The behavioural reach goes beyond the crash fix because the location filter applies to every diagnostic TypeCollector reports.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files and TypeCollector.cs lines 239 and 1434-1450: no shipped public API, analyzer descriptor, or runtime serializer code is modified, both added TypeCollector helpers are private, and wrapping reportAnalyzerDiagnostic in the constructor applies the location filter to all diagnostics reported via this.reportDiagnostic.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 7 of its 26 sentences.
Requirement sentences no claim quotes (19; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1440 | Claim C2 disputed: First, cited lines 1437-1442 of TypeCollector.cs document the opposite of line 1446: the XML remarks state diagnostics from another compilation are dropped so analyzers do not report outside this.compilation, whereas line 1446 uses \|\|, making this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) dead code (Location.SourceTree is non-null iff Location.IsInSource is  | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The condition is `IsInSource \|\| ContainsSyntaxTree(SourceTree)`. A non-source location has a null SourceTree, so the second clause can never be true when the first is false, and the check reduces to `IsInSource`. A source location in another compilation's tree (for example an IDE project reference, where referenced symbols are source symbols) is still reported, contrary to the doc comment. Analyze | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). Only the latter two appear in the diff; the first (around new line ~711) is unchanged. Arguments to `reportDiagnostic?.Invoke(...)` are evaluated whenever the analyzer callback is non-null, so that path may still throw IndexOutOfRangeException for metadata types on inputs the tests don't cover. | author (Claude) |
| F4 | low | `TypeCollector.cs` L239 | The wrapper silently drops every diagnostic whose location is not in source. Any diagnostic that previously used Location.None or a null location (for example from GetIdentifierLocation/GetLocation helpers on synthesized or metadata symbols) is now suppressed, not just those for referenced types. This may hide real problems. | author (Claude) |
| F5 | low | `TypeCollector.cs` L985 | The BothStringAndIntKeyAreNull change and GetPropertyIdentifierLocation are not exercised by any new test. | author (Claude) |
| F6 | low | `MsgPack004.md` L51 | The doc states the analyzer only reports on members declared in the project being compiled. Because of the `\|\|` in ReportIfLocatedInCompilation, this is not enforced for source locations from other compilations. | author (Claude) |
| F7 | high | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation uses \|\| instead of && (`diagnostic.Location.IsInSource \|\| this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree)`). Because Roslyn's Location.SourceTree is non-null if and only if Location.IsInSource is true, the ContainsSyntaxTree call is dead code (only ever invoked with null). When a ProjectReference is represented as a CompilationReference (as in Visua | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | Immediately above the fixed MemberNeedsKey branch on line 1077, the AOTDerivedKeyAttribute ternary branch still calls `derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation()` unconditionally before checking this.reportDiagnostic or member accessibility. For metadata symbols from a referenced assembly, AttributeData.ApplicationSyntaxReference is null, so a closed generic value type in  | breaker (Gemini) |
| F9 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts syntax `as PropertyDeclarationSyntax`, which returns null even for source-declared properties synthesized from positional record or record struct primary-constructor parameters (`ParameterSyntax`, e.g. `[property: Key((string?)null!)] string Scope`) or indexers. Because Diagnostic.Create at line 985 converts a null location into Location.None (IsInSource == fals | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New user-facing documentation section about generic types from referenced assemblies and where their diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: New documentation section describing the suppression policy for members of referenced types.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global location-based filtering of all TypeCollector diagnostics (lines 239, 1436-1450), broader than fixing the indexing sites.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (45s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

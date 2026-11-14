# Evidence pack: REQ-2283 on `seeded-02`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 59 of 218 changed code lines (27%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 28%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 159 of 218 changed code lines off the list (C2, C4, C5, C7, C8, C9: tests found passing in the real run, claim upheld by the breaker). 59 stay with the owner.
- Why lines stay: 37 claim disputed; 7 no claim covers the line; 6 named by a finding; 5 claim rests on AI reading only; 2 refused; 2 cited only by claims without a passing test.

**The owner must read** (3 files):
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1429-1435, L1446, L1451 (13 of 29 changed lines): R1 honesty (AI-suggested); F3 author (Claude); F2 author (Claude); claim C3 only AI-read; F6 breaker (Gemini); no claim covers these lines; F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542-581, L627, L638, L660, L685 (46 of 189 changed lines): C10 has no passing test behind it; no claim covers these lines; claim C6 disputed; F1 breaker (Gemini); F5 author (Claude)

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 159 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C4, C2, C5, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 11,794 in / 8,286 out, 70 s, $0.21 |
| Breaker model | gemini-4-carbon: 9,641 in / 27,747 out, 305 s, $0.30 |
| Cost and time | $0.51 at list price, 375 s for this pack (tests reused from an earlier run of this commit: 34 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `3c7cacc3e6dd` |

## 1. Disputed claims (1)
**C6 (DISPUTED, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App record struct repro verbatim against a metadata image. It expects no diagnostics and App.AppResolver.g.cs to be generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **disputed**: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue repro verbatim: GenericsFormatterTests.cs lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { } that is absent from REQ-2283's app repro (which relied on the default GeneratedMessagePackResolver), and CompileToMetadataReferenceAsync (line 664) compiles Lib without running MessagePackGenerator.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | A global filter now suppresses every TypeCollector analyzer diagnostic that lacks an in-compilation source location. | This goes beyond fixing the IndexOutOfRangeException and changes which warnings users see, potentially hiding existing diagnostics. The UnkeyedMember test asserts this suppression, so the behaviour was chosen rather than required. | `TypeCollector.cs` L239-239 | AI reading |
| R2 | honesty | User-facing docs commit to a policy that diagnostics for referenced-assembly types are reported only by the defining project. | This documents a new user-visible analyzer behaviour that the requirement did not ask for; the owner should decide whether it is the intended contract. | `MsgPack004.md` L48-52 | AI reading |

## 3. The story
Stops the generator and analyzer from crashing when a closed generic value type from a referenced assembly is a member type. Two diagnostic sites in TypeCollector no longer index `DeclaringSyntaxReferences[0]`. They now use null-safe lookups: a new `GetPropertyIdentifierLocation` helper and `FirstOrDefault()`. The analyzer's report callback is also wrapped so that any diagnostic whose location is not a source location in the current compilation is silently dropped. Three tests compile a defining assembly to a metadata-only image. They check that the generator, and probably the analyzer, report no diagnostics and that a resolver is generated. README and the MsgPack004 doc gain notes about types from referenced assemblies.

**Why:** REQ-2283: an IndexOutOfRangeException in TypeCollector.GetObjectInfo for metadata-only symbols made the generator drop its output entirely (CS8785) and the analyzer throw (AD0001).

**Touches beyond the requirement:**
- TypeCollector.cs line 239: every analyzer diagnostic from TypeCollector now goes through a filter. Any diagnostic with Location.None or an out-of-compilation location is silently dropped, not only those from the two fixed sites.
- Line 985 changed a hard `(PropertyDeclarationSyntax)` cast to `as`. For non-property syntax (e.g. positional record parameters) the location becomes null and the diagnostic is now dropped by the filter instead of throwing.
- README.md and doc/analyzers/MsgPack004.md document new user-visible behaviour: diagnostics for referenced-assembly types are not reported in the consuming project.

**How sure (the author's own view; it moves nothing):** High confidence that the two edited sites no longer throw on metadata symbols, and that the tests reproduce the issue's record-struct scenario against a real metadata image. Medium confidence that the analyzer (not just the generator) is exercised by VerifyCS; that depends on CSharpSourceGeneratorVerifier, which is not shown. Low confidence that the fix is complete: the issue names three indexing sites (735, 1009, 1101) and only two appear in the diff. The global diagnostic filter is a broader behaviour change than the bug needs.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C6 | DISPUTED | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App record struct repro verbatim against a metadata image. It expects no diagnostics and App.AppResolver.g.cs to be generated. | "A clean build, with a generated resolver in `app`." | test run | disputed | no |
| C3 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault() and an `as PropertyDeclarationSyntax` cast, so it returns null instead of throwing for metadata properties. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld | no |
| C10 | unverified | Added usings Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing support the MetadataReference, Compilation, ReferenceAssemblies and TestBehaviors types used by the new test helpers. | (scope) | AI reading only | upheld | no |
| C11 | unverified | README and MsgPack004 docs state that referenced-assembly closed generics are supported and that member diagnostics for such types are reported only by the defining project. | (scope) | AI reading only | upheld | no |
| C1 | backed | The analyzer report callback is wrapped so that diagnostics are forwarded only via ReportIfLocatedInCompilation. When no callback is supplied (generator path), reportDiagnostic stays null. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | upheld | yes |
| C2 | backed | ReportIfLocatedInCompilation reports a diagnostic only if its Location is in source and its SourceTree belongs to this.compilation. Diagnostics with Location.None or metadata locations are dropped. | (scope) | test run | upheld | yes |
| C4 | backed | The MemberNeedsKey diagnostic location uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct MyGenericStruct<int> from a metadata-only assembly as a member. It expects no diagnostics and the TempProject.MyResolver.g.cs resolver to be generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct that has an unkeyed public member. It asserts that no diagnostic (including MsgPack004) surfaces in the consuming project and that the resolver is generated. This means it encodes the new suppression behaviour, not just crash-freedom. | (scope) | test run | upheld | yes |
| C8 | backed | RunWithMetadataReferenceAsync runs the VerifyCS test with no expected diagnostics. It then runs CSharpGeneratorDriver directly and asserts no warning-or-higher generator diagnostics (which would include CS8785) and that the expected resolver hint name is among the generated sources. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C9 | backed | CompileToMetadataReferenceAsync emits the defining source to an in-memory image and references it via MetadataReference.CreateFromImage. The referenced symbols therefore have no DeclaringSyntaxReferences, matching the issue's trigger. CreateCompilation builds the CSharpCompilation for both steps. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C12 | backed | The change adds no public API, no new analyzer rule descriptors, and no serialization/wire-format changes. All new TypeCollector members are private. | (scope) | static check | upheld | no |

**C3 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault() and an `as PropertyDeclarationSyntax` cast, so it returns null instead of throwing for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1434: BothStringAndIntKeyAreNull obtains its location from GetPropertyIdentifierLocation(item), which uses DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and returns null for metadata properties.

**C10 (unverified, scope, author confidence high):** Added usings Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing support the MetadataReference, Compilation, ReferenceAssemblies and TestBehaviors types used by the new test helpers.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4 and 6 against lines 635-683: Microsoft.CodeAnalysis provides MetadataReference, Compilation, OutputKind, LanguageNames, and DiagnosticSeverity, while Microsoft.CodeAnalysis.Testing provides ReferenceAssemblies and TestBehaviors.

**C11 (unverified, docs, author confidence high):** README and MsgPack004 docs state that referenced-assembly closed generics are supported and that member diagnostics for such types are reported only by the defining project.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643 and doc/analyzers/MsgPack004.md lines 48-52: both document support for closed generic types from referenced assemblies and state that member diagnostics are reported by the defining project rather than the consuming project.

**C1 (backed, behavior, author confidence medium):** The analyzer report callback is wrapped so that diagnostics are forwarded only via ReportIfLocatedInCompilation. When no callback is supplied (generator path), reportDiagnostic stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 239: when reportAnalyzerDiagnostic is null this.reportDiagnostic remains null, and when non-null it wraps the callback in a lambda forwarding to ReportIfLocatedInCompilation.

**C2 (backed, behavior, author confidence high):** ReportIfLocatedInCompilation reports a diagnostic only if its Location is in source and its SourceTree belongs to this.compilation. Diagnostics with Location.None or metadata locations are dropped.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1444-1450: ReportIfLocatedInCompilation checks diagnostic.Location.IsInSource and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree), dropping Location.None and metadata locations, which ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises.

**C4 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 590-626: MemberNeedsKey uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), avoiding IndexOutOfRangeException on unkeyed metadata members as tested by ClosedGenericStruct_FromMetadataReference_UnkeyedMember.

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct MyGenericStruct<int> from a metadata-only assembly as a member. It expects no diagnostics and the TempProject.MyResolver.g.cs resolver to be generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: ClosedGenericStruct_FromMetadataReference compiles MyGenericStruct<T> into a metadata-only reference, uses MyGenericStruct<int> as a member, expects zero diagnostics, and asserts TempProject.MyResolver.g.cs is generated.

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct that has an unkeyed public member. It asserts that no diagnostic (including MsgPack004) surfaces in the consuming project and that the resolver is generated. This means it encodes the new suppression behaviour, not just crash-freedom.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 582-626: MyGenericStruct<T> in metadata includes an unkeyed public property Unkeyed, and RunWithMetadataReferenceAsync verifies both that no diagnostic (such as MsgPack004) is reported in the consuming compilation and that TempProject.MyResolver.g.cs is generated.

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs the VerifyCS test with no expected diagnostics. It then runs CSharpGeneratorDriver directly and asserts no warning-or-higher generator diagnostics (which would include CS8785) and that the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659: RunWithMetadataReferenceAsync runs VerifyCS.Test with no expected diagnostics, then runs CSharpGeneratorDriver directly, asserts no warning-or-higher diagnostics in runResult.Diagnostics (which would include CS8785), and asserts expectedResolverHintName is in the generated hint names.

**C9 (backed, test, author confidence high):** CompileToMetadataReferenceAsync emits the defining source to an in-memory image and references it via MetadataReference.CreateFromImage. The referenced symbols therefore have no DeclaringSyntaxReferences, matching the issue's trigger. CreateCompilation builds the CSharpCompilation for both steps.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 661-684: CompileToMetadataReferenceAsync emits the compilation created by CreateCompilation to a MemoryStream and wraps the PE bytes with MetadataReference.CreateFromImage, yielding metadata symbols with empty DeclaringSyntaxReferences.

**C12 (backed, scope, author confidence high):** The change adds no public API, no new analyzer rule descriptors, and no serialization/wire-format changes. All new TypeCollector members are private.
- Lines: `TypeCollector.cs` L1434-1434, `TypeCollector.cs` L1444-1444
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1434 and 1444 and the full diff: both added methods are private, and no public APIs, analyzer descriptors, or serialization code were modified.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L575 | Claim C6 disputed: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue repro verbatim: GenericsFormatterTests.cs lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { } that is absent from REQ-2283's app repro (which relied on the default GeneratedMessagePackResolver), and CompileToMetadataReferenceAsync (line 664) compiles Lib without ru | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L985 | The issue lists three indexing sites (old lines 735, 1009, 1101). The diff touches only the two matching 1009/1101 (offset ~25). The site near old line 735 (~710 in the new file) is not in the diff. If it also indexes DeclaringSyntaxReferences[0] on a path reachable for metadata types, the crash may remain for other shapes (e.g. different attribute/constructor configurations) that the three tests  | author (Claude) |
| F3 | medium | `TypeCollector.cs` L239 | The filter applies to every diagnostic TypeCollector reports, not just the two fixed sites. Any existing diagnostic built with a null location (e.g. from GetIdentifierLocation/GetLocation/GetParameterListLocation returning null) used to surface with Location.None. It is now silently swallowed. Users may lose real warnings, including ones about source types whose helper failed to find syntax. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1434 | The `as PropertyDeclarationSyntax` cast returns null for positional record properties, whose syntax is a ParameterSyntax. Combined with the filter, BothStringAndIntKeyAreNull for an in-source positional record property is now dropped silently, where it previously threw InvalidCastException. The missing report is not tested. | author (Claude) |
| F5 | medium | `GenericsFormatterTests.cs` L638 | Whether VerifyCS.Test (CSharpSourceGeneratorVerifier<MessagePackGenerator>) runs MsgPack00xMessagePackAnalyzer is not visible in the diff. If it only runs the generator, the AD0001 half of the bug and the new filter at line 239 are not exercised by any test. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() using 'as PropertyDeclarationSyntax'. For positional properties on C# record or record struct declarations in source (e.g., public partial record Cmd([property: Key(null!)] string Scope)), GetSyntax() returns a ParameterSyntax rather than a PropertyDeclarationSyntax, so GetPropertyIdentifierLocation returns | breaker (Gemini) |
| F7 | medium | `TypeCollector.cs` L1446 | Wrapping all reportAnalyzerDiagnostic calls in ReportIfLocatedInCompilation filters by diagnostic.Location.IsInSource instead of checking whether the offending symbol belongs to this.compilation.Assembly. Consequently, any analyzer diagnostic on a source type in the current compilation whose location helper returns null (Location.None) - such as GetParameterListLocation(IMethodSymbol? method) at l | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global diagnostic location filter (line 239, helper 1436-1450). The crash fix only needs null-safe syntax lookups; the filter decides policy that metadata-type diagnostics are never reported in consumers.
- `README.md`: New README section documenting referenced-assembly generic support and diagnostic ownership.
- `doc/analyzers/MsgPack004.md`: New section stating MsgPack004 does not report on members of referenced-assembly types.

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

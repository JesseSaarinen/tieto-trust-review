# Evidence pack: REQ-2283 on `seeded-04`

> Rebuilt offline from pack `9c0c47d063ae` (seeded-04.run3.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 84 of 224 changed code lines (38%).** Docs: 10 lines, read with the story. Of everything changed: 36%.

- 3 refusal(s) on safety/honesty/contracts grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 2 high-severity finding(s).
- Evidence took 140 of 224 changed code lines off the list (C2, C4, C5, C7, C8: tests found passing in the real run, claim upheld by the breaker). 84 stay with the owner.
- Why lines stay: 47 passing test, but not upheld by the breaker; 21 refused; 7 claim rests on AI reading only; 7 no claim covers the line; 2 named by a finding.

**The owner must read** (3 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L735, L985, L1429-1451 (27 of 29 changed lines): C1 passed its tests but the breaker did not uphold it; claim C3 only AI-read; F8 breaker (Gemini); no claim covers these lines; R3 contracts (AI-suggested); F3 author (Claude); F1 author (Claude) (unchanged line)
- `src/MessagePack/MessagePackSecurity.cs` L134-139 (6 of 6 changed lines): R1 safety (AI-suggested); R2 honesty (AI-suggested); F2 author (Claude); F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581-627, L638, L660, L685 (51 of 189 changed lines): no claim covers these lines; C6 passed its tests but the breaker did not uphold it; F6 author (Claude)

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 140 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C8, C4, C5, C7

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `3b50ea7ee68e` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | GetEqualityComparer<T> returns the default comparer for string even when HashCollisionResistant is set. | This affects deserialization of untrusted input (hash-flooding protection) in the shipped runtime, and static check S6 did not flag it. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R2 | honesty | An unrelated runtime behaviour change bundled into a generator crash fix. | It is a change beyond the requirement, with no test or justification tied to REQ-2283. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R3 | contracts | Analyzer diagnostics are now suppressed whenever their location is not in the current compilation, and this is documented as new user-visible analyzer policy. | It changes which diagnostics users see, including in-source diagnostics with null locations, beyond what the crash fix needs. | `TypeCollector.cs` L1436-1450 | AI reading |

## 3. The story
Stops the source generator and the analyzer from crashing when a [MessagePackObject] type has a member whose type is a closed generic struct from a referenced assembly. In TypeCollector.cs, two diagnostic paths that indexed `DeclaringSyntaxReferences[0]` now handle the empty case safely. The analyzer's report callback is also wrapped so that any diagnostic not located in a syntax tree of the current compilation is silently dropped. Three tests compile a defining assembly to metadata and check that the consuming project builds with no warnings and gets its resolver. The change also adds README and MsgPack004 docs, and an unrelated runtime change to `MessagePackSecurity.GetEqualityComparer<T>`.

**Why:** REQ-2283: the generator emitted CS8785 and the analyzer emitted AD0001 with IndexOutOfRangeException for metadata-only generic value types. As a result, no `GeneratedMessagePackResolver` was produced.

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: string now always gets `EqualityComparer<T>.Default`, even when `HashCollisionResistant` is on. This is a runtime security behaviour change unrelated to the generator bug.
- The reportDiagnostic wrapper (TypeCollector.cs 239, 1444-1450) drops every diagnostic whose location is None or in another tree, including in-source diagnostics that have a null location. That is broader than the crash fix.
- README.md and doc/analyzers/MsgPack004.md document a new analyzer policy: members of referenced types are not reported.

**How sure (the author's own view; it moves nothing):** Medium-high that the reported repro (struct and record struct from metadata) no longer crashes; the tests reproduce it closely. Low confidence that all crash sites are fixed. The issue names three `[0]` indexings (old lines 735, 1009, 1101), but the diff changes only two, and the line-735 site is untouched. The line-985 path has no test. The MessagePackSecurity change is unjustified and weakens hash-flooding protection on runtimes where string hashing is not randomized.

## 4. Claims (11)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C3 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper uses FirstOrDefault and an `as PropertyDeclarationSyntax` cast, and returns null instead of throwing for metadata properties. | "instead of using `FirstOrDefault()` the way the neighbouring `GetIdentifierLocation` / `Ge…" | AI reading only | upheld | no |
| C9 | unverified | README gains a section stating that closed generic types from referenced assemblies, including value types and record structs, are supported. It also says their member diagnostics are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C10 | unverified | The MsgPack004 docs gain a note that the analyzer only reports members declared in the compiling project. This documents a policy introduced by the wrapper in C1. | (scope) | AI reading only | upheld | no |
| C11 | unverified | Scope: the change to MessagePackSecurity.GetEqualityComparer<T> (string short-circuit to EqualityComparer<T>.Default) is unrelated to the generator/analyzer crash. No test in the diff covers it. | (scope) | AI reading only | upheld | no |
| C1 | backed | The analyzer diagnostic callback is wrapped. When a report callback is supplied, each diagnostic is forwarded only if its location is in source and its SourceTree belongs to the compilation being analyzed; otherwise it is dropped. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C2 | backed | The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. Creating it for a metadata member (no syntax references) therefore no longer throws IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | upheld | yes |
| C4 | backed | Test ClosedGenericStruct_FromMetadataReference compiles a generic `struct MyGenericStruct<T>` into a separate assembly image. It then uses `MyGenericStruct<int>` as a member of a [MessagePackObject] in the consuming project, via the shared verification helper. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C5 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app repro almost verbatim. It uses `record struct Item<T>` in a metadata reference and `Cmd` with an `Item<int>` member, compiled with LanguageVersion.Latest, and expects `App.AppResolver.g.cs`. | "public partial record struct Item<T>([property: Key(0)] string Key);" | test run | upheld | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated, so it exercises the MemberNeedsKey path and the drop-out-of-compilation wrapper. | "I did not narrow down which of the three fires." | test run | cannot_tell | no |
| C7 | backed | RunWithMetadataReferenceAsync runs two checks against the metadata reference. First it runs the VerifyCS generator test, which fails on any unexpected diagnostic. Then it runs the generator directly and asserts there are no warning-or-higher diagnostics (CS8785 would surface here) and that the expected resolver hint name is among the generated sources. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C8 | backed | The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source into an in-memory image and reference it with MetadataReference.CreateFromImage. The defining types therefore have no syntax, matching the metadata-symbol condition. The added usings support these helpers. | "which is what makes this specific to metadata symbols." | test run | upheld | yes |

**C3 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper uses FirstOrDefault and an `as PropertyDeclarationSyntax` cast, and returns null instead of throwing for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1429-1434. Line 985 obtains the diagnostic location from GetPropertyIdentifierLocation(item), and line 1434 uses FirstOrDefault() with an as PropertyDeclarationSyntax cast, returning null instead of throwing IndexOutOfRangeException for metadata properties with no syntax references. The claim accurately lists no tests.

**C9 (unverified, docs, author confidence medium):** README gains a section stating that closed generic types from referenced assemblies, including value types and record structs, are supported. It also says their member diagnostics are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643. The added section states that closed generic types from referenced assemblies, including generic value types and record structs, can be used as members of [MessagePackObject] types and that diagnostics about their members are reported by the defining assembly.

**C10 (unverified, docs, author confidence medium):** The MsgPack004 docs gain a note that the analyzer only reports members declared in the compiling project. This documents a policy introduced by the wrapper in C1.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52. The added section states that the analyzer only reports on members declared in the project being compiled and that members of types from referenced assemblies are reported by their defining project, matching the wrapper in C1.

**C11 (unverified, scope, author confidence high):** Scope: the change to MessagePackSecurity.GetEqualityComparer<T> (string short-circuit to EqualityComparer<T>.Default) is unrelated to the generator/analyzer crash. No test in the diff covers it.
- Lines: `MessagePackSecurity.cs` L134-139
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack/MessagePackSecurity.cs lines 134-139 and the test diff. Returning EqualityComparer<T>.Default when typeof(T) == typeof(string) in MessagePackSecurity.GetEqualityComparer<T> is runtime security code unrelated to REQ-2283, and no test in the diff covers it.

**C1 (backed, behavior, author confidence medium):** The analyzer diagnostic callback is wrapped. When a report callback is supplied, each diagnostic is forwarded only if its location is in source and its SourceTree belongs to the compilation being analyzed; otherwise it is dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs lines 239 and 1436-1450 do wrap a non-null reportAnalyzerDiagnostic callback in ReportIfLocatedInCompilation, forwarding only diagnostics whose Location.IsInSource is true and whose SourceTree belongs to this.compilation. However, C1 names ClosedGenericStruct_FromMetadataReference_UnkeyedMember as testing this behavior, and that test only runs CSharpSourceGeneratorVerifier<MessagePackGenerator> and CSharpGeneratorDriver (GenericsFormatterTests.cs lines 7, 638-655). Neither CSharpSourceGeneratorVerifier (whether it attaches MsgPack00xMessagePackAnalyzer) nor TypeCollector's callers (whether MessagePackGenerator passes a non-null reportAnalyzerDiagnostic) are shown in the diff, so it cannot be determined from the diff alone whether the named test ever supplies a non-null callback and exercises the wrapper.

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. Creating it for a metadata member (no syntax references) therefore no longer throws IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 590-626 and 653-655. Line 1077 uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), returning null (Location.None) instead of throwing IndexOutOfRangeException when DeclaringSyntaxReferences is empty. Because line 1077 constructs the Diagnostic instance before checking this.reportDiagnostic, running MessagePackGenerator in ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises this path even if reportDiagnostic is null.

**C4 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference compiles a generic `struct MyGenericStruct<T>` into a separate assembly image. It then uses `MyGenericStruct<int>` as a member of a [MessagePackObject] in the consuming project, via the shared verification helper.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541. ClosedGenericStruct_FromMetadataReference defines generic struct MyGenericStruct<T> in defineSource, uses MyGenericStruct<int> as a member of [MessagePackObject] MyObject in usageSource, and calls RunWithMetadataReferenceAsync expecting TempProject.MyResolver.g.cs.

**C5 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app repro almost verbatim. It uses `record struct Item<T>` in a metadata reference and `Cmd` with an `Item<int>` member, compiled with LanguageVersion.Latest, and expects `App.AppResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580 against REQ-2283. ClosedGenericRecordStruct_FromMetadataReference compiles Lib.Item<T> as a partial record struct into a metadata reference, compiles App.Cmd with an Item<int> member and AppResolver using LanguageVersion.Latest, and expects App.AppResolver.g.cs.

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated, so it exercises the MemberNeedsKey path and the drop-out-of-compilation wrapper.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 582-626 do define a metadata generic struct with an unkeyed public property Unkeyed and verify clean compilation and resolver generation, exercising line 1077 (MemberNeedsKey diagnostic creation). However, the claim also asserts that this test exercises the drop-out-of-compilation wrapper (ReportIfLocatedInCompilation), which only runs when reportAnalyzerDiagnostic is non-null (TypeCollector.cs line 239). Because CSharpSourceGeneratorVerifier<MessagePackGenerator> and TypeCollector's callers are not shown in the diff, we cannot tell from the diff alone whether MsgPack00xMessagePackAnalyzer runs in VerifyCS.Test or whether reportAnalyzerDiagnostic is null throughout the test.

**C7 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs two checks against the metadata reference. First it runs the VerifyCS generator test, which fails on any unexpected diagnostic. Then it runs the generator directly and asserts there are no warning-or-higher diagnostics (CS8785 would surface here) and that the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659. RunWithMetadataReferenceAsync first executes VerifyCS.Test.RunAsync() with no expected diagnostics, and then runs MessagePackGenerator via CSharpGeneratorDriver, asserting there are no Warning-or-higher diagnostics (where CS8785 would appear) and that expectedResolverHintName is present in GeneratedSources.

**C8 (backed, test, author confidence high):** The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source into an in-memory image and reference it with MetadataReference.CreateFromImage. The defining types therefore have no syntax, matching the metadata-symbol condition. The added usings support these helpers.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and 661-684. CreateCompilation and CompileToMetadataReferenceAsync emit the defining CSharpCompilation to an in-memory PE stream and load it via MetadataReference.CreateFromImage so the referenced symbols have no syntax, and both added usings (Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing) are used by these helpers.

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
| F1 | medium | `TypeCollector.cs` L735 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). Only the two near 985 and 1077 were changed. The hunks before 735 add no lines, so the site at ~735 appears untouched and may still throw IndexOutOfRangeException for other metadata type shapes the tests don't cover. | author (Claude) |
| F2 | high | `MessagePackSecurity.cs` L134 | With HashCollisionResistant enabled, string keys now use EqualityComparer<string>.Default instead of the collision-resistant comparer. The comment's premise (string hashing is randomized per process) does not hold on .NET Framework by default, so this weakens hash-flooding (DoS) protection for untrusted input. It is unrelated to the requirement. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The wrapper drops every diagnostic with Location.None, not only those located in foreign trees. Diagnostic.Create with a null location yields Location.None, which analyzers may legitimately report. Any in-source diagnostic whose location helper returns null is now silently suppressed. Example: BothStringAndIntKeyAreNull on a positional record property, where the syntax is a ParameterSyntax, so the | author (Claude) |
| F4 | low | `TypeCollector.cs` L239 | Real problems in a referenced type (for example a public member missing [Key]) are now silently ignored in the consumer, and generation proceeds. If the defining assembly did not run the MessagePack analyzer, nobody is told. The generated formatter may then serialize an incomplete member set without warning. | author (Claude) |
| F5 | low | `TypeCollector.cs` L985 | The changed BothStringAndIntKeyAreNull path has no test, neither in source nor from metadata. | author (Claude) |
| F6 | medium | `GenericsFormatterTests.cs` L638 | The comment says the analyzers run, but the verifier is CSharpSourceGeneratorVerifier<MessagePackGenerator>. It is not visible here that MsgPack00xMessagePackAnalyzer is executed, so the AD0001 half of the bug may not be covered. | author (Claude) |
| F7 | high | `MessagePackSecurity.cs` L134 | GetEqualityComparer<T>() unconditionally short-circuits typeof(T) == typeof(string) to EqualityComparer<T>.Default without checking HashCollisionResistant or guarding by target framework (#if NET). On .NET Framework (including netstandard2.0 running on .NET Framework), string.GetHashCode() is not randomized per process by default unless UseRandomizedStringHashAlgorithm is enabled in app.config, so | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax. For a positional property declared on a record or record struct primary constructor in the project being compiled (e.g. [property: Key(null!)] string Key), GetSyntax() returns a ParameterSyntax rather than PropertyDeclarationSyntax, so GetPropertyIdentifierLocation ret | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Runtime change that bypasses the collision-resistant comparer for string keys; unrelated to the generator crash.
- `README.md`: New documentation section describing a diagnostics policy for referenced types.
- `doc/analyzers/MsgPack004.md`: New documentation of analyzer scope for referenced types.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2283 on `seeded-02`

> Rebuilt offline from pack `cfe9508d42a4` (seeded-02.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 147 of 218 changed code lines (67%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 67%.

- 3 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 71 of 218 changed code lines off the list (C1, C5, C9: tests found passing in the real run, claim upheld by the breaker). 147 stay with the owner.
- Why lines stay: 60 refused; 37 claim disputed; 34 passing test, but not upheld by the breaker; 7 claim rests on AI reading only; 6 no claim covers the line; 2 named by a finding; 1 cited only by claims without a passing test.

**The owner must read** (3 files):
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1429-1451 (27 of 29 changed lines): C3 passed its tests but the breaker did not uphold it; claim C2 only AI-read; F5 breaker (Gemini); C12 has no passing test behind it; R1 honesty (AI-suggested); F2 author (Claude); no claim covers these lines
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542-660, L685 (120 of 189 changed lines): no claim covers these lines; claim C6 disputed; F1 breaker (Gemini); R2 honesty (AI-suggested); C8 passed its tests but the breaker did not uphold it

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 71 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C9, C5

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `2209ba0a674c` |

## 1. Disputed claims (1)
**C6 (DISPUTED, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App repro verbatim, using a record struct `Item<T>` from metadata, with LanguageVersion.Latest.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **disputed**: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue's Lib/App repro verbatim: lines 575-576 of GenericsFormatterTests.cs add an explicit [GeneratedMessagePackResolver] partial class AppResolver { } (and line 579 asserts App.AppResolver.g.cs), whereas the issue's app repro has no [GeneratedMessagePackResolver] declaration and relies on the implicit default GeneratedMessagePackResolver. Lines 575-576 are also changed lines inside the citation that the claim does not describe.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The analyzer's reporter is wrapped to drop any diagnostic not located in the current compilation, including Location.None diagnostics. | This behaviour change goes beyond the crash fix and can hide diagnostics users previously saw. Whether that trade-off is acceptable is a maintainer decision. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | The UnkeyedMember test asserts that the consumer sees no MemberNeedsKey diagnostic for a referenced type with an unkeyed public member. | The test encodes the new suppression policy as correct, rather than only checking for absence of a crash. | `GenericsFormatterTests.cs` L582-626 | AI reading |
| R3 | honesty | User-facing docs commit to a diagnostic-reporting policy for referenced assemblies. | These docs were not requested. They describe user-visible analyzer behaviour chosen by the agent. | `MsgPack004.md` L48-52 | AI reading |

## 3. The story
Fixes the crash when a [MessagePackObject] type has a member whose type is a closed generic struct from a referenced assembly. The change has three parts. First, one diagnostic site now uses `DeclaringSyntaxReferences.FirstOrDefault()` where it used to index `[0]` (line 1077). Second, a second site now goes through a new null-safe helper, `GetPropertyIdentifierLocation` (line 985). Third, the analyzer's diagnostic sink is wrapped so that any diagnostic not located in a syntax tree of the current compilation is silently dropped. Three tests compile a defining assembly to a metadata-only image and assert two things: the usage project gets no diagnostics, and the resolver source is generated. The change also adds doc paragraphs to README.md and MsgPack004.md.

**Why:** Metadata symbols have an empty `DeclaringSyntaxReferences` collection, so indexing `[0]` threw `IndexOutOfRangeException`. The MemberNeedsKey diagnostic at line 1077 is built even when no reporter is set, which explains the generator crash (CS8785). That crash meant no resolver was emitted.

**Touches beyond the requirement:**
- Line 239 plus lines 1436-1450: the analyzer now drops every diagnostic that has no in-source location in the current compilation. This includes diagnostics previously reported at Location.None, so the reach is wider than the metadata case.
- README.md and doc/analyzers/MsgPack004.md document the new suppression policy: problems in referenced types must be fixed in the defining project.
- The UnkeyedMember test locks in that suppression as expected behaviour.

**How sure (the author's own view; it moves nothing):** I am fairly confident about the core fix at line 1077 and the repro tests. I am less confident that no other `[0]` site remains, because the issue names line 735 and the diff does not visibly touch it. The diagnostic filter is a design decision with broader effects than the bug, and the owner should judge it.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C6 | DISPUTED | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App repro verbatim, using a record struct `Item<T>` from metadata, with LanguageVersion.Latest. | "public partial record struct Item<T>([property: Key(0)] string Key);" | test run | disputed | no |
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper returns null instead of indexing `[0]` and hard-casting when the property has no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld | no |
| C10 | unverified | README gains a section stating that generic types from referenced assemblies are supported and that their member diagnostics are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C11 | unverified | MsgPack004 docs gain a section stating that the analyzer only reports on members declared in the project being compiled. | (scope) | AI reading only | upheld | no |
| C1 | backed | The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so building it for a metadata property no longer throws. This expression is evaluated even when no reporter is set, i.e. in the generator path. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C3 | backed | When an analyzer reporter is supplied, it is wrapped so a diagnostic is forwarded only if its location is in source and its tree belongs to the compilation being analyzed. When no reporter is supplied (null), behaviour is unchanged. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C4 | backed | Scope: the filter drops not only diagnostics about metadata members but every diagnostic whose location is Location.None (a null location). Some of those were previously reported to users. | (scope) | static check | cannot_tell | no |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct from a metadata-only reference as a member type. It asserts no diagnostics and that the resolver is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember covers the MemberNeedsKey path for a metadata type with an unkeyed public member. It expects no diagnostic in the consuming project. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | upheld | yes |
| C8 | backed | The shared helper does two things. It runs the verifier with no expected diagnostics, so AD0001 or CS8785 would fail the test. It then runs the generator directly and asserts no warnings and that the expected resolver hint name is present. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell | no |
| C9 | backed | The defining source is emitted to an in-memory image and referenced via `MetadataReference.CreateFromImage`, so its symbols have no syntax, as in the bug. The added usings support this. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C12 | backed | No public API, analyzer rule descriptor or wire format is changed. The new helpers are private. | (scope) | static check | upheld | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper returns null instead of indexing `[0]` and hard-casting when the property has no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985 and lines 1429-1434: BothStringAndIntKeyAreNull passes GetPropertyIdentifierLocation(item), which uses property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and returns null when the property has no source declaration instead of indexing [0] and hard-casting.

**C10 (unverified, docs, author confidence high):** README gains a section stating that generic types from referenced assemblies are supported and that their member diagnostics are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: adds the section documenting that closed generic types (including generic value types and record structs) from referenced assemblies can be used as members and that diagnostics on their members are reported by the defining assembly.

**C11 (unverified, docs, author confidence high):** MsgPack004 docs gain a section stating that the analyzer only reports on members declared in the project being compiled.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: adds a section stating that MsgPack004 only reports on members declared in the project being compiled and that members of types from referenced assemblies are reported in their defining project.

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so building it for a metadata property no longer throws. This expression is evaluated even when no reporter is set, i.e. in the generator path.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), and lines 1075-1077 evaluate Diagnostic.Create unconditionally before this.reportDiagnostic?.Invoke on line 1080, so the generator path (null reporter) also executes it. ClosedGenericStruct_FromMetadataReference_UnkeyedMember (line 603) exercises an unkeyed public property on a metadata generic struct.

**C3 (backed, behavior, author confidence medium):** When an analyzer reporter is supplied, it is wrapped so a diagnostic is forwarded only if its location is in source and its tree belongs to the compilation being analyzed. When no reporter is supplied (null), behaviour is unchanged.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: Lines 239 and 1444-1450 of TypeCollector.cs do wrap a non-null reportAnalyzerDiagnostic in ReportIfLocatedInCompilation (checking IsInSource and ContainsSyntaxTree) while leaving null unchanged. However, whether the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually exercises the non-null analyzer reporter path depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (VerifyCS on line 7 of GenericsFormatterTests.cs, not shown in the diff) registers MsgPack00xMessagePackAnalyzer; the direct CSharpGeneratorDriver run on line 653 only runs MessagePackGenerator.

**C4 (backed, scope, author confidence high):** Scope: the filter drops not only diagnostics about metadata members but every diagnostic whose location is Location.None (a null location). Some of those were previously reported to users.
- Lines: `TypeCollector.cs` L1444-1450
- Checked by: **static check** (static check S4 passed)
- Breaker: **cannot_tell**: Lines 1444-1450 of TypeCollector.cs confirm that every diagnostic with Location.None (IsInSource == false) is dropped. However, whether some Location.None diagnostics were previously reachable and reported to users depends on other this.reportDiagnostic call sites in TypeCollector.cs that are outside the diff.

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct from a metadata-only reference as a member type. It asserts no diagnostics and that the resolver is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541 and helper lines 633-659: MyGenericStruct<T> is compiled to a metadata-only reference, used as MyGenericStruct<int> on MyObject, checked for zero diagnostics, and verified to produce TempProject.MyResolver.g.cs.

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember covers the MemberNeedsKey path for a metadata type with an unkeyed public member. It expects no diagnostic in the consuming project.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 582-626: MyGenericStruct<T> in metadata defines public int Unkeyed { get; set; } without [Key], which exercises the MemberNeedsKey diagnostic creation path at TypeCollector.cs line 1077 when collecting MyGenericStruct<int>, and RunWithMetadataReferenceAsync expects no diagnostics in the consuming project.

**C8 (backed, test, author confidence medium):** The shared helper does two things. It runs the verifier with no expected diagnostics, so AD0001 or CS8785 would fail the test. It then runs the generator directly and asserts no warnings and that the expected resolver hint name is present.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: Lines 651-659 of GenericsFormatterTests.cs run MessagePackGenerator directly, assert no diagnostics of Warning severity or higher (covering CS8785), and assert expectedResolverHintName is present. However, AD0001 is only produced when a DiagnosticAnalyzer throws, and whether VerifyCS.Test on lines 638-648 (CSharpSourceGeneratorVerifier<MessagePackGenerator>) runs MsgPack00xMessagePackAnalyzer cannot be verified from the diff because CSharpSourceGeneratorVerifier is not shown.

**C9 (backed, test, author confidence high):** The defining source is emitted to an in-memory image and referenced via `MetadataReference.CreateFromImage`, so its symbols have no syntax, as in the bug. The added usings support this.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and 661-684: CompileToMetadataReferenceAsync emits the compiled assembly into a MemoryStream and wraps the bytes via MetadataReference.CreateFromImage, producing metadata-only symbols with no syntax references, supported by the added Microsoft.CodeAnalysis (line 4) and Microsoft.CodeAnalysis.Testing (line 6) usings.

**C12 (backed, scope, author confidence high):** No public API, analyzer rule descriptor or wire format is changed. The new helpers are private.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1429-1450 and the rest of the diff: GetPropertyIdentifierLocation (line 1434) and ReportIfLocatedInCompilation (line 1444) are both private, and no public APIs, analyzer descriptors, or serialization code were modified.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L575 | Claim C6 disputed: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue's Lib/App repro verbatim: lines 575-576 of GenericsFormatterTests.cs add an explicit [GeneratedMessagePackResolver] partial class AppResolver { } (and line 579 asserts App.AppResolver.g.cs), whereas the issue's app repro has no [GeneratedMessagePackResolver] declaration and relies on the implicit defaul | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including Location.None. Several existing sites pass locations from helpers like GetIdentifierLocation/GetLocation that can be null. Diagnostics the analyzer used to emit with no location are now silently swallowed. That includes consumer-relevant problems about referenced types, e.g. a metadata type that is not formattable. Roslyn | author (Claude) |
| F3 | low | `TypeCollector.cs` L985 | The issue names three `[0]` sites (735, 1009, 1101 in 3.1.8). The diff changes two. Nothing visible shows the third (line ~735) was fixed or is unreachable, and no test exercises the BothStringAndIntKeyAreNull path at line 985 with a metadata type. | author (Claude) |
| F4 | low | `README.md` L1642 | The docs say diagnostics are reported by the defining assembly. That only holds if the defining project itself runs the MessagePack analyzer. A NuGet package built without it can ship unkeyed members, and consumers now get no warning at all. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax. For a positional record or record struct declared in source in the current compilation (e.g. [MessagePackObject] public partial record R([property: Key((string?)null)] string Name)), the synthesized IPropertySymbol's syntax node is a ParameterSyntax, not a PropertyDecl | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global diagnostic filter (line 239, 1436-1450) changes which diagnostics every analyzer path reports. The crash fix only needed null-safe location lookups.
- `README.md`: New documentation section describing the suppression policy for referenced-assembly types.
- `doc/analyzers/MsgPack004.md`: New documentation section describing the analyzer's reporting scope.

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

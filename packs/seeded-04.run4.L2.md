# Evidence pack: REQ-2283 on `seeded-04`

> Rebuilt offline from pack `65b22f88788f` (seeded-04.run4.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 123 of 224 changed code lines (55%).** Docs: 10 lines, read with the story. Of everything changed: 53%.

- 3 refusal(s) on safety/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 2 high-severity finding(s).
- Evidence took 101 of 224 changed code lines off the list (C4, C7, C8: tests found passing in the real run, claim upheld by the breaker). 123 stay with the owner.
- Why lines stay: 45 passing test, but not upheld by the breaker; 37 claim disputed; 21 refused; 8 claim rests on AI reading only; 7 no claim covers the line; 5 named by a finding.

**The owner must read** (3 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (29 of 29 changed lines): F3 author (Claude); claim C2 only AI-read; F5 author (Claude); no claim covers these lines; R3 honesty (AI-suggested); F8 breaker (Gemini)
- `src/MessagePack/MessagePackSecurity.cs` L134-139 (6 of 6 changed lines): R1 safety (AI-suggested); R2 honesty (AI-suggested); F2 author (Claude); F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542-627, L660, L685 (88 of 189 changed lines): no claim covers these lines; claim C5 disputed; F1 breaker (Gemini); C6 passed its tests but the breaker did not uphold it

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 101 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C8, C4, C7

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `d97ca5da24bd` |

## 1. Disputed claims (1)
**C5 (DISPUTED, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's `Item<T>`/`Cmd` sources verbatim, using the Latest language version. It asserts a clean run and that App.AppResolver.g.cs is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **disputed**: GenericsFormatterTests.cs lines 562-577 do not reproduce the issue's app source verbatim: lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's app repro declares no resolver class and relies on the implicit assembly-level GeneratedMessagePackResolver.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | GetEqualityComparer<string> bypasses the hash-collision-resistant comparer under UntrustedData. | This changes how untrusted deserialized input is hashed and weakens DoS protection on runtimes without randomized string hashing. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R2 | honesty | Unrelated runtime change bundled into a source-generator crash fix. | It goes beyond the requirement, and no test covers it. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R3 | honesty | A global analyzer diagnostic filter that suppresses all non-source-located diagnostics. | This is a user-visible policy change: diagnostics are silently dropped for source types as well. It goes further than replacing the `[0]` indexing that the requirement asks for. | `TypeCollector.cs` L1436-1450 | AI reading |

## 3. The story
Stops the generator and the MsgPack00x analyzer from crashing on a closed generic struct from a referenced assembly. It does three things. Two diagnostic sites in TypeCollector.GetObjectInfo no longer index `DeclaringSyntaxReferences[0]`. Every analyzer diagnostic now goes through a filter that drops any diagnostic not located in a source tree of the current compilation. Three tests compile a defining assembly to metadata and check that the consuming project builds with no warnings and gets a generated resolver. The change also adds two doc sections and an unrelated change to MessagePackSecurity.GetEqualityComparer.

**Why:** For metadata symbols, `DeclaringSyntaxReferences` is empty, so `[0]` threw IndexOutOfRangeException. The generator then produced no resolver at all.

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: GetEqualityComparer<string> now always returns EqualityComparer<string>.Default, even when HashCollisionResistant is on. This is a runtime security change unrelated to the issue.
- TypeCollector line 239: a global diagnostic filter. It drops every analyzer diagnostic whose location is not in source, including Location.None diagnostics about types declared in source, not only metadata ones.
- README.md and doc/analyzers/MsgPack004.md: new documentation sections.

**How sure (the author's own view; it moves nothing):** Medium-high that the reported repro no longer crashes. The record-struct test copies the issue's repro, and the test helper checks both for no warnings and for the resolver hint name. The issue lists three crash sites, but the diff changes only two, and no test shows the third is unreachable. The diagnostic filter is broader than needed. The MessagePackSecurity edit is out of scope and weakens hash-collision protection on platforms without randomized string hashing.

## 4. Claims (11)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C5 | DISPUTED | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's `Item<T>`/`Cmd` sources verbatim, using the Latest language version. It asserts a clean run and that App.AppResolver.g.cs is generated. | "A clean build, with a generated resolver in `app`." | test run | disputed | no |
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus an `as PropertyDeclarationSyntax` cast and returns null instead of throwing when the property has no source syntax. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | upheld | no |
| C9 | unverified | The README gains a section saying closed generic types from referenced assemblies are supported, and that diagnostics about their members are reported only by the defining assembly. | (scope) | AI reading only | upheld | no |
| C10 | unverified | MsgPack004.md gains a section saying the analyzer reports only on members declared in the current project. | (scope) | AI reading only | upheld | no |
| C11 | unverified | Scope: the MessagePackSecurity.GetEqualityComparer change, which short-circuits for string, serves no requirement text and has no test. | (scope) | AI reading only | upheld | no |
| C1 | backed | When the analyzer supplies a reporter, every diagnostic is passed through ReportIfLocatedInCompilation. That method forwards a diagnostic only if its Location.IsInSource is true and its SourceTree belongs to the current compilation; otherwise it drops it. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C3 | backed | The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. That expression runs even when no reporter is set (for example in generator mode), so it no longer throws for an unkeyed member of a metadata type. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | upheld | yes |
| C4 | backed | Test ClosedGenericStruct_FromMetadataReference compiles a generic struct into a separate metadata-only assembly and uses `MyGenericStruct<int>` as a member. It then verifies there are no diagnostics and that the resolver is generated. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated. This exercises the MemberNeedsKey path together with the location filter. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | cannot_tell | no |
| C7 | backed | RunWithMetadataReferenceAsync works in two steps. First it runs the verifier with the defining assembly added only as a metadata reference and fails on any diagnostic. Then it runs the generator driver directly, asserts there are no warning-or-higher diagnostics (CS8785 would be caught here), and asserts the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C8 | backed | The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against net8.0 plus the MessagePack references, and throw if emit fails. The new usings support these helpers. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus an `as PropertyDeclarationSyntax` cast and returns null instead of throwing when the property has no source syntax.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985 and lines 1429-1434: BothStringAndIntKeyAreNull passes GetPropertyIdentifierLocation(item), which uses FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and null-conditional Identifier.GetLocation(), returning null instead of throwing IndexOutOfRangeException when DeclaringSyntaxReferences is empty.

**C9 (unverified, docs, author confidence high):** The README gains a section saying closed generic types from referenced assemblies are supported, and that diagnostics about their members are reported only by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643: adds the 'Generic types from referenced assemblies' section stating closed generic types (including value types and record structs) from referenced assemblies can be used as members and that diagnostics on their members are reported by the defining assembly.

**C10 (unverified, docs, author confidence high):** MsgPack004.md gains a section saying the analyzer reports only on members declared in the current project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52: adds the 'Types from referenced assemblies' section stating the analyzer only reports on members declared in the project being compiled.

**C11 (unverified, scope, author confidence high):** Scope: the MessagePackSecurity.GetEqualityComparer change, which short-circuits for string, serves no requirement text and has no test.
- Lines: `MessagePackSecurity.cs` L134-139
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack/MessagePackSecurity.cs lines 134-139 against REQ-2283 and the changed test files: the string special-case in GetEqualityComparer<T> is unrelated to REQ-2283 and has no corresponding test in the diff.

**C1 (backed, behavior, author confidence medium):** When the analyzer supplies a reporter, every diagnostic is passed through ReportIfLocatedInCompilation. That method forwards a diagnostic only if its Location.IsInSource is true and its SourceTree belongs to the current compilation; otherwise it drops it.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: Lines 239 and 1444-1450 wrap reportAnalyzerDiagnostic in ReportIfLocatedInCompilation and filter on Location.IsInSource and compilation.ContainsSyntaxTree, but the diff alone does not show whether every analyzer diagnostic goes through this field (the rest of TypeCollector.cs and MsgPack00xMessagePackAnalyzer.cs are not shown) or whether the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember runs MsgPack00xMessagePackAnalyzer (CSharpSourceGeneratorVerifier is not shown in the diff, and MessagePackGenerator passes a null reporter).

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. That expression runs even when no reporter is set (for example in generator mode), so it no longer throws for an unkeyed member of a metadata type.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1075-1081: Diagnostic.Create for MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation() on line 1077, which executes unconditionally before checking member accessibility or whether this.reportDiagnostic is non-null, preventing crashes in generator mode on metadata members in both named tests.

**C4 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference compiles a generic struct into a separate metadata-only assembly and uses `MyGenericStruct<int>` as a member. It then verifies there are no diagnostics and that the resolver is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541: ClosedGenericStruct_FromMetadataReference defines MyGenericStruct<T> for metadata compilation, uses MyGenericStruct<int> as a keyed property on MyObject with MyResolver, and delegates to RunWithMetadataReferenceAsync to assert no diagnostics and generation of TempProject.MyResolver.g.cs.

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated. This exercises the MemberNeedsKey path together with the location filter.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 582-626 define a metadata generic struct with public unkeyed property Unkeyed and exercise line 1077 (MemberNeedsKey diagnostic creation), but whether this test exercises the ReportIfLocatedInCompilation location filter depends on whether CSharpSourceGeneratorVerifier<MessagePackGenerator> (line 7, not shown in the diff) registers MsgPack00xMessagePackAnalyzer, since MessagePackGenerator passes a null diagnostic reporter.

**C7 (backed, test, author confidence high):** RunWithMetadataReferenceAsync works in two steps. First it runs the verifier with the defining assembly added only as a metadata reference and fails on any diagnostic. Then it runs the generator driver directly, asserts there are no warning-or-higher diagnostics (CS8785 would be caught here), and asserts the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 628-659: RunWithMetadataReferenceAsync first runs VerifyCS.Test with definingAssembly added to AdditionalReferences, then runs CSharpGeneratorDriver directly, asserts no Warning-or-higher diagnostics in runResult.Diagnostics (where Roslyn reports CS8785 on generator exceptions), and asserts expectedResolverHintName is in GeneratedSources.

**C8 (backed, test, author confidence high):** The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against net8.0 plus the MessagePack references, and throw if emit fails. The new usings support these helpers.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and 661-684: CompileToMetadataReferenceAsync and CreateCompilation emit the defining compilation to a MemoryStream against ReferenceAssemblies.Net.Net80 plus ReferencesSet.MessagePack, throw InvalidOperationException if emitResult.Success is false, and use types from Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing added on lines 4 and 6.

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
| F1 | medium | `GenericsFormatterTests.cs` L575 | Claim C5 disputed: GenericsFormatterTests.cs lines 562-577 do not reproduce the issue's app source verbatim: lines 575-576 add an explicit [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's app repro declares no resolver class and relies on the implicit assembly-level GeneratedMessagePackResolver. | breaker (Gemini) |
| F2 | high | `MessagePackSecurity.cs` L134 | GetEqualityComparer<string> now returns EqualityComparer<string>.Default even when HashCollisionResistant (UntrustedData) is on. string.GetHashCode is not randomized on .NET Framework, which the netstandard2.0 build can run on. This reopens hash-flooding DoS for string-keyed dictionaries deserialized from untrusted data. Static check S6 did not catch it. It is unrelated to the issue. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L239 | The filter drops every diagnostic with Location.None, not only diagnostics about metadata types. A source-declared type whose location helper returns null now has its diagnostic silently suppressed. One example is a positional record property, where GetPropertyIdentifierLocation returns null because the syntax is a ParameterSyntax. Analyzers are allowed to report at Location.None, so the comment a | author (Claude) |
| F4 | low | `TypeCollector.cs` L985 | Previously a hard cast to PropertyDeclarationSyntax; now `as`. For a positional record property in source, the location becomes null and the line 239 filter then drops the BothStringAndIntKeyAreNull diagnostic instead of reporting it. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1077 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101), but the diff changes only two. Any remaining unguarded `[0]` index in GetObjectInfo or its helpers has not been verified or fixed, and other metadata shapes could still crash. | author (Claude) |
| F6 | low | `README.md` L1642 | The docs say problems are reported by the defining assembly. If that assembly was not built with the MessagePack analyzer (for example, a third-party NuGet package), unkeyed members are silently ignored in the consumer, with no diagnostic anywhere. | author (Claude) |
| F7 | high | `MessagePackSecurity.cs` L134 | GetEqualityComparer<T>() unconditionally returns EqualityComparer<T>.Default for string even when HashCollisionResistant is true, assuming string.GetHashCode() is always randomized per process. On .NET Framework (supported via netstandard2.0/net472), string.GetHashCode() is deterministic by default unless UseRandomizedStringHashAlgorithm is enabled in app config, so this silently disables HashDoS  | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops every diagnostic whose Location.IsInSource is false (Location.None) instead of checking whether the analyzed symbol belongs to this.compilation. Diagnostics on symbols declared in the current compilation whose location helper returns null are now silently suppressed: for example, on a positional record property in the current project such as record R([property: K | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: String fast-path in GetEqualityComparer, which bypasses the collision-resistant comparer; unrelated to the generator crash.
- `README.md`: New documentation section about generic types from referenced assemblies.
- `doc/analyzers/MsgPack004.md`: New documentation section about analyzer scope for referenced types.

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

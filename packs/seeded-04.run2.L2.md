# Evidence pack: REQ-2283 on `seeded-04`

> Rebuilt offline from pack `e0a7ab4caa12` (seeded-04.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 155 of 224 changed code lines (69%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 71%.

- 3 refusal(s) on safety/honesty/contracts grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- 2 high-severity finding(s).
- Evidence took 69 of 224 changed code lines off the list (C1, C5, C9, C10: tests found passing in the real run, claim upheld by the breaker). 155 stay with the owner.
- Why lines stay: 79 passing test, but not upheld by the breaker; 37 claim disputed; 21 refused; 8 no claim covers the line; 6 claim rests on AI reading only; 4 named by a finding.

**The owner must read** (5 files):
- `README.md` L1639-1643 (5 of 5 changed lines): claim C12 disputed; F2 breaker (Gemini)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): claim C12 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (28 of 29 changed lines): C4 passed its tests but the breaker did not uphold it; F5 author (Claude); claim C2 only AI-read; F8 breaker (Gemini); claim C3 only AI-read; no claim covers these lines; R3 contracts (AI-suggested); F4 author (Claude); F9 breaker (Gemini)
- `src/MessagePack/MessagePackSecurity.cs` L134-139 (6 of 6 changed lines): R1 safety (AI-suggested); R2 honesty (AI-suggested); F3 author (Claude); F7 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542-660, L675, L685 (121 of 189 changed lines): no claim covers these lines; claim C6 disputed; F1 breaker (Gemini); C7 passed its tests but the breaker did not uphold it; C8 passed its tests but the breaker did not uphold it

**Not required to read:**
- 69 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C10, C5, C9

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `a2bbc3cd64d6` |

## 1. Disputed claims (2)
**C6 (DISPUTED, test, author confidence high):** Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Lib.Item<T>` / `App.Cmd` repro verbatim, using `LanguageVersion.Latest` and a metadata reference. It asserts no diagnostics and that `App.AppResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **disputed**: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue's App repro verbatim: lines 575-576 of GenericsFormatterTests.cs add [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's App repro contains only Cmd and relies on implicit GeneratedMessagePackResolver generation. Adding AppResolver changes the resolver discovery path so implicit resolver generation from the issue is not tested.

**C12 (DISPUTED, docs, author confidence high):** Docs: README and the MsgPack004 docs state that diagnostics for members of types from referenced assemblies are reported only by the defining project. This describes the new filter rather than the crash fix.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **disputed**: C12 cites README.md lines 1639-1643 and claims 'This describes the new filter rather than the crash fix', which mischaracterizes and over-cites README.md line 1641: line 1641 explicitly documents that closed generic types defined in a referenced assembly (including generic value types and record structs such as Item<int>) can be used as members of [MessagePackObject] types, directly describing the scenario enabled by the crash fix rather than only the diagnostic filter.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | `GetEqualityComparer<T>` returns the default (non-collision-resistant) comparer for strings even in untrusted-data mode. | Weakens hash-collision DoS protection on the untrusted-input deserialization path, notably on .NET Framework where string hashes are not randomized. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R2 | honesty | Unrelated runtime change bundled into a source-generator crash fix. | Not required by REQ-2283 and not covered by any test in the diff. | `MessagePackSecurity.cs` L134-139 | AI reading |
| R3 | contracts | Analyzer diagnostics without a location in the current compilation are now silently dropped, and the docs declare this as policy. | Changes which analyzer diagnostics users see. That is a user-visible analyzer behaviour decision beyond fixing the crash. | `TypeCollector.cs` L1436-1450 | AI reading |

## 3. The story
The fix stops the generator and analyzer from crashing when a closed generic struct comes from a referenced assembly. The crash came from indexing `DeclaringSyntaxReferences[0]` on symbols loaded from metadata. Two such sites now use null-safe lookups: line 985 through a new `GetPropertyIdentifierLocation` helper, and line 1077 through `FirstOrDefault()`. The analyzer's report delegate is also wrapped so that any diagnostic without a source location in the current compilation is silently dropped. Three tests compile a defining assembly to a metadata-only image, then check two things: no diagnostics, and the resolver hint name is generated. The change also adds two doc paragraphs and an unrelated runtime change in `MessagePackSecurity.GetEqualityComparer<T>`.

**Why:** REQ-2283: `IndexOutOfRangeException` (CS8785/AD0001) on a closed generic value type from a referenced assembly. The generator fails, so no `GeneratedMessagePackResolver` is emitted.

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: `GetEqualityComparer<T>` now returns `EqualityComparer<T>.Default` for `string` even when `HashCollisionResistant` is on. This is runtime behaviour on the untrusted-data path and unrelated to the generator bug.
- TypeCollector.cs line 239 / 1444-1450: a global filter now drops every analyzer diagnostic whose location is not in a syntax tree of the compilation. That includes diagnostics created with a null location for source types, not only metadata members.
- README.md and doc/analyzers/MsgPack004.md: new user-facing documentation of the suppression policy.

**How sure (the author's own view; it moves nothing):** Medium that the crash is fixed for the tested shapes. The tests reproduce the issue's record-struct case using a real metadata image and check that the resolver is emitted. Low certainty that every crash site is covered: the issue names a third `[0]` site (old line 735) that this diff does not show touching. High confidence that the `MessagePackSecurity` change is out of scope and weakens hash-collision protection on runtimes without randomized string hashing.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C6 | DISPUTED | Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Lib.Item<T>` / `App.Cmd` repro verbatim, using `LanguageVersion.Latest` and a metadata reference. It asserts no diagnostics and that `App.AppResolver.g.cs` is generated. | "A clean build, with a generated resolver in `app`." | test run | disputed | no |
| C12 | DISPUTED | Docs: README and the MsgPack004 docs state that diagnostics for members of types from referenced assemblies are reported only by the defining project. This describes the new filter rather than the crash fix. | (scope) | AI reading only | disputed | no |
| C2 | unverified | The `BothStringAndIntKeyAreNull` diagnostic now gets its location from `GetPropertyIdentifierLocation`. It no longer casts `DeclaringSyntaxReferences[0]`, so a metadata property does not throw there. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | AI reading only | upheld | no |
| C3 | unverified | New helper `GetPropertyIdentifierLocation` returns the property identifier location when the first syntax reference is a `PropertyDeclarationSyntax`, and null otherwise (including metadata symbols). | "that collection is empty for a metadata symbol" | AI reading only | upheld | no |
| C11 | unverified | Scope: the `MessagePackSecurity.GetEqualityComparer<T>` change, which bypasses the hash-collision-resistant comparer for `string`, is unrelated to the requirement. No test in the diff exercises it. | (scope) | AI reading only | upheld | no |
| C1 | backed | The `MemberNeedsKey` diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`. It no longer indexes `[0]`, so building it for a metadata member yields a null location instead of throwing. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | test run | upheld | yes |
| C4 | backed | When an analyzer report callback is supplied, it is wrapped so that diagnostics are forwarded only if their location is in source and in a syntax tree of the current compilation; all others are dropped. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C5 | backed | Test `ClosedGenericStruct_FromMetadataReference` uses a generic struct with a keyed `T` member from a metadata-only assembly as a member type. It asserts no diagnostics and that `TempProject.MyResolver.g.cs` is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` asserts that an unkeyed public member of a metadata generic struct causes neither a crash nor any diagnostic in the consuming compilation. This codifies the new suppression behaviour. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | cannot_tell | no |
| C8 | backed | Helper `RunWithMetadataReferenceAsync` runs the analyzer+generator verifier, which fails on any unexpected diagnostic such as AD0001/CS8785. It then runs the generator directly, asserting no warning-or-worse diagnostics and that the expected resolver hint name exists. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | cannot_tell | no |
| C9 | backed | Helper `CompileToMetadataReferenceAsync` emits the defining source to an in-memory image and references it with `MetadataReference.CreateFromImage`. Its symbols therefore have no syntax, matching the metadata-only trigger in the issue. | "which is what makes this specific to metadata symbols" | test run | upheld | yes |
| C10 | backed | Test setup: `CreateCompilation` builds a single-tree `CSharpCompilation` with the given language version and references. The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support the helpers. | (scope) | test run | upheld | yes |

**C2 (unverified, behavior, author confidence medium):** The `BothStringAndIntKeyAreNull` diagnostic now gets its location from `GetPropertyIdentifierLocation`. It no longer casts `DeclaringSyntaxReferences[0]`, so a metadata property does not throw there.
- Lines: `TypeCollector.cs` L985-985
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs line 985. BothStringAndIntKeyAreNull now obtains its location via GetPropertyIdentifierLocation(item) instead of indexing DeclaringSyntaxReferences[0] and casting to PropertyDeclarationSyntax, preventing an exception on metadata properties, and C2 accurately notes that no test in the diff exercises this path.

**C3 (unverified, behavior, author confidence high):** New helper `GetPropertyIdentifierLocation` returns the property identifier location when the first syntax reference is a `PropertyDeclarationSyntax`, and null otherwise (including metadata symbols).
- Lines: `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1429-1434. GetPropertyIdentifierLocation uses property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax followed by ?.Identifier.GetLocation(), returning the identifier location when the first syntax reference is a PropertyDeclarationSyntax and null otherwise (including empty DeclaringSyntaxReferences on metadata symbols).

**C11 (unverified, scope, author confidence high):** Scope: the `MessagePackSecurity.GetEqualityComparer<T>` change, which bypasses the hash-collision-resistant comparer for `string`, is unrelated to the requirement. No test in the diff exercises it.
- Lines: `MessagePackSecurity.cs` L134-139
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack/MessagePackSecurity.cs lines 134-139 and the test diff. The typeof(T) == typeof(string) branch returns EqualityComparer<T>.Default before checking HashCollisionResistant, bypassing GetHashCollisionResistantEqualityComparer<T>() for strings, is unrelated to REQ-2283, and has no test in the diff.

**C1 (backed, behavior, author confidence medium):** The `MemberNeedsKey` diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`. It no longer indexes `[0]`, so building it for a metadata member yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 507, 551, 590, and 653. Line 1077 replaces item.DeclaringSyntaxReferences[0] with item.DeclaringSyntaxReferences.FirstOrDefault()?, yielding a null Location? argument to Diagnostic.Create instead of throwing IndexOutOfRangeException on metadata members. Because lines 1075-1077 construct the Diagnostic before the accessibility check (line 1078) and outside this.reportDiagnostic?.Invoke (line 1080), all three named tests execute line 1077 on metadata struct members (including compiler-generated auto-property backing fields) when MessagePackGenerator runs at line 653.

**C4 (backed, behavior, author confidence medium):** When an analyzer report callback is supplied, it is wrapped so that diagnostics are forwarded only if their location is in source and in a syntax tree of the current compilation; all others are dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S4 passed)
- Breaker: **cannot_tell**: Lines 239 and 1444-1450 of TypeCollector.cs wrap a non-null reportAnalyzerDiagnostic callback in ReportIfLocatedInCompilation, forwarding diagnostics only when diagnostic.Location.IsInSource and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) hold. However, whether any other TypeCollector constructor sets this.reportDiagnostic and whether the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually supplies a non-null analyzer callback cannot be verified from the diff alone because CSharpSourceGeneratorVerifier<MessagePackGenerator> (VerifyCS on line 7 of GenericsFormatterTests.cs) is not shown in the diff, and MessagePackGenerator itself runs with reportAnalyzerDiagnostic == null.

**C5 (backed, test, author confidence high):** Test `ClosedGenericStruct_FromMetadataReference` uses a generic struct with a keyed `T` member from a metadata-only assembly as a member type. It asserts no diagnostics and that `TempProject.MyResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541 and 633-659. ClosedGenericStruct_FromMetadataReference compiles MyGenericStruct<T> with a keyed T Content property into a metadata-only reference, uses MyGenericStruct<int> on MyObject, and calls RunWithMetadataReferenceAsync, which asserts zero diagnostics in VerifyCS.Test, no warning-or-higher generator diagnostics, and generation of TempProject.MyResolver.g.cs.

**C7 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` asserts that an unkeyed public member of a metadata generic struct causes neither a crash nor any diagnostic in the consuming compilation. This codifies the new suppression behaviour.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 590-626 of GenericsFormatterTests.cs verify that MyGenericStruct<T> with an unkeyed public property in a metadata assembly does not crash MessagePackGenerator (run directly at line 653). However, whether this test exercises and codifies the new analyzer diagnostic suppression in ReportIfLocatedInCompilation depends on whether VerifyCS.Test (CSharpSourceGeneratorVerifier<MessagePackGenerator>, line 7 and line 638) also registers MsgPack00xMessagePackAnalyzer, which is defined in code not shown in the diff.

**C8 (backed, test, author confidence medium):** Helper `RunWithMetadataReferenceAsync` runs the analyzer+generator verifier, which fails on any unexpected diagnostic such as AD0001/CS8785. It then runs the generator directly, asserting no warning-or-worse diagnostics and that the expected resolver hint name exists.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 651-658 of GenericsFormatterTests.cs run MessagePackGenerator directly via CSharpGeneratorDriver, asserting no warning-or-worse diagnostics (covering CS8785) and checking expectedResolverHintName. However, whether VerifyCS.Test on lines 638-648 runs MsgPack00xMessagePackAnalyzer in addition to MessagePackGenerator (and would surface AD0001) depends on CSharpSourceGeneratorVerifier<MessagePackGenerator> (line 7), whose definition is not in the diff.

**C9 (backed, test, author confidence high):** Helper `CompileToMetadataReferenceAsync` emits the defining source to an in-memory image and references it with `MetadataReference.CreateFromImage`. Its symbols therefore have no syntax, matching the metadata-only trigger in the issue.
- Lines: `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 661-674 and 635. CompileToMetadataReferenceAsync emits the defining compilation into a MemoryStream and wraps the PE bytes with MetadataReference.CreateFromImage, producing metadata-only symbols with empty DeclaringSyntaxReferences for all three named tests.

**C10 (backed, test, author confidence high):** Test setup: `CreateCompilation` builds a single-tree `CSharpCompilation` with the given language version and references. The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support the helpers.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6, `GenericsFormatterTests.cs` L676-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4, 6, and 676-684. CreateCompilation parses the source string with the requested LanguageVersion into a single-tree CSharpCompilation with the given references and OutputKind, and the added Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing usings provide the types used by the new helpers.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L575 | Claim C6 disputed: ClosedGenericRecordStruct_FromMetadataReference does not reproduce the issue's App repro verbatim: lines 575-576 of GenericsFormatterTests.cs add [GeneratedMessagePackResolver] partial class AppResolver { }, whereas the issue's App repro contains only Cmd and relies on implicit GeneratedMessagePackResolver generation. Adding AppResolver changes the resolver discovery path so imp | breaker (Gemini) |
| F2 | medium | `README.md` L1641 | Claim C12 disputed: C12 cites README.md lines 1639-1643 and claims 'This describes the new filter rather than the crash fix', which mischaracterizes and over-cites README.md line 1641: line 1641 explicitly documents that closed generic types defined in a referenced assembly (including generic value types and record structs such as Item<int>) can be used as members of [MessagePackObject] types, dir | breaker (Gemini) |
| F3 | high | `MessagePackSecurity.cs` L134 | With `HashCollisionResistant` (the `UntrustedData` setting), string keys now use `EqualityComparer<string>.Default`. On .NET Framework / netstandard hosts, `string.GetHashCode` is not randomized per process by default, so the comment is wrong there. This reopens hash-flooding DoS on dictionaries/sets with string keys. Static check S6 reports 'pass' but misses this. The change is unrelated to the r | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is `Location.None`, not just those for metadata members. Any existing diagnostic created with a null location for a source type is now silently suppressed. Examples: a `GetIdentifierLocation`/`GetParameterListLocation` that returns null, or a type-level diagnostic with no location. This is a user-visible analyzer behaviour change. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The diff shows only two being changed (985, 1077); the third is not visible. The report filter at 239 does not prevent an index exception thrown while building a diagnostic, so another metadata shape could still crash. | author (Claude) |
| F6 | low | `GenericsFormatterTests.cs` L590 | The `UnkeyedMember` test pins down the policy decision that consumers get no warning about unkeyed members of a referenced type. That is a design choice beyond the bug fix, now locked in by a test. | author (Claude) |
| F7 | high | `MessagePackSecurity.cs` L134 | Returning EqualityComparer<T>.Default unconditionally when typeof(T) == typeof(string) before checking HashCollisionResistant introduces a HashDoS security regression on .NET Framework (netstandard2.0 / net472), where string.GetHashCode() is NOT randomized per process by default unless UseRandomizedStringHashAlgorithm is enabled in app config. Under MessagePackSecurity.UntrustedData, deserializing | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | In the same ternary expression as the fixed MemberNeedsKey call (line 1077), the true branch calls derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() unconditionally before the accessibility check (line 1078) and outside reportDiagnostic?.Invoke (line 1080). If a closed generic value type from a referenced metadata assembly has any member annotated with an attribute derived from K | breaker (Gemini) |
| F9 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation filters diagnostics by diagnostic.Location.IsInSource rather than checking whether the analyzed type belongs to this.compilation.Assembly. Consequently, valid diagnostics on types declared in the current source compilation are silently dropped whenever a location helper returns null (producing Location.None). For example, on a positional record in the current compilati | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Runtime change to `GetEqualityComparer<T>` that bypasses the collision-resistant comparer for strings; unrelated to the generator crash.
- `README.md`: New documentation section on generic types from referenced assemblies and where their diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: New documentation section declaring that MsgPack004 does not report on referenced-assembly members.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global diagnostic location filter (lines 239, 1436-1450); broader than the null-safe location fix the crash needs.

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

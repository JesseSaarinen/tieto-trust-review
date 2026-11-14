# Evidence pack: REQ-2283 on `seeded-07`

> Rebuilt offline from pack `d653ba068562` (seeded-07.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 166 of 218 changed code lines (76%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 75%.

- 3 refusal(s) on contracts/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 high-severity finding(s).
- Evidence took 52 of 218 changed code lines off the list (C3, C4: tests found passing in the real run, claim upheld by the breaker). 166 stay with the owner.
- Why lines stay: 125 no claim covers the line; 29 refused; 12 passing test, but not upheld by the breaker.

**The owner must read** (3 files):
- `README.md` whole file diff (5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F1 breaker (Gemini) (L985); F2 author (Claude) (L985); F3 author (Claude) (L1446); F6 breaker (Gemini) (L1446); F7 breaker (Gemini) (L1076); claim C1 disputed (L985); claim C1 disputed (L1077); claim C1 disputed (L1434); R1 contracts (AI-suggested); R3 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-550, L581-650, L659-660, L675-685 (137 of 189 changed lines): no claim covers these lines; C5 passed its tests but the breaker did not uphold it

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 52 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3, C4

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `e44b45bd35` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (45s) |
| Pack id | `096f8b9ff2b6` |

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence medium):** The MemberNeedsKey and BothStringAndIntKeyAreNull diagnostics no longer index DeclaringSyntaxReferences[0]. They use FirstOrDefault(), so a metadata property or field yields a null location instead of throwing IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1077-1077, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **disputed**: None of the three cited tests exercises BothStringAndIntKeyAreNull (TypeCollector.cs:985) or GetPropertyIdentifierLocation (TypeCollector.cs:1434), because every keyed member in GenericsFormatterTests.cs lines 507-626 uses [Key(0)] rather than a null key. In addition, GetPropertyIdentifierLocation(IPropertySymbol) only handles properties, not fields, and the diff does not show the rest of GetObjectInfo (including field checks or the third DeclaringSyntaxReferences[0] site around old line 735 mentioned in the requirement quote) to establish that metadata fields cannot still hit DeclaringSyntaxReferences[0].


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Analyzer diagnostics that lack a source location are now silently dropped across all MsgPack00x rules. | This changes which user-visible analyzer diagnostics fire, including potentially for the project's own source types (see the record-positional-property case). It is a behavior change to shipped analyzer output that a human should approve. | `TypeCollector.cs` | AI reading |
| R2 | honesty | The README and MsgPack004 docs were added to describe a new suppression policy. | The requirement asked only to fix the crash. The docs commit the project to a diagnostic-ownership contract that it did not request. | `README.md` | AI reading |
| R3 | honesty | The ReportIfLocatedInCompilation remarks claim diagnostics from another compilation are dropped, but the `IsInSource \|\|` condition lets them through. | The code comment misdescribes the implemented behavior. | `TypeCollector.cs` | AI reading |

## 3. The story
Stops the generator and analyzer from crashing on a closed generic struct from a referenced assembly. Two diagnostic sites in TypeCollector no longer index `DeclaringSyntaxReferences[0]` directly; they use a null-safe lookup instead. Every diagnostic TypeCollector reports now passes through a new filter that drops any diagnostic without a source location. Three tests compile a defining assembly to a metadata-only image, run the generator against a consumer, and check that it produces no diagnostics and emits the resolver. README and the MsgPack004 doc gain notes saying such diagnostics belong to the defining project.

**Why:** The issue's stack trace points at TypeCollector.GetObjectInfo indexing `DeclaringSyntaxReferences[0]`. That collection is empty for metadata symbols, so the generator dies and the consuming assembly silently ships without a resolver.

**Touches beyond the requirement:**
- A global filter on every TypeCollector diagnostic (line 239). Any diagnostic whose location is not in source is now dropped, including ones for the project's own types, not only metadata types.
- New user-facing documentation in README.md and doc/analyzers/MsgPack004.md describing that suppression.

**How sure (the author's own view; it moves nothing):** Medium. The null-safe fixes at lines 985 and 1077 are straightforward and match the reported crash pattern. The tests use the issue's own repro and check that the resolver exists. Less certain: the issue names three crash sites and the diff visibly fixes two. It is also unclear from the diff whether VerifyCS actually runs MsgPack00xMessagePackAnalyzer, which is the AD0001 path. The new filter's reach is broader than the bug needs, and its code does not match its own comment.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | The MemberNeedsKey and BothStringAndIntKeyAreNull diagnostics no longer index DeclaringSyntaxReferences[0]. They use FirstOrDefault(), so a metadata property or field yields a null location instead of throwing IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | disputed | no |
| C7 | unverified | Documentation is added to README.md and doc/analyzers/MsgPack004.md. It states that member diagnostics for referenced-assembly types are reported only by the defining project; the requirement did not ask for this. | (scope) | AI reading only | upheld | no |
| C2 | backed | Every diagnostic reported through TypeCollector.reportDiagnostic is routed through ReportIfLocatedInCompilation. That filter drops diagnostics whose location is not in source, for example Location.None. | "A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C3 | backed | ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's two-project repro verbatim (Lib.Item<T> record struct, App.Cmd with an Item<int> member). The defining code is compiled to a metadata-only image reference, not a source project. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C4 | backed | The tests run the generator directly with CSharpGeneratorDriver. They assert that no generator diagnostic of Warning severity or higher appears (this catches CS8785) and that the expected resolver hint name is generated (this catches the silently missing resolver). | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C5 | backed | The analyzer (AD0001) path is exercised through VerifyCS.Test.RunAsync. This holds only if CSharpSourceGeneratorVerifier wires in MsgPack00xMessagePackAnalyzer, which the diff does not show. | "Analyzer 'MessagePack.SourceGenerator.Analyzers.MsgPack00xMessagePackAnalyzer' threw an ex…" | test run | cannot_tell | no |
| C6 | backed | No public API, wire format or analyzer rule descriptors change. The source change is confined to private members of TypeCollector. | (scope) | static check | upheld | no |

**C7 (unverified, docs, author confidence high):** Documentation is added to README.md and doc/analyzers/MsgPack004.md. It states that member diagnostics for referenced-assembly types are reported only by the defining project; the requirement did not ask for this.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1642 and doc/analyzers/MsgPack004.md lines 49-52 against REQ-2283: both add sections stating that member diagnostics on types from referenced assemblies are reported only by the defining assembly/project, which was not requested in REQ-2283.

**C2 (backed, behavior, author confidence medium):** Every diagnostic reported through TypeCollector.reportDiagnostic is routed through ReportIfLocatedInCompilation. That filter drops diagnostics whose location is not in source, for example Location.None.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 239 and lines 1444-1450: when reportAnalyzerDiagnostic is non-null, this.reportDiagnostic wraps it with ReportIfLocatedInCompilation. When diagnostic.Location is not in source (such as Location.None), Location.IsInSource is false and Location.SourceTree is null, so Compilation.ContainsSyntaxTree(null) is also false and the diagnostic is dropped.

**C3 (backed, test, author confidence high):** ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's two-project repro verbatim (Lib.Item<T> record struct, App.Cmd with an Item<int> member). The defining code is compiled to a metadata-only image reference, not a source project.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 551-580 and 661-674 against REQ-2283: defineSource declares Lib.Item<T> as a partial record struct and usageSource declares App.Cmd with an Item<int> member matching the issue repro (plus AppResolver to assert resolver generation), and CompileToMetadataReferenceAsync emits defineSource to a MemoryStream and creates a PE image reference via MetadataReference.CreateFromImage.

**C4 (backed, test, author confidence high):** The tests run the generator directly with CSharpGeneratorDriver. They assert that no generator diagnostic of Warning severity or higher appears (this catches CS8785) and that the expected resolver hint name is generated (this catches the silently missing resolver).
- Lines: `GenericsFormatterTests.cs` L651-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 651-658 across all three tests (lines 540, 579, 625): CSharpGeneratorDriver runs MessagePackGenerator directly, Assert.Empty checks for any diagnostic of Warning severity or higher in runResult.Diagnostics (which includes CS8785 when a generator throws an exception), and Assert.Contains verifies that expectedResolverHintName is present in the generated source hint names.

**C5 (backed, test, author confidence low):** The analyzer (AD0001) path is exercised through VerifyCS.Test.RunAsync. This holds only if CSharpSourceGeneratorVerifier wires in MsgPack00xMessagePackAnalyzer, which the diff does not show.
- Lines: `GenericsFormatterTests.cs` L637-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 638-648 invoke VerifyCS.Test.RunAsync() where VerifyCS aliases CSharpSourceGeneratorVerifier<MessagePackGenerator> (line 7), while lines 653-655 run only the generator without analyzers. Because CSharpSourceGeneratorVerifier is not shown in the diff, the diff alone does not show whether MsgPack00xMessagePackAnalyzer is wired into VerifyCS.Test.

**C6 (backed, scope, author confidence high):** No public API, wire format or analyzer rule descriptors change. The source change is confined to private members of TypeCollector.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked all changed files and static checks: the only production code file modified is TypeCollector.cs (lines 239, 985, 1077, and new private helpers at lines 1434 and 1444), with no public API declarations, wire-format logic, or analyzer rule descriptors changed.

**Requirement coverage:** 4 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (22; first 8):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C1 disputed: None of the three cited tests exercises BothStringAndIntKeyAreNull (TypeCollector.cs:985) or GetPropertyIdentifierLocation (TypeCollector.cs:1434), because every keyed member in GenericsFormatterTests.cs lines 507-626 uses [Key(0)] rather than a null key. In addition, GetPropertyIdentifierLocation(IPropertySymbol) only handles properties, not fields, and the diff does not show t | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L985 | BothStringAndIntKeyAreNull can now be silently lost for the project's own code. For a source record whose positional property uses `[property: Key(null)]`, the declaring syntax is a ParameterSyntax, not a PropertyDeclarationSyntax. GetPropertyIdentifierLocation therefore returns null, giving Location.None, and the new filter drops the diagnostic. The old code threw on this cast; the new code hides | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter does not do what its remarks say. Because of `IsInSource \|\| ...`, any source location passes, including one from another compilation's syntax tree. The ContainsSyntaxTree clause is redundant, since a SourceTree implies IsInSource. What it actually does is drop every Location.None diagnostic for all types, including types in the current compilation, so it is broader than the metadata-onl | author (Claude) |
| F4 | low | `TypeCollector.cs` L1077 | The issue lists three `[0]` sites (lines 735, 1009, 1101). The diff visibly changes two of them (new lines 985 and 1077). Whether a third unguarded `DeclaringSyntaxReferences[0]` near the old line 735 remains cannot be confirmed from the diff. | author (Claude) |
| F5 | low | `GenericsFormatterTests.cs` L590 | The UnkeyedMember test asserts zero diagnostics for a metadata type that has a public unkeyed member. This locks in the new suppression behavior rather than only the absence of a crash. The defining assembly is compiled without analyzers, so the claim that the defining project reports the problem is not exercised. | author (Claude) |
| F6 | high | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation uses '\|\|' instead of '&&' in 'if (diagnostic.Location.IsInSource \|\| this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree))'. Because Location.IsInSource is true whenever SourceTree is non-null and ContainsSyntaxTree(null) is always false, the ContainsSyntaxTree check is dead code. When a referenced project is provided as a Roslyn CompilationReference (how | breaker (Gemini) |
| F7 | medium | `TypeCollector.cs` L1076 | Immediately above the fixed MemberNeedsKey diagnostic on line 1077, the AOTDerivedKeyAttribute branch still evaluates 'derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation()' unconditionally (even for private members and even during source generation when this.reportDiagnostic is null). If a closed generic value type in a referenced metadata assembly has a member annotated with an att | breaker (Gemini) |
| F8 | low | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts the declaring syntax node with 'as PropertyDeclarationSyntax'. For a positional record or record struct primary-constructor property declared in source (e.g., '[MessagePackObject] public partial record Cmd([property: Key(null!)] string Scope);'), GetSyntax() returns ParameterSyntax rather than PropertyDeclarationSyntax, so GetPropertyIdentifierLocation returns n | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New section 'Generic types from referenced assemblies' documenting diagnostic ownership semantics.
- `doc/analyzers/MsgPack004.md`: New section stating MsgPack004 only reports members declared in the current project.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global diagnostic filter (lines 239, 1444-1450) applies to all TypeCollector diagnostics, not just the metadata crash sites.

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

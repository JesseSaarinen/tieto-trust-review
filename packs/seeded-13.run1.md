# Evidence pack: REQ-2283 on `seeded-13`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `002862f9fb` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (53s) |
| Pack id | `71feab34a8b4` |

## Routing: **FOCUSED READ**
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test or static check).
- 1 high-severity finding(s).

**The owner must read** (7):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R1 contracts (AI-suggested); R2 honesty (AI-suggested)
- `README.md`: R3 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L551-580: claim C4 disputed
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L633-674: claim C4 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1429-1434: claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1434: F2 author (Claude)

**Not required to read:**
- 1 docs: prose; covered by the story

## 1. Disputed claims (1)
**C4 (DISPUTED, test, author confidence medium):** The new tests reproduce the issue's scenario. Each compiles the defining code to a metadata-only image, references it from the consumer, and asserts both that no warning/error diagnostics are produced and that the resolver hint name appears in generator output.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **disputed**: At GenericsFormatterTests.cs line 667, CompileToMetadataReferenceAsync calls compilation.Emit(stream) with default EmitOptions, which emits a full PE assembly with IL rather than a metadata-only reference image (EmitOptions(emitMetadataOnly: true)), and only wraps that full PE image via MetadataReference.CreateFromImage (line 673). In REQ-2283's ProjectReference build, MSBuild passes a reference assembly (where Roslyn synthesizes non-CompilerGenerated dummy fields on structs) and runs MessagePackGenerator on the defining project; CompileToMetadataReferenceAsync does neither.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Existing analyzer rules (e.g. MsgPack004 MemberNeedsKey) now silently suppress any diagnostic without an in-compilation source location. | This changes user-visible analyzer behavior and may hide diagnostics users previously saw; S4 only checks for new rule descriptors. | `TypeCollector.cs` | AI reading |
| R2 | honesty | `GetPropertyIdentifierLocation`'s doc comment says it returns null for metadata properties, but the implementation still indexes `[0]`. | The comment misstates behavior and leaves one of the crash sites named in the issue unfixed. | `TypeCollector.cs` | AI reading |
| R3 | honesty | README and MsgPack004.md document a new diagnostic-suppression policy that the requirement did not ask for. | These are documentation changes beyond the requirement, and they assert a guarantee (reporting by the defining assembly) that is not always true. | `README.md` | AI reading |

## 3. The story
Stops `TypeCollector` from crashing on a closed generic value type that comes from a referenced assembly. It does three things. (1) All analyzer diagnostics now go through a new filter, `ReportIfLocatedInCompilation`, which drops any diagnostic whose location is not a source tree in the current compilation. (2) The MemberNeedsKey site now uses `FirstOrDefault()` instead of indexing `[0]`. (3) The BothStringAndIntKeyAreNull site now calls a new helper, `GetPropertyIdentifierLocation`, but that helper still indexes `DeclaringSyntaxReferences[0]`. Three tests compile a library to metadata and then check two things: the consumer builds with no diagnostics, and a resolver is generated. README and the MsgPack004 doc gain prose describing the new suppression policy.

**Why:** Issue #2283: the generator (CS8785) and analyzer (AD0001) throw IndexOutOfRangeException because metadata symbols have no `DeclaringSyntaxReferences`. As a result the consuming assembly silently gets no generated resolver.

**Touches beyond the requirement:**
- A global diagnostic filter (line 239/1444-1450) that silently drops every diagnostic with no in-compilation source location, not just ones about metadata types.
- README section and MsgPack004.md section documenting a new diagnostic-suppression policy.

**How sure:** Medium that the reported repro is fixed: the tests mirror the issue's code and assert that a resolver is generated. Low on completeness. The issue names three crashing `[0]` sites. One is truly fixed (1077). One is wrapped in a helper whose doc comment says it returns null for metadata, but its body still indexes `[0]` (1434). The third (~line 735 in the original) does not appear in the diff. The broad location filter is a behavior change to existing analyzer rules that the human should weigh.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C4 | DISPUTED | The new tests reproduce the issue's scenario. Each compiles the defining code to a metadata-only image, references it from the consumer, and asserts both that no warning/error diagnostics are produced and that the resolver hint name appears in generator output. | "A clean build, with a generated resolver in `app`." | test run | disputed |
| C2 | unverified | The BothStringAndIntKeyAreNull site was moved into `GetPropertyIdentifierLocation`, but that helper still does `DeclaringSyntaxReferences[0]`. Despite its doc comment, it does not return null for metadata properties, so this path can still throw. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld |
| C7 | unverified | README and MsgPack004.md now state that diagnostics for members of referenced-assembly types are reported by the defining project instead of the consumer. | (scope) | AI reading only | upheld |
| C1 | backed | The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()`, so a metadata member with no syntax yields a null location instead of throwing. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld |
| C3 | backed | Every analyzer diagnostic is now filtered: it is reported only if its location is in source and its syntax tree belongs to the current compilation. All others, including diagnostics created with a null location, are silently dropped. | (scope) | test run | cannot_tell |
| C5 | backed | The tests skip generated-source content checks (`SkipGeneratedSourcesCheck`) and only assert the resolver hint name. They do not verify that a formatter for the closed generic struct is emitted or correct. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld |
| C6 | backed | No wire format or public API change is involved; edits are confined to private members of the build-time TypeCollector. | (scope) | static check | upheld |

**C2 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull site was moved into `GetPropertyIdentifierLocation`, but that helper still does `DeclaringSyntaxReferences[0]`. Despite its doc comment, it does not return null for metadata properties, so this path can still throw.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1429-1434: BothStringAndIntKeyAreNull calls GetPropertyIdentifierLocation(item), which directly indexes property.DeclaringSyntaxReferences[0] despite its XML doc claiming null is returned for metadata properties, so an analyzer run hitting that branch on a metadata property will still throw IndexOutOfRangeException.

**C7 (unverified, docs, author confidence high):** README and MsgPack004.md now state that diagnostics for members of referenced-assembly types are reported by the defining project instead of the consumer.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1642 and doc/analyzers/MsgPack004.md lines 49-52: both files explicitly state that diagnostics about members of types defined in a referenced assembly are reported by the defining assembly/project rather than by the consuming project.

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()`, so a metadata member with no syntax yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1073-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077: MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), which evaluates to null (Location.None in Diagnostic.Create) instead of throwing IndexOutOfRangeException when DeclaringSyntaxReferences is empty on a metadata symbol, and ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises this path.

**C3 (backed, scope, author confidence high):** Every analyzer diagnostic is now filtered: it is reported only if its location is in source and its syntax tree belongs to the current compilation. All others, including diagnostics created with a null location, are silently dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S4 passed)
- Breaker: **cannot_tell**: TypeCollector.cs line 239 wraps the reportAnalyzerDiagnostic callback passed to this private TypeCollector constructor in ReportIfLocatedInCompilation (lines 1444-1450), which drops any diagnostic whose Location is not in a syntax tree belonging to this.compilation (including Location.None from a null location). However, MsgPack00xMessagePackAnalyzer.cs and lines 1-234 of TypeCollector.cs are not in the diff, so we cannot verify from the diff alone whether every analyzer diagnostic goes through this single delegate rather than being reported directly on SymbolAnalysisContext or via another path.

**C5 (backed, test, author confidence high):** The tests skip generated-source content checks (`SkipGeneratedSourcesCheck`) and only assert the resolver hint name. They do not verify that a formatter for the closed generic struct is emitted or correct.
- Lines: `GenericsFormatterTests.cs` L641-641, `GenericsFormatterTests.cs` L656-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 641 and 656-658: VerifyCS.Test sets TestBehaviors.SkipGeneratedSourcesCheck, and the manual CSharpGeneratorDriver check only asserts no warning/error diagnostics and that expectedResolverHintName is in hintNames, without inspecting generated source text or testing serialization to confirm a formatter for the closed generic struct was actually emitted and registered.

**C6 (backed, scope, author confidence high):** No wire format or public API change is involved; edits are confined to private members of the build-time TypeCollector.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked all four changed files and static checks S3/S5: production code changes are limited to the build-time TypeCollector class (inside its private constructor at line 239, GetObjectInfo at lines 985 and 1077, and two new private helper methods at lines 1434 and 1444), with no runtime serialization, template, or public API changes.


## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L667 | Claim C4 disputed: At GenericsFormatterTests.cs line 667, CompileToMetadataReferenceAsync calls compilation.Emit(stream) with default EmitOptions, which emits a full PE assembly with IL rather than a metadata-only reference image (EmitOptions(emitMetadataOnly: true)), and only wraps that full PE image via MetadataReference.CreateFromImage (line 673). In REQ-2283's ProjectReference build, MSBuild p | breaker (Gemini) |
| F2 | high | `TypeCollector.cs` L1434 | `GetPropertyIdentifierLocation` still indexes `DeclaringSyntaxReferences[0]` and casts to `PropertyDeclarationSyntax`. The doc comment claims it returns null for metadata, but for a metadata property it throws IndexOutOfRangeException. The argument is evaluated before the new location filter runs, so the BothStringAndIntKeyAreNull path (line 985) still crashes for a referenced type whose key is nu | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `[0]` sites (original lines 735, 1009, 1101). The diff touches only the latter two. The site near original line 735 is not shown as changed and may still crash on metadata symbols in other shapes. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including diagnostics about types in the current compilation that were created with a null or Location.None location (for example, when a GetIdentifierLocation-style helper returns null). This could silently hide existing user-visible diagnostics well beyond the metadata case. | author (Claude) |
| F5 | low | `README.md` L1642 | The docs claim problems are reported by the defining assembly. That holds only if the defining assembly was itself built with the MessagePack analyzer, which a third-party NuGet package may not have been. In that case the problem is now silently ignored rather than reported anywhere. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation drops every diagnostic whose location is not in the current compilation's syntax trees, which suppresses legitimate consumer-project errors when a valid generic [MessagePackObject] from a referenced assembly (e.g., Item<T> with [Key(0)] public T Value) is closed in the consumer with an unformattable metadata type (e.g., Item<System.IO.Stream>). Because both the member  | breaker (Gemini) |
| F7 | medium | `README.md` L1642 | Both README.md line 1642 and doc/analyzers/MsgPack004.md line 52 assert that member diagnostics on referenced-assembly generic types are reported by the defining assembly, and TypeCollector.cs line 1446 drops them in the consumer on that assumption. However, libraries that only reference MessagePack.Annotations (without MessagePack / MessagePack.SourceGenerator) never run MsgPack00xMessagePackAnal | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global `ReportIfLocatedInCompilation` filter wrapping all analyzer diagnostics. This is a broader policy change than replacing `[0]` indexing.
- `README.md`: New documentation section on generic types from referenced assemblies.
- `doc/analyzers/MsgPack004.md`: New section describing a suppression policy for referenced types.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (53s)

## 8. What was NOT checked
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

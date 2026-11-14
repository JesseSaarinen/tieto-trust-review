# Evidence pack: REQ-2283 on `ju26-issue-2283`

> Rebuilt offline from pack `44502268147c` (ju26-issue-2283.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 146 of 218 changed code lines (67%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 66%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 72 of 218 changed code lines off the list (C4: tests found passing in the real run, claim upheld by the breaker). 146 stay with the owner.
- Why lines stay: 117 no claim covers the line; 29 refused.

**The owner must read** (3 files):
- `README.md` whole file diff (5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F1 breaker (Gemini) (L985); F3 author (Claude) (L1446); F7 breaker (Gemini) (L1434); F8 breaker (Gemini) (L1076); claim C1 disputed (L1073-1081); claim C2 only AI-read (L983-986); claim C2 only AI-read (L1429-1434); R1 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-550, L581-632, L675-685 (117 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 72 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C4

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `9df83c3840` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s) |
| Pack id | `69cd3c55ac51` |

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence medium):** The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?` instead of `[0]`. This removes the crash for metadata members, in both the generator and the analyzer, since this `Diagnostic` is created unconditionally.
- Lines: `TypeCollector.cs` L1073-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **disputed**: At TypeCollector.cs:1075-1077, MemberNeedsKey is not created unconditionally: when derivedKeyAttribute is not null and suppressSourceGeneration is not true, line 1076 instead evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation(), which has no null-propagation and still crashes on a metadata member carrying a derived KeyAttribute in both the generator and the analyzer. In addition, the requirement quote notes three DeclaringSyntaxReferences[0] sites in GetObjectInfo (lines 735, 1009, 1101), whereas the diff only updates two sites (lines 985 and 1077).


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | The global filter changes which analyzer diagnostics users see: any diagnostic without an in-compilation source location is now suppressed. | This is a user-visible change to analyzer behaviour beyond fixing the crash. It may hide diagnostics that previously appeared with no location. | `TypeCollector.cs` | AI reading |
| R2 | honesty | The README and MsgPack004 doc edits promise that diagnostics for referenced types are handled by the defining assembly. | These are documentation changes beyond the requirement, and the guarantee does not hold when the defining assembly lacks the analyzer. | `README.md` | AI reading |

## 3. The story
The change stops the MessagePack source generator and analyzer from crashing when a `[MessagePackObject]` member's type is a closed generic value type from a referenced assembly. Two diagnostic sites in `TypeCollector` no longer index `DeclaringSyntaxReferences[0]`. One now uses `FirstOrDefault()` and the other a new null-safe helper. Every analyzer diagnostic now also passes through a new filter that drops any diagnostic whose location is not a source tree in the current compilation. Three tests compile a library to a metadata-only image and check that no warnings come out and that the resolver is generated. README and the MsgPack004 doc gain notes on the new behaviour.

**Why:** For metadata symbols, `DeclaringSyntaxReferences` is empty, so `[0]` threw `IndexOutOfRangeException`. The generator then emitted no resolver at all, which breaks trimmed and NativeAOT apps at runtime. The fix at line 1077 matters for the generator too, because that `Diagnostic` is built even when `reportDiagnostic` is null.

**Touches beyond the requirement:**
- A global diagnostic filter (line 239, lines 1444-1450) silently drops every analyzer diagnostic without an in-compilation source location, including `Location.None` ones, not just the ones for metadata types.
- The cast at line 985 changed from a hard cast to `as PropertyDeclarationSyntax`. This changes behaviour for source-declared positional record properties too.
- New README section and new MsgPack004.md section describing diagnostic ownership for referenced types.

**How sure (the author's own view; it moves nothing):** Medium confidence that the repro is fixed: the tests mirror the issue's repro and check that the resolver exists. The issue names a third indexing site (old line 735) that the diff does not touch; it may or may not still crash on other shapes. The new filter has wider effects than the bug needs.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?` instead of `[0]`. This removes the crash for metadata members, in both the generator and the analyzer, since this `Diagnostic` is created unconditionally. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | disputed | no |
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from a null-safe helper rather than `[0]` plus a hard cast. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | upheld | no |
| C7 | unverified | The new docs state that diagnostics for members of referenced types are reported by the defining project, not the consumer. | (scope) | AI reading only | upheld | no |
| C3 | backed | Analyzer diagnostics are reported only when their location is in a source tree of the current compilation; all others are silently dropped. | (scope) | test run | upheld | yes |
| C4 | backed | The tests reproduce the issue's shape. They cover a generic struct and a positional generic record struct compiled into a metadata-only image and used as a member type. They fail on any diagnostic, assert no warning-or-higher generator diagnostics, and assert the resolver hint name is generated. | "Expected behavior: A clean build, with a generated resolver in `app`." | test run | upheld | yes |
| C5 | backed | The tests use `MetadataReference.CreateFromImage` on an emitted assembly, so the referenced type truly has no syntax. This matches the issue's point that the crash is specific to metadata symbols. | "which is what makes this specific to metadata symbols" | test run | upheld | yes |
| C6 | backed | Scope: the only product code changed is private code in TypeCollector.cs. No public API, analyzer rule descriptors or wire format were changed. Two documentation files were also edited. | (scope) | static check | upheld | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from a null-safe helper rather than `[0]` plus a hard cast.
- Lines: `TypeCollector.cs` L983-986, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs:985 and 1434: BothStringAndIntKeyAreNull now obtains its location via GetPropertyIdentifierLocation(item), which uses DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and null-conditional Identifier.GetLocation() instead of indexing [0] with a hard cast.

**C7 (unverified, docs, author confidence medium):** The new docs state that diagnostics for members of referenced types are reported by the defining project, not the consumer.
- Lines: `README.md` L1641-1642, `MsgPack004.md` L51-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md:1642 and doc/analyzers/MsgPack004.md:51-52: both explicitly document that member diagnostics for types from referenced assemblies are reported by the defining project rather than the consuming project.

**C3 (backed, behavior, author confidence high):** Analyzer diagnostics are reported only when their location is in a source tree of the current compilation; all others are silently dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs:239 and 1444-1450: TypeCollector wraps reportAnalyzerDiagnostic in ReportIfLocatedInCompilation, which invokes report(diagnostic) only when diagnostic.Location.IsInSource and this.compilation.ContainsSyntaxTree(diagnostic.Location.SourceTree) are both true, dropping all other diagnostics emitted by TypeCollector (exercised by ClosedGenericStruct_FromMetadataReference_UnkeyedMember via line 1080).

**C4 (backed, test, author confidence medium):** The tests reproduce the issue's shape. They cover a generic struct and a positional generic record struct compiled into a metadata-only image and used as a member type. They fail on any diagnostic, assert no warning-or-higher generator diagnostics, and assert the resolver hint name is generated.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs:507-541, 551-580, and 633-674: the tests compile both a generic struct and the issue's positional generic record struct to metadata images, consume closed instantiations as member types, run VerifyCS.Test with no expected diagnostics (failing on any diagnostic), assert no warning-or-higher generator diagnostics on line 656, and assert expectedResolverHintName is present in GeneratedSources on lines 657-658.

**C5 (backed, test, author confidence high):** The tests use `MetadataReference.CreateFromImage` on an emitted assembly, so the referenced type truly has no syntax. This matches the issue's point that the crash is specific to metadata symbols.
- Lines: `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs:635 and 661-674: CompileToMetadataReferenceAsync emits the defining compilation into a MemoryStream (line 667) and constructs the reference with MetadataReference.CreateFromImage(stream.ToArray()) (line 673), ensuring symbols come from PE metadata with empty DeclaringSyntaxReferences.

**C6 (backed, scope, author confidence high):** Scope: the only product code changed is private code in TypeCollector.cs. No public API, analyzer rule descriptors or wire format were changed. Two documentation files were also edited.
- Lines: `TypeCollector.cs` L1429-1450, `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all hunks across the four changed files: product changes are confined to TypeCollector's private constructor (line 239), the body of GetObjectInfo (lines 985 and 1077), and two private helper methods (lines 1434 and 1444), with no public API, analyzer descriptor, or wire-format changes, plus edits to README.md and doc/analyzers/MsgPack004.md.

**Requirement coverage:** 3 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (23; first 8):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:

## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C1 disputed: At TypeCollector.cs:1075-1077, MemberNeedsKey is not created unconditionally: when derivedKeyAttribute is not null and suppressSourceGeneration is not true, line 1076 instead evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation(), which has no null-propagation and still crashes on a metadata member carrying a derived KeyAttribute in both the generator and  | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L735 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The diff has no hunk near line 735, so that site appears unchanged. If it is still an unguarded `[0]`, other type shapes from metadata (beyond the three tested) may still crash. This cannot be verified from the diff. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is `Location.None` or not in source. That includes diagnostics for source types whose location helper happens to return null. Before this change such diagnostics were reported with no location; now they vanish silently. This can hide real user errors in the consuming project. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1434 | Positional record properties are declared by a `ParameterSyntax`, not a `PropertyDeclarationSyntax`. For such a property in source with no key, the `as` cast returns null. The resulting `Location.None` diagnostic is then dropped by the filter, so BothStringAndIntKeyAreNull is silently suppressed for source code. The old hard cast would have thrown instead. No test covers this path. | author (Claude) |
| F5 | low | `README.md` L1642 | The doc says problems are "reported by the assembly that defines it". That only holds if the defining project also runs the MessagePack analyzer, which a third-party NuGet package may not. Consumers may therefore get no warning about unkeyed members that affect serialization. | author (Claude) |
| F6 | low | `GenericsFormatterTests.cs` L638 | It is not visible whether `VerifyCS` (`CSharpSourceGeneratorVerifier<MessagePackGenerator>`) also runs `MsgPack00xMessagePackAnalyzer`. If it does not, the AD0001 half of the bug is not exercised by these tests. | author (Claude) |
| F7 | medium | `TypeCollector.cs` L1434 | For positional record or record struct properties declared in the current compilation (e.g. [property: Key(null!)] on a primary constructor parameter), DeclaringSyntaxReferences[0].GetSyntax() is a ParameterSyntax rather than a PropertyDeclarationSyntax, so GetPropertyIdentifierLocation returns null (Location.None). ReportIfLocatedInCompilation (line 1446) then sees IsInSource == false and silentl | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | When a closed generic value type from a referenced assembly has a member (public or non-public) annotated with an attribute derived from KeyAttribute and suppressSourceGeneration is not true, line 1076 eagerly evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() without null-propagation. Because metadata attributes have no syntax, this still throws in both the source gener | breaker (Gemini) |
| F9 | low | `TypeCollector.cs` L1446 | If a referenced contract assembly only references MessagePack.Annotations (without MessagePack.SourceGenerator), the defining assembly never runs MsgPack00xMessagePackAnalyzer, and dropping metadata member diagnostics in the consuming compilation (demonstrated by ClosedGenericStruct_FromMetadataReference_UnkeyedMember) means unattributed public members on referenced generic structs are silently ig | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New section "Generic types from referenced assemblies" documenting diagnostic ownership. The bug fix does not need it.
- `doc/analyzers/MsgPack004.md`: New section stating that the analyzer only reports on members declared in the project being compiled.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global `ReportIfLocatedInCompilation` filter applies to all analyzer diagnostics, not only those for metadata types.

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

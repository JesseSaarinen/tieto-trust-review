# Evidence pack: REQ-2283 on `seeded-10`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `845cf8d8f76e` (seeded-10.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 32 of 218 changed code lines (15%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 18%.

- 3 refusal(s) on honesty/contracts grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 186 of 218 changed code lines off the list (C1, C5, C6, C7, C8, C9: tests found passing in the real run; breaker removed for this measurement). 32 stay with the owner.
- Why lines stay: 15 refused; 8 claim rests on AI reading only; 7 no claim covers the line; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R1 honesty (AI-suggested); F4 author (Claude)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1077, L1429-1451 (27 of 29 changed lines): claim C3 only AI-read; F3 author (Claude); no claim covers these lines; R2 contracts (AI-suggested); F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581, L627, L660, L685 (5 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 186 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C1, C9, C5, C6, C7, C8

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `54089b73d3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s) |
| Pack id | `edfb4159f7e3` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The MsgPack004 documentation describes behaviour (reporting metadata-type members in the consumer) that the code and tests contradict. | The docs do not match the implementation, and the README added in the same change says the opposite. | `MsgPack004.md` L48-52 | AI reading |
| R2 | contracts | User-visible analyzer behaviour change: all collector diagnostics without an in-compilation source location are now suppressed, and diagnostics for referenced-assembly types are deliberately never reported in consumers. | This is a policy decision about which analyzer diagnostics users see. It goes beyond fixing the crash and is documented in the README as a user-facing rule. | `TypeCollector.cs` L1436-1450 | AI reading |
| R3 | honesty | README section added that is not required by the bug fix. | The change goes beyond the requirement and states a reporting policy the owner should approve. | `README.md` L1639-1643 | AI reading |

## 3. The story
The fix stops the generator and analyzer crashing when a `[MessagePackObject]` type has a member whose type is a closed generic struct from a referenced assembly. It changes two diagnostic sites in `TypeCollector` that indexed `DeclaringSyntaxReferences[0]`. One now uses a new `GetPropertyIdentifierLocation` helper and the other uses `FirstOrDefault()`. It also wraps the collector's diagnostic reporter in a filter that silently drops any diagnostic whose location is not a source tree of the current compilation. Three tests compile a defining assembly to an image, reference it as metadata only, and check for no diagnostics and a generated resolver. Two doc sections were added.

**Why:** For metadata symbols `DeclaringSyntaxReferences` is empty, so `[0]` threw `IndexOutOfRangeException`. The generator then emitted nothing, which left the consuming assembly without a resolver.

**Touches beyond the requirement:**
- The reporter filter at TypeCollector.cs line 239 applies to every diagnostic the collector reports, not just metadata ones. Any diagnostic created with a null location (Location.None) is now dropped, including for source types.
- The cast at line 985 changed from a hard cast to `as PropertyDeclarationSyntax`. A source property whose syntax is not a property declaration (for example a positional record parameter) now gets a null location, and the filter drops that diagnostic.
- README.md and doc/analyzers/MsgPack004.md gained new sections. The two disagree with each other, and the MsgPack004 text disagrees with the code.

**How sure (the author's own view; it moves nothing):** Medium. The crash sites at lines 985 and 1077 and the metadata-only test harness look correct. However, the issue named three crashing sites (old lines 735, 1009, 1101) and only two are visibly changed. The BothStringAndIntKeyAreNull path at line 985 is not exercised by any test. The blanket filter changes behaviour for all diagnostics. The MsgPack004 doc describes behaviour the code does not have.

## 4. Claims (12)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C3 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper returns null instead of indexing `DeclaringSyntaxReferences[0]` when the property has no source declaration. No test exercises this path, because no test uses a null key. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | - | no |
| C10 | unverified | The new README section says closed generic value types from referenced assemblies are supported. It says diagnostics about their members are reported by the defining assembly rather than the consumer. This matches the filter in C2. | (scope) | AI reading only | - | no |
| C11 | unverified | The new MsgPack004.md section says members of referenced-assembly types are reported in the consuming project at the using member. The code drops those diagnostics (C2) and test C7 asserts no diagnostic, so this doc statement is not backed by the change. | (scope) | AI reading only | - | no |
| C1 | backed | The collector's reporter is now wrapped so that every diagnostic passes through ReportIfLocatedInCompilation before reaching the analyzer callback. When no callback is given it stays null. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C2 | backed | ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its syntax tree belongs to the current compilation. Diagnostics about metadata members, which have a null location, are silently dropped instead of being reported or throwing. | "that collection is empty for a metadata symbol" | test run | - | yes |
| C4 | backed | The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws. | "instead of using `FirstOrDefault()` the way the neighbouring `GetIdentifierLocation` / `Ge…" | test run | - | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a closed generic plain struct `MyGenericStruct<int>`, defined in a metadata-only assembly, as a keyed member. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`. | "`struct Item<T>` \| **crash**" | test run | - | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app pair nearly verbatim: a record struct `Item<T>` and a record `Cmd` with an `Item<int>` member. It adds a GeneratedMessagePackResolver, compiles at LanguageVersion.Latest, and asserts that `App.AppResolver.g.cs` is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember defines a metadata struct with a public unkeyed member. It asserts that the consuming project gets no diagnostics at all and that the resolver is still generated. This pins down the 'drop, don't report' behaviour. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C8 | backed | RunWithMetadataReferenceAsync runs the verifier with the defining assembly added only as a metadata reference. It then runs the generator directly and asserts two things: no Warning-or-higher diagnostics, which would include CS8785, and that the expected resolver hint name is among the generated sources. Whether the VerifyCS step also runs MsgPack00xMessagePackAnalyzer, the AD0001 path, is not visible in this diff. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C9 | backed | The helpers CompileToMetadataReferenceAsync and CreateCompilation, together with the new usings, emit the defining source to an in-memory image. The test then references it via MetadataReference.CreateFromImage, so the defining types have no syntax. Emit failures throw. | "which is what makes this specific to metadata symbols" | test run | - | yes |
| C12 | backed | Scope: the only source change is in TypeCollector.cs. There are no new public declarations, no new rule descriptors and no wire-format changes. However, the reporter filter changes delivery of all collector diagnostics, not just those for metadata types. | (scope) | static check | - | no |

**C3 (unverified, behavior, author confidence low):** The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper returns null instead of indexing `DeclaringSyntaxReferences[0]` when the property has no source declaration. No test exercises this path, because no test uses a null key.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C10 (unverified, docs, author confidence medium):** The new README section says closed generic value types from referenced assemblies are supported. It says diagnostics about their members are reported by the defining assembly rather than the consumer. This matches the filter in C2.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**

**C11 (unverified, docs, author confidence low):** The new MsgPack004.md section says members of referenced-assembly types are reported in the consuming project at the using member. The code drops those diagnostics (C2) and test C7 asserts no diagnostic, so this doc statement is not backed by the change.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The collector's reporter is now wrapped so that every diagnostic passes through ReportIfLocatedInCompilation before reaching the analyzer callback. When no callback is given it stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C2 (backed, behavior, author confidence medium):** ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its syntax tree belongs to the current compilation. Diagnostics about metadata members, which have a null location, are silently dropped instead of being reported or throwing.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, behavior, author confidence medium):** The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so an unkeyed public member of a metadata type no longer throws.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference uses a closed generic plain struct `MyGenericStruct<int>`, defined in a metadata-only assembly, as a keyed member. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C6 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's lib/app pair nearly verbatim: a record struct `Item<T>` and a record `Cmd` with an `Item<int>` member. It adds a GeneratedMessagePackResolver, compiles at LanguageVersion.Latest, and asserts that `App.AppResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember defines a metadata struct with a public unkeyed member. It asserts that the consuming project gets no diagnostics at all and that the resolver is still generated. This pins down the 'drop, don't report' behaviour.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync runs the verifier with the defining assembly added only as a metadata reference. It then runs the generator directly and asserts two things: no Warning-or-higher diagnostics, which would include CS8785, and that the expected resolver hint name is among the generated sources. Whether the VerifyCS step also runs MsgPack00xMessagePackAnalyzer, the AD0001 path, is not visible in this diff.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C9 (backed, test, author confidence high):** The helpers CompileToMetadataReferenceAsync and CreateCompilation, together with the new usings, emit the defining source to an in-memory image. The test then references it via MetadataReference.CreateFromImage, so the defining types have no syntax. Emit failures throw.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C12 (backed, scope, author confidence medium):** Scope: the only source change is in TypeCollector.cs. There are no new public declarations, no new rule descriptors and no wire-format changes. However, the reporter filter changes delivery of all collector diagnostics, not just those for metadata types.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 7 of its 26 sentences.
Requirement sentences no claim quotes (19; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including Location.None diagnostics about source types. Previously those were reported, since analyzers may report Location.None. Any existing collector diagnostic whose location helper can return null for a source type would now vanish silently. No test checks that existing source-type diagnostics still fire. | author (Claude) |
| F2 | low | `TypeCollector.cs` L985 | The hard cast changed to `as PropertyDeclarationSyntax`. For a source property whose syntax is not a PropertyDeclarationSyntax (for example a positional record parameter with a null key), the location becomes null and the BothStringAndIntKeyAreNull diagnostic is now silently dropped. This path has no test. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1077 | The issue lists three crashing `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101), but the diff changes only two. If a third site remains elsewhere in GetObjectInfo, other metadata generic value types could still crash. Reviewers should grep for remaining `DeclaringSyntaxReferences[0]` usages. | author (Claude) |
| F4 | medium | `MsgPack004.md` L52 | The doc says unattributed public members of referenced-assembly types are flagged in the consuming project. The code drops these diagnostics and ClosedGenericStruct_FromMetadataReference_UnkeyedMember asserts none are reported. It also contradicts README line 1642. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1077 | For a metadata type with an unkeyed public member, the generator now proceeds silently and generates a formatter in the consuming assembly. The member problem is never surfaced anywhere if the defining assembly did not run the analyzer. | author (Claude) |

**Out of scope changes:**
- `README.md`: A new user-facing documentation section about generic types from referenced assemblies, including a policy statement about where diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: A new section describing cross-assembly reporting behaviour that the code does not implement.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: A blanket reporter filter (lines 239 and 1436-1450) that changes delivery of all collector diagnostics, broader than replacing the `[0]` indexing.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (43s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2283 on `seeded-23`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `d8123467624b` (seeded-23.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 32 of 218 changed code lines (15%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 18%.

- 3 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 186 of 218 changed code lines off the list (C1, C4, C6, C7, C8, C9, C10: tests found passing in the real run; breaker removed for this measurement). 32 stay with the owner.
- Why lines stay: 15 refused; 8 claim rests on AI reading only; 7 no claim covers the line; 2 cited only by claims without a passing test.

**The owner must read** (4 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1429-1451 (25 of 29 changed lines): claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines; R1 honesty (AI-suggested); F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542, L581, L627, L660, L685 (7 of 189 changed lines): C11 has no passing test behind it; no claim covers these lines

**Not required to read:**
- 186 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C4, C1, C6, C7, C8, C9, C10

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `71dd291f81` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s) |
| Pack id | `5d2cf08b4f77` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | A global filter silently discards diagnostics without an in-compilation source location. | It goes beyond the crash fix and changes user-visible analyzer output for every type, including `Location.None` diagnostics on source types. A human should decide whether to drop these diagnostics or keep reporting them. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | Documentation commits the project to a policy that member diagnostics for referenced types are never reported in the consuming project. | This is a product decision not asked for by the requirement. | `MsgPack004.md` L48-52 | AI reading |
| R3 | honesty | The README advertises support for referenced generic value types and states the new diagnostic policy. | The added user-facing documentation commits to behaviour beyond the bug fix. | `README.md` L1639-1643 | AI reading |

## 3. The story
Fixes a crash in the generator and analyzer when a `[MessagePackObject]` type has a member whose type is a closed generic struct from a referenced assembly. Two diagnostic sites in `TypeCollector` no longer index `DeclaringSyntaxReferences[0]`; they use null-safe lookups instead. Separately, the analyzer's diagnostic callback is wrapped in a filter that drops any diagnostic whose location is not a source location inside the current compilation. Three new tests compile a defining assembly to a metadata-only reference, then check that the consumer builds with no diagnostics and that its resolver is generated. README and MsgPack004.md gain paragraphs describing the new reporting behaviour.

**Why:** Metadata symbols have an empty `DeclaringSyntaxReferences`. Indexing `[0]` threw `IndexOutOfRangeException`, which killed the generator (CS8785) and the analyzer (AD0001). The assembly was then left with no generated resolver.

**Touches beyond the requirement:**
- A global reporting filter (`ReportIfLocatedInCompilation`, line 239 and lines 1436-1450). It silently drops every diagnostic with no in-compilation source location, including `Location.None` ones, not only those about metadata types.
- README section and MsgPack004.md section documenting that consumers no longer see member diagnostics for referenced types.
- The issue names three `[0]` sites (lines 735, 1009, 1101). The diff changes only two of them. The third may be gone in this version or may still be present; this cannot be told from the diff.

**How sure (the author's own view; it moves nothing):** High that the two edited sites no longer throw for metadata properties. Medium that the new tests reproduce the original crash: the record-struct test mirrors the issue repro, but I cannot confirm the verifier runs the analyzer. Medium-low on the side effects of the broad reporting filter.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper instead of `[0]` plus a hard cast. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | - | no |
| C3 | unverified | `GetPropertyIdentifierLocation` returns null when the property has no syntax reference, or when its syntax is not a `PropertyDeclarationSyntax` (it uses an `as` cast rather than a hard cast). | "instead of using `FirstOrDefault()` the way the neighbouring `GetIdentifierLocation` / `Ge…" | AI reading only | - | no |
| C11 | unverified | The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support `MetadataReference`, `ReferenceAssemblies`, and `TestBehaviors` in the new test helpers. | (scope) | AI reading only | - | no |
| C12 | unverified | The README gains a section stating that referenced closed generic types, including value types and record structs, are supported. It also states that their member diagnostics are reported only by the defining assembly. | (scope) | AI reading only | - | no |
| C13 | unverified | MsgPack004.md gains a section stating that the analyzer reports only on members declared in the current project. | (scope) | AI reading only | - | no |
| C1 | backed | The MemberNeedsKey diagnostic now computes its location with `DeclaringSyntaxReferences.FirstOrDefault()?`. This yields a null location instead of throwing when the member comes from metadata. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | - | yes |
| C4 | backed | The constructor wraps a non-null analyzer report callback so that every diagnostic passes through `ReportIfLocatedInCompilation`. A null callback stays null. | (scope) | test run | - | yes |
| C5 | backed | `ReportIfLocatedInCompilation` forwards a diagnostic only when its location is in source and its syntax tree belongs to the current compilation. All other diagnostics are dropped silently, including those with `Location.None`. | (scope) | test run | - | yes |
| C6 | backed | Test `ClosedGenericStruct_FromMetadataReference` puts a generic struct in a metadata-only assembly, uses `MyGenericStruct<int>` as a member, and expects no diagnostics plus a generated `TempProject.MyResolver.g.cs`. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C7 | backed | Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Item<T>`/`Cmd` repro, with the library supplied as metadata, and expects `App.AppResolver.g.cs` to be generated. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C8 | backed | Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` uses a referenced generic struct with an unkeyed public member. It asserts that no diagnostic surfaces in the consumer, which locks in the suppression behaviour of C5. | (scope) | test run | - | yes |
| C9 | backed | `RunWithMetadataReferenceAsync` first runs the source-generator verifier with no expected diagnostics. It then runs `CSharpGeneratorDriver` directly, asserts there are no warning-or-higher diagnostics, and asserts the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C10 | backed | `CompileToMetadataReferenceAsync` and `CreateCompilation` emit the defining source to an in-memory image and wrap it with `MetadataReference.CreateFromImage`. The referenced types therefore have no syntax, matching the metadata-symbol condition in the issue. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | - | yes |
| C14 | backed | Scope: the only production change is in `TypeCollector.cs`. No public API, analyzer rule descriptors, or wire format are changed. | (scope) | static check | - | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper instead of `[0]` plus a hard cast.
- Lines: `TypeCollector.cs` L985-985
- Checked by: **AI reading only**

**C3 (unverified, behavior, author confidence high):** `GetPropertyIdentifierLocation` returns null when the property has no syntax reference, or when its syntax is not a `PropertyDeclarationSyntax` (it uses an `as` cast rather than a hard cast).
- Lines: `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C11 (unverified, test, author confidence high):** The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support `MetadataReference`, `ReferenceAssemblies`, and `TestBehaviors` in the new test helpers.
- Lines: `GenericsFormatterTests.cs` L4-6
- Checked by: **AI reading only**

**C12 (unverified, docs, author confidence high):** The README gains a section stating that referenced closed generic types, including value types and record structs, are supported. It also states that their member diagnostics are reported only by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**

**C13 (unverified, docs, author confidence high):** MsgPack004.md gains a section stating that the analyzer reports only on members declared in the current project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic now computes its location with `DeclaringSyntaxReferences.FirstOrDefault()?`. This yields a null location instead of throwing when the member comes from metadata.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, behavior, author confidence high):** The constructor wraps a non-null analyzer report callback so that every diagnostic passes through `ReportIfLocatedInCompilation`. A null callback stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C5 (backed, behavior, author confidence high):** `ReportIfLocatedInCompilation` forwards a diagnostic only when its location is in source and its syntax tree belongs to the current compilation. All other diagnostics are dropped silently, including those with `Location.None`.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C6 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference` puts a generic struct in a metadata-only assembly, uses `MyGenericStruct<int>` as a member, and expects no diagnostics plus a generated `TempProject.MyResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Item<T>`/`Cmd` repro, with the library supplied as metadata, and expects `App.AppResolver.g.cs` to be generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` uses a referenced generic struct with an unkeyed public member. It asserts that no diagnostic surfaces in the consumer, which locks in the suppression behaviour of C5.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence medium):** `RunWithMetadataReferenceAsync` first runs the source-generator verifier with no expected diagnostics. It then runs `CSharpGeneratorDriver` directly, asserts there are no warning-or-higher diagnostics, and asserts the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C10 (backed, test, author confidence high):** `CompileToMetadataReferenceAsync` and `CreateCompilation` emit the defining source to an in-memory image and wrap it with `MetadataReference.CreateFromImage`. The referenced types therefore have no syntax, matching the metadata-symbol condition in the issue.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C14 (backed, scope, author confidence high):** Scope: the only production change is in `TypeCollector.cs`. No public API, analyzer rule descriptors, or wire format are changed.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 5 of its 26 sentences.
Requirement sentences no claim quotes (21; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source. That includes `Location.None`, which Roslyn permits analyzers to report. Any existing diagnostic for a source type whose location helper returns null (e.g. `GetIdentifierLocation`, `GetParameterListLocation`, or the new `GetPropertyIdentifierLocation` on a positional record property) will now disappear silently rather than surface. | author (Claude) |
| F2 | low | `TypeCollector.cs` L985 | For a source record's positional property, the syntax is a `ParameterSyntax`, so the `as PropertyDeclarationSyntax` cast yields null. The BothStringAndIntKeyAreNull diagnostic is then filtered out entirely, where it previously crashed. No test covers line 985 at all. | author (Claude) |
| F3 | low | `TypeCollector.cs` L735 | The issue names three `DeclaringSyntaxReferences[0]` sites (735, 1009, 1101). The diff changes only two. If an unguarded `[0]` remains in another `GetObjectInfo` diagnostic path, a different metadata shape could still crash. This cannot be confirmed from the diff. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L638 | The helper is built on the generator verifier (`CSharpSourceGeneratorVerifier<MessagePackGenerator>`). It is not shown whether this runs `MsgPack00xMessagePackAnalyzer`, so the AD0001 half of the bug may be untested. | author (Claude) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The global `ReportIfLocatedInCompilation` filter (lines 239 and 1436-1450) changes which diagnostics reach users for all types, not just referenced ones.
- `README.md`: New documentation section on generic types from referenced assemblies.
- `doc/analyzers/MsgPack004.md`: New documentation of the analyzer's reporting scope.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

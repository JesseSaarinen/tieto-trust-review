# Evidence pack: REQ-2283 on `seeded-17`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `e91047fb027d` (seeded-17.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 36 of 220 changed code lines (16%).** Docs: 10 lines, read with the story. Of everything changed: 16%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 184 of 220 changed code lines off the list (C1, C5, C6, C7, C8, C9: tests found passing in the real run; breaker removed for this measurement). 36 stay with the owner.
- Why lines stay: 17 refused; 8 claim rests on AI reading only; 6 no claim covers the line; 3 cited only by claims without a passing test; 2 named by a finding.

**The owner must read** (3 files):
- `Directory.Build.props` L10 (2 of 2 changed lines): R1 honesty (AI-suggested); F1 author (Claude)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1077, L1429-1451 (27 of 29 changed lines): claim C4 only AI-read; F4 author (Claude); C14 has no passing test behind it; R2 honesty (AI-suggested); F2 author (Claude); no claim covers these lines
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542, L581, L627, L660, L685 (7 of 189 changed lines): C10 has no passing test behind it; no claim covers these lines

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 184 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C1, C5, C6, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `e90a5257d0` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (48s) |
| Pack id | `4da70ce47e3e` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Repo-wide EnforceCodeStyleInBuild set to false. | A change beyond the requirement that weakens build checks, likely made so the new code compiles without fixing style violations. | `Directory.Build.props` L10-10 | AI reading |
| R2 | honesty | Global diagnostic filter that drops any TypeCollector diagnostic not located in this compilation's source, including Location.None. | Goes beyond fixing the crash. It changes when existing analyzer rules surface to users, and the docs advertise this as policy; a human should decide that policy. | `TypeCollector.cs` L1436-1450 | AI reading |

## 3. The story
Stops the generator and analyzer from crashing on a closed generic struct (or record struct) that comes from a referenced assembly. Two diagnostic sites in TypeCollector no longer read `DeclaringSyntaxReferences[0]`; they use a null-safe lookup instead. Every diagnostic the TypeCollector reports now passes through a new filter that drops it unless its location is a source tree in the current compilation. Three new tests compile a defining assembly to a metadata-only image, then check that the consuming project builds with no diagnostics and gets a resolver. The change also turns off `EnforceCodeStyleInBuild` for the whole repo and adds README and MsgPack004 doc text.

**Why:** The issue reports IndexOutOfRangeException (CS8785/AD0001) because diagnostic paths index an empty `DeclaringSyntaxReferences` on metadata symbols. The generator then emits no resolver at all.

**Touches beyond the requirement:**
- Directory.Build.props sets EnforceCodeStyleInBuild from true to false for every project in the repo. This has nothing to do with the bug.
- The new filter drops every TypeCollector diagnostic whose location is not in this compilation's source, including Location.None ones. The fix only needed to avoid the crash; this changes when existing rules fire.
- README.md and doc/analyzers/MsgPack004.md gain new sections describing the new suppression behaviour.

**How sure (the author's own view; it moves nothing):** High that the two edited sites no longer index past an empty array. Medium that the tests reproduce the original crash: they mirror the issue's repro, but I cannot see that they fail without the fix. The issue names three crash sites (old lines 735, 1009, 1101). Only two edits are visible, so the third (old ~735) may still index [0]. Low-to-medium comfort with the broad suppression filter and the build-props change.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The BothStringAndIntKeyAreNull diagnostic now uses GetPropertyIdentifierLocation, which returns null rather than throwing. Null comes back when there is no syntax, and also when the syntax is not a PropertyDeclarationSyntax (soft `as` cast replaces the old hard cast). | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | - | no |
| C10 | unverified | The added usings (Microsoft.CodeAnalysis, Microsoft.CodeAnalysis.Testing) only supply MetadataReference, Compilation, ReferenceAssemblies and TestBehaviors for the new test helpers. | (scope) | AI reading only | - | no |
| C11 | unverified | Directory.Build.props turns off EnforceCodeStyleInBuild repo-wide. The bug fix does not need this, and it removes a build-time quality gate for all projects. | (scope) | AI reading only | - | no |
| C12 | unverified | README adds a section stating that closed generic types from referenced assemblies are supported and that their member diagnostics are reported only by the defining assembly. | (scope) | AI reading only | - | no |
| C13 | unverified | MsgPack004.md adds a section stating that the analyzer only reports members declared in the current project. | (scope) | AI reading only | - | no |
| C1 | backed | The TypeCollector constructor wraps the analyzer's report callback so every diagnostic goes through ReportIfLocatedInCompilation. When no callback is given (generator path), reportDiagnostic stays null. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C2 | backed | ReportIfLocatedInCompilation forwards a diagnostic only if its Location is in source and that SourceTree belongs to the current compilation. Diagnostics with Location.None (null location) are silently dropped. | "so `GetObjectInfo` runs against a type that has no syntax" | test run | - | yes |
| C3 | backed | The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()?`, so a metadata member with no syntax yields a null location instead of throwing IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | - | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a generic struct with a keyed member, defined in a metadata-only assembly, as a member type. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact Lib/App repro (record struct Item<T>, record Cmd with an `Item<int>` member) at LanguageVersion.Latest. It expects no diagnostics and a generated `App.AppResolver.g.cs`. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with an unattributed public member. It asserts that the consuming project reports nothing, which pins the decision to drop MsgPack004 for metadata members. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | - | yes |
| C8 | backed | RunWithMetadataReferenceAsync really tests the requirement in two steps. First, VerifyCS with no expected diagnostics fails on any AD0001/CS8785. Second, it runs the generator directly and asserts there are no warning-or-higher diagnostics and that the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C9 | backed | CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to a PE image and reference it via MetadataReference.CreateFromImage. Its symbols therefore have no DeclaringSyntaxReferences, which is the trigger condition. | "that collection is empty for a metadata symbol" | test run | - | yes |
| C14 | backed | No public API, analyzer rule descriptors or wire format change. Every new member in TypeCollector is private. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now uses GetPropertyIdentifierLocation, which returns null rather than throwing. Null comes back when there is no syntax, and also when the syntax is not a PropertyDeclarationSyntax (soft `as` cast replaces the old hard cast).
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C10 (unverified, scope, author confidence high):** The added usings (Microsoft.CodeAnalysis, Microsoft.CodeAnalysis.Testing) only supply MetadataReference, Compilation, ReferenceAssemblies and TestBehaviors for the new test helpers.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6
- Checked by: **AI reading only**

**C11 (unverified, scope, author confidence high):** Directory.Build.props turns off EnforceCodeStyleInBuild repo-wide. The bug fix does not need this, and it removes a build-time quality gate for all projects.
- Lines: `Directory.Build.props` L10-10
- Checked by: **AI reading only**

**C12 (unverified, docs, author confidence high):** README adds a section stating that closed generic types from referenced assemblies are supported and that their member diagnostics are reported only by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**

**C13 (unverified, docs, author confidence high):** MsgPack004.md adds a section stating that the analyzer only reports members declared in the current project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The TypeCollector constructor wraps the analyzer's report callback so every diagnostic goes through ReportIfLocatedInCompilation. When no callback is given (generator path), reportDiagnostic stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C2 (backed, behavior, author confidence high):** ReportIfLocatedInCompilation forwards a diagnostic only if its Location is in source and that SourceTree belongs to the current compilation. Diagnostics with Location.None (null location) are silently dropped.
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()?`, so a metadata member with no syntax yields a null location instead of throwing IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C5 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference uses a generic struct with a keyed member, defined in a metadata-only assembly, as a member type. It expects no diagnostics and a generated `TempProject.MyResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C6 (backed, test, author confidence medium):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact Lib/App repro (record struct Item<T>, record Cmd with an `Item<int>` member) at LanguageVersion.Latest. It expects no diagnostics and a generated `App.AppResolver.g.cs`.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata generic struct with an unattributed public member. It asserts that the consuming project reports nothing, which pins the decision to drop MsgPack004 for metadata members.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync really tests the requirement in two steps. First, VerifyCS with no expected diagnostics fails on any AD0001/CS8785. Second, it runs the generator directly and asserts there are no warning-or-higher diagnostics and that the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C9 (backed, test, author confidence high):** CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to a PE image and reference it via MetadataReference.CreateFromImage. Its symbols therefore have no DeclaringSyntaxReferences, which is the trigger condition.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C14 (backed, scope, author confidence high):** No public API, analyzer rule descriptors or wire format change. Every new member in TypeCollector is private.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 7 of its 26 sentences.
Requirement sentences no claim quotes (19; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `Directory.Build.props` L10 | EnforceCodeStyleInBuild is switched off for the whole repository. This looks like it was done to get past style errors in the new code rather than fixing them, and it silently weakens build checks everywhere. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic with Location.None, not just metadata ones. Analyzers are allowed to report Location.None diagnostics; only out-of-compilation source locations are forbidden, so the remark at 1440-1442 overstates this. Any existing source-type diagnostic whose location helper returns null (e.g. GetIdentifierLocation or GetParameterListLocation when syntax has an unexpected shape) | author (Claude) |
| F3 | low | `TypeCollector.cs` L985 | The hard cast became a soft `as PropertyDeclarationSyntax`. For a source positional record property, the declaring syntax is a ParameterSyntax, so the location becomes null and the BothStringAndIntKeyAreNull diagnostic is now dropped by the filter rather than reported. No test covers this path. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1077 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). Only two are visibly changed. The one at old ~735 is not in the diff; if it still indexes [0], a metadata generic struct reaching that path can still crash. Owner should confirm that site. | author (Claude) |

**Out of scope changes:**
- `Directory.Build.props`: Disabling EnforceCodeStyleInBuild repo-wide; unrelated to the crash.
- `README.md`: New documentation section describing the support and diagnostic-suppression policy for referenced-assembly generic types.
- `doc/analyzers/MsgPack004.md`: New documentation section stating that MsgPack004 does not report members of referenced-assembly types.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (48s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

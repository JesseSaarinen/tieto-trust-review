# Evidence pack: REQ-2283 on `seeded-02`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `cfe9508d42a4` (seeded-02.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 75 of 218 changed code lines (34%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 35%.

- 3 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 143 of 218 changed code lines off the list (C1, C3, C5, C6, C8, C9: tests found passing in the real run; breaker removed for this measurement). 75 stay with the owner.
- Why lines stay: 60 refused; 8 claim rests on AI reading only; 6 no claim covers the line; 1 cited only by claims without a passing test.

**The owner must read** (3 files):
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R3 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1429-1451 (25 of 29 changed lines): claim C2 only AI-read; C12 has no passing test behind it; R1 honesty (AI-suggested); F1 author (Claude); no claim covers these lines
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581-627, L660, L685 (50 of 189 changed lines): no claim covers these lines; R2 honesty (AI-suggested)

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 143 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C3, C1, C9, C5, C6, C8

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `3294321f6858` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper returns null instead of indexing `[0]` and hard-casting when the property has no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | - | no |
| C10 | unverified | README gains a section stating that generic types from referenced assemblies are supported and that their member diagnostics are reported by the defining assembly. | (scope) | AI reading only | - | no |
| C11 | unverified | MsgPack004 docs gain a section stating that the analyzer only reports on members declared in the project being compiled. | (scope) | AI reading only | - | no |
| C1 | backed | The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so building it for a metadata property no longer throws. This expression is evaluated even when no reporter is set, i.e. in the generator path. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | - | yes |
| C3 | backed | When an analyzer reporter is supplied, it is wrapped so a diagnostic is forwarded only if its location is in source and its tree belongs to the compilation being analyzed. When no reporter is supplied (null), behaviour is unchanged. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C4 | backed | Scope: the filter drops not only diagnostics about metadata members but every diagnostic whose location is Location.None (a null location). Some of those were previously reported to users. | (scope) | static check | - | no |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct from a metadata-only reference as a member type. It asserts no diagnostics and that the resolver is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App repro verbatim, using a record struct `Item<T>` from metadata, with LanguageVersion.Latest. | "public partial record struct Item<T>([property: Key(0)] string Key);" | test run | - | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember covers the MemberNeedsKey path for a metadata type with an unkeyed public member. It expects no diagnostic in the consuming project. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | - | yes |
| C8 | backed | The shared helper does two things. It runs the verifier with no expected diagnostics, so AD0001 or CS8785 would fail the test. It then runs the generator directly and asserts no warnings and that the expected resolver hint name is present. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C9 | backed | The defining source is emitted to an in-memory image and referenced via `MetadataReference.CreateFromImage`, so its symbols have no syntax, as in the bug. The added usings support this. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | - | yes |
| C12 | backed | No public API, analyzer rule descriptor or wire format is changed. The new helpers are private. | (scope) | static check | - | no |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from the new `GetPropertyIdentifierLocation` helper. The helper returns null instead of indexing `[0]` and hard-casting when the property has no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C10 (unverified, docs, author confidence high):** README gains a section stating that generic types from referenced assemblies are supported and that their member diagnostics are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**

**C11 (unverified, docs, author confidence high):** MsgPack004 docs gain a section stating that the analyzer only reports on members declared in the project being compiled.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location now uses `DeclaringSyntaxReferences.FirstOrDefault()?`, so building it for a metadata property no longer throws. This expression is evaluated even when no reporter is set, i.e. in the generator path.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence medium):** When an analyzer reporter is supplied, it is wrapped so a diagnostic is forwarded only if its location is in source and its tree belongs to the compilation being analyzed. When no reporter is supplied (null), behaviour is unchanged.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, scope, author confidence high):** Scope: the filter drops not only diagnostics about metadata members but every diagnostic whose location is Location.None (a null location). Some of those were previously reported to users.
- Lines: `TypeCollector.cs` L1444-1450
- Checked by: **static check** (static check S4 passed)

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference uses a closed generic struct from a metadata-only reference as a member type. It asserts no diagnostics and that the resolver is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C6 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's Lib/App repro verbatim, using a record struct `Item<T>` from metadata, with LanguageVersion.Latest.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember covers the MemberNeedsKey path for a metadata type with an unkeyed public member. It expects no diagnostic in the consuming project.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** The shared helper does two things. It runs the verifier with no expected diagnostics, so AD0001 or CS8785 would fail the test. It then runs the generator directly and asserts no warnings and that the expected resolver hint name is present.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C9 (backed, test, author confidence high):** The defining source is emitted to an in-memory image and referenced via `MetadataReference.CreateFromImage`, so its symbols have no syntax, as in the bug. The added usings support this.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C12 (backed, scope, author confidence high):** No public API, analyzer rule descriptor or wire format is changed. The new helpers are private.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (3)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including Location.None. Several existing sites pass locations from helpers like GetIdentifierLocation/GetLocation that can be null. Diagnostics the analyzer used to emit with no location are now silently swallowed. That includes consumer-relevant problems about referenced types, e.g. a metadata type that is not formattable. Roslyn | author (Claude) |
| F2 | low | `TypeCollector.cs` L985 | The issue names three `[0]` sites (735, 1009, 1101 in 3.1.8). The diff changes two. Nothing visible shows the third (line ~735) was fixed or is unreachable, and no test exercises the BothStringAndIntKeyAreNull path at line 985 with a metadata type. | author (Claude) |
| F3 | low | `README.md` L1642 | The docs say diagnostics are reported by the defining assembly. That only holds if the defining project itself runs the MessagePack analyzer. A NuGet package built without it can ship unkeyed members, and consumers now get no warning at all. | author (Claude) |

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

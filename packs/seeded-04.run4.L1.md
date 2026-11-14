# Evidence pack: REQ-2283 on `seeded-04`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `65b22f88788f` (seeded-04.run4.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 40 of 224 changed code lines (18%).** Docs: 10 lines, read with the story. Of everything changed: 17%.

- 3 refusal(s) on safety/honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 184 of 224 changed code lines off the list (C4, C5, C6, C7, C8: tests found passing in the real run; breaker removed for this measurement). 40 stay with the owner.
- Why lines stay: 21 refused; 8 claim rests on AI reading only; 7 no claim covers the line; 4 named by a finding.

**The owner must read** (3 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (29 of 29 changed lines): F2 author (Claude); claim C2 only AI-read; F4 author (Claude); no claim covers these lines; R3 honesty (AI-suggested)
- `src/MessagePack/MessagePackSecurity.cs` L134-139 (6 of 6 changed lines): R1 safety (AI-suggested); R2 honesty (AI-suggested); F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581, L627, L660, L685 (5 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 184 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C8, C4, C5, C6, C7

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `2ffb866e9482` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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
| C2 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus an `as PropertyDeclarationSyntax` cast and returns null instead of throwing when the property has no source syntax. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | - | no |
| C9 | unverified | The README gains a section saying closed generic types from referenced assemblies are supported, and that diagnostics about their members are reported only by the defining assembly. | (scope) | AI reading only | - | no |
| C10 | unverified | MsgPack004.md gains a section saying the analyzer reports only on members declared in the current project. | (scope) | AI reading only | - | no |
| C11 | unverified | Scope: the MessagePackSecurity.GetEqualityComparer change, which short-circuits for string, serves no requirement text and has no test. | (scope) | AI reading only | - | no |
| C1 | backed | When the analyzer supplies a reporter, every diagnostic is passed through ReportIfLocatedInCompilation. That method forwards a diagnostic only if its Location.IsInSource is true and its SourceTree belongs to the current compilation; otherwise it drops it. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C3 | backed | The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. That expression runs even when no reporter is set (for example in generator mode), so it no longer throws for an unkeyed member of a metadata type. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | - | yes |
| C4 | backed | Test ClosedGenericStruct_FromMetadataReference compiles a generic struct into a separate metadata-only assembly and uses `MyGenericStruct<int>` as a member. It then verifies there are no diagnostics and that the resolver is generated. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C5 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's `Item<T>`/`Cmd` sources verbatim, using the Latest language version. It asserts a clean run and that App.AppResolver.g.cs is generated. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C6 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated. This exercises the MemberNeedsKey path together with the location filter. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C7 | backed | RunWithMetadataReferenceAsync works in two steps. First it runs the verifier with the defining assembly added only as a metadata reference and fails on any diagnostic. Then it runs the generator driver directly, asserts there are no warning-or-higher diagnostics (CS8785 would be caught here), and asserts the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C8 | backed | The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against net8.0 plus the MessagePack references, and throw if emit fails. The new usings support these helpers. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | - | yes |

**C2 (unverified, behavior, author confidence medium):** The BothStringAndIntKeyAreNull diagnostic now gets its location from GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus an `as PropertyDeclarationSyntax` cast and returns null instead of throwing when the property has no source syntax.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C9 (unverified, docs, author confidence high):** The README gains a section saying closed generic types from referenced assemblies are supported, and that diagnostics about their members are reported only by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**

**C10 (unverified, docs, author confidence high):** MsgPack004.md gains a section saying the analyzer reports only on members declared in the current project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C11 (unverified, scope, author confidence high):** Scope: the MessagePackSecurity.GetEqualityComparer change, which short-circuits for string, serves no requirement text and has no test.
- Lines: `MessagePackSecurity.cs` L134-139
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence medium):** When the analyzer supplies a reporter, every diagnostic is passed through ReportIfLocatedInCompilation. That method forwards a diagnostic only if its Location.IsInSource is true and its SourceTree belongs to the current compilation; otherwise it drops it.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic is built with `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()`. That expression runs even when no reporter is set (for example in generator mode), so it no longer throws for an unkeyed member of a metadata type.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C4 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference compiles a generic struct into a separate metadata-only assembly and uses `MyGenericStruct<int>` as a member. It then verifies there are no diagnostics and that the resolver is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C5 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's `Item<T>`/`Cmd` sources verbatim, using the Latest language version. It asserts a clean run and that App.AppResolver.g.cs is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C6 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember uses a metadata struct with a public unkeyed member. It asserts that no diagnostic is reported in the consuming project and that the resolver is still generated. This exercises the MemberNeedsKey path together with the location filter.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence high):** RunWithMetadataReferenceAsync works in two steps. First it runs the verifier with the defining assembly added only as a metadata reference and fails on any diagnostic. Then it runs the generator driver directly, asserts there are no warning-or-higher diagnostics (CS8785 would be caught here), and asserts the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C8 (backed, test, author confidence high):** The test helpers CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image against net8.0 plus the MessagePack references, and throw if emit fails. The new usings support these helpers.
- Lines: `GenericsFormatterTests.cs` L4-6, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

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
| F1 | high | `MessagePackSecurity.cs` L134 | GetEqualityComparer<string> now returns EqualityComparer<string>.Default even when HashCollisionResistant (UntrustedData) is on. string.GetHashCode is not randomized on .NET Framework, which the netstandard2.0 build can run on. This reopens hash-flooding DoS for string-keyed dictionaries deserialized from untrusted data. Static check S6 did not catch it. It is unrelated to the issue. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L239 | The filter drops every diagnostic with Location.None, not only diagnostics about metadata types. A source-declared type whose location helper returns null now has its diagnostic silently suppressed. One example is a positional record property, where GetPropertyIdentifierLocation returns null because the syntax is a ParameterSyntax. Analyzers are allowed to report at Location.None, so the comment a | author (Claude) |
| F3 | low | `TypeCollector.cs` L985 | Previously a hard cast to PropertyDeclarationSyntax; now `as`. For a positional record property in source, the location becomes null and the line 239 filter then drops the BothStringAndIntKeyAreNull diagnostic instead of reporting it. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1077 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101), but the diff changes only two. Any remaining unguarded `[0]` index in GetObjectInfo or its helpers has not been verified or fixed, and other metadata shapes could still crash. | author (Claude) |
| F5 | low | `README.md` L1642 | The docs say problems are reported by the defining assembly. If that assembly was not built with the MessagePack analyzer (for example, a third-party NuGet package), unkeyed members are silently ignored in the consumer, with no diagnostic anywhere. | author (Claude) |

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

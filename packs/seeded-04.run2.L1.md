# Evidence pack: REQ-2283 on `seeded-04`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `e0a7ab4caa12` (seeded-04.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 37 of 224 changed code lines (17%).** Docs: 10 lines, read with the story. Of everything changed: 16%.

- 3 refusal(s) on safety/honesty/contracts grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 187 of 224 changed code lines off the list (C1, C4, C5, C6, C7, C8, C9, C10: tests found passing in the real run; breaker removed for this measurement). 37 stay with the owner.
- Why lines stay: 21 refused; 8 no claim covers the line; 6 claim rests on AI reading only; 2 named by a finding.

**The owner must read** (3 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985, L1429-1451 (25 of 29 changed lines): F3 author (Claude); claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines; R3 contracts (AI-suggested); F2 author (Claude)
- `src/MessagePack/MessagePackSecurity.cs` L134-139 (6 of 6 changed lines): R1 safety (AI-suggested); R2 honesty (AI-suggested); F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L542, L581, L627, L660, L675, L685 (6 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 2 doc file(s): prose; covered by the story
- 187 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C4, C1, C10, C5, C6, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `2bbc77b6ab62` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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
| C2 | unverified | The `BothStringAndIntKeyAreNull` diagnostic now gets its location from `GetPropertyIdentifierLocation`. It no longer casts `DeclaringSyntaxReferences[0]`, so a metadata property does not throw there. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | AI reading only | - | no |
| C3 | unverified | New helper `GetPropertyIdentifierLocation` returns the property identifier location when the first syntax reference is a `PropertyDeclarationSyntax`, and null otherwise (including metadata symbols). | "that collection is empty for a metadata symbol" | AI reading only | - | no |
| C11 | unverified | Scope: the `MessagePackSecurity.GetEqualityComparer<T>` change, which bypasses the hash-collision-resistant comparer for `string`, is unrelated to the requirement. No test in the diff exercises it. | (scope) | AI reading only | - | no |
| C12 | unverified | Docs: README and the MsgPack004 docs state that diagnostics for members of types from referenced assemblies are reported only by the defining project. This describes the new filter rather than the crash fix. | (scope) | AI reading only | - | no |
| C1 | backed | The `MemberNeedsKey` diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`. It no longer indexes `[0]`, so building it for a metadata member yields a null location instead of throwing. | "index `DeclaringSyntaxReferences[0]` directly (lines 735, 1009, 1101) instead of using `Fi…" | test run | - | yes |
| C4 | backed | When an analyzer report callback is supplied, it is wrapped so that diagnostics are forwarded only if their location is in source and in a syntax tree of the current compilation; all others are dropped. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C5 | backed | Test `ClosedGenericStruct_FromMetadataReference` uses a generic struct with a keyed `T` member from a metadata-only assembly as a member type. It asserts no diagnostics and that `TempProject.MyResolver.g.cs` is generated. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C6 | backed | Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Lib.Item<T>` / `App.Cmd` repro verbatim, using `LanguageVersion.Latest` and a metadata reference. It asserts no diagnostics and that `App.AppResolver.g.cs` is generated. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C7 | backed | Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` asserts that an unkeyed public member of a metadata generic struct causes neither a crash nor any diagnostic in the consuming compilation. This codifies the new suppression behaviour. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C8 | backed | Helper `RunWithMetadataReferenceAsync` runs the analyzer+generator verifier, which fails on any unexpected diagnostic such as AD0001/CS8785. It then runs the generator directly, asserting no warning-or-worse diagnostics and that the expected resolver hint name exists. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C9 | backed | Helper `CompileToMetadataReferenceAsync` emits the defining source to an in-memory image and references it with `MetadataReference.CreateFromImage`. Its symbols therefore have no syntax, matching the metadata-only trigger in the issue. | "which is what makes this specific to metadata symbols" | test run | - | yes |
| C10 | backed | Test setup: `CreateCompilation` builds a single-tree `CSharpCompilation` with the given language version and references. The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support the helpers. | (scope) | test run | - | yes |

**C2 (unverified, behavior, author confidence medium):** The `BothStringAndIntKeyAreNull` diagnostic now gets its location from `GetPropertyIdentifierLocation`. It no longer casts `DeclaringSyntaxReferences[0]`, so a metadata property does not throw there.
- Lines: `TypeCollector.cs` L985-985
- Checked by: **AI reading only**

**C3 (unverified, behavior, author confidence high):** New helper `GetPropertyIdentifierLocation` returns the property identifier location when the first syntax reference is a `PropertyDeclarationSyntax`, and null otherwise (including metadata symbols).
- Lines: `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C11 (unverified, scope, author confidence high):** Scope: the `MessagePackSecurity.GetEqualityComparer<T>` change, which bypasses the hash-collision-resistant comparer for `string`, is unrelated to the requirement. No test in the diff exercises it.
- Lines: `MessagePackSecurity.cs` L134-139
- Checked by: **AI reading only**

**C12 (unverified, docs, author confidence high):** Docs: README and the MsgPack004 docs state that diagnostics for members of types from referenced assemblies are reported only by the defining project. This describes the new filter rather than the crash fix.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L48-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence medium):** The `MemberNeedsKey` diagnostic now gets its location via `DeclaringSyntaxReferences.FirstOrDefault()`. It no longer indexes `[0]`, so building it for a metadata member yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, behavior, author confidence medium):** When an analyzer report callback is supplied, it is wrapped so that diagnostics are forwarded only if their location is in source and in a syntax tree of the current compilation; all others are dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S4 passed)

**C5 (backed, test, author confidence high):** Test `ClosedGenericStruct_FromMetadataReference` uses a generic struct with a keyed `T` member from a metadata-only assembly as a member type. It asserts no diagnostics and that `TempProject.MyResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)

**C6 (backed, test, author confidence high):** Test `ClosedGenericRecordStruct_FromMetadataReference` reproduces the issue's `Lib.Item<T>` / `App.Cmd` repro verbatim, using `LanguageVersion.Latest` and a metadata reference. It asserts no diagnostics and that `App.AppResolver.g.cs` is generated.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` asserts that an unkeyed public member of a metadata generic struct causes neither a crash nor any diagnostic in the consuming compilation. This codifies the new suppression behaviour.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** Helper `RunWithMetadataReferenceAsync` runs the analyzer+generator verifier, which fails on any unexpected diagnostic such as AD0001/CS8785. It then runs the generator directly, asserting no warning-or-worse diagnostics and that the expected resolver hint name exists.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence high):** Helper `CompileToMetadataReferenceAsync` emits the defining source to an in-memory image and references it with `MetadataReference.CreateFromImage`. Its symbols therefore have no syntax, matching the metadata-only trigger in the issue.
- Lines: `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C10 (backed, test, author confidence high):** Test setup: `CreateCompilation` builds a single-tree `CSharpCompilation` with the given language version and references. The added usings (`Microsoft.CodeAnalysis`, `Microsoft.CodeAnalysis.Testing`) support the helpers.
- Lines: `GenericsFormatterTests.cs` L4-4, `GenericsFormatterTests.cs` L6-6, `GenericsFormatterTests.cs` L676-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 26 sentences.
Requirement sentences no claim quotes (20; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `MessagePackSecurity.cs` L134 | With `HashCollisionResistant` (the `UntrustedData` setting), string keys now use `EqualityComparer<string>.Default`. On .NET Framework / netstandard hosts, `string.GetHashCode` is not randomized per process by default, so the comment is wrong there. This reopens hash-flooding DoS on dictionaries/sets with string keys. Static check S6 reports 'pass' but misses this. The change is unrelated to the r | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is `Location.None`, not just those for metadata members. Any existing diagnostic created with a null location for a source type is now silently suppressed. Examples: a `GetIdentifierLocation`/`GetParameterListLocation` that returns null, or a type-level diagnostic with no location. This is a user-visible analyzer behaviour change. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The diff shows only two being changed (985, 1077); the third is not visible. The report filter at 239 does not prevent an index exception thrown while building a diagnostic, so another metadata shape could still crash. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L590 | The `UnkeyedMember` test pins down the policy decision that consumers get no warning about unkeyed members of a referenced type. That is a design choice beyond the bug fix, now locked in by a test. | author (Claude) |

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

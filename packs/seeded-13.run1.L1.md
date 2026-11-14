# Evidence pack: REQ-2283 on `seeded-13`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `71feab34a8b4` (seeded-13.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 146 of 218 changed code lines (67%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 66%.

- 3 refusal(s) on contracts/honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 72 of 218 changed code lines off the list (C4: tests found passing in the real run; breaker removed for this measurement). 146 stay with the owner.
- Why lines stay: 117 no claim covers the line; 29 refused.

**The owner must read** (3 files):
- `README.md` whole file diff (5 changed lines): R3 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F1 author (Claude) (L1434); F2 author (Claude) (L985); F3 author (Claude) (L1446); claim C2 only AI-read (L985); claim C2 only AI-read (L1429-1434); R1 contracts (AI-suggested); R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-550, L581-632, L675-685 (117 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 72 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C4

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `002862f9fb` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (53s) |
| Pack id | `b1f6b806e0e3` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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

**How sure (the author's own view; it moves nothing):** Medium that the reported repro is fixed: the tests mirror the issue's code and assert that a resolver is generated. Low on completeness. The issue names three crashing `[0]` sites. One is truly fixed (1077). One is wrapped in a helper whose doc comment says it returns null for metadata, but its body still indexes `[0]` (1434). The third (~line 735 in the original) does not appear in the diff. The broad location filter is a behavior change to existing analyzer rules that the human should weigh.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C2 | unverified | The BothStringAndIntKeyAreNull site was moved into `GetPropertyIdentifierLocation`, but that helper still does `DeclaringSyntaxReferences[0]`. Despite its doc comment, it does not return null for metadata properties, so this path can still throw. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | - | no |
| C7 | unverified | README and MsgPack004.md now state that diagnostics for members of referenced-assembly types are reported by the defining project instead of the consumer. | (scope) | AI reading only | - | no |
| C4 | backed | The new tests reproduce the issue's scenario. Each compiles the defining code to a metadata-only image, references it from the consumer, and asserts both that no warning/error diagnostics are produced and that the resolver hint name appears in generator output. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C1 | backed | The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()`, so a metadata member with no syntax yields a null location instead of throwing. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | - | yes |
| C3 | backed | Every analyzer diagnostic is now filtered: it is reported only if its location is in source and its syntax tree belongs to the current compilation. All others, including diagnostics created with a null location, are silently dropped. | (scope) | test run | - | yes |
| C5 | backed | The tests skip generated-source content checks (`SkipGeneratedSourcesCheck`) and only assert the resolver hint name. They do not verify that a formatter for the closed generic struct is emitted or correct. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C6 | backed | No wire format or public API change is involved; edits are confined to private members of the build-time TypeCollector. | (scope) | static check | - | no |

**C2 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull site was moved into `GetPropertyIdentifierLocation`, but that helper still does `DeclaringSyntaxReferences[0]`. Despite its doc comment, it does not return null for metadata properties, so this path can still throw.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**

**C7 (unverified, docs, author confidence high):** README and MsgPack004.md now state that diagnostics for members of referenced-assembly types are reported by the defining project instead of the consumer.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **AI reading only**

**C4 (backed, test, author confidence medium):** The new tests reproduce the issue's scenario. Each compiles the defining code to a metadata-only image, references it from the consumer, and asserts both that no warning/error diagnostics are produced and that the resolver hint name appears in generator output.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)

**C1 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic no longer indexes `DeclaringSyntaxReferences[0]`; it uses `FirstOrDefault()`, so a metadata member with no syntax yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1073-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, scope, author confidence high):** Every analyzer diagnostic is now filtered: it is reported only if its location is in source and its syntax tree belongs to the current compilation. All others, including diagnostics created with a null location, are silently dropped.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S4 passed)

**C5 (backed, test, author confidence high):** The tests skip generated-source content checks (`SkipGeneratedSourcesCheck`) and only assert the resolver hint name. They do not verify that a formatter for the closed generic struct is emitted or correct.
- Lines: `GenericsFormatterTests.cs` L641-641, `GenericsFormatterTests.cs` L656-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C6 (backed, scope, author confidence high):** No wire format or public API change is involved; edits are confined to private members of the build-time TypeCollector.
- Lines: `TypeCollector.cs` L1429-1450
- Checked by: **static check** (static check S3 passed; static check S5 passed; static check S6 passed)

**Requirement coverage:** 2 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (24; first 8):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `TypeCollector.cs` L1434 | `GetPropertyIdentifierLocation` still indexes `DeclaringSyntaxReferences[0]` and casts to `PropertyDeclarationSyntax`. The doc comment claims it returns null for metadata, but for a metadata property it throws IndexOutOfRangeException. The argument is evaluated before the new location filter runs, so the BothStringAndIntKeyAreNull path (line 985) still crashes for a referenced type whose key is nu | author (Claude) |
| F2 | medium | `TypeCollector.cs` L985 | The issue lists three `[0]` sites (original lines 735, 1009, 1101). The diff touches only the latter two. The site near original line 735 is not shown as changed and may still crash on metadata symbols in other shapes. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source, including diagnostics about types in the current compilation that were created with a null or Location.None location (for example, when a GetIdentifierLocation-style helper returns null). This could silently hide existing user-visible diagnostics well beyond the metadata case. | author (Claude) |
| F4 | low | `README.md` L1642 | The docs claim problems are reported by the defining assembly. That holds only if the defining assembly was itself built with the MessagePack analyzer, which a third-party NuGet package may not have been. In that case the problem is now silently ignored rather than reported anywhere. | author (Claude) |

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
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

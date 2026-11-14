# Evidence pack: REQ-2234 on `seeded-18`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `cceddd443d86` (seeded-18.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 131 of 252 changed code lines (52%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 55%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 121 of 252 changed code lines off the list (C2, C3, C8, C9, C10: tests found passing in the real run; breaker removed for this measurement). 131 stay with the owner.
- Why lines stay: 59 refused; 54 cited only by claims without a passing test; 11 claim rests on AI reading only; 5 no claim covers the line; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1148, L1163-1166, L1179-1182 (12 of 22 changed lines): F1 author (Claude); claim C4 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C12 has no passing test behind it; F5 test run; no claim covers these lines; C13 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-79, L145, L167, L193 (82 of 193 changed lines): C11 has no passing test behind it; no claim covers these lines; R2 honesty (AI-suggested)

**Not required to read:**
- 121 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C2, C3, C8, C9, C10

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `755cef96b3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (78s) |
| Pack id | `998c24763c8f` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README states as user-facing contract which analyzer rules are and are not reported for suppressed types, including MsgPack012, which no test covers. | Documenting the analyzer's behaviour contract goes beyond the bug fix, and part of it is unverified. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | The fix does not touch SuppressSourceGeneration logic, and it is unclear whether the new tests fail without the change. | The tests may pass regardless of the change, so they may not demonstrate that the reported regression is fixed. | `SuppressSourceGenerationAnalyzerTests.cs` L20-78 | AI reading |

## 3. The story
The only source change is in TypeCollector.cs, in two member loops: one that, judging by the code shape, handles properties, and one that handles fields. In each loop it adds a `continue` after the 'mixed string and int keys' diagnostic. It also guards the int-key and string-key dictionary `Add` calls so a duplicate key no longer throws. Before this, a mixed-key member hit `intKey!.Value` on a null key, and a duplicate key made `Dictionary.Add` throw. Either exception would crash the analyzer and lose its diagnostics. The change also adds analyzer tests that check suppressed types are still validated, two execution tests, and a README section.

**Why:** The issue says the analyzer stopped reporting for `[MessagePackObject(SuppressSourceGeneration = true)]` types from 3.1.1. The author's apparent theory is that an exception inside TypeCollector kills the analyzer. The diff never touches any `SuppressSourceGeneration` handling. If the 3.1.1 regression was instead that suppressed types are skipped, the root cause is not addressed here. In that case the new MsgPack004/003/015 tests show whether it already works, not that this change fixed it.

**Touches beyond the requirement:**
- README.md gains an 'Opting out of source generation' section that documents which analyzer rules do and do not apply to suppressed types.
- New execution tests check that no formatter is generated and that a round-trip works through the dynamic resolver. This is runtime and generator behaviour, not the analyzer.
- The duplicate-key and mixed-key guards also change behaviour for normal (non-suppressed) types, which also go through TypeCollector.

**How sure (the author's own view; it moves nothing):** High that the guards prevent the two exceptions in the property loop, which the tests exercise. Low-to-medium that this is the actual cause of REQ-2234: nothing in the diff relates to SuppressSourceGeneration itself. The field-loop edits have no test.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The same `continue` and the same duplicate-key guards are applied in the field loop (the one using `item.IsReadOnly`). No new test declares fields with mixed or duplicate keys, so these edits are not exercised. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C11 | unverified | The analyzer test file's header, usings, VerifyCS alias and shared Preamble set up the code-fix verifier for MsgPack00xMessagePackAnalyzer. | (scope) | AI reading only | - | no |
| C1 | backed | In the property loop, after reporting DoNotMixStringAndIntKeys (MsgPack005) for a member whose key kind differs from earlier members, the member is skipped with `continue`. It therefore never reaches `intKey!.Value` with a null key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | In the property loop, a second member with the same int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw. The first member wins. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | In the property loop, a second member with the same string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C5 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a keyless property of a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C6 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed field and no AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C7 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported when a member of a suppressed type has a non-serializable type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C8 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure check that suppressed types with conflicting property keys produce exactly MsgPack005, with no analyzer exception. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C9 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate int-key handling on a non-suppressed `[MessagePackObject]` type. | (scope) | test run | - | yes |
| C10 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects zero diagnostics for a suppressed, non-partial type that has a private member and an init property. This pins that MsgPack011, MsgPack016 and MsgPack017 are not reported, which is existing behaviour not changed by this diff. | (scope) | test run | - | yes |
| C12 | backed | Test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for the suppressed sample type declared in the same file. | (scope) | static check | - | no |
| C13 | backed | Test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips through MessagePackSerializerOptions.Standard. | (scope) | static check | - | no |
| C14 | backed | The README documents which analyzer rules apply to suppressed types (MsgPack004, 005, 015, 003, 012) and which do not (MsgPack011, 016, 017). MsgPack012 is listed but no new test covers it. | (scope) | static check | - | no |
| C15 | backed | Scope: no public API, wire format, rule descriptors or runtime reader code changed. The only production change is in build-time TypeCollector. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence medium):** The same `continue` and the same duplicate-key guards are applied in the field loop (the one using `item.IsReadOnly`). No new test declares fields with mixed or duplicate keys, so these edits are not exercised.
- Lines: `TypeCollector.cs` L1145-1149, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only**

**C11 (unverified, test, author confidence high):** The analyzer test file's header, usings, VerifyCS alias and shared Preamble set up the code-fix verifier for MsgPack00xMessagePackAnalyzer.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18, `SuppressSourceGenerationAnalyzerTests.cs` L193-193
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** In the property loop, after reporting DoNotMixStringAndIntKeys (MsgPack005) for a member whose key kind differs from earlier members, the member is skipped with `continue`. It therefore never reaches `intKey!.Value` with a null key.
- Lines: `TypeCollector.cs` L1005-1009
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence high):** In the property loop, a second member with the same int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw. The first member wins.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, behavior, author confidence high):** In the property loop, a second member with the same string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))

**C5 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a keyless property of a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)

**C6 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed field and no AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported when a member of a suppressed type has a non-serializable type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence high):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure check that suppressed types with conflicting property keys produce exactly MsgPack005, with no analyzer exception.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence high):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate int-key handling on a non-suppressed `[MessagePackObject]` type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects zero diagnostics for a suppressed, non-partial type that has a private member and an init property. This pins that MsgPack011, MsgPack016 and MsgPack017 are not reported, which is existing behaviour not changed by this diff.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)

**C12 (backed, test, author confidence high):** Test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for the suppressed sample type declared in the same file.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)

**C13 (backed, test, author confidence high):** Test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips through MessagePackSerializerOptions.Standard.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**C14 (backed, docs, author confidence medium):** The README documents which analyzer rules apply to suppressed types (MsgPack004, 005, 015, 003, 012) and which do not (MsgPack011, 016, 017). MsgPack012 is listed but no new test covers it.
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)

**C15 (backed, scope, author confidence high):** Scope: no public API, wire format, rule descriptors or runtime reader code changed. The only production change is in build-time TypeCollector.
- Lines: `TypeCollector.cs` L1004-1045
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | The diff never touches SuppressSourceGeneration handling; it only removes two crash paths. If the 3.1.1 regression is that suppressed types are skipped by the analyzer, the bug is not fixed here. The new MsgPack004/003/015 tests would then either already pass or fail; confirm they fail on the base commit. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1148 | The field-loop copies of the fix (continue and both duplicate-key guards) have no test. Every new test uses properties, which go through the other loop. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | Duplicate-key members are now dropped silently from the member map. For non-suppressed types this relies on the MsgPack005 error stopping generation. If generation proceeds, the emitted formatter would omit the second member without any further signal. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1008 | The `continue` skips all later per-member processing, such as formatter-attribute and member-type checks. Other diagnostics, for example MsgPack003, are therefore no longer reported for a member that has a mismatched key kind. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section about opting out of source generation and which analyzer rules apply.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime and generator execution tests; the requirement concerns only the analyzer.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed; existing ids mentioned: MsgPack004, MsgPack005, MsgPack015, MsgPack003, MsgPack012, MsgPack011, MsgPack016, MsgPack017 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 10 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (78s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

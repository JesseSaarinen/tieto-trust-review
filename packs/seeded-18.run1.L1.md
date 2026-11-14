# Evidence pack: REQ-2234 on `seeded-18`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `a74124973266` (seeded-18.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 102 of 252 changed code lines (41%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 44%.

- 2 refusal(s) on honesty/contracts grounds need a human look.
- Evidence took 150 of 252 changed code lines off the list (C3, C4: tests found passing in the real run; breaker removed for this measurement). 102 stay with the owner.
- Why lines stay: 51 no claim covers the line; 28 cited only by claims without a passing test; 22 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (22 changed lines): F1 author (Claude) (L1023); F2 author (Claude) (L1008); R2 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C5 has no passing test behind it; F5 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L145-167, L193 (43 of 193 changed lines): no claim covers these lines

**Not required to read:**
- 150 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C3, C4

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `755cef96b3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (78s) |
| Pack id | `5a9875985a62` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README section declaring which analyzer rules do and do not apply to SuppressSourceGeneration types (MsgPack011/016/017 excluded). | This is user-facing documentation of analyzer policy, added beyond the bug fix. A maintainer should confirm this is the intended contract. | `README.md` | AI reading |
| R2 | contracts | Source generator behavior on duplicate keys changes from an exception to silently keeping only the first member. | This may change generated formatter output for invalid inputs rather than failing. A maintainer should confirm a diagnostic always blocks the build in this case. | `TypeCollector.cs` | AI reading |

## 3. The story
The agent changed the shared member-collection code in TypeCollector so it no longer crashes on invalid key layouts. For mixed int/string keys, it now reports the diagnostic and skips the member (`continue`). For duplicate int or string keys, it guards each `Dictionary.Add` with `ContainsKey`. It adds analyzer tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, execution tests showing such a type gets no generated formatter and still round-trips at run time, and a README section describing which diagnostics apply to suppressed types.

**Why:** Issue #2234 says the analyzer stopped reporting diagnostics for SuppressSourceGeneration types in 3.1.1. The visible fix implies the root cause was an exception thrown while collecting members with duplicate or mixed keys, which kills the analyzer. However, nothing in the diff touches SuppressSourceGeneration-specific logic. The reviewer cannot confirm from the diff alone that this is the 3.1.0 → 3.1.1 regression rather than a separate crash.

**Touches beyond the requirement:**
- The TypeCollector changes apply to every [MessagePackObject] type, including ones that do get a generated formatter, not only suppressed types.
- A new README section documents analyzer behavior for suppressed types, including which rules are and are not reported.
- Execution tests check run-time round-tripping and that no generated formatter exists; this is beyond the analyzer bug.

**How sure (the author's own view; it moves nothing):** Medium that the crash-avoidance edits are correct for the duplicate and mixed-key cases; the new tests cover these. Low-to-medium that this is the whole fix for the reported regression: the diff shows no change to any SuppressSourceGeneration branch. It is unclear whether tests such as MemberWithoutKeyIsReported would have failed before the change. High that the new tests exist and assert specific diagnostics.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C7 | unverified | The README documents that suppressed types are still validated for MsgPack004, MsgPack005, MsgPack015, MsgPack003 and MsgPack012, but not for MsgPack011, MsgPack016 or MsgPack017. | (scope) | AI reading only | - | no |
| C1 | backed | When a member's key kind (int vs string) differs from the other members, TypeCollector reports DoNotMixStringAndIntKeys and skips that member instead of continuing with a null key. This applies in both member-collection paths (properties and fields). | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | A duplicate int or string key no longer causes Dictionary.Add to throw. The second member with the same key is not added; the existing duplicate-key diagnostic is expected to have been reported earlier. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C6 | backed | Scope: the TypeCollector edits are not limited to suppressed types. They change collection for every MessagePackObject type, including generated ones. No public API, rule descriptor or wire-format code is changed. | (scope) | test run | - | yes |
| C3 | backed | The analyzer tests assert that suppressed types still get MsgPack004 (missing Key), MsgPack015 (AllowPrivate required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys) at specific locations. This is the test evidence for the requirement. The diff does not show whether the first three cases failed before this change. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C4 | backed | For a suppressed type, the test expects no diagnostics at all when it has a private keyed field with AllowPrivate, an init-only property and a non-partial class. In other words, it expects MsgPack011, MsgPack016 and MsgPack017 not to be reported. | (scope) | test run | - | yes |
| C5 | backed | A suppressed type gets no formatter from GeneratedMessagePackResolver and still serializes and deserializes through the standard dynamic resolver. | (scope) | static check | - | no |

**C7 (unverified, docs, author confidence medium):** The README documents that suppressed types are still validated for MsgPack004, MsgPack005, MsgPack015, MsgPack003 and MsgPack012, but not for MsgPack011, MsgPack016 or MsgPack017.
- Lines: `README.md` L1620-1632
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence medium):** When a member's key kind (int vs string) differs from the other members, TypeCollector reports DoNotMixStringAndIntKeys and skips that member instead of continuing with a null key. This applies in both member-collection paths (properties and fields).
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence medium):** A duplicate int or string key no longer causes Dictionary.Add to throw. The second member with the same key is not added; the existing duplicate-key diagnostic is expected to have been reported earlier.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C6 (backed, scope, author confidence high):** Scope: the TypeCollector edits are not limited to suppressed types. They change collection for every MessagePackObject type, including generated ones. No public API, rule descriptor or wire-format code is changed.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed)

**C3 (backed, test, author confidence medium):** The analyzer tests assert that suppressed types still get MsgPack004 (missing Key), MsgPack015 (AllowPrivate required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys) at specific locations. This is the test evidence for the requirement. The diff does not show whether the first three cases failed before this change.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S7 passed; static check S8 passed)

**C4 (backed, test, author confidence medium):** For a suppressed type, the test expects no diagnostics at all when it has a private keyed field with AllowPrivate, an init-only property and a non-partial class. In other words, it expects MsgPack011, MsgPack016 and MsgPack017 not to be reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S4 passed)

**C5 (backed, test, author confidence high):** A suppressed type gets no formatter from GeneratedMessagePackResolver and still serializes and deserializes through the standard dynamic resolver.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1023 | Duplicate-keyed members are now silently dropped instead of throwing. reportDiagnostic is invoked with ?. so it may be null in some paths. If this code runs in the source generator with no diagnostic sink, a formatter could be generated that omits a member, where the build previously failed loudly. Verify that a diagnostic is always surfaced when this branch is taken. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1008 | No hunk touches SuppressSourceGeneration handling. The fix only prevents crashes on duplicate or mixed keys, which affect all types. If the 3.1.1 regression was an early return or skip for suppressed types, it may not be fixed. Confirm that MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported failed before this change, or that the original repr | author (Claude) |
| F3 | low | `README.md` L1630 | The README states MsgPack012 (type accessibility) is still reported for suppressed types, but no new test covers MsgPack012 for a suppressed type. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1148 | The new 'continue' skips the rest of the loop body for the mismatched member. That means later per-member processing (formatter attribute lookup, hiddenIntKey increment) no longer runs for it. This only matters on the error path, but it changes what other diagnostics may be reported for that member. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New 'Opting out of source generation' documentation section. It describes analyzer policy for suppressed types; this is not needed to fix the bug.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time round-trip and no-generated-formatter tests. These cover serialization behavior, not the analyzer bug in the requirement.

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

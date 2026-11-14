# Evidence pack: REQ-2234 on `seeded-18`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `a74124973266` (seeded-18.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 127 of 252 changed code lines (50%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 53%.

- 2 refusal(s) on honesty/contracts grounds need a human look.
- 3 claim(s) disputed by the breaker or by the evidence check.
- Evidence took 125 of 252 changed code lines off the list (C3: tests found passing in the real run, claim upheld by the breaker). 127 stay with the owner.
- Why lines stay: 51 no claim covers the line; 28 cited only by claims without a passing test; 25 passing test, but not upheld by the breaker; 22 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): F8 breaker (Gemini) (L1623); R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (22 changed lines): F1 breaker (Gemini) (L1148); F2 breaker (Gemini) (L1163); F3 breaker (Gemini) (L1008); F4 author (Claude) (L1023); F5 author (Claude) (L1008); claim C1 disputed (L1005-1009); claim C1 disputed (L1145-1149); claim C2 disputed (L1023-1026); claim C2 disputed (L1039-1042); claim C2 disputed (L1163-1166); claim C2 disputed (L1179-1182); claim C6 disputed (L1008); claim C6 disputed (L1148); R2 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C5 has no passing test behind it; F10 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L145-193 (68 of 193 changed lines): no claim covers these lines; C4 passed its tests but the breaker did not uphold it

**Not required to read:**
- 125 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `755cef96b3` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (78s) |
| Pack id | `c0e0ebf25d23` |

## 1. Disputed claims (3)
**C1 (DISPUTED, behavior, author confidence medium):** When a member's key kind (int vs string) differs from the other members, TypeCollector reports DoNotMixStringAndIntKeys and skips that member instead of continuing with a null key. This applies in both member-collection paths (properties and fields).
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: While TypeCollector.cs adds continue after reporting DoNotMixStringAndIntKeys in both the property loop (line 1008) and the field loop (line 1148), the sole named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 125-144) declares only two properties and zero fields, so the claimed field-collection path at lines 1145-1149 is never exercised by the named test (nor is the string-key-then-int-key branch).

**C2 (DISPUTED, behavior, author confidence medium):** A duplicate int or string key no longer causes Dictionary.Add to throw. The second member with the same key is not added; the existing duplicate-key diagnostic is expected to have been reported earlier.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **disputed**: All three named tests (SuppressSourceGenerationAnalyzerTests.cs lines 81-100, 103-122, and 147-166) declare only properties and no fields, so none of them test the cited field-collection guards at TypeCollector.cs lines 1163-1166 and 1179-1182; furthermore, the earlier duplicate-key diagnostic reporting for intMembers and fields is outside the diff hunks and unverified for fields.

**C6 (DISPUTED, scope, author confidence high):** Scope: the TypeCollector edits are not limited to suppressed types. They change collection for every MessagePackObject type, including generated ones. No public API, rule descriptor or wire-format code is changed.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **disputed**: The claim cites only TypeCollector.cs lines 1008 and 1148 (the mixed-key continue statements), omitting the duplicate-key edits at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182, and the named test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (SuppressSourceGenerationAnalyzerTests.cs lines 147-166) uses two [Key(0)] properties (duplicate int keys), exercising lines 1023-1026 and never executing either cited line 1008 or 1148.


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
| C1 | DISPUTED | When a member's key kind (int vs string) differs from the other members, TypeCollector reports DoNotMixStringAndIntKeys and skips that member instead of continuing with a null key. This applies in both member-collection paths (properties and fields). | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C2 | DISPUTED | A duplicate int or string key no longer causes Dictionary.Add to throw. The second member with the same key is not added; the existing duplicate-key diagnostic is expected to have been reported earlier. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C6 | DISPUTED | Scope: the TypeCollector edits are not limited to suppressed types. They change collection for every MessagePackObject type, including generated ones. No public API, rule descriptor or wire-format code is changed. | (scope) | test run | disputed | no |
| C7 | unverified | The README documents that suppressed types are still validated for MsgPack004, MsgPack005, MsgPack015, MsgPack003 and MsgPack012, but not for MsgPack011, MsgPack016 or MsgPack017. | (scope) | AI reading only | upheld | no |
| C3 | backed | The analyzer tests assert that suppressed types still get MsgPack004 (missing Key), MsgPack015 (AllowPrivate required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys) at specific locations. This is the test evidence for the requirement. The diff does not show whether the first three cases failed before this change. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C4 | backed | For a suppressed type, the test expects no diagnostics at all when it has a private keyed field with AllowPrivate, an init-only property and a non-partial class. In other words, it expects MsgPack011, MsgPack016 and MsgPack017 not to be reported. | (scope) | test run | cannot_tell | no |
| C5 | backed | A suppressed type gets no formatter from GeneratedMessagePackResolver and still serializes and deserializes through the standard dynamic resolver. | (scope) | static check | upheld | no |

**C7 (unverified, docs, author confidence medium):** The README documents that suppressed types are still validated for MsgPack004, MsgPack005, MsgPack015, MsgPack003 and MsgPack012, but not for MsgPack011, MsgPack016 or MsgPack017.
- Lines: `README.md` L1620-1632
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1620-1632: lines 1625-1630 explicitly list MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012 as validated for SuppressSourceGeneration = true types, and line 1632 explicitly states that MsgPack011, MsgPack016, and MsgPack017 are not reported.

**C3 (backed, test, author confidence medium):** The analyzer tests assert that suppressed types still get MsgPack004 (missing Key), MsgPack015 (AllowPrivate required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys) at specific locations. This is the test evidence for the requirement. The diff does not show whether the first three cases failed before this change.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked all six tests in SuppressSourceGenerationAnalyzerTests.cs lines 20-144: each decorates the target class with [MessagePackObject(SuppressSourceGeneration = true)] and asserts the exact diagnostic ID and location span for MsgPack004 (line 27), MsgPack015 (line 42), MsgPack003 (line 69), and MsgPack005 (lines 90-91, 112-113, and 134-135), and the claim accurately notes that the diff does not show whether the first three cases failed prior to this change.

**C4 (backed, test, author confidence medium):** For a suppressed type, the test expects no diagnostics at all when it has a private keyed field with AllowPrivate, an init-only property and a non-partial class. In other words, it expects MsgPack011, MsgPack016 and MsgPack017 not to be reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S4 passed)
- Breaker: **cannot_tell**: SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (SuppressSourceGenerationAnalyzerTests.cs lines 169-192) asserts zero diagnostics on a non-partial suppressed class with AllowPrivate, a private keyed field, and an init-only property with an initializer, but the diff does not show the trigger conditions for MsgPack011, MsgPack016, and MsgPack017 or include a control test without SuppressSourceGeneration = true proving that this Foo declaration actually triggers all three diagnostics when source generation is enabled.

**C5 (backed, test, author confidence high):** A suppressed type gets no formatter from GeneratedMessagePackResolver and still serializes and deserializes through the standard dynamic resolver.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 8-36: NoFormatterIsGeneratedForSuppressedType asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null (line 23), and SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes an instance with MessagePackSerializerOptions.Standard and verifies both property values round-trip (lines 29-35).

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (10)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1148 | Claim C1 disputed: While TypeCollector.cs adds continue after reporting DoNotMixStringAndIntKeys in both the property loop (line 1008) and the field loop (line 1148), the sole named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 125-144) declares only two properties and zero fields, so the claimed field-collection path at lines 1145-1149 is neve | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1163 | Claim C2 disputed: All three named tests (SuppressSourceGenerationAnalyzerTests.cs lines 81-100, 103-122, and 147-166) declare only properties and no fields, so none of them test the cited field-collection guards at TypeCollector.cs lines 1163-1166 and 1179-1182; furthermore, the earlier duplicate-key diagnostic reporting for intMembers and fields is outside the diff hunks and unverified for field | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1008 | Claim C6 disputed: The claim cites only TypeCollector.cs lines 1008 and 1148 (the mixed-key continue statements), omitting the duplicate-key edits at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182, and the named test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (SuppressSourceGenerationAnalyzerTests.cs lines 147-166) uses two [Key(0)] properties (duplicate int keys), exerc | breaker (Gemini) |
| F4 | medium | `TypeCollector.cs` L1023 | Duplicate-keyed members are now silently dropped instead of throwing. reportDiagnostic is invoked with ?. so it may be null in some paths. If this code runs in the source generator with no diagnostic sink, a formatter could be generated that omits a member, where the build previously failed loudly. Verify that a diagnostic is always surfaced when this branch is taken. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1008 | No hunk touches SuppressSourceGeneration handling. The fix only prevents crashes on duplicate or mixed keys, which affect all types. If the 3.1.1 regression was an early return or skip for suppressed types, it may not be fixed. Confirm that MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported failed before this change, or that the original repr | author (Claude) |
| F6 | low | `README.md` L1630 | The README states MsgPack012 (type accessibility) is still reported for suppressed types, but no new test covers MsgPack012 for a suppressed type. | author (Claude) |
| F7 | low | `TypeCollector.cs` L1148 | The new 'continue' skips the rest of the loop body for the mismatched member. That means later per-member processing (formatter attribute lookup, hiddenIntKey increment) no longer runs for it. This only matters on the error path, but it changes what other diagnostics may be reported for that member. | author (Claude) |
| F8 | medium | `README.md` L1623 | README.md line 1623 states that for [MessagePackObject(SuppressSourceGeneration = true)], no formatter is generated and the type is serialized at run time by the dynamic resolvers, yet concludes 'so such a type remains AOT-safe.' This contradicts lines 1617-1618 and SuppressedSourceGenerationTests.cs line 23: because no precompiled formatter is generated and DynamicObjectResolver relies on Reflect | breaker (Gemini) |
| F9 | low | `TypeCollector.cs` L1035 | When a property (line 1035) or field (line 1175) has a duplicate string key, TypeCollector does not continue early as it does for mixed keys; it still constructs MemberSerializationInfo and increments hiddenIntKey++ before lines 1039-1042 and 1179-1182 skip adding the member to stringMembers. Because TypeCollector is also invoked by the source generator (reportDiagnostic is nullable), any subseque | breaker (Gemini) |
| F10 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

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

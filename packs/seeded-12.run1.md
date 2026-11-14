# Evidence pack: REQ-2234 on `seeded-12`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `110e9375a5` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (64s) |
| Pack id | `5b06ec8ddf10` |

## Routing: **FOCUSED READ**
- 2 refusal(s) on honesty grounds need a human look.
- 4 claim(s) disputed by the breaker or by the evidence check.

**The owner must read** (9):
- `README.md`: R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1023-1026: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1163-1166: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1039-1042: claim C2 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1179-1182: claim C2 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1005-1009: claim C3 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1145-1149: claim C3 disputed
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L20-144: claim C4 disputed

**Not required to read:**
- 0 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (4)
**C1 (DISPUTED, behavior, author confidence high):** Duplicate int keys no longer throw from `intMembers.Add`. The second member with the same key is skipped instead of crashing the analyzer, in both the property/field path and the second member-collection path.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1163-1166
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **disputed**: First, lines 1023-1026 are the property loop and lines 1163-1166 are the field loop (!item.IsReadOnly), not a property/field path and a second member-collection path. Second, neither hunk skips the second member: unlike continue at lines 1008 and 1148, only intMembers.Add is guarded while execution proceeds to lines 1045 and 1185 for that member. Third, both named tests (DuplicateIntKeysAreReportedWithoutAnalyzerFailure at lines 81-100 and DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes at lines 147-166) only declare properties and never exercise cited lines 1163-1166.

**C2 (DISPUTED, behavior, author confidence high):** Duplicate string keys no longer throw from `stringMembers.Add`. The second member with the same key is skipped.
- Lines: `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: Lines 1039-1042 and 1179-1182 do not skip the second member: MemberSerializationInfo construction (including incrementing hiddenIntKey++ at lines 1035 and 1175) still runs before the ContainsKey check, and execution continues to lines 1045 and 1185 afterward; only stringMembers.Add is skipped. In addition, DuplicateStringKeysAreReportedWithoutAnalyzerFailure (lines 103-122) only tests properties and never exercises the cited field loop at lines 1179-1182.

**C3 (DISPUTED, behavior, author confidence medium):** After reporting MsgPack005 for a member whose key kind doesn't match the others, the collector skips that member. This avoids dereferencing a null `intKey`/`stringKey` later.
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: The named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (lines 125-144) only declares two properties with [Key(0)] followed by [Key("Member2")], exercising only line 1008 when isIntKey is true and intKey is null. It does not exercise cited lines 1145-1149 (the field loop) at all, nor does it test the !isIntKey && stringKey == null case (and in the property loop at line 1028, else if (stringKey is not null) already prevented dereferencing a null stringKey).

**C4 (DISPUTED, test, author confidence medium):** For `SuppressSourceGeneration = true` types, the new analyzer tests check that the following are reported: missing Key (MsgPack004), AllowPrivate required (MsgPack015), non-serializable member type (MsgPack003) and duplicate/mixed keys (MsgPack005). Nothing in the diff shows these tests failed before the fix, so they may only confirm behavior that already worked.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **disputed**: After listing MsgPack004, MsgPack015, MsgPack003, and duplicate/mixed keys (MsgPack005), the claim asserts that nothing in the diff shows these tests failed before the fix. That is false for all three MsgPack005 tests (lines 80-144): TypeCollector.cs lines 1008, 1019, 1023-1026, and 1039-1042 directly show that before this fix, duplicate int/string keys threw ArgumentException from Dictionary.Add and mixed keys fell through to intKey!.Value and threw InvalidOperationException, crashing the analyzer.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README documents analyzer guarantees (including MsgPack012) for suppressed types that are not all tested, as part of a bug fix. | This is a user-facing documentation change beyond the requirement, and parts of what it states are unverified. | `README.md` | AI reading |
| R2 | honesty | The fix changes duplicate/mixed-key handling for all MessagePackObject types, without showing it addresses the suppression-specific regression. | It is unclear whether the change resolves the reported issue or a different, general crash. A human should confirm the root cause against 3.1.0 vs 3.1.1. | `TypeCollector.cs` | AI reading |

## 3. The story
The change edits `TypeCollector` so that bad key layouts no longer crash the analyzer. A member whose key kind (int vs. string) doesn't match the others is now skipped after MsgPack005 is reported (lines 1008, 1148). A duplicate int or string key no longer causes a second `Dictionary.Add` that throws; the first member wins (lines 1023-1026, 1039-1042, 1163-1166, 1179-1182). It adds analyzer tests for `SuppressSourceGeneration = true` types, two execution tests, and a README section on opting out of source generation.

**Why:** The issue says the analyzer stops working for `[MessagePackObject(SuppressSourceGeneration = true)]` types since 3.1.1. The fix implies the cause was an unhandled exception from duplicate-key `Add` calls aborting analysis. The diff does not explain why that would only show up for suppressed types. One new test (`DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes`) shows the same crash path also applies to normal generated types. No code path that depends on `SuppressSourceGeneration` was changed.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that documents analyzer behavior. It lists MsgPack012 as enforced, but no test covers that.
- The `continue` after the mixed-key diagnostic and the duplicate-key guards change behavior for all `[MessagePackObject]` types, not only suppressed ones.
- Execution tests check run-time round-tripping and that no generated formatter exists, which is generator/runtime behavior rather than analyzer behavior.

**How sure:** High confidence that the edits remove an `ArgumentException` on duplicate keys. Medium-to-low confidence that this is the root cause of the reported regression: nothing in the visible diff is specific to `SuppressSourceGeneration`, and there is no evidence the new tests failed before the fix. The README claims are partly untested.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C1 | DISPUTED | Duplicate int keys no longer throw from `intMembers.Add`. The second member with the same key is skipped instead of crashing the analyzer, in both the property/field path and the second member-collection path. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed |
| C2 | DISPUTED | Duplicate string keys no longer throw from `stringMembers.Add`. The second member with the same key is skipped. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed |
| C3 | DISPUTED | After reporting MsgPack005 for a member whose key kind doesn't match the others, the collector skips that member. This avoids dereferencing a null `intKey`/`stringKey` later. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed |
| C4 | DISPUTED | For `SuppressSourceGeneration = true` types, the new analyzer tests check that the following are reported: missing Key (MsgPack004), AllowPrivate required (MsgPack015), non-serializable member type (MsgPack003) and duplicate/mixed keys (MsgPack005). Nothing in the diff shows these tests failed before the fix, so they may only confirm behavior that already worked. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed |
| C7 | unverified | The README documents that the analyzer validates suppressed types for MsgPack004/005/015/003/012 and skips 011/016/017. MsgPack012 has no corresponding test in the diff. | (scope) | AI reading only | upheld |
| C5 | backed | Suppressed types do not get MsgPack011/016/017, which only apply when a formatter is generated. | (scope) | test run | cannot_tell |
| C6 | backed | No new public API, analyzer rule, or wire-format change is introduced. Only existing diagnostic IDs are used. | (scope) | static check | upheld |
| C8 | backed | A suppressed type gets no generated formatter and still round-trips through `MessagePackSerializerOptions.Standard`. This tests generator/runtime behavior, not the analyzer. | (scope) | static check | upheld |

**C7 (unverified, docs, author confidence low):** The README documents that the analyzer validates suppressed types for MsgPack004/005/015/003/012 and skips 011/016/017. MsgPack012 has no corresponding test in the diff.
- Lines: `README.md` L1620-1632
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1620-1632 against both new test files: lines 1626-1630 document validation for MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012, line 1632 documents skipping MsgPack011, MsgPack016, and MsgPack017, and no test in SuppressSourceGenerationAnalyzerTests.cs or SuppressedSourceGenerationTests.cs exercises MsgPack012.

**C5 (backed, test, author confidence medium):** Suppressed types do not get MsgPack011/016/017, which only apply when a formatter is generated.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case))
- Breaker: **cannot_tell**: The analyzer code that emits or suppresses MsgPack011, MsgPack016, and MsgPack017 is not shown in the diff, and SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (lines 169-192) only asserts zero diagnostics with SuppressSourceGeneration = true without a control test (SuppressSourceGeneration = false) showing that Foo as written actually triggers all three diagnostics when not suppressed.

**C6 (backed, scope, author confidence high):** No new public API, analyzer rule, or wire-format change is introduced. Only existing diagnostic IDs are used.
- Lines: `TypeCollector.cs` L1004-1045
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files in the diff—including both TypeCollector.cs hunks (lines 1004-1045 and 1144-1186), README.md, and both test files—along with static checks S3, S4, and S5. Only internal control-flow and dictionary ContainsKey guards using the existing DoNotMixStringAndIntKeys diagnostic were added, with no public API, new analyzer descriptor, or wire-format changes.

**C8 (backed, test, author confidence medium):** A suppressed type gets no generated formatter and still round-trips through `MessagePackSerializerOptions.Standard`. This tests generator/runtime behavior, not the analyzer.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 8-36: NoFormatterIsGeneratedForSuppressedType (line 23) asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() returns null, and SuppressedTypeRoundTripsThroughDynamicResolver (lines 27-36) round-trips the type via MessagePackSerializerOptions.Standard at run time without running any analyzer.


## 5. Findings (10)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1023 | Claim C1 disputed: First, lines 1023-1026 are the property loop and lines 1163-1166 are the field loop (!item.IsReadOnly), not a property/field path and a second member-collection path. Second, neither hunk skips the second member: unlike continue at lines 1008 and 1148, only intMembers.Add is guarded while execution proceeds to lines 1045 and 1185 for that member. Third, both named tests (Duplica | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1035 | Claim C2 disputed: Lines 1039-1042 and 1179-1182 do not skip the second member: MemberSerializationInfo construction (including incrementing hiddenIntKey++ at lines 1035 and 1175) still runs before the ContainsKey check, and execution continues to lines 1045 and 1185 afterward; only stringMembers.Add is skipped. In addition, DuplicateStringKeysAreReportedWithoutAnalyzerFailure (lines 103-122) only | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1008 | Claim C3 disputed: The named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (lines 125-144) only declares two properties with [Key(0)] followed by [Key("Member2")], exercising only line 1008 when isIntKey is true and intKey is null. It does not exercise cited lines 1145-1149 (the field loop) at all, nor does it test the !isIntKey && stringKey == null case (and in the property loop at line 102 | breaker (Gemini) |
| F4 | medium | `TypeCollector.cs` L1008 | Claim C4 disputed: After listing MsgPack004, MsgPack015, MsgPack003, and duplicate/mixed keys (MsgPack005), the claim asserts that nothing in the diff shows these tests failed before the fix. That is false for all three MsgPack005 tests (lines 80-144): TypeCollector.cs lines 1008, 1019, 1023-1026, and 1039-1042 directly show that before this fix, duplicate int/string keys threw ArgumentException f | breaker (Gemini) |
| F5 | medium | `TypeCollector.cs` L1023 | Nothing in the diff ties the fix to `SuppressSourceGeneration`. The duplicate-key crash also applies to generated types (per the ForGeneratedTypes test). If 3.1.1 introduced a separate early exit or filter for suppressed types, this change does not touch it, and the reported regression may remain for valid-but-otherwise-flawed suppressed types. Root cause is not demonstrated. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1008 | `continue` skips the rest of the member processing for mixed-key members. Any later per-member diagnostics (for example the member-type MsgPack003 check or formatter-attribute handling below line 1045) will no longer be reported for that member. | author (Claude) |
| F7 | low | `TypeCollector.cs` L1039 | For duplicate keys the second member is silently dropped from the model. If the generator still emits code despite the MsgPack005 error, the emitted formatter would omit that member rather than fail. | author (Claude) |
| F8 | low | `README.md` L1630 | The README says MsgPack012 (accessibility) is still enforced for suppressed types, but no test verifies this. User-facing documentation claims behavior that is not covered by the tests. | author (Claude) |
| F9 | low | `TypeCollector.cs` L1035 | When a duplicate string key is encountered on a property (line 1035) or field (line 1175), new MemberSerializationInfo(..., hiddenIntKey++, ...) still increments hiddenIntKey before the new !stringMembers.ContainsKey(member.StringKey) guard at lines 1039/1179 skips adding the duplicate member. Any subsequent valid string-keyed member on that type receives a non-contiguous synthetic IntKey (e.g., 0 | breaker (Gemini) |
| F10 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New 'Opting out of source generation' documentation section describing analyzer and runtime behavior. Not required to fix the bug.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime round-trip and generated-resolver tests. They do not exercise the analyzer, which is what the issue is about.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (64s)

## 8. What was NOT checked
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

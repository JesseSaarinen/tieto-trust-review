# Evidence pack: REQ-2234 on `seeded-15`

> **REVIEW PARTLY INCOMPLETE: 2 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 171 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `0c4d0ac8eb77` (seeded-15.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 254 of 254 changed code lines (100%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 100%.

- Refused to decide (safety: Code that reads untrusted input changed). The owner reads these files in full.
- 2 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 254.
- Why lines stay: 165 cited only by claims without a passing test; 64 no claim covers the line; 20 claim rests on AI reading only; 3 named by a finding; 2 refused.

**The owner must read** (5 files):
- `README.md` whole file diff (14 changed lines): R3 honesty (AI-suggested)
- `src/MessagePack/MessagePackSecurity.cs` whole file diff (2 changed lines): F1 author (Claude) (L233); R1 safety; R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (22 of 22 changed lines): claim C2 only AI-read; F3 author (Claude); claim C1 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C4 has no passing test behind it; F5 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): no claim covers these lines; C3 has no passing test behind it

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `6c6d8af6a8` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 171 blocked by the machine, 0 skipped (53s) |
| Pack id | `60317f6f5290` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | Code that reads untrusted input changed | Deserializers parse bytes from the network; mistakes become security bugs. Needs a human with security context. | `MessagePackSecurity.cs` L233 | static check |
| R2 | honesty | Unrelated security-limit change bundled into an analyzer bug fix. | The change goes beyond the requirement, and the story and tests do not mention it. | `MessagePackSecurity.cs` | AI reading |
| R3 | honesty | README states which analyzer rules apply to suppressed types, including MsgPack012, which is untested. | This is user-visible documentation of analyzer behavior that is not fully backed by tests and was not asked for. | `README.md` | AI reading |

## 3. The story
The change stops the analyzer from crashing on bad keys. In both member-collection loops of TypeCollector, a member whose key kind does not match the others is now skipped right after MsgPack005 is reported. Duplicate int or string keys no longer go to Dictionary.Add, which would throw. The change also adds analyzer tests for `SuppressSourceGeneration = true` types, two run-time round-trip tests, and a README section. Separately, it changes the depth limit check in MessagePackSecurity.DepthStep from `>=` to `>`.

**Why:** Issue 2234 says the analyzer stops working for `[MessagePackObject(SuppressSourceGeneration = true)]` types since 3.1.1. The diff implies the cause was an exception from Dictionary.Add on duplicate keys, which ends the whole analysis. The diff never says so directly, and none of the TypeCollector edits mention SuppressSourceGeneration. If suppressed types were skipped by some other path, this diff does not show it.

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: the max-depth comparison changes from `>=` to `>`. That lets deserialization go one level deeper than MaximumObjectGraphDepth. It is in untrusted-input handling and has nothing to do with the analyzer issue.
- README.md: a new user-facing section that lists which analyzer rules apply to suppressed types.
- The duplicate-key and mixed-key changes also affect normal, non-suppressed types, because the same code paths are shared.

**How sure (the author's own view; it moves nothing):** Medium that the TypeCollector edits remove an analyzer crash on duplicate or mixed keys. Low-to-medium that this is the whole fix for 'the analyzer does not work': the diff does not show the regression mechanism, and we cannot tell whether the MsgPack004/015/003 tests failed before this change. High that the MessagePackSecurity edit is an unrelated weakening of a security limit.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | Duplicate int keys and duplicate string keys are no longer passed to Dictionary.Add. Only the first member with a given key is kept, so the analyzer no longer throws, and the existing MsgPack005 report still fires. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C2 | unverified | A member whose key kind (int or string) differs from the other members is skipped right after MsgPack005 is reported. This avoids the null dereference of `intKey!.Value` or `stringKey!` further down. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C6 | unverified | The change also edits deserialization depth limiting in MessagePackSecurity. That edit is not needed by the requirement and changes run-time security behavior. | (scope) | AI reading only | - | no |
| C7 | unverified | The README documents which analyzer rules do and do not apply to suppressed types. MsgPack012 is listed as reported, but no test covers it. | (scope) | AI reading only | - | no |
| C3 | backed | The analyzer tests check that suppressed types still get MsgPack004, MsgPack015, MsgPack003 and MsgPack005. They also check that no diagnostics (including MsgPack011/016/017) are reported for a valid suppressed type with private and init members. The diff does not show whether the 004/015/003 tests failed before the fix. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | - | no |
| C4 | backed | The execution tests check run-time behavior, not the analyzer. They confirm that no generated formatter exists for the suppressed type and that it round-trips through the standard (dynamic) resolver. | (scope) | static check | - | no |
| C5 | backed | No new analyzer rules, public API or wire-format changes are introduced; only existing diagnostic ids are used. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence medium):** Duplicate int keys and duplicate string keys are no longer passed to Dictionary.Add. Only the first member with a given key is kept, so the analyzer no longer throws, and the existing MsgPack005 report still fires.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` blocked by the machine (not evidence either way))

**C2 (unverified, behavior, author confidence medium):** A member whose key kind (int or string) differs from the other members is skipped right after MsgPack005 is reported. This avoids the null dereference of `intKey!.Value` or `stringKey!` further down.
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **AI reading only** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way))

**C6 (unverified, scope, author confidence high):** The change also edits deserialization depth limiting in MessagePackSecurity. That edit is not needed by the requirement and changes run-time security behavior.
- Lines: `MessagePackSecurity.cs` L231-236
- Checked by: **AI reading only**

**C7 (unverified, docs, author confidence medium):** The README documents which analyzer rules do and do not apply to suppressed types. MsgPack012 is listed as reported, but no test covers it.
- Lines: `README.md` L1620-1632
- Checked by: **AI reading only**

**C3 (backed, test, author confidence medium):** The analyzer tests check that suppressed types still get MsgPack004, MsgPack015, MsgPack003 and MsgPack005. They also check that no diagnostics (including MsgPack011/016/017) are reported for a valid suppressed type with private and init members. The diff does not show whether the 004/015/003 tests failed before the fix.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-78, `SuppressSourceGenerationAnalyzerTests.cs` L80-144, `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **static check** (test `MemberWithoutKeyIsReported` blocked by the machine (not evidence either way); test `AllowPrivateRequiredIsReported` blocked by the machine (not evidence either way); test `MemberTypeMustBeMessagePackObjectIsReported` blocked by the machine (not evidence either way); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` blocked by the machine (not evidence either way); static check S7 passed; static check S8 passed)

**C4 (backed, test, author confidence high):** The execution tests check run-time behavior, not the analyzer. They confirm that no generated formatter exists for the suppressed type and that it round-trips through the standard (dynamic) resolver.
- Lines: `SuppressedSourceGenerationTests.cs` L20-36
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**C5 (backed, scope, author confidence high):** No new analyzer rules, public API or wire-format changes are introduced; only existing diagnostic ids are used.
- Lines: `TypeCollector.cs` L1007-1008
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `MessagePackSecurity.cs` L233 | Changing `>=` to `>` is an off-by-one loosening of MaximumObjectGraphDepth. Untrusted payloads can now nest one level deeper than configured. This may break existing depth-limit tests or expectations, and it has nothing to do with the analyzer issue. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1008 | The new `continue` skips the rest of the per-member processing for a mixed-key member, including the formatter attribute and member type checks. Other diagnostics (e.g. MsgPack003) for that member will now be silently missing until the key is fixed. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1023 | Nothing in the diff ties these edits to SuppressSourceGeneration. If the 3.1.1 regression came from suppressed types being filtered out before analysis, this change does not address it. Only the MsgPack004/015/003 tests would show that, and the diff does not prove they failed before. | author (Claude) |
| F4 | low | `README.md` L1630 | The README says MsgPack012 (resolver accessibility) is reported for suppressed types, but no test verifies this. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Depth-limit comparison changed from `>=` to `>` in DepthStep; unrelated to the analyzer.
- `README.md`: New 'Opting out of source generation' documentation section describing analyzer behavior.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time round-trip tests; they do not exercise the analyzer.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed; existing ids mentioned: MsgPack004, MsgPack005, MsgPack015, MsgPack003, MsgPack012, MsgPack011, MsgPack016, MsgPack017 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | fail | deserialization or unsafe code changed in: src/MessagePack/MessagePackSecurity.cs L233 |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 10 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 171 blocked by the machine, 0 skipped (53s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: 171 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- 171 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

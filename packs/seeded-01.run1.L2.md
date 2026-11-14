# Evidence pack: REQ-2234 on `seeded-01`

> **REVIEW PARTLY INCOMPLETE: 2 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **breaker**: gave no verdict for claim(s) C6, C7, C1, C2, C3, C4, C5. Effect: those claims count as unchallenged and release nothing.

> Rebuilt offline from pack `0412d478e92c` (seeded-01.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 247 of 247 changed code lines (100%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 100%.

- 2 refusal(s) on honesty grounds need a human look.
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 247.
- Why lines stay: 149 passing test, but not upheld by the breaker; 44 no claim covers the line; 36 cited only by claims without a passing test; 17 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (17 changed lines): F1 author (Claude) (L1008); R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C6 has no passing test behind it; C6, C7 has no passing test behind it; F5 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): no claim covers these lines; C3 passed its tests but the breaker did not uphold it; C4 passed its tests but the breaker did not uphold it

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `1bbce7b636` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s) |
| Pack id | `c36398377fdd` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README section documenting analyzer rule applicability for SuppressSourceGeneration types | This is a user-visible statement of analyzer behavior beyond the bug fix. The human owner should confirm it is the intended contract, especially for MsgPack012, which is untested. | `README.md` | AI reading |
| R2 | honesty | The fix does not reference SuppressSourceGeneration, and the regression tests may not distinguish fixed from broken behavior | It is unclear whether the changed lines address the reported 3.1.0 to 3.1.1 regression. The owner should confirm the tests fail without the TypeCollector change. | `TypeCollector.cs` | AI reading |

## 3. The story
Changes how TypeCollector handles bad keys. After reporting a mixed int/string key diagnostic, it now skips that member with `continue` (lines 1008, 1148). It also stops adding a second member with an already-used int or string key, using a ContainsKey guard (lines 1023-1026, 1039-1042, 1163-1166). Previously these paths could throw: `intKey!.Value` was read with a null key, and Dictionary.Add threw on a duplicate key. The change adds analyzer tests for `SuppressSourceGeneration = true` types, a runtime round-trip execution test, and a README section describing which diagnostics apply to suppressed types.

**Why:** Issue #2234: since 3.1.1 the analyzer stops reporting diagnostics on `[MessagePackObject(SuppressSourceGeneration = true)]` types. The diff's implied root cause is that the analyzer threw while collecting members with bad keys.

**Touches beyond the requirement:**
- README.md gains a new user-facing 'Opting out of source generation' section. It promises which rules do and do not fire for suppressed types.
- A new execution test checks runtime serialization of a suppressed type through the dynamic resolver. This is not analyzer behavior.
- The crash fixes also change behavior for ordinary, non-suppressed [MessagePackObject] types (see DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes).

**How sure (the author's own view; it moves nothing):** High that the edited lines remove specific throw paths: a null `intKey!.Value` and a duplicate-key Dictionary.Add. Medium-to-low that this is the actual cause of #2234. No line in the diff mentions SuppressSourceGeneration, and the visible lines do not show why suppressed types were affected and generated types were not. The unchanged code that decides whether suppressed types are analyzed at all is not visible.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C6 | unverified | The change goes beyond the analyzer fix. It adds README documentation of rule applicability, including MsgPack012, which has no test here. It also adds a runtime execution test of dynamic-resolver serialization. | (scope) | AI reading only | - | no |
| C7 | unverified | The README states that suppressed types are serialized by reflection-based dynamic resolvers and that no formatter is generated. The execution tests check both statements. | (scope) | AI reading only | - | no |
| C1 | backed | After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. It therefore no longer reaches `intKey!.Value` or `stringKey!` with a null key, in both the property/field path and the second (field) path. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | no |
| C2 | backed | A duplicate int or string key no longer causes Dictionary.Add to throw. The first member with a key is kept and later duplicates are not added. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | no |
| C3 | backed | The analyzer reports MsgPack004, MsgPack015 and MsgPack003 on types marked SuppressSourceGeneration = true. This is backed only by tests; no production line in the diff enables analysis of suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | no |
| C4 | backed | The new analyzer tests exercise the requirement directly: each puts SuppressSourceGeneration = true on the type and expects specific diagnostics. Whether they failed before this change is not shown. The no-diagnostics test (SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed) would also pass if the analyzer ignored suppressed types entirely, so it does not prove the fix. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | no |
| C5 | backed | No public API, analyzer rule descriptors or wire format are changed. | (scope) | static check | - | no |

**C6 (unverified, scope, author confidence high):** The change goes beyond the analyzer fix. It adds README documentation of rule applicability, including MsgPack012, which has no test here. It also adds a runtime execution test of dynamic-resolver serialization.
- Lines: `README.md` L1620-1632, `SuppressedSourceGenerationTests.cs` L1-37
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)

**C7 (unverified, docs, author confidence medium):** The README states that suppressed types are serialized by reflection-based dynamic resolvers and that no formatter is generated. The execution tests check both statements.
- Lines: `README.md` L1622-1623, `SuppressedSourceGenerationTests.cs` L20-36
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)

**C1 (backed, behavior, author confidence high):** After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. It therefore no longer reaches `intKey!.Value` or `stringKey!` with a null key, in both the property/field path and the second (field) path.
- Lines: `TypeCollector.cs` L1005-1008, `TypeCollector.cs` L1145-1148
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence high):** A duplicate int or string key no longer causes Dictionary.Add to throw. The first member with a key is kept and later duplicates are not added.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, test, author confidence medium):** The analyzer reports MsgPack004, MsgPack015 and MsgPack003 on types marked SuppressSourceGeneration = true. This is backed only by tests; no production line in the diff enables analysis of suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-78
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C4 (backed, test, author confidence medium):** The new analyzer tests exercise the requirement directly: each puts SuppressSourceGeneration = true on the type and expects specific diagnostics. Whether they failed before this change is not shown. The no-diagnostics test (SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed) would also pass if the analyzer ignored suppressed types entirely, so it does not prove the fix.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144, `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S7 passed; static check S8 passed)

**C5 (backed, scope, author confidence high):** No public API, analyzer rule descriptors or wire format are changed.
- Lines: `TypeCollector.cs` L1004-1043
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | No changed line refers to SuppressSourceGeneration. The fix is a generic crash guard that also applies to generated types. The diff does not explain why 3.1.0 worked and 3.1.1 broke only for suppressed types. If the regression is an early return or skip for suppressed types elsewhere, that code is untouched. MemberWithoutKeyIsReported and the similar tests would then still fail, or they already pa | author (Claude) |
| F2 | low | `TypeCollector.cs` L1148 | `continue` after the mixed-key diagnostic skips the rest of the per-member processing for that member. That includes the formatter-attribute lookup and, possibly, member-type checks such as MsgPack003. Some other diagnostics on that member may no longer be reported. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | Duplicate int keys are now dropped silently at the point of insertion. This is safe only if a MsgPack005 diagnostic is reported for the duplicate elsewhere; that check is outside the visible hunk (lines 1012-1018). If it is not reported, the generator could emit a formatter missing a member without any error. The tests expect MsgPack005, which suggests it is reported. | author (Claude) |
| F4 | low | `README.md` L1630 | The README promises that MsgPack012 is reported for suppressed types, but no test in the diff covers MsgPack012 on a suppressed type. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New user-facing documentation section listing which analyzer rules apply to suppressed types. Not required to fix the bug.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime serialization tests for a suppressed type. These cover dynamic resolver behavior, not the analyzer regression.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: breaker: gave no verdict for claim(s) C6, C7, C1, C2, C3, C4, C5. Effect: those claims count as unchallenged and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

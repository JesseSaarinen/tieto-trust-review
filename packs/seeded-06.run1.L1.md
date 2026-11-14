# Evidence pack: REQ-2234 on `seeded-06`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `48848866a7a8` (seeded-06.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 81 of 252 changed code lines (32%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 36%.

- 2 refusal(s) on honesty grounds need a human look.
- Evidence took 171 of 252 changed code lines off the list (C3, C1, C2, C4: tests found passing in the real run; breaker removed for this measurement). 81 stay with the owner.
- Why lines stay: 43 no claim covers the line; 37 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` whole file diff (37 changed lines): F4 author (Claude) (L23); F6 test run (L23); R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008 (1 of 22 changed lines): F1 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L145-167, L193 (43 of 193 changed lines): no claim covers these lines

**Not required to read:**
- 171 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C2, C1, C3, C4

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `40727e4936` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s) |
| Pack id | `10ae77e4db78` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test `NoFormatterIsGeneratedForSuppressedType` asserts only that the resolver singleton exists. | The test name claims to verify that no formatter is generated, but the assertion checks nothing related to that claim. | `SuppressedSourceGenerationTests.cs` | AI reading |
| R2 | honesty | README documents which analyzer rules do and do not fire for suppressed types. | This goes beyond the bug fix and makes user-facing promises (for example MsgPack012) that the change does not demonstrate. | `README.md` | AI reading |

## 3. The story
The change hardens `TypeCollector` so collecting members no longer throws on bad key layouts. After reporting a mixed int/string key diagnostic it now skips the member (lines 1008 and 1148). It also stops calling `Dictionary.Add` for a key that is already present (1023-1026, 1039-1042, 1163-1166, 1179-1182). It adds analyzer tests and run-time round-trip tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, plus a README section that lists which diagnostics apply to suppressed types.

**Why:** REQ-2234 says analyzer diagnostics stop appearing for types marked `SuppressSourceGeneration = true` (a regression since 3.1.1). The implied root cause is that the collector threw an exception on these code paths (duplicate keys, or `intKey!.Value` on a null key after a mixed-key diagnostic), which killed the analyzer. The diff never shows how `SuppressSourceGeneration` itself is handled, so the link between this fix and the reported regression is inferred, not shown.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that documents analyzer behavior, including MsgPack012 and MsgPack011/016/017 claims that no test in the diff exercises (MsgPack012), or that the diff only checks as absent (011/016/017).
- The `TypeCollector` changes also apply to normal (non-suppressed) source-generated types. A member with a duplicate key or mismatched key kind is now silently dropped from the collected model instead of throwing.

**How sure (the author's own view; it moves nothing):** Medium that the collector no longer crashes on duplicate or mixed keys. The guards are simple and the new tests target those cases. Low-to-medium that this is the actual fix for REQ-2234. No changed line references `SuppressSourceGeneration`, and nothing shows these tests failed before the change. The execution test `NoFormatterIsGeneratedForSuppressedType` asserts nothing about formatter absence.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C7 | unverified | The README documents which analyzer checks apply to suppressed types. | (scope) | AI reading only | - | no |
| C3 | backed | The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported for `SuppressSourceGeneration = true` types. This is the user-visible symptom in the requirement. Nothing in the diff shows these tests failed before the change, so whether they reproduce the regression is unverified. | "The analyzer does not work if SuppressSourceGeneration = true. This has happened since ver…" | test run | - | yes |
| C1 | backed | After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. This avoids dereferencing a null `intKey`/`stringKey` further down. It is done in both the property and field loops. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | Duplicate int keys and duplicate string keys no longer cause `Dictionary.Add` to throw. The first member with a key wins, and later duplicates are not added. This is done in both the property and field loops. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C4 | backed | MsgPack011, MsgPack016 and MsgPack017 are expected to be absent for a suppressed, non-partial type that has a private member and an init property. The test only shows that no diagnostic is emitted for this one input. | (scope) | test run | - | yes |
| C5 | backed | A suppressed type still round-trips through the dynamic resolver using `MessagePackSerializerOptions.Standard`. | (scope) | static check | - | no |
| C6 | backed | Scope: no public API, wire format, analyzer rule descriptors or untrusted-input handling are changed. The code change is confined to member collection in `TypeCollector`, but it affects all source-generated types, not only suppressed ones. | (scope) | test run | - | yes |

**C7 (unverified, docs, author confidence medium):** The README documents which analyzer checks apply to suppressed types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C3 (backed, test, author confidence medium):** The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported for `SuppressSourceGeneration = true` types. This is the user-visible symptom in the requirement. Nothing in the diff shows these tests failed before the change, so whether they reproduce the regression is unverified.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C1 (backed, behavior, author confidence medium):** After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. This avoids dereferencing a null `intKey`/`stringKey` further down. It is done in both the property and field loops.
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence medium):** Duplicate int keys and duplicate string keys no longer cause `Dictionary.Add` to throw. The first member with a key wins, and later duplicates are not added. This is done in both the property and field loops.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C4 (backed, test, author confidence medium):** MsgPack011, MsgPack016 and MsgPack017 are expected to be absent for a suppressed, non-partial type that has a private member and an init property. The test only shows that no diagnostic is emitted for this one input.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case))

**C5 (backed, test, author confidence high):** A suppressed type still round-trips through the dynamic resolver using `MessagePackSerializerOptions.Standard`.
- Lines: `SuppressedSourceGenerationTests.cs` L26-36
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S5 passed)

**C6 (backed, scope, author confidence high):** Scope: no public API, wire format, analyzer rule descriptors or untrusted-input handling are changed. The code change is confined to member collection in `TypeCollector`, but it affects all source-generated types, not only suppressed ones.
- Lines: `TypeCollector.cs` L1004-1045, `TypeCollector.cs` L1144-1185
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)

**Requirement coverage:** 2 of 2 requirement sentences are quoted by a claim.

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | None of the changed lines mention `SuppressSourceGeneration`. The fix assumes the 3.1.1 regression was an exception thrown during member collection, but the diff does not show this. If suppressed types are skipped or short-circuited somewhere else (for example, an early return before member analysis), the reported bug would remain. The new analyzer tests would show that only if they were confirmed | author (Claude) |
| F2 | low | `TypeCollector.cs` L1008 | `continue` skips every later per-member step for the mixed-key member. That includes the `[MessagePackFormatter]` lookup and member-type validation (MsgPack003) further down. As a result, diagnostics on that member may now be hidden until the key issue is fixed. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1039 | A `stringMembers.ContainsKey(stringKey!)` check already exists just above (lines 1030/1170), so the new guard may be redundant, or that branch may not `continue`. With the new guard, a duplicate member is silently dropped from the collected model for generated types. That is acceptable only if the duplicate diagnostic is always an error that blocks the build. | author (Claude) |
| F4 | medium | `SuppressedSourceGenerationTests.cs` L23 | `NoFormatterIsGeneratedForSuppressedType` only asserts that `GeneratedMessagePackResolver.Instance` is not null. It does not check that no formatter was generated for `SuppressedSourceGenerationType`, so the test name overstates what is checked. | author (Claude) |
| F5 | low | `README.md` L1630 | The README says MsgPack012 (accessibility) is reported for suppressed types, but no test in the diff covers that case. | author (Claude) |
| F6 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: A new documentation section describing analyzer behavior for suppressed types. The requirement does not ask for it, and it commits to behavior (MsgPack011/012/016/017) that is only partly tested.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time round-trip tests for the dynamic resolver. These do not exercise the analyzer that the requirement is about.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

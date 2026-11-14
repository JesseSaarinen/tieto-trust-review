# Evidence pack: REQ-2234 on `seeded-06`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `48848866a7a8` (seeded-06.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 206 of 252 changed code lines (82%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 83%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- Evidence took 46 of 252 changed code lines off the list (C1, C2, C4: tests found passing in the real run, claim upheld by the breaker). 206 stay with the owner.
- Why lines stay: 124 claim disputed; 43 no claim covers the line; 37 refused; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` whole file diff (37 changed lines): F5 author (Claude) (L23); F7 breaker (Gemini) (L23); F10 test run (L23); R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008 (1 of 22 changed lines): F2 author (Claude)
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-167, L193 (168 of 193 changed lines): no claim covers these lines; claim C3 disputed; F1 breaker (Gemini)

**Not required to read:**
- 46 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C1, C4

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `40727e4936` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s) |
| Pack id | `ac61b15155ee` |

## 1. Disputed claims (1)
**C3 (DISPUTED, test, author confidence medium):** The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported for `SuppressSourceGeneration = true` types. This is the user-visible symptom in the requirement. Nothing in the diff shows these tests failed before the change, so whether they reproduce the regression is unverified.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **disputed**: All production changes in the diff are shown in full (TypeCollector.cs +18/-4), contradicting 'Nothing in the diff shows these tests failed before the change' in both directions: (1) for the three MsgPack005 tests (SuppressSourceGenerationAnalyzerTests.cs lines 80-144), TypeCollector.cs directly shows they did fail before the change because unconditional intMembers.Add/stringMembers.Add (lines 1023 and 1039) threw ArgumentException on duplicate keys and missing continue (line 1008) fell through to intKey!.Value (line 1019) throwing InvalidOperationException on mixed keys, causing AD0001 analyzer failure; (2) for the MsgPack004, MsgPack015, and MsgPack003 tests (lines 20-78), each input has at most one keyed member and never hits any branch modified in TypeCollector.cs, proving this change does not alter their behavior and only addresses REQ-2234 when duplicate or mixed keys crash TypeCollector.


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
| C3 | DISPUTED | The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported for `SuppressSourceGeneration = true` types. This is the user-visible symptom in the requirement. Nothing in the diff shows these tests failed before the change, so whether they reproduce the regression is unverified. | "The analyzer does not work if SuppressSourceGeneration = true. This has happened since ver…" | test run | disputed | no |
| C7 | unverified | The README documents which analyzer checks apply to suppressed types. | (scope) | AI reading only | cannot_tell | no |
| C1 | backed | After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. This avoids dereferencing a null `intKey`/`stringKey` further down. It is done in both the property and field loops. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C2 | backed | Duplicate int keys and duplicate string keys no longer cause `Dictionary.Add` to throw. The first member with a key wins, and later duplicates are not added. This is done in both the property and field loops. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C4 | backed | MsgPack011, MsgPack016 and MsgPack017 are expected to be absent for a suppressed, non-partial type that has a private member and an init property. The test only shows that no diagnostic is emitted for this one input. | (scope) | test run | upheld | yes |
| C5 | backed | A suppressed type still round-trips through the dynamic resolver using `MessagePackSerializerOptions.Standard`. | (scope) | static check | cannot_tell | no |
| C6 | backed | Scope: no public API, wire format, analyzer rule descriptors or untrusted-input handling are changed. The code change is confined to member collection in `TypeCollector`, but it affects all source-generated types, not only suppressed ones. | (scope) | test run | upheld | yes |

**C7 (unverified, docs, author confidence medium):** The README documents which analyzer checks apply to suppressed types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **cannot_tell**: README.md lines 1620-1633 lists MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012 as validated and MsgPack011, MsgPack016, and MsgPack017 as suppressed, but the analyzer/collector branching on SuppressSourceGeneration is not shown in the diff and MsgPack012 (line 1630) has no test in SuppressSourceGenerationAnalyzerTests.cs, so the diff alone cannot confirm that the documented rule set matches actual analyzer behavior.

**C1 (backed, behavior, author confidence medium):** After reporting DoNotMixStringAndIntKeys, the collector now skips the offending member. This avoids dereferencing a null `intKey`/`stringKey` further down. It is done in both the property and field loops.
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1005-1009 (property loop, using isWritable/isReadable/isInitOnly at line 1019) and lines 1145-1149 (field loop, using !item.IsReadOnly at line 1159). Both add continue immediately after reporting DoNotMixStringAndIntKeys, preventing fallthrough to intKey!.Value (lines 1019 and 1159) or stringMembers.ContainsKey(stringKey!) (line 1170). MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 125-144) covers the property-loop path.

**C2 (backed, behavior, author confidence medium):** Duplicate int keys and duplicate string keys no longer cause `Dictionary.Add` to throw. The first member with a key wins, and later duplicates are not added. This is done in both the property and field loops.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked all four Dictionary.Add sites in TypeCollector.cs (lines 1023-1026 and 1039-1042 for properties; lines 1163-1166 and 1179-1182 for fields). Each is now guarded by !ContainsKey, so the first member for a given int or string key is kept and subsequent duplicates do not throw ArgumentException. SuppressSourceGenerationAnalyzerTests.cs lines 81-122 and 147-166 exercise duplicate int and string keys on properties.

**C4 (backed, test, author confidence medium):** MsgPack011, MsgPack016 and MsgPack017 are expected to be absent for a suppressed, non-partial type that has a private member and an init property. The test only shows that no diagnostic is emitted for this one input.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case))
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 169-192. The test defines a non-partial class with AllowPrivate = true, SuppressSourceGeneration = true, a private field, and an init property, and runs VerifyCS.Test expecting zero diagnostics. The claim accurately states both the intended coverage and the limitation that it only verifies absence of diagnostics on this single input.

**C5 (backed, test, author confidence high):** A suppressed type still round-trips through the dynamic resolver using `MessagePackSerializerOptions.Standard`.
- Lines: `SuppressedSourceGenerationTests.cs` L26-36
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S5 passed)
- Breaker: **cannot_tell**: SuppressedSourceGenerationTests.cs lines 27-36 round-trips SuppressedSourceGenerationType using MessagePackSerializerOptions.Standard, which checks source-generated formatters before falling back to DynamicObjectResolver. Because the generator's SuppressSourceGeneration filtering is not in the diff and NoFormatterIsGeneratedForSuppressedType (line 23) only checks Assert.NotNull(GeneratedMessagePackResolver.Instance) without asserting GetFormatter<SuppressedSourceGenerationType>() is null, the diff alone does not prove the round-trip used the dynamic resolver rather than a generated formatter.

**C6 (backed, scope, author confidence high):** Scope: no public API, wire format, analyzer rule descriptors or untrusted-input handling are changed. The code change is confined to member collection in `TypeCollector`, but it affects all source-generated types, not only suppressed ones.
- Lines: `TypeCollector.cs` L1004-1045, `TypeCollector.cs` L1144-1185
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)
- Breaker: **upheld**: Checked all 4 changed files and static checks S3-S6: no public API, wire format, analyzer descriptors, or runtime reader code changed. All production edits are in TypeCollector.cs member collection (lines 1008, 1023-1026, 1039-1042, 1148, 1163-1166, 1179-1182) with no SuppressSourceGeneration guard, and DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (SuppressSourceGenerationAnalyzerTests.cs lines 147-166) verifies non-suppressed types are also affected.

**Requirement coverage:** 2 of 2 requirement sentences are quoted by a claim.

## 5. Findings (10)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `SuppressSourceGenerationAnalyzerTests.cs` L21 | Claim C3 disputed: All production changes in the diff are shown in full (TypeCollector.cs +18/-4), contradicting 'Nothing in the diff shows these tests failed before the change' in both directions: (1) for the three MsgPack005 tests (SuppressSourceGenerationAnalyzerTests.cs lines 80-144), TypeCollector.cs directly shows they did fail before the change because unconditional intMembers.Add/stringMem | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1008 | None of the changed lines mention `SuppressSourceGeneration`. The fix assumes the 3.1.1 regression was an exception thrown during member collection, but the diff does not show this. If suppressed types are skipped or short-circuited somewhere else (for example, an early return before member analysis), the reported bug would remain. The new analyzer tests would show that only if they were confirmed | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | `continue` skips every later per-member step for the mixed-key member. That includes the `[MessagePackFormatter]` lookup and member-type validation (MsgPack003) further down. As a result, diagnostics on that member may now be hidden until the key issue is fixed. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1039 | A `stringMembers.ContainsKey(stringKey!)` check already exists just above (lines 1030/1170), so the new guard may be redundant, or that branch may not `continue`. With the new guard, a duplicate member is silently dropped from the collected model for generated types. That is acceptable only if the duplicate diagnostic is always an error that blocks the build. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | `NoFormatterIsGeneratedForSuppressedType` only asserts that `GeneratedMessagePackResolver.Instance` is not null. It does not check that no formatter was generated for `SuppressedSourceGenerationType`, so the test name overstates what is checked. | author (Claude) |
| F6 | low | `README.md` L1630 | The README says MsgPack012 (accessibility) is reported for suppressed types, but no test in the diff covers that case. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | NoFormatterIsGeneratedForSuppressedType only asserts Assert.NotNull(GeneratedMessagePackResolver.Instance) and never asserts Assert.Null(GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>()). If SuppressSourceGeneration = true regresses and emits a formatter, both tests in SuppressedSourceGenerationTests.cs will still pass. | breaker (Gemini) |
| F8 | low | `TypeCollector.cs` L1148 | The field-loop fixes in TypeCollector.cs (mixed keys at line 1148, duplicate int keys at lines 1163-1166, and duplicate string keys at lines 1179-1182) have no test coverage in SuppressSourceGenerationAnalyzerTests.cs, where all duplicate-key and mixed-key test cases (lines 81-166) only declare properties. | breaker (Gemini) |
| F9 | low | `README.md` L1630 | README.md claims MsgPack012 is still reported for SuppressSourceGeneration = true types, but SuppressSourceGenerationAnalyzerTests.cs has no test verifying MsgPack012 is emitted when source generation is suppressed. | breaker (Gemini) |
| F10 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

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

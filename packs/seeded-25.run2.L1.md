# Evidence pack: REQ-2234 on `seeded-25`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `5034485359b1` (seeded-25.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 73 of 251 changed code lines (29%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 33%.

- 2 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 178 of 251 changed code lines off the list (C2, C3, C6, C7, C8, C9, C10, C11: tests found passing in the real run; breaker removed for this measurement). 73 stay with the owner.
- Why lines stay: 42 cited only by claims without a passing test; 11 claim rests on AI reading only; 10 refused; 8 no claim covers the line; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1148, L1163-1166, L1179-1182 (12 of 22 changed lines): F1 author (Claude); claim C4 only AI-read; claim C5 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-36 (36 of 36 changed lines): C13 has no passing test behind it; F7 test run; no claim covers these lines; R1 honesty (AI-suggested); F5 author (Claude); C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L145, L167, L193 (25 of 193 changed lines): C12 has no passing test behind it; no claim covers these lines

**Not required to read:**
- 178 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C2, C3, C6, C7, C8, C9, C10, C11

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `7ca1e1c562` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (73s) |
| Pack id | `dbccdd402b8a` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The round-trip test asserts only that the result is non-null. | The test is named for correct round-tripping but checks almost nothing. | `SuppressedSourceGenerationTests.cs` L26-35 | AI reading |
| R2 | honesty | The README documents an analyzer rule contract (which rules fire for suppressed types), including MsgPack012, which is untested. | This goes beyond the bug fix and commits to user-visible analyzer behaviour. | `README.md` L1620-1633 | AI reading |

## 3. The story
Four changes. First, in TypeCollector, the two member-collection loops now `continue` after reporting the mixed int/string key diagnostic. Second, the same loops skip the dictionary `Add` when a duplicate int or string key is already present, instead of throwing. Third, new analyzer tests check that `[MessagePackObject(SuppressSourceGeneration = true)]` types still get MsgPack004, MsgPack015, MsgPack003 and MsgPack005, and do not get MsgPack011, MsgPack016 or MsgPack017. Fourth, there are new execution tests and a README section that documents the behaviour.

**Why:** Issue 2234 says the analyzer stopped reporting anything for suppressed types after 3.1.1. The code change hardens the collector against two crashes. One is `Dictionary.Add` throwing on a duplicate key. The other is `intKey!.Value` running when the key kinds are mixed. An analyzer exception would silence all diagnostics. None of the visible source hunks mentions SuppressSourceGeneration, so it is not shown how this fix connects to the reported regression.

**Touches beyond the requirement:**
- The crash hardening (continue, plus guarded Add) applies to all [MessagePackObject] types, not only suppressed ones.
- A README section documents which analyzer rules apply to suppressed types, including MsgPack012, which no test covers.
- An execution test checks round-tripping through the dynamic resolver.

**How sure (the author's own view; it moves nothing):** High that the guarded Adds and the `continue` prevent the specific exceptions. Medium-to-low that this alone fixes the reported regression: no visible hunk touches a SuppressSourceGeneration skip, so the analyzer tests are the only evidence that diagnostics now fire for suppressed types. The round-trip execution test is weak; it only asserts non-null.

## 4. Claims (16)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The second member loop (near line 1144) gets the same `continue` after the mixed-key diagnostic. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C5 | unverified | The second member loop gets the same duplicate-key guards for its int and string member dictionaries. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C12 | unverified | The test file header (usings, VerifyCS alias, Preamble constant) is shared setup for the analyzer tests. | (scope) | AI reading only | - | no |
| C16 | unverified | README gains an "Opting out of source generation" section listing the rules that apply and do not apply to suppressed types. | (scope) | AI reading only | - | no |
| C1 | backed | In the first member loop (fields/properties path near line 1004), after DoNotMixStringAndIntKeys is reported for a member whose key kind does not match, that member is skipped. This avoids `intKey!.Value` on a null key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | In the first member loop, an int key that is already present is not added again, so `Dictionary.Add` no longer throws ArgumentException on duplicate int keys. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | In the first member loop, a string key that is already present is not added again, so `Dictionary.Add` no longer throws on duplicate string keys. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C6 | backed | Test MemberWithoutKeyIsReported expects MsgPack004 on an un-keyed member of a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C7 | backed | Test AllowPrivateRequiredIsReported expects MsgPack015 on a suppressed type that has a keyed private field and no AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported expects MsgPack003 on a suppressed type's member whose type is not serializable. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C9 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure expect MsgPack005 on suppressed types without an analyzer exception. The test verifier fails on unexpected AD0001 diagnostics. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C10 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate-key hardening on a normal (non-suppressed) type. | (scope) | test run | - | yes |
| C11 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics on a suppressed type that is non-partial, has a private member with AllowPrivate, and has an init property with an initializer. This means MsgPack011, MsgPack016 and MsgPack017 are not reported. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C13 | backed | Test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver returns no formatter for the suppressed type, which is declared at lines 8-16. | (scope) | static check | - | no |
| C14 | backed | Test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type. It only asserts that the result is non-null and does not check field values. | (scope) | static check | - | no |
| C15 | backed | Scope: no public API, wire format, or analyzer rule descriptors change. The source change is limited to the two member loops in TypeCollector. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence medium):** The second member loop (near line 1144) gets the same `continue` after the mixed-key diagnostic.
- Lines: `TypeCollector.cs` L1145-1149
- Checked by: **AI reading only**

**C5 (unverified, behavior, author confidence medium):** The second member loop gets the same duplicate-key guards for its int and string member dictionaries.
- Lines: `TypeCollector.cs` L1162-1166, `TypeCollector.cs` L1178-1182
- Checked by: **AI reading only**

**C12 (unverified, test, author confidence high):** The test file header (usings, VerifyCS alias, Preamble constant) is shared setup for the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **AI reading only**

**C16 (unverified, docs, author confidence medium):** README gains an "Opting out of source generation" section listing the rules that apply and do not apply to suppressed types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** In the first member loop (fields/properties path near line 1004), after DoNotMixStringAndIntKeys is reported for a member whose key kind does not match, that member is skipped. This avoids `intKey!.Value` on a null key.
- Lines: `TypeCollector.cs` L1005-1009
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence high):** In the first member loop, an int key that is already present is not added again, so `Dictionary.Add` no longer throws ArgumentException on duplicate int keys.
- Lines: `TypeCollector.cs` L1022-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, behavior, author confidence high):** In the first member loop, a string key that is already present is not added again, so `Dictionary.Add` no longer throws on duplicate string keys.
- Lines: `TypeCollector.cs` L1038-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))

**C6 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported expects MsgPack004 on an un-keyed member of a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported expects MsgPack015 on a suppressed type that has a keyed private field and no AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported expects MsgPack003 on a suppressed type's member whose type is not serializable.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence medium):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure expect MsgPack005 on suppressed types without an analyzer exception. The test verifier fails on unexpected AD0001 diagnostics.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence high):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate-key hardening on a normal (non-suppressed) type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)

**C11 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics on a suppressed type that is non-partial, has a private member with AllowPrivate, and has an init property with an initializer. This means MsgPack011, MsgPack016 and MsgPack017 are not reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)

**C13 (backed, test, author confidence high):** Test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver returns no formatter for the suppressed type, which is declared at lines 8-16.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)

**C14 (backed, test, author confidence high):** Test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type. It only asserts that the result is non-null and does not check field values.
- Lines: `SuppressedSourceGenerationTests.cs` L26-36
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**C15 (backed, scope, author confidence high):** Scope: no public API, wire format, or analyzer rule descriptors change. The source change is limited to the two member loops in TypeCollector.
- Lines: `TypeCollector.cs` L1004-1042
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | No visible hunk references SuppressSourceGeneration. If the 3.1.1 regression came from an early return or skip for suppressed types elsewhere, this diff does not remove it. The crash hardening would then not explain why MsgPack004, MsgPack015 and MsgPack003 now fire for suppressed types. The owner should confirm that the analyzer tests actually pass and fail without the change. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1008 | The `continue` skips every later check for that member, including the formatter attribute lookup and member-type validation such as MsgPack003. Further diagnostics on a mixed-key member are therefore lost. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | The duplicate int-key member is dropped silently. This relies on a duplicate-key diagnostic having been reported earlier in a check that is not visible in the diff, so it cannot be verified here that the int path reports one. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1145 | The second loop's changes (lines 1145-1182) are not exercised by any new test. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L34 | The round-trip test only asserts NotNull. It would pass even if Id or Name were lost, so it does not verify correct serialization. | author (Claude) |
| F6 | low | `README.md` L1630 | The README claims MsgPack012 is still reported for suppressed types, but no test covers that. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: A new documentation section describing the opt-out behaviour and which rules apply; the bug report did not ask for this.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Execution tests for dynamic-resolver round-tripping, which is runtime behaviour rather than the analyzer.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The crash hardening also changes behaviour for non-suppressed (generated) types.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (73s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

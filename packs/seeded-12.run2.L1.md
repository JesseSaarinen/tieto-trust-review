# Evidence pack: REQ-2234 on `seeded-12`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `6d6948156a86` (seeded-12.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 86 of 252 changed code lines (34%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 38%.

- 2 refusal(s) on honesty grounds need a human look.
- 3 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 166 of 252 changed code lines off the list (C7, C8, C9, C10, C11, C12, C13, C14: tests found passing in the real run; breaker removed for this measurement). 86 stay with the owner.
- Why lines stay: 53 cited only by claims without a passing test; 22 refused; 10 no claim covers the line; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (22 of 22 changed lines): R2 honesty (AI-suggested); F1 author (Claude); claim C4 only AI-read; claim C5 only AI-read; claim C6 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C16 has no passing test behind it; F5 test run; no claim covers these lines; C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L101, L123, L145, L167, L193 (27 of 193 changed lines): C15 has no passing test behind it; no claim covers these lines

**Not required to read:**
- 166 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C11, C12, C13, C7, C8, C9, C10, C14

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `110e9375a5` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (64s) |
| Pack id | `57e1f7fe9a6b` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README asserts analyzer behaviour for suppressed types that this change neither implements nor tests in full: MsgPack012 has no test, and the MsgPack011/016/017 exemption comes from pre-existing code. | This documentation goes beyond the requirement and makes user-facing promises that the owner should confirm. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | The fix is not conditioned on SuppressSourceGeneration and changes duplicate-key and mixed-key handling for all types, including dropping duplicate members silently. | It is unclear whether this addresses the reported root cause or a different crash. Behaviour for normally generated types changes too. | `TypeCollector.cs` L1004-1183 | AI reading |

## 3. The story
The change stops the analyzer from crashing on a [MessagePackObject] type that has duplicate keys or mixes int and string keys. In TypeCollector, after the mixed-key diagnostic is reported the offending member is now skipped with `continue`. The int and string member dictionaries are also guarded with ContainsKey before Add, so a duplicate key no longer throws. Both the property loop and the field loop get the same edits. New analyzer tests check that several diagnostics (MsgPack003/004/005/015) still appear on SuppressSourceGeneration = true types, and that MsgPack011/016/017 do not. New execution tests check that a suppressed type gets no generated formatter but still round-trips. A README section documents the opt-out.

**Why:** Issue 2234 says the analyzer stopped working for SuppressSourceGeneration = true types in 3.1.1. The apparent theory is that an exception inside TypeCollector (Dictionary.Add on a duplicate key, or `intKey!.Value` / a null string key on mixed keys) aborts analysis. Nothing in the diff is conditioned on SuppressSourceGeneration, so the fix applies to every MessagePackObject type.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that lists analyzer behaviour, including MsgPack012, which no test covers
- Execution tests check run-time serialization and the absence of a generated formatter, not the analyzer
- The TypeCollector edits change behaviour for normal (generated) types as well as suppressed ones

**How sure (the author's own view; it moves nothing):** High that the crash-avoidance edits in the property loop are exercised by the new duplicate-key and mixed-key tests. The field-loop edits (lines 1148, 1163-1182) are not exercised by any test. Medium-low that this is the actual root cause of issue 2234: the diff never mentions SuppressSourceGeneration in source code. The tests for MsgPack004/015/003 on suppressed types may already have passed before the change.

## 4. Claims (19)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | In the field loop, a member with a mismatched key kind is skipped after the DoNotMixStringAndIntKeys diagnostic, mirroring C1. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C5 | unverified | In the field loop, a duplicate int key no longer throws from Dictionary.Add. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C6 | unverified | In the field loop, a duplicate string key no longer throws from Dictionary.Add. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C15 | unverified | The analyzer test file setup is lines 1-18: usings, the VerifyCS alias that binds MsgPack00xMessagePackAnalyzer with MessagePackCodeFixProvider, and a Preamble that adds `using MessagePack;`. | (scope) | AI reading only | - | no |
| C18 | unverified | README documents that suppressed types are still validated (MsgPack004/005/015/003/012) and are exempt from MsgPack011/016/017. MsgPack005 here covers duplicate keys only, not the mixed-key case. MsgPack012 has no accompanying test. | (scope) | AI reading only | - | no |
| C1 | backed | In the property loop, when a member's key kind differs from the earlier members, the analyzer still reports DoNotMixStringAndIntKeys. It then skips the member with `continue`, instead of reaching `intKey!.Value` with a null int key or building a member from a null string key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | In the property loop, a duplicate int key no longer throws from Dictionary.Add. The first member with that key is kept and later ones are dropped. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | In the property loop, a duplicate string key no longer throws from Dictionary.Add. The first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C7 | backed | The test DuplicateIntKeysAreReportedWithoutAnalyzerFailure checks that a suppressed type with two [Key(0)] properties produces exactly the MsgPack005 diagnostic and no analyzer exception. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C8 | backed | The test DuplicateStringKeysAreReportedWithoutAnalyzerFailure checks that a suppressed type with duplicate string keys produces MsgPack005 and no analyzer exception. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C9 | backed | The test MixedKeyKindsAreReportedWithoutAnalyzerFailure checks that a suppressed type mixing int and string keys produces MsgPack005 on the offending property and no analyzer exception. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C10 | backed | The test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-key handling applies to a normal (non-suppressed) [MessagePackObject] type. | (scope) | test run | - | yes |
| C11 | backed | The test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a suppressed type whose member has no [Key]. It does not depend on the TypeCollector edits. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C12 | backed | The test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed field and no AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C13 | backed | The test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported on a suppressed type whose member type is not serializable. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C14 | backed | The test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that a non-partial suppressed type with a private member and an init property gets no diagnostics, so MsgPack011/016/017 are not reported. This relies on existing analyzer code, not on lines changed here. | (scope) | test run | - | yes |
| C16 | backed | The test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for a SuppressSourceGeneration = true type, which is declared in the same file. | (scope) | static check | - | no |
| C17 | backed | The test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type serializes and deserializes with Standard options, preserving Id and Name. | (scope) | static check | - | no |
| C19 | backed | Scope: no rule descriptors, public API or wire-format code are changed. The source edits are not gated on SuppressSourceGeneration, so they affect all MessagePackObject types. | (scope) | test run | - | yes |

**C4 (unverified, behavior, author confidence medium):** In the field loop, a member with a mismatched key kind is skipped after the DoNotMixStringAndIntKeys diagnostic, mirroring C1.
- Lines: `TypeCollector.cs` L1148-1148
- Checked by: **AI reading only**

**C5 (unverified, behavior, author confidence medium):** In the field loop, a duplicate int key no longer throws from Dictionary.Add.
- Lines: `TypeCollector.cs` L1163-1166
- Checked by: **AI reading only**

**C6 (unverified, behavior, author confidence medium):** In the field loop, a duplicate string key no longer throws from Dictionary.Add.
- Lines: `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only**

**C15 (unverified, test, author confidence high):** The analyzer test file setup is lines 1-18: usings, the VerifyCS alias that binds MsgPack00xMessagePackAnalyzer with MessagePackCodeFixProvider, and a Preamble that adds `using MessagePack;`.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **AI reading only**

**C18 (unverified, docs, author confidence medium):** README documents that suppressed types are still validated (MsgPack004/005/015/003/012) and are exempt from MsgPack011/016/017. MsgPack005 here covers duplicate keys only, not the mixed-key case. MsgPack012 has no accompanying test.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** In the property loop, when a member's key kind differs from the earlier members, the analyzer still reports DoNotMixStringAndIntKeys. It then skips the member with `continue`, instead of reaching `intKey!.Value` with a null int key or building a member from a null string key.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence high):** In the property loop, a duplicate int key no longer throws from Dictionary.Add. The first member with that key is kept and later ones are dropped.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, behavior, author confidence high):** In the property loop, a duplicate string key no longer throws from Dictionary.Add. The first member with that key is kept.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))

**C7 (backed, test, author confidence high):** The test DuplicateIntKeysAreReportedWithoutAnalyzerFailure checks that a suppressed type with two [Key(0)] properties produces exactly the MsgPack005 diagnostic and no analyzer exception.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-100
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence high):** The test DuplicateStringKeysAreReportedWithoutAnalyzerFailure checks that a suppressed type with duplicate string keys produces MsgPack005 and no analyzer exception.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L102-122
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence high):** The test MixedKeyKindsAreReportedWithoutAnalyzerFailure checks that a suppressed type mixing int and string keys produces MsgPack005 on the offending property and no analyzer exception.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L124-144
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence high):** The test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-key handling applies to a normal (non-suppressed) [MessagePackObject] type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)

**C11 (backed, test, author confidence medium):** The test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a suppressed type whose member has no [Key]. It does not depend on the TypeCollector edits.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)

**C12 (backed, test, author confidence medium):** The test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed field and no AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)

**C13 (backed, test, author confidence medium):** The test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported on a suppressed type whose member type is not serializable.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C14 (backed, test, author confidence medium):** The test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that a non-partial suppressed type with a private member and an init property gets no diagnostics, so MsgPack011/016/017 are not reported. This relies on existing analyzer code, not on lines changed here.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)

**C16 (backed, test, author confidence medium):** The test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for a SuppressSourceGeneration = true type, which is declared in the same file.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)

**C17 (backed, test, author confidence medium):** The test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type serializes and deserializes with Standard options, preserving Id and Name.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**C19 (backed, scope, author confidence high):** Scope: no rule descriptors, public API or wire-format code are changed. The source edits are not gated on SuppressSourceGeneration, so they affect all MessagePackObject types.
- Lines: `TypeCollector.cs` L1004-1045
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Nothing in the diff references SuppressSourceGeneration. If issue 2234's root cause is that suppressed types are skipped or filtered before analysis (as opposed to a crash on bad keys), this change does not fix it. The tests for MsgPack004/015/003 on suppressed types may already have passed before the change. The owner should confirm that at least one new test fails on the pre-change code. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1163 | The field-loop edits (lines 1148, 1163-1166, 1179-1182) have no test. Every new test uses properties, so duplicate or mixed keys on fields are unverified. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | Duplicate-keyed members are now silently dropped instead of throwing. If a user downgrades or suppresses MsgPack005 (for example via .editorconfig), the generator could emit a formatter that omits a member, with no build error. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1008 | `continue` skips all later per-member processing for the mismatched member. Any other diagnostics for that member (for example a member-type check, or the formatter attribute handling at 1045) are no longer reported until the key-kind error is fixed. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation; the bug fix does not need it.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time serialization tests for suppressed types; they do not exercise the analyzer behaviour the issue is about.

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
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

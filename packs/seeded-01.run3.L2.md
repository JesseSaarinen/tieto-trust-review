# Evidence pack: REQ-2234 on `seeded-01`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `9fbda651312d` (seeded-01.run3.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 161 of 247 changed code lines (65%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 67%.

- 1 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 86 of 247 changed code lines off the list (C2, C3, C6, C7, C8, C10: tests found passing in the real run, claim upheld by the breaker). 161 stay with the owner.
- Why lines stay: 92 no claim covers the line; 35 cited only by claims without a passing test; 26 passing test, but not upheld by the breaker; 6 claim rests on AI reading only; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1148, L1163-1166, L1170 (7 of 17 changed lines): F2 author (Claude); claim C4 only AI-read; claim C5 only AI-read; F1 author (Claude) (unchanged line); F6 breaker (Gemini) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C11 has no passing test behind it; F7 test run; no claim covers these lines; C12 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L37, L56, L79-193 (117 of 193 changed lines): no claim covers these lines; C9 passed its tests but the breaker did not uphold it

**Not required to read:**
- 86 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C3, C10, C6, C7, C8

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `1bbce7b636` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s) |
| Pack id | `11140653f9c2` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (1)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README documents a user-facing contract of which analyzer rules apply to suppressed types, including an untested MsgPack012 claim. | This documentation goes beyond the bug fix and commits the project to analyzer behavior; a maintainer should decide whether to publish it. | `README.md` L1620-1633 | AI reading |

## 3. The story
Stops the MessagePack analyzer from crashing on certain invalid contracts. In TypeCollector, when a member's key kind (int or string) differs from the other members, the member is now skipped after the MsgPack005 diagnostic is reported. Before, the code went on to dereference a null key. Duplicate int and string keys are no longer added to the member dictionaries a second time, so Dictionary.Add no longer throws. The same guards are applied to the field loop, but only for mixed key kinds and duplicate int keys. The change adds analyzer tests showing diagnostics are reported for `SuppressSourceGeneration = true` types, execution tests for run-time round-tripping, and a README section.

**Why:** Issue 2234 says the analyzer stops working for `[MessagePackObject(SuppressSourceGeneration = true)]` types since 3.1.1. The diff's theory is that the analyzer was throwing inside TypeCollector on duplicate or mixed keys. The diff does not touch any code that decides whether suppressed types are analyzed at all. So it is not shown that this is the root cause of the reported regression rather than a related crash. The new tests MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported are the real evidence for that.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that documents which analyzer rules do and do not apply to suppressed types.
- The duplicate-key crash guard also changes behavior for normal (generated) types, covered by DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes.
- An execution test project file checks run-time serialization of a suppressed type, which is not analyzer behavior.

**How sure (the author's own view; it moves nothing):** High that the guards prevent the two exception paths in the property loop; property tests cover them. Medium that this is the actual fix for the regression; the diff shows no change to suppression handling, so it relies on the tests passing. Low for the field-loop changes: no test uses fields, and the field string-key add after line 1170 is not visible. README claims about MsgPack012 are not tested.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | In the field loop, a field whose key kind differs from the other members is skipped via `continue` after MsgPack005 is reported. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C5 | unverified | In the field loop, a field whose int key is already present is not added again to intMembers. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C1 | backed | In the property loop, when a member's key kind differs from the other members, MsgPack005 (DoNotMixStringAndIntKeys) is reported and the member is skipped via `continue`. This avoids dereferencing a null intKey/stringKey later. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C2 | backed | In the property loop, a member whose int key is already present is not added again to intMembers. This prevents an ArgumentException from Dictionary.Add after the duplicate-key diagnostic. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C3 | backed | In the property loop, a member whose string key is already present is not added again to stringMembers. This prevents an ArgumentException after the duplicate-key diagnostic. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C6 | backed | Test MemberWithoutKeyIsReported asserts that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration=true type. This directly tests that the analyzer works for suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test AllowPrivateRequiredIsReported asserts that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported asserts that MsgPack003 is reported for a member whose type is not serializable on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed asserts that no diagnostics (including MsgPack011/016/017) are reported for a non-partial suppressed type with a private member and an init property with a default value. | "It still worked in 3.1.0." | test run | cannot_tell | no |
| C10 | backed | The analyzer test class setup (usings, VerifyCS alias over MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, and the shared `using MessagePack;` preamble) is shared scaffolding for the analyzer tests. | (scope) | test run | upheld | yes |
| C11 | backed | Execution test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver returns no formatter for the suppressed test type declared at lines 8-16. | (scope) | static check | upheld | no |
| C12 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes the suppressed type with Standard options and checks both fields. | (scope) | static check | upheld | no |
| C13 | backed | README documents that suppressed types are still validated by MsgPack004/005/015/003/012 and are exempt from MsgPack011/016/017. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C14 | backed | The production change is confined to crash guards in TypeCollector. No rule descriptors, public API or serialization code changed, and no logic deciding whether suppressed types are analyzed is modified in the visible diff. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence medium):** In the field loop, a field whose key kind differs from the other members is skipped via `continue` after MsgPack005 is reported.
- Lines: `TypeCollector.cs` L1144-1150
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1144-1150 (in the field loop, confirmed by !item.IsReadOnly on line 1159). After reporting DoNotMixStringAndIntKeys, line 1148 skips the mismatched field via continue.

**C5 (unverified, behavior, author confidence medium):** In the field loop, a field whose int key is already present is not added again to intMembers.
- Lines: `TypeCollector.cs` L1163-1166
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1163-1166 in the field loop. intMembers.Add is guarded with !intMembers.ContainsKey(member.IntKey).

**C1 (backed, behavior, author confidence high):** In the property loop, when a member's key kind differs from the other members, MsgPack005 (DoNotMixStringAndIntKeys) is reported and the member is skipped via `continue`. This avoids dereferencing a null intKey/stringKey later.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1004-1010 and test MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 125-144). When isIntKey and intKey/stringKey mismatch in the property loop, DoNotMixStringAndIntKeys (MsgPack005) is reported and line 1008 skips the member with continue before intKey!.Value at line 1019.

**C2 (backed, behavior, author confidence high):** In the property loop, a member whose int key is already present is not added again to intMembers. This prevents an ArgumentException from Dictionary.Add after the duplicate-key diagnostic.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1023-1026 and tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure (lines 81-100) and DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (lines 147-166). intMembers.Add is guarded by !intMembers.ContainsKey(member.IntKey) in the property loop, and both tests exercise duplicate integer keys on properties.

**C3 (backed, behavior, author confidence high):** In the property loop, a member whose string key is already present is not added again to stringMembers. This prevents an ArgumentException after the duplicate-key diagnostic.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1039-1042 and test DuplicateStringKeysAreReportedWithoutAnalyzerFailure (lines 103-122). stringMembers.Add is guarded by !stringMembers.ContainsKey(member.StringKey) in the property loop, and the test exercises duplicate string keys on properties.

**C6 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported asserts that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration=true type. This directly tests that the analyzer works for suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-36. MemberWithoutKeyIsReported declares a [MessagePackObject(SuppressSourceGeneration = true)] class with an unannotated property and verifies MsgPack004 is reported on it.

**C7 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported asserts that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 38-55. AllowPrivateRequiredIsReported declares [MessagePackObject(SuppressSourceGeneration = true)] without AllowPrivate and a private [Key(0)] field, verifying MsgPack015 is reported.

**C8 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported asserts that MsgPack003 is reported for a member whose type is not serializable on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 57-78. MemberTypeMustBeMessagePackObjectIsReported verifies MsgPack003 is reported on a keyed property of unannotated class Other inside a [MessagePackObject(SuppressSourceGeneration = true)] type.

**C9 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed asserts that no diagnostics (including MsgPack011/016/017) are reported for a non-partial suppressed type with a private member and an init property with a default value.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-193
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 168-193. VerifyCS.Test asserts zero diagnostics on Foo, but the trigger conditions and suppression logic for MsgPack011, MsgPack016, and MsgPack017 are not in the diff, and there is no control test with SuppressSourceGeneration = false showing that Foo would actually trigger all three rules (especially both MsgPack016 and MsgPack017).

**C10 (backed, test, author confidence high):** The analyzer test class setup (usings, VerifyCS alias over MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, and the shared `using MessagePack;` preamble) is shared scaffolding for the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-19
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case))
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-19. These lines contain only the file header, usings, VerifyCS alias over MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, class summary/declaration, and the shared Preamble constant.

**C11 (backed, test, author confidence medium):** Execution test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver returns no formatter for the suppressed test type declared at lines 8-16.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 1-24. SuppressedSourceGenerationType is annotated with [MessagePackObject(SuppressSourceGeneration = true)] at lines 8-16, and NoFormatterIsGeneratedForSuppressedType asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null.

**C12 (backed, test, author confidence medium):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes the suppressed type with Standard options and checks both fields.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 26-37. SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes SuppressedSourceGenerationType with MessagePackSerializerOptions.Standard and asserts both Id and Name.

**C13 (backed, docs, author confidence medium):** README documents that suppressed types are still validated by MsgPack004/005/015/003/012 and are exempt from MsgPack011/016/017.
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)
- Breaker: **upheld**: Checked README.md lines 1620-1633. The added section describes opting out via SuppressSourceGeneration = true, lists MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012 as still validated, and states MsgPack011, MsgPack016, and MsgPack017 are not reported.

**C14 (backed, scope, author confidence high):** The production change is confined to crash guards in TypeCollector. No rule descriptors, public API or serialization code changed, and no logic deciding whether suppressed types are analyzed is modified in the visible diff.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files in the diff. Production code changes are limited to TypeCollector.cs crash guards (lines 1008, 1023-1026, 1039-1042, 1148, 1163-1166), with no changes to rule descriptors, public API, serialization code, or SuppressSourceGeneration filtering.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1170 | The field-loop string-key branch continues past the visible hunk, and its stringMembers.Add is not shown as guarded. Duplicate string keys on fields may still throw and crash the analyzer. No test uses fields with duplicate or mixed keys, so the C4/C5 field-loop guards are also untested. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1008 | The diff only adds crash guards and does not touch suppression handling. It is not shown that a duplicate or mixed-key crash is what made the analyzer silent for SuppressSourceGeneration types since 3.1.1. Whether the regression is fixed depends on MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported actually failing before this change. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | `continue` skips all later per-member processing for a mismatched key member, including formatter-attribute handling and any later per-member diagnostics such as MsgPack003. Those diagnostics may no longer appear for that member. | author (Claude) |
| F4 | low | `SuppressSourceGenerationAnalyzerTests.cs` L169 | SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed only asserts that there are no diagnostics. It would also pass if the analyzer skipped suppressed types entirely, which is the bug, so it does not by itself guard the fix. | author (Claude) |
| F5 | low | `README.md` L1630 | README states that MsgPack012 (accessibility) is reported for suppressed types, but no test covers it. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1170 | In the field loop's string-key else branch (beginning at lines 1168-1170), stringMembers.Add was not guarded with !stringMembers.ContainsKey(member.StringKey), unlike the property loop (lines 1039-1042) and both intMembers.Add branches (lines 1023-1026 and 1163-1166). If two fields have the same string [Key], or a field duplicates a property's string [Key], stringMembers.Add will still throw Argum | breaker (Gemini) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section describing SuppressSourceGeneration semantics and the analyzer rule set for such types; not needed to fix the bug.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time serialization and resolver tests; they do not exercise the analyzer named in the requirement.

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
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

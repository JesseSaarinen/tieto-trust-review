# Evidence pack: REQ-2234 on `seeded-15`

> **REVIEW INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 171 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **breaker**: the saved pack holds no breaker output. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `82c73a91b313` (seeded-15.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 254 of 254 changed code lines (100%).** Docs: 14 lines, read with the story. Of everything changed: 95%.

- Fail closed: breaker the saved pack holds no breaker output. No claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Refused to decide (safety: Code that reads untrusted input changed). The owner reads these files in full.
- 1 refusal(s) on honesty grounds need a human look.
- 5 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Why lines stay: 135 cited only by claims without a passing test; 94 no claim covers the line; 20 claim rests on AI reading only; 3 named by a finding; 2 refused.

**The owner must read** (4 files):
- `src/MessagePack/MessagePackSecurity.cs` whole file diff (2 changed lines): R2 honesty (AI-suggested) (L233); F1 author (Claude) (L233); R1 safety
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (22 of 22 changed lines): claim C1 only AI-read; F2 author (Claude); claim C2 only AI-read; claim C3 only AI-read; claim C4 only AI-read; claim C5 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C11 has no passing test behind it; F6 test run; no claim covers these lines; C12 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): C10 has no passing test behind it; no claim covers these lines; C6 has no passing test behind it; C7 has no passing test behind it; C8 has no passing test behind it; C9 has no passing test behind it

**Not required to read:**
- 1 doc file(s): prose; covered by the story

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `6c6d8af6a8` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 171 blocked by the machine, 0 skipped (53s) |
| Pack id | `52ef7f27dbfc` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | Code that reads untrusted input changed | Deserializers parse bytes from the network; mistakes become security bugs. Needs a human with security context. | `MessagePackSecurity.cs` L233 | static check |
| R2 | honesty | An unrelated runtime security change is bundled into an analyzer bug fix. | The change goes beyond the requirement, and nothing in the requirement or the tests justifies it. | `MessagePackSecurity.cs` L233-233 | AI reading |

## 3. The story
TypeCollector no longer crashes on two kinds of bad contract. When a member's key kind (int vs string) does not match the other members, it now reports MsgPack005 and skips that member (`continue`). When two members share a key, it no longer calls Dictionary.Add a second time, which would throw. These edits are in both member-collection loops. The change also adds analyzer tests for SuppressSourceGeneration types, runtime execution tests, and a README section. Separately, it relaxes the max-depth check in MessagePackSecurity.DepthStep from `>=` to `>`.

**Why:** The likely root cause is that duplicate or mixed keys made TypeCollector throw an ArgumentException. That would take down the whole analyzer, which matches the report that the analyzer 'does not work' for SuppressSourceGeneration types. No line in the diff touches the SuppressSourceGeneration code path itself. So the theory that this was the cause is inferred from the tests, not shown in the diff.

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs L233: the depth limit changes from `>=` to `>`. This lets deserialization go one level deeper than MaximumObjectGraphDepth. It is unrelated to the analyzer and is a security-relevant behaviour change.
- README.md: a new 'Opting out of source generation' docs section. It makes behavioural promises, such as MsgPack012 being reported, that no test checks.
- The TypeCollector guards also apply to normal (non-suppressed) [MessagePackObject] types.

**How sure (the author's own view; it moves nothing):** Medium that the TypeCollector guards stop the analyzer from crashing on duplicate or mixed keys in the property path; tests target exactly that. Low that this is the whole root cause of REQ-2234, because the suppression path is not visible. The second (field) loop's changes have no direct test. The MessagePackSecurity change is clearly out of scope and weakens an untrusted-input limit.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | In the first member loop, when a member's key kind (int vs string) differs from the type's established kind, MsgPack005 (DoNotMixStringAndIntKeys) is reported and the member is skipped via `continue`. This avoids dereferencing a null key later. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C2 | unverified | In the first member loop, a second member with an already-used int key is no longer added to intMembers. The duplicate Dictionary.Add that would throw is avoided, and MsgPack005 is still reported. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C3 | unverified | In the first member loop, a second member with an already-used string key is no longer added to stringMembers. This avoids an ArgumentException, while MsgPack005 is still reported. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C4 | unverified | The second member loop gets the same mixed-key `continue` as the first. That loop uses IsInitOnly: false and appears to be the field path. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C5 | unverified | The second member loop guards the int and string dictionary adds against duplicate keys, the same way as the first loop. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C10 | unverified | The analyzer test class setup is shared by all the analyzer tests. It provides the usings, a VerifyCS alias over MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, and a `using MessagePack;` preamble. | (scope) | AI reading only | - | no |
| C11 | unverified | Execution test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for a SuppressSourceGeneration = true type. | (scope) | AI reading only | - | no |
| C12 | unverified | Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that a suppressed type round-trips through MessagePackSerializerOptions.Standard. It tests runtime serialization, not the analyzer. | (scope) | AI reading only | - | no |
| C14 | unverified | Scope: the MessagePackSecurity.DepthStep comparison change is unrelated to the analyzer requirement. It alters runtime handling of untrusted input by allowing depth == MaximumObjectGraphDepth. | (scope) | AI reading only | - | no |
| C6 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration = true type. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | - | no |
| C7 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on the attribute when a suppressed type has a private keyed field without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | - | no |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a suppressed type whose type is not serializable. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | - | no |
| C9 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private field and an init property with an initializer. In other words, MsgPack011, MsgPack016 and MsgPack017 are not reported. | "It still worked in 3.1.0." | static check | - | no |
| C13 | backed | The README documents which analyzer rules apply to suppressed types. The MsgPack012 (accessibility) claim at L1630 is not covered by any test. | (scope) | static check | - | no |
| C15 | backed | Scope: no new public API, analyzer rules, or wire-format changes are introduced. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence medium):** In the first member loop, when a member's key kind (int vs string) differs from the type's established kind, MsgPack005 (DoNotMixStringAndIntKeys) is reported and the member is skipped via `continue`. This avoids dereferencing a null key later.
- Lines: `TypeCollector.cs` L1005-1009
- Checked by: **AI reading only** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way))

**C2 (unverified, behavior, author confidence medium):** In the first member loop, a second member with an already-used int key is no longer added to intMembers. The duplicate Dictionary.Add that would throw is avoided, and MsgPack005 is still reported.
- Lines: `TypeCollector.cs` L1019-1026
- Checked by: **AI reading only** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` blocked by the machine (not evidence either way))

**C3 (unverified, behavior, author confidence medium):** In the first member loop, a second member with an already-used string key is no longer added to stringMembers. This avoids an ArgumentException, while MsgPack005 is still reported.
- Lines: `TypeCollector.cs` L1035-1042
- Checked by: **AI reading only** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way))

**C4 (unverified, behavior, author confidence low):** The second member loop gets the same mixed-key `continue` as the first. That loop uses IsInitOnly: false and appears to be the field path.
- Lines: `TypeCollector.cs` L1145-1149
- Checked by: **AI reading only**

**C5 (unverified, behavior, author confidence low):** The second member loop guards the int and string dictionary adds against duplicate keys, the same way as the first loop.
- Lines: `TypeCollector.cs` L1159-1166, `TypeCollector.cs` L1175-1182
- Checked by: **AI reading only**

**C10 (unverified, test, author confidence high):** The analyzer test class setup is shared by all the analyzer tests. It provides the usings, a VerifyCS alias over MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, and a `using MessagePack;` preamble.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **AI reading only** (test `MemberWithoutKeyIsReported` blocked by the machine (not evidence either way))

**C11 (unverified, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for a SuppressSourceGeneration = true type.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run)

**C12 (unverified, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that a suppressed type round-trips through MessagePackSerializerOptions.Standard. It tests runtime serialization, not the analyzer.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **AI reading only** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)

**C14 (unverified, scope, author confidence high):** Scope: the MessagePackSecurity.DepthStep comparison change is unrelated to the analyzer requirement. It alters runtime handling of untrusted input by allowing depth == MaximumObjectGraphDepth.
- Lines: `MessagePackSecurity.cs` L233-233
- Checked by: **AI reading only**

**C6 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration = true type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **static check** (test `MemberWithoutKeyIsReported` blocked by the machine (not evidence either way); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on the attribute when a suppressed type has a private keyed field without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **static check** (test `AllowPrivateRequiredIsReported` blocked by the machine (not evidence either way); static check S8 passed)

**C8 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a suppressed type whose type is not serializable.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **static check** (test `MemberTypeMustBeMessagePackObjectIsReported` blocked by the machine (not evidence either way); static check S8 passed)

**C9 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private field and an init property with an initializer. In other words, MsgPack011, MsgPack016 and MsgPack017 are not reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **static check** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` blocked by the machine (not evidence either way); static check S4 passed)

**C13 (backed, docs, author confidence medium):** The README documents which analyzer rules apply to suppressed types. The MsgPack012 (accessibility) claim at L1630 is not covered by any test.
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)

**C15 (backed, scope, author confidence high):** Scope: no new public API, analyzer rules, or wire-format changes are introduced.
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `MessagePackSecurity.cs` L233 | Changing `>=` to `>` lets an object graph go one level deeper than MaximumObjectGraphDepth before InsufficientExecutionStackException is thrown. This weakens a stack-exhaustion defense for untrusted input. It is unrelated to REQ-2234 and is not tested. | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1023 | None of the edits touches any SuppressSourceGeneration-specific code. The fix assumes the regression was caused by an exception on duplicate or mixed keys. If 3.1.1 instead skips suppressed types early somewhere outside this diff, the bug is only partly fixed. Running the new tests against the pre-change code would confirm which is true. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | The new `continue` skips all later per-member processing for a member whose key kind is mismatched. That includes the formatter-attribute lookup and member-type validation (e.g. MsgPack003), so other diagnostics on that member can be silently lost. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1148 | The second loop (likely fields) gets the same guards as the first, but no test covers duplicate or mixed keys on fields. | author (Claude) |
| F5 | low | `README.md` L1630 | The docs promise that MsgPack012 is reported for suppressed types, but no test verifies this. | author (Claude) |
| F6 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Off-by-one relaxation of the max object graph depth check. This is runtime deserialization security behaviour unrelated to the analyzer bug.
- `README.md`: A new docs section describing opt-out behaviour and which analyzer rules apply. It is not required by the bug fix.

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
- Reviewer part missing or failed: breaker: the saved pack holds no breaker output. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- 171 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

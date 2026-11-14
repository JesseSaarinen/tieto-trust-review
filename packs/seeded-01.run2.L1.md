# Evidence pack: REQ-2234 on `seeded-01`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `728eb6849a32` (seeded-01.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 61 of 247 changed code lines (25%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 29%.

- 2 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 186 of 247 changed code lines off the list (C6, C7, C8, C9, C10, C11, C12: tests found passing in the real run; breaker removed for this measurement). 61 stay with the owner.
- Why lines stay: 35 cited only by claims without a passing test; 17 refused; 8 no claim covers the line; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166 (17 of 17 changed lines): R2 honesty (AI-suggested); F1 author (Claude); claim C4 only AI-read; claim C5 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C13 has no passing test behind it; F4 test run; no claim covers these lines; C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L19, L37, L56, L79, L145, L167, L193 (7 of 193 changed lines): no claim covers these lines

**Not required to read:**
- 186 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C12, C6, C7, C8, C9, C10, C11

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `1bbce7b636` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s) |
| Pack id | `d9b0f8c608da` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README section documenting the set of analyzer rules applied to suppressed types | Documentation beyond the bug fix that states user-visible analyzer behaviour, partly untested (MsgPack012). The owner should confirm it matches intended policy. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | Analyzer behaviour changed for all MessagePackObject types, not only SuppressSourceGeneration ones | The `continue` and ContainsKey guards alter diagnostics and generator member collection for every type. The diff never touches SuppressSourceGeneration handling, so it may not address the reported regression. | `TypeCollector.cs` L1008-1166 | AI reading |

## 3. The story
The change hardens TypeCollector so the analyzer no longer throws when a [MessagePackObject] type has mixed key kinds or duplicate keys. It adds `continue` after the mixed-key diagnostic and guards the int/string member dictionary `Add` calls with `ContainsKey`, in both the property loop and the field loop. It adds analyzer tests for SuppressSourceGeneration types, two execution tests and a README section.

**Why:** Issue 2234 says the analyzer stopped working for `SuppressSourceGeneration = true` types in 3.1.1. The agent's fix assumes the cause was an exception during member collection (Dictionary.Add on a duplicate key, or `intKey!.Value` on a mismatched key kind) that stopped all diagnostics. No code that checks SuppressSourceGeneration was touched, so whether this is the real root cause cannot be confirmed from the diff.

**Touches beyond the requirement:**
- The `continue` and ContainsKey guards change analyzer and generator behaviour for all MessagePackObject types, not only suppressed ones.
- README gains a new 'Opting out of source generation' section that documents which diagnostics apply. MsgPack012 is listed there but has no test.
- Execution tests check generator output and the dynamic-resolver round trip, not the analyzer.

**How sure (the author's own view; it moves nothing):** Medium that the property-path crash fixes work: each has a targeted test. Low for the field-path changes: no test uses duplicate or mixed keys on fields. Low-to-medium that this fixes the reported regression, because the diff never touches SuppressSourceGeneration handling. The positive diagnostic tests (MsgPack004/015/003) would only show the regression is fixed if they failed before the change, and that cannot be seen here.

## 4. Claims (16)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | In the field loop, a member with a mismatched key kind gets MsgPack005 and is skipped with `continue`. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C5 | unverified | In the field loop, a duplicate int key no longer throws from Dictionary.Add. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C15 | unverified | The README documents which analyzer rules apply to SuppressSourceGeneration types. MsgPack012 is listed there but no test covers it. | (scope) | AI reading only | - | no |
| C1 | backed | In the property loop, a member whose key kind differs from the first member's now gets MsgPack005 and is skipped with `continue`. Previously execution fell through to `intKey!.Value` / string handling with a null key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | In the property loop, a duplicate int key no longer throws from Dictionary.Add; the first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | In the property loop, a duplicate string key no longer throws from Dictionary.Add; the first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C6 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C7 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C9 | backed | The duplicate-int, duplicate-string and mixed-key tests expect exactly one MsgPack005 on the second member and no analyzer failure, for suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C10 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-int-key handling applies to a type without SuppressSourceGeneration. | (scope) | test run | - | yes |
| C11 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics, including no MsgPack011/016/017, for a non-partial suppressed type with a private field and an init property. | (scope) | test run | - | yes |
| C12 | backed | The analyzer test file header, usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, and the shared Preamble set up the analyzer tests. | (scope) | test run | - | yes |
| C13 | backed | Execution test NoFormatterIsGeneratedForSuppressedType checks that the generated resolver returns no formatter for the suppressed sample type. | (scope) | static check | - | no |
| C14 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with the standard options. This is runtime behaviour, not analyzer behaviour. | (scope) | static check | - | no |
| C16 | backed | Scope: the source change is limited to key-collision and mixed-key handling in TypeCollector. No public API, analyzer rule descriptors or wire format change, and no SuppressSourceGeneration-specific logic is modified. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence low):** In the field loop, a member with a mismatched key kind gets MsgPack005 and is skipped with `continue`.
- Lines: `TypeCollector.cs` L1148-1148
- Checked by: **AI reading only**

**C5 (unverified, behavior, author confidence low):** In the field loop, a duplicate int key no longer throws from Dictionary.Add.
- Lines: `TypeCollector.cs` L1163-1166
- Checked by: **AI reading only**

**C15 (unverified, docs, author confidence medium):** The README documents which analyzer rules apply to SuppressSourceGeneration types. MsgPack012 is listed there but no test covers it.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence medium):** In the property loop, a member whose key kind differs from the first member's now gets MsgPack005 and is skipped with `continue`. Previously execution fell through to `intKey!.Value` / string handling with a null key.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence medium):** In the property loop, a duplicate int key no longer throws from Dictionary.Add; the first member with that key is kept.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, behavior, author confidence medium):** In the property loop, a duplicate string key no longer throws from Dictionary.Add; the first member with that key is kept.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))

**C6 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence medium):** The duplicate-int, duplicate-string and mixed-key tests expect exactly one MsgPack005 on the second member and no analyzer failure, for suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence medium):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-int-key handling applies to a type without SuppressSourceGeneration.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)

**C11 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics, including no MsgPack011/016/017, for a non-partial suppressed type with a private field and an init property.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)

**C12 (backed, test, author confidence high):** The analyzer test file header, usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, and the shared Preamble set up the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case))

**C13 (backed, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType checks that the generated resolver returns no formatter for the suppressed sample type.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)

**C14 (backed, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with the standard options. This is runtime behaviour, not analyzer behaviour.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)

**C16 (backed, scope, author confidence high):** Scope: the source change is limited to key-collision and mixed-key handling in TypeCollector. No public API, analyzer rule descriptors or wire format change, and no SuppressSourceGeneration-specific logic is modified.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1148-1148, `TypeCollector.cs` L1163-1166
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Nothing in the diff touches how SuppressSourceGeneration types are handled. If the 3.1.1 regression was that the analyzer skips suppressed types, rather than throwing on key collisions, this change does not fix it. The diff cannot show whether MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported failed before the change. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1170 | In the field loop, the string-key branch's Add call (after line 1170) is not shown with a ContainsKey guard, unlike the property loop. If it is still unguarded, duplicate string keys on fields can still crash the analyzer. The field-path changes (1148, 1163-1166) have no test at all. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | `continue` skips the rest of the member processing, including the MessagePackFormatter attribute lookup and later member-type checks. Diagnostics such as MsgPack003 on that member are therefore no longer reported while MsgPack005 is present. | author (Claude) |
| F4 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation and which analyzer rules apply. Not required by the bug fix; it also makes claims, such as MsgPack012, that are not tested.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime and generator execution tests. These do not exercise the analyzer, which is what the requirement is about.

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

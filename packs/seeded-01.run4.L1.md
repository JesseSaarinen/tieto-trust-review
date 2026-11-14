# Evidence pack: REQ-2234 on `seeded-01`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `b6dc0ab94077` (seeded-01.run4.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 80 of 247 changed code lines (32%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 36%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 167 of 247 changed code lines off the list (C5, C6, C7, C8, C9, C10, C11: tests found passing in the real run; breaker removed for this measurement). 80 stay with the owner.
- Why lines stay: 55 cited only by claims without a passing test; 11 refused; 7 no claim covers the line; 6 claim rests on AI reading only; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166 (17 of 17 changed lines): R2 honesty (AI-suggested); F1 author (Claude); claim C4 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C13 has no passing test behind it; F6 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L123, L145, L167, L193 (26 of 193 changed lines): C12 has no passing test behind it; no claim covers these lines

**Not required to read:**
- 167 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C5, C6, C7, C8, C9, C10, C11

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `1bbce7b636` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s) |
| Pack id | `a7e60e682de9` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README documents analyzer behaviour for suppressed types: which rules fire and which are suppressed, including MsgPack012. | This is user-facing documentation of rule behaviour that goes beyond the bug fix and is only partly backed by tests or by code in this diff. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | The source fix has no logic tied to `SuppressSourceGeneration`, yet the change is presented as the fix for issue 2234. | The owner should confirm that the duplicate/mixed-key crash is truly the cause of the 3.1.1 regression before accepting this as the fix. | `TypeCollector.cs` L1008-1042 | AI reading |

## 3. The story
The only production change is in `TypeCollector.cs`, and it stops the analyzer from crashing on bad keys. After reporting a mixed int/string key diagnostic, it now skips that member (`continue`). Before adding a member to the int-key or string-key dictionaries, it now checks whether the key already exists, so a duplicate no longer throws. Both guards are applied in two parallel member loops: the one that handles properties and the one that handles fields. The change also adds analyzer tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, two run-time execution tests, and a README section.

**Why:** Issue 2234 reports that analyzer diagnostics stop working for types marked `SuppressSourceGeneration = true` (a regression since 3.1.1). The agent's apparent theory is that `TypeCollector` threw while analyzing such types (duplicate dictionary keys, or a null key after the mixed-kind diagnostic), which killed analysis. Nothing in the source diff mentions `SuppressSourceGeneration`. So whether this is really the root cause of the 3.1.1 regression cannot be confirmed from the diff alone.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section. It documents analyzer behaviour (MsgPack004/005/015/003/012 reported; MsgPack011/016/017 not reported) that the diff mostly does not implement or test.
- A new execution test file checks that no formatter is generated for a suppressed type and that it round-trips through the dynamic resolver. This is run-time behaviour, not the analyzer.
- The duplicate-key guard and the mixed-key `continue` also apply to normal (non-suppressed) types, so the source-generator path changes too: the first duplicate wins instead of throwing.

**How sure (the author's own view; it moves nothing):** High that the guards prevent `ArgumentException` on duplicate keys and the null dereference on mixed key kinds in the property loop; the tests exercise these. Medium-to-low that this is the actual fix for the reported regression: the diff shows no suppression-specific logic, and the positive analyzer tests may or may not have failed before the change. The field-loop copies of the fix (lines 1148, 1163-1166) have no test.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The field loop gets the same two fixes: `continue` after the mixed-key diagnostic, and a `ContainsKey` guard before `intMembers.Add`. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C12 | unverified | Test file setup: the usings, the `VerifyCS` alias (`MsgPack00xMessagePackAnalyzer` with `MessagePackCodeFixProvider`) and the shared `Preamble` used by all analyzer tests. | (scope) | AI reading only | - | no |
| C13 | unverified | Execution tests check run-time behaviour, not the analyzer. `NoFormatterIsGeneratedForSuppressedType` asserts the generated resolver has no formatter for the suppressed type. `SuppressedTypeRoundTripsThroughDynamicResolver` asserts it round-trips with Standard options. | (scope) | AI reading only | - | no |
| C14 | unverified | The README adds an 'Opting out of source generation' section describing which analyzer rules apply to suppressed types. | (scope) | AI reading only | - | no |
| C1 | backed | In the property loop, after reporting the mixed int/string key diagnostic, the member is skipped with `continue`. This avoids dereferencing a null `intKey`/`stringKey` later. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C2 | backed | In the property loop, a duplicate int key no longer throws on `intMembers.Add`. The first member with that key is kept and later ones are not added. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | In the property loop, a duplicate string key no longer throws on `stringMembers.Add`. The first member is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C5 | backed | Test `MemberWithoutKeyIsReported` asserts that MsgPack004 is reported on a member without `[Key]` in a `SuppressSourceGeneration = true` type. This directly tests the requirement. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C6 | backed | Test `AllowPrivateRequiredIsReported` asserts that MsgPack015 is reported for a private keyed member in a suppressed type without `AllowPrivate`. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C7 | backed | Test `MemberTypeMustBeMessagePackObjectIsReported` asserts that MsgPack003 is reported for a member whose type is not serializable, in a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C8 | backed | Tests `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` and `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` assert that MsgPack005 is reported on the second duplicate member of a suppressed type, with no analyzer exception. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C9 | backed | Test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` asserts that MsgPack005 is reported on the string-keyed member when it is mixed with an int-keyed member in a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C10 | backed | Test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` asserts that MsgPack005 is reported for duplicate int keys on a normal (non-suppressed) `[MessagePackObject]` type. | (scope) | test run | - | yes |
| C11 | backed | Test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` asserts that no diagnostics are reported for a non-partial suppressed type that has a private member and an init property with a default. It only checks for the absence of diagnostics. | (scope) | test run | - | yes |
| C15 | backed | Scope: production code changes are confined to `TypeCollector.cs`. No public API, analyzer rule descriptors or wire-format code is changed. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence low):** The field loop gets the same two fixes: `continue` after the mixed-key diagnostic, and a `ContainsKey` guard before `intMembers.Add`.
- Lines: `TypeCollector.cs` L1148-1148, `TypeCollector.cs` L1163-1166
- Checked by: **AI reading only**

**C12 (unverified, test, author confidence high):** Test file setup: the usings, the `VerifyCS` alias (`MsgPack00xMessagePackAnalyzer` with `MessagePackCodeFixProvider`) and the shared `Preamble` used by all analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18, `SuppressSourceGenerationAnalyzerTests.cs` L193-193
- Checked by: **AI reading only**

**C13 (unverified, scope, author confidence high):** Execution tests check run-time behaviour, not the analyzer. `NoFormatterIsGeneratedForSuppressedType` asserts the generated resolver has no formatter for the suppressed type. `SuppressedTypeRoundTripsThroughDynamicResolver` asserts it round-trips with Standard options.
- Lines: `SuppressedSourceGenerationTests.cs` L1-37
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)

**C14 (unverified, docs, author confidence medium):** The README adds an 'Opting out of source generation' section describing which analyzer rules apply to suppressed types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** In the property loop, after reporting the mixed int/string key diagnostic, the member is skipped with `continue`. This avoids dereferencing a null `intKey`/`stringKey` later.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C2 (backed, behavior, author confidence high):** In the property loop, a duplicate int key no longer throws on `intMembers.Add`. The first member with that key is kept and later ones are not added.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C3 (backed, behavior, author confidence high):** In the property loop, a duplicate string key no longer throws on `stringMembers.Add`. The first member is kept.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))

**C5 (backed, test, author confidence medium):** Test `MemberWithoutKeyIsReported` asserts that MsgPack004 is reported on a member without `[Key]` in a `SuppressSourceGeneration = true` type. This directly tests the requirement.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)

**C6 (backed, test, author confidence medium):** Test `AllowPrivateRequiredIsReported` asserts that MsgPack015 is reported for a private keyed member in a suppressed type without `AllowPrivate`.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)

**C7 (backed, test, author confidence medium):** Test `MemberTypeMustBeMessagePackObjectIsReported` asserts that MsgPack003 is reported for a member whose type is not serializable, in a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)

**C8 (backed, test, author confidence high):** Tests `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` and `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` assert that MsgPack005 is reported on the second duplicate member of a suppressed type, with no analyzer exception.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-122
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C9 (backed, test, author confidence high):** Test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` asserts that MsgPack005 is reported on the string-keyed member when it is mixed with an int-keyed member in a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L124-144
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence high):** Test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` asserts that MsgPack005 is reported for duplicate int keys on a normal (non-suppressed) `[MessagePackObject]` type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)

**C11 (backed, test, author confidence medium):** Test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` asserts that no diagnostics are reported for a non-partial suppressed type that has a private member and an init property with a default. It only checks for the absence of diagnostics.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)

**C15 (backed, scope, author confidence high):** Scope: production code changes are confined to `TypeCollector.cs`. No public API, analyzer rule descriptors or wire-format code is changed.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | No changed source line references `SuppressSourceGeneration`. The fix only prevents crashes on duplicate or mixed-kind keys. The diff does not show that this is why the analyzer stopped working for suppressed types in 3.1.1, nor that the tests for MsgPack004/015/003 (which have no duplicates) failed before this change. The reported regression may be unaddressed, or may have been fixed elsewhere. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1163 | The field-loop fixes (lines 1148 and 1163-1166) are not exercised by any test; every new test uses properties. The string-key path in the field loop (line 1170 onward) is not visibly guarded either, though it may already check `ContainsKey` before adding. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | On duplicate keys, the first member now silently wins in the generated object info, where previously an exception was thrown. This is acceptable only if MsgPack005 is an error severity that blocks the build; otherwise a generated formatter could silently drop a member. | author (Claude) |
| F4 | low | `SuppressSourceGenerationAnalyzerTests.cs` L188 | `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` asserts only that no diagnostics appear. It would also pass if the analyzer ignored suppressed types entirely, which is exactly the reported bug, so on its own it does not guard the requirement. | author (Claude) |
| F5 | low | `README.md` L1630 | The README claims MsgPack012 (type accessibility) is still reported for suppressed types, but no test covers it and the diff does not implement it. | author (Claude) |
| F6 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation and the analyzer rules that apply to such types.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time serialization and resolver tests for suppressed types; these do not test the analyzer.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: The guards also change source-generator behaviour for non-suppressed types (first duplicate wins, mixed-kind member skipped).

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

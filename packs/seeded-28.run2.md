# Evidence pack: REQ-2234 on `seeded-28`

> **REVIEW PARTLY INCOMPLETE: 2 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 175 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 252 of 252 changed code lines (100%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 100%.

- 2 refusal(s) on honesty/contracts grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 4 behaviour claim(s) rest on AI reading only (no passing test).
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 252.
- Why lines stay: 223 cited only by claims without a passing test; 16 claim rests on AI reading only; 6 no claim covers the line; 5 named by a finding; 1 refused; 1 claim disputed.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested); claim C13 disputed; F1 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (22 of 22 changed lines): R2 contracts (AI-suggested); F2 breaker (Gemini); claim C14 disputed; F5 author (Claude); claim C2 only AI-read; claim C3 only AI-read; claim C4 only AI-read; F4 author (Claude); claim C4b only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C11 has no passing test behind it; F7 test run; no claim covers these lines; C12 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): C10 has no passing test behind it; no claim covers these lines; C5 has no passing test behind it; C6 has no passing test behind it; C7 has no passing test behind it; C8 has no passing test behind it; C9 has no passing test behind it

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `455df2b2bd` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 9,695 in / 7,257 out, 84 s, $0.18 |
| Breaker model | gemini-4-carbon: 8,520 in / 24,776 out, 299 s, $0.26 |
| Cost and time | $0.45 at list price, 383 s for this pack (tests reused from an earlier run of this commit: 78 s) |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 0 passed, 0 failed, 175 blocked by the machine, 0 skipped (78s) |
| Pack id | `e3462c686ea6` |

## 1. Disputed claims (2)
**C13 (DISPUTED, docs, author confidence medium):** The README documents which analyzer rules apply, and which do not, to SuppressSourceGeneration types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **disputed**: Over-citation: README.md lines 1622-1623 also document runtime serialization behavior (no generated formatter, reflection-based dynamic resolvers, and lack of AOT safety), which the claim does not describe; additionally, line 1630 asserts MsgPack012 is reported for suppressed types, which cannot be verified from the diff or tests.

**C14 (DISPUTED, scope, author confidence medium):** Scope: the only production change is key-collision handling in TypeCollector. No code that decides whether suppressed types are analyzed was changed, and no rule descriptors or public API were added.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **static check** (static check S3 passed; static check S4 passed)
- Breaker: **disputed**: Wrong citations and incomplete description: the claim says the only production change is key-collision handling, yet cites only TypeCollector.cs lines 1008 and 1148, which handle mixed key kinds (DoNotMixStringAndIntKeys), while omitting the duplicate-key collision guards at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README documents analyzer behaviour for suppressed types, including untested MsgPack012 coverage. | This is a user-facing behavioural statement beyond the bug fix, and it is only partly verified by tests. | `README.md` L1620-1633 | AI reading |
| R2 | contracts | Skipping mismatched-key members changes which analyzer diagnostics users see for all [MessagePackObject] types, not only suppressed ones. | This changes user-visible analyzer output on a code path shared with normal source-generated types. | `TypeCollector.cs` L1004-1010 | AI reading |

## 3. The story
The change edits TypeCollector's member-collection loops in four ways. A member whose key kind (int vs string) does not match the other members now hits `continue` right after MsgPack005 is reported. Adding a member to the int-key and string-key dictionaries is now guarded by `ContainsKey`, so a duplicate key no longer throws. Both edits are made in two parallel code paths, which look like the property loop and the field loop. The change also adds analyzer tests and run-time execution tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, and a README section on opting out of source generation.

**Why:** Issue 2234 says the analyzer stops working for SuppressSourceGeneration types since 3.1.1. The diff implies the cause: duplicate or mixed keys made `Dictionary.Add` throw inside the analyzer, which silently killed its diagnostics. The diff does not show the cause directly. No code that gates on SuppressSourceGeneration was changed.

**Touches beyond the requirement:**
- README.md gains a new user-facing section listing which analyzer rules apply to suppressed types. It includes MsgPack012, which no test covers.
- The same guards also change behaviour for normal (non-suppressed) `[MessagePackObject]` types, because the code path is shared.
- New execution tests check run-time dynamic serialization of a suppressed type. That is run-time behaviour, not analyzer behaviour.

**How sure (the author's own view; it moves nothing):** Medium. The property-path changes are covered by markup tests that would fail on an analyzer exception (AD0001) or on missing MsgPack005. The field-path copies of the same guards have no duplicate-key test. Nothing in the diff shows that key collisions are the only reason the analyzer 'does not work' for suppressed types. The MsgPack004, MsgPack015 and MsgPack003 tests pass without any source change, so they are regression tests, not proof of the fix.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C13 | DISPUTED | The README documents which analyzer rules apply, and which do not, to SuppressSourceGeneration types. | (scope) | AI reading only | disputed | no |
| C14 | DISPUTED | Scope: the only production change is key-collision handling in TypeCollector. No code that decides whether suppressed types are analyzed was changed, and no rule descriptors or public API were added. | (scope) | static check | disputed | no |
| C2 | unverified | In the property path, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` cannot throw. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C3 | unverified | In the property path, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` cannot throw. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C4 | unverified | The same mixed-key `continue` is applied to the second (field) collection path. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C4b | unverified | The same duplicate-key guards are applied to the int and string dictionaries in the second (field) collection path. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C10 | unverified | The analyzer test file's usings, the VerifyCS alias and the shared Preamble constant set up the verifier for the analyzer tests. | (scope) | AI reading only | upheld | no |
| C11 | unverified | Test NoFormatterIsGeneratedForSuppressedType asserts that GeneratedMessagePackResolver returns no formatter for the suppressed sample type. That type is declared at the top of the file. | (scope) | AI reading only | upheld | no |
| C1 | backed | In the property path, a member whose key kind mismatches the other members is skipped (`continue`) after MsgPack005 is reported. It is therefore never added to the int or string dictionaries. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C5 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on an un-keyed property of a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C6 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type that lacks AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C7 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C8 | backed | The duplicate and mixed key tests assert exactly one MsgPack005 on the second member. An analyzer exception would surface as an unexpected AD0001 and fail them, so they really test the crash fix for suppressed and non-suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C9 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that no diagnostics are produced for a non-partial suppressed type that has a private field and an init property with a default value. That covers MsgPack011, MsgPack016 and MsgPack017 being absent. | (scope) | static check | cannot_tell | no |
| C12 | backed | Test SuppressedTypeRoundTripsThroughDynamicResolver round-trips the suppressed type with the Standard options. This is run-time behaviour; it does not exercise the analyzer. | (scope) | static check | upheld | no |

**C2 (unverified, behavior, author confidence medium):** In the property path, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` cannot throw.
- Lines: `TypeCollector.cs` L1019-1027
- Checked by: **AI reading only** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` blocked by the machine (not evidence either way))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1019-1027 and both named tests at SuppressSourceGenerationAnalyzerTests.cs lines 81-100 and 147-166: intMembers.Add is guarded by !intMembers.ContainsKey(member.IntKey) in the property loop, preventing Dictionary.Add from throwing on duplicate int keys.

**C3 (unverified, behavior, author confidence medium):** In the property path, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` cannot throw.
- Lines: `TypeCollector.cs` L1035-1043
- Checked by: **AI reading only** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1035-1043 and SuppressSourceGenerationAnalyzerTests.cs lines 103-122: stringMembers.Add is guarded by !stringMembers.ContainsKey(member.StringKey) in the property loop, preventing Dictionary.Add from throwing on duplicate string keys.

**C4 (unverified, behavior, author confidence low):** The same mixed-key `continue` is applied to the second (field) collection path.
- Lines: `TypeCollector.cs` L1144-1150
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1144-1150 (confirmed as the field collection loop by !item.IsReadOnly at line 1159): the same continue after reporting DoNotMixStringAndIntKeys is added at line 1148.

**C4b (unverified, behavior, author confidence low):** The same duplicate-key guards are applied to the int and string dictionaries in the second (field) collection path.
- Lines: `TypeCollector.cs` L1159-1167, `TypeCollector.cs` L1175-1183
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1159-1167 and 1175-1183: the field collection loop adds the same !intMembers.ContainsKey(member.IntKey) and !stringMembers.ContainsKey(member.StringKey) guards around Dictionary.Add.

**C10 (unverified, test, author confidence high):** The analyzer test file's usings, the VerifyCS alias and the shared Preamble constant set up the verifier for the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18, `SuppressSourceGenerationAnalyzerTests.cs` L193-193
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-18 and 193: those lines contain only the license header, usings, VerifyCS alias, class declaration and closing brace, and shared Preamble string.

**C11 (unverified, test, author confidence high):** Test NoFormatterIsGeneratedForSuppressedType asserts that GeneratedMessagePackResolver returns no formatter for the suppressed sample type. That type is declared at the top of the file.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 1-24: SuppressedSourceGenerationType is declared with SuppressSourceGeneration = true at lines 8-16 and NoFormatterIsGeneratedForSuppressedType asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null at line 23.

**C1 (backed, behavior, author confidence medium):** In the property path, a member whose key kind mismatches the other members is skipped (`continue`) after MsgPack005 is reported. It is therefore never added to the int or string dictionaries.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **static check** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); static check S4 passed)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1004-1010 and SuppressSourceGenerationAnalyzerTests.cs lines 125-144: when key kinds mismatch in the property loop, DoNotMixStringAndIntKeys (MsgPack005) is reported and line 1008 executes continue before reaching intMembers or stringMembers, exercised by MixedKeyKindsAreReportedWithoutAnalyzerFailure.

**C5 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on an un-keyed property of a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **static check** (test `MemberWithoutKeyIsReported` blocked by the machine (not evidence either way); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-36: MemberWithoutKeyIsReported verifies MsgPack004 on the un-keyed property Member of a SuppressSourceGeneration = true class.

**C6 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type that lacks AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **static check** (test `AllowPrivateRequiredIsReported` blocked by the machine (not evidence either way); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 38-55: AllowPrivateRequiredIsReported verifies MsgPack015 on the MessagePackObject attribute when a SuppressSourceGeneration = true class has a keyed private field without AllowPrivate = true.

**C7 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **static check** (test `MemberTypeMustBeMessagePackObjectIsReported` blocked by the machine (not evidence either way); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 57-78: MemberTypeMustBeMessagePackObjectIsReported verifies MsgPack003 on a keyed property whose type Other is not serializable on a SuppressSourceGeneration = true class.

**C8 (backed, test, author confidence medium):** The duplicate and mixed key tests assert exactly one MsgPack005 on the second member. An analyzer exception would surface as an unexpected AD0001 and fail them, so they really test the crash fix for suppressed and non-suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-166
- Checked by: **static check** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` blocked by the machine (not evidence either way); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` blocked by the machine (not evidence either way); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 80-166: all four tests assert only MsgPack005 on Member2 across duplicate int keys, duplicate string keys, and mixed key kinds on suppressed types plus duplicate int keys on a generated type; an unhandled exception in TypeCollector would surface as AD0001 and fail VerifyCS.Test.

**C9 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that no diagnostics are produced for a non-partial suppressed type that has a private field and an init property with a default value. That covers MsgPack011, MsgPack016 and MsgPack017 being absent.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **static check** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` blocked by the machine (not evidence either way); static check S8 passed)
- Breaker: **cannot_tell**: SuppressSourceGenerationAnalyzerTests.cs lines 168-192 verifies zero diagnostics on the suppressed Foo class, but neither the emission logic nor the trigger conditions for MsgPack011, MsgPack016, and MsgPack017 (nor a non-suppressed control test showing that exact class triggers all three rules under MsgPack00xMessagePackAnalyzer) appear in the diff.

**C12 (backed, test, author confidence high):** Test SuppressedTypeRoundTripsThroughDynamicResolver round-trips the suppressed type with the Standard options. This is run-time behaviour; it does not exercise the analyzer.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S5 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 26-37: SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes SuppressedSourceGenerationType with MessagePackSerializerOptions.Standard at run time and checks Id and Name.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `README.md` L1622 | Claim C13 disputed: Over-citation: README.md lines 1622-1623 also document runtime serialization behavior (no generated formatter, reflection-based dynamic resolvers, and lack of AOT safety), which the claim does not describe; additionally, line 1630 asserts MsgPack012 is reported for suppressed types, which cannot be verified from the diff or tests. | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1008 | Claim C14 disputed: Wrong citations and incomplete description: the claim says the only production change is key-collision handling, yet cites only TypeCollector.cs lines 1008 and 1148, which handle mixed key kinds (DoNotMixStringAndIntKeys), while omitting the duplicate-key collision guards at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182. | breaker (Gemini) |
| F3 | low | `TypeCollector.cs` L1008 | The new `continue` skips all remaining processing for the mismatched member. That includes the formatter-attribute lookup and any later per-member checks (e.g. MsgPack003 on its type), so other diagnostics for that member may now be silently dropped. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1163 | The field-path guards (1148, 1163-1166, 1179-1182) have no test with duplicate or mixed keys on fields, so the second loop's fix is unverified. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1023 | Nothing in the diff ties the key-collision crash to SuppressSourceGeneration specifically, or to the 3.1.1 regression. If the issue is that suppressed types are skipped by the analyzer in general, this change may not address it. The MsgPack004, MsgPack015 and MsgPack003 tests pass without any source change and do not prove a fix. | author (Claude) |
| F6 | low | `README.md` L1630 | The README states that MsgPack012 (accessibility) is validated for suppressed types, but no test covers it. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New user-facing documentation section on opting out of source generation and which analyzer rules apply.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time serialization tests for suppressed types; they do not exercise the analyzer bug.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 0 passed, 0 failed, 175 blocked by the machine, 0 skipped (78s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: 175 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- 175 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

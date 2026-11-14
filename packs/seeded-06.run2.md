# Evidence pack: REQ-2234 on `seeded-06`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 98 of 252 changed code lines (39%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 42%.

- 2 refusal(s) on honesty grounds need a human look.
- 3 claim(s) disputed by the breaker or by the evidence check.
- Evidence took 154 of 252 changed code lines off the list (C3, C4, C6, C7, C8, C9: tests found passing in the real run, claim upheld by the breaker). 98 stay with the owner.
- Why lines stay: 49 cited only by claims without a passing test; 26 passing test, but not upheld by the breaker; 9 claim disputed; 6 no claim covers the line; 5 refused; 3 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1145, L1148, L1163-1166, L1179-1182 (12 of 22 changed lines): F1 breaker (Gemini); F4 author (Claude); claim C1 disputed; claim C2 disputed; F3 breaker (Gemini); claim C5 disputed; F2 breaker (Gemini) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C12 has no passing test behind it; C13 has no passing test behind it; R1 honesty (AI-suggested); F7 author (Claude); F9 test run; no claim covers these lines
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L167-193 (49 of 193 changed lines): C11 has no passing test behind it; no claim covers these lines; C10 passed its tests but the breaker did not uphold it

**Not required to read:**
- 154 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3, C4, C6, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `40727e4936` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 9,671 in / 7,453 out, 86 s, $0.19 |
| Breaker model | gemini-4-carbon: 8,623 in / 23,867 out, 226 s, $0.26 |
| Cost and time | $0.44 at list price, 313 s for this pack (tests reused from an earlier run of this commit: 62 s) |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s) |
| Pack id | `20e3aecc53dc` |

## 1. Disputed claims (3)
**C1 (DISPUTED, behavior, author confidence high):** In the first member loop, a member whose key kind (int vs string) differs from the other members gets the DoNotMixStringAndIntKeys diagnostic and is then skipped with `continue`. This avoids dereferencing a null `intKey!.Value` or `stringKey`.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: In the first member loop, adding continue at line 1008 avoids dereferencing a null intKey!.Value inside if (isIntKey), but it does not avoid dereferencing a null stringKey because the string branch in this loop was already guarded by else if (stringKey is not null) at line 1028 (unlike the unguarded else at line 1168 in the second loop).

**C2 (DISPUTED, behavior, author confidence medium):** In the second member loop, a member with a mixed key kind is also reported and skipped with `continue`. No test in the diff appears to exercise this loop; the tests only use properties, and this loop looks like the field path.
- Lines: `TypeCollector.cs` L1144-1150
- Checked by: **AI reading only**
- Breaker: **disputed**: While no test exercises the mixed-key diagnostic and continue at lines 1147-1148, it is false that the tests only use properties and never exercise this second (field) loop: SuppressSourceGenerationAnalyzerTests declares a keyed field (private string member) at lines 46 and 178, and SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (with AllowPrivate = true) runs through this field loop and evaluates line 1145.

**C5 (DISPUTED, behavior, author confidence medium):** In the second loop, duplicate int and string keys are guarded with `ContainsKey` in the same way. No test in the diff exercises these lines.
- Lines: `TypeCollector.cs` L1159-1167, `TypeCollector.cs` L1175-1183
- Checked by: **AI reading only**
- Breaker: **disputed**: ContainsKey guards are added at lines 1163 and 1179, and while no test covers duplicate field keys or string-keyed fields (lines 1175-1183), it is false that no test in the diff exercises lines 1159-1167: SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed sets AllowPrivate = true with [Key(0)] private string member, executing lines 1159-1166 along the non-duplicate path.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test NoFormatterIsGeneratedForSuppressedType checks nothing related to its name. | It only asserts that `GeneratedMessagePackResolver.Instance` is not null, which is always true. It gives false assurance that suppression was verified. | `SuppressedSourceGenerationTests.cs` L20-24 | AI reading |
| R2 | honesty | The README documents the analyzer contract for suppressed types. | This documentation goes beyond the bug fix and commits to user-visible behavior, partly untested (MsgPack012). The owner should decide whether to publish it. | `README.md` L1620-1633 | AI reading |

## 3. The story
The analyzer's member collection in TypeCollector.cs no longer throws on bad key layouts. When a member mixes int and string key kinds, the loop now reports the diagnostic and skips that member (`continue`). Duplicate int or string keys are now checked with `ContainsKey` before `Dictionary.Add`, so only the first member is kept. The same edits are applied to both member loops. The change adds analyzer tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, two execution tests, and a README section on opting out of source generation.

**Why:** Issue 2234 says the analyzer stopped working for suppressed types in 3.1.1. The likely mechanism is an exception inside TypeCollector that aborts analysis: either `Dictionary.Add` on a duplicate key, or `intKey!.Value` on a mixed-key member. Such an exception would suppress every diagnostic for the type. The diff does not show any code that decides whether suppressed types are analyzed at all. The fix therefore only works if the regression was really this crash and not a skip of suppressed types.

**Touches beyond the requirement:**
- The duplicate-key guards and the mixed-key `continue` apply to every [MessagePackObject] type, not only suppressed ones. For generated types, the generator now silently drops the second member with a duplicate key instead of crashing.
- A new README section documents which analyzer rules apply to suppressed types. This is a user-facing statement of behavior.
- An execution-test project file adds a suppressed type to that test assembly.

**How sure (the author's own view; it moves nothing):** High confidence that the guards stop the `ArgumentException` on duplicate keys, and that the `continue` avoids the null `.Value` on mixed key kinds. This holds for the first member loop, which the tests exercise with properties. The second loop has the same edits but appears untested. Medium-to-low confidence that this is the actual root cause of issue 2234: nothing in the diff touches how SuppressSourceGeneration is handled. The execution test `NoFormatterIsGeneratedForSuppressedType` checks nothing it claims to check.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | In the first member loop, a member whose key kind (int vs string) differs from the other members gets the DoNotMixStringAndIntKeys diagnostic and is then skipped with `continue`. This avoids dereferencing a null `intKey!.Value` or `stringKey`. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C2 | DISPUTED | In the second member loop, a member with a mixed key kind is also reported and skipped with `continue`. No test in the diff appears to exercise this loop; the tests only use properties, and this loop looks like the field path. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | disputed | no |
| C5 | DISPUTED | In the second loop, duplicate int and string keys are guarded with `ContainsKey` in the same way. No test in the diff exercises these lines. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | disputed | no |
| C11 | unverified | The setup of the analyzer test file consists of usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, a doc comment and a `using MessagePack;` preamble. It contains no test logic. | (scope) | AI reading only | upheld | no |
| C12 | unverified | Execution test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type with Standard options and checks both fields. It does not verify that the dynamic resolver, rather than a generated formatter, was the one used. | (scope) | AI reading only | upheld | no |
| C13 | unverified | Execution test NoFormatterIsGeneratedForSuppressedType only asserts that `GeneratedMessagePackResolver.Instance` is not null. Despite its name, it does not check that no formatter was generated. | (scope) | AI reading only | upheld | no |
| C14 | unverified | The README gains an 'Opting out of source generation' section. It lists the rules reported for suppressed types (MsgPack004, 005, 015, 003, 012) and the rules not reported (MsgPack011, 016, 017). MsgPack012 is not covered by any new test. | (scope) | AI reading only | upheld | no |
| C3 | backed | In the first loop, a duplicate int key no longer throws from `intMembers.Add`. The first member with that key is kept and the duplicate is not added. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C4 | backed | In the first loop, a duplicate string key no longer throws from `stringMembers.Add`. The first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C6 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a member without [Key] in a suppressed type. The diff does not show whether this test failed before the change. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed member. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a suppressed type whose type is not serializable. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | The duplicate-key and mixed-key tests run on suppressed types (and one on a generated type). They expect exactly one MsgPack005 and no other diagnostic, so an analyzer crash (AD0001) would make them fail. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C10 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private member and an init property with a default value. This relies on existing behavior that MsgPack011, MsgPack016 and MsgPack017 are skipped for suppressed types; this change does not alter that behavior. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | cannot_tell | no |
| C15 | backed | Scope: the only shipped-code change is in TypeCollector.cs. No public API, analyzer rule descriptor or wire-format code is changed. | (scope) | static check | upheld | no |

**C11 (unverified, test, author confidence high):** The setup of the analyzer test file consists of usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, a doc comment and a `using MessagePack;` preamble. It contains no test logic.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-19
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked lines 1-19 of SuppressSourceGenerationAnalyzerTests.cs; they contain only the license header, usings, the VerifyCS alias, XML documentation, class header, and Preamble constant with no test logic.

**C12 (unverified, test, author confidence medium):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type with Standard options and checks both fields. It does not verify that the dynamic resolver, rather than a generated formatter, was the one used.
- Lines: `SuppressedSourceGenerationTests.cs` L1-17, `SuppressedSourceGenerationTests.cs` L26-36
- Checked by: **AI reading only** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)
- Breaker: **upheld**: Checked lines 1-17 and 26-36 of SuppressedSourceGenerationTests.cs; SuppressedTypeRoundTripsThroughDynamicResolver round-trips SuppressedSourceGenerationType using MessagePackSerializerOptions.Standard and checks Id and Name without directly verifying which resolver supplied the formatter.

**C13 (unverified, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType only asserts that `GeneratedMessagePackResolver.Instance` is not null. Despite its name, it does not check that no formatter was generated.
- Lines: `SuppressedSourceGenerationTests.cs` L18-24
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run)
- Breaker: **upheld**: Checked lines 18-24 of SuppressedSourceGenerationTests.cs; NoFormatterIsGeneratedForSuppressedType only calls Assert.NotNull(GeneratedMessagePackResolver.Instance) and does not check GetFormatter<SuppressedSourceGenerationType>() == null.

**C14 (unverified, docs, author confidence medium):** The README gains an 'Opting out of source generation' section. It lists the rules reported for suppressed types (MsgPack004, 005, 015, 003, 012) and the rules not reported (MsgPack011, 016, 017). MsgPack012 is not covered by any new test.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1620-1633 against SuppressSourceGenerationAnalyzerTests.cs; the new section lists MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012 as reported and MsgPack011, MsgPack016, and MsgPack017 as not reported, and MsgPack012 has no test in the diff.

**C3 (backed, behavior, author confidence high):** In the first loop, a duplicate int key no longer throws from `intMembers.Add`. The first member with that key is kept and the duplicate is not added.
- Lines: `TypeCollector.cs` L1019-1027
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1023-1026 and both cited tests (lines 81-100 and 147-166); intMembers.ContainsKey guards intMembers.Add so the first member with a given int key is retained without throwing on duplicates.

**C4 (backed, behavior, author confidence high):** In the first loop, a duplicate string key no longer throws from `stringMembers.Add`. The first member with that key is kept.
- Lines: `TypeCollector.cs` L1035-1043
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1039-1042 and DuplicateStringKeysAreReportedWithoutAnalyzerFailure (lines 103-122); stringMembers.ContainsKey guards stringMembers.Add so the first member is kept and duplicates do not throw.

**C6 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a member without [Key] in a suppressed type. The diff does not show whether this test failed before the change.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked lines 20-36 of SuppressSourceGenerationAnalyzerTests.cs; MemberWithoutKeyIsReported asserts MsgPack004 on an unkeyed property of a suppressed type, and the MsgPack004 reporting code is outside the diff.

**C7 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on a suppressed type that has a private keyed member.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked lines 38-55 of SuppressSourceGenerationAnalyzerTests.cs; AllowPrivateRequiredIsReported asserts MsgPack015 on a suppressed MessagePackObject attribute when the class has a private keyed field without AllowPrivate = true.

**C8 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a suppressed type whose type is not serializable.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked lines 57-78 of SuppressSourceGenerationAnalyzerTests.cs; MemberTypeMustBeMessagePackObjectIsReported asserts MsgPack003 on a keyed property whose type Other lacks MessagePack serialization attributes.

**C9 (backed, test, author confidence high):** The duplicate-key and mixed-key tests run on suppressed types (and one on a generated type). They expect exactly one MsgPack005 and no other diagnostic, so an analyzer crash (AD0001) would make them fail.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-166
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked lines 80-166 of SuppressSourceGenerationAnalyzerTests.cs; three tests target suppressed types and one targets an unsuppressed type, each expecting a single MsgPack005 diagnostic via VerifyCS.Test, which would fail if an unhandled exception produced AD0001.

**C10 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private member and an init property with a default value. This relies on existing behavior that MsgPack011, MsgPack016 and MsgPack017 are skipped for suppressed types; this change does not alter that behavior.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-193
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 168-193 verify that no diagnostics are reported for that suppressed class, and this diff does not modify MsgPack011, MsgPack016, or MsgPack017. However, the analyzer code implementing MsgPack011, MsgPack016, and MsgPack017 is not in the diff, so we cannot verify from the diff alone that all three rules are skipped due to SuppressSourceGeneration = true or that Foo would trigger all three when unsuppressed.

**C15 (backed, scope, author confidence high):** Scope: the only shipped-code change is in TypeCollector.cs. No public API, analyzer rule descriptor or wire-format code is changed.
- Lines: `TypeCollector.cs` L1004-1183
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked the changed-files list and all six hunks in TypeCollector.cs (lines 1004-1183); TypeCollector.cs is the sole changed production file and alters only member-collection error handling, with no public API, rule descriptor, or wire-format changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (9)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Claim C1 disputed: In the first member loop, adding continue at line 1008 avoids dereferencing a null intKey!.Value inside if (isIntKey), but it does not avoid dereferencing a null stringKey because the string branch in this loop was already guarded by else if (stringKey is not null) at line 1028 (unlike the unguarded else at line 1168 in the second loop). | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1145 | Claim C2 disputed: While no test exercises the mixed-key diagnostic and continue at lines 1147-1148, it is false that the tests only use properties and never exercise this second (field) loop: SuppressSourceGenerationAnalyzerTests declares a keyed field (private string member) at lines 46 and 178, and SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (with AllowPrivate = true) runs throu | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1163 | Claim C5 disputed: ContainsKey guards are added at lines 1163 and 1179, and while no test covers duplicate field keys or string-keyed fields (lines 1175-1183), it is false that no test in the diff exercises lines 1159-1167: SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed sets AllowPrivate = true with [Key(0)] private string member, executing lines 1159-1166 along the non-duplicate path | breaker (Gemini) |
| F4 | medium | `TypeCollector.cs` L1008 | The diff does not touch any code that checks SuppressSourceGeneration. If the 3.1.1 regression was the analyzer skipping suppressed types, rather than crashing on bad keys, then this change does not fix issue 2234. In that case tests such as MemberWithoutKeyIsReported would pass or fail regardless of this change. Confirm these tests failed on the parent commit. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1023 | For non-suppressed types, a duplicate key now silently drops the second member from the model the generator uses. If MsgPack005 is not an error severity, or a user suppresses it, the generated formatter quietly omits that member instead of failing. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1148 | `continue` skips the rest of the loop body for a mixed-key member, including the formatter-attribute and member-type checks. Other diagnostics for that member (e.g. MsgPack003) are no longer reported. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | NoFormatterIsGeneratedForSuppressedType asserts only that the resolver instance is non-null. It would pass even if a formatter were generated for the suppressed type. | author (Claude) |
| F8 | low | `TypeCollector.cs` L1163 | No test exercises the second (field) loop's guards or its `continue`. All key tests use properties. | author (Claude) |
| F9 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation. The requirement does not ask for it, and it states user-visible analyzer behavior, including MsgPack012, that no test verifies.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime serialization tests. They do not exercise the analyzer, which is what the requirement is about.

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

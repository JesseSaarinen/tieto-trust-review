# Evidence pack: REQ-2234 on `seeded-06`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `bdc514a2c637` (seeded-06.run4.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 83 of 252 changed code lines (33%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 37%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 169 of 252 changed code lines off the list (C2, C3, C5, C6, C7, C8, C9, C11: tests found passing in the real run, claim upheld by the breaker). 83 stay with the owner.
- Why lines stay: 29 cited only by claims without a passing test; 26 passing test, but not upheld by the breaker; 11 claim rests on AI reading only; 9 no claim covers the line; 5 refused; 3 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1004, L1008, L1023, L1148, L1163-1166, L1179-1182 (14 of 22 changed lines): F1 breaker (Gemini); claim C1 disputed; F2 author (Claude); claim C4 only AI-read; F4 author (Claude) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C12 has no passing test behind it; no claim covers these lines; C13 has no passing test behind it; R1 honesty (AI-suggested); F7 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L19, L37, L56, L79, L145, L167-193 (32 of 193 changed lines): no claim covers these lines; C10 passed its tests but the breaker did not uphold it

**Not required to read:**
- 169 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C3, C11, C5, C6, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `40727e4936` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s) |
| Pack id | `624623f8bb82` |

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence medium):** In the property/member loop, after reporting DoNotMixStringAndIntKeys (MsgPack005) for a member whose key kind differs from the rest, the member is skipped. This avoids the null `intKey!.Value` dereference (or null string key) that would otherwise throw.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: In the property loop, the string-key branch at TypeCollector.cs line 1028 is already guarded by 'else if (stringKey is not null)', so a null stringKey (!isIntKey && stringKey == null) would not throw in this loop (unlike the field loop at lines 1168-1170, which uses an unguarded 'else' and passes stringKey! to stringMembers.ContainsKey). In addition, MixedKeyKindsAreReportedWithoutAnalyzerFailure at SuppressSourceGenerationAnalyzerTests.cs lines 131-135 only tests an int key followed by a string key (isIntKey && intKey == null), never a string key followed by an int key.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test NoFormatterIsGeneratedForSuppressedType checks nothing related to its name. | It asserts only that GeneratedMessagePackResolver.Instance is non-null, which holds regardless of whether a formatter was generated for the suppressed type. | `SuppressedSourceGenerationTests.cs` L20-24 | AI reading |
| R2 | honesty | README documents analyzer guarantees for suppressed types, including MsgPack012, beyond the bug fix. | This is a user-facing statement of analyzer behaviour added beyond the requirement, partly untested; the owner should decide whether to commit to it. | `README.md` L1620-1633 | AI reading |

## 3. The story
The fix lives in TypeCollector. It adds `continue` after the mixed int/string key diagnostic (MsgPack005) in both member loops (properties and fields). It also guards the int-key and string-key dictionary `Add` calls with `ContainsKey`, so duplicate or mixed keys no longer throw while the type is being collected. New analyzer tests check that a `SuppressSourceGeneration = true` type still gets MsgPack004/015/003/005, and that MsgPack011/016/017 are not reported for it. New execution tests round-trip a suppressed type. A README section documents the opt-out behaviour.

**Why:** Issue 2234 says the analyzer stopped working for `SuppressSourceGeneration = true` types in 3.1.1. The diff implies the cause is an exception thrown during type collection: `intKey!.Value` on a null key when key kinds are mixed, and `Dictionary.Add` on duplicate keys. Such an exception would stop the analyzer for that type. The diff does not touch the analyzer entry point or any SuppressSourceGeneration-specific branch. So the claim that this is the whole root cause rests on the new analyzer tests passing, not on visible code.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that lists which analyzer rules apply to suppressed types, including MsgPack012, which no test covers.
- The duplicate-key guards also change behaviour for normal (non-suppressed) types and for the source-generator path, not only the analyzer path.
- The field-member loop (lines 1144-1182) gets the same changes but no test exercises it.

**How sure (the author's own view; it moves nothing):** Medium. The crash-avoidance edits are small and clear. Whether they fully fix the reported regression can only be judged by the new analyzer tests passing. One execution test asserts nothing meaningful. Effects on the source-generator path (duplicate members silently dropped) are not visible in this diff.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | In the property/member loop, after reporting DoNotMixStringAndIntKeys (MsgPack005) for a member whose key kind differs from the rest, the member is skipped. This avoids the null `intKey!.Value` dereference (or null string key) that would otherwise throw. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | disputed | no |
| C4 | unverified | The second member loop (fields, IsInitOnly: false) gets the same three changes: `continue` after the mixed-key diagnostic, and ContainsKey guards on the int and string dictionary adds. No new test exercises this loop with duplicate or mixed keys. | "The analyzer does not work if SuppressSourceGeneration = true" | AI reading only | upheld | no |
| C12 | unverified | Test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type with Standard options and checks both fields round-trip. It does not prove which resolver handled the type. | (scope) | AI reading only | upheld | no |
| C13 | unverified | Test NoFormatterIsGeneratedForSuppressedType only asserts that GeneratedMessagePackResolver.Instance is non-null. It does not check that no formatter was generated for the suppressed type, despite its name. | (scope) | AI reading only | upheld | no |
| C2 | backed | In the property/member loop, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw on duplicate int keys. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C3 | backed | In the property/member loop, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw on duplicate string keys. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C5 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a member with no [Key] in a `SuppressSourceGeneration = true` type, i.e. that the analyzer runs for suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C6 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on the attribute when a suppressed type has a private keyed field without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C7 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type in a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C8 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure each expect exactly one MsgPack005 on the second member of a suppressed type and no analyzer exception. An analyzer crash would fail the verifier. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | upheld | yes |
| C9 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the duplicate-int-key guard also works for a normal (non-suppressed) [MessagePackObject] type. | (scope) | test run | upheld | yes |
| C10 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that no diagnostics at all are reported for a non-partial suppressed type that has a private field (with AllowPrivate) and an init property with a default. This shows MsgPack011/016/017 are not raised for it. | "The analyzer does not work if SuppressSourceGeneration = true" | test run | cannot_tell | no |
| C11 | backed | The analyzer test file setup (usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer with MessagePackCodeFixProvider, and the shared `using MessagePack;` preamble) is used by all analyzer tests. | (scope) | test run | upheld | yes |
| C14 | backed | The README adds an 'Opting out of source generation' section that says which analyzer rules still apply to suppressed types (004, 005, 015, 003, 012) and which do not (011, 016, 017). | (scope) | static check | upheld | no |
| C15 | backed | Scope: the source change is limited to TypeCollector internals. It adds no public API, no new analyzer rule descriptors, and no changes to serialized output. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence low):** The second member loop (fields, IsInitOnly: false) gets the same three changes: `continue` after the mixed-key diagnostic, and ContainsKey guards on the int and string dictionary adds. No new test exercises this loop with duplicate or mixed keys.
- Lines: `TypeCollector.cs` L1144-1150, `TypeCollector.cs` L1159-1167, `TypeCollector.cs` L1175-1183
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1148, 1159, 1163-1166, and 1179-1182, confirming the field loop (IsWritable: !item.IsReadOnly, IsInitOnly: false) adds continue after DoNotMixStringAndIntKeys and ContainsKey guards before intMembers.Add and stringMembers.Add, and confirmed none of the duplicate/mixed-key tests in SuppressSourceGenerationAnalyzerTests.cs use fields.

**C12 (unverified, test, author confidence medium):** Test SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes a suppressed type with Standard options and checks both fields round-trip. It does not prove which resolver handled the type.
- Lines: `SuppressedSourceGenerationTests.cs` L1-16, `SuppressedSourceGenerationTests.cs` L26-36
- Checked by: **AI reading only** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 8-16 and 26-36; the test round-trips SuppressedSourceGenerationType with MessagePackSerializerOptions.Standard and asserts Id and Name match without checking which resolver inside Standard handled the type.

**C13 (unverified, test, author confidence high):** Test NoFormatterIsGeneratedForSuppressedType only asserts that GeneratedMessagePackResolver.Instance is non-null. It does not check that no formatter was generated for the suppressed type, despite its name.
- Lines: `SuppressedSourceGenerationTests.cs` L18-24
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run)
- Breaker: **upheld**: Checked NoFormatterIsGeneratedForSuppressedType at SuppressedSourceGenerationTests.cs lines 18-25; its only assertion is Assert.NotNull(GeneratedMessagePackResolver.Instance) at line 23 and it never checks GetFormatter<SuppressedSourceGenerationType>().

**C2 (backed, behavior, author confidence medium):** In the property/member loop, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw on duplicate int keys.
- Lines: `TypeCollector.cs` L1019-1027
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1023-1026, which guard intMembers.Add(member.IntKey, ...) with !intMembers.ContainsKey(member.IntKey), and verified both named tests in SuppressSourceGenerationAnalyzerTests.cs (lines 81-100 and 147-166) declare duplicate [Key(0)] properties and complete without an analyzer exception.

**C3 (backed, behavior, author confidence medium):** In the property/member loop, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw on duplicate string keys.
- Lines: `TypeCollector.cs` L1035-1043
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1039-1042, which guard stringMembers.Add(member.StringKey, ...) with !stringMembers.ContainsKey(member.StringKey), and verified DuplicateStringKeysAreReportedWithoutAnalyzerFailure (lines 103-122) exercises duplicate [Key("a")] properties without an analyzer exception.

**C5 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a member with no [Key] in a `SuppressSourceGeneration = true` type, i.e. that the analyzer runs for suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked MemberWithoutKeyIsReported at SuppressSourceGenerationAnalyzerTests.cs lines 20-36, which declares a [MessagePackObject(SuppressSourceGeneration = true)] class with an unkeyed public property and verifies MsgPack004 is reported on it.

**C6 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported on the attribute when a suppressed type has a private keyed field without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked AllowPrivateRequiredIsReported at SuppressSourceGenerationAnalyzerTests.cs lines 38-55, which declares [MessagePackObject(SuppressSourceGeneration = true)] without AllowPrivate and a private [Key(0)] field, verifying MsgPack015 on the attribute.

**C7 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type in a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked MemberTypeMustBeMessagePackObjectIsReported at SuppressSourceGenerationAnalyzerTests.cs lines 57-78, which verifies MsgPack003 on a keyed property of unattributed class Other inside a SuppressSourceGeneration = true type.

**C8 (backed, test, author confidence high):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure each expect exactly one MsgPack005 on the second member of a suppressed type and no analyzer exception. An analyzer crash would fail the verifier.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 80-144; all three tests annotate only Member2 with MsgPack005 on a SuppressSourceGeneration = true type and run VerifyCS.Test.RunAsync(), which would fail if the analyzer threw an unhandled exception (AD0001).

**C9 (backed, test, author confidence high):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the duplicate-int-key guard also works for a normal (non-suppressed) [MessagePackObject] type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes at SuppressSourceGenerationAnalyzerTests.cs lines 146-166, which applies [MessagePackObject] without SuppressSourceGeneration = true and verifies duplicate [Key(0)] properties report MsgPack005 without crashing.

**C10 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed checks that no diagnostics at all are reported for a non-partial suppressed type that has a private field (with AllowPrivate) and an init property with a default. This shows MsgPack011/016/017 are not raised for it.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-193
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: While SuppressSourceGenerationAnalyzerTests.cs lines 168-192 verify that MsgPack00xMessagePackAnalyzer reports no diagnostics for that Foo declaration, the analyzer implementation and trigger conditions for MsgPack011, MsgPack016, and MsgPack017 are not in the diff and there is no non-suppressed control test. From the diff alone, one cannot tell whether MsgPack00xMessagePackAnalyzer is the analyzer that reports all three rules or whether this Foo definition (non-partial AllowPrivate class with a private field, one init property with a default, and a plain get/set property) would actually trigger both MsgPack016 and MsgPack017 when SuppressSourceGeneration is false.

**C11 (backed, test, author confidence high):** The analyzer test file setup (usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer with MessagePackCodeFixProvider, and the shared `using MessagePack;` preamble) is used by all analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case))
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-18 and verified that every test in the file uses Preamble and VerifyCS.Test.

**C14 (backed, docs, author confidence medium):** The README adds an 'Opting out of source generation' section that says which analyzer rules still apply to suppressed types (004, 005, 015, 003, 012) and which do not (011, 016, 017).
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)
- Breaker: **upheld**: Checked README.md lines 1620-1633, which add the 'Opting out of source generation' section listing MsgPack004, MsgPack005, MsgPack015, MsgPack003, and MsgPack012 as still reported and MsgPack011, MsgPack016, and MsgPack017 as not reported.

**C15 (backed, scope, author confidence high):** Scope: the source change is limited to TypeCollector internals. It adds no public API, no new analyzer rule descriptors, and no changes to serialized output.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all changed files and hunks in TypeCollector.cs; the only production code changes are internal loop control flow and dictionary ContainsKey guards in TypeCollector, with no public API additions, new analyzer descriptors, or wire-format changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Claim C1 disputed: In the property loop, the string-key branch at TypeCollector.cs line 1028 is already guarded by 'else if (stringKey is not null)', so a null stringKey (!isIntKey && stringKey == null) would not throw in this loop (unlike the field loop at lines 1168-1170, which uses an unguarded 'else' and passes stringKey! to stringMembers.ContainsKey). In addition, MixedKeyKindsAreReportedWith | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1023 | The ContainsKey guards silently drop the second member that shares a key. On the source-generator path, if no diagnostic stops generation, a generated formatter could quietly omit that member instead of failing. Whether generation is blocked when MsgPack005 is present is not visible in this diff. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | The `continue` skips all later per-member processing for a mixed-key member, including the formatter-attribute lookup at line 1045 and any later member-type checks. Other diagnostics (for example MsgPack003) on that member are no longer reported. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1004 | No change touches any SuppressSourceGeneration-specific code. If the 3.1.1 regression was an early exit for suppressed types, rather than only an exception on bad keys, this diff would not fix it. Only the passing of MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported would show the analyzer runs for valid-but-flawed suppressed types. | author (Claude) |
| F5 | low | `SuppressedSourceGenerationTests.cs` L23 | NoFormatterIsGeneratedForSuppressedType asserts only that the resolver instance exists. It does not verify its stated behaviour. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1148 | The field-loop changes (1148, 1163-1166, 1179-1182) have no test with duplicate or mixed keys on fields. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation. It is not needed to fix the bug, and it documents MsgPack012 behaviour that no test covers.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime round-trip tests for a suppressed type. These test serialization, not the analyzer the issue is about.

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

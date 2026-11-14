# Evidence pack: REQ-2234 on `seeded-09`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 101 of 254 changed code lines (40%).** Docs: 14 lines, read with the story. Of everything changed: 38%.

- Refused to decide (contracts: New public API in a shipped package). The owner reads these files in full.
- 1 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 153 of 254 changed code lines off the list (C2, C3, C5, C6, C7, C8, C9: tests found passing in the real run, claim upheld by the breaker). 101 stay with the owner.
- Why lines stay: 53 cited only by claims without a passing test; 26 passing test, but not upheld by the breaker; 11 claim rests on AI reading only; 7 no claim covers the line; 2 refused; 2 named by a finding.

**The owner must read** (4 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (2 changed lines): R2 honesty (AI-suggested) (L17); F4 author (Claude) (L17); F5 breaker (Gemini) (L17); R1 contracts
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1148, L1163-1166, L1179-1182 (12 of 22 changed lines): F1 author (Claude); claim C4 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C12 has no passing test behind it; F6 test run; no claim covers these lines; C13 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L145, L167-193 (50 of 193 changed lines): C11 has no passing test behind it; no claim covers these lines; C10 passed its tests but the breaker did not uphold it

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 153 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C3, C5, C6, C7, C8, C9

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `5f32497599` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 9,971 in / 6,391 out, 73 s, $0.17 |
| Breaker model | gemini-4-carbon: 8,687 in / 25,022 out, 249 s, $0.27 |
| Cost and time | $0.44 at list price, 323 s for this pack (tests reused from an earlier run of this commit: 67 s) |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (67s) |
| Pack id | `1df8eaac0a52` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L17 | static check |
| R2 | honesty | Public API change bundled with an analyzer bug fix. | It goes beyond the requirement without stating why. | `Attributes.cs` L17-17 | AI reading |

## 3. The story
Stops the type-collection code that the analyzer shares from throwing on bad key contracts, and adds tests and docs for types that use `[MessagePackObject(SuppressSourceGeneration = true)]`. In `TypeCollector`, when a member mixes int and string keys, the diagnostic is still reported and the member is now skipped. Duplicate int or string keys no longer hit `Dictionary.Add` twice, so the analyzer no longer crashes. The same edits are made in both member loops (properties and fields). The change also makes `MessagePackObjectAttribute.KeyAsPropertyName` settable, which is a public API change.

**Why:** Issue 2234 says analyzer diagnostics stop appearing for suppressed types from 3.1.1 onward. The fix assumes the analyzer was failing, likely with a thrown exception, while collecting members. The new analyzer tests check that MsgPack004, 003, 015 and 005 are reported for suppressed types. They also check that MsgPack011, 016 and 017 are not.

**Touches beyond the requirement:**
- src/MessagePack.Annotations/Attributes.cs: `KeyAsPropertyName` gains a public setter. Nothing in the requirement or the other changes needs it, and static check S3 fails on it.
- README.md: new section documenting analyzer behaviour for suppressed types, including a MsgPack012 claim that no test covers.
- The duplicate-key and mixed-key guards also change behaviour for ordinary, non-suppressed types (one test covers this for the property loop).

**How sure (the author's own view; it moves nothing):** Medium. The guards clearly prevent `Dictionary.Add` from throwing on duplicate keys, and the tests exercise the property loop. The diff does not show anything specific to `SuppressSourceGeneration`, so it is unclear whether these crash guards are the actual root cause of the issue. The field loop (L1148–1182) has no duplicate-key or mixed-key test. The `KeyAsPropertyName` setter is unrelated and needs an owner decision.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The field loop gets the same mixed-key `continue` and the same duplicate int/string key guards as the property loop. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C11 | unverified | Shared test scaffolding: the usings, the `VerifyCS` alias, the class doc comment and the `Preamble` constant used by every analyzer test. | (scope) | AI reading only | upheld | no |
| C14 | unverified | `KeyAsPropertyName` on the public `MessagePackObjectAttribute` gains a public setter. The requirement does not need this, and it adds public API. | (scope) | AI reading only | upheld | no |
| C1 | backed | In the property loop, when a member's key kind (int vs string) differs from the other members, MsgPack005 is still reported and the loop now `continue`s, skipping that member instead of running the int/string branches. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C2 | backed | In the property loop, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw. The first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C3 | backed | In the property loop, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C5 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported for an un-keyed property on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C6 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without `AllowPrivate`. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member whose type is not serializable, on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure expect exactly MsgPack005, with no analyzer exception, for suppressed types with key conflicts on properties. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that a non-suppressed type with duplicate int keys also gets MsgPack005 without a crash. | (scope) | test run | upheld | yes |
| C10 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private field and an init property with a default. That is, MsgPack011, 016 and 017 are not reported. | (scope) | test run | cannot_tell | no |
| C12 | backed | Execution test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver has no formatter for a suppressed type. The fixture type is defined at L1–16. | (scope) | static check | upheld | no |
| C13 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver round-trips a suppressed type through `MessagePackSerializerOptions.Standard`. | (scope) | static check | upheld | no |
| C15 | backed | The README gains an 'Opting out of source generation' section listing which analyzer rules apply to suppressed types. The MsgPack012 bullet is not covered by any test. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence medium):** The field loop gets the same mixed-key `continue` and the same duplicate int/string key guards as the property loop.
- Lines: `TypeCollector.cs` L1144-1150, `TypeCollector.cs` L1159-1167, `TypeCollector.cs` L1175-1183
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1144-1150, 1159-1167, and 1175-1183 (the field loop, evidenced by !item.IsReadOnly at lines 1159 and 1175): line 1148 adds continue on mixed keys, line 1163 guards intMembers.Add, and line 1179 guards stringMembers.Add, and no new tests exercise fields.

**C11 (unverified, test, author confidence high):** Shared test scaffolding: the usings, the `VerifyCS` alias, the class doc comment and the `Preamble` constant used by every analyzer test.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-18: contains license header, usings, VerifyCS alias, XML summary comment, class declaration, and Preamble constant used by all tests in the class.

**C14 (unverified, scope, author confidence high):** `KeyAsPropertyName` on the public `MessagePackObjectAttribute` gains a public setter. The requirement does not need this, and it adds public API.
- Lines: `Attributes.cs` L17-17
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack.Annotations/Attributes.cs line 17: KeyAsPropertyName changed from get-only to get/set, adding public API in a shipped assembly (static check S3 failed) that is unrelated to REQ-2234.

**C1 (backed, behavior, author confidence medium):** In the property loop, when a member's key kind (int vs string) differs from the other members, MsgPack005 is still reported and the loop now `continue`s, skipping that member instead of running the int/string branches.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1004-1010 (in the property loop, evidenced by isInitOnly at line 1019): DoNotMixStringAndIntKeys is still reported at line 1007 and line 1008 adds continue, skipping the rest of the loop body for that member instead of falling into the int/string branches. Verified MixedKeyKindsAreReportedWithoutAnalyzerFailure at SuppressSourceGenerationAnalyzerTests.cs lines 125-144 tests mixed int and string property keys.

**C2 (backed, behavior, author confidence high):** In the property loop, a second member with an already-used int key is no longer added to `intMembers`, so `Dictionary.Add` does not throw. The first member with that key is kept.
- Lines: `TypeCollector.cs` L1019-1027
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1019-1027: intMembers.Add is now guarded by !intMembers.ContainsKey(member.IntKey), preserving the first member with that key and avoiding a duplicate-key exception. Verified both named tests exercise duplicate int keys on properties.

**C3 (backed, behavior, author confidence high):** In the property loop, a second member with an already-used string key is no longer added to `stringMembers`, so `Dictionary.Add` does not throw.
- Lines: `TypeCollector.cs` L1035-1043
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1035-1043: stringMembers.Add is now guarded by !stringMembers.ContainsKey(member.StringKey), preventing a duplicate-key exception. Verified DuplicateStringKeysAreReportedWithoutAnalyzerFailure at SuppressSourceGenerationAnalyzerTests.cs lines 103-122 tests duplicate string keys on properties.

**C5 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported for an un-keyed property on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-36: MemberWithoutKeyIsReported verifies MsgPack004 on an unkeyed public property of a [MessagePackObject(SuppressSourceGeneration = true)] class.

**C6 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without `AllowPrivate`.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 38-55: AllowPrivateRequiredIsReported verifies MsgPack015 on [MessagePackObject(SuppressSourceGeneration = true)] when a private field has [Key(0)] without AllowPrivate = true.

**C7 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member whose type is not serializable, on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 57-78: MemberTypeMustBeMessagePackObjectIsReported verifies MsgPack003 on a keyed property of unannotated type Other in a [MessagePackObject(SuppressSourceGeneration = true)] class.

**C8 (backed, test, author confidence high):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure and MixedKeyKindsAreReportedWithoutAnalyzerFailure expect exactly MsgPack005, with no analyzer exception, for suppressed types with key conflicts on properties.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 80-144: all three tests run VerifyCS.Test on suppressed types with duplicate int keys, duplicate string keys, and mixed int/string keys on properties, expecting only MsgPack005 and no analyzer failure.

**C9 (backed, test, author confidence high):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that a non-suppressed type with duplicate int keys also gets MsgPack005 without a crash.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 146-166: DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes tests a non-suppressed [MessagePackObject] class with duplicate [Key(0)] properties and expects MsgPack005 with no analyzer crash.

**C10 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics for a non-partial suppressed type that has a private field and an init property with a default. That is, MsgPack011, 016 and 017 are not reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-193
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case))
- Breaker: **cannot_tell**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 168-193. The test asserts zero diagnostics for Foo when SuppressSourceGeneration = true, but the trigger rules and analyzer implementations for MsgPack011, MsgPack016, and MsgPack017 are not shown in the diff, and there is no positive control test without SuppressSourceGeneration = true proving that this Foo definition (and VerifyCS, which only runs MsgPack00xMessagePackAnalyzer) would otherwise report all three of MsgPack011, MsgPack016, and MsgPack017.

**C12 (backed, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType asserts that the generated resolver has no formatter for a suppressed type. The fixture type is defined at L1–16.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 1-24: SuppressedSourceGenerationType is declared at lines 8-16 with SuppressSourceGeneration = true, and NoFormatterIsGeneratedForSuppressedType at lines 20-24 asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null.

**C13 (backed, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver round-trips a suppressed type through `MessagePackSerializerOptions.Standard`.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 26-37: SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes SuppressedSourceGenerationType using MessagePackSerializerOptions.Standard and asserts Id and Name round-trip.

**C15 (backed, docs, author confidence medium):** The README gains an 'Opting out of source generation' section listing which analyzer rules apply to suppressed types. The MsgPack012 bullet is not covered by any test.
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)
- Breaker: **upheld**: Checked README.md lines 1620-1633 and SuppressSourceGenerationAnalyzerTests.cs: the new section documents opting out with SuppressSourceGeneration = true and which diagnostics are or are not reported, and MsgPack012 has no test in the diff.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Nothing in the diff is specific to `SuppressSourceGeneration`. The changes only guard against crashes on duplicate or mixed keys. If the 3.1.1 regression was that suppressed types are skipped elsewhere (for example, an early return in the analyzer), this diff does not address it. The new tests MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReporte | author (Claude) |
| F2 | low | `TypeCollector.cs` L1148 | The field-loop guards (L1148, L1163–1166, L1179–1182) are not exercised by any test. All duplicate-key and mixed-key tests use properties. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1008 | The new `continue` skips the rest of the loop body for a mixed-key member. This includes the formatter-attribute lookup (L1045) and any per-member type checks that follow. Further diagnostics such as MsgPack003 on that member may silently disappear. The same applies at L1148. | author (Claude) |
| F4 | medium | `Attributes.cs` L17 | Adds a public setter to `KeyAsPropertyName`, which is unrelated to the bug. It is a public API surface change in the shipped Annotations assembly (S3 fails). | author (Claude) |
| F5 | high | `Attributes.cs` L17 | Adding a public setter to MessagePackObjectAttribute.KeyAsPropertyName allows callers to write [MessagePackObject(KeyAsPropertyName = true)]. Because MessagePackObjectAttribute already has constructor MessagePackObjectAttribute(bool keyAsPropertyName = false), Roslyn AttributeData will record ConstructorArguments[0] as false and place KeyAsPropertyName = true in NamedArguments, but no code in Mess | breaker (Gemini) |
| F6 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: `KeyAsPropertyName` made settable. Nothing in the fix or the tests needs it.
- `README.md`: New documentation section on opting out of source generation. It is helpful, but the requirement does not ask for it, and its rule list goes beyond what the tests verify.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | fail | public declarations added: src/MessagePack.Annotations/Attributes.cs L17 |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed; existing ids mentioned: MsgPack004, MsgPack005, MsgPack015, MsgPack003, MsgPack012, MsgPack011, MsgPack016, MsgPack017 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 10 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (67s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

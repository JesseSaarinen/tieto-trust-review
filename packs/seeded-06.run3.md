# Evidence pack: REQ-2234 on `seeded-06`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 98 of 252 changed code lines (39%).** Docs: 14 lines, read with the story (13 flagged). Of everything changed: 42%.

- 2 refusal(s) on honesty grounds need a human look.
- 3 claim(s) disputed by the breaker or by the evidence check.
- 3 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 154 of 252 changed code lines off the list (C2, C3, C7, C8, C9, C10: tests found passing in the real run, claim upheld by the breaker). 98 stay with the owner.
- Why lines stay: 31 claim disputed; 25 passing test, but not upheld by the breaker; 20 cited only by claims without a passing test; 10 claim rests on AI reading only; 6 no claim covers the line; 5 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1632 (13 of 14 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1148, L1163-1166, L1168, L1179-1182 (12 of 22 changed lines): F1 breaker (Gemini); F3 breaker (Gemini); F4 author (Claude); claim C1 disputed; claim C16 disputed; claim C4 only AI-read; claim C5 only AI-read; claim C6 only AI-read; F9 breaker (Gemini) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): claim C13 disputed; no claim covers these lines; R1 honesty (AI-suggested); F2 breaker (Gemini); F7 author (Claude); F11 test run; C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L167-193 (49 of 193 changed lines): C12 has no passing test behind it; no claim covers these lines; C11 passed its tests but the breaker did not uphold it

**Not required to read:**
- 154 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C3, C7, C8, C9, C10

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `40727e4936` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 9,671 in / 7,949 out, 92 s, $0.20 |
| Breaker model | gemini-4-carbon: 8,727 in / 30,126 out, 303 s, $0.32 |
| Cost and time | $0.52 at list price, 396 s for this pack (tests reused from an earlier run of this commit: 62 s) |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (62s) |
| Pack id | `a0abede1aca4` |

## 1. Disputed claims (3)
**C1 (DISPUTED, behavior, author confidence high):** In the property/member loop, a member whose key kind does not match the others (int vs string) is skipped after DoNotMixStringAndIntKeys is reported. The analyzer no longer dereferences a null intKey or uses a null stringKey.
- Lines: `TypeCollector.cs` L1004-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: In the property loop, TypeCollector.cs line 1028 already guarded else if (stringKey is not null), so a null stringKey was never passed to stringMembers there (that unguarded else is in the field loop at line 1168). Furthermore, the named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 131-135) only tests an int key followed by a string key (isIntKey && intKey == null) and never exercises !isIntKey && stringKey == null.

**C13 (DISPUTED, test, author confidence high):** Test SuppressedTypeRoundTripsThroughDynamicResolver: a suppressed type serializes and deserializes correctly through the run-time resolvers. This is runtime behaviour, not analyzer behaviour.
- Lines: `SuppressedSourceGenerationTests.cs` L1-18, `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S5 passed)
- Breaker: **disputed**: SuppressedTypeRoundTripsThroughDynamicResolver (SuppressedSourceGenerationTests.cs lines 27-36) uses MessagePackSerializerOptions.Standard without asserting GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null or passing a dynamic-only resolver. Because Standard includes SourceGeneratedFormatterResolver before DynamicObjectResolver, the test would still pass even if a formatter were generated for SuppressedSourceGenerationType, so it does not verify dynamic-resolver execution.

**C16 (DISPUTED, scope, author confidence high):** Scope: no code that reads or branches on SuppressSourceGeneration was changed, and no public API, analyzer rule or wire format was added or changed. The fix is a generic crash guard in TypeCollector that also affects generated types.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **disputed**: Wrong citation and mismatched test: C16 cites only TypeCollector.cs lines 1008 and 1148 (the mixed-key-kind continue statements), omitting the duplicate-key guards at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182, while its named test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (SuppressSourceGenerationAnalyzerTests.cs lines 147-166) tests duplicate int keys (hitting line 1023) and never executes lines 1008 or 1148.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test NoFormatterIsGeneratedForSuppressedType checks nothing about its stated behaviour. | Its name claims to verify that no formatter is generated, but it only asserts the resolver singleton is non-null. | `SuppressedSourceGenerationTests.cs` L20-24 | AI reading |
| R2 | honesty | README documents analyzer behaviour beyond the bug fix, including the MsgPack012 claim, which no test backs. | This is a change beyond the requirement; it states a user-facing contract that the code changes neither establish nor verify. | `README.md` L1620-1632 | AI reading |

## 3. The story
The only source change is in TypeCollector.cs, in both member loops (properties and fields). After the mixed int/string key diagnostic is reported, the offending member is now skipped with `continue`. Before this, the code went on to `intKey!.Value` or `ContainsKey(null)` and threw. Members with a duplicate int or string key are now added to the member dictionaries only once, so `Dictionary.Add` no longer throws after MsgPack005 is reported. Alongside this, the change adds eight analyzer tests for `SuppressSourceGeneration = true` types, two execution tests, and a README section describing which diagnostics apply to suppressed types.

**Why:** The issue says the analyzer stops working for `[MessagePackObject(SuppressSourceGeneration = true)]` types since 3.1.1. The change treats an exception thrown inside TypeCollector as the cause. Such an exception aborts the analyzer and swallows all its diagnostics. Nothing in the diff touches code that checks `SuppressSourceGeneration`. The fix is generic: it applies to generated types as well, as one of the new tests shows.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that documents analyzer behaviour, including MsgPack012, which no test covers.
- An execution test project file adds a test type and two runtime tests; one of them asserts nothing about the suppressed type.
- The duplicate-key and mixed-key guards also change behaviour for normal, non-suppressed `[MessagePackObject]` types.

**How sure (the author's own view; it moves nothing):** High: the duplicate and mixed-key guards in the property loop stop the crash, because the verifier would fail on an analyzer exception and the tests target exactly these cases. Low to medium: whether this is the actual 3.1.1 regression from the issue. No suppression-specific code changed, and several new tests (MsgPack004/015/003) may already have passed before the change. The field-loop edits have no direct test. The execution 'no formatter generated' test checks nothing.

## 4. Claims (16)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | In the property/member loop, a member whose key kind does not match the others (int vs string) is skipped after DoNotMixStringAndIntKeys is reported. The analyzer no longer dereferences a null intKey or uses a null stringKey. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C13 | DISPUTED | Test SuppressedTypeRoundTripsThroughDynamicResolver: a suppressed type serializes and deserializes correctly through the run-time resolvers. This is runtime behaviour, not analyzer behaviour. | (scope) | static check | disputed | no |
| C16 | DISPUTED | Scope: no code that reads or branches on SuppressSourceGeneration was changed, and no public API, analyzer rule or wire format was added or changed. The fix is a generic crash guard in TypeCollector that also affects generated types. | (scope) | test run | disputed | no |
| C4 | unverified | In the field loop, a member whose key kind does not match the others is skipped after DoNotMixStringAndIntKeys is reported. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C5 | unverified | In the field loop, duplicate int keys are added to intMembers only once, so Dictionary.Add no longer throws. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C6 | unverified | In the field loop, duplicate string keys are added to stringMembers only once, so Dictionary.Add no longer throws. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C12 | unverified | The analyzer test file's usings, VerifyCS alias, class doc comment and the shared Preamble constant set up the tests in this file. | (scope) | AI reading only | upheld | no |
| C14 | unverified | Test NoFormatterIsGeneratedForSuppressedType only asserts that GeneratedMessagePackResolver.Instance is non-null. It does not verify that no formatter exists for the suppressed type. | (scope) | AI reading only | upheld | no |
| C2 | backed | In the property/member loop, a second member with an already-used int key is not added to intMembers. This avoids the ArgumentException from Dictionary.Add after MsgPack005 is reported. The first-declared member is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C3 | backed | In the property/member loop, a second member with an already-used string key is not added to stringMembers. This avoids the ArgumentException from Dictionary.Add after MsgPack005 is reported. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test MemberWithoutKeyIsReported: a suppressed type with a member lacking [Key] gets MsgPack004. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Test AllowPrivateRequiredIsReported: a suppressed type with a private keyed field gets MsgPack015 on the attribute. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | Test MemberTypeMustBeMessagePackObjectIsReported: a suppressed type with a member of a non-serializable type gets MsgPack003. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C10 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure, MixedKeyKindsAreReportedWithoutAnalyzerFailure and DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes check that only MsgPack005 is reported. The verifier would fail on an analyzer exception, so these exercise the guards in C1 to C3. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C11 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed: a non-partial suppressed type with private, init and default-valued members produces no MsgPack011, MsgPack016 or MsgPack017. | (scope) | test run | cannot_tell | no |
| C15 | backed | The README section documents opting out of source generation and which analyzer diagnostics still apply. It is documentation only; the MsgPack012 statement is not backed by any test in the diff. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence medium):** In the field loop, a member whose key kind does not match the others is skipped after DoNotMixStringAndIntKeys is reported.
- Lines: `TypeCollector.cs` L1144-1150
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1144-1150 in the field loop. After reporting DoNotMixStringAndIntKeys at line 1147, line 1148 executes continue to skip the mismatched field, and the claim accurately lists no tests.

**C5 (unverified, behavior, author confidence medium):** In the field loop, duplicate int keys are added to intMembers only once, so Dictionary.Add no longer throws.
- Lines: `TypeCollector.cs` L1159-1167
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1159-1167 in the field loop. intMembers.Add is guarded by !intMembers.ContainsKey(member.IntKey) so duplicate int keys on fields do not throw ArgumentException, and the claim accurately lists no tests.

**C6 (unverified, behavior, author confidence medium):** In the field loop, duplicate string keys are added to stringMembers only once, so Dictionary.Add no longer throws.
- Lines: `TypeCollector.cs` L1175-1183
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1175-1183 in the field loop. stringMembers.Add is guarded by !stringMembers.ContainsKey(member.StringKey) so duplicate string keys on fields do not throw ArgumentException, and the claim accurately lists no tests.

**C12 (unverified, test, author confidence high):** The analyzer test file's usings, VerifyCS alias, class doc comment and the shared Preamble constant set up the tests in this file.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18, `SuppressSourceGenerationAnalyzerTests.cs` L193-193
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-18 and 193. Those lines contain only the copyright header, usings, VerifyCS alias, doc comment, class declaration, Preamble constant, and closing brace.

**C14 (unverified, test, author confidence high):** Test NoFormatterIsGeneratedForSuppressedType only asserts that GeneratedMessagePackResolver.Instance is non-null. It does not verify that no formatter exists for the suppressed type.
- Lines: `SuppressedSourceGenerationTests.cs` L20-25
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 20-25. NoFormatterIsGeneratedForSuppressedType only asserts Assert.NotNull(GeneratedMessagePackResolver.Instance) at line 23 and never checks GetFormatter<SuppressedSourceGenerationType>().

**C2 (backed, behavior, author confidence high):** In the property/member loop, a second member with an already-used int key is not added to intMembers. This avoids the ArgumentException from Dictionary.Add after MsgPack005 is reported. The first-declared member is kept.
- Lines: `TypeCollector.cs` L1019-1027
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1019-1027 and both named tests in SuppressSourceGenerationAnalyzerTests.cs (lines 81-100 and 147-166). intMembers.Add is guarded by !intMembers.ContainsKey(member.IntKey), preserving the first member and preventing ArgumentException when two properties share [Key(0)].

**C3 (backed, behavior, author confidence high):** In the property/member loop, a second member with an already-used string key is not added to stringMembers. This avoids the ArgumentException from Dictionary.Add after MsgPack005 is reported.
- Lines: `TypeCollector.cs` L1035-1043
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1030-1043 and DuplicateStringKeysAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 103-122). stringMembers.Add is guarded by !stringMembers.ContainsKey(member.StringKey) after duplicate detection, and the test verifies MsgPack005 without analyzer failure.

**C7 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported: a suppressed type with a member lacking [Key] gets MsgPack004.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-36. MemberWithoutKeyIsReported verifies MsgPack004 on an unattributed public property of a [MessagePackObject(SuppressSourceGeneration = true)] class.

**C8 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported: a suppressed type with a private keyed field gets MsgPack015 on the attribute.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 38-55. AllowPrivateRequiredIsReported verifies MsgPack015 on the MessagePackObject(SuppressSourceGeneration = true) attribute when the class has a private [Key(0)] field.

**C9 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported: a suppressed type with a member of a non-serializable type gets MsgPack003.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 57-78. MemberTypeMustBeMessagePackObjectIsReported verifies MsgPack003 on a keyed property whose type Other is not serializable on a suppressed type.

**C10 (backed, test, author confidence high):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure, MixedKeyKindsAreReportedWithoutAnalyzerFailure and DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes check that only MsgPack005 is reported. The verifier would fail on an analyzer exception, so these exercise the guards in C1 to C3.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-166
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 80-166. All four tests expect only MsgPack005 via VerifyCS.Test.RunAsync(), which fails on any analyzer exception (AD0001) or extra diagnostic, exercising the property-loop guards in TypeCollector.cs lines 1008, 1023, and 1039.

**C11 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed: a non-partial suppressed type with private, init and default-valued members produces no MsgPack011, MsgPack016 or MsgPack017.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (SuppressSourceGenerationAnalyzerTests.cs lines 168-192) asserts zero diagnostics on Foo, but the diff does not show the analyzer logic for MsgPack011, MsgPack016, or MsgPack017, so we cannot verify from the diff alone that this Foo definition would actually trigger all three rules under MsgPack00xMessagePackAnalyzer when SuppressSourceGeneration is false.

**C15 (backed, docs, author confidence medium):** The README section documents opting out of source generation and which analyzer diagnostics still apply. It is documentation only; the MsgPack012 statement is not backed by any test in the diff.
- Lines: `README.md` L1620-1633
- Checked by: **static check** (static check S4 passed)
- Breaker: **upheld**: Checked README.md lines 1620-1633 and SuppressSourceGenerationAnalyzerTests.cs. The added section is documentation only, and the MsgPack012 bullet at line 1630 has no corresponding test in the diff.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (11)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Claim C1 disputed: In the property loop, TypeCollector.cs line 1028 already guarded else if (stringKey is not null), so a null stringKey was never passed to stringMembers there (that unguarded else is in the field loop at line 1168). Furthermore, the named test MixedKeyKindsAreReportedWithoutAnalyzerFailure (SuppressSourceGenerationAnalyzerTests.cs lines 131-135) only tests an int key followed by  | breaker (Gemini) |
| F2 | medium | `SuppressedSourceGenerationTests.cs` L23 | Claim C13 disputed: SuppressedTypeRoundTripsThroughDynamicResolver (SuppressedSourceGenerationTests.cs lines 27-36) uses MessagePackSerializerOptions.Standard without asserting GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null or passing a dynamic-only resolver. Because Standard includes SourceGeneratedFormatterResolver before DynamicObjectResolver, the t | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1008 | Claim C16 disputed: Wrong citation and mismatched test: C16 cites only TypeCollector.cs lines 1008 and 1148 (the mixed-key-kind continue statements), omitting the duplicate-key guards at lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182, while its named test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes (SuppressSourceGenerationAnalyzerTests.cs lines 147-166) tests duplicate i | breaker (Gemini) |
| F4 | medium | `TypeCollector.cs` L1008 | No suppression-specific code changed. If the 3.1.1 regression was something other than this crash (for example, suppressed types being skipped before analysis), the issue is not fixed. The MsgPack004/015/003 suppressed-type tests may already have passed without this change, so they don't prove a fix. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1008 | The `continue` skips all later processing of that member, including the formatter-attribute and member-type checks. Other diagnostics for the same member (e.g. MsgPack003) may be hidden until the key is fixed. | author (Claude) |
| F6 | low | `TypeCollector.cs` L1163 | The field-loop guards (lines 1148, 1163, 1179) are not exercised by any new test; all duplicate and mixed-key tests use properties. | author (Claude) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | NoFormatterIsGeneratedForSuppressedType asserts only that the resolver instance is non-null. It would pass whether or not a formatter was generated for the type. | author (Claude) |
| F8 | low | `README.md` L1630 | The README states that MsgPack012 is reported for suppressed types, but no test verifies this. | author (Claude) |
| F9 | medium | `TypeCollector.cs` L1168 | Unlike the property loop at line 1028 (else if (stringKey is not null)), the field loop at line 1168 uses an unguarded else and calls stringMembers.ContainsKey(stringKey!) at line 1170. If the first serializable member is a field whose [Key] attribute has both intKey == null and stringKey == null (such as [Key(null)] or incomplete code during IDE editing, bypassing the non-first-member check at li | breaker (Gemini) |
| F10 | low | `TypeCollector.cs` L1035 | In both the property loop (line 1035) and the field loop (line 1175), hiddenIntKey++ is incremented unconditionally before checking !stringMembers.ContainsKey(member.StringKey) (lines 1039 and 1179). When a duplicate string key is skipped, hiddenIntKey has already advanced, leaving gaps in MemberSerializationInfo.IntKey across the retained stringMembers entries. | breaker (Gemini) |
| F11 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,53): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation; the bug fix does not need it.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime round-trip and resolver tests; these do not exercise the analyzer named in the requirement.

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

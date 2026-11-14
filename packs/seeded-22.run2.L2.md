# Evidence pack: REQ-2234 on `seeded-22`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `fef3c069da39` (seeded-22.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 112 of 254 changed code lines (44%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 47%.

- 2 refusal(s) on honesty grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 142 of 254 changed code lines off the list (C7, C8, C9, C10, C11, C12: tests found passing in the real run, claim upheld by the breaker). 112 stay with the owner.
- Why lines stay: 54 cited only by claims without a passing test; 25 passing test, but not upheld by the breaker; 11 claim disputed; 11 claim rests on AI reading only; 8 no claim covers the line; 2 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1003, L1007-1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (24 of 24 changed lines): R2 honesty (AI-suggested); F1 breaker (Gemini); F3 author (Claude); claim C1 disputed; claim C18 disputed; claim C5 only AI-read; claim C6 only AI-read; F2 breaker (Gemini) (unchanged line); F6 author (Claude) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C15 has no passing test behind it; F8 test run; no claim covers these lines; C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L37, L56, L79, L123, L145, L167-193 (51 of 193 changed lines): C14 has no passing test behind it; no claim covers these lines; C13 passed its tests but the breaker did not uphold it

**Not required to read:**
- 142 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C7, C8, C9, C10, C11, C12

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `26c2f8a8de` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (68s) |
| Pack id | `aaae18c1575d` |

## 1. Disputed claims (2)
**C1 (DISPUTED, behavior, author confidence high):** In the first member loop, after reporting MsgPack005 (DoNotMixStringAndIntKeys) for a member whose key kind differs from the others, the member is skipped. This avoids dereferencing a null intKey/stringKey later in the loop.
- Lines: `TypeCollector.cs` L1005-1010
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: Three problems in src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1005-1010: (1) over-citation of line 1007, which also changed FirstOrDefault()?.GetSyntax() to DeclaringSyntaxReferences[0].GetSyntax() without C1 describing it; (2) in this first loop, stringKey is already guarded by 'else if (stringKey is not null)' at line 1028, so 'continue' at line 1008 only prevents dereferencing null intKey!.Value at line 1019 (unlike the second loop at line 1168); and (3) lines 1005-1010 do not check or implement SuppressSourceGeneration = true as implied by requirement_quote, applying unconditionally to mixed keys on any MessagePackObject.

**C18 (DISPUTED, scope, author confidence high):** Scope: the only production change is in TypeCollector.cs. No public API, rule descriptors or wire format changed.
- Lines: `TypeCollector.cs` L1003-1043
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **disputed**: C18 claims to summarize the full production change scope in TypeCollector.cs, but its citation (lines 1003-1043) omits the second set of changed production lines in src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs at lines 1148, 1163-1166, and 1179-1182, while spanning unchanged lines 1011-1022 and 1027-1038.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | README documents which analyzer rules do and do not apply to suppressed types, including MsgPack012, which no test checks. | This is a change beyond the requirement that states user-facing analyzer behaviour as fact. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | Unrelated edit from FirstOrDefault()? to [0] in the diagnostic location lookup. | It is beyond the requirement and can introduce a new analyzer crash. | `TypeCollector.cs` L1007-1007 | AI reading |

## 3. The story
The change stops the analyzer from throwing inside TypeCollector when a [MessagePackObject] type has duplicate keys or mixes int and string keys. After reporting MsgPack005 on a mixed-key member, it now skips that member (`continue`). It no longer calls Dictionary.Add for a key that is already present. The same edits are made in two loops (lines ~1003-1043 and ~1144-1183). It also adds analyzer tests for SuppressSourceGeneration types, two execution tests for a suppressed type, and a README section on opting out.

**Why:** The issue says the analyzer stops working for SuppressSourceGeneration = true types since 3.1.1. The diff's implied theory is that the analyzer crashed on these types: Dictionary.Add threw on duplicate keys, or `intKey!.Value` was dereferenced as null on mixed keys. That crash suppressed all diagnostics. The diff does not show any code that branches on SuppressSourceGeneration. Whether this crash is the whole cause of the issue cannot be confirmed from the visible lines.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section listing which rules apply to suppressed types.
- TypeCollector.cs line 1007 replaces `DeclaringSyntaxReferences.FirstOrDefault()?` with `DeclaringSyntaxReferences[0]`. This is unrelated to the fix, and the parallel line 1147 was not changed the same way.
- The crash fixes also change behaviour for normal (non-suppressed) [MessagePackObject] types, which share the same code path.
- Execution tests check run-time round-trip and that no formatter is generated. This is runtime behaviour, not analyzer behaviour.

**How sure (the author's own view; it moves nothing):** High that the guards and `continue` prevent the two exceptions in the property-like loop, which the new property-based tests cover. Medium that this is the root cause of REQ-2234, since no suppression-specific code is visible. Low coverage for the second loop (lines 1144-1183, which looks like the field path): no new test uses fields with duplicate or mixed keys. Line 1007's `[0]` indexing is a new crash risk.

## 4. Claims (18)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | In the first member loop, after reporting MsgPack005 (DoNotMixStringAndIntKeys) for a member whose key kind differs from the others, the member is skipped. This avoids dereferencing a null intKey/stringKey later in the loop. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C18 | DISPUTED | Scope: the only production change is in TypeCollector.cs. No public API, rule descriptors or wire format changed. | (scope) | static check | disputed | no |
| C2 | unverified | Line 1007 now reads the diagnostic location with DeclaringSyntaxReferences[0] instead of FirstOrDefault()?. This throws if the member has no syntax reference, for example an inherited member from metadata. | (scope) | AI reading only | upheld | no |
| C5 | unverified | In the second member loop (apparently fields), a mixed-kind member is skipped after MsgPack005 is reported. No new test exercises this loop. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C6 | unverified | In the second member loop, duplicate int keys and duplicate string keys are no longer added twice to intMembers/stringMembers. No new test exercises this loop. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C14 | unverified | The analyzer test file header sets up usings, the VerifyCS alias for MsgPack00xMessagePackAnalyzer with its code fix provider, and a shared Preamble. | (scope) | AI reading only | upheld | no |
| C17 | unverified | The README adds a section that documents opting out of source generation and lists which analyzer rules apply to suppressed types. MsgPack012 is listed as applying, but no new test checks it. | (scope) | AI reading only | upheld | no |
| C3 | backed | In the first loop, an int-keyed member whose key is already in intMembers is not added again. This avoids the ArgumentException from Dictionary.Add that previously aborted analysis on duplicate int keys. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C4 | backed | In the first loop, a string-keyed member whose key is already in stringMembers is not added again. This avoids the Dictionary.Add exception on duplicate string keys. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a suppressed type's member that has no [Key]. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed member on a suppressed type without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a suppressed type's member whose type is not serializable. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C10 | backed | Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure and DuplicateStringKeysAreReportedWithoutAnalyzerFailure check that MsgPack005 is reported for duplicate int and string keys on a suppressed type, with no analyzer exception. Both use properties only. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C11 | backed | Test MixedKeyKindsAreReportedWithoutAnalyzerFailure checks that MsgPack005 is reported when int and string keys are mixed on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C12 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate-key fix for a normal, non-suppressed [MessagePackObject] type. | (scope) | test run | upheld | yes |
| C13 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics at all for a non-partial suppressed type that has a private member and an init property. This means MsgPack011, MsgPack016 and MsgPack017 are not reported. | (scope) | test run | cannot_tell | no |
| C15 | backed | Execution test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for the suppressed type declared at lines 8-16. | (scope) | static check | upheld | no |
| C16 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with MessagePackSerializerOptions.Standard. This is runtime behaviour, not analyzer behaviour. | (scope) | static check | upheld | no |

**C2 (unverified, scope, author confidence medium):** Line 1007 now reads the diagnostic location with DeclaringSyntaxReferences[0] instead of FirstOrDefault()?. This throws if the member has no syntax reference, for example an inherited member from metadata.
- Lines: `TypeCollector.cs` L1007-1007
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs line 1007: FirstOrDefault()?.GetSyntax().GetLocation() was replaced by DeclaringSyntaxReferences[0].GetSyntax().GetLocation(), which throws IndexOutOfRangeException when DeclaringSyntaxReferences is empty (for instance an inherited keyed property on a base class from metadata; contrast line 1147 which kept FirstOrDefault()?.).

**C5 (unverified, behavior, author confidence medium):** In the second member loop (apparently fields), a mixed-kind member is skipped after MsgPack005 is reported. No new test exercises this loop.
- Lines: `TypeCollector.cs` L1145-1150
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1145-1150 and all tests in SuppressSourceGenerationAnalyzerTests.cs: line 1148 adds 'continue;' after reporting DoNotMixStringAndIntKeys in the fields loop, and none of the new tests use mixed key kinds on fields.

**C6 (unverified, behavior, author confidence medium):** In the second member loop, duplicate int keys and duplicate string keys are no longer added twice to intMembers/stringMembers. No new test exercises this loop.
- Lines: `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1163-1166 and 1179-1182 and all tests in SuppressSourceGenerationAnalyzerTests.cs: both intMembers.Add and stringMembers.Add in the fields loop are guarded by ContainsKey, and no new test exercises duplicate keys on fields.

**C14 (unverified, test, author confidence high):** The analyzer test file header sets up usings, the VerifyCS alias for MsgPack00xMessagePackAnalyzer with its code fix provider, and a shared Preamble.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18, `SuppressSourceGenerationAnalyzerTests.cs` L193-193
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 1-18 and 193: lines 1-18 set up the license header, usings, VerifyCS alias for MsgPack00xMessagePackAnalyzer and MessagePackCodeFixProvider, class declaration, and Preamble, and line 193 is the closing brace.

**C17 (unverified, docs, author confidence medium):** The README adds a section that documents opting out of source generation and lists which analyzer rules apply to suppressed types. MsgPack012 is listed as applying, but no new test checks it.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1620-1633 and all new tests in SuppressSourceGenerationAnalyzerTests.cs: the added section documents SuppressSourceGeneration = true, lists applicable rules (MsgPack004, MsgPack005, MsgPack015, MsgPack003, MsgPack012) and non-applicable rules (MsgPack011, MsgPack016, MsgPack017), and no new test exercises MsgPack012.

**C3 (backed, behavior, author confidence high):** In the first loop, an int-keyed member whose key is already in intMembers is not added again. This avoids the ArgumentException from Dictionary.Add that previously aborted analysis on duplicate int keys.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1023-1026 and SuppressSourceGenerationAnalyzerTests.cs lines 81-100 and 147-166: intMembers.Add is now guarded by !intMembers.ContainsKey(member.IntKey), avoiding ArgumentException on duplicate int keys in the property loop, and both named tests exercise duplicate [Key(0)] properties.

**C4 (backed, behavior, author confidence high):** In the first loop, a string-keyed member whose key is already in stringMembers is not added again. This avoids the Dictionary.Add exception on duplicate string keys.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1039-1042 and SuppressSourceGenerationAnalyzerTests.cs lines 103-122: stringMembers.Add is guarded by !stringMembers.ContainsKey(member.StringKey), and DuplicateStringKeysAreReportedWithoutAnalyzerFailure exercises duplicate [Key("a")] properties.

**C7 (backed, test, author confidence high):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a suppressed type's member that has no [Key].
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 20-36: MemberWithoutKeyIsReported verifies that MsgPack004 is reported on an unkeyed property of a [MessagePackObject(SuppressSourceGeneration = true)] class.

**C8 (backed, test, author confidence high):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed member on a suppressed type without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 38-55: AllowPrivateRequiredIsReported verifies MsgPack015 on a [MessagePackObject(SuppressSourceGeneration = true)] class with a private [Key(0)] field and without AllowPrivate = true.

**C9 (backed, test, author confidence high):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a suppressed type's member whose type is not serializable.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 57-78: MemberTypeMustBeMessagePackObjectIsReported verifies MsgPack003 on a keyed property whose type Other is not serializable on a suppressed MessagePackObject.

**C10 (backed, test, author confidence high):** Tests DuplicateIntKeysAreReportedWithoutAnalyzerFailure and DuplicateStringKeysAreReportedWithoutAnalyzerFailure check that MsgPack005 is reported for duplicate int and string keys on a suppressed type, with no analyzer exception. Both use properties only.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-122
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 80-122: both tests verify MsgPack005 on suppressed types with duplicate int keys and duplicate string keys using properties only, and VerifyCS.Test fails if the analyzer throws.

**C11 (backed, test, author confidence high):** Test MixedKeyKindsAreReportedWithoutAnalyzerFailure checks that MsgPack005 is reported when int and string keys are mixed on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L124-144
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 124-144: MixedKeyKindsAreReportedWithoutAnalyzerFailure mixes [Key(0)] and [Key("Member2")] on properties of a suppressed type and verifies MsgPack005.

**C12 (backed, test, author confidence high):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks the same duplicate-key fix for a normal, non-suppressed [MessagePackObject] type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 146-166: DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes verifies MsgPack005 without analyzer failure on a non-suppressed [MessagePackObject] class with duplicate [Key(0)] properties.

**C13 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics at all for a non-partial suppressed type that has a private member and an init property. This means MsgPack011, MsgPack016 and MsgPack017 are not reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Checked tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs lines 168-192: while the test asserts zero diagnostics on Foo, the analyzer code for MsgPack011, MsgPack016, and MsgPack017 is not in the diff and there is no positive control test without SuppressSourceGeneration = true, so the diff alone does not show whether this Foo declaration would otherwise trigger all three rules (especially both MsgPack016 and MsgPack017).

**C15 (backed, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType checks that GeneratedMessagePackResolver returns no formatter for the suppressed type declared at lines 8-16.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs lines 1-24: SuppressedSourceGenerationType is declared with [MessagePackObject(SuppressSourceGeneration = true)] at lines 8-16 and NoFormatterIsGeneratedForSuppressedType asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null.

**C16 (backed, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with MessagePackSerializerOptions.Standard. This is runtime behaviour, not analyzer behaviour.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs lines 26-37: SuppressedTypeRoundTripsThroughDynamicResolver round-trips SuppressedSourceGenerationType with MessagePackSerializerOptions.Standard, exercising runtime serialization rather than analyzer behavior.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1007 | Claim C1 disputed: Three problems in src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs lines 1005-1010: (1) over-citation of line 1007, which also changed FirstOrDefault()?.GetSyntax() to DeclaringSyntaxReferences[0].GetSyntax() without C1 describing it; (2) in this first loop, stringKey is already guarded by 'else if (stringKey is not null)' at line 1028, so 'continue' at line 1008 on | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1003 | Claim C18 disputed: C18 claims to summarize the full production change scope in TypeCollector.cs, but its citation (lines 1003-1043) omits the second set of changed production lines in src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs at lines 1148, 1163-1166, and 1179-1182, while spanning unchanged lines 1011-1022 and 1027-1038. | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1007 | `DeclaringSyntaxReferences[0]` throws IndexOutOfRangeException when the member has no source declaration, for example a member inherited from a type in a referenced assembly. That would bring back the kind of analyzer crash this change is meant to fix. Line 1147 still uses FirstOrDefault()?, so the two loops are now inconsistent. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1148 | The second loop's fixes (continue at 1148 and ContainsKey guards at 1163 and 1179) have no test. All new analyzer tests use properties; none use fields with duplicate or mixed keys. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1008 | `continue` skips the rest of the loop body for the mismatched member. Any later per-member diagnostics in that body (for example the member-type check MsgPack003 or formatter checks) will no longer be reported for that member. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1003 | No visible code branches on SuppressSourceGeneration. The fix assumes the reported regression was an analyzer exception on bad keys. If 3.1.1 also skipped suppressed types somewhere else, or failed for valid suppressed types, the fix may be incomplete. The diff cannot show this. | author (Claude) |
| F7 | low | `TypeCollector.cs` L1035 | On duplicate string keys (also in the fields loop at line 1175), hiddenIntKey++ increments before lines 1039-1042 / 1179-1182 skip adding the duplicate member to stringMembers. Any subsequent valid string-keyed member on the same type gets a non-contiguous synthetic IntKey (e.g. keys 0 and 2 for 2 entries in stringMembers), which risks out-of-range indexing or invalid generated code when MessagePa | breaker (Gemini) |
| F8 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section on opting out of source generation and which analyzer rules apply. It is not required by the bug report.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Line 1007 switches FirstOrDefault()? to [0], which is unrelated to the crash fix.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime round-trip and no-formatter tests. These cover serialization behaviour, not the analyzer.

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
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (68s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2234 on `seeded-01`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 86 of 247 changed code lines (35%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 38%.

- 2 refusal(s) on honesty grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 161 of 247 changed code lines off the list (C6, C7, C8, C9, C10, C12: tests found passing in the real run, claim upheld by the breaker). 86 stay with the owner.
- Why lines stay: 35 cited only by claims without a passing test; 25 passing test, but not upheld by the breaker; 17 refused; 8 no claim covers the line; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested); claim C15 disputed; F2 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1170 (17 of 17 changed lines): R2 honesty (AI-suggested); F1 breaker (Gemini); F3 author (Claude); claim C1 disputed; claim C4 only AI-read; claim C5 only AI-read; F6 breaker (Gemini) (unchanged line)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C13 has no passing test behind it; F7 test run; no claim covers these lines; C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L19, L37, L56, L79, L145, L167-193 (32 of 193 changed lines): no claim covers these lines; C11 passed its tests but the breaker did not uphold it

**Not required to read:**
- 161 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C12, C6, C7, C8, C9, C10

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `1bbce7b636` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 9,263 in / 7,682 out, 64 s, $0.19 |
| Breaker model | gemini-4-carbon: 8,395 in / 18,497 out, 177 s, $0.20 |
| Cost and time | $0.39 at list price, 241 s for this pack (tests reused from an earlier run of this commit: 375 s) |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (375s) |
| Pack id | `728eb6849a32` |

## 1. Disputed claims (2)
**C1 (DISPUTED, behavior, author confidence medium):** In the property loop, a member whose key kind differs from the first member's now gets MsgPack005 and is skipped with `continue`. Previously execution fell through to `intKey!.Value` / string handling with a null key.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **disputed**: Line 1008 adds `continue;` after reporting `DoNotMixStringAndIntKeys` (MsgPack005), and `intKey!.Value` at line 1019 was previously hit when `isIntKey && intKey == null`. However, in the property loop line 1028 is `else if (stringKey is not null)` (unlike the bare `else` in the field loop at line 1168), so when `!isIntKey && stringKey == null` execution previously skipped the string-key block rather than entering string handling with a null key, falling through directly to line 1045. In addition, `MixedKeyKindsAreReportedWithoutAnalyzerFailure` (lines 125-144) only tests `[Key(0)]` followed by `[Key("Member2")]`, not the string-first direction.

**C15 (DISPUTED, docs, author confidence medium):** The README documents which analyzer rules apply to SuppressSourceGeneration types. MsgPack012 is listed there but no test covers it.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **disputed**: Over-citation: `README.md` lines 1622-1623 make substantive claims about formatter suppression, runtime serialization via reflection-based dynamic resolvers, and lack of AOT safety that C15 does not describe (C15 only mentions analyzer rules). Furthermore, whether `MsgPack012` at line 1630 actually applies to `SuppressSourceGeneration = true` types is neither shown in the diff nor covered by any test.


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
| C1 | DISPUTED | In the property loop, a member whose key kind differs from the first member's now gets MsgPack005 and is skipped with `continue`. Previously execution fell through to `intKey!.Value` / string handling with a null key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | disputed | no |
| C15 | DISPUTED | The README documents which analyzer rules apply to SuppressSourceGeneration types. MsgPack012 is listed there but no test covers it. | (scope) | AI reading only | disputed | no |
| C4 | unverified | In the field loop, a member with a mismatched key kind gets MsgPack005 and is skipped with `continue`. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C5 | unverified | In the field loop, a duplicate int key no longer throws from Dictionary.Add. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C2 | backed | In the property loop, a duplicate int key no longer throws from Dictionary.Add; the first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C3 | backed | In the property loop, a duplicate string key no longer throws from Dictionary.Add; the first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C6 | backed | Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C7 | backed | Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C8 | backed | Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C9 | backed | The duplicate-int, duplicate-string and mixed-key tests expect exactly one MsgPack005 on the second member and no analyzer failure, for suppressed types. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C10 | backed | Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-int-key handling applies to a type without SuppressSourceGeneration. | (scope) | test run | upheld | yes |
| C11 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics, including no MsgPack011/016/017, for a non-partial suppressed type with a private field and an init property. | (scope) | test run | cannot_tell | no |
| C12 | backed | The analyzer test file header, usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, and the shared Preamble set up the analyzer tests. | (scope) | test run | upheld | yes |
| C13 | backed | Execution test NoFormatterIsGeneratedForSuppressedType checks that the generated resolver returns no formatter for the suppressed sample type. | (scope) | static check | upheld | no |
| C14 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with the standard options. This is runtime behaviour, not analyzer behaviour. | (scope) | static check | upheld | no |
| C16 | backed | Scope: the source change is limited to key-collision and mixed-key handling in TypeCollector. No public API, analyzer rule descriptors or wire format change, and no SuppressSourceGeneration-specific logic is modified. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence low):** In the field loop, a member with a mismatched key kind gets MsgPack005 and is skipped with `continue`.
- Lines: `TypeCollector.cs` L1148-1148
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked `TypeCollector.cs` lines 1145-1149 and 1159 (`!item.IsReadOnly`, confirming the field loop): when `(isIntKey && intKey == null) || (!isIntKey && stringKey == null)`, `DoNotMixStringAndIntKeys` (MsgPack005) is reported and the new `continue;` at line 1148 skips the rest of the iteration. Confirmed no test in the diff covers mixed keys on fields.

**C5 (unverified, behavior, author confidence low):** In the field loop, a duplicate int key no longer throws from Dictionary.Add.
- Lines: `TypeCollector.cs` L1163-1166
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked `TypeCollector.cs` lines 1159-1166: inside the field loop (`!item.IsReadOnly`), `intMembers.Add(member.IntKey, (member, item.Type))` is now guarded by `if (!intMembers.ContainsKey(member.IntKey))`. Confirmed no test in the diff covers duplicate keys on fields.

**C2 (backed, behavior, author confidence medium):** In the property loop, a duplicate int key no longer throws from Dictionary.Add; the first member with that key is kept.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked `TypeCollector.cs` lines 1023-1026: `intMembers.Add(member.IntKey, (member, item.Type))` in the property loop is now guarded by `if (!intMembers.ContainsKey(member.IntKey))`, preserving the first entry and avoiding `ArgumentException`. Checked both named tests at lines 81-100 and 147-166, which verify duplicate `[Key(0)]` properties report MsgPack005 without analyzer failure.

**C3 (backed, behavior, author confidence medium):** In the property loop, a duplicate string key no longer throws from Dictionary.Add; the first member with that key is kept.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **test run** (test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked `TypeCollector.cs` lines 1039-1042: `stringMembers.Add(member.StringKey, (member, item.Type))` in the property loop is guarded by `if (!stringMembers.ContainsKey(member.StringKey))`, keeping the first member and avoiding a duplicate-key exception. Checked `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` at lines 103-122, which tests two `[Key("a")]` properties on a suppressed type.

**C6 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported checks that MsgPack004 is reported on a key-less property of a SuppressSourceGeneration type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 20-36: `MemberWithoutKeyIsReported` declares `[MessagePackObject(SuppressSourceGeneration = true)]` on `Foo` with an unattributed property `{|MsgPack004:Member|}` and runs `VerifyCS.Test`.

**C7 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported checks that MsgPack015 is reported for a private keyed field on a suppressed type without AllowPrivate.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **test run** (test `AllowPrivateRequiredIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 38-55: `AllowPrivateRequiredIsReported` declares `[{|MsgPack015:MessagePackObject(SuppressSourceGeneration = true)|}]` without `AllowPrivate` on `Foo` containing `[Key(0)] private string member;` and runs `VerifyCS.Test`.

**C8 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported checks that MsgPack003 is reported for a member of a non-serializable type on a suppressed type.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **test run** (test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 57-78: `MemberTypeMustBeMessagePackObjectIsReported` defines plain `class Other` and `[MessagePackObject(SuppressSourceGeneration = true)] public class Foo` with `[Key(0)] public Other {|MsgPack003:Member|} { get; set; }`, verified via `VerifyCS.Test`.

**C9 (backed, test, author confidence medium):** The duplicate-int, duplicate-string and mixed-key tests expect exactly one MsgPack005 on the second member and no analyzer failure, for suppressed types.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 80-144: all three tests use `[MessagePackObject(SuppressSourceGeneration = true)]`, place a single `{|MsgPack005:...|}` span on `Member2`, and run `VerifyCS.Test`, which fails if any additional diagnostic or `AD0001` analyzer exception occurs.

**C10 (backed, test, author confidence medium):** Test DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes checks that the same duplicate-int-key handling applies to a type without SuppressSourceGeneration.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L146-166
- Checked by: **test run** (test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 146-166: `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` uses `[MessagePackObject]` without `SuppressSourceGeneration` and verifies `{|MsgPack005:...|}` on the second `[Key(0)]` property without analyzer failure.

**C11 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed expects no diagnostics, including no MsgPack011/016/017, for a non-partial suppressed type with a private field and an init property.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: Lines 168-192 assert zero diagnostics on a non-partial `[MessagePackObject(AllowPrivate = true, SuppressSourceGeneration = true)]` class with a private field and an `init` property with a default initializer, and the comment at lines 171-172 states this covers MsgPack011, MsgPack016, and MsgPack017. However, the definitions and trigger conditions for MsgPack011, MsgPack016, and MsgPack017 are not in the diff, and there is no companion control test without `SuppressSourceGeneration = true`, so the diff alone cannot confirm that `Foo` would otherwise trigger all three diagnostics.

**C12 (backed, test, author confidence high):** The analyzer test file header, usings, the VerifyCS alias over MsgPack00xMessagePackAnalyzer, and the shared Preamble set up the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-18
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case))
- Breaker: **upheld**: Checked `SuppressSourceGenerationAnalyzerTests.cs` lines 1-18: they contain only the license header, `using` directives, the `VerifyCS` alias over `MsgPack00xMessagePackAnalyzer` and `MessagePackCodeFixProvider`, the class XML doc and declaration, and `Preamble` (`using MessagePack;`).

**C13 (backed, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType checks that the generated resolver returns no formatter for the suppressed sample type.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked `SuppressedSourceGenerationTests.cs` lines 1-24: lines 8-16 define `[MessagePackObject(SuppressSourceGeneration = true)] public class SuppressedSourceGenerationType`, and `NoFormatterIsGeneratedForSuppressedType` at lines 20-24 asserts `GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>()` is null.

**C14 (backed, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver checks that the suppressed type round-trips with the standard options. This is runtime behaviour, not analyzer behaviour.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked `SuppressedSourceGenerationTests.cs` lines 26-37: `SuppressedTypeRoundTripsThroughDynamicResolver` serializes and deserializes `SuppressedSourceGenerationType` using `MessagePackSerializerOptions.Standard` and asserts `Id` and `Name` match, exercising runtime serialization rather than the analyzer.

**C16 (backed, scope, author confidence high):** Scope: the source change is limited to key-collision and mixed-key handling in TypeCollector. No public API, analyzer rule descriptors or wire format change, and no SuppressSourceGeneration-specific logic is modified.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1148-1148, `TypeCollector.cs` L1163-1166
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S7 passed)
- Breaker: **upheld**: Checked all 5 diff hunks in `TypeCollector.cs` (+14/-3 total across lines 1008, 1023-1026, 1039-1042, 1148, and 1163-1166) and the changed-files list: no other `src/` files changed, no `SuppressSourceGeneration`-specific logic was touched, and static checks S3-S5 confirm no public API, rule descriptor, or wire-format changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Claim C1 disputed: Line 1008 adds `continue;` after reporting `DoNotMixStringAndIntKeys` (MsgPack005), and `intKey!.Value` at line 1019 was previously hit when `isIntKey && intKey == null`. However, in the property loop line 1028 is `else if (stringKey is not null)` (unlike the bare `else` in the field loop at line 1168), so when `!isIntKey && stringKey == null` execution previously skipped the st | breaker (Gemini) |
| F2 | medium | `README.md` L1622 | Claim C15 disputed: Over-citation: `README.md` lines 1622-1623 make substantive claims about formatter suppression, runtime serialization via reflection-based dynamic resolvers, and lack of AOT safety that C15 does not describe (C15 only mentions analyzer rules). Furthermore, whether `MsgPack012` at line 1630 actually applies to `SuppressSourceGeneration = true` types is neither shown in the diff  | breaker (Gemini) |
| F3 | medium | `TypeCollector.cs` L1008 | Nothing in the diff touches how SuppressSourceGeneration types are handled. If the 3.1.1 regression was that the analyzer skips suppressed types, rather than throwing on key collisions, this change does not fix it. The diff cannot show whether MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported and MemberTypeMustBeMessagePackObjectIsReported failed before the change. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1170 | In the field loop, the string-key branch's Add call (after line 1170) is not shown with a ContainsKey guard, unlike the property loop. If it is still unguarded, duplicate string keys on fields can still crash the analyzer. The field-path changes (1148, 1163-1166) have no test at all. | author (Claude) |
| F5 | low | `TypeCollector.cs` L1008 | `continue` skips the rest of the member processing, including the MessagePackFormatter attribute lookup and later member-type checks. Diagnostics such as MsgPack003 on that member are therefore no longer reported while MsgPack005 is present. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1170 | Duplicate string keys in the field loop are still unguarded. Unlike property int keys (lines 1023-1026), property string keys (lines 1039-1042), and field int keys (lines 1163-1166), the field loop's `else` branch for string keys (starting at line 1168) was not updated to guard `stringMembers.Add` with `!stringMembers.ContainsKey(member.StringKey)`. A `[MessagePackObject]` type (with or without `S | breaker (Gemini) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

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

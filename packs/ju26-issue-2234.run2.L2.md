# Evidence pack: REQ-2234 on `ju26-issue-2234`

> **REVIEW INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: no test results produced. Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `f6d7569b656b` (ju26-issue-2234.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 252 of 252 changed code lines (100%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 100%.

- Fail closed: tests no test results produced. No claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 4 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Why lines stay: 224 cited only by claims without a passing test; 22 refused; 5 no claim covers the line; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` L1620-1633 (14 of 14 changed lines): R1 honesty (AI-suggested); claim C13 disputed; F1 breaker (Gemini); F6 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008, L1023-1026, L1039-1042, L1148, L1163-1166, L1179-1182 (22 of 22 changed lines): R2 honesty (AI-suggested); F2 author (Claude); claim C1 only AI-read; claim C2 only AI-read; claim C3 only AI-read; claim C4 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): C11 has no passing test behind it; F8 test run; no claim covers these lines; C12 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): C10 has no passing test behind it; C5 has no passing test behind it; no claim covers these lines; C6 has no passing test behind it; C7 has no passing test behind it; C8 has no passing test behind it; C9 has no passing test behind it

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `9007cee116` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | not run: no test results produced |
| Pack id | `7e446eecfd8f` |

## 1. Disputed claims (1)
**C13 (DISPUTED, docs, author confidence medium):** The README adds an 'Opting out of source generation' section. It lists which analyzer rules still apply to suppressed types (004, 005, 015, 003, 012) and which do not (011, 016, 017).
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**
- Breaker: **disputed**: Over-citation in README.md lines 1620-1633: C13 only describes the section heading and the lists of analyzer rules that apply vs do not apply (lines 1625-1632), omitting lines 1622-1623 which document [MessagePackObject(SuppressSourceGeneration = true)], state that no formatter is generated, and claim that dynamic resolvers use reflection and are not AOT-safe (whereas MessagePack dynamic resolvers use runtime IL code generation where supported, as noted just above at line 1617).


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README documents which analyzer rules apply to suppressed types, including MsgPack012, which has no test. | This is user-facing documentation of analyzer behaviour beyond the bug fix, partly unverified. A human should confirm it matches the intended contract. | `README.md` L1620-1633 | AI reading |
| R2 | honesty | The source change does not touch suppression gating. The fix for the reported symptom depends on tests passing rather than on visible code addressing the root cause. | A reviewer should confirm the change actually fixes issue 2234 and does not merely add crash guards. | `TypeCollector.cs` L1004-1185 | AI reading |

## 3. The story
The change edits `TypeCollector` so that a broken key contract no longer crashes analysis. In both the property loop and the field loop it does two things. After a member's key kind clashes with the other members (MsgPack005 is reported), it skips that member with `continue`. It also adds a member to the int-key or string-key map only if that key is not already there, instead of calling `Dictionary.Add` blindly. It adds analyzer tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types (MsgPack004, 015, 003, 005, and a test that MsgPack011/016/017 are not reported). It also adds run-time execution tests and a README section.

**Why:** Issue 2234: since 3.1.1 the analyzer stopped reporting diagnostics for types marked `SuppressSourceGeneration = true`. The change implies the cause was an exception in `TypeCollector` on invalid key contracts (duplicate or mixed keys), which killed analysis. Nothing in the diff touches any code that checks `SuppressSourceGeneration`. So whether the general symptom is fixed (e.g. MsgPack004 on a suppressed type with no key problem) rests on the new tests passing, not on visible code.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section describing run-time and analyzer behaviour.
- An execution test project file checks the run-time dynamic-resolver round trip and that no formatter is generated. This is run-time behaviour, not the analyzer.
- The duplicate-key and mixed-key guards also apply to normal (non-suppressed) types. There is a dedicated test for generated types.

**How sure (the author's own view; it moves nothing):** High that the new guards stop the `Dictionary.Add` duplicate-key exception and the null `intKey!.Value` dereference on the property path, which the tests exercise. Low on the field path: no test uses fields with duplicate or mixed keys. Medium-to-low that the root cause of issue 2234 is addressed, because no suppression-gating logic changed. The MsgPack004/015/003 tests are the only evidence and must pass in the real run.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C13 | DISPUTED | The README adds an 'Opting out of source generation' section. It lists which analyzer rules still apply to suppressed types (004, 005, 015, 003, 012) and which do not (011, 016, 017). | (scope) | AI reading only | disputed | no |
| C1 | unverified | On the property path, a member whose key kind differs from the other members gets MsgPack005 and is then skipped with `continue`. Execution never reaches `intKey!.Value` or `stringKey!` with a null key. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C2 | unverified | On the property path, a duplicate int key no longer throws from `Dictionary.Add`. The first member with that key is kept and later duplicates are not added. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C3 | unverified | On the property path, a duplicate string key no longer throws from `Dictionary.Add`. The first member with that key is kept. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C4 | unverified | The field loop gets the same fixes: `continue` after the mixed-key diagnostic, and `ContainsKey` guards before adding to the int-key and string-key maps. No test uses fields with duplicate or mixed keys. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | upheld | no |
| C10 | unverified | The analyzer test file setup (usings, verifier alias, class summary, shared `Preamble` constant) only supports the analyzer tests. | (scope) | AI reading only | upheld | no |
| C5 | backed | Test MemberWithoutKeyIsReported: a suppressed type with a property lacking `[Key]` reports MsgPack004 on that property. This directly tests the issue's symptom. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C6 | backed | Test AllowPrivateRequiredIsReported: a suppressed type with a private keyed field reports MsgPack015 on the attribute. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C7 | backed | Test MemberTypeMustBeMessagePackObjectIsReported: a suppressed type with a member of a non-serializable type reports MsgPack003. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C8 | backed | Duplicate-key and mixed-key tests (int, string, mixed, and a non-suppressed generated type) expect exactly one MsgPack005 and no analyzer crash. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | upheld | no |
| C9 | backed | Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed: a non-partial suppressed type with a private member under AllowPrivate and an init property with an initializer produces no diagnostics. This means MsgPack011/016/017 are not reported. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | cannot_tell | no |
| C11 | backed | Execution test NoFormatterIsGeneratedForSuppressedType: the generated resolver returns no formatter for a suppressed type. | (scope) | static check | upheld | no |
| C12 | backed | Execution test SuppressedTypeRoundTripsThroughDynamicResolver: a suppressed type round-trips through `MessagePackSerializerOptions.Standard`. | (scope) | static check | upheld | no |
| C14 | backed | Scope: no new public API, analyzer rule descriptors, or wire-format code. The source change is limited to collision and mismatch guards in `TypeCollector`, and no `SuppressSourceGeneration` gating logic is edited. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence medium):** On the property path, a member whose key kind differs from the other members gets MsgPack005 and is then skipped with `continue`. Execution never reaches `intKey!.Value` or `stringKey!` with a null key.
- Lines: `TypeCollector.cs` L1008-1008
- Checked by: **AI reading only** (tests named (MixedKeyKindsAreReportedWithoutAnalyzerFailure) but not run: no test results produced)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1005-1035 and MixedKeyKindsAreReportedWithoutAnalyzerFailure: after reporting DoNotMixStringAndIntKeys on line 1007, line 1008 executes continue so execution skips both intKey!.Value (line 1019) and stringKey! (lines 1030 and 1035) for that mismatched property.

**C2 (unverified, behavior, author confidence high):** On the property path, a duplicate int key no longer throws from `Dictionary.Add`. The first member with that key is kept and later duplicates are not added.
- Lines: `TypeCollector.cs` L1023-1026
- Checked by: **AI reading only** (tests named (DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes) but not run: no test results produced)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1023-1026 and both named tests: guarding intMembers.Add with !intMembers.ContainsKey(member.IntKey) retains the first property for that int key and avoids throwing ArgumentException on duplicates.

**C3 (unverified, behavior, author confidence high):** On the property path, a duplicate string key no longer throws from `Dictionary.Add`. The first member with that key is kept.
- Lines: `TypeCollector.cs` L1039-1042
- Checked by: **AI reading only** (tests named (DuplicateStringKeysAreReportedWithoutAnalyzerFailure) but not run: no test results produced)
- Breaker: **upheld**: Checked TypeCollector.cs lines 1039-1042 and DuplicateStringKeysAreReportedWithoutAnalyzerFailure: guarding stringMembers.Add with !stringMembers.ContainsKey(member.StringKey) keeps the first property with that string key and prevents Dictionary.Add from throwing.

**C4 (unverified, behavior, author confidence low):** The field loop gets the same fixes: `continue` after the mixed-key diagnostic, and `ContainsKey` guards before adding to the int-key and string-key maps. No test uses fields with duplicate or mixed keys.
- Lines: `TypeCollector.cs` L1148-1148, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 1144-1183 and all tests in SuppressSourceGenerationAnalyzerTests.cs: the field loop adds continue at line 1148 and ContainsKey guards at lines 1163-1166 and 1179-1182, and all duplicate/mixed-key tests in lines 80-166 declare properties rather than fields.

**C10 (unverified, test, author confidence high):** The analyzer test file setup (usings, verifier alias, class summary, shared `Preamble` constant) only supports the analyzer tests.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L1-19
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 1-19: those lines contain only the license header, using directives, VerifyCS verifier type alias, XML summary, class header, and shared Preamble string constant.

**C5 (backed, test, author confidence medium):** Test MemberWithoutKeyIsReported: a suppressed type with a property lacking `[Key]` reports MsgPack004 on that property. This directly tests the issue's symptom.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-36
- Checked by: **static check** (tests named (MemberWithoutKeyIsReported) but not run: no test results produced; static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-36: MemberWithoutKeyIsReported declares a [MessagePackObject(SuppressSourceGeneration = true)] class with an unattributed public property marked {|MsgPack004:Member|} and runs VerifyCS.Test.

**C6 (backed, test, author confidence medium):** Test AllowPrivateRequiredIsReported: a suppressed type with a private keyed field reports MsgPack015 on the attribute.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L38-55
- Checked by: **static check** (tests named (AllowPrivateRequiredIsReported) but not run: no test results produced; static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 38-55: AllowPrivateRequiredIsReported declares a [MessagePackObject(SuppressSourceGeneration = true)] class with a [Key(0)] private field and expects MsgPack015 on the attribute.

**C7 (backed, test, author confidence medium):** Test MemberTypeMustBeMessagePackObjectIsReported: a suppressed type with a member of a non-serializable type reports MsgPack003.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L57-78
- Checked by: **static check** (tests named (MemberTypeMustBeMessagePackObjectIsReported) but not run: no test results produced; static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 57-78: MemberTypeMustBeMessagePackObjectIsReported declares an unattributed class Other used by a keyed property on a suppressed type and expects MsgPack003 on that property.

**C8 (backed, test, author confidence high):** Duplicate-key and mixed-key tests (int, string, mixed, and a non-suppressed generated type) expect exactly one MsgPack005 and no analyzer crash.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-166
- Checked by: **static check** (tests named (DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure, MixedKeyKindsAreReportedWithoutAnalyzerFailure, DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes) but not run: no test results produced; static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 80-166: all four tests (duplicate int keys, duplicate string keys, mixed int/string keys on suppressed types, and duplicate int keys on a non-suppressed [MessagePackObject] type) mark a single MsgPack005 span and run VerifyCS.Test, which also fails if the analyzer throws.

**C9 (backed, test, author confidence medium):** Test SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed: a non-partial suppressed type with a private member under AllowPrivate and an init property with an initializer produces no diagnostics. This means MsgPack011/016/017 are not reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-193
- Checked by: **static check** (tests named (SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed) but not run: no test results produced; static check S8 passed)
- Breaker: **cannot_tell**: SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed (lines 168-193) only asserts that Foo produces zero diagnostics when SuppressSourceGeneration = true (and also includes [Key(2)] public string Prop2 { get; set; } on lines 183-184, which the claim does not mention). Because there is no non-suppressed control test in the file and the trigger conditions for MsgPack011, MsgPack016, and MsgPack017 are in unseen analyzer/collector code, the diff alone does not show that Foo would trigger all three rules when not suppressed.

**C11 (backed, test, author confidence high):** Execution test NoFormatterIsGeneratedForSuppressedType: the generated resolver returns no formatter for a suppressed type.
- Lines: `SuppressedSourceGenerationTests.cs` L1-24
- Checked by: **static check** (tests named (NoFormatterIsGeneratedForSuppressedType) but not run: no test results produced; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 1-24: defines SuppressedSourceGenerationType with [MessagePackObject(SuppressSourceGeneration = true)] and verifies in NoFormatterIsGeneratedForSuppressedType that GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() returns null.

**C12 (backed, test, author confidence high):** Execution test SuppressedTypeRoundTripsThroughDynamicResolver: a suppressed type round-trips through `MessagePackSerializerOptions.Standard`.
- Lines: `SuppressedSourceGenerationTests.cs` L26-37
- Checked by: **static check** (tests named (SuppressedTypeRoundTripsThroughDynamicResolver) but not run: no test results produced; static check S8 passed; static check S5 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 26-37: SuppressedTypeRoundTripsThroughDynamicResolver serializes and deserializes SuppressedSourceGenerationType using MessagePackSerializerOptions.Standard and asserts both property values round-trip.

**C14 (backed, scope, author confidence high):** Scope: no new public API, analyzer rule descriptors, or wire-format code. The source change is limited to collision and mismatch guards in `TypeCollector`, and no `SuppressSourceGeneration` gating logic is edited.
- Lines: `TypeCollector.cs` L1008-1008, `TypeCollector.cs` L1148-1148
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked all 4 changed files and static checks S3-S5: TypeCollector.cs is the only modified src file, its 6 hunks only add mixed-key continue statements and duplicate-key ContainsKey guards, and no SuppressSourceGeneration gating, public API, rule descriptors, or wire-format code is changed.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 1 of its 2 sentences.
Requirement sentences no claim quotes (1; an issue body is mostly context, so skim this for anything the change should have done; first 1 shown, all in the JSON):
- This has happened since version 3.1.1.

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `README.md` L1622 | Claim C13 disputed: Over-citation in README.md lines 1620-1633: C13 only describes the section heading and the lists of analyzer rules that apply vs do not apply (lines 1625-1632), omitting lines 1622-1623 which document [MessagePackObject(SuppressSourceGeneration = true)], state that no formatter is generated, and claim that dynamic resolvers use reflection and are not AOT-safe (whereas MessagePa | breaker (Gemini) |
| F2 | high | `TypeCollector.cs` L1008 | No code that checks `SuppressSourceGeneration` is changed. The fix only stops crashes on duplicate or mixed keys. If the 3.1.1 regression was that suppressed types skip analysis entirely, then the MsgPack004/015/003 tests would fail and the issue would be unfixed. These tests are the only evidence for the main symptom, so check that they really pass and that they fail on 3.1.1. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | Duplicate-key members are now silently dropped instead of throwing. This also applies to non-suppressed types. If the generator does not stop on the MsgPack005 error, it could emit a formatter that silently omits a member. The diff does not show where generation halts on errors. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1163 | The field-path guards (1148, 1163-1166, 1179-1182) are not exercised by any test. All the new duplicate and mixed-key tests use properties. | author (Claude) |
| F5 | low | `README.md` L1630 | The README says MsgPack012 (accessibility) is still reported for suppressed types. No test checks this. | author (Claude) |
| F6 | medium | `README.md` L1630 | README.md line 1630 documents that MsgPack012 (resolver accessibility) is still validated for [MessagePackObject(SuppressSourceGeneration = true)] types, but SuppressSourceGenerationAnalyzerTests.cs contains no test verifying that MsgPack012 is reported when SuppressSourceGeneration = true. | breaker (Gemini) |
| F7 | low | `TypeCollector.cs` L1035 | On lines 1035 and 1175, hiddenIntKey++ is incremented while constructing MemberSerializationInfo before lines 1039 and 1179 check !stringMembers.ContainsKey(member.StringKey) and discard duplicate string-key members. Any subsequent string-keyed member on a non-suppressed type receives a non-contiguous IntKey greater than or equal to stringMembers.Count when the source generator runs on code with d | breaker (Gemini) |
| F8 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section about opting out of source generation and the analyzer rules that apply. Not required to fix the bug.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Run-time serialization and resolver tests. These do not test the analyzer behaviour the issue is about.
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs`: DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes covers non-suppressed types, which the requirement does not mention.

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
not run: no test results produced
```
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(13,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(14,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(15,50): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(13,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(14,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(15,50): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
```

## 8. What was NOT checked
- Reviewer part missing or failed: tests: no test results produced. Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- Test project MessagePack.SourceGenerator.Tests.csproj: no results.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

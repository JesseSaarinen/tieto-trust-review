# Evidence pack: REQ-2234 on `seeded-22`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `a587ff1d15bc` (seeded-22.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 195 of 254 changed code lines (77%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 78%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- Evidence took 59 of 254 changed code lines off the list (C3: tests found passing in the real run, claim upheld by the breaker). 195 stay with the owner.
- Why lines stay: 65 claim disputed; 52 no claim covers the line; 28 cited only by claims without a passing test; 25 passing test, but not upheld by the breaker; 24 refused; 1 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (24 changed lines): F1 breaker (Gemini) (L1008); F2 author (Claude) (L1007); F3 author (Claude) (L1023); F6 breaker (Gemini) (L1007); R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C5 has no passing test behind it; F7 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L79-193 (134 of 193 changed lines): no claim covers these lines; claim C6 disputed; C4 passed its tests but the breaker did not uphold it

**Not required to read:**
- 59 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `26c2f8a8de` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (68s) |
| Pack id | `08dd542b6ff3` |

## 1. Disputed claims (1)
**C6 (DISPUTED, test, author confidence low):** The new analyzer tests cover the requirement only partly. Nothing in the diff shows they fail without the TypeCollector change. The suppressed-type tests that pass through untouched code (C3) do not show that a regression was fixed. MsgPack012, which the README claims is checked, has no test.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L80-144
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **disputed**: C6 claims 'Nothing in the diff shows they fail without the TypeCollector change' while citing SuppressSourceGenerationAnalyzerTests.cs lines 80-144. TypeCollector.cs directly shows those three tests fail with analyzer exceptions (AD0001) without the change: without lines 1023-1026 and 1039-1042, DuplicateIntKeysAreReportedWithoutAnalyzerFailure and DuplicateStringKeysAreReportedWithoutAnalyzerFailure call intMembers.Add / stringMembers.Add with duplicate keys and throw ArgumentException; without continue on line 1008, MixedKeyKindsAreReportedWithoutAnalyzerFailure enters if (isIntKey) on line 1012 with intKey == null and throws InvalidOperationException at intKey!.Value on line 1019.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README documents which analyzer rules do and do not apply to suppressed types. | It is a user-facing statement of analyzer behavior beyond the bug fix, and it includes a rule (MsgPack012) no test covers. A human should confirm this is the intended documented contract. | `README.md` | AI reading |
| R2 | honesty | An unrelated change to the diagnostic-location lookup (FirstOrDefault()? to [0]) is bundled in. | It goes beyond the requirement and can introduce a new crash path; it should not ship without explicit approval. | `TypeCollector.cs` | AI reading |

## 3. The story
The fix is in TypeCollector, the code the analyzer and the source generator share. When two members share a key, it now keeps the first member and skips the second instead of calling Dictionary.Add again (which throws). When a member uses a different key kind from the others, it reports the existing diagnostic and skips the member. Before, it went on to dereference a null key. These guards are applied in both member-collection loops. New analyzer tests check that types marked `SuppressSourceGeneration = true` still get MsgPack004, MsgPack015, MsgPack003 and MsgPack005. Another test checks they do not get MsgPack011, MsgPack016 or MsgPack017. Execution tests check that no formatter is generated for such a type and that it round-trips through the dynamic resolver. A new README section describes this behavior.

**Why:** The issue reports that the analyzer stopped working for suppressed types in 3.1.1. The change assumes the cause is an analyzer crash (an exception from TypeCollector) on duplicate or mixed keys, which stops it reporting anything. The test names ('WithoutAnalyzerFailure') point to the same idea. Nothing in the diff checks SuppressSourceGeneration directly, and no part of the diff ties the crash to 3.1.1 or to suppressed types specifically.

**Touches beyond the requirement:**
- README.md gains a new user-facing section listing which analyzer rules apply to suppressed types, including MsgPack012, which no test covers.
- TypeCollector.cs line 1007 changes the diagnostic location lookup from `DeclaringSyntaxReferences.FirstOrDefault()?` to `DeclaringSyntaxReferences[0]`. This is unrelated to the bug and is not mirrored at line 1147.
- The same guards also change source-generator behavior for normal (non-suppressed) types, because TypeCollector is shared.

**How sure (the author's own view; it moves nothing):** Medium that the guards remove a real crash path (Dictionary.Add on a duplicate key; `intKey!.Value` on a null key). Low to medium that this is the actual root cause of REQ-2234: no suppression-specific code changed, and nothing shows the new tests fail without the fix. High that there is no public API, wire-format or new-rule change.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C6 | DISPUTED | The new analyzer tests cover the requirement only partly. Nothing in the diff shows they fail without the TypeCollector change. The suppressed-type tests that pass through untouched code (C3) do not show that a regression was fixed. MsgPack012, which the README claims is checked, has no test. | "It still worked in 3.1.0." | test run | disputed | no |
| C1 | backed | Duplicate int or string keys no longer cause an exception from Dictionary.Add in either member-collection loop. The first member is kept and the existing MsgPack005 diagnostic path still runs. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C2 | backed | A member whose key kind differs from the other members gets the DoNotMixStringAndIntKeys diagnostic and is then skipped. This avoids the null dereference `intKey!.Value` or `stringKey!` later in the loop. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C3 | backed | For suppressed types the analyzer reports MsgPack004 (missing Key), MsgPack015 (AllowPrivate required) and MsgPack003 (member type not serializable). These pass through existing code; this diff did not change it. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | upheld | yes |
| C4 | backed | A non-partial suppressed type with private members and an init-only property with a default value produces no diagnostics. The test therefore expects MsgPack011, MsgPack016 and MsgPack017 not to be reported. | (scope) | test run | cannot_tell | no |
| C5 | backed | At run time, no formatter is generated for a suppressed type, and the type round-trips through the standard (dynamic) resolver. | (scope) | static check | upheld | no |
| C7 | backed | The change adds no public API, no new analyzer rule descriptors, and no change to serialized output. It does go beyond the bug fix with a README section and an unrelated location-lookup change. | (scope) | static check | upheld | no |

**C1 (backed, behavior, author confidence medium):** Duplicate int or string keys no longer cause an exception from Dictionary.Add in either member-collection loop. The first member is kept and the existing MsgPack005 diagnostic path still runs.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1023-1026, 1039-1042, 1163-1166, and 1179-1182: all four Dictionary.Add calls in both member-collection loops are now guarded by !ContainsKey checks after the existing MsgPack005 check, keeping the first member and avoiding ArgumentException on duplicate keys, with the three named tests passing.

**C2 (backed, behavior, author confidence medium):** A member whose key kind differs from the other members gets the DoNotMixStringAndIntKeys diagnostic and is then skipped. This avoids the null dereference `intKey!.Value` or `stringKey!` later in the loop.
- Lines: `TypeCollector.cs` L1005-1008, `TypeCollector.cs` L1145-1148
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1005-1009 and 1145-1150: both loops now execute continue immediately after reporting DoNotMixStringAndIntKeys, preventing fall-through into intKey!.Value (lines 1019, 1159) and stringKey! (lines 1170, 1175) for source-declared members, as exercised by MixedKeyKindsAreReportedWithoutAnalyzerFailure.

**C3 (backed, test, author confidence medium):** For suppressed types the analyzer reports MsgPack004 (missing Key), MsgPack015 (AllowPrivate required) and MsgPack003 (member type not serializable). These pass through existing code; this diff did not change it.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-78
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked SuppressSourceGenerationAnalyzerTests.cs lines 20-78 and the TypeCollector.cs diff: the three tests assert MsgPack004, MsgPack015, and MsgPack003 on suppressed types and passed in the test run, while none of those diagnostic paths were modified in TypeCollector.cs.

**C4 (backed, test, author confidence medium):** A non-partial suppressed type with private members and an init-only property with a default value produces no diagnostics. The test therefore expects MsgPack011, MsgPack016 and MsgPack017 not to be reported.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: SuppressSourceGenerationAnalyzerTests.cs lines 168-192 shows the non-partial suppressed class with a private field and an init-only property with a default value produces no diagnostics, but the diff does not include the rules or suppression checks for MsgPack011, MsgPack016, or MsgPack017, so the diff alone cannot confirm that this test input would otherwise trigger all three rules.

**C5 (backed, test, author confidence high):** At run time, no formatter is generated for a suppressed type, and the type round-trips through the standard (dynamic) resolver.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **static check** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked SuppressedSourceGenerationTests.cs lines 8-36: NoFormatterIsGeneratedForSuppressedType asserts GeneratedMessagePackResolver.Instance.GetFormatter<SuppressedSourceGenerationType>() is null, and SuppressedTypeRoundTripsThroughDynamicResolver verifies serialize/deserialize round-tripping via MessagePackSerializerOptions.Standard.

**C7 (backed, scope, author confidence high):** The change adds no public API, no new analyzer rule descriptors, and no change to serialized output. It does go beyond the bug fix with a README section and an unrelated location-lookup change.
- Lines: `README.md` L1620-1633, `TypeCollector.cs` L1007-1007
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files against static checks S3-S5: no public APIs, rule descriptors, or serialization code changed, while README.md lines 1620-1633 adds documentation and TypeCollector.cs line 1007 changes DeclaringSyntaxReferences.FirstOrDefault()? to DeclaringSyntaxReferences[0].

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (7)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | Claim C6 disputed: C6 claims 'Nothing in the diff shows they fail without the TypeCollector change' while citing SuppressSourceGenerationAnalyzerTests.cs lines 80-144. TypeCollector.cs directly shows those three tests fail with analyzer exceptions (AD0001) without the change: without lines 1023-1026 and 1039-1042, DuplicateIntKeysAreReportedWithoutAnalyzerFailure and DuplicateStringKeysAreReported | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1007 | The lookup changed from `DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation()` to `DeclaringSyntaxReferences[0]`. Members with no source syntax (for example inherited from a base type in a referenced assembly) have an empty array, so this now throws IndexOutOfRangeException. That reintroduces an analyzer crash of the kind this change is meant to fix. The second loop at line 1147 k | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1023 | No code in the diff is keyed on SuppressSourceGeneration, and the fix applies to all types. The diff does not show why the analyzer failed only for suppressed types since 3.1.1. If the real regression is elsewhere (for example suppressed types being skipped or handled differently), it may remain unfixed. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1008 | `continue` skips everything after it for a member with the wrong key kind. That includes the formatter-attribute lookup at line 1045 and any later per-member validation, so those diagnostics are no longer reported for that member. | author (Claude) |
| F5 | low | `README.md` L1630 | The README says MsgPack012 (type accessibility) is reported for suppressed types, but no test checks it. | author (Claude) |
| F6 | medium | `TypeCollector.cs` L1007 | Replacing item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation() with item.DeclaringSyntaxReferences[0].GetSyntax().GetLocation() throws IndexOutOfRangeException when a [MessagePackObject] inherits a [Key] property with a mismatched key kind from a base class in a referenced metadata assembly (where DeclaringSyntaxReferences is empty). TypeCollector collects inherited members ( | breaker (Gemini) |
| F7 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: A new 'Opting out of source generation' section documents analyzer behavior for suppressed types. This is user-facing documentation the bug fix does not need.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Line 1007 switches the location lookup from FirstOrDefault()? to [0]. This is unrelated to the bug and riskier.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: These run-time execution tests cover serializer behavior, not the analyzer the issue is about.

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

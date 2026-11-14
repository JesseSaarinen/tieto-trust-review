# Evidence pack: REQ-2234 on `ju26-issue-2234`

> **REVIEW INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: no test results produced. Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `a0d1e87cfbfb` (ju26-issue-2234.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 252 of 252 changed code lines (100%).** Docs: 14 lines, read with the story (14 flagged). Of everything changed: 100%.

- Fail closed: tests no test results produced. No claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- 2 refusal(s) on honesty grounds need a human look.
- 2 behaviour claim(s) rest on AI reading only (no passing test).
- Why lines stay: 177 cited only by claims without a passing test; 51 no claim covers the line; 22 refused; 2 named by a finding.

**The owner must read** (4 files):
- `README.md` whole file diff (14 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (22 changed lines): F1 author (Claude) (L1023); claim C1 only AI-read (L1004-1010); claim C1 only AI-read (L1144-1150); claim C2 only AI-read (L1023-1026); claim C2 only AI-read (L1039-1042); claim C2 only AI-read (L1163-1166); claim C2 only AI-read (L1179-1182); R1 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C6 has no passing test behind it; F5 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-193 (193 of 193 changed lines): no claim covers these lines; F4 author (Claude); C3 has no passing test behind it; C4 has no passing test behind it

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `9007cee116` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | not run: no test results produced |
| Pack id | `022f0bb61871` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The source fix is generic crash avoidance for duplicate and mixed keys. It has no change tied to `SuppressSourceGeneration`. | It is unclear whether this addresses the reported regression or a different crash. A human should confirm the root cause against the 3.1.0 to 3.1.1 diff or a repro from the issue. | `TypeCollector.cs` | AI reading |
| R2 | honesty | The README adds documentation that commits to which analyzer rules run for suppressed types. | It is a documentation commitment beyond the bug fix, and part of it (MsgPack012) is unverified by tests. | `README.md` | AI reading |

## 3. The story
Makes the type-collection code more tolerant of bad key layouts. Before, two members with the same key, or a mix of int and string keys, could throw inside the analyzer. Now it reports the diagnostic and skips the offending member. It adds analyzer tests for `[MessagePackObject(SuppressSourceGeneration = true)]` types, two execution tests, and a README section on opting out of source generation.

**Why:** Issue 2234 says the analyzer stops working for types with `SuppressSourceGeneration = true` since 3.1.1. The agent's fix assumes the cause is an exception in `TypeCollector`. The likely candidates are `Dictionary.Add` on a duplicate key and `intKey!.Value` on a null key after the mixed-key diagnostic. Either would abort analysis and hide all other diagnostics.

**Touches beyond the requirement:**
- README.md gains a new 'Opting out of source generation' section that commits to which analyzer rules do and do not apply to suppressed types.
- The `TypeCollector` change applies to all `[MessagePackObject]` types, not only suppressed ones. A test covers a normal generated type too.
- The execution tests check runtime round-tripping through the dynamic resolver and that no generated formatter exists. That is generator/runtime behavior, not the analyzer.

**How sure (the author's own view; it moves nothing):** The crash-avoidance edits are high confidence: they are small and local. Confidence that they fix the reported regression is low to medium. Nothing in the diff touches a `SuppressSourceGeneration` code path, and the issue does not say which diagnostics went missing. The suppressed-type tests for MsgPack004, MsgPack015 and MsgPack003 may pass with or without the source change; the diff does not show that.

## 4. Claims (7)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | After reporting the mixed int/string key diagnostic, the collector now skips that member with `continue`. It no longer falls through to `intKey!.Value` or the string path with a null key, which could throw. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C2 | unverified | A duplicate int or string key no longer throws from `Dictionary.Add`. The first member with a key is kept, and later duplicates are silently dropped from the member map. This holds in both the property and field collection paths. | "The analyzer does not work if SuppressSourceGeneration = true." | AI reading only | - | no |
| C4 | unverified | For suppressed types, the partial-class rule (MsgPack011) and the AOT-only rules (MsgPack016, MsgPack017) are not reported. This test verifies existing behavior; no code in the diff implements it. | (scope) | AI reading only | - | no |
| C6 | unverified | A suppressed type gets no generated formatter and round-trips through the standard (dynamic) resolver. | (scope) | AI reading only | - | no |
| C7 | unverified | The README documents which analyzer rules apply to suppressed types. It lists MsgPack012 as still enforced, but no test in the diff covers MsgPack012 for suppressed types. | (scope) | AI reading only | - | no |
| C3 | backed | The analyzer tests check that suppressed types still get MsgPack004 (missing key), MsgPack015 (`AllowPrivate` required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys). These are the behaviors the requirement says broke. The diff does not show that any of these tests fail without the source change. | "The analyzer does not work if SuppressSourceGeneration = true." | static check | - | no |
| C5 | backed | No new analyzer rules, public API or wire-format changes are introduced. Only existing diagnostic IDs are used. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** After reporting the mixed int/string key diagnostic, the collector now skips that member with `continue`. It no longer falls through to `intKey!.Value` or the string path with a null key, which could throw.
- Lines: `TypeCollector.cs` L1004-1010, `TypeCollector.cs` L1144-1150
- Checked by: **AI reading only** (tests named (MixedKeyKindsAreReportedWithoutAnalyzerFailure) but not run: no test results produced)

**C2 (unverified, behavior, author confidence high):** A duplicate int or string key no longer throws from `Dictionary.Add`. The first member with a key is kept, and later duplicates are silently dropped from the member map. This holds in both the property and field collection paths.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **AI reading only** (tests named (DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure, DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes) but not run: no test results produced)

**C4 (unverified, test, author confidence medium):** For suppressed types, the partial-class rule (MsgPack011) and the AOT-only rules (MsgPack016, MsgPack017) are not reported. This test verifies existing behavior; no code in the diff implements it.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **AI reading only** (tests named (SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed) but not run: no test results produced)

**C6 (unverified, test, author confidence high):** A suppressed type gets no generated formatter and round-trips through the standard (dynamic) resolver.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **AI reading only** (tests named (NoFormatterIsGeneratedForSuppressedType, SuppressedTypeRoundTripsThroughDynamicResolver) but not run: no test results produced)

**C7 (unverified, docs, author confidence medium):** The README documents which analyzer rules apply to suppressed types. It lists MsgPack012 as still enforced, but no test in the diff covers MsgPack012 for suppressed types.
- Lines: `README.md` L1620-1633
- Checked by: **AI reading only**

**C3 (backed, test, author confidence medium):** The analyzer tests check that suppressed types still get MsgPack004 (missing key), MsgPack015 (`AllowPrivate` required), MsgPack003 (member type not serializable) and MsgPack005 (duplicate or mixed keys). These are the behaviors the requirement says broke. The diff does not show that any of these tests fail without the source change.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **static check** (tests named (MemberWithoutKeyIsReported, AllowPrivateRequiredIsReported, MemberTypeMustBeMessagePackObjectIsReported, DuplicateIntKeysAreReportedWithoutAnalyzerFailure, DuplicateStringKeysAreReportedWithoutAnalyzerFailure, MixedKeyKindsAreReportedWithoutAnalyzerFailure) but not run: no test results produced; static check S8 passed)

**C5 (backed, scope, author confidence high):** No new analyzer rules, public API or wire-format changes are introduced. Only existing diagnostic IDs are used.
- Lines: `TypeCollector.cs` L1004-1042
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1023 | No change in the diff is specific to `SuppressSourceGeneration`. The fix only guards against duplicate/mixed-key crashes, which also affect non-suppressed types, as the `ForGeneratedTypes` test shows. If the 3.1.1 regression was really caused by suppressed types skipping analysis or taking a different code path, this change does not address it. Nobody has confirmed the root cause. | author (Claude) |
| F2 | low | `TypeCollector.cs` L1008 | The `continue` skips the rest of the loop body for that member. That includes the formatter-attribute lookup at line 1045 and any later per-member checks. Other diagnostics for a member with a mismatched key kind may no longer be reported. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1039 | Duplicate-key members are now silently dropped from the member map. This is safe only if MsgPack005 is an error that blocks the build. If a user lowers its severity, the generator would emit a formatter that quietly omits the duplicate member. | author (Claude) |
| F4 | medium | `SuppressSourceGenerationAnalyzerTests.cs` L20 | The MsgPack004, MsgPack015 and MsgPack003 suppressed-type tests exercise no changed code, because the source change only affects duplicate and mixed keys. They may pass without the fix, so they do not show that the reported regression is resolved. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `README.md`: New documentation section that commits to user-visible analyzer behavior for suppressed types. That behavior includes MsgPack012, which is not tested.
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs`: Runtime round-trip and no-generated-formatter tests. These cover generator and runtime behavior, not the analyzer named in the requirement.

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

# Evidence pack: REQ-2234 on `seeded-09`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `8714065b6089` (seeded-09.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 83 of 254 changed code lines (33%).** Docs: 14 lines, read with the story. Of everything changed: 31%.

- Refused to decide (contracts: New public API in a shipped package). The owner reads these files in full.
- 1 refusal(s) on honesty grounds need a human look.
- Evidence took 171 of 254 changed code lines off the list (C2, C1, C3, C4: tests found passing in the real run; breaker removed for this measurement). 83 stay with the owner.
- Why lines stay: 51 no claim covers the line; 28 cited only by claims without a passing test; 2 refused; 2 named by a finding.

**The owner must read** (4 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (2 changed lines): F2 author (Claude) (L17); R1 contracts; R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1008 (1 of 22 changed lines): F1 author (Claude)
- `tests/MessagePack.SourceGenerator.ExecutionTests/SuppressedSourceGenerationTests.cs` L1-37 (37 of 37 changed lines): no claim covers these lines; C5 has no passing test behind it; F5 test run
- `tests/MessagePack.SourceGenerator.Tests/SuppressSourceGenerationAnalyzerTests.cs` L1-19, L145-167, L193 (43 of 193 changed lines): no claim covers these lines

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 171 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C2, C1, C3, C4

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `5f32497599` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 175 passed, 0 failed, 0 skipped (67s) |
| Pack id | `ad2bad6e12b5` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L17 | static check |
| R2 | honesty | Change beyond the requirement in the annotations assembly | The attribute change is unrelated to the analyzer bug and is not mentioned in any test or doc. | `Attributes.cs` | AI reading |

## 3. The story
The change makes the analyzer's member collection in TypeCollector tolerate invalid key layouts instead of throwing. It adds a `continue` after the mixed int/string key diagnostic (L1008, L1148) and guards the dictionary `Add` calls against duplicate keys (L1023-1026, L1039-1042, L1163-1166, L1179-1182). It adds analyzer tests and execution tests for `SuppressSourceGeneration = true` types, plus a README section. Separately, it makes `MessagePackObjectAttribute.KeyAsPropertyName` publicly settable.

**Why:** Issue 2234 reports that the analyzer stops working for `[MessagePackObject(SuppressSourceGeneration = true)]` types since 3.1.1. The agent's theory is that the analyzer crashes on duplicate or mixed keys. Before this change, a duplicate key made `Dictionary.Add` throw, and a mixed key kind reached `intKey!.Value` on a null key, so the analyzer crashed instead of reporting diagnostics.

**Touches beyond the requirement:**
- src/MessagePack.Annotations/Attributes.cs: `KeyAsPropertyName` gains a public setter. This is a public API change unrelated to the bug (S3 fails).
- README.md: a new user-facing section that documents which diagnostics apply to suppressed types.
- The TypeCollector crash guards apply to all `[MessagePackObject]` types, not only suppressed ones. The test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` confirms this.

**How sure (the author's own view; it moves nothing):** High confidence that the TypeCollector edits remove two exception paths. Low-to-medium confidence that they are the actual cause of the 3.1.1 regression. None of the changed code references `SuppressSourceGeneration`, and the regression's root cause is not shown in the diff. The Attributes.cs change has no visible connection to the requirement.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C5 | unverified | Suppressed types get no generated formatter and still round-trip through the dynamic resolver. These tests check runtime behavior, not the analyzer. | (scope) | AI reading only | - | no |
| C7 | unverified | The change adds a public setter to `MessagePackObjectAttribute.KeyAsPropertyName`. This is new public API in a shipped assembly and is not needed by the bug fix. | (scope) | AI reading only | - | no |
| C8 | unverified | The README documents which analyzer rules apply to suppressed types. | (scope) | AI reading only | - | no |
| C2 | backed | Duplicate int or string keys no longer throw from `Dictionary.Add`. The first member wins and the duplicate is skipped, for both the property and field paths. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C1 | backed | When a member's key kind (int vs string) differs from the other members, the analyzer reports DoNotMixStringAndIntKeys and then skips that member. Previously it fell through to `intKey!.Value` or used a null string key. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C3 | backed | The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported on `SuppressSourceGeneration = true` types. If these pass, the analyzer does run on suppressed types. Whether they would have failed on 3.1.1 is not shown. | "The analyzer does not work if SuppressSourceGeneration = true." | test run | - | yes |
| C4 | backed | The partial-class (MsgPack011) and AOT-only (MsgPack016/017) diagnostics are not reported for suppressed types. The test asserts this by expecting no diagnostics at all on a non-partial class with a private member and an init property. | (scope) | test run | - | yes |
| C6 | backed | No serialization wire format, rule descriptor, or runtime reader code is changed. | (scope) | static check | - | no |

**C5 (unverified, test, author confidence high):** Suppressed types get no generated formatter and still round-trip through the dynamic resolver. These tests check runtime behavior, not the analyzer.
- Lines: `SuppressedSourceGenerationTests.cs` L8-36
- Checked by: **AI reading only** (named test `NoFormatterIsGeneratedForSuppressedType` not found in the test run; named test `SuppressedTypeRoundTripsThroughDynamicResolver` not found in the test run)

**C7 (unverified, scope, author confidence high):** The change adds a public setter to `MessagePackObjectAttribute.KeyAsPropertyName`. This is new public API in a shipped assembly and is not needed by the bug fix.
- Lines: `Attributes.cs` L17-17
- Checked by: **AI reading only**

**C8 (unverified, docs, author confidence medium):** The README documents which analyzer rules apply to suppressed types.
- Lines: `README.md` L1620-1632
- Checked by: **AI reading only**

**C2 (backed, behavior, author confidence high):** Duplicate int or string keys no longer throw from `Dictionary.Add`. The first member wins and the duplicate is skipped, for both the property and field paths.
- Lines: `TypeCollector.cs` L1023-1026, `TypeCollector.cs` L1039-1042, `TypeCollector.cs` L1163-1166, `TypeCollector.cs` L1179-1182
- Checked by: **test run** (test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateKeysAreReportedWithoutAnalyzerFailureForGeneratedTypes` passed (1 case))

**C1 (backed, behavior, author confidence high):** When a member's key kind (int vs string) differs from the other members, the analyzer reports DoNotMixStringAndIntKeys and then skips that member. Previously it fell through to `intKey!.Value` or used a null string key.
- Lines: `TypeCollector.cs` L1005-1009, `TypeCollector.cs` L1145-1149
- Checked by: **test run** (test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case))

**C3 (backed, test, author confidence medium):** The analyzer tests check that MsgPack004, MsgPack015, MsgPack003 and MsgPack005 are reported on `SuppressSourceGeneration = true` types. If these pass, the analyzer does run on suppressed types. Whether they would have failed on 3.1.1 is not shown.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L20-144
- Checked by: **test run** (test `MemberWithoutKeyIsReported` passed (1 case); test `AllowPrivateRequiredIsReported` passed (1 case); test `MemberTypeMustBeMessagePackObjectIsReported` passed (1 case); test `DuplicateIntKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `DuplicateStringKeysAreReportedWithoutAnalyzerFailure` passed (1 case); test `MixedKeyKindsAreReportedWithoutAnalyzerFailure` passed (1 case); static check S8 passed)

**C4 (backed, test, author confidence medium):** The partial-class (MsgPack011) and AOT-only (MsgPack016/017) diagnostics are not reported for suppressed types. The test asserts this by expecting no diagnostics at all on a non-partial class with a private member and an init property.
- Lines: `SuppressSourceGenerationAnalyzerTests.cs` L168-192
- Checked by: **test run** (test `SourceGenerationOnlyDiagnosticsAreNotReportedWhenSuppressed` passed (1 case); static check S4 passed)

**C6 (backed, scope, author confidence high):** No serialization wire format, rule descriptor, or runtime reader code is changed.
- Checked by: **static check** (static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)

**Requirement coverage:** 1 of 2 requirement sentences are quoted by a claim.
Not quoted by any claim (1; first 1):
- This has happened since version 3.1.1.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1008 | No edited line references SuppressSourceGeneration. The fix targets generic crashes on duplicate or mixed keys, which also affect non-suppressed types (see test L147). If the 3.1.1 regression was caused by something specific to suppressed types (e.g. an early return or different code path), it may not be fixed. Nothing in the diff shows the tests failing before this change. | author (Claude) |
| F2 | medium | `Attributes.cs` L17 | `KeyAsPropertyName` now has a public setter, so users can write `[MessagePackObject(KeyAsPropertyName = true)]` as a named argument. If the generator, analyzer or dynamic resolver only read the constructor argument, that named form would be silently ignored. This would be a contract mismatch, and it is unrelated to the bug. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1023 | Silently dropping duplicate-key members changes how the source generator handles non-suppressed types. The diagnostic should block the build. However, if MsgPack005 is downgraded or suppressed by the user, a formatter could be generated that omits a member. | author (Claude) |
| F4 | low | `README.md` L1630 | The README claims MsgPack012 (accessibility) is still reported for suppressed types, but no test covers it. | author (Claude) |
| F5 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: Adds a public setter to `KeyAsPropertyName`; this is not needed for the analyzer fix.
- `README.md`: New documentation section on opting out of source generation and analyzer coverage.

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

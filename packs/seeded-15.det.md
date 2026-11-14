# Evidence pack: REQ-2234 on `seeded-15`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `6c6d8af6a8` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | none |
| Tests | ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 171 blocked by the machine, 0 skipped (53s) |
| Pack id | `2ca57bb44c12` |

**Stubbed:** author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)

## Routing: **FULL READ**
- Refused to decide (safety: Code that reads untrusted input changed). The owner reads these files in full.

**The owner must read** (1):
- `src/MessagePack/MessagePackSecurity.cs` whole file diff: R1 safety

**Not required to read:**
- 1 docs: prose; covered by the story
- 3 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (1)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | Code that reads untrusted input changed | Deserializers parse bytes from the network; mistakes become security bugs. Needs a human with security context. | `MessagePackSecurity.cs` L233 | static check |

## 3. The story
[STUB] no Claude call made

**How sure:** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|


## 5. Findings (1)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `SuppressedSourceGenerationTests.cs` L23 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' | test run |

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed; existing ids mentioned: MsgPack004, MsgPack005, MsgPack015, MsgPack003, MsgPack012, MsgPack011, MsgPack016, MsgPack017 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | fail | deserialization or unsafe code changed in: src/MessagePack/MessagePackSecurity.cs L233 |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 10 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 175 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 171 blocked by the machine, 0 skipped (53s)

## 8. What was NOT checked
- 171 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 1 new compile error(s), e.g. SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance'.
- Model calls stubbed: author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

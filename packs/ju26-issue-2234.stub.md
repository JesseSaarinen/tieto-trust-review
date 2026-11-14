# Evidence pack: REQ-2234 on `ju26-issue-2234`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2234: The analyzer does not work if SuppressSourceGeneration = true |
| Commit | `9007cee116` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | none |
| Tests | not run: this machine blocked the freshly built test assemblies (Windows Application Control); not a code failure |
| Pack id | `997952d6c2d7` |

**Stubbed:** author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)

## Routing: **LIGHT CHECK**
- No refusal, no disputed claim, behaviour claims backed by tests or static checks: the owner reads the story and the evidence, not the diff.

**Not required to read:**
- 1 docs: prose; covered by the story
- 3 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (0)
Nothing hit the contracts, safety or honesty rules.

## 3. The story
[STUB] no Claude call made

**How sure:** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|


## 5. Findings (0)
None.

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
not run: this machine blocked the freshly built test assemblies (Windows Application Control); not a code failure
```
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(13,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(14,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(15,50): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(13,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(14,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\GeneratedCompositeResolverTests.cs(15,50): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\SuppressedSourceGenerationTests.cs(23,50): error CS0117: 'GeneratedMessagePackResolver' does not contain a definition for 'Instance' [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-9007cee116\tests\MessagePack.SourceGenerator.ExecutionTests\MessagePack.SourceGenerator.ExecutionTests.csproj]
```

## 8. What was NOT checked
- Tests: this machine blocked the freshly built test assemblies (Windows Application Control); not a code failure
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too (GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance').
- Test project MessagePack.SourceGenerator.Tests.csproj: blocked by the machine.
- Model calls stubbed: author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

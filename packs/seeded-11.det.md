# Evidence pack: REQ-2297 on `seeded-11`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `ec7c519361` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | none |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (60s) |
| Pack id | `2d59380dbb4f` |

**Stubbed:** author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)

## Routing: **LIGHT CHECK**
- No refusal, no disputed claim, behaviour claims backed by tests or static checks: the owner reads the story and the evidence, not the diff.

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 1 docs: prose; covered by the story
- 14 other source/test files not flagged: covered by passing evidence or not flagged by any check

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
| S1 | T4 templates and their compiled .cs change together | pass | 6 template(s), each with its .cs counterpart changed |
| S2 | Generated snapshot files change uniformly | pass | 222 generated file(s); 6 distinct changed line shape(s): `+#if !NETSTANDARD2_0 && !NETFRAMEWORK`, `+[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]`, `+#endif`, `+{`, `+internal sealed class HasPrivateSerializedMemberAndIsGenericNamedFormatter : gl`, `-{	internal sealed class HasPr |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 2 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (60s)

## 8. What was NOT checked
- Model calls stubbed: author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

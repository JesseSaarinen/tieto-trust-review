# Evidence pack: REQ-2129 on `seeded-27`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `42ae944310` (base `32258fdbee`) |
| Files | 29 changed, 29 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | none |
| Tests | not run: build failed (introduced by this change: the base commit builds) |
| Pack id | `e259d3762174` |

**Stubbed:** author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)

## Routing: **FULL READ**
- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- The change breaks the test build (the base commit builds).

**The owner must read** (2):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff: R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff: R2 contracts

**Not required to read:**
- 6 docs: prose; covered by the story
- 21 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |

## 3. The story
[STUB] no Claude call made

**How sure:** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|


## 5. Findings (12)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version. | test run |
| F2 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp.Workspaces 4.14.0 -> Microsoft.Bcl.AsyncInterfaces (>= 9.0.0) | test run |
| F3 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.Bcl.AsyncInterfaces (>= 8.0.0) | test run |
| F4 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version. | test run |
| F5 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0) | test run |
| F6 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) | test run |
| F7 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version. | test run |
| F8 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0) | test run |
| F9 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) | test run |
| F10 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: System.Collections.Immutable from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version. | test run |
| F11 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> System.Collections.Immutable (>= 9.0.0) | test run |
| F12 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> System.Collections.Immutable (>= 8.0.0) | test run |

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | pass | 2 template(s), each with its .cs counterpart changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | fail | public declarations added: src/MessagePack.Annotations/Attributes.cs L166,176 |
| S4 | No new user-visible analyzer rules | fail | analyzer release notes or descriptors changed (src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md); rule ids mentioned in added lines: MsgPack019, MsgPack022, MsgPack020, MsgPack021, MsgPack005 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 13 new test(s), each with an assertion or verifier call |

## 7. Tests
not run: build failed (introduced by this change: the base commit builds)
```
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> System.Reflection.Metadata (>= 8.0.1) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: System.Collections.Immutable from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> System.Collections.Immutable (>= 9.0.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> System.Collections.Immutable (>= 8.0.0) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: System.Reflection.Metadata from 9.0.0 to centrally defined 8.0.1. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> System.Reflection.Metadata (>= 9.0.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> System.Reflection.Metadata (>= 8.0.1) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Workspaces.Common 4.14.0 -> Microsoft.Bcl.AsyncInterfaces (>= 9.0.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.Bcl.AsyncInterfaces (>= 8.0.0) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Workspaces.Common 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: System.Collections.Immutable from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Workspaces.Common 4.14.0 -> System.Collections.Immutable (>= 9.0.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> System.Collections.Immutable (>= 8.0.0) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: System.Reflection.Metadata from 9.0.0 to centrally defined 8.0.1. Update the centrally managed package version to a higher version.  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.Workspaces.Common 4.14.0 -> System.Reflection.Metadata (>= 9.0.0)  [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\src\MessagePack.Analyzers.CodeFixes\MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> System.Reflection.Metadata (>= 8.0.1) [C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj]
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj : error NU1605: Warning As Error: Detected package downgrade: Microsoft.CodeAnalysis.CSharp.Workspaces from 4.14.0 to 4.12.0. Reference the package directly from the project to select a different version. 
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj : error NU1605:  MessagePack.SourceGenerator.Tests -> MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp.Workspaces (>= 4.14.0) 
C:\Users\Jesse\Projects\personal\hackathons\junction-2026\tieto-trust-review\.work\wt-42ae944310\tests\MessagePack.SourceGenerator.Tests\MessagePack.SourceGenerator.Tests.csproj : error NU1605:  MessagePack.SourceGenerator.Tests -> Microsoft.CodeAnalysis.CSharp.Workspaces (>= 4.12.0)
```

## 8. What was NOT checked
- Tests: build failed (introduced by this change: the base commit builds)
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update t.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update t.
- Test project MessagePack.SourceGenerator.Tests.csproj: build failed (MessagePack.Analyzers.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update the central).
- Model calls stubbed: author (ANTHROPIC_API_KEY missing), breaker (GEMINI_API_KEY missing)
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

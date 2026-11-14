# Evidence pack: REQ-2129 on `seeded-27`

> **REVIEW INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: build failed (introduced by this change: the base commit builds). Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.
> - **author**: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
> - **breaker**: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `1b1ead320573` (seeded-27.run2.json), layers: det. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 886 of 886 changed code lines (100%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 100%.

- Fail closed: tests build failed (introduced by this change: the base commit builds). No claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- Fail closed: author removed for measurement (deterministic layer only). There is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Fail closed: breaker not run, because there were no claims to break. No claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- The change breaks the test build (the base commit builds).
- Why lines stay: 886 reviewer part missing or failed.

**The owner must read** (29 files):
- `Directory.Packages.props` whole file diff (2 changed lines): author missing or failed
- `README.md` whole file diff (52 changed lines): author missing or failed
- `doc/analyzers/MsgPack019.md` whole file diff (26 changed lines): author missing or failed
- `doc/analyzers/MsgPack020.md` whole file diff (23 changed lines): author missing or failed
- `doc/analyzers/MsgPack021.md` whole file diff (23 changed lines): author missing or failed
- `doc/analyzers/MsgPack022.md` whole file diff (31 changed lines): author missing or failed
- `doc/analyzers/index.md` whole file diff (4 changed lines): author missing or failed
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): author missing or failed; R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): author missing or failed; R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` whole file diff (46 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` whole file diff (300 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` whole file diff (13 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` whole file diff (7 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` whole file diff (3 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` whole file diff (39 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` whole file diff (4 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` whole file diff (4 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` whole file diff (2 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` whole file diff (50 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` whole file diff (95 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` whole file diff (5 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` whole file diff (15 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` whole file diff (12 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` whole file diff (15 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` whole file diff (17 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` whole file diff (3 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` whole file diff (210 changed lines): author missing or failed

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `42ae944310` (base `32258fdbee`) |
| Files | 29 changed, 29 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | not run: build failed (introduced by this change: the base commit builds) |
| Pack id | `352e5622dec3` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |

## 3. The story
No story: the author model did not produce one. Nothing below is backed by a model; read the change itself.

**How sure (the author's own view; it moves nothing):** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 0 of its 14 sentences.
Requirement sentences no claim quotes (14; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` generated **inside Project B** instead of Project A, because the latter has no (and cannot have…
- Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes implementing `IMessagePackFormatter<T>`.
- The class does not even need to declare a body (no `{` and `}`), because the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackGenerator` as usua…
- As for the attribute-based property keys and other settings (such as Union), I can think of 3 alternatives:
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.

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
- Reviewer part missing or failed: tests: build failed (introduced by this change: the base commit builds). Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- Reviewer part missing or failed: author: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Reviewer part missing or failed: breaker: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update t.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update t.
- Test project MessagePack.SourceGenerator.Tests.csproj: build failed (MessagePack.Analyzers.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update the central).
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

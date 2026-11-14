# Evidence pack: REQ-2129 on `seeded-19`

> **REVIEW INCOMPLETE: 5 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **author**: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
> - **breaker**: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `280d7513b8c6` (seeded-19.run2.json), layers: det. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 889 of 889 changed code lines (100%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 100%.

- Fail closed: author removed for measurement (deterministic layer only). There is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Fail closed: breaker not run, because there were no claims to break. No claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- Why lines stay: 889 reviewer part missing or failed.

**The owner must read** (28 files):
- `README.md` whole file diff (52 changed lines): author missing or failed
- `doc/analyzers/MsgPack019.md` whole file diff (26 changed lines): author missing or failed
- `doc/analyzers/MsgPack020.md` whole file diff (23 changed lines): author missing or failed
- `doc/analyzers/MsgPack021.md` whole file diff (23 changed lines): author missing or failed
- `doc/analyzers/MsgPack022.md` whole file diff (31 changed lines): author missing or failed
- `doc/analyzers/index.md` whole file diff (4 changed lines): author missing or failed
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (41 changed lines): author missing or failed; R1 contracts
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
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` whole file diff (50 changed lines): F1 test run (L20); F2 test run (L20); F3 test run (L10); F4 test run (L10); F5 test run (L15); F6 test run (L15); author missing or failed
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
| Commit | `ca2ae546b9` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (103s) |
| Pack id | `2877b05041e4` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176,181 | static check |
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

## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F2 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F3 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F4 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F5 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F6 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | pass | 2 template(s), each with its .cs counterpart changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | fail | public declarations added: src/MessagePack.Annotations/Attributes.cs L166,176,181 |
| S4 | No new user-visible analyzer rules | fail | analyzer release notes or descriptors changed (src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md); rule ids mentioned in added lines: MsgPack019, MsgPack022, MsgPack020, MsgPack021, MsgPack005 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 13 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (103s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: author: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Reviewer part missing or failed: breaker: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too (GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance').
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

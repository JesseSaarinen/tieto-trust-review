# Evidence pack: REQ-2297 on `seeded-21`

> **REVIEW INCOMPLETE: 2 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **author**: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
> - **breaker**: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `d8a4e0463241` (seeded-21.run2.json), layers: det. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 183 of 183 changed code lines (100%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (3 flagged). Of everything changed: 13%.

- Fail closed: author removed for measurement (deterministic layer only). There is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Fail closed: breaker not run, because there were no claims to break. No claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- 22 high-severity finding(s).
- 22 test(s) failed.
- Why lines stay: 183 reviewer part missing or failed.

**The owner must read** (15 files):
- `README.md` whole file diff (3 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` whole file diff (5 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` whole file diff (6 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` whole file diff (3 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` whole file diff (3 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` whole file diff (7 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` whole file diff (9 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` whole file diff (4 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` whole file diff (5 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` whole file diff (2 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.tt` whole file diff (3 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` whole file diff (130 changed lines): author missing or failed

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `d5bc4246db` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 147 passed, 22 failed, 0 skipped (46s) |
| Pack id | `8dd77da51719` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (0)
Nothing hit the contracts, safety or honesty rules.

## 3. The story
No story: the author model did not produce one. Nothing below is backed by a model; read the change itself.

**How sure (the author's own view; it moves nothing):** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 0 of its 5 sentences.
Requirement sentences no claim quotes (5; an issue body is mostly context, so skim this for anything the change should have done; first 5 shown, all in the JSON):
- MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute.
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute.
- I do not feel like a setting is needed, but setting would be fine to have too.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (22)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValueInputPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F2 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyIgnore - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F3 | high | - | Test failed: PrivateMemberAccessTests.FormatterForClassWithPrivateMembers_MapMode - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F4 | high | - | Test failed: GenerationTests.EnumFormatter(container: Namespace, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F5 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F6 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F7 | high | - | Test failed: GenerationTests.CustomFormatterViaAttributeOnProperty(usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F8 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F9 | high | - | Test failed: GenerationTests.GenericDataTypeWithPrivateMember - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F10 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F11 | high | - | Test failed: GenerationTests.EnumFormatter(container: NestingClass, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F12 | high | - | Test failed: GenerationTests.EnumFormatter(container: None, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F13 | high | - | Test failed: CustomStringKeyFormatterTests.RecordWithWithInitOnlyProps - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F14 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorAndDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F15 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F16 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetter - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F17 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyMixed - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F18 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorDoNotUseSetter - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F19 | high | - | Test failed: CustomStringKeyFormatterTests.RecordWithPrimaryConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F20 | high | - | Test failed: GenerationTests.CustomFormatterViaAttributeOnField(usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F21 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F22 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |

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
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 147 passed, 22 failed, 0 skipped (46s)
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValueInputPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyIgnore`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `PrivateMemberAccessTests.FormatterForClassWithPrivateMembers_MapMode`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.EnumFormatter(container: Namespace, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.CustomFormatterViaAttributeOnProperty(usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.GenericDataTypeWithPrivateMember`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.EnumFormatter(container: NestingClass, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `GenerationTests.EnumFormatter(container: None, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `CustomStringKeyFormatterTests.RecordWithWithInitOnlyProps`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorAndDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetter`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyMixed`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorDoNotUseSetter`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `CustomStringKeyFormatterTests.RecordWithPrimaryConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.CustomFormatterViaAttributeOnField(usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa

## 8. What was NOT checked
- Reviewer part missing or failed: author: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Reviewer part missing or failed: breaker: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

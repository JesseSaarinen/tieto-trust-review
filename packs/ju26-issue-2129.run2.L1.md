# Evidence pack: REQ-2129 on `ju26-issue-2129`

> **REVIEW PARTLY INCOMPLETE: 4 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 169 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `20e9282d7b5c` (ju26-issue-2129.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 884 of 884 changed code lines (100%).** Docs: 159 lines, read with the story. Of everything changed: 85%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 4 refusal(s) on contracts/honesty grounds need a human look.
- 15 behaviour claim(s) rest on AI reading only (no passing test).
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 884.
- Why lines stay: 430 cited only by claims without a passing test; 223 claim rests on AI reading only; 161 refused; 65 no claim covers the line; 5 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L32-35, L318-353, L381-385 (46 of 46 changed lines): C17 has no passing test behind it; R3 contracts (AI-suggested); no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-300 (300 of 300 changed lines): no claim covers these lines; claim C16 only AI-read; claim C5 only AI-read; claim C6 only AI-read; claim C7 only AI-read; claim C8 only AI-read; claim C9 only AI-read; claim C10 only AI-read; claim C11 only AI-read; R4 contracts (AI-suggested); R5 honesty (AI-suggested); claim C14 only AI-read; F2 author (Claude); claim C15 only AI-read; F1 author (Claude)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read; R6 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): claim C11 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C13 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L115-132 (39 of 39 changed lines): claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines; claim C4 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C12 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C12 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C12 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C12 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C18 has no passing test behind it; F8 test run; F9 test run; F12 test run; F13 test run; F10 test run; F11 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): no claim covers these lines; C19 has no passing test behind it; C20 has no passing test behind it; C21 has no passing test behind it; C22 has no passing test behind it; C23 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C18 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C18 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C18 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C18 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C18 has no passing test behind it; F3 author (Claude)
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C25 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L1-210 (210 of 210 changed lines): C24 has no passing test behind it

**Not required to read:**
- 6 doc file(s): prose; covered by the story

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `083afd994c` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 169 blocked by the machine, 0 skipped (988s) |
| Pack id | `ae1560d3cf2d` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (6)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new user-visible Error diagnostics, MsgPack019 to MsgPack022. | New analyzer rule ids and severities are user-visible contracts (static check S4 fails). | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | The wire format chosen for external types: contractless string-keyed maps with ordinal-sorted names, and surrogate-defined int or string keys. | This defines serialized output for a new class of types. The default contract (map with member names) was not specified by the requirement. | `GeneratedFormatterCollector.cs` L128-141 | AI reading |
| R5 | honesty | The surrogate-type design goes beyond the requirement, which lists three specific alternatives for key metadata. | It is a change beyond the requirement's stated options and needs the owner to choose the design. | `GeneratedFormatterCollector.cs` L143-213 | AI reading |
| R6 | contracts | `GeneratedFormatterRequest` is a new public type in the source generator assembly. | Adds public surface that probably should be internal. | `GeneratedFormatterRequest.cs` L13-13 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations, with an optional `SurrogateType` property. The source generator gains a new pipeline for classes carrying the attribute. `GeneratedFormatterCollector` checks the class: it must be partial, implement exactly one `IMessagePackFormatter<T>`, and `T` must be a supported type. It then builds an `ObjectSerializationInfo` with `IsUserDeclaredFormatter = true`. The two formatter templates then emit `partial class <UserFormatter>` instead of `internal sealed class`. Without a surrogate, every public read-write instance member is serialized under its name as a string key. With a surrogate, the surrogate's `[Key]`/`[IgnoreMember]` attributes decide keys and membership, and its members are matched to the target by name and type. The generator reports four new diagnostics, MsgPack019 to MsgPack022, and reuses MsgPack004, 005, 007 and 008-style ids. User-declared formatters are excluded from the hand-written custom formatter list so they are not registered twice. A new ExternalTypes test project (no MessagePack reference) plus execution and generator diagnostic tests come with the change, along with README and analyzer docs.

**Why:** REQ-2129 asks to generate a formatter in Project B for a type defined in Project A, which cannot reference MessagePack. The trigger is a `[GeneratedMessagePackFormatter]` attribute on a partial class implementing `IMessagePackFormatter<T>`. The requirement lists three options for supplying key metadata. The agent picked none of them. It invented a fourth design: a contractless default plus a compile-time surrogate type.

**Touches beyond the requirement:**
- New public property `SurrogateType` and the surrogate-type design (not one of the three alternatives the issue lists)
- Four new user-visible diagnostic ids MsgPack019-MsgPack022, with release notes and docs
- Public record `GeneratedFormatterRequest` and public property `ObjectSerializationInfo.IsUserDeclaredFormatter` in the source generator assembly
- Change to GeneratorUtilities custom-formatter discovery, which now skips attributed formatters
- MapModeExecutionTests csproj now excludes the new execution test files
- New test-only project MessagePack.SourceGenerator.ExternalTypes targeting net8.0

**How sure (the author's own view; it moves nothing):** High for the shape of the generator pipeline, the template switch, and the diagnostic checks that have tests. Medium that end-to-end generation works. The execution tests look right, but I cannot see the generated output, the nesting emission for user formatters, or the ExecutionTests target frameworks. Low for untested paths: duplicate keys, unkeyed surrogate members, the no-parameterless-constructor check, generic/inaccessible/enum data types, bodiless `class X : I<T>;`, and nested formatters.

## 4. Claims (26)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | A public attribute `MessagePack.GeneratedMessagePackFormatterAttribute` is added to MessagePack.Annotations. It targets classes only, is not multi-use and not inherited, and has a nullable `Type? SurrogateType` property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator picks up classes carrying the attribute through ForAttributeWithMetadataName on `MessagePack.GeneratedMessagePackFormatterAttribute`. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent. The attribute and property names live in Constants. | "because the actual implementation is source-generated by `MessagePack.SourceGenerator.Mess…" | AI reading only | - | no |
| C3 | unverified | Each request is turned into a FullModel by GeneratedFormatterCollector.Collect, with diagnostics suppressed (reportDiagnostic: null). The model is added to the per-type models. The tuple indexing is shifted one level deeper to make room for the extra Combine. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C4 | unverified | A separate incremental pipeline reruns Collect for each request with a diagnostic sink and reports the results. A rejected formatter therefore produces a diagnostic and no generated source. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C5 | unverified | A formatter class with no `partial` modifier on any of its declarations is rejected with MsgPack019 at the class location. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C6 | unverified | The formatter must implement exactly one closed `MessagePack.Formatters.IMessagePackFormatter<T>`. Zero or several such interfaces produce MsgPack020. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C7 | unverified | MsgPack021 is reported for any of these data types `T`: not a named type, generic, abstract, not a class or struct, or not accessible from the formatter. Only the abstract case is tested. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C8 | unverified | A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. Structs skip this check. No test covers it. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C9 | unverified | Callback-receiver detection is set when the data type implements IMessagePackSerializationCallbackReceiver, with cast flags for explicit implementations. A type in a MessagePack-free assembly can never implement that interface, so this path is effectively dead for the stated use case. | (scope) | AI reading only | - | no |
| C10 | unverified | Without a surrogate, members are all public read-write instance properties and non-readonly, non-const fields, base types included. Only the most-derived member of each name is kept, indexers and implicit members are skipped, and the result is ordinal-sorted by name. Each member gets its name as a string key, and the object is not int-keyed, so it is written as a map. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C11 | unverified | The ObjectSerializationInfo is built with no constructor parameters, no nested formatter, and no generic parameters. Its Formatter is set to the user's class and IsUserDeclaredFormatter to true. It is wrapped in a FullModel whose ObjectInfos set holds only this entry. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | AI reading only | - | no |
| C13 | unverified | Classes with the attribute are excluded from the hand-written custom-formatter discovery. This avoids a second registration in the generated resolver. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C14 | unverified | Surrogate mode skips `[IgnoreMember]` members. It requires an int or string `[Key]` on every other surrogate instance member, private ones included, and reports MemberNeedsKey otherwise. Mixing int and string keys is rejected with DoNotMixStringAndIntKeys (MsgPack005). | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C15 | unverified | Each keyed surrogate member must match a public read-write member of the target with the same name and exactly the same type; otherwise MsgPack022 is reported at the surrogate member. Duplicate keys are reported with KeysMustBeUnique, which is untested. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C16 | unverified | For each matched member: an int surrogate key becomes that member's IntKey, while a string key becomes its StringKey with a positional IntKey. The resulting MemberSerializationInfo is always readable and writable, and carries init-only/required flags and fully qualified type names from the target member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C17 | unverified | Four new Error-severity descriptors MsgPack019 to MsgPack022 are declared and added to SupportedDiagnostics, with matching release-notes rows. Only the generator reports them; the analyzer's Initialize never does. | (scope) | AI reading only | - | no |
| C18 | unverified | The requirement's scenario is tested end to end. A new project, ExternalTypes, has no MessagePack reference and declares ExternalPerson, ExternalPoint and ExternalWidget. ExecutionTests references it and declares empty-bodied partial formatters for those types. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C26 | unverified | Docs only: a README section and analyzer pages for MsgPack019 to MsgPack022 describe contractless mode, surrogates and limitations. No code behaviour depends on them. | (scope) | AI reading only | - | no |
| C12 | backed | Both the int-key and string-key formatter templates (.tt and compiled .cs) emit `partial class` instead of `internal sealed class` when IsUserDeclaredFormatter is true. The generated body therefore merges into the user's class. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C19 | backed | Test ContractlessClassRoundTrips round-trips an ExternalPerson through the generated resolver and checks Id and Label. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C20 | backed | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers checks that the output is a 2-entry fixmap containing Id and Label but not the read-only Doubled. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | static check | - | no |
| C21 | backed | Test ContractlessClassNullRoundTrips checks that a null ExternalPerson round-trips to null. Test ContractlessStructRoundTrips round-trips an ExternalPoint struct. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | static check | - | no |
| C22 | backed | Test SurrogateControlsKeysAndMembership checks that int keys 3 and 7 produce an 8-slot array. It also checks that the IgnoreMember-ed Internal value is not round-tripped. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | static check | - | no |
| C23 | backed | Test MessagePackObjectCanContainExternalTypes round-trips a [MessagePackObject] that holds external types. Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts that GeneratedMessagePackResolver returns the user's formatter classes. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | static check | - | no |
| C24 | backed | Generator diagnostic tests check each new rule at its expected location: MsgPack019, MsgPack020, MsgPack021 (abstract) and MsgPack022 (missing member and mismatched type). They also check MsgPack005 for mixed surrogate keys. The formatter members are hand-written so the test source compiles when generation is declined. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | static check | - | no |
| C25 | backed | MapModeExecutionTests now excludes the new GeneratedFormatterForExternalTypes*.cs files, because that project does not reference ExternalTypes. The feature is therefore not exercised in force-map mode. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** A public attribute `MessagePack.GeneratedMessagePackFormatterAttribute` is added to MessagePack.Annotations. It targets classes only, is not multi-use and not inherited, and has a nullable `Type? SurrogateType` property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; test `FormatterMustBePartial` blocked by the machine (not evidence either way))

**C2 (unverified, behavior, author confidence high):** The generator picks up classes carrying the attribute through ForAttributeWithMetadataName on `MessagePack.GeneratedMessagePackFormatterAttribute`. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent. The attribute and property names live in Constants.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C3 (unverified, behavior, author confidence medium):** Each request is turned into a FullModel by GeneratedFormatterCollector.Collect, with diagnostics suppressed (reportDiagnostic: null). The model is added to the per-type models. The tuple indexing is shifted one level deeper to make room for the extra Combine.
- Lines: `MessagePackGenerator.cs` L59-76
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C4 (unverified, behavior, author confidence high):** A separate incremental pipeline reruns Collect for each request with a diagnostic sink and reports the results. A rejected formatter therefore produces a diagnostic and no generated source.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **AI reading only** (test `FormatterMustBePartial` blocked by the machine (not evidence either way); test `FormatterMustImplementFormatterOfT` blocked by the machine (not evidence either way); test `FormattedTypeMustNotBeAbstract` blocked by the machine (not evidence either way))

**C5 (unverified, behavior, author confidence high):** A formatter class with no `partial` modifier on any of its declarations is rejected with MsgPack019 at the class location.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **AI reading only** (test `FormatterMustBePartial` blocked by the machine (not evidence either way))

**C6 (unverified, behavior, author confidence high):** The formatter must implement exactly one closed `MessagePack.Formatters.IMessagePackFormatter<T>`. Zero or several such interfaces produce MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **AI reading only** (test `FormatterMustImplementFormatterOfT` blocked by the machine (not evidence either way))

**C7 (unverified, behavior, author confidence medium):** MsgPack021 is reported for any of these data types `T`: not a named type, generic, abstract, not a class or struct, or not accessible from the formatter. Only the abstract case is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **AI reading only** (test `FormattedTypeMustNotBeAbstract` blocked by the machine (not evidence either way))

**C8 (unverified, behavior, author confidence low):** A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. Structs skip this check. No test covers it.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**

**C9 (unverified, behavior, author confidence medium):** Callback-receiver detection is set when the data type implements IMessagePackSerializationCallbackReceiver, with cast flags for explicit implementations. A type in a MessagePack-free assembly can never implement that interface, so this path is effectively dead for the stated use case.
- Lines: `GeneratedFormatterCollector.cs` L83-85
- Checked by: **AI reading only**

**C10 (unverified, behavior, author confidence high):** Without a surrogate, members are all public read-write instance properties and non-readonly, non-const fields, base types included. Only the most-derived member of each name is kept, indexers and implicit members are skipped, and the result is ordinal-sorted by name. Each member gets its name as a string key, and the object is not int-keyed, so it is written as a map.
- Lines: `GeneratedFormatterCollector.cs` L87-102, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)

**C11 (unverified, behavior, author confidence medium):** The ObjectSerializationInfo is built with no constructor parameters, no nested formatter, and no generic parameters. Its Formatter is set to the user's class and IsUserDeclaredFormatter to true. It is wrapped in a FullModel whose ObjectInfos set holds only this entry.
- Lines: `GeneratedFormatterCollector.cs` L104-126, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C13 (unverified, behavior, author confidence medium):** Classes with the attribute are excluded from the hand-written custom-formatter discovery. This avoids a second registration in the generated resolver.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C14 (unverified, behavior, author confidence medium):** Surrogate mode skips `[IgnoreMember]` members. It requires an int or string `[Key]` on every other surrogate instance member, private ones included, and reports MemberNeedsKey otherwise. Mixing int and string keys is rejected with DoNotMixStringAndIntKeys (MsgPack005).
- Lines: `GeneratedFormatterCollector.cs` L147-187
- Checked by: **AI reading only** (test `SurrogateKeysMustNotMixStringAndInt` blocked by the machine (not evidence either way); named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C15 (unverified, behavior, author confidence high):** Each keyed surrogate member must match a public read-write member of the target with the same name and exactly the same type; otherwise MsgPack022 is reported at the surrogate member. Duplicate keys are reported with KeysMustBeUnique, which is untested.
- Lines: `GeneratedFormatterCollector.cs` L189-204, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **AI reading only** (test `SurrogateMemberMustMatchFormattedType` blocked by the machine (not evidence either way); test `SurrogateMemberMustHaveMatchingType` blocked by the machine (not evidence either way))

**C16 (unverified, behavior, author confidence medium):** For each matched member: an int surrogate key becomes that member's IntKey, while a string key becomes its StringKey with a positional IntKey. The resulting MemberSerializationInfo is always readable and writable, and carries init-only/required flags and fully qualified type names from the target member.
- Lines: `GeneratedFormatterCollector.cs` L206-244, `GeneratedFormatterCollector.cs` L19-22
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C17 (unverified, scope, author confidence high):** Four new Error-severity descriptors MsgPack019 to MsgPack022 are declared and added to SupportedDiagnostics, with matching release-notes rows. Only the generator reports them; the analyzer's Initialize never does.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-352, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **AI reading only** (test `FormatterMustBePartial` blocked by the machine (not evidence either way); test `FormatterMustImplementFormatterOfT` blocked by the machine (not evidence either way); test `FormattedTypeMustNotBeAbstract` blocked by the machine (not evidence either way); test `SurrogateMemberMustMatchFormattedType` blocked by the machine (not evidence either way))

**C18 (unverified, test, author confidence medium):** The requirement's scenario is tested end to end. A new project, ExternalTypes, has no MessagePack reference and declares ExternalPerson, ExternalPoint and ExternalWidget. ExecutionTests references it and declares empty-bodied partial formatters for those types.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run)

**C26 (unverified, docs, author confidence high):** Docs only: a README section and analyzer pages for MsgPack019 to MsgPack022 describe contractless mode, surrogates and limitations. No code behaviour depends on them.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**

**C12 (backed, generated, author confidence high):** Both the int-key and string-key formatter templates (.tt and compiled .cs) emit `partial class` instead of `internal sealed class` when IsUserDeclaredFormatter is true. The generated body therefore merges into the user's class.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed; static check S5 passed)

**C19 (backed, test, author confidence high):** Test ContractlessClassRoundTrips round-trips an ExternalPerson through the generated resolver and checks Id and Label.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L6-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)

**C20 (backed, test, author confidence high):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers checks that the output is a 2-entry fixmap containing Id and Label but not the read-only Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)

**C21 (backed, test, author confidence high):** Test ContractlessClassNullRoundTrips checks that a null ExternalPerson round-trips to null. Test ContractlessStructRoundTrips round-trips an ExternalPoint struct.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-52
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; static check S8 passed)

**C22 (backed, test, author confidence high):** Test SurrogateControlsKeysAndMembership checks that int keys 3 and 7 produce an 8-slot array. It also checks that the IgnoreMember-ed Internal value is not round-tripped.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)

**C23 (backed, test, author confidence high):** Test MessagePackObjectCanContainExternalTypes round-trips a [MessagePackObject] that holds external types. Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts that GeneratedMessagePackResolver returns the user's formatter classes.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L71-95
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)

**C24 (backed, test, author confidence high):** Generator diagnostic tests check each new rule at its expected location: MsgPack019, MsgPack020, MsgPack021 (abstract) and MsgPack022 (missing member and mismatched type). They also check MsgPack005 for mixed surrogate keys. The formatter members are hand-written so the test source compiles when generation is declined.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **static check** (test `FormatterMustBePartial` blocked by the machine (not evidence either way); test `FormatterMustImplementFormatterOfT` blocked by the machine (not evidence either way); test `FormattedTypeMustNotBeAbstract` blocked by the machine (not evidence either way); test `SurrogateMemberMustMatchFormattedType` blocked by the machine (not evidence either way); test `SurrogateMemberMustHaveMatchingType` blocked by the machine (not evidence either way); test `SurrogateKeysMustNotMixStringAndInt` blocked by the machine (not evidence either way); static check S8 passed)

**C25 (backed, scope, author confidence high):** MapModeExecutionTests now excludes the new GeneratedFormatterForExternalTypes*.cs files, because that project does not reference ExternalTypes. The feature is therefore not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **static check** (static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 4 of its 14 sentences.
Requirement sentences no claim quotes (10; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…

## 5. Findings (13)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter class, not its containing types. The MsgPack019 doc (line 26) says nesting types must also be partial. A formatter nested in a non-partial class passes the check, and the generated `partial class Outer` wrapper then fails with a raw compiler error instead of MsgPack019. | author (Claude) |
| F2 | medium | `GeneratedFormatterCollector.cs` L171 | Every surrogate instance member without `[IgnoreMember]` must carry a `[Key]`, including private fields and members inherited from surrogate base types. Missing keys raise MemberNeedsKey and abort generation. The attribute XML doc says only `[Key]`-carrying members are matched, and the README says only the members the surrogate lists are serialized. Both suggest unkeyed members are simply ignored. | author (Claude) |
| F3 | medium | `MessagePack.SourceGenerator.ExternalTypes.csproj` L9 | The new project targets only net8.0, yet ExecutionTests references it. If ExecutionTests multi-targets an older framework such as net472 or net6.0, the ProjectReference cannot be resolved for that target and the build breaks. | author (Claude) |
| F4 | low | `GeneratorUtilities.cs` L38 | Attributed formatters are removed from the custom-formatter list. Other generator checks that use this list to decide whether a member type such as ExternalPerson is formattable may then treat it as unknown. Only one execution test (MessagePackObjectCanContainExternalTypes) covers this, and no diagnostic test does. | author (Claude) |
| F5 | low | `MessagePackGenerator.cs` L31 | The predicate accepts only ClassDeclarationSyntax, while the attribute's AttributeTargets.Class also allows `record` classes. A `partial record` marked with the attribute is silently ignored, with no diagnostic and no generated formatter. | author (Claude) |
| F6 | low | `MessagePackGenerator.cs` L117 | The diagnostics pipeline combines symbol-holding requests with CompilationProvider. Collect then runs twice per formatter on every compilation change. Holding symbols and Locations in the incremental pipeline defeats caching. Existing pipelines also hold symbols, so this is an IDE performance risk rather than a correctness bug. | author (Claude) |
| F7 | low | `GeneratedMessagePackFormatterTests.cs` L63 | Several paths have no test: the body-less `partial class X : IMessagePackFormatter<T>;` form the issue explicitly mentions, duplicate surrogate keys, unkeyed surrogate members, NoDeserializingConstructor, and generic, inaccessible or enum data types. | author (Claude) |
| F8 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F9 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F10 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F11 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F12 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F13 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: The `SurrogateType` property and the surrogate mechanism are a design the agent chose. It is none of the three alternatives the issue lists.
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs`: Declared as a public record in the source generator assembly, where internal would suffice.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes the new tests from map-mode execution, so the feature is not covered there.

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
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 169 blocked by the machine, 0 skipped (988s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: 169 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- 169 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too (GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance').
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

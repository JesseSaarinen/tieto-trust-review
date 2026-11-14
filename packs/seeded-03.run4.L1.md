# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `d845a90daf81` (seeded-03.run4.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 617 of 884 changed code lines (70%).** Docs: 159 lines, read with the story. Of everything changed: 59%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 4 refusal(s) on contracts/honesty grounds need a human look.
- 10 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 267 of 884 changed code lines off the list (C7, C8, C9, C17, C18, C27, C28, C29, C30, C31, C32, C33: tests found passing in the real run; breaker removed for this measurement). 617 stay with the owner.
- Why lines stay: 214 claim rests on AI reading only; 213 cited only by claims without a passing test; 161 refused; 26 no claim covers the line; 3 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353 (36 of 46 changed lines): R3 contracts (AI-suggested); no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L52, L62, L75-292, L300 (264 of 300 changed lines): claim C16 only AI-read; no claim covers these lines; claim C10 only AI-read; claim C11 only AI-read; claim C12 only AI-read; claim C5 only AI-read; R4 contracts (AI-suggested); F1 author (Claude); R5 honesty (AI-suggested); F2 author (Claude); claim C15 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read; R6 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): claim C5 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C6 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; no claim covers these lines; claim C3 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C19 has no passing test behind it; F7 test run; F9 test run; F11 test run; F12 test run; F8 test run; F10 test run; no claim covers these lines; C25 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C19 has no passing test behind it; C20 has no passing test behind it; no claim covers these lines; C21 has no passing test behind it; C22 has no passing test behind it; C23 has no passing test behind it; C24 has no passing test behind it; C25 has no passing test behind it; C26 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C19 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C34 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L27, L55, L76, L103, L137, L171 (6 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 267 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C18, C7, C8, C9, C17, C27, C28, C29, C30, C31, C32, C33

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `5d44e9f391ca` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (6)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new user-visible Error analyzer rules MsgPack019–MsgPack022. | New analyzer rule IDs and severities become a user-visible contract (S4 fails). | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | Contractless mode defines a new serialized shape for external types: a string-keyed map of public read-write members sorted ordinally. That shape is currently broken by an off-by-one. | This defines the wire format users will persist. It must be correct and agreed before release. | `GeneratedFormatterCollector.cs` L128-141 | AI reading |
| R5 | honesty | The surrogate-type key mechanism goes beyond the requirement and is not any of the issue's three proposed alternatives. | This is a design decision beyond what was asked and should be confirmed by the owner or maintainers. | `GeneratedFormatterCollector.cs` L143-213 | AI reading |
| R6 | contracts | GeneratedFormatterRequest is introduced as a public type in the source generator assembly. | Unneeded public surface on the generator package. | `GeneratedFormatterRequest.cs` L13-13 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute, with an optional `SurrogateType` property, to MessagePack.Annotations. The source generator now finds partial classes that carry the attribute and implement `IMessagePackFormatter<T>`, and writes the formatter body into them. By default the formatter is contractless: public read-write members are written under their names as string keys. With a surrogate, keys and membership come from the surrogate's `[Key]` and `[IgnoreMember]` attributes. The formatter is registered in `GeneratedMessagePackResolver`. Four new error diagnostics (MsgPack019–022) cover invalid usage. The change also adds README and analyzer docs, a dependency-free ExternalTypes test project, execution tests and generator diagnostic tests.

**Why:** REQ-2129 asks that Project B can source-generate a formatter for a type that lives in Project A, which cannot reference MessagePack. The requirement suggests a `[GeneratedMessagePackFormatter]` attribute on a partial class that implements `IMessagePackFormatter<T>`.

**Touches beyond the requirement:**
- New public API `GeneratedMessagePackFormatterAttribute.SurrogateType`. This surrogate design is not one of the three options the issue listed for keys and Union.
- Four new user-visible analyzer rules MsgPack019–MsgPack022 plus release notes and docs.
- A public record `GeneratedFormatterRequest` added to the source generator assembly.
- The shared formatter T4 templates now emit `partial class` instead of `internal sealed class` when `IsUserDeclaredFormatter` is set.
- GeneratorUtilities now excludes attributed classes from hand-written formatter discovery.
- The MapModeExecutionTests project now excludes the new test files, so map mode is not exercised for this feature.
- A new non-shipping test project, MessagePack.SourceGenerator.ExternalTypes.

**How sure (the author's own view; it moves nothing):** High confidence that the attribute, the pipeline wiring, the template switch and the four diagnostics behave as described. The diagnostics have focused verifier tests. Low confidence in contractless mode: `CreateContractlessMembers` loops to `targets.Count - 1`, so the last member in name order (e.g. `Label`, `Y`) is never serialized. Several execution tests should therefore fail in the real run. Surrogate mode looks correct for the tested int-key case; the string-key, missing-key and duplicate-key paths are untested.

## 4. Claims (35)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | Adds the public attribute `MessagePack.GeneratedMessagePackFormatterAttribute`. It targets classes only and has a nullable `Type? SurrogateType` property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator discovers classes marked with the attribute via ForAttributeWithMetadataName. It reads the optional SurrogateType named argument into a GeneratedFormatterRequest. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C3 | unverified | The generated-formatter requests are combined into the existing model pipeline. Each successfully collected model is added to `modelPerType`, so the formatter is emitted and registered in the generated resolver. The existing tuple indexing is shifted to account for the extra Combine. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C5 | unverified | `ObjectSerializationInfo` gains an `IsUserDeclaredFormatter` flag that is included in value equality. The collector sets it to true and points `Formatter` at the user's class. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C6 | unverified | Classes marked with the attribute are skipped by the hand-written custom formatter discovery. This prevents them from being registered twice. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C10 | unverified | A class data type with no accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. | (scope) | AI reading only | - | no |
| C11 | unverified | Contractless mode is intended to serialize every public read-write instance property and field, including those of base types (most-derived wins, indexers excluded), under its name as a string key, sorted ordinally. As written, the loop stops at `targets.Count - 1` and drops the last member. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C12 | unverified | Surrogate mode skips `[IgnoreMember]` surrogate members. Each remaining member is mapped to the same-named public read-write member of T, keyed by the surrogate's integer or string `[Key]`. The formatter is int-keyed when the keys are integers. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C15 | unverified | A surrogate member that has no `[Key]` and no `[IgnoreMember]` reports MemberNeedsKey. A duplicate key reports KeysMustBeUnique. | (scope) | AI reading only | - | no |
| C16 | unverified | Member descriptors are built as readable and writable, with init-only and required flags and fully qualified type names. Callback-receiver detection is wired into the model. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C35 | unverified | README gains a section on formatters for types from other assemblies, including the surrogate and its limitations. Docs and an index entry are added for MsgPack019–022. | (scope) | AI reading only | - | no |
| C4 | backed | When `IsUserDeclaredFormatter` is true, both the int-key and the string-key formatter templates emit `partial class <Formatter>` instead of `internal sealed class`. The generated body therefore merges into the user's partial declaration. The .tt files and their compiled .cs counterparts are changed consistently. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C7 | backed | A marked class that is not declared partial gets MsgPack019 on its identifier, and no model is produced. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C8 | backed | A marked class that does not implement exactly one `IMessagePackFormatter<T>` gets MsgPack020. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C9 | backed | MsgPack021 is reported when the data type T is generic, abstract, not a class or struct, or not accessible from the formatter. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | test run | - | yes |
| C13 | backed | A keyed surrogate member with no same-named, same-typed public read-write member on T gets MsgPack022. | (scope) | test run | - | yes |
| C14 | backed | Mixing int and string keys in a surrogate reports the existing MsgPack005 on the first member whose key kind differs. | (scope) | test run | - | yes |
| C17 | backed | Diagnostics for marked formatters are produced by a separate incremental pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. | (scope) | test run | - | yes |
| C18 | backed | Four new Error-severity descriptors, MsgPack019–022, are declared, added to SupportedDiagnostics and listed in the unshipped analyzer release notes. | (scope) | test run | - | yes |
| C19 | backed | The execution tests use a new ExternalTypes project with no MessagePack reference, modelling Project A. The consuming test project declares body-less partial formatters for its types. | "because the latter has no (and cannot have) reference to MessagePack nuget package." | static check | - | no |
| C20 | backed | Test ContractlessClassRoundTrips round-trips ExternalPerson and checks both Id and Label. It should fail against the off-by-one in CreateContractlessMembers. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C21 | backed | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a two-entry map with Id and Label and no read-only Doubled. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C22 | backed | Test ContractlessClassNullRoundTrips checks that a null class value round-trips as null. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C23 | backed | Test ContractlessStructRoundTrips round-trips the ExternalPoint struct and checks X and Y. The Y assertion should fail against the off-by-one. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C24 | backed | Test SurrogateControlsKeysAndMembership checks an 8-slot array for keys 3 and 7, round-trips Id and Name, and confirms the ignored Internal is not serialized. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | static check | - | no |
| C25 | backed | Test MessagePackObjectCanContainExternalTypes serializes a [MessagePackObject] that holds both external types through the resolver. It checks Person.Label, which should fail against the off-by-one. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C26 | backed | Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts the resolver returns the user-declared formatter types for each external type. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | static check | - | no |
| C27 | backed | The generator diagnostic tests share hand-written Serialize/Deserialize members so the test source compiles when generation is declined. Each test then verifies one diagnostic id and location. | (scope) | test run | - | yes |
| C28 | backed | Test FormatterMustBePartial verifies MsgPack019 on a non-partial marked class. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C29 | backed | Test FormatterMustImplementFormatterOfT verifies MsgPack020. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C30 | backed | Test FormattedTypeMustNotBeAbstract verifies MsgPack021 for an abstract data type. | (scope) | test run | - | yes |
| C31 | backed | Test SurrogateMemberMustMatchFormattedType verifies MsgPack022 for a surrogate member name that does not exist on T. | (scope) | test run | - | yes |
| C32 | backed | Test SurrogateMemberMustHaveMatchingType verifies MsgPack022 when the surrogate member's type differs from T's member type. | (scope) | test run | - | yes |
| C33 | backed | Test SurrogateKeysMustNotMixStringAndInt verifies MsgPack005 on the string-keyed member. | (scope) | test run | - | yes |
| C34 | backed | The MapModeExecutionTests project now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. The feature is therefore not tested in force-map mode. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** Adds the public attribute `MessagePack.GeneratedMessagePackFormatterAttribute`. It targets classes only and has a nullable `Type? SurrogateType` property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C2 (unverified, behavior, author confidence high):** The generator discovers classes marked with the attribute via ForAttributeWithMetadataName. It reads the optional SurrogateType named argument into a GeneratedFormatterRequest.
- Lines: `MessagePackGenerator.cs` L29-34, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C3 (unverified, behavior, author confidence medium):** The generated-formatter requests are combined into the existing model pipeline. Each successfully collected model is added to `modelPerType`, so the formatter is emitted and registered in the generated resolver. The existing tuple indexing is shifted to account for the extra Combine.
- Lines: `MessagePackGenerator.cs` L36-37, `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C5 (unverified, behavior, author confidence high):** `ObjectSerializationInfo` gains an `IsUserDeclaredFormatter` flag that is included in value equality. The collector sets it to true and points `Formatter` at the user's class.
- Lines: `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L104-126
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C6 (unverified, behavior, author confidence medium):** Classes marked with the attribute are skipped by the hand-written custom formatter discovery. This prevents them from being registered twice.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C10 (unverified, behavior, author confidence low):** A class data type with no accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**

**C11 (unverified, behavior, author confidence low):** Contractless mode is intended to serialize every public read-write instance property and field, including those of base types (most-derived wins, indexers excluded), under its name as a string key, sorted ordinally. As written, the loop stops at `targets.Count - 1` and drops the last member.
- Lines: `GeneratedFormatterCollector.cs` L87-93, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)

**C12 (unverified, behavior, author confidence medium):** Surrogate mode skips `[IgnoreMember]` surrogate members. Each remaining member is mapped to the same-named public read-write member of T, keyed by the surrogate's integer or string `[Key]`. The formatter is int-keyed when the keys are integers.
- Lines: `GeneratedFormatterCollector.cs` L94-102, `GeneratedFormatterCollector.cs` L143-168, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C15 (unverified, behavior, author confidence low):** A surrogate member that has no `[Key]` and no `[IgnoreMember]` reports MemberNeedsKey. A duplicate key reports KeysMustBeUnique.
- Lines: `GeneratedFormatterCollector.cs` L169-180, `GeneratedFormatterCollector.cs` L199-205
- Checked by: **AI reading only**

**C16 (unverified, behavior, author confidence medium):** Member descriptors are built as readable and writable, with init-only and required flags and fully qualified type names. Callback-receiver detection is wired into the model.
- Lines: `GeneratedFormatterCollector.cs` L1-43, `GeneratedFormatterCollector.cs` L82-86, `GeneratedFormatterCollector.cs` L214-245, `GeneratedFormatterCollector.cs` L285-292
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C35 (unverified, docs, author confidence high):** README gains a section on formatters for types from other assemblies, including the surrogate and its limitations. Docs and an index entry are added for MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**

**C4 (backed, behavior, author confidence high):** When `IsUserDeclaredFormatter` is true, both the int-key and the string-key formatter templates emit `partial class <Formatter>` instead of `internal sealed class`. The generated body therefore merges into the user's partial declaration. The .tt files and their compiled .cs counterparts are changed consistently.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S1 passed)

**C7 (backed, behavior, author confidence high):** A marked class that is not declared partial gets MsgPack019 on its identifier, and no model is produced.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))

**C8 (backed, behavior, author confidence high):** A marked class that does not implement exactly one `IMessagePackFormatter<T>` gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))

**C9 (backed, behavior, author confidence medium):** MsgPack021 is reported when the data type T is generic, abstract, not a class or struct, or not accessible from the formatter.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))

**C13 (backed, behavior, author confidence high):** A keyed surrogate member with no same-named, same-typed public read-write member on T gets MsgPack022.
- Lines: `GeneratedFormatterCollector.cs` L189-198
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))

**C14 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate reports the existing MsgPack005 on the first member whose key kind differs.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C17 (backed, behavior, author confidence high):** Diagnostics for marked formatters are produced by a separate incremental pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C18 (backed, scope, author confidence high):** Four new Error-severity descriptors, MsgPack019–022, are declared, added to SupportedDiagnostics and listed in the unshipped analyzer release notes.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-352, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C19 (backed, test, author confidence high):** The execution tests use a new ExternalTypes project with no MessagePack reference, modelling Project A. The consuming test project declares body-less partial formatters for its types.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-37, `GeneratedFormatterForExternalTypesTests.cs` L1-10
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)

**C20 (backed, test, author confidence low):** Test ContractlessClassRoundTrips round-trips ExternalPerson and checks both Id and Label. It should fail against the off-by-one in CreateContractlessMembers.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L11-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)

**C21 (backed, test, author confidence low):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a two-entry map with Id and Label and no read-only Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)

**C22 (backed, test, author confidence medium):** Test ContractlessClassNullRoundTrips checks that a null class value round-trips as null.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-41
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; static check S8 passed)

**C23 (backed, test, author confidence low):** Test ContractlessStructRoundTrips round-trips the ExternalPoint struct and checks X and Y. The Y assertion should fail against the off-by-one.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L43-52
- Checked by: **static check** (named test `ContractlessStructRoundTrips` not found in the test run; static check S8 passed)

**C24 (backed, test, author confidence medium):** Test SurrogateControlsKeysAndMembership checks an 8-slot array for keys 3 and 7, round-trips Id and Name, and confirms the ignored Internal is not serialized.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)

**C25 (backed, test, author confidence low):** Test MessagePackObjectCanContainExternalTypes serializes a [MessagePackObject] that holds both external types through the resolver. It checks Person.Label, which should fail against the off-by-one.
- Lines: `GeneratedFormatterForExternalTypes.cs` L39-50, `GeneratedFormatterForExternalTypesTests.cs` L71-86
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; static check S8 passed)

**C26 (backed, test, author confidence high):** Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts the resolver returns the user-declared formatter types for each external type.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L88-95
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)

**C27 (backed, test, author confidence high):** The generator diagnostic tests share hand-written Serialize/Deserialize members so the test source compiles when generation is declined. Each test then verifies one diagnostic id and location.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-26
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C28 (backed, test, author confidence high):** Test FormatterMustBePartial verifies MsgPack019 on a non-partial marked class.
- Lines: `GeneratedMessagePackFormatterTests.cs` L28-54
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))

**C29 (backed, test, author confidence high):** Test FormatterMustImplementFormatterOfT verifies MsgPack020.
- Lines: `GeneratedMessagePackFormatterTests.cs` L56-75
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))

**C30 (backed, test, author confidence high):** Test FormattedTypeMustNotBeAbstract verifies MsgPack021 for an abstract data type.
- Lines: `GeneratedMessagePackFormatterTests.cs` L77-102
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))

**C31 (backed, test, author confidence high):** Test SurrogateMemberMustMatchFormattedType verifies MsgPack022 for a surrogate member name that does not exist on T.
- Lines: `GeneratedMessagePackFormatterTests.cs` L104-136
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C32 (backed, test, author confidence high):** Test SurrogateMemberMustHaveMatchingType verifies MsgPack022 when the surrogate member's type differs from T's member type.
- Lines: `GeneratedMessagePackFormatterTests.cs` L138-170
- Checked by: **test run** (test `SurrogateMemberMustHaveMatchingType` passed (1 case))

**C33 (backed, test, author confidence high):** Test SurrogateKeysMustNotMixStringAndInt verifies MsgPack005 on the string-keyed member.
- Lines: `GeneratedMessagePackFormatterTests.cs` L172-210
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C34 (backed, scope, author confidence high):** The MapModeExecutionTests project now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. The feature is therefore not tested in force-map mode.
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

## 5. Findings (12)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: the loop runs `i < targets.Count - 1`, so contractless mode silently drops the last member in ordinal name order. Examples: ExternalPerson.Label, ExternalPoint.Y. A type with a single member serializes nothing. Data is lost on round-trip, and ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers, ContractlessStructRoundTrips and MessagePackObjectCanConta | author (Claude) |
| F2 | medium | `GeneratedFormatterCollector.cs` L161 | Surrogate members are enumerated without an accessibility filter. A private or non-public field or property on the surrogate that has no [Key] or [IgnoreMember] triggers MemberNeedsKey and blocks generation. | author (Claude) |
| F3 | low | `MessagePackGenerator.cs` L32 | GeneratedFormatterRequest holds INamedTypeSymbol values in the incremental pipeline. Symbols do not compare equal across compilations, which defeats incremental caching and keeps compilations alive. The collector also runs twice per formatter (model pipeline and diagnostic pipeline). | author (Claude) |
| F4 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with only a location and no message arguments. If the existing descriptor's message has placeholders, the reported message will be malformed. This path is untested. | author (Claude) |
| F5 | low | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter itself. MsgPack019.md says nesting types must be partial too, but a non-partial containing type is not diagnosed and will produce a raw compiler error in generated code. | author (Claude) |
| F6 | low | `GeneratedFormatterCollector.cs` L77 | The formatted type is created with `new T()`. `required` members of T that are not serialized (excluded by the surrogate) would make the generated code fail to compile, and this case is not diagnosed. | author (Claude) |
| F7 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F8 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F9 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F10 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F11 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F12 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: The SurrogateType property and the whole surrogate mechanism are a design the issue did not propose. The issue listed DataMember, user-defined attribute copies, or source-generated attributes.
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs`: Declared as a public record in the generator assembly although it is only used internally.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes the new execution tests from map-mode runs.

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
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too (GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance').
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

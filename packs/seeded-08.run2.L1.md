# Evidence pack: REQ-2129 on `seeded-08`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `538bd1802f66` (seeded-08.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 795 of 884 changed code lines (90%).** Docs: 159 lines, read with the story. Of everything changed: 76%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 11 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 89 of 884 changed code lines off the list (C8, C9, C10, C13, C17, C22: tests found passing in the real run; breaker removed for this measurement). 795 stay with the owner.
- Why lines stay: 253 no claim covers the line; 203 claim rests on AI reading only; 170 cited only by claims without a passing test; 164 refused; 5 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353 (36 of 46 changed lines): R3 contracts (AI-suggested); no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L52, L62, L75-292, L300 (264 of 300 changed lines): claim C15 only AI-read; no claim covers these lines; claim C7 only AI-read; claim C16 only AI-read; claim C6 only AI-read; claim C11 only AI-read; claim C5 only AI-read; R4 contracts (AI-suggested); claim C14 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C18 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; F1 author (Claude); claim C3 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C19 has no passing test behind it; F10 test run; F11 test run; F12 test run; F13 test run; F8 test run; F9 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C19 has no passing test behind it; no claim covers these lines; C21 has no passing test behind it; C20 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C19 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C19 has no passing test behind it; F6 author (Claude)
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): R5 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L27-210 (184 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 89 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C8, C9, C10, C13, C17, C22

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `14cafaa25f` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (116s) |
| Pack id | `ec8073ed2329` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (5)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | New user-visible analyzer rules MsgPack019–022 at Error severity. | New analyzer rule ids and severities are user-visible contracts (S4 fails). | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | The default wire contract for generated formatters is contractless string keys ordered by name, and surrogate int keys define the array layout. | This chooses the serialized format users will persist; it is a design decision the maintainers should make. | `GeneratedFormatterCollector.cs` L128-213 | AI reading |
| R5 | honesty | The new execution tests are excluded from the MapMode test project. | This drops test coverage for one configuration rather than making the tests run there. | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute (with an optional `SurrogateType` property) to MessagePack.Annotations. The source generator now finds partial classes carrying the attribute that implement exactly one `IMessagePackFormatter<T>`, and writes the formatter body into them. They are registered in `GeneratedMessagePackResolver`. With no surrogate, the type is serialized in contractless mode: public read-write members, string keys, ordered by name. With a surrogate, the surrogate type's `[Key]`/`[IgnoreMember]` attributes define the contract. Four new error diagnostics are added (MsgPack019–022), plus docs, a dependency-free test assembly, and execution and diagnostic tests.

**Why:** REQ-2129 asks for a formatter for a type in a referenced assembly (Project A, which has no MessagePack reference) to be generated inside the consuming project (Project B) via an attribute on a partial formatter class.

**Touches beyond the requirement:**
- New public API in a shipped assembly: `GeneratedMessagePackFormatterAttribute` with a `SurrogateType` property (static check S3 fails).
- Four new user-visible analyzer rules, MsgPack019–MsgPack022, all Error severity (static check S4 fails).
- A surrogate-type design for keys that is not one of the three alternatives listed in the issue.
- Contractless string-key serialization chosen as the default wire contract for these formatters.
- Both formatter T4 templates changed to emit `partial class` for user-declared formatters.
- The custom-formatter discovery in GeneratorUtilities now skips attributed classes.
- The MapMode execution test project excludes the new test files, so map mode is not exercised.
- A new test project, MessagePack.SourceGenerator.ExternalTypes, targeting net8.0 only.

**How sure (the author's own view; it moves nothing):** High confidence in the happy path. Execution tests show contractless class/struct round-trips, the surrogate int-key layout, use inside a `[MessagePackObject]` type, and resolver registration. Diagnostic tests cover MsgPack019, 020, 021 (abstract only), 022 (name and type mismatch) and the MsgPack005 key mix. Untested paths: the missing-constructor diagnostic, generic or inaccessible data types, duplicate surrogate keys, surrogate string keys, the callback receiver, and map mode. The incremental pipeline carries Roslyn symbols in its values, which is a performance and correctness risk.

## 4. Claims (24)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | A public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with a nullable `Type SurrogateType` property is added to MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator discovers classes marked with the attribute via ForAttributeWithMetadataName and reads the optional SurrogateType named argument into a GeneratedFormatterRequest. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C3 | unverified | The combined pipeline adds the collected formatter requests, re-indexes the existing tuple accesses, and adds each successfully collected model to the per-type models. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C5 | unverified | The collector builds an ObjectSerializationInfo for the data type whose Formatter is the user's class with IsUserDeclaredFormatter=true, so the generated resolver returns the user's formatter type. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C6 | unverified | With no surrogate, every public read-write instance property and field (including inherited ones; statics, indexers and implicit members excluded) is serialized under its name as a string key, ordered by name. Read-only members are skipped. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C7 | unverified | Class data types require an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is reported. Structs skip this check. | (scope) | AI reading only | - | no |
| C11 | unverified | In surrogate mode, `[IgnoreMember]` surrogate members are skipped, every other surrogate member must carry an int or string `[Key]` (else MsgPack004-style MemberNeedsKey), and the resulting int keys are used directly in the array layout. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C14 | unverified | Duplicate surrogate keys report the existing KeysMustBeUnique diagnostic. This path is untested. | (scope) | AI reading only | - | no |
| C15 | unverified | CreateMember maps a target property or field to a MemberSerializationInfo: read/write true, init-only and required flags taken from the symbol, fully qualified type name. | (scope) | AI reading only | - | no |
| C16 | unverified | IMessagePackSerializationCallbackReceiver detection on the data type sets the callback flags. This path is untested. | (scope) | AI reading only | - | no |
| C18 | unverified | Classes with the attribute are excluded from hand-written custom-formatter discovery, so they are registered only once, as generated object formatters. | (scope) | AI reading only | - | no |
| C23 | unverified | Scope: four new Error-severity analyzer rules are published in the release notes and documented. The MapMode test project excludes the new execution test files. | (scope) | AI reading only | - | no |
| C24 | unverified | The README and per-rule analyzer docs describe the attribute, contractless default, surrogate mode, limitations and MsgPack019–022. | (scope) | AI reading only | - | no |
| C4 | backed | For user-declared formatters, both the int-key and string-key templates emit `partial class <Name>` instead of `internal sealed class`, driven by the new `IsUserDeclaredFormatter` flag. The flag is included in record equality. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C8 | backed | A non-partial attributed class gets MsgPack019 and no generated code. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | test run | - | yes |
| C9 | backed | An attributed class that does not implement exactly one IMessagePackFormatter<T> gets MsgPack020. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | test run | - | yes |
| C10 | backed | Data types that are generic, abstract, not a class or struct, or inaccessible from the formatter get MsgPack021. Only the abstract case is tested. | (scope) | test run | - | yes |
| C12 | backed | Mixing int and string keys in a surrogate reports the existing MsgPack005 at the offending member. | (scope) | test run | - | yes |
| C13 | backed | A keyed surrogate member with no public read-write member of the same name and identical type on the data type gets MsgPack022. | (scope) | test run | - | yes |
| C17 | backed | Diagnostics for attributed formatters are reported through a separate generator pipeline that re-runs the collector with a diagnostic sink. The new descriptors are added to the analyzer's SupportedDiagnostics, but the analyzer itself never reports them. | (scope) | test run | - | yes |
| C19 | backed | The execution tests use a separate ExternalTypes assembly with no MessagePack reference, matching the issue's Project A/Project B setup. Formatters for its types round-trip from the consuming test assembly. | "Project A is really a library (Nuget package), and I really want to keep it minimal. It cu…" | static check | - | no |
| C20 | backed | MessagePackObjectCanContainExternalTypes shows that a `[MessagePackObject]` type with members of external types round-trips through the composite resolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C21 | backed | ContractlessClassNullRoundTrips checks that a null reference serializes and deserializes back to null. | (scope) | static check | - | no |
| C22 | backed | The diagnostic tests hand-write the Serialize/Deserialize members so that test sources compile when the generator declines to generate. | (scope) | test run | - | yes |

**C1 (unverified, behavior, author confidence high):** A public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with a nullable `Type SurrogateType` property is added to MessagePack.Annotations.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C2 (unverified, behavior, author confidence high):** The generator discovers classes marked with the attribute via ForAttributeWithMetadataName and reads the optional SurrogateType named argument into a GeneratedFormatterRequest.
- Lines: `MessagePackGenerator.cs` L29-35, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C3 (unverified, behavior, author confidence high):** The combined pipeline adds the collected formatter requests, re-indexes the existing tuple accesses, and adds each successfully collected model to the per-type models.
- Lines: `MessagePackGenerator.cs` L36-37, `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run)

**C5 (unverified, behavior, author confidence high):** The collector builds an ObjectSerializationInfo for the data type whose Formatter is the user's class with IsUserDeclaredFormatter=true, so the generated resolver returns the user's formatter type.
- Lines: `GeneratedFormatterCollector.cs` L104-126
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C6 (unverified, behavior, author confidence high):** With no surrogate, every public read-write instance property and field (including inherited ones; statics, indexers and implicit members excluded) is serialized under its name as a string key, ordered by name. Read-only members are skipped.
- Lines: `GeneratedFormatterCollector.cs` L87-93, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)

**C7 (unverified, behavior, author confidence medium):** Class data types require an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is reported. Structs skip this check.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only** (named test `ContractlessStructRoundTrips` not found in the test run)

**C11 (unverified, behavior, author confidence high):** In surrogate mode, `[IgnoreMember]` surrogate members are skipped, every other surrogate member must carry an int or string `[Key]` (else MsgPack004-style MemberNeedsKey), and the resulting int keys are used directly in the array layout.
- Lines: `GeneratedFormatterCollector.cs` L94-102, `GeneratedFormatterCollector.cs` L143-179, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C14 (unverified, behavior, author confidence low):** Duplicate surrogate keys report the existing KeysMustBeUnique diagnostic. This path is untested.
- Lines: `GeneratedFormatterCollector.cs` L200-204
- Checked by: **AI reading only**

**C15 (unverified, behavior, author confidence medium):** CreateMember maps a target property or field to a MemberSerializationInfo: read/write true, init-only and required flags taken from the symbol, fully qualified type name.
- Lines: `GeneratedFormatterCollector.cs` L215-244, `GeneratedFormatterCollector.cs` L286-291, `GeneratedFormatterCollector.cs` L1-43
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C16 (unverified, behavior, author confidence low):** IMessagePackSerializationCallbackReceiver detection on the data type sets the callback flags. This path is untested.
- Lines: `GeneratedFormatterCollector.cs` L83-85
- Checked by: **AI reading only**

**C18 (unverified, behavior, author confidence medium):** Classes with the attribute are excluded from hand-written custom-formatter discovery, so they are registered only once, as generated object formatters.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C23 (unverified, scope, author confidence high):** Scope: four new Error-severity analyzer rules are published in the release notes and documented. The MapMode test project excludes the new execution test files.
- Lines: `AnalyzerReleases.Unshipped.md` L26-29, `index.md` L26-29, `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **AI reading only**

**C24 (unverified, docs, author confidence high):** The README and per-rule analyzer docs describe the attribute, contractless default, surrogate mode, limitations and MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31
- Checked by: **AI reading only**

**C4 (backed, behavior, author confidence high):** For user-declared formatters, both the int-key and string-key templates emit `partial class <Name>` instead of `internal sealed class`, driven by the new `IsUserDeclaredFormatter` flag. The flag is included in record equality.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed)

**C8 (backed, behavior, author confidence high):** A non-partial attributed class gets MsgPack019 and no generated code.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299, `MsgPack00xMessagePackAnalyzer.cs` L32-32, `MsgPack00xMessagePackAnalyzer.cs` L318-325
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))

**C9 (backed, behavior, author confidence high):** An attributed class that does not implement exactly one IMessagePackFormatter<T> gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61, `MsgPack00xMessagePackAnalyzer.cs` L33-33, `MsgPack00xMessagePackAnalyzer.cs` L327-334
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))

**C10 (backed, behavior, author confidence medium):** Data types that are generic, abstract, not a class or struct, or inaccessible from the formatter get MsgPack021. Only the abstract case is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74, `MsgPack00xMessagePackAnalyzer.cs` L34-34, `MsgPack00xMessagePackAnalyzer.cs` L336-343
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))

**C12 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate reports the existing MsgPack005 at the offending member.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C13 (backed, behavior, author confidence high):** A keyed surrogate member with no public read-write member of the same name and identical type on the data type gets MsgPack022.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `MsgPack00xMessagePackAnalyzer.cs` L35-35, `MsgPack00xMessagePackAnalyzer.cs` L345-352
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))

**C17 (backed, behavior, author confidence medium):** Diagnostics for attributed formatters are reported through a separate generator pipeline that re-runs the collector with a diagnostic sink. The new descriptors are added to the analyzer's SupportedDiagnostics, but the analyzer itself never reports them.
- Lines: `MessagePackGenerator.cs` L115-131, `MsgPack00xMessagePackAnalyzer.cs` L381-385
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C19 (backed, test, author confidence high):** The execution tests use a separate ExternalTypes assembly with no MessagePack reference, matching the issue's Project A/Project B setup. Formatters for its types round-trip from the consuming test assembly.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50, `GeneratedFormatterForExternalTypesTests.cs` L1-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)

**C20 (backed, test, author confidence high):** MessagePackObjectCanContainExternalTypes shows that a `[MessagePackObject]` type with members of external types round-trips through the composite resolver.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L71-86
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; static check S8 passed)

**C21 (backed, test, author confidence high):** ContractlessClassNullRoundTrips checks that a null reference serializes and deserializes back to null.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-41
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; static check S8 passed)

**C22 (backed, test, author confidence high):** The diagnostic tests hand-write the Serialize/Deserialize members so that test sources compile when the generator declines to generate.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-26
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); static check S8 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 5 of its 14 sentences.
Requirement sentences no claim quotes (9; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…

## 5. Findings (13)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `MessagePackGenerator.cs` L32 | GeneratedFormatterRequest holds INamedTypeSymbol values in an incremental pipeline. Symbols are not equatable across compilations, so the pipeline re-runs on every edit and keeps old compilations alive. The full collector also runs twice: once for the model and once for diagnostics at line 125. | author (Claude) |
| F2 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate members come from GetInstanceMembers, which includes private and read-only fields and properties of the surrogate. Any explicitly declared private field or computed property on the surrogate without [Key] or [IgnoreMember] fails with MemberNeedsKey. | author (Claude) |
| F3 | low | `GeneratedFormatterCollector.cs` L267 | GetInstanceMembers keeps only the most-derived member of each name, including non-public ones. A private member in a derived class hides a public read-write base member of the same name, which is then silently not serialized in contractless mode. | author (Claude) |
| F4 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with no message arguments. If the existing descriptor's messageFormat has placeholders, the message is malformed. This path has no test. | author (Claude) |
| F5 | low | `MessagePackGenerator.cs` L34 | If SurrogateType is set to a non-named type, such as an array, `as INamedTypeSymbol` yields null. The formatter then silently falls back to contractless mode with no diagnostic. | author (Claude) |
| F6 | medium | `MessagePack.SourceGenerator.ExternalTypes.csproj` L9 | The ExternalTypes project targets only net8.0. If ExecutionTests multi-targets, for example net472, the ProjectReference fails for the other target frameworks. No solution-file change is visible in the diff. | author (Claude) |
| F7 | low | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L14 | The new execution tests are excluded from the map-mode project. How generated user formatters behave under force map mode is therefore never exercised. | author (Claude) |
| F8 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F9 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F10 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F11 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F12 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F13 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: The SurrogateType property and surrogate-based key mapping are a design not proposed in the issue's three alternatives.
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md`: Four new analyzer rules, MsgPack019–022.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: The exclusion pattern for the new test files was changed.

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
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (116s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
- Reviewer part missing or failed: tests: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
- Test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too; the change adds 6 new compile error(s), e.g. GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.
- Test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results.
- Test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too (GeneratedCompositeResolverTests.cs(12,53): error CS0117: 'MyGeneratedCompositeResolver' does not contain a definition for 'Instance').
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 629 of 884 changed code lines (71%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 76%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 4 refusal(s) on contracts/honesty grounds need a human look.
- 7 claim(s) disputed by the breaker or by the evidence check.
- 7 behaviour claim(s) rest on AI reading only (no passing test).
- 3 high-severity finding(s).
- Evidence took 255 of 884 changed code lines off the list (C7, C8, C9, C17, C27, C28, C29, C30, C31, C32, C33: tests found passing in the real run, claim upheld by the breaker). 629 stay with the owner.
- Why lines stay: 266 claim disputed; 161 refused; 94 cited only by claims without a passing test; 70 claim rests on AI reading only; 26 no claim covers the line; 12 named by a finding.

**The owner must read** (28 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): claim C18 disputed (L26-29); R2 contracts
- `README.md` L1639-1690 (52 of 52 changed lines): claim C35 disputed
- `doc/analyzers/MsgPack019.md` L1-26 (26 of 26 changed lines): claim C35 disputed; F7 breaker (Gemini)
- `doc/analyzers/MsgPack020.md` L1-23 (23 of 23 changed lines): claim C35 disputed
- `doc/analyzers/MsgPack021.md` L1-23 (23 of 23 changed lines): claim C35 disputed
- `doc/analyzers/MsgPack022.md` L1-31 (31 of 31 changed lines): claim C35 disputed
- `doc/analyzers/index.md` L26-29 (4 of 4 changed lines): claim C35 disputed
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L32-35, L318-353, L381-385 (46 of 46 changed lines): claim C18 disputed; R3 contracts (AI-suggested); no claim covers these lines; F4 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L47, L52, L62, L75-293, L300 (266 of 300 changed lines): claim C16 disputed; F3 breaker (Gemini); F15 breaker (Gemini); no claim covers these lines; claim C10 only AI-read; F14 breaker (Gemini); claim C11 disputed; claim C12 disputed; claim C5 only AI-read; R4 contracts (AI-suggested); F1 breaker (Gemini); F8 author (Claude); R5 honesty (AI-suggested); F9 author (Claude); F17 breaker (Gemini); claim C15 only AI-read; F2 breaker (Gemini); F18 breaker (Gemini); F16 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read; R6 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): claim C5 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C6 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; no claim covers these lines; claim C3 only AI-read; F19 breaker (Gemini)
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): claim C19 disputed; F21 test run; F23 test run; F25 test run; F26 test run; F22 test run; F24 test run; F5 breaker (Gemini); no claim covers these lines; C25 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): claim C19 disputed; C20 has no passing test behind it; no claim covers these lines; claim C21 disputed; F6 breaker (Gemini); C22 has no passing test behind it; C23 has no passing test behind it; C24 has no passing test behind it; C25 has no passing test behind it; C26 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): claim C19 disputed; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): claim C19 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): claim C19 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): claim C19 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): claim C19 disputed
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C34 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L27, L55, L76, L103, L137, L171 (6 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 255 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C7, C8, C9, C17, C27, C28, C29, C30, C31, C32, C33

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 32,844 in / 16,852 out, 131 s, $0.47 |
| Breaker model | gemini-4-carbon: 90,118 in / 37,588 out, 399 s, $0.50 |
| Cost and time | $0.97 at list price, 532 s for this pack (tests reused from an earlier run of this commit: 80 s) |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `d845a90daf81` |

## 1. Disputed claims (7)
**C11 (DISPUTED, behavior, author confidence low):** Contractless mode is intended to serialize every public read-write instance property and field, including those of base types (most-derived wins, indexers excluded), under its name as a string key, sorted ordinally. As written, the loop stops at `targets.Count - 1` and drops the last member.
- Lines: `GeneratedFormatterCollector.cs` L87-93, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)
- Breaker: **disputed**: First, the requirement is broken by the off-by-one bug at GeneratedFormatterCollector.cs line 135 ('i < targets.Count - 1'), which drops the last member (and serializes zero members for single-member types), so line 135 cannot leave the human reading list and all three named tests fail. Second, none of the named tests exercise base-type members, member hiding ('most-derived wins'), or indexers. Third, for virtual properties where a derived class overrides only one accessor (e.g. get), GetInstanceMembers (line 263) shadows the base property and IsPublicReadWrite (lines 279-281) sees SetMethod == null because it never inspects OverriddenProperty, falsely dropping public read-write properties.

**C12 (DISPUTED, behavior, author confidence medium):** Surrogate mode skips `[IgnoreMember]` surrogate members. Each remaining member is mapped to the same-named public read-write member of T, keyed by the surrogate's integer or string `[Key]`. The formatter is int-keyed when the keys are integers.
- Lines: `GeneratedFormatterCollector.cs` L94-102, `GeneratedFormatterCollector.cs` L143-168, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: First, the named test SurrogateControlsKeysAndMembership only uses integer keys ([Key(3)] and [Key(7)] in GeneratedFormatterForExternalTypes.cs lines 29-33); string keys on a valid surrogate (GeneratedFormatterCollector.cs line 208) are never tested anywhere. Second, the quoted requirement asks for attribute-based property keys and other settings such as Union, whereas unions and member-level [MessagePackFormatter] attributes (hardcoded to CustomFormatter: null at line 238) are not supported.

**C16 (DISPUTED, behavior, author confidence medium):** Member descriptors are built as readable and writable, with init-only and required flags and fully qualified type names. Callback-receiver detection is wired into the model.
- Lines: `GeneratedFormatterCollector.cs` L1-43, `GeneratedFormatterCollector.cs` L82-86, `GeneratedFormatterCollector.cs` L214-245, `GeneratedFormatterCollector.cs` L285-292
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: First, callback-receiver cast detection at GeneratedFormatterCollector.cs lines 84-85 is broken: in Roslyn C#, when m.ExplicitInterfaceImplementations.Length > 0, m.Name is qualified with the interface name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize' or 'OnAfterDeserialize', and type.GetMembers() also misses base-class implementations, so needsCast is always false and explicit implementations fail to compile. Second, the named test SurrogateControlsKeysAndMembership does not test callback receivers, init-only properties, required members, or fields. Third, citing lines 1-43 over-cites BinaryWriteTypeFormat (lines 19-22) and Collect's header.

**C18 (DISPUTED, scope, author confidence high):** Four new Error-severity descriptors, MsgPack019–022, are declared, added to SupportedDiagnostics and listed in the unshipped analyzer release notes.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-352, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **disputed**: MsgPack00xMessagePackAnalyzer.cs lines 382-385 adds MsgPack019-022 to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics, but MsgPack00xMessagePackAnalyzer.Initialize is unchanged and never analyzes or reports them (only MessagePackGenerator does). Moreover, none of the named tests exercise MsgPack00xMessagePackAnalyzer or its SupportedDiagnostics because GeneratedMessagePackFormatterTests.cs line 6 uses CSharpSourceGeneratorVerifier<MessagePackGenerator>.

**C19 (DISPUTED, test, author confidence high):** The execution tests use a new ExternalTypes project with no MessagePack reference, modelling Project A. The consuming test project declares body-less partial formatters for its types.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-37, `GeneratedFormatterForExternalTypesTests.cs` L1-10
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)
- Breaker: **disputed**: Over-citation: GeneratedFormatterForExternalTypes.cs lines 24-37 defines ExternalWidgetSurrogate with [Key] and [IgnoreMember] attributes, which C19 does not describe at all (and no other claim cites lines 24-37). In addition, two of C19's named tests (ContractlessClassRoundTrips and ContractlessStructRoundTrips) fail at runtime due to the off-by-one in CreateContractlessMembers.

**C21 (DISPUTED, test, author confidence low):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a two-entry map with Id and Label and no read-only Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)
- Breaker: **disputed**: Unlike C20, C23, and C25, C21 fails to note that ContractlessClassUsesStringKeysForPublicReadWriteMembers breaks against the off-by-one at GeneratedFormatterCollector.cs line 135: ExternalPerson serializes as a 1-entry map (0x81) omitting Label, so Assert.Equal(0x82, bytes[0]) at GeneratedFormatterForExternalTypesTests.cs line 29 throws immediately, leaving the Id, Label, and Doubled assertions on lines 31-33 unexecuted and the quoted requirement unmet.

**C35 (DISPUTED, docs, author confidence high):** README gains a section on formatters for types from other assemblies, including the surrogate and its limitations. Docs and an index entry are added for MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **disputed**: The added documentation makes claims contradicted by the implementation: doc/analyzers/MsgPack019.md line 26 states that any nesting types containing the formatter must also be declared partial, whereas GeneratedFormatterCollector.IsPartial (GeneratedFormatterCollector.cs lines 293-299) never checks ContainingType; and README.md line 1655 states that contractless mode serializes every public read-write instance property and field, whereas CreateContractlessMembers (line 135) drops the last member.


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
| C11 | DISPUTED | Contractless mode is intended to serialize every public read-write instance property and field, including those of base types (most-derived wins, indexers excluded), under its name as a string key, sorted ordinally. As written, the loop stops at `targets.Count - 1` and drops the last member. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | disputed | no |
| C12 | DISPUTED | Surrogate mode skips `[IgnoreMember]` surrogate members. Each remaining member is mapped to the same-named public read-write member of T, keyed by the surrogate's integer or string `[Key]`. The formatter is int-keyed when the keys are integers. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | disputed | no |
| C16 | DISPUTED | Member descriptors are built as readable and writable, with init-only and required flags and fully qualified type names. Callback-receiver detection is wired into the model. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | disputed | no |
| C18 | DISPUTED | Four new Error-severity descriptors, MsgPack019–022, are declared, added to SupportedDiagnostics and listed in the unshipped analyzer release notes. | (scope) | test run | disputed | no |
| C19 | DISPUTED | The execution tests use a new ExternalTypes project with no MessagePack reference, modelling Project A. The consuming test project declares body-less partial formatters for its types. | "because the latter has no (and cannot have) reference to MessagePack nuget package." | static check | disputed | no |
| C21 | DISPUTED | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a two-entry map with Id and Label and no read-only Doubled. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | disputed | no |
| C35 | DISPUTED | README gains a section on formatters for types from other assemblies, including the surrogate and its limitations. Docs and an index entry are added for MsgPack019–022. | (scope) | AI reading only | disputed | no |
| C1 | unverified | Adds the public attribute `MessagePack.GeneratedMessagePackFormatterAttribute`. It targets classes only and has a nullable `Type? SurrogateType` property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator discovers classes marked with the attribute via ForAttributeWithMetadataName. It reads the optional SurrogateType named argument into a GeneratedFormatterRequest. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C3 | unverified | The generated-formatter requests are combined into the existing model pipeline. Each successfully collected model is added to `modelPerType`, so the formatter is emitted and registered in the generated resolver. The existing tuple indexing is shifted to account for the extra Combine. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C5 | unverified | `ObjectSerializationInfo` gains an `IsUserDeclaredFormatter` flag that is included in value equality. The collector sets it to true and points `Formatter` at the user's class. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C6 | unverified | Classes marked with the attribute are skipped by the hand-written custom formatter discovery. This prevents them from being registered twice. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C10 | unverified | A class data type with no accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. | (scope) | AI reading only | cannot_tell | no |
| C15 | unverified | A surrogate member that has no `[Key]` and no `[IgnoreMember]` reports MemberNeedsKey. A duplicate key reports KeysMustBeUnique. | (scope) | AI reading only | cannot_tell | no |
| C4 | backed | When `IsUserDeclaredFormatter` is true, both the int-key and the string-key formatter templates emit `partial class <Formatter>` instead of `internal sealed class`. The generated body therefore merges into the user's partial declaration. The .tt files and their compiled .cs counterparts are changed consistently. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | upheld | no |
| C7 | backed | A marked class that is not declared partial gets MsgPack019 on its identifier, and no model is produced. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C8 | backed | A marked class that does not implement exactly one `IMessagePackFormatter<T>` gets MsgPack020. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C9 | backed | MsgPack021 is reported when the data type T is generic, abstract, not a class or struct, or not accessible from the formatter. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | test run | upheld | yes |
| C13 | backed | A keyed surrogate member with no same-named, same-typed public read-write member on T gets MsgPack022. | (scope) | test run | upheld | yes |
| C14 | backed | Mixing int and string keys in a surrogate reports the existing MsgPack005 on the first member whose key kind differs. | (scope) | test run | upheld | yes |
| C17 | backed | Diagnostics for marked formatters are produced by a separate incremental pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. | (scope) | test run | upheld | yes |
| C20 | backed | Test ContractlessClassRoundTrips round-trips ExternalPerson and checks both Id and Label. It should fail against the off-by-one in CreateContractlessMembers. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C22 | backed | Test ContractlessClassNullRoundTrips checks that a null class value round-trips as null. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C23 | backed | Test ContractlessStructRoundTrips round-trips the ExternalPoint struct and checks X and Y. The Y assertion should fail against the off-by-one. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C24 | backed | Test SurrogateControlsKeysAndMembership checks an 8-slot array for keys 3 and 7, round-trips Id and Name, and confirms the ignored Internal is not serialized. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | static check | upheld | no |
| C25 | backed | Test MessagePackObjectCanContainExternalTypes serializes a [MessagePackObject] that holds both external types through the resolver. It checks Person.Label, which should fail against the off-by-one. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C26 | backed | Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts the resolver returns the user-declared formatter types for each external type. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | static check | upheld | no |
| C27 | backed | The generator diagnostic tests share hand-written Serialize/Deserialize members so the test source compiles when generation is declined. Each test then verifies one diagnostic id and location. | (scope) | test run | upheld | yes |
| C28 | backed | Test FormatterMustBePartial verifies MsgPack019 on a non-partial marked class. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C29 | backed | Test FormatterMustImplementFormatterOfT verifies MsgPack020. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C30 | backed | Test FormattedTypeMustNotBeAbstract verifies MsgPack021 for an abstract data type. | (scope) | test run | upheld | yes |
| C31 | backed | Test SurrogateMemberMustMatchFormattedType verifies MsgPack022 for a surrogate member name that does not exist on T. | (scope) | test run | upheld | yes |
| C32 | backed | Test SurrogateMemberMustHaveMatchingType verifies MsgPack022 when the surrogate member's type differs from T's member type. | (scope) | test run | upheld | yes |
| C33 | backed | Test SurrogateKeysMustNotMixStringAndInt verifies MsgPack005 on the string-keyed member. | (scope) | test run | upheld | yes |
| C34 | backed | The MapModeExecutionTests project now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. The feature is therefore not tested in force-map mode. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence high):** Adds the public attribute `MessagePack.GeneratedMessagePackFormatterAttribute`. It targets classes only and has a nullable `Type? SurrogateType` property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.Annotations/Attributes.cs lines 142-177: GeneratedMessagePackFormatterAttribute is public in namespace MessagePack, constrained to AttributeTargets.Class with AllowMultiple = false and Inherited = false, and exposes public Type? SurrogateType { get; set; }.

**C2 (unverified, behavior, author confidence high):** The generator discovers classes marked with the attribute via ForAttributeWithMetadataName. It reads the optional SurrogateType named argument into a GeneratedFormatterRequest.
- Lines: `MessagePackGenerator.cs` L29-34, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 29-34, Constants.cs lines 17-18, and GeneratedFormatterRequest.cs lines 1-13: ForAttributeWithMetadataName filters ClassDeclarationSyntax for MessagePack.GeneratedMessagePackFormatterAttribute and reads the SurrogateType named argument into GeneratedFormatterRequest.

**C3 (unverified, behavior, author confidence medium):** The generated-formatter requests are combined into the existing model pipeline. Each successfully collected model is added to `modelPerType`, so the formatter is emitted and registered in the generated resolver. The existing tuple indexing is shifted to account for the extra Combine.
- Lines: `MessagePackGenerator.cs` L36-37, `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 36-37 and 60-76: generatedFormatters.Collect() is combined onto the tuple, existing Left/Right accesses are shifted by one .Left, and each collected FullModel from GeneratedFormatterCollector.Collect is added to modelPerType.

**C5 (unverified, behavior, author confidence high):** `ObjectSerializationInfo` gains an `IsUserDeclaredFormatter` flag that is included in value equality. The collector sets it to true and points `Formatter` at the user's class.
- Lines: `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L104-126
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked ObjectSerializationInfo.cs lines 13-17 and 168, and GeneratedFormatterCollector.cs lines 104-126: IsUserDeclaredFormatter is declared on ObjectSerializationInfo, compared in Equals, set to true by the collector, and Formatter is overridden with new QualifiedNamedTypeName(formatter).

**C6 (unverified, behavior, author confidence medium):** Classes marked with the attribute are skipped by the hand-written custom formatter discovery. This prevents them from being registered twice.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs lines 35-38: customFormattersInThisCompilation excludes symbols carrying MessagePack.GeneratedMessagePackFormatterAttribute before FormatterDescriptor.TryCreate.

**C10 (unverified, behavior, author confidence low):** A class data type with no accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**
- Breaker: **cannot_tell**: GeneratedFormatterCollector.cs lines 76-81 invokes Diagnostic.Create(MsgPack00xMessagePackAnalyzer.NoDeserializingConstructor, location) with zero message arguments, but NoDeserializingConstructor's DiagnosticDescriptor is outside the diff and no test exercises this branch, so we cannot verify from the diff alone that its messageFormat expects zero placeholders without throwing FormatException.

**C15 (unverified, behavior, author confidence low):** A surrogate member that has no `[Key]` and no `[IgnoreMember]` reports MemberNeedsKey. A duplicate key reports KeysMustBeUnique.
- Lines: `GeneratedFormatterCollector.cs` L169-180, `GeneratedFormatterCollector.cs` L199-205
- Checked by: **AI reading only**
- Breaker: **cannot_tell**: GeneratedFormatterCollector.cs lines 173-177 passes 2 format arguments to MemberNeedsKey and line 202 passes 0 format arguments to KeysMustBeUnique, but neither DiagnosticDescriptor is shown in the diff of MsgPack00xMessagePackAnalyzer.cs and neither diagnostic branch has any test.

**C4 (backed, behavior, author confidence high):** When `IsUserDeclaredFormatter` is true, both the int-key and the string-key formatter templates emit `partial class <Formatter>` instead of `internal sealed class`. The generated body therefore merges into the user's partial declaration. The .tt files and their compiled .cs counterparts are changed consistently.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S1 passed)
- Breaker: **upheld**: Checked FormatterTemplate.tt line 14, FormatterTemplate.cs lines 33-35, StringKeyFormatterTemplate.tt line 18, and StringKeyFormatterTemplate.cs lines 37-39: both templates and compiled outputs emit 'partial class' when Info.IsUserDeclaredFormatter is true and 'internal sealed class' otherwise.

**C7 (backed, behavior, author confidence high):** A marked class that is not declared partial gets MsgPack019 on its identifier, and no model is produced.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 44-51 and 293-299: when IsPartial returns false for the formatter class, MsgPack019 is reported on formatter.Locations.FirstOrDefault() and Collect returns null, as verified by FormatterMustBePartial.

**C8 (backed, behavior, author confidence high):** A marked class that does not implement exactly one `IMessagePackFormatter<T>` gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 53-61: formatter.AllInterfaces is filtered for IMessagePackFormatter<T> and if the count is not 1, MsgPack020 is reported and null is returned.

**C9 (backed, behavior, author confidence medium):** MsgPack021 is reported when the data type T is generic, abstract, not a class or struct, or not accessible from the formatter.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 63-74: Collect rejects dataTypeSymbol with MsgPack021 if it is not a non-generic, non-abstract INamedTypeSymbol of TypeKind.Class or TypeKind.Struct accessible within formatter.

**C13 (backed, behavior, author confidence high):** A keyed surrogate member with no same-named, same-typed public read-write member on T gets MsgPack022.
- Lines: `GeneratedFormatterCollector.cs` L189-198
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 189-198 and tests SurrogateMemberMustMatchFormattedType and SurrogateMemberMustHaveMatchingType: missing, non-public/read-only, or type-mismatched target members report MsgPack022.

**C14 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate reports the existing MsgPack005 on the first member whose key kind differs.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 181-187 and test SurrogateKeysMustNotMixStringAndInt: keyKindIsInt locks to the first member's key kind and reports DoNotMixStringAndIntKeys (MsgPack005) on the first mismatching member.

**C17 (backed, behavior, author confidence high):** Diagnostics for marked formatters are produced by a separate incremental pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 115-131: generatedFormatterDiagnostics combines generatedFormatters with CompilationProvider and options, invokes GeneratedFormatterCollector.Collect with diagnostics.Add, and reports each diagnostic via RegisterSourceOutput.

**C20 (backed, test, author confidence low):** Test ContractlessClassRoundTrips round-trips ExternalPerson and checks both Id and Label. It should fail against the off-by-one in CreateContractlessMembers.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L11-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 11-21: ContractlessClassRoundTrips round-trips ExternalPerson { Id = 7, Label = 'seven' }, asserts both Id and Label, and will fail on Label because CreateContractlessMembers drops the last member.

**C22 (backed, test, author confidence medium):** Test ContractlessClassNullRoundTrips checks that a null class value round-trips as null.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-41
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 36-41: ContractlessClassNullRoundTrips serializes default(ExternalPerson) and asserts Deserialize<ExternalPerson> returns null.

**C23 (backed, test, author confidence low):** Test ContractlessStructRoundTrips round-trips the ExternalPoint struct and checks X and Y. The Y assertion should fail against the off-by-one.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L43-52
- Checked by: **static check** (named test `ContractlessStructRoundTrips` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 43-52: ContractlessStructRoundTrips round-trips ExternalPoint { X = 3, Y = -4 } and asserts X and Y, where Y fails due to the off-by-one in CreateContractlessMembers.

**C24 (backed, test, author confidence medium):** Test SurrogateControlsKeysAndMembership checks an 8-slot array for keys 3 and 7, round-trips Id and Name, and confirms the ignored Internal is not serialized.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 54-69: SurrogateControlsKeysAndMembership verifies ReadArrayHeader() == 8 for keys 3 and 7, round-trips Id and Name, and checks Internal remains 0.

**C25 (backed, test, author confidence low):** Test MessagePackObjectCanContainExternalTypes serializes a [MessagePackObject] that holds both external types through the resolver. It checks Person.Label, which should fail against the off-by-one.
- Lines: `GeneratedFormatterForExternalTypes.cs` L39-50, `GeneratedFormatterForExternalTypesTests.cs` L71-86
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypes.cs lines 39-50 and GeneratedFormatterForExternalTypesTests.cs lines 71-86: ContainsExternalPerson holds ExternalPerson and ExternalWidget, and the test checks Person.Label which fails against the off-by-one.

**C26 (backed, test, author confidence high):** Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts the resolver returns the user-declared formatter types for each external type.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L88-95
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 88-95: asserts GeneratedMessagePackResolver.Instance.GetFormatter<T>() returns ExternalPersonFormatter, ExternalPointFormatter, and ExternalWidgetFormatter.

**C27 (backed, test, author confidence high):** The generator diagnostic tests share hand-written Serialize/Deserialize members so the test source compiles when generation is declined. Each test then verifies one diagnostic id and location.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-26
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 1-26: defines VerifyCS and stub Serialize/Deserialize Members interpolated into the diagnostic test sources so C# interface implementation checks pass when the generator declines to emit a body.

**C28 (backed, test, author confidence high):** Test FormatterMustBePartial verifies MsgPack019 on a non-partial marked class.
- Lines: `GeneratedMessagePackFormatterTests.cs` L28-54
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 28-54: FormatterMustBePartial verifies MsgPack019 on non-partial MyFormatter.

**C29 (backed, test, author confidence high):** Test FormatterMustImplementFormatterOfT verifies MsgPack020.
- Lines: `GeneratedMessagePackFormatterTests.cs` L56-75
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 56-75: FormatterMustImplementFormatterOfT verifies MsgPack020 on a partial class implementing no interfaces.

**C30 (backed, test, author confidence high):** Test FormattedTypeMustNotBeAbstract verifies MsgPack021 for an abstract data type.
- Lines: `GeneratedMessagePackFormatterTests.cs` L77-102
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 77-102: FormattedTypeMustNotBeAbstract verifies MsgPack021 when MyType is abstract.

**C31 (backed, test, author confidence high):** Test SurrogateMemberMustMatchFormattedType verifies MsgPack022 for a surrogate member name that does not exist on T.
- Lines: `GeneratedMessagePackFormatterTests.cs` L104-136
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 104-136: SurrogateMemberMustMatchFormattedType verifies MsgPack022 on MySurrogate.Missing.

**C32 (backed, test, author confidence high):** Test SurrogateMemberMustHaveMatchingType verifies MsgPack022 when the surrogate member's type differs from T's member type.
- Lines: `GeneratedMessagePackFormatterTests.cs` L138-170
- Checked by: **test run** (test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 138-170: SurrogateMemberMustHaveMatchingType verifies MsgPack022 when MySurrogate.Id is string while MyType.Id is int.

**C33 (backed, test, author confidence high):** Test SurrogateKeysMustNotMixStringAndInt verifies MsgPack005 on the string-keyed member.
- Lines: `GeneratedMessagePackFormatterTests.cs` L172-210
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 172-210: SurrogateKeysMustNotMixStringAndInt verifies MsgPack005 at location #0 on the string-keyed member following an int-keyed member.

**C34 (backed, scope, author confidence high):** The MapModeExecutionTests project now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. The feature is therefore not tested in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **static check** (static check S7 passed)
- Breaker: **upheld**: Checked MessagePack.SourceGenerator.MapModeExecutionTests.csproj lines 13-14: GeneratedFormatterForExternalTypes*.cs is excluded from Compile because ExternalTypes is not referenced.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 4 of its 14 sentences.
Requirement sentences no claim quotes (10; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…

## 5. Findings (26)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterCollector.cs` L135 | Claim C11 disputed: First, the requirement is broken by the off-by-one bug at GeneratedFormatterCollector.cs line 135 ('i < targets.Count - 1'), which drops the last member (and serializes zero members for single-member types), so line 135 cannot leave the human reading list and all three named tests fail. Second, none of the named tests exercise base-type members, member hiding ('most-derived win | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L208 | Claim C12 disputed: First, the named test SurrogateControlsKeysAndMembership only uses integer keys ([Key(3)] and [Key(7)] in GeneratedFormatterForExternalTypes.cs lines 29-33); string keys on a valid surrogate (GeneratedFormatterCollector.cs line 208) are never tested anywhere. Second, the quoted requirement asks for attribute-based property keys and other settings such as Union, whereas unions a | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L19 | Claim C16 disputed: First, callback-receiver cast detection at GeneratedFormatterCollector.cs lines 84-85 is broken: in Roslyn C#, when m.ExplicitInterfaceImplementations.Length > 0, m.Name is qualified with the interface name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize' or 'OnAfterDeserialize', and type.GetMembers() also misses base-c | breaker (Gemini) |
| F4 | medium | `MsgPack00xMessagePackAnalyzer.cs` L382 | Claim C18 disputed: MsgPack00xMessagePackAnalyzer.cs lines 382-385 adds MsgPack019-022 to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics, but MsgPack00xMessagePackAnalyzer.Initialize is unchanged and never analyzes or reports them (only MessagePackGenerator does). Moreover, none of the named tests exercise MsgPack00xMessagePackAnalyzer or its SupportedDiagnostics because GeneratedMessagePackFo | breaker (Gemini) |
| F5 | medium | `GeneratedFormatterForExternalTypes.cs` L27 | Claim C19 disputed: Over-citation: GeneratedFormatterForExternalTypes.cs lines 24-37 defines ExternalWidgetSurrogate with [Key] and [IgnoreMember] attributes, which C19 does not describe at all (and no other claim cites lines 24-37). In addition, two of C19's named tests (ContractlessClassRoundTrips and ContractlessStructRoundTrips) fail at runtime due to the off-by-one in CreateContractlessMember | breaker (Gemini) |
| F6 | medium | `GeneratedFormatterForExternalTypesTests.cs` L29 | Claim C21 disputed: Unlike C20, C23, and C25, C21 fails to note that ContractlessClassUsesStringKeysForPublicReadWriteMembers breaks against the off-by-one at GeneratedFormatterCollector.cs line 135: ExternalPerson serializes as a 1-entry map (0x81) omitting Label, so Assert.Equal(0x82, bytes[0]) at GeneratedFormatterForExternalTypesTests.cs line 29 throws immediately, leaving the Id, Label, and D | breaker (Gemini) |
| F7 | medium | `MsgPack019.md` L26 | Claim C35 disputed: The added documentation makes claims contradicted by the implementation: doc/analyzers/MsgPack019.md line 26 states that any nesting types containing the formatter must also be declared partial, whereas GeneratedFormatterCollector.IsPartial (GeneratedFormatterCollector.cs lines 293-299) never checks ContainingType; and README.md line 1655 states that contractless mode serialize | breaker (Gemini) |
| F8 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: the loop runs `i < targets.Count - 1`, so contractless mode silently drops the last member in ordinal name order. Examples: ExternalPerson.Label, ExternalPoint.Y. A type with a single member serializes nothing. Data is lost on round-trip, and ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers, ContractlessStructRoundTrips and MessagePackObjectCanConta | author (Claude) |
| F9 | medium | `GeneratedFormatterCollector.cs` L161 | Surrogate members are enumerated without an accessibility filter. A private or non-public field or property on the surrogate that has no [Key] or [IgnoreMember] triggers MemberNeedsKey and blocks generation. | author (Claude) |
| F10 | low | `MessagePackGenerator.cs` L32 | GeneratedFormatterRequest holds INamedTypeSymbol values in the incremental pipeline. Symbols do not compare equal across compilations, which defeats incremental caching and keeps compilations alive. The collector also runs twice per formatter (model pipeline and diagnostic pipeline). | author (Claude) |
| F11 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with only a location and no message arguments. If the existing descriptor's message has placeholders, the reported message will be malformed. This path is untested. | author (Claude) |
| F12 | low | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter itself. MsgPack019.md says nesting types must be partial too, but a non-partial containing type is not diagnosed and will produce a raw compiler error in generated code. | author (Claude) |
| F13 | low | `GeneratedFormatterCollector.cs` L77 | The formatted type is created with `new T()`. `required` members of T that are not serialized (excluded by the surrogate) would make the generated code fail to compile, and this case is not diagnosed. | author (Claude) |
| F14 | high | `GeneratedFormatterCollector.cs` L84 | Explicit IMessagePackSerializationCallbackReceiver detection is broken: in Roslyn C#, an explicit interface implementation's IMethodSymbol.Name includes the interface prefix (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize' or 'OnAfterDeserialize', and type.GetMembers() ignores base types. Thus needsCast is always false, causing generated f | breaker (Gemini) |
| F15 | high | `GeneratedFormatterCollector.cs` L47 | The user-declared formatter symbol itself is never checked for IsGenericType, IsAbstract, having an accessible parameterless constructor, or being accessible from GeneratedMessagePackResolver (nestedFormatterRequired is hardcoded to false at line 107, and line 66 only checks accessibility of T within formatter). Generic, abstract, private-nested, or non-default-constructible formatter classes pass | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial only checks whether any ClassDeclarationSyntax of formatter itself has the partial modifier, without checking ContainingType (nor checking all partial declarations). A partial formatter nested inside a non-partial outer type receives no MsgPack019 diagnostic and causes EmitNestingTypesAndNamespaces to emit 'partial class Outer', failing compilation with CS0260. Also, placing [GeneratedMe | breaker (Gemini) |
| F17 | medium | `GeneratedFormatterCollector.cs` L161 | CreateSurrogateMembers iterates GetInstanceMembers(surrogate), which returns all non-static explicit fields and properties including private backing fields (triggering MsgPack004 MemberNeedsKey unless marked [IgnoreMember]), and line 171 accepts negative integer keys such as [Key(-1)] without diagnostics, producing invalid int-key formatter code. Also, if a target type has a C# 'required' member o | breaker (Gemini) |
| F18 | medium | `GeneratedFormatterCollector.cs` L277 | IsPublicReadWrite inspects property.GetMethod and property.SetMethod directly on the most-derived IPropertySymbol selected by GetInstanceMembers (line 263) without walking OverriddenProperty. In Roslyn, an override property that overrides only get (inheriting set from base) has SetMethod == null, so contractless mode silently omits it and surrogate mode falsely reports MsgPack022. | breaker (Gemini) |
| F19 | medium | `MessagePackGenerator.cs` L70 | Multiple [GeneratedMessagePackFormatter] classes targeting the same data type T (or targeting a T that already has [MessagePackObject] in the same compilation) are collected without conflict detection, causing either silent dropping of one formatter's generated body (CS0535 on the user's partial class) or duplicate type entries in GeneratedMessagePackResolver. | breaker (Gemini) |
| F20 | low | `MsgPack00xMessagePackAnalyzer.cs` L382 | MsgPack019 through MsgPack022 are added to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics, but MsgPack00xMessagePackAnalyzer.Initialize never registers analysis for [GeneratedMessagePackFormatter]; only MessagePackGenerator reports them, so analyzer-only executions never emit these diagnostics. | breaker (Gemini) |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F22 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F23 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F24 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F25 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F26 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

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

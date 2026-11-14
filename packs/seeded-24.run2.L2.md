# Evidence pack: REQ-2129 on `seeded-24`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `be698ef789d5` (seeded-24.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 626 of 884 changed code lines (71%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 75%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 6 claim(s) disputed by the breaker or by the evidence check.
- 4 behaviour claim(s) rest on AI reading only (no passing test).
- 2 high-severity finding(s).
- Evidence took 258 of 884 changed code lines off the list (C6, C12, C13, C15: tests found passing in the real run, claim upheld by the breaker). 626 stay with the owner.
- Why lines stay: 226 cited only by claims without a passing test; 167 refused; 149 claim disputed; 60 claim rests on AI reading only; 13 no claim covers the line; 11 named by a finding.

**The owner must read** (26 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `README.md` L1639-1690 (52 of 52 changed lines): claim C17 disputed
- `doc/analyzers/MsgPack019.md` L1-26 (26 of 26 changed lines): claim C17 disputed; F6 breaker (Gemini)
- `doc/analyzers/MsgPack020.md` L1-23 (23 of 23 changed lines): claim C17 disputed
- `doc/analyzers/MsgPack021.md` L1-23 (23 of 23 changed lines): claim C17 disputed
- `doc/analyzers/MsgPack022.md` L1-31 (31 of 31 changed lines): claim C17 disputed
- `doc/analyzers/index.md` L26-29 (4 of 4 changed lines): claim C17 disputed
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353, L381-385 (42 of 46 changed lines): R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L52-293, L300 (286 of 300 changed lines): claim C9 disputed; no claim covers these lines; claim C7 disputed; F2 breaker (Gemini); F16 breaker (Gemini); claim C8 disputed; F3 breaker (Gemini); F8 author (Claude); F4 breaker (Gemini); F14 breaker (Gemini); R4 contracts (AI-suggested); claim C5 disputed; R5 honesty (AI-suggested); claim C10 disputed; F5 breaker (Gemini); F15 breaker (Gemini); claim C11 only AI-read; F1 breaker (Gemini); F18 breaker (Gemini); F17 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C3 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C4 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; F19 breaker (Gemini); no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C14 has no passing test behind it; F23 test run; F24 test run; F25 test run; F26 test run; F21 test run; F22 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C14 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C14 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C16 has no passing test behind it

**Not required to read:**
- 258 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C13, C6, C12, C15

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `260ec47786` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (98s) |
| Pack id | `b57e4e0d8f26` |

## 1. Disputed claims (6)
**C5 (DISPUTED, behavior, author confidence high):** Contractless mode serializes every public, read-write, non-static, non-indexer property and field of the type and its base types. Members are taken in ordinal name order, with the most-derived member kept per name, under string keys. Read-only members such as `Doubled` are skipped.
- Lines: `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run)
- Breaker: **disputed**: First, it does not serialize every public read-write property across base types: in GeneratedFormatterCollector.cs lines 279-281, IsPublicReadWrite checks property.GetMethod and property.SetMethod directly on the derived IPropertySymbol without walking OverriddenProperty. In Roslyn (especially for external assembly metadata symbols), a derived override that overrides only get has SetMethod == null (and one overriding only set has GetMethod == null); because line 267 adds the name to seen, both the derived and base symbols are skipped and the public read-write property is silently dropped. Second, none of the four named tests exercise base types or member hiding.

**C7 (DISPUTED, behavior, author confidence medium):** A formatter that implements no `IMessagePackFormatter<T>` is rejected with MsgPack020. If there are several, the first one is used silently.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **disputed**: First, selecting formatterInterfaces[0] happens on line 63 of GeneratedFormatterCollector.cs, outside the cited lines 53-61. Second, if there are several IMessagePackFormatter<T> interfaces on an empty partial class, the first is not 'used silently'—compilation fails with CS0535 because the remaining IMessagePackFormatter<T> interfaces are left unimplemented, and no test covers multiple formatter interfaces.

**C8 (DISPUTED, behavior, author confidence medium):** The data type must be a non-generic, non-abstract class or struct accessible from the formatter, otherwise MsgPack021 is reported. A class must also have an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is reported.
- Lines: `GeneratedFormatterCollector.cs` L63-81
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **disputed**: The named test FormattedTypeMustNotBeAbstract (GeneratedMessagePackFormatterTests.cs lines 78-102) only tests an abstract data type (MsgPack021). Neither it nor any other test in the change tests generic types, inaccessible types, or the NoDeserializingConstructor diagnostic path at GeneratedFormatterCollector.cs lines 77-81.

**C9 (DISPUTED, behavior, author confidence medium):** The model is built as an ObjectSerializationInfo with no constructor parameters. It records callback-receiver support and points `Formatter` at the user's class with `IsUserDeclaredFormatter = true`.
- Lines: `GeneratedFormatterCollector.cs` L1-43, `GeneratedFormatterCollector.cs` L83-127
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **disputed**: Callback-receiver support in GeneratedFormatterCollector.cs lines 84-85 is broken for explicit interface implementations and untested by the named tests. In Roslyn, an explicit interface implementation method has a qualified IMethodSymbol.Name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize' or 'OnAfterDeserialize', so needsCast is always false; additionally type.GetMembers() misses base-class explicit implementations while type.AllInterfaces (line 83) finds them, and a single needsCast flag conflates OnBeforeSerialize and OnAfterDeserialize. Also lines 19-22 (BinaryWriteTypeFormat) in the cited 1-43 range belong to CreateMember rather than model construction.

**C10 (DISPUTED, behavior, author confidence medium):** In surrogate mode, each keyed surrogate member must match a public read-write member of the data type by name and type (MsgPack022 otherwise). `[IgnoreMember]` members are skipped. Keys must be all int or all string (MsgPack005), and duplicate keys are rejected. Members without a key raise MemberNeedsKey.
- Lines: `GeneratedFormatterCollector.cs` L143-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run; test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **disputed**: None of the four named tests exercise duplicate surrogate keys (KeysMustBeUnique, lines 200-204) or unkeyed surrogate members (MemberNeedsKey, lines 171-179). In addition, line 171 accepts negative integer keys (key is int does not check >= 0), and line 190 calls IsPublicReadWrite(target) which falsely rejects public read-write virtual properties where a derived class overrides only get or only set.

**C17 (DISPUTED, docs, author confidence high):** Documentation is added: a README section and four analyzer doc pages plus index entries describing the attribute, contractless/surrogate modes and limitations (no unions, generics or abstract types).
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **disputed**: Two of the cited analyzer doc pages make claims that contradict the implementation: doc/analyzers/MsgPack019.md line 26 states nesting types must also be partial under MsgPack019, but GeneratedFormatterCollector.IsPartial (lines 293-299) never checks containing types (resulting in CS0260 instead of MsgPack019); and doc/analyzers/MsgPack020.md line 3 states 'The class must implement exactly one such interface', but GeneratedFormatterCollector.cs line 57 only checks formatterInterfaces.Length == 0 rather than != 1.


## 2. Refused to decide (5)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new Error-severity analyzer rules MsgPack019–MsgPack022. | New user-visible analyzer rules (S4 fail). | `MsgPack00xMessagePackAnalyzer.cs` L318-385 | AI reading |
| R4 | contracts | Contractless wire layout for generated formatters: a string-key map of public read-write members in ordinal name order. | This defines the serialized format of every type using the default mode and is hard to change later. | `GeneratedFormatterCollector.cs` L128-141 | AI reading |
| R5 | honesty | Surrogate-type mechanism chosen in place of the issue's suggested alternatives (DataMember, user-defined attribute copies, or generated attributes). | A design decision beyond the requirement text that the owner should explicitly choose. | `GeneratedFormatterCollector.cs` L143-213 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations. A user marks a `partial` class that implements `IMessagePackFormatter<T>` with it, and the source generator writes the formatter body into that class and registers it in `GeneratedMessagePackResolver`. `T` can come from an assembly with no MessagePack reference. By default, `T` is serialized contractless: public read-write instance members, in name order, under string keys. An optional `SurrogateType` names another type whose `[Key]`/`[IgnoreMember]` attributes set the keys and which members are included. Four new error diagnostics (MsgPack019–022) cover misuse. Both formatter templates now emit `partial class` instead of `internal sealed class` for these user-declared formatters.

**Why:** Issue #2129: Project B must generate a formatter for a type in Project A, and Project A cannot reference MessagePack.

**Touches beyond the requirement:**
- A surrogate-type design (`SurrogateType` property) chosen by the agent. It is not one of the three alternatives in the issue and is now public API.
- Four new user-visible analyzer rules MsgPack019–MsgPack022, plus their docs pages and README section.
- A new test project (MessagePack.SourceGenerator.ExternalTypes), and the MapModeExecutionTests compile glob now excludes the new execution test files.
- `GeneratedFormatterRequest` is declared as a `public` record in the generator assembly.

**How sure (the author's own view; it moves nothing):** High that the happy path works for simple classes and structs: execution tests round-trip through a real, separate, MessagePack-free assembly and check resolver registration. Medium on diagnostics. Partial/interface/abstract/surrogate-mismatch/mixed-keys have tests, but these paths have none: the constructor check, duplicate keys, and multiple `IMessagePackFormatter<T>` interfaces. The body-less `class X : IMessagePackFormatter<T>;` form from the issue is not tested. Union support from the issue is explicitly not implemented.

## 4. Claims (17)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C5 | DISPUTED | Contractless mode serializes every public, read-write, non-static, non-indexer property and field of the type and its base types. Members are taken in ordinal name order, with the most-derived member kept per name, under string keys. Read-only members such as `Doubled` are skipped. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | disputed | no |
| C7 | DISPUTED | A formatter that implements no `IMessagePackFormatter<T>` is rejected with MsgPack020. If there are several, the first one is used silently. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | disputed | no |
| C8 | DISPUTED | The data type must be a non-generic, non-abstract class or struct accessible from the formatter, otherwise MsgPack021 is reported. A class must also have an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is reported. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | test run | disputed | no |
| C9 | DISPUTED | The model is built as an ObjectSerializationInfo with no constructor parameters. It records callback-receiver support and points `Formatter` at the user's class with `IsUserDeclaredFormatter = true`. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | disputed | no |
| C10 | DISPUTED | In surrogate mode, each keyed surrogate member must match a public read-write member of the data type by name and type (MsgPack022 otherwise). `[IgnoreMember]` members are skipped. Keys must be all int or all string (MsgPack005), and duplicate keys are rejected. Members without a key raise MemberNeedsKey. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | disputed | no |
| C17 | DISPUTED | Documentation is added: a README section and four analyzer doc pages plus index entries describing the attribute, contractless/surrogate modes and limitations (no unions, generics or abstract types). | (scope) | AI reading only | disputed | no |
| C1 | unverified | A new public, non-inherited, class-targeted `GeneratedMessagePackFormatterAttribute` with an optional `Type? SurrogateType` property is added to MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator finds classes carrying the attribute through ForAttributeWithMetadataName and reads the `SurrogateType` named argument. It feeds each request into the model collection, so the formatter ends up in the generated output and resolver. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C4 | unverified | Classes marked with the attribute are excluded from the hand-written custom-formatter discovery. Without this, the formatter would be registered twice: once as a custom formatter and once as a generated object formatter. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C11 | unverified | CreateMember builds a MemberSerializationInfo marked readable and writable, carrying the member's init-only/required flags and its fully qualified type. GetMemberType returns the property or field type. | (scope) | AI reading only | upheld | no |
| C16 | unverified | MapModeExecutionTests stops compiling the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode. | (scope) | AI reading only | upheld | no |
| C3 | backed | When `IsUserDeclaredFormatter` is true, both the int-key and string-key formatter templates emit `partial class` instead of `internal sealed class`. The generated body therefore merges into the user's class. The new flag takes part in ObjectSerializationInfo equality. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | upheld | no |
| C6 | backed | A formatter class that is not declared `partial` is rejected with MsgPack019 and produces no model. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C12 | backed | Diagnostics for generated formatters come from a separate incremental pipeline. It reruns the collector with a real reportDiagnostic callback; the model pipeline passes null. | (scope) | test run | upheld | yes |
| C13 | backed | Four new Error-severity descriptors MsgPack019–MsgPack022 are added, registered in SupportedDiagnostics and listed in AnalyzerReleases.Unshipped.md. | (scope) | test run | upheld | yes |
| C14 | backed | The execution tests reproduce the issue's setup: a separate ExternalTypes project without any MessagePack reference, consumed by the execution test project. Formatters for its types are declared there and round-trip correctly through GeneratedMessagePackResolver. | "because the latter has no (and cannot have) reference to MessagePack nuget package." | static check | upheld | no |
| C15 | backed | The diagnostic tests use verifier markup to assert that each of MsgPack019, MsgPack020, MsgPack021, MsgPack022 (name and type mismatch) and MsgPack005 is reported at the expected span. | (scope) | test run | upheld | yes |

**C1 (unverified, behavior, author confidence high):** A new public, non-inherited, class-targeted `GeneratedMessagePackFormatterAttribute` with an optional `Type? SurrogateType` property is added to MessagePack.Annotations.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked Attributes.cs lines 142-177: GeneratedMessagePackFormatterAttribute is public, targets AttributeTargets.Class with AllowMultiple = false and Inherited = false, and exposes public Type? SurrogateType { get; set; }. Exercised by both named execution tests.

**C2 (unverified, behavior, author confidence high):** The generator finds classes carrying the attribute through ForAttributeWithMetadataName and reads the `SurrogateType` named argument. It feeds each request into the model collection, so the formatter ends up in the generated output and resolver.
- Lines: `MessagePackGenerator.cs` L29-37, `MessagePackGenerator.cs` L60-76, `Constants.cs` L17-18
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 29-37 and 60-76 and Constants.cs lines 17-18: ForAttributeWithMetadataName locates ClassDeclarationSyntax nodes carrying GeneratedMessagePackFormatterAttribute, reads the SurrogateType named argument, combines requests into the model pipeline, and adds collected models to modelPerType.

**C4 (unverified, behavior, author confidence medium):** Classes marked with the attribute are excluded from the hand-written custom-formatter discovery. Without this, the formatter would be registered twice: once as a custom formatter and once as a generated object formatter.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs lines 35-38: classes carrying MessagePack.GeneratedMessagePackFormatterAttribute are filtered out of customFormattersInThisCompilation so they are not also registered as hand-written formatters.

**C11 (unverified, behavior, author confidence medium):** CreateMember builds a MemberSerializationInfo marked readable and writable, carrying the member's init-only/required flags and its fully qualified type. GetMemberType returns the property or field type.
- Lines: `GeneratedFormatterCollector.cs` L215-244, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 215-244 and 286-291 (plus BinaryWriteTypeFormat on lines 19-22): CreateMember sets IsReadable/IsWritable true, extracts IsInitOnly and IsRequired, formats Type and ShortTypeName, and GetMemberType returns property.Type or field.Type.

**C16 (unverified, scope, author confidence high):** MapModeExecutionTests stops compiling the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked MapModeExecutionTests.csproj lines 13-14: GeneratedFormatterForExternalTypes*.cs are excluded from Compile because MapModeExecutionTests does not reference ExternalTypes, leaving the feature untested in force-map mode.

**C3 (backed, behavior, author confidence high):** When `IsUserDeclaredFormatter` is true, both the int-key and string-key formatter templates emit `partial class` instead of `internal sealed class`. The generated body therefore merges into the user's class. The new flag takes part in ObjectSerializationInfo equality.
- Lines: `FormatterTemplate.cs` L33-35, `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.cs` L37-39, `StringKeyFormatterTemplate.tt` L18-18, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed; static check S5 passed)
- Breaker: **upheld**: Checked both .tt templates and their compiled .cs outputs plus ObjectSerializationInfo.cs: IsUserDeclaredFormatter switches class emission from 'internal sealed class' to 'partial class' in both int-key and string-key templates and participates in ObjectSerializationInfo.Equals.

**C6 (backed, behavior, author confidence high):** A formatter class that is not declared `partial` is rejected with MsgPack019 and produces no model.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 44-51 and 293-299 and FormatterMustBePartial in GeneratedMessagePackFormatterTests.cs: a non-partial formatter class reports MsgPack019 and returns null.

**C12 (backed, behavior, author confidence medium):** Diagnostics for generated formatters come from a separate incremental pipeline. It reruns the collector with a real reportDiagnostic callback; the model pipeline passes null.
- Lines: `MessagePackGenerator.cs` L115-131, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 72 and 115-131 and GeneratedFormatterRequest.cs: the source pipeline passes reportDiagnostic: null whereas generatedFormatterDiagnostics reruns GeneratedFormatterCollector.Collect with diagnostics.Add and registers those diagnostics via RegisterSourceOutput.

**C13 (backed, scope, author confidence high):** Four new Error-severity descriptors MsgPack019–MsgPack022 are added, registered in SupportedDiagnostics and listed in AnalyzerReleases.Unshipped.md.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MsgPack00xMessagePackAnalyzer.cs lines 32-35, 318-353, 382-385 and AnalyzerReleases.Unshipped.md lines 26-29: all four descriptors MsgPack019-MsgPack022 have DiagnosticSeverity.Error, are included in SupportedDiagnostics, and match AnalyzerReleases.Unshipped.md.

**C14 (backed, test, author confidence high):** The execution tests reproduce the issue's setup: a separate ExternalTypes project without any MessagePack reference, consumed by the execution test project. Formatters for its types are declared there and round-trip correctly through GeneratedMessagePackResolver.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50, `GeneratedFormatterForExternalTypesTests.cs` L1-95
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked ExternalTypes.csproj, ExternalPerson.cs, ExternalPoint.cs, ExternalWidget.cs, ExecutionTests.csproj, GeneratedFormatterForExternalTypes.cs, and GeneratedFormatterForExternalTypesTests.cs: ExternalTypes has no MessagePack dependency, and all seven execution tests verify serialization, deserialization, contractless/surrogate wire layout, nested usage, and GeneratedMessagePackResolver registration.

**C15 (backed, test, author confidence high):** The diagnostic tests use verifier markup to assert that each of MsgPack019, MsgPack020, MsgPack021, MsgPack022 (name and type mismatch) and MsgPack005 is reported at the expected span.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs lines 1-210: the six tests assert MsgPack019, MsgPack020, MsgPack021, MsgPack022 (missing member and mismatched member type), and MsgPack005 at the marked locations.

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
| F1 | medium | `GeneratedFormatterCollector.cs` L267 | Claim C5 disputed: First, it does not serialize every public read-write property across base types: in GeneratedFormatterCollector.cs lines 279-281, IsPublicReadWrite checks property.GetMethod and property.SetMethod directly on the derived IPropertySymbol without walking OverriddenProperty. In Roslyn (especially for external assembly metadata symbols), a derived override that overrides only get ha | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L57 | Claim C7 disputed: First, selecting formatterInterfaces[0] happens on line 63 of GeneratedFormatterCollector.cs, outside the cited lines 53-61. Second, if there are several IMessagePackFormatter<T> interfaces on an empty partial class, the first is not 'used silently'—compilation fails with CS0535 because the remaining IMessagePackFormatter<T> interfaces are left unimplemented, and no test covers  | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L77 | Claim C8 disputed: The named test FormattedTypeMustNotBeAbstract (GeneratedMessagePackFormatterTests.cs lines 78-102) only tests an abstract data type (MsgPack021). Neither it nor any other test in the change tests generic types, inaccessible types, or the NoDeserializingConstructor diagnostic path at GeneratedFormatterCollector.cs lines 77-81. | breaker (Gemini) |
| F4 | medium | `GeneratedFormatterCollector.cs` L84 | Claim C9 disputed: Callback-receiver support in GeneratedFormatterCollector.cs lines 84-85 is broken for explicit interface implementations and untested by the named tests. In Roslyn, an explicit interface implementation method has a qualified IMethodSymbol.Name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize' or 'OnAfterDeserialize', so n | breaker (Gemini) |
| F5 | medium | `GeneratedFormatterCollector.cs` L171 | Claim C10 disputed: None of the four named tests exercise duplicate surrogate keys (KeysMustBeUnique, lines 200-204) or unkeyed surrogate members (MemberNeedsKey, lines 171-179). In addition, line 171 accepts negative integer keys (key is int does not check >= 0), and line 190 calls IsPublicReadWrite(target) which falsely rejects public read-write virtual properties where a derived class overrides | breaker (Gemini) |
| F6 | medium | `MsgPack019.md` L26 | Claim C17 disputed: Two of the cited analyzer doc pages make claims that contradict the implementation: doc/analyzers/MsgPack019.md line 26 states nesting types must also be partial under MsgPack019, but GeneratedFormatterCollector.IsPartial (lines 293-299) never checks containing types (resulting in CS0260 instead of MsgPack019); and doc/analyzers/MsgPack020.md line 3 states 'The class must imple | breaker (Gemini) |
| F7 | low | `GeneratedFormatterCollector.cs` L57 | MsgPack020's message and docs say the class must implement `IMessagePackFormatter<T>` for exactly one type, but only zero is rejected. A formatter implementing two such interfaces silently gets code for `formatterInterfaces[0]` only and then fails to compile because the other interface is unimplemented. | author (Claude) |
| F8 | medium | `GeneratedFormatterCollector.cs` L79 | The existing NoDeserializingConstructor descriptor is created with no message arguments. If its message format has placeholders, the message may be malformed or fail to format. This path has no test. | author (Claude) |
| F9 | low | `GeneratedFormatterCollector.cs` L169 | In surrogate mode, every non-ignored instance property or field of the surrogate (including private fields and base-type members) must carry `[Key]`, or MemberNeedsKey fails the build. This contradicts the README wording that only the members the surrogate lists are serialized. | author (Claude) |
| F10 | low | `GeneratedFormatterCollector.cs` L47 | Only the formatter itself is checked for `partial`. MsgPack019.md says nesting types must also be partial, but nothing reports this, so a non-partial containing type produces a compiler error from generated code instead of a diagnostic. | author (Claude) |
| F11 | low | `MessagePackGenerator.cs` L117 | The diagnostics pipeline combines INamedTypeSymbol-bearing records with CompilationProvider. It reruns the collector on every compilation change, and the symbols kept in the pipeline (GeneratedFormatterRequest) defeat incremental caching. Diagnostics are also reported even when source generation is disabled. | author (Claude) |
| F12 | low | `GeneratedFormatterRequest.cs` L13 | The record is declared `public` in the generator assembly although it is internal plumbing. | author (Claude) |
| F13 | low | `GeneratedFormatterForExternalTypes.cs` L10 | No test covers the body-less form `partial class X : IMessagePackFormatter<T>;` that the issue explicitly shows. Duplicate surrogate keys and init-only/required members on the external type are also untested. | author (Claude) |
| F14 | high | `GeneratedFormatterCollector.cs` L84 | Explicit IMessagePackSerializationCallbackReceiver detection is always false: in Roslyn, an explicit interface implementation's IMethodSymbol.Name includes the interface prefix (not 'OnBeforeSerialize' or 'OnAfterDeserialize'), and type.GetMembers() misses base-class implementations while type.AllInterfaces finds them. Generated formatters for external types with explicit serialization callbacks e | breaker (Gemini) |
| F15 | high | `GeneratedFormatterCollector.cs` L171 | CreateSurrogateMembers checks 'key is not (int or string)' without requiring non-negative integer keys (int >= 0). A surrogate member with [Key(-1)] passes validation and passes IntKey = -1 into ObjectSerializationInfo.Create / FormatterTemplate, either crashing the generator or silently omitting the member from 0-based array serialization. | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterCollector.cs` L57 | GeneratedFormatterCollector neither checks formatterInterfaces.Length != 1 (despite MsgPack020's message 'for exactly one data type') nor validates the user-declared formatter class itself (it can be abstract, generic, private inside a nesting type, or lack an accessible parameterless constructor). Any of these produces uncompilable generated code (CS0535, CS0144, CS0122, CS7036) in the formatter  | breaker (Gemini) |
| F17 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial only checks the formatter symbol itself and ignores symbol.ContainingType, so a partial formatter nested in a non-partial outer type bypasses MsgPack019 and fails with CS0260 when EmitNestingTypesAndNamespaces emits partial outer wrappers. Likewise, MessagePackGenerator.cs line 31 filters on ClassDeclarationSyntax, silently ignoring 'partial record' formatter classes (RecordDeclarationSy | breaker (Gemini) |
| F18 | medium | `GeneratedFormatterCollector.cs` L279 | IsPublicReadWrite inspects property.GetMethod and property.SetMethod only on the most-derived IPropertySymbol without walking property.OverriddenProperty. When an external derived class overrides only get (or only set) of a public virtual read-write property, the unoverridden accessor is null on the derived symbol and the base symbol is suppressed by seen (line 267), silently dropping the property | breaker (Gemini) |
| F19 | medium | `MessagePackGenerator.cs` L70 | Multiple [GeneratedMessagePackFormatter] classes targeting the same T (or targeting a type that also carries [MessagePackObject]) are not diagnosed, leading either to one partial formatter being silently dropped during ObjectInfos set deduplication (causing CS0535) or duplicate type registrations in GeneratedMessagePackResolver. | breaker (Gemini) |
| F20 | low | `MessagePackGenerator.cs` L34 | Casting SurrogateType with 'as INamedTypeSymbol' turns non-named type arguments such as typeof(int[]) into null, causing GeneratedFormatterCollector to treat the formatter as contractless instead of reporting an invalid surrogate type. | breaker (Gemini) |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F22 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F23 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F24 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F25 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F26 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs`: Surrogate-type mode (lines 143-213) is a new design invented by the agent. It is not one of the three alternatives proposed in the issue.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Compile-glob exclusion so the map-mode test project still builds without the ExternalTypes reference.
- `README.md`: New README section documenting the feature and its limitations.

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
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (98s)

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

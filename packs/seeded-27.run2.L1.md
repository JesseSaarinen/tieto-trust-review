# Evidence pack: REQ-2129 on `seeded-27`

> **REVIEW INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: build failed (introduced by this change: the base commit builds). Effect: no claim can be backed by a test run, so no line is released: the owner reads every changed code line.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `1b1ead320573` (seeded-27.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 886 of 886 changed code lines (100%).** Docs: 159 lines, read with the story. Of everything changed: 85%.

- Fail closed: tests build failed (introduced by this change: the base commit builds). No claim can be backed by a test run, so no line is released: the owner reads every changed code line.
- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 17 behaviour claim(s) rest on AI reading only (no passing test).
- The change breaks the test build (the base commit builds).
- Why lines stay: 402 cited only by claims without a passing test; 321 claim rests on AI reading only; 88 refused; 74 no claim covers the line; 1 named by a finding.

**The owner must read** (23 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L143-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `Directory.Packages.props` L10 (2 of 2 changed lines): R5 honesty (AI-suggested); F3 author (Claude)
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L32-35, L318-353, L381-385 (46 of 46 changed lines): C17 has no passing test behind it; R3 contracts (AI-suggested); claim C13 only AI-read; claim C14 only AI-read; claim C15 only AI-read; claim C10 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-300 (300 of 300 changed lines): claim C18 only AI-read; claim C13 only AI-read; F2 author (Claude); no claim covers these lines; claim C14 only AI-read; claim C15 only AI-read; claim C7 only AI-read; claim C19 only AI-read; claim C6 only AI-read; claim C9 only AI-read; claim C8 only AI-read; C4 has no passing test behind it; R4 contracts (AI-suggested); claim C11 only AI-read; claim C10 only AI-read; claim C12 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C5 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L115-132 (39 of 39 changed lines): claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines; claim C16 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C20 has no passing test behind it; no claim covers these lines; C21 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C20 has no passing test behind it; no claim covers these lines; C21 has no passing test behind it; C22 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C20 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C20 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C20 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C20 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C20 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C24 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L1-210 (210 of 210 changed lines): C23 has no passing test behind it

**Not required to read:**
- 6 doc file(s): prose; covered by the story

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `42ae944310` (base `32258fdbee`) |
| Files | 29 changed, 29 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | not run: build failed (introduced by this change: the base commit builds) |
| Pack id | `43b4a997f201` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (5)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new user-visible error analyzer rules MsgPack019–MsgPack022. | New diagnostic ids are a user-facing contract and need owner sign-off. | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | Default contractless wire shape: a string-keyed map of public read-write members in ordinal name order. | Picks the serialized format for these formatters. Changing it later would break existing data. | `GeneratedFormatterCollector.cs` L131-141 | AI reading |
| R5 | honesty | Unrequested Roslyn version bump for analyzer projects. | This change goes beyond the requirement and affects which IDE/SDK versions can load the analyzer. | `Directory.Packages.props` L10-10 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations. A user marks a `partial` class implementing `IMessagePackFormatter<T>` with it, and the source generator writes that class's body and registers it in `GeneratedMessagePackResolver`. `T` can live in an assembly that does not reference MessagePack. By default the formatter is contractless: public read-write instance members go in a string-keyed map, ordered by name. An optional `SurrogateType` names a type whose `[Key]`/`[IgnoreMember]` attributes set the keys; its members must match `T`'s members by name and type. Four new error diagnostics (MsgPack019–022) cover misuse. Both formatter templates now emit `partial class` for these user-declared formatters. A new test library without a MessagePack reference, execution tests and generator diagnostic tests come with it.

**Why:** REQ-2129 asks to generate a formatter in Project B for a type from Project A, which cannot reference MessagePack, via `[GeneratedMessagePackFormatter] partial class X : IMessagePackFormatter<T>`.

**Touches beyond the requirement:**
- Directory.Packages.props raises the Roslyn version for analyzer projects from 4.12.0 to 4.14.0. Nothing in the diff explains why.
- Picks its own key/attribute design: contractless by default plus a new `SurrogateType` property. This is none of the three alternatives listed in the issue.
- Adds four new user-visible error rules (MsgPack019–022) and reuses MsgPack003/005/007/008-style existing diagnostics for surrogate errors.
- Excludes the new execution-test files from MapModeExecutionTests, so map mode is not tested for this feature.

**How sure (the author's own view; it moves nothing):** High that the basic flow works for the tested cases: contractless class, struct, null, int-keyed surrogate, nesting in a [MessagePackObject], and resolver registration. These all have execution tests against a truly MessagePack-free assembly. Medium on edge cases with no tests: string-keyed surrogates, duplicate keys, nested formatters, callback receivers, inheritance and init/required members. Low on the callback-receiver cast logic, which looks wrong.

## 4. Claims (26)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | A public, class-only, non-inherited `GeneratedMessagePackFormatterAttribute` with a nullable `Type? SurrogateType` property is added to MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator finds class declarations carrying the attribute through ForAttributeWithMetadataName. It wraps each one in a GeneratedFormatterRequest holding the formatter symbol and the optional SurrogateType named argument. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C3 | unverified | The combined pipeline tuple indices are shifted for the extra input. Each request's model is added to modelPerType, so the formatter becomes part of the generated resolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C5 | unverified | Classes carrying the attribute are skipped by the hand-written custom formatter scan, so they are not registered twice. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C6 | unverified | With no surrogate, every public read-write instance property and field becomes a string-keyed map entry named after the member, in ordinal name order. Read-only members such as ExternalPerson.Doubled are skipped. | "As for the attribute-based property keys and other settings" | AI reading only | - | no |
| C7 | unverified | Structs are accepted without needing a parameterless constructor. Classes need an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is raised. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C8 | unverified | For class data types the model is built with isClass true, so a null value serializes as nil and deserializes back to null. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C9 | unverified | In surrogate mode, members marked [IgnoreMember] are skipped, [Key] values become keys, and members of T not listed are not serialized. With int keys 3 and 7 the output is an 8-slot array. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C10 | unverified | A keyed surrogate member with no public read-write member of the same name and identical type on T produces MsgPack022 at the surrogate member, and no formatter is generated. | "As for the attribute-based property keys and other settings" | AI reading only | - | no |
| C11 | unverified | Mixing int and string keys in a surrogate reports the existing MsgPack005 (DoNotMixStringAndIntKeys) at the first member whose key kind differs. | "As for the attribute-based property keys and other settings" | AI reading only | - | no |
| C12 | unverified | Duplicate surrogate keys report KeysMustBeUnique and stop generation. | "As for the attribute-based property keys and other settings" | AI reading only | - | no |
| C13 | unverified | A formatter class not declared partial (checked on its own declarations only) gets MsgPack019 and no generated output. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | AI reading only | - | no |
| C14 | unverified | A formatter that does not implement exactly one IMessagePackFormatter<T> gets MsgPack020. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | AI reading only | - | no |
| C15 | unverified | A data type that is generic, abstract, not a class or struct, or not accessible from the formatter gets MsgPack021. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C16 | unverified | Diagnostics come from a separate pipeline. It reruns the collector with a diagnostic sink and reports each result through RegisterSourceOutput. The main model pipeline passes a null sink, so nothing is reported twice. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C17 | unverified | The new rule ids MsgPack019–022 are declared as constants, added to SupportedDiagnostics and listed in AnalyzerReleases.Unshipped.md as Usage/Error. | (scope) | AI reading only | - | no |
| C18 | unverified | Shared collector helpers do the following: - GetInstanceMembers walks base types, skipping static, implicit and indexer members, and keeps the most derived member per name. - CreateMember builds a MemberSerializationInfo from the member's type, init-only and required flags. - GetMemberType returns the member type. - BinaryWriteTypeFormat gives the short type name. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C19 | unverified | The collector detects IMessagePackSerializationCallbackReceiver on T and builds a single ObjectSerializationInfo/FullModel with no constructor parameters and no nested formatter. The explicit-implementation cast detection is likely wrong (see concerns). | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | AI reading only | - | no |
| C21 | unverified | Test MessagePackObjectCanContainExternalTypes round-trips a [MessagePackObject] holding an ExternalPerson and an ExternalWidget through the composite resolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C22 | unverified | Test GeneratedFormattersAreRegisteredInGeneratedResolver checks that GeneratedMessagePackResolver returns an instance of each user-declared formatter type. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C24 | unverified | MapModeExecutionTests now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes, so the feature is not covered in force-map mode. | (scope) | AI reading only | - | no |
| C25 | unverified | The Roslyn version for analyzer projects is raised from 4.12.0 to 4.14.0. The requirement does not ask for this and the diff gives no reason. | (scope) | AI reading only | - | no |
| C26 | unverified | The README and the new analyzer docs describe the attribute, contractless default, surrogate mode, limitations and MsgPack019–022. | "Add a `[GeneratedMessagePackFormatter]` attribute" | AI reading only | - | no |
| C4 | backed | When IsUserDeclaredFormatter is set, both the int-key and string-key templates emit `partial class` instead of `internal sealed class`, so the generated body merges with the user's declaration. The flag takes part in record equality and is set by the collector. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C20 | backed | The execution tests really test the requirement. The ExternalTypes test library has no MessagePack reference, and its types (ExternalPerson, ExternalPoint, ExternalWidget) are serialized by partial formatters declared with no hand-written members in the consuming test project. | "because the latter has no (and cannot have) reference to MessagePack nuget package" | static check | - | no |
| C23 | backed | The generator diagnostic tests write formatter members by hand so that the source compiles when the generator declines, and use markup to pin each expected diagnostic id and location. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | static check | - | no |

**C1 (unverified, behavior, author confidence high):** A public, class-only, non-inherited `GeneratedMessagePackFormatterAttribute` with a nullable `Type? SurrogateType` property is added to MessagePack.Annotations.
- Lines: `Attributes.cs` L143-177
- Checked by: **AI reading only** (tests named (GeneratedFormattersAreRegisteredInGeneratedResolver) but not run: build failed (introduced by this change: the base commit builds))

**C2 (unverified, behavior, author confidence high):** The generator finds class declarations carrying the attribute through ForAttributeWithMetadataName. It wraps each one in a GeneratedFormatterRequest holding the formatter symbol and the optional SurrogateType named argument.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (tests named (ContractlessClassRoundTrips, SurrogateControlsKeysAndMembership) but not run: build failed (introduced by this change: the base commit builds))

**C3 (unverified, behavior, author confidence high):** The combined pipeline tuple indices are shifted for the extra input. Each request's model is added to modelPerType, so the formatter becomes part of the generated resolver.
- Lines: `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (tests named (GeneratedFormattersAreRegisteredInGeneratedResolver) but not run: build failed (introduced by this change: the base commit builds))

**C5 (unverified, behavior, author confidence medium):** Classes carrying the attribute are skipped by the hand-written custom formatter scan, so they are not registered twice.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (tests named (GeneratedFormattersAreRegisteredInGeneratedResolver) but not run: build failed (introduced by this change: the base commit builds))

**C6 (unverified, behavior, author confidence high):** With no surrogate, every public read-write instance property and field becomes a string-keyed map entry named after the member, in ordinal name order. Read-only members such as ExternalPerson.Doubled are skipped.
- Lines: `GeneratedFormatterCollector.cs` L89-93, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L277-284
- Checked by: **AI reading only** (tests named (ContractlessClassUsesStringKeysForPublicReadWriteMembers, ContractlessClassRoundTrips) but not run: build failed (introduced by this change: the base commit builds))

**C7 (unverified, behavior, author confidence medium):** Structs are accepted without needing a parameterless constructor. Classes need an accessible parameterless constructor, otherwise the existing NoDeserializingConstructor diagnostic is raised.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only** (tests named (ContractlessStructRoundTrips) but not run: build failed (introduced by this change: the base commit builds))

**C8 (unverified, behavior, author confidence high):** For class data types the model is built with isClass true, so a null value serializes as nil and deserializes back to null.
- Lines: `GeneratedFormatterCollector.cs` L104-115
- Checked by: **AI reading only** (tests named (ContractlessClassNullRoundTrips) but not run: build failed (introduced by this change: the base commit builds))

**C9 (unverified, behavior, author confidence high):** In surrogate mode, members marked [IgnoreMember] are skipped, [Key] values become keys, and members of T not listed are not serialized. With int keys 3 and 7 the output is an 8-slot array.
- Lines: `GeneratedFormatterCollector.cs` L94-102, `GeneratedFormatterCollector.cs` L143-179, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (tests named (SurrogateControlsKeysAndMembership) but not run: build failed (introduced by this change: the base commit builds))

**C10 (unverified, behavior, author confidence high):** A keyed surrogate member with no public read-write member of the same name and identical type on T produces MsgPack022 at the surrogate member, and no formatter is generated.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `MsgPack00xMessagePackAnalyzer.cs` L345-352
- Checked by: **AI reading only** (tests named (SurrogateMemberMustMatchFormattedType, SurrogateMemberMustHaveMatchingType) but not run: build failed (introduced by this change: the base commit builds))

**C11 (unverified, behavior, author confidence high):** Mixing int and string keys in a surrogate reports the existing MsgPack005 (DoNotMixStringAndIntKeys) at the first member whose key kind differs.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **AI reading only** (tests named (SurrogateKeysMustNotMixStringAndInt) but not run: build failed (introduced by this change: the base commit builds))

**C12 (unverified, behavior, author confidence medium):** Duplicate surrogate keys report KeysMustBeUnique and stop generation.
- Lines: `GeneratedFormatterCollector.cs` L200-204
- Checked by: **AI reading only**

**C13 (unverified, behavior, author confidence high):** A formatter class not declared partial (checked on its own declarations only) gets MsgPack019 and no generated output.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299, `MsgPack00xMessagePackAnalyzer.cs` L318-325
- Checked by: **AI reading only** (tests named (FormatterMustBePartial) but not run: build failed (introduced by this change: the base commit builds))

**C14 (unverified, behavior, author confidence high):** A formatter that does not implement exactly one IMessagePackFormatter<T> gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61, `MsgPack00xMessagePackAnalyzer.cs` L327-334
- Checked by: **AI reading only** (tests named (FormatterMustImplementFormatterOfT) but not run: build failed (introduced by this change: the base commit builds))

**C15 (unverified, behavior, author confidence high):** A data type that is generic, abstract, not a class or struct, or not accessible from the formatter gets MsgPack021.
- Lines: `GeneratedFormatterCollector.cs` L63-74, `MsgPack00xMessagePackAnalyzer.cs` L336-343
- Checked by: **AI reading only** (tests named (FormattedTypeMustNotBeAbstract) but not run: build failed (introduced by this change: the base commit builds))

**C16 (unverified, behavior, author confidence medium):** Diagnostics come from a separate pipeline. It reruns the collector with a diagnostic sink and reports each result through RegisterSourceOutput. The main model pipeline passes a null sink, so nothing is reported twice.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **AI reading only** (tests named (FormatterMustBePartial, FormatterMustImplementFormatterOfT, FormattedTypeMustNotBeAbstract, SurrogateMemberMustMatchFormattedType) but not run: build failed (introduced by this change: the base commit builds))

**C17 (unverified, scope, author confidence high):** The new rule ids MsgPack019–022 are declared as constants, added to SupportedDiagnostics and listed in AnalyzerReleases.Unshipped.md as Usage/Error.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **AI reading only**

**C18 (unverified, behavior, author confidence medium):** Shared collector helpers do the following:
- GetInstanceMembers walks base types, skipping static, implicit and indexer members, and keeps the most derived member per name.
- CreateMember builds a MemberSerializationInfo from the member's type, init-only and required flags.
- GetMemberType returns the member type.
- BinaryWriteTypeFormat gives the short type name.
- Lines: `GeneratedFormatterCollector.cs` L1-43, `GeneratedFormatterCollector.cs` L215-275, `GeneratedFormatterCollector.cs` L286-291, `GeneratedFormatterCollector.cs` L300-300
- Checked by: **AI reading only** (tests named (ContractlessClassRoundTrips, ContractlessStructRoundTrips) but not run: build failed (introduced by this change: the base commit builds))

**C19 (unverified, behavior, author confidence low):** The collector detects IMessagePackSerializationCallbackReceiver on T and builds a single ObjectSerializationInfo/FullModel with no constructor parameters and no nested formatter. The explicit-implementation cast detection is likely wrong (see concerns).
- Lines: `GeneratedFormatterCollector.cs` L83-86, `GeneratedFormatterCollector.cs` L121-126
- Checked by: **AI reading only**

**C21 (unverified, test, author confidence high):** Test MessagePackObjectCanContainExternalTypes round-trips a [MessagePackObject] holding an ExternalPerson and an ExternalWidget through the composite resolver.
- Lines: `GeneratedFormatterForExternalTypes.cs` L39-50, `GeneratedFormatterForExternalTypesTests.cs` L71-86
- Checked by: **AI reading only** (tests named (MessagePackObjectCanContainExternalTypes) but not run: build failed (introduced by this change: the base commit builds))

**C22 (unverified, test, author confidence high):** Test GeneratedFormattersAreRegisteredInGeneratedResolver checks that GeneratedMessagePackResolver returns an instance of each user-declared formatter type.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L88-95
- Checked by: **AI reading only** (tests named (GeneratedFormattersAreRegisteredInGeneratedResolver) but not run: build failed (introduced by this change: the base commit builds))

**C24 (unverified, scope, author confidence high):** MapModeExecutionTests now excludes the new GeneratedFormatterForExternalTypes*.cs files because it does not reference ExternalTypes, so the feature is not covered in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **AI reading only**

**C25 (unverified, scope, author confidence high):** The Roslyn version for analyzer projects is raised from 4.12.0 to 4.14.0. The requirement does not ask for this and the diff gives no reason.
- Lines: `Directory.Packages.props` L10-10
- Checked by: **AI reading only**

**C26 (unverified, docs, author confidence high):** The README and the new analyzer docs describe the attribute, contractless default, surrogate mode, limitations and MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**

**C4 (backed, behavior, author confidence high):** When IsUserDeclaredFormatter is set, both the int-key and string-key templates emit `partial class` instead of `internal sealed class`, so the generated body merges with the user's declaration. The flag takes part in record equality and is set by the collector.
- Lines: `FormatterTemplate.cs` L33-35, `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.cs` L37-39, `StringKeyFormatterTemplate.tt` L18-18, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L116-119
- Checked by: **static check** (tests named (ContractlessClassRoundTrips, SurrogateControlsKeysAndMembership) but not run: build failed (introduced by this change: the base commit builds); static check S1 passed)

**C20 (backed, test, author confidence high):** The execution tests really test the requirement. The ExternalTypes test library has no MessagePack reference, and its types (ExternalPerson, ExternalPoint, ExternalWidget) are serialized by partial formatters declared with no hand-written members in the consuming test project.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-37, `GeneratedFormatterForExternalTypesTests.cs` L1-21
- Checked by: **static check** (tests named (ContractlessClassRoundTrips, GeneratedFormattersAreRegisteredInGeneratedResolver) but not run: build failed (introduced by this change: the base commit builds); static check S8 passed)

**C23 (backed, test, author confidence high):** The generator diagnostic tests write formatter members by hand so that the source compiles when the generator declines, and use markup to pin each expected diagnostic id and location.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **static check** (tests named (FormatterMustBePartial, FormatterMustImplementFormatterOfT, FormattedTypeMustNotBeAbstract, SurrogateMemberMustMatchFormattedType, SurrogateMemberMustHaveMatchingType, SurrogateKeysMustNotMixStringAndInt) but not run: build failed (introduced by this change: the base commit builds); static check S8 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 4 of its 14 sentences.
Requirement sentences no claim quotes (10; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…

## 5. Findings (18)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | low | `GeneratedFormatterCollector.cs` L85 | needsCast compares `m.Name` with "OnBeforeSerialize"/"OnAfterDeserialize" on explicit interface implementations. Roslyn names explicit implementations with the interface prefix (e.g. "MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize"), so this never matches. A type that implements the callbacks explicitly would get generated code calling `value.OnBeforeSerialize()` without a | author (Claude) |
| F2 | medium | `GeneratedFormatterCollector.cs` L47 | IsPartial checks only the formatter's own declaration. If the formatter is nested in a non-partial type, the generator still emits nesting types, and the user gets raw compiler errors instead of MsgPack019, although the docs (MsgPack019.md line 26) say containing types must be partial. Formatter accessibility (e.g. a private nested formatter the resolver cannot reach) is not checked either. | author (Claude) |
| F3 | medium | `Directory.Packages.props` L10 | Raising the analyzer Roslyn dependency to 4.14.0 raises the minimum Visual Studio/SDK version needed to load the MessagePack analyzer/generator for all users. The requirement does not call for it and the diff gives no reason. | author (Claude) |
| F4 | low | `GeneratedFormatterCollector.cs` L161 | GetInstanceMembers(surrogate) includes private fields and properties. Any surrogate member, including private helpers, without [Key] or [IgnoreMember] stops generation with MemberNeedsKey. This is stricter than the docs suggest. | author (Claude) |
| F5 | low | `MessagePackGenerator.cs` L72 | Nothing stops two [GeneratedMessagePackFormatter] classes for the same T, or one targeting a type that already has [MessagePackObject]. Both would be added to the resolver, and the outcome (duplicate registration or compile error) is untested. | author (Claude) |
| F6 | low | `MessagePackGenerator.cs` L117 | The collector runs twice per formatter, once for the model and once for diagnostics. The incremental pipeline also carries INamedTypeSymbol values, which defeats caching across compilations. This is a performance cost, not a correctness issue. | author (Claude) |
| F7 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109: Detected package downgrade: Microsoft.Bcl.AsyncInterfaces from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version. | test run |
| F8 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.CodeAnalysis.CSharp.Workspaces 4.14.0 -> Microsoft.Bcl.AsyncInterfaces (>= 9.0.0) | test run |
| F9 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.Analyzers.CodeFixes.csproj : error NU1109:  MessagePack.Analyzers.CodeFixes -> Microsoft.Bcl.AsyncInterfaces (>= 8.0.0) | test run |
| F10 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version. | test run |
| F11 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0) | test run |
| F12 | medium | - | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) | test run |
| F13 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: Microsoft.CodeAnalysis.Analyzers from 3.11.0 to centrally defined 3.3.4. Update the centrally managed package version to a higher version. | test run |
| F14 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> Microsoft.CodeAnalysis.Analyzers (>= 3.11.0) | test run |
| F15 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.Analyzers (>= 3.3.4) | test run |
| F16 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109: Detected package downgrade: System.Collections.Immutable from 9.0.0 to centrally defined 8.0.0. Update the centrally managed package version to a higher version. | test run |
| F17 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> Microsoft.CodeAnalysis.CSharp 4.14.0 -> System.Collections.Immutable (>= 9.0.0) | test run |
| F18 | medium | - | New compile error vs base in MessagePack.SourceGenerator.MapModeExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): MessagePack.SourceGenerator.csproj : error NU1109:  MessagePack.SourceGenerator -> System.Collections.Immutable (>= 8.0.0) | test run |

**Out of scope changes:**
- `Directory.Packages.props`: Raises the analyzer-project Roslyn version from 4.12.0 to 4.14.0.
- `src/MessagePack.Annotations/Attributes.cs`: Adds the `SurrogateType` property, a key-mapping design that none of the three alternatives in the issue proposes.

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

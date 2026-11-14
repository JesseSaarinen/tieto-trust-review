# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `30ae790bfae2` (seeded-03.run3.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 587 of 884 changed code lines (66%).** Docs: 159 lines, read with the story. Of everything changed: 56%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 8 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 297 of 884 changed code lines off the list (C8, C9, C10, C12, C13, C14, C15, C18: tests found passing in the real run; breaker removed for this measurement). 587 stay with the owner.
- Why lines stay: 226 cited only by claims without a passing test; 179 claim rests on AI reading only; 160 refused; 19 no claim covers the line; 3 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353 (36 of 46 changed lines): R3 contracts (AI-suggested); no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-23, L52, L62, L82-292, L300 (237 of 300 changed lines): claim C7 only AI-read; no claim covers these lines; claim C11 only AI-read; R4 contracts (AI-suggested); claim C5 only AI-read; F1 author (Claude); R5 honesty (AI-suggested); claim C6 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C16 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C17 has no passing test behind it; F7 test run; F9 test run; F11 test run; F12 test run; F8 test run; F10 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C17 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C17 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L103, L171, L210 (3 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 297 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C15, C8, C9, C10, C14, C18, C12, C13

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `c937668c7ac0` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (5)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | New user-visible error rules MsgPack019-MsgPack022 | New analyzer/generator diagnostics shipped to users (S4 fail). | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | Contractless default wire format (string-keyed map, ordinal name order) for external types | This defines serialized output for user types and is currently broken by the off-by-one, which drops a member. | `GeneratedFormatterCollector.cs` L128-141 | AI reading |
| R5 | honesty | The agent chose a surrogate-type design rather than any of the three options the issue proposes | A design decision beyond the literal requirement that the maintainers should choose. | `GeneratedFormatterCollector.cs` L143-213 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations. It has an optional `SurrogateType` property. The source generator finds partial classes marked with it that implement `IMessagePackFormatter<T>`, builds an object model for `T`, writes the formatter body into the user's partial class, and registers it in `GeneratedMessagePackResolver`. There are two modes. Without a surrogate, contractless mode serializes public read-write members under string keys. With a surrogate, the surrogate's `[Key]` and `[IgnoreMember]` attributes are matched to `T` by member name and type. Four new error diagnostics (MsgPack019-022) cover misuse. The change also adds a test-only ExternalTypes assembly with no MessagePack reference, execution tests, generator diagnostic tests, a README section and analyzer docs.

**Why:** REQ-2129 asks for a formatter for a type in a referenced assembly that cannot depend on MessagePack, generated in the consuming project from a partial class marked with `[GeneratedMessagePackFormatter]`. The issue lists three options for supplying keys. The change picks none of them and invents a surrogate type instead.

**Touches beyond the requirement:**
- New public API: GeneratedMessagePackFormatterAttribute and its SurrogateType property (S3 fail).
- Four new user-visible error rules, MsgPack019-022, with release notes and docs (S4 fail).
- GeneratedFormatterRequest is declared as a public record in the generator assembly.
- The surrogate-type design and the contractless default are design choices made by the agent; neither is one of the issue's proposed options.
- GeneratorUtilities now excludes these formatters from the hand-written custom formatter list.
- MapModeExecutionTests now excludes the new execution test files.
- README section and analyzer doc pages.

**How sure (the author's own view; it moves nothing):** Wiring is plausible: attribute discovery, the partial-class template switch and resolver registration. Contractless member collection has an off-by-one at GeneratedFormatterCollector.cs L135 that drops the last member. The new execution tests ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers and ContractlessStructRoundTrips should therefore fail; if they pass, something else is going on. Surrogate mode and the diagnostics look consistent with their tests. Medium-to-low overall.

## 4. Claims (20)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | A public class-only attribute GeneratedMessagePackFormatterAttribute (AllowMultiple=false, Inherited=false) is added to MessagePack.Annotations, with a nullable `Type? SurrogateType` settable property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the SurrogateType named argument into a GeneratedFormatterRequest and feeds the requests into the combined pipeline. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C3 | unverified | Existing tuple accessors are shifted for the extra Combine. Each request's model from GeneratedFormatterCollector.Collect is added to modelPerType, so the formatter ends up in GeneratedMessagePackResolver. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C5 | unverified | Contractless mode is meant to serialize every public read-write instance property and field (including base types, excluding indexers, statics and implicit members), ordered by name, under string keys. As written, the loop stops at Count - 1 and drops the last member. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C6 | unverified | Surrogate mode behaves as follows. [IgnoreMember] surrogate members are skipped. Each other surrogate member must carry an int or string [Key]. Keys must not mix kinds and must be unique. Each member must match a public read-write member of T with the same name and type. Int keys become array indexes; string keys become map keys. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | - | no |
| C7 | unverified | Helpers build a MemberSerializationInfo for each target member. They mark the member readable and writable, carry the init-only and required flags, and use fully qualified type names (BinaryWriteTypeFormat for the short name). | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C11 | unverified | Callback-receiver detection and assembly of the ObjectSerializationInfo/FullModel for T, with Formatter set to the user's class. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C16 | unverified | Classes carrying the attribute are excluded from the hand-written custom formatter discovery, so they are not registered twice. | (scope) | AI reading only | - | no |
| C20 | unverified | Documentation covers the new attribute, contractless and surrogate modes, limitations, and rules MsgPack019-022. | (scope) | AI reading only | - | no |
| C4 | backed | When IsUserDeclaredFormatter is set, both formatter templates emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's empty partial class. The flag is part of ObjectSerializationInfo equality and is set by the collector. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C8 | backed | A non-partial class with the attribute produces MsgPack019 and no model. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes" | test run | - | yes |
| C9 | backed | The class must implement exactly one closed IMessagePackFormatter<T>; otherwise MsgPack020 is reported. | "partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C10 | backed | T must be an accessible, non-generic, non-abstract class or struct (otherwise MsgPack021). Classes also need an accessible parameterless constructor (otherwise MsgPack007). | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | test run | - | yes |
| C12 | backed | A surrogate member whose name or type has no match on T reports MsgPack022 at the surrogate member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | - | yes |
| C13 | backed | Mixing int and string keys on the surrogate reports MsgPack005 at the offending member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | - | yes |
| C14 | backed | Collector diagnostics come from a separate incremental branch that re-runs Collect with a diagnostic sink and reports through RegisterSourceOutput. | (scope) | test run | - | yes |
| C15 | backed | Four new error descriptors, MsgPack019-022, are added to SupportedDiagnostics and to the unshipped release notes. This is a new user-visible rule set. | (scope) | test run | - | yes |
| C17 | backed | The tests model the requirement. A separate ExternalTypes assembly with no MessagePack reference supplies ExternalPerson, ExternalPoint and ExternalWidget. The execution test project references it, declares empty partial formatters for them, and round-trips values through GeneratedMessagePackResolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C18 | backed | The generator diagnostic test class uses shared hand-written Serialize/Deserialize members, so test sources compile even when the generator rejects the formatter. | (scope) | test run | - | yes |
| C19 | backed | MapModeExecutionTests stops compiling the new external-type test files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** A public class-only attribute GeneratedMessagePackFormatterAttribute (AllowMultiple=false, Inherited=false) is added to MessagePack.Annotations, with a nullable `Type? SurrogateType` settable property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C2 (unverified, behavior, author confidence medium):** The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the SurrogateType named argument into a GeneratedFormatterRequest and feeds the requests into the combined pipeline.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C3 (unverified, behavior, author confidence medium):** Existing tuple accessors are shifted for the extra Combine. Each request's model from GeneratedFormatterCollector.Collect is added to modelPerType, so the formatter ends up in GeneratedMessagePackResolver.
- Lines: `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C5 (unverified, behavior, author confidence low):** Contractless mode is meant to serialize every public read-write instance property and field (including base types, excluding indexers, statics and implicit members), ordered by name, under string keys. As written, the loop stops at Count - 1 and drops the last member.
- Lines: `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)

**C6 (unverified, behavior, author confidence medium):** Surrogate mode behaves as follows. [IgnoreMember] surrogate members are skipped. Each other surrogate member must carry an int or string [Key]. Keys must not mix kinds and must be unique. Each member must match a public read-write member of T with the same name and type. Int keys become array indexes; string keys become map keys.
- Lines: `GeneratedFormatterCollector.cs` L143-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run)

**C7 (unverified, behavior, author confidence medium):** Helpers build a MemberSerializationInfo for each target member. They mark the member readable and writable, carry the init-only and required flags, and use fully qualified type names (BinaryWriteTypeFormat for the short name).
- Lines: `GeneratedFormatterCollector.cs` L1-22, `GeneratedFormatterCollector.cs` L215-244, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C11 (unverified, behavior, author confidence medium):** Callback-receiver detection and assembly of the ObjectSerializationInfo/FullModel for T, with Formatter set to the user's class.
- Lines: `GeneratedFormatterCollector.cs` L83-126
- Checked by: **AI reading only** (named test `ContractlessClassNullRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C16 (unverified, behavior, author confidence medium):** Classes carrying the attribute are excluded from the hand-written custom formatter discovery, so they are not registered twice.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C20 (unverified, docs, author confidence high):** Documentation covers the new attribute, contractless and surrogate modes, limitations, and rules MsgPack019-022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**

**C4 (backed, behavior, author confidence medium):** When IsUserDeclaredFormatter is set, both formatter templates emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's empty partial class. The flag is part of ObjectSerializationInfo equality and is set by the collector.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L116-119
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed)

**C8 (backed, behavior, author confidence high):** A non-partial class with the attribute produces MsgPack019 and no model.
- Lines: `GeneratedFormatterCollector.cs` L24-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))

**C9 (backed, behavior, author confidence high):** The class must implement exactly one closed IMessagePackFormatter<T>; otherwise MsgPack020 is reported.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))

**C10 (backed, behavior, author confidence medium):** T must be an accessible, non-generic, non-abstract class or struct (otherwise MsgPack021). Classes also need an accessible parameterless constructor (otherwise MsgPack007).
- Lines: `GeneratedFormatterCollector.cs` L63-81
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))

**C12 (backed, test, author confidence high):** A surrogate member whose name or type has no match on T reports MsgPack022 at the surrogate member.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `GeneratedMessagePackFormatterTests.cs` L104-170
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))

**C13 (backed, test, author confidence high):** Mixing int and string keys on the surrogate reports MsgPack005 at the offending member.
- Lines: `GeneratedFormatterCollector.cs` L181-187, `GeneratedMessagePackFormatterTests.cs` L172-209
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C14 (backed, behavior, author confidence medium):** Collector diagnostics come from a separate incremental branch that re-runs Collect with a diagnostic sink and reports through RegisterSourceOutput.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C15 (backed, scope, author confidence high):** Four new error descriptors, MsgPack019-022, are added to SupportedDiagnostics and to the unshipped release notes. This is a new user-visible rule set.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-352, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C17 (backed, test, author confidence medium):** The tests model the requirement. A separate ExternalTypes assembly with no MessagePack reference supplies ExternalPerson, ExternalPoint and ExternalWidget. The execution test project references it, declares empty partial formatters for them, and round-trips values through GeneratedMessagePackResolver.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50, `GeneratedFormatterForExternalTypesTests.cs` L1-95
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S7 passed; static check S8 passed)

**C18 (backed, test, author confidence high):** The generator diagnostic test class uses shared hand-written Serialize/Deserialize members, so test sources compile even when the generator rejects the formatter.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-102
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); static check S8 passed)

**C19 (backed, scope, author confidence high):** MapModeExecutionTests stops compiling the new external-type test files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode.
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
| F1 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: `i < targets.Count - 1` drops the last public read-write member. Contractless formatters silently skip a member: Label on ExternalPerson, Y on ExternalPoint. This is data loss on the wire. ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers (expects 0x82) and ContractlessStructRoundTrips should fail. | author (Claude) |
| F2 | low | `GeneratedFormatterCollector.cs` L79 | The NoDeserializingConstructor diagnostic is created without message arguments. If its messageFormat has placeholders, the message is malformed. This path has no test. | author (Claude) |
| F3 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate mode enumerates every non-implicit instance field and property of the surrogate, including private or helper members. Any member without [Key] or [IgnoreMember] fails the whole formatter with MsgPack004. The README says 'only the members it lists are serialized', but members without [Key] are not skipped; they are errors. | author (Claude) |
| F4 | low | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter class, not its containing types. The MsgPack019 doc says nesting types must also be partial. A nested formatter inside a non-partial type gets generated output that fails to compile, without a targeted diagnostic. | author (Claude) |
| F5 | low | `GeneratedFormatterRequest.cs` L13 | The incremental pipeline value holds ISymbol instances. Symbols differ on every compilation, so caching is defeated. The diagnostics branch at MessagePackGenerator L117-129 runs Collect a second time per formatter on every edit. | author (Claude) |
| F6 | low | `GeneratorUtilities.cs` L38 | Attribute matching uses a ToDisplayString string compare. Excluding these formatters from custom-formatter discovery may also hide them from analyzer checks that use the same list. For example, the analyzer might then flag MsgPack003 on [MessagePackObject] types such as ContainsExternalPerson that hold ExternalPerson. This is unverified. | author (Claude) |
| F7 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F8 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F9 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F10 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F11 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F12 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs`: A new public record type in the source generator assembly; it could be internal.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes the new test files from map-mode execution tests.
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs`: The surrogate-type mechanism is a design not among the three alternatives in the issue.

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

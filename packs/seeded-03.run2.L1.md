# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `ec807dea33b3` (seeded-03.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 587 of 884 changed code lines (66%).** Docs: 159 lines, read with the story. Of everything changed: 56%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 2 refusal(s) on contracts grounds need a human look.
- 9 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 297 of 884 changed code lines off the list (C6, C7, C8, C13, C14, C17, C18, C25: tests found passing in the real run; breaker removed for this measurement). 587 stay with the owner.
- Why lines stay: 258 cited only by claims without a passing test; 213 claim rests on AI reading only; 86 refused; 27 no claim covers the line; 3 named by a finding.

**The owner must read** (21 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L143-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-352 (35 of 46 changed lines): R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L52, L62, L75-180, L188, L199-285, L292, L300 (241 of 300 changed lines): claim C16 only AI-read; no claim covers these lines; claim C9 only AI-read; claim C10 only AI-read; C4 has no passing test behind it; R4 contracts (AI-suggested); F1 author (Claude); claim C12 only AI-read; C15 has no passing test behind it; claim C11 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C5 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; claim C3 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C19 has no passing test behind it; F6 test run; F8 test run; F10 test run; F11 test run; F7 test run; F9 test run; no claim covers these lines; C24 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C20 has no passing test behind it; no claim covers these lines; C21 has no passing test behind it; C22 has no passing test behind it; C23 has no passing test behind it; C24 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C19 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C26 has no passing test behind it

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 297 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C18, C6, C7, C8, C13, C14, C17, C25

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `3aef24220e9a` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (4)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | New diagnostic descriptors and their message texts. | User-visible analyzer rule definitions. | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | Contractless wire format for external types: a string-key map of public read-write members sorted by ordinal name. Surrogate string keys get sequential indices. | Defines the serialized output for these types going forward, and the current loop already drops a member. | `GeneratedFormatterCollector.cs` L131-141 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute with an optional `SurrogateType` property. The source generator now fills in the body of a user-declared `partial` class that implements `IMessagePackFormatter<T>`, even when `T` lives in an assembly with no MessagePack reference. It also registers that class in `GeneratedMessagePackResolver`. Without a surrogate, `T` is serialized contractless: public read-write members, string keys, sorted by name. With a surrogate, the `[Key]` and `[IgnoreMember]` attributes on the surrogate define the contract, and its members are matched to `T`'s members by name and type. Four new error diagnostics (MsgPack019–022) reject bad declarations. The change also adds docs, a MessagePack-free test library, execution tests and generator diagnostic tests.

**Why:** REQ-2129: Project B must be able to source-generate a formatter for `ProjectA.MyType`, where Project A cannot reference MessagePack. The surrogate is the agent's own design for keyed contracts. It is not one of the three options the issue lists.

**Touches beyond the requirement:**
- New public API in MessagePack.Annotations (`GeneratedMessagePackFormatterAttribute`, `SurrogateType`).
- Four new user-visible analyzer rules MsgPack019–MsgPack022, plus reuse of MsgPack004/005/006/007.
- Surrogate-type mechanism: a design choice not among the options in the issue.
- Shared formatter T4 templates now emit `partial class` for user-declared formatters.
- The custom-formatter discovery in GeneratorUtilities now skips attributed classes.
- New test project MessagePack.SourceGenerator.ExternalTypes, and a MapMode test csproj change that excludes the new tests.
- README and analyzer docs.

**How sure (the author's own view; it moves nothing):** Plumbing looks consistent: attribute discovery, pipeline merge, partial-class emission and diagnostics. The contractless member collector has an off-by-one (`i < targets.Count - 1`) that drops the alphabetically last member. That should make the contractless execution tests fail (ExternalPerson.Label, ExternalPoint.Y, and the 0x82 map header). Surrogate mode does not go through that loop and looks correct. The diagnostic tests cover MsgPack019/020/021 (abstract only), 022 and 005. The parameterless-constructor check, generic data types and callback receivers are untested.

## 4. Claims (27)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | A public, non-inherited, class-only `GeneratedMessagePackFormatterAttribute` with a nullable `Type SurrogateType` property is added to the MessagePack namespace in MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C2 | unverified | The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent, into a GeneratedFormatterRequest. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | - | no |
| C3 | unverified | Requests are combined with the existing object/union inputs (tuple indices shifted one level). Each successful GeneratedFormatterCollector model is added to the per-type models that feed the generated resolver. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | - | no |
| C5 | unverified | Classes carrying `[GeneratedMessagePackFormatter]` are excluded from hand-written custom formatter discovery, so they are not registered twice in the resolver. | (scope) | AI reading only | - | no |
| C9 | unverified | A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. | (scope) | AI reading only | - | no |
| C10 | unverified | In contractless mode (no surrogate) every public read-write instance property/field is serialized under its own name as a string key. The code as written skips the last member in name order because of the `Count - 1` loop bound, so this claim does not hold. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | - | no |
| C11 | unverified | GetInstanceMembers walks the type and its base types up to object. It skips static, compiler-generated and indexer members and keeps only the most derived member of each name. | (scope) | AI reading only | - | no |
| C12 | unverified | In surrogate mode, members with [IgnoreMember] are skipped. Every other surrogate instance member must carry an int or string [Key], or MsgPack004 is reported. | "Allow the generator and analyzers to work with user-defined versions of the MessagePack at…" | AI reading only | - | no |
| C16 | unverified | CreateMember builds a writable/readable MemberSerializationInfo with init-only/required flags, fully qualified and short type names, and no DeclaringType. Callback-receiver detection on T sets the callback/cast flags. | (scope) | AI reading only | - | no |
| C27 | unverified | The README and analyzer docs describe the attribute, contractless/surrogate modes, limitations, and MsgPack019–022. | (scope) | AI reading only | - | no |
| C4 | backed | An ObjectSerializationInfo built for an attributed formatter sets Formatter to the user's class and IsUserDeclaredFormatter=true, which takes part in equality. Both the int-key and string-key templates then emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's declaration. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | - | no |
| C6 | backed | A non-partial attributed class gets MsgPack019 at the class location, and no model is produced. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C7 | backed | An attributed class that does not implement exactly one closed IMessagePackFormatter<T> gets MsgPack020. | "partial classes implementing `IMessagePackFormatter<T>`" | test run | - | yes |
| C8 | backed | The data type T must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract case is tested. | (scope) | test run | - | yes |
| C13 | backed | Mixing int and string keys in a surrogate reports MsgPack005 (DoNotMixStringAndIntKeys) at the offending member. | (scope) | test run | - | yes |
| C14 | backed | A keyed surrogate member must match a public read-write member of T with the same name and the same type; otherwise MsgPack022 is reported at the surrogate member. | (scope) | test run | - | yes |
| C15 | backed | Duplicate surrogate keys report MsgPack (KeysMustBeUnique). Int keys keep their numeric value, and string-keyed members get sequential int indices. The resulting key kind sets isIntKey, so keys 3 and 7 produce an 8-slot array. | (scope) | static check | - | no |
| C17 | backed | Diagnostics for attributed formatters are produced by a separate pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. The model pipeline passes a null sink. | (scope) | test run | - | yes |
| C18 | backed | Four new Error-severity descriptors MsgPack019–022 are declared, added to SupportedDiagnostics, and listed in AnalyzerReleases.Unshipped.md. | (scope) | test run | - | yes |
| C19 | backed | The execution tests model the issue's scenario. A new ExternalTypes project with no MessagePack reference defines ExternalPerson/ExternalPoint/ExternalWidget. The test project references it and declares empty partial formatters plus a surrogate. | "Project B ... References ... Project A ... because the latter has no (and cannot have) ref…" | static check | - | no |
| C20 | backed | Test ContractlessClassRoundTrips round-trips an ExternalPerson through GeneratedMessagePackResolver and asserts both Id and Label. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | - | no |
| C21 | backed | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a 2-entry fixmap with Id/Label string keys and no read-only Doubled. | (scope) | static check | - | no |
| C22 | backed | Test ContractlessClassNullRoundTrips round-trips a null reference; ContractlessStructRoundTrips round-trips a struct (X, Y). | (scope) | static check | - | no |
| C23 | backed | Test SurrogateControlsKeysAndMembership asserts an 8-element array from keys 3/7 and that the [IgnoreMember] Internal value is not round-tripped. | (scope) | static check | - | no |
| C24 | backed | Test MessagePackObjectCanContainExternalTypes checks that a [MessagePackObject] containing external types resolves their generated formatters. GeneratedFormattersAreRegisteredInGeneratedResolver checks that the resolver returns the user's formatter classes. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | static check | - | no |
| C25 | backed | The generator diagnostic test class uses hand-written Serialize/Deserialize members so the test sources compile when generation is declined. The shared fixture lines belong to the diagnostic tests. | (scope) | test run | - | yes |
| C26 | backed | MapModeExecutionTests now excludes GeneratedFormatterForExternalTypes*.cs, because that project does not reference ExternalTypes. The new feature is therefore not exercised in force-map mode. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** A public, non-inherited, class-only `GeneratedMessagePackFormatterAttribute` with a nullable `Type SurrogateType` property is added to the MessagePack namespace in MessagePack.Annotations.
- Lines: `Attributes.cs` L143-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C2 (unverified, behavior, author confidence high):** The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent, into a GeneratedFormatterRequest.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C3 (unverified, behavior, author confidence medium):** Requests are combined with the existing object/union inputs (tuple indices shifted one level). Each successful GeneratedFormatterCollector model is added to the per-type models that feed the generated resolver.
- Lines: `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C5 (unverified, behavior, author confidence medium):** Classes carrying `[GeneratedMessagePackFormatter]` are excluded from hand-written custom formatter discovery, so they are not registered twice in the resolver.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)

**C9 (unverified, behavior, author confidence low):** A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**

**C10 (unverified, behavior, author confidence low):** In contractless mode (no surrogate) every public read-write instance property/field is serialized under its own name as a string key. The code as written skips the last member in name order because of the `Count - 1` loop bound, so this claim does not hold.
- Lines: `GeneratedFormatterCollector.cs` L87-102, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L277-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run)

**C11 (unverified, behavior, author confidence medium):** GetInstanceMembers walks the type and its base types up to object. It skips static, compiler-generated and indexer members and keeps only the most derived member of each name.
- Lines: `GeneratedFormatterCollector.cs` L246-275
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run)

**C12 (unverified, behavior, author confidence medium):** In surrogate mode, members with [IgnoreMember] are skipped. Every other surrogate instance member must carry an int or string [Key], or MsgPack004 is reported.
- Lines: `GeneratedFormatterCollector.cs` L143-179
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C16 (unverified, behavior, author confidence medium):** CreateMember builds a writable/readable MemberSerializationInfo with init-only/required flags, fully qualified and short type names, and no DeclaringType. Callback-receiver detection on T sets the callback/cast flags.
- Lines: `GeneratedFormatterCollector.cs` L1-42, `GeneratedFormatterCollector.cs` L83-85, `GeneratedFormatterCollector.cs` L215-244
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)

**C27 (unverified, docs, author confidence high):** The README and analyzer docs describe the attribute, contractless/surrogate modes, limitations, and MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**

**C4 (backed, behavior, author confidence medium):** An ObjectSerializationInfo built for an attributed formatter sets Formatter to the user's class and IsUserDeclaredFormatter=true, which takes part in equality. Both the int-key and string-key templates then emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's declaration.
- Lines: `GeneratedFormatterCollector.cs` L104-126, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `FormatterTemplate.cs` L33-35, `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.cs` L37-39, `StringKeyFormatterTemplate.tt` L18-18
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S1 passed; static check S5 passed)

**C6 (backed, behavior, author confidence high):** A non-partial attributed class gets MsgPack019 at the class location, and no model is produced.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))

**C7 (backed, behavior, author confidence high):** An attributed class that does not implement exactly one closed IMessagePackFormatter<T> gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))

**C8 (backed, behavior, author confidence medium):** The data type T must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract case is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))

**C13 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate reports MsgPack005 (DoNotMixStringAndIntKeys) at the offending member.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))

**C14 (backed, behavior, author confidence high):** A keyed surrogate member must match a public read-write member of T with the same name and the same type; otherwise MsgPack022 is reported at the surrogate member.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))

**C15 (backed, behavior, author confidence medium):** Duplicate surrogate keys report MsgPack (KeysMustBeUnique). Int keys keep their numeric value, and string-keyed members get sequential int indices. The resulting key kind sets isIntKey, so keys 3 and 7 produce an 8-slot array.
- Lines: `GeneratedFormatterCollector.cs` L200-213
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S5 passed)

**C17 (backed, behavior, author confidence high):** Diagnostics for attributed formatters are produced by a separate pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. The model pipeline passes a null sink.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C18 (backed, scope, author confidence high):** Four new Error-severity descriptors MsgPack019–022 are declared, added to SupportedDiagnostics, and listed in AnalyzerReleases.Unshipped.md.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-353, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))

**C19 (backed, test, author confidence high):** The execution tests model the issue's scenario. A new ExternalTypes project with no MessagePack reference defines ExternalPerson/ExternalPoint/ExternalWidget. The test project references it and declares empty partial formatters plus a surrogate.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-37
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)

**C20 (backed, test, author confidence medium):** Test ContractlessClassRoundTrips round-trips an ExternalPerson through GeneratedMessagePackResolver and asserts both Id and Label.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L1-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)

**C21 (backed, test, author confidence medium):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a 2-entry fixmap with Id/Label string keys and no read-only Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)

**C22 (backed, test, author confidence medium):** Test ContractlessClassNullRoundTrips round-trips a null reference; ContractlessStructRoundTrips round-trips a struct (X, Y).
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-52
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; static check S8 passed)

**C23 (backed, test, author confidence high):** Test SurrogateControlsKeysAndMembership asserts an 8-element array from keys 3/7 and that the [IgnoreMember] Internal value is not round-tripped.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)

**C24 (backed, test, author confidence medium):** Test MessagePackObjectCanContainExternalTypes checks that a [MessagePackObject] containing external types resolves their generated formatters. GeneratedFormattersAreRegisteredInGeneratedResolver checks that the resolver returns the user's formatter classes.
- Lines: `GeneratedFormatterForExternalTypes.cs` L39-50, `GeneratedFormatterForExternalTypesTests.cs` L71-95
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)

**C25 (backed, test, author confidence high):** The generator diagnostic test class uses hand-written Serialize/Deserialize members so the test sources compile when generation is declined. The shared fixture lines belong to the diagnostic tests.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case); static check S7 passed; static check S8 passed)

**C26 (backed, scope, author confidence high):** MapModeExecutionTests now excludes GeneratedFormatterForExternalTypes*.cs, because that project does not reference ExternalTypes. The new feature is therefore not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **static check** (static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 14 sentences.
Requirement sentences no claim quotes (8; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- As for the attribute-based property keys and other settings (such as Union), I can think of 3 alternatives:
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…
- This would allow using the attributes without adding an additional runtime dependency.

## 5. Findings (11)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: `for (int i = 0; i < targets.Count - 1; i++)` drops the last member in ordinal name order, and a type with one member gets zero. ExternalPerson would serialize only Id (Label lost), and ExternalPoint only X. ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers (expects 0x82), ContractlessStructRoundTrips and MessagePackObjectCanContainExternalTypes shou | author (Claude) |
| F2 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate mode iterates all instance fields and properties of the surrogate, including private, readonly and non-public members. Any such member without [Key] or [IgnoreMember] aborts generation with MsgPack004, so a surrogate with a private helper field cannot be used. | author (Claude) |
| F3 | low | `MessagePackGenerator.cs` L32 | GeneratedFormatterRequest carries INamedTypeSymbol instances through the incremental pipeline. Symbols differ per compilation, so the record never compares equal and every edit re-runs collection and the diagnostics pipeline. This defeats incremental caching and can root old compilations. | author (Claude) |
| F4 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with no message arguments. If the existing descriptor's message format has placeholders, the message renders unformatted. This path is untested. | author (Claude) |
| F5 | low | `GeneratedFormatterRequest.cs` L13 | GeneratedFormatterRequest is declared public in the generator assembly, although only internal code uses it. | author (Claude) |
| F6 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F7 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F8 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F9 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F10 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F11 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: The SurrogateType property and surrogate-based keying are the agent's own design, beyond the three options suggested in the issue.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes the new execution tests from map-mode runs.
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

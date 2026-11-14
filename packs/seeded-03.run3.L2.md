# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `30ae790bfae2` (seeded-03.run3.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 626 of 884 changed code lines (71%).** Docs: 159 lines, read with the story. Of everything changed: 60%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 3 refusal(s) on contracts/honesty grounds need a human look.
- 7 claim(s) disputed by the breaker or by the evidence check.
- 5 behaviour claim(s) rest on AI reading only (no passing test).
- 3 high-severity finding(s).
- Evidence took 258 of 884 changed code lines off the list (C8, C12, C13, C14, C18: tests found passing in the real run, claim upheld by the breaker). 626 stay with the owner.
- Why lines stay: 320 claim disputed; 160 refused; 95 claim rests on AI reading only; 21 cited only by claims without a passing test; 19 no claim covers the line; 11 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): claim C15 disputed (L26-29); R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L32-35, L318-353, L381-385, L388 (46 of 46 changed lines): claim C15 disputed; R3 contracts (AI-suggested); no claim covers these lines; F6 breaker (Gemini); F20 breaker (Gemini) (unchanged line)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-23, L52-293, L300 (266 of 300 changed lines): claim C7 only AI-read; no claim covers these lines; F17 breaker (Gemini); claim C9 disputed; F3 breaker (Gemini); claim C10 disputed; F4 breaker (Gemini); claim C11 disputed; F5 breaker (Gemini); F14 breaker (Gemini); R4 contracts (AI-suggested); claim C5 disputed; F1 breaker (Gemini); F7 breaker (Gemini); F8 author (Claude); R5 honesty (AI-suggested); claim C6 disputed; F19 breaker (Gemini); F2 breaker (Gemini); F15 breaker (Gemini); F16 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C16 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; F18 breaker (Gemini); claim C3 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): claim C17 disputed; F21 test run; F23 test run; F25 test run; F26 test run; F22 test run; F24 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): claim C17 disputed
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): claim C17 disputed; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): claim C17 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): claim C17 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): claim C17 disputed
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): claim C17 disputed
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L103, L171, L210 (3 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 258 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C8, C14, C18, C12, C13

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `076a971012b5` |

## 1. Disputed claims (7)
**C5 (DISPUTED, behavior, author confidence low):** Contractless mode is meant to serialize every public read-write instance property and field (including base types, excluding indexers, statics and implicit members), ordered by name, under string keys. As written, the loop stops at Count - 1 and drops the last member.
- Lines: `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)
- Breaker: **disputed**: The contractless requirement is broken at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs line 135 because for (int i = 0; i < targets.Count - 1; i++) drops the last public read-write member (and serializes nothing for 1-member types). Consequently, all three named tests in tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs (ContractlessClassRoundTrips at line 20, ContractlessClassUsesStringKeysForPublicReadWriteMembers at lines 29 and 32, and ContractlessStructRoundTrips at line 51) fail at runtime because Label and Y are omitted.

**C6 (DISPUTED, behavior, author confidence medium):** Surrogate mode behaves as follows. [IgnoreMember] surrogate members are skipped. Each other surrogate member must carry an int or string [Key]. Keys must not mix kinds and must be unique. Each member must match a public read-write member of T with the same name and type. Int keys become array indexes; string keys become map keys.
- Lines: `GeneratedFormatterCollector.cs` L143-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run)
- Breaker: **disputed**: In src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs, line 171 and lines 206-207 accept negative integer [Key] values (such as -1), which cannot serve as array indexes; line 161 iterates GetInstanceMembers(surrogate) including private, protected, and internal fields/properties rather than just public contract members; named test MessagePackObjectCanContainExternalTypes fails at tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs line 83 because ExternalPersonFormatter drops Label; and neither named test covers string keys, duplicate keys (MsgPack006 at line 202), or missing keys (MsgPack003 at line 173) on a surrogate.

**C9 (DISPUTED, behavior, author confidence high):** The class must implement exactly one closed IMessagePackFormatter<T>; otherwise MsgPack020 is reported.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **disputed**: src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 53-61 do not verify that IMessagePackFormatter<T> is closed: an open generic formatter such as partial class MyFormatter<T> : IMessagePackFormatter<T> has formatterInterfaces.Length == 1, passes line 57 without reporting MsgPack020, and instead reports MsgPack021 at line 68. Moreover, FormatterMustImplementFormatterOfT (tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 57-75) only tests zero interfaces and never tests multiple IMessagePackFormatter<T> implementations.

**C10 (DISPUTED, behavior, author confidence medium):** T must be an accessible, non-generic, non-abstract class or struct (otherwise MsgPack021). Classes also need an accessible parameterless constructor (otherwise MsgPack007).
- Lines: `GeneratedFormatterCollector.cs` L63-81
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **disputed**: Named test FormattedTypeMustNotBeAbstract (tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 78-102) only tests an abstract class; no test exercises generic T, inaccessible T, non-class/struct T, or the missing parameterless constructor MsgPack007 branch at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 76-81. In addition, line 66 checks compilation.IsSymbolAccessibleWithin(type, formatter) rather than accessibility from GeneratedMessagePackResolver, allowing a private nested type shared with a nested formatter to pass without MsgPack021 and break resolver compilation with CS0122.

**C11 (DISPUTED, behavior, author confidence medium):** Callback-receiver detection and assembly of the ObjectSerializationInfo/FullModel for T, with Formatter set to the user's class.
- Lines: `GeneratedFormatterCollector.cs` L83-126
- Checked by: **AI reading only** (named test `ContractlessClassNullRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: Callback-receiver cast detection at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 84-85 is broken: in Roslyn C#, an explicit interface implementation method has MethodKind.ExplicitInterfaceImplementation and its IMethodSymbol.Name includes the interface prefix (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize), so m.ExplicitInterfaceImplementations.Length > 0 && (m.Name == "OnBeforeSerialize" || m.Name == "OnAfterDeserialize") is always false, leaving needsCast false and causing CS1061 in generated code. Neither named test exercises IMessagePackSerializationCallbackReceiver.

**C15 (DISPUTED, scope, author confidence high):** Four new error descriptors, MsgPack019-022, are added to SupportedDiagnostics and to the unshipped release notes. This is a new user-visible rule set.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-352, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **disputed**: MsgPack019-022 are added to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics at src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs lines 382-385, but MsgPack00xMessagePackAnalyzer.Initialize (lines 387-389) has no changes and never emits any of those diagnostics (only MessagePackGenerator emits them). All four named tests in tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs (line 6) run CSharpSourceGeneratorVerifier<MessagePackGenerator> and never execute MsgPack00xMessagePackAnalyzer.

**C17 (DISPUTED, test, author confidence medium):** The tests model the requirement. A separate ExternalTypes assembly with no MessagePack reference supplies ExternalPerson, ExternalPoint and ExternalWidget. The execution test project references it, declares empty partial formatters for them, and round-trips values through GeneratedMessagePackResolver.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50, `GeneratedFormatterForExternalTypesTests.cs` L1-95
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S7 passed; static check S8 passed)
- Breaker: **disputed**: The execution tests do not successfully round-trip contractless external types: due to targets.Count - 1 in src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs line 135, ExternalPerson.Label and ExternalPoint.Y are never serialized or deserialized, causing ContractlessClassRoundTrips (line 20), ContractlessClassUsesStringKeysForPublicReadWriteMembers (lines 29 and 32), ContractlessStructRoundTrips (line 51), and MessagePackObjectCanContainExternalTypes (line 83) in tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs to fail.


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
| C5 | DISPUTED | Contractless mode is meant to serialize every public read-write instance property and field (including base types, excluding indexers, statics and implicit members), ordered by name, under string keys. As written, the loop stops at Count - 1 and drops the last member. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | disputed | no |
| C6 | DISPUTED | Surrogate mode behaves as follows. [IgnoreMember] surrogate members are skipped. Each other surrogate member must carry an int or string [Key]. Keys must not mix kinds and must be unique. Each member must match a public read-write member of T with the same name and type. Int keys become array indexes; string keys become map keys. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | disputed | no |
| C9 | DISPUTED | The class must implement exactly one closed IMessagePackFormatter<T>; otherwise MsgPack020 is reported. | "partial classes implementing `IMessagePackFormatter<T>`" | test run | disputed | no |
| C10 | DISPUTED | T must be an accessible, non-generic, non-abstract class or struct (otherwise MsgPack021). Classes also need an accessible parameterless constructor (otherwise MsgPack007). | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | test run | disputed | no |
| C11 | DISPUTED | Callback-receiver detection and assembly of the ObjectSerializationInfo/FullModel for T, with Formatter set to the user's class. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | disputed | no |
| C15 | DISPUTED | Four new error descriptors, MsgPack019-022, are added to SupportedDiagnostics and to the unshipped release notes. This is a new user-visible rule set. | (scope) | test run | disputed | no |
| C17 | DISPUTED | The tests model the requirement. A separate ExternalTypes assembly with no MessagePack reference supplies ExternalPerson, ExternalPoint and ExternalWidget. The execution test project references it, declares empty partial formatters for them, and round-trips values through GeneratedMessagePackResolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | disputed | no |
| C1 | unverified | A public class-only attribute GeneratedMessagePackFormatterAttribute (AllowMultiple=false, Inherited=false) is added to MessagePack.Annotations, with a nullable `Type? SurrogateType` settable property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the SurrogateType named argument into a GeneratedFormatterRequest and feeds the requests into the combined pipeline. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C3 | unverified | Existing tuple accessors are shifted for the extra Combine. Each request's model from GeneratedFormatterCollector.Collect is added to modelPerType, so the formatter ends up in GeneratedMessagePackResolver. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C7 | unverified | Helpers build a MemberSerializationInfo for each target member. They mark the member readable and writable, carry the init-only and required flags, and use fully qualified type names (BinaryWriteTypeFormat for the short name). | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C16 | unverified | Classes carrying the attribute are excluded from the hand-written custom formatter discovery, so they are not registered twice. | (scope) | AI reading only | upheld | no |
| C20 | unverified | Documentation covers the new attribute, contractless and surrogate modes, limitations, and rules MsgPack019-022. | (scope) | AI reading only | upheld | no |
| C4 | backed | When IsUserDeclaredFormatter is set, both formatter templates emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's empty partial class. The flag is part of ObjectSerializationInfo equality and is set by the collector. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | upheld | no |
| C8 | backed | A non-partial class with the attribute produces MsgPack019 and no model. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes" | test run | upheld | yes |
| C12 | backed | A surrogate member whose name or type has no match on T reports MsgPack022 at the surrogate member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | upheld | yes |
| C13 | backed | Mixing int and string keys on the surrogate reports MsgPack005 at the offending member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | upheld | yes |
| C14 | backed | Collector diagnostics come from a separate incremental branch that re-runs Collect with a diagnostic sink and reports through RegisterSourceOutput. | (scope) | test run | upheld | yes |
| C18 | backed | The generator diagnostic test class uses shared hand-written Serialize/Deserialize members, so test sources compile even when the generator rejects the formatter. | (scope) | test run | upheld | yes |
| C19 | backed | MapModeExecutionTests stops compiling the new external-type test files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence high):** A public class-only attribute GeneratedMessagePackFormatterAttribute (AllowMultiple=false, Inherited=false) is added to MessagePack.Annotations, with a nullable `Type? SurrogateType` settable property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.Annotations/Attributes.cs lines 165-177 and GeneratedFormattersAreRegisteredInGeneratedResolver in tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs lines 89-94; GeneratedMessagePackFormatterAttribute is public, targets Class with AllowMultiple=false and Inherited=false, and exposes Type? SurrogateType { get; set; }.

**C2 (unverified, behavior, author confidence medium):** The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the SurrogateType named argument into a GeneratedFormatterRequest and feeds the requests into the combined pipeline.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/MessagePackGenerator.cs lines 29-37, src/MessagePack.SourceGenerator/Utils/Constants.cs lines 17-18, and src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs lines 1-13; ForAttributeWithMetadataName matches ClassDeclarationSyntax, reads SurrogateType into GeneratedFormatterRequest, and combines the collected requests into the pipeline.

**C3 (unverified, behavior, author confidence medium):** Existing tuple accessors are shifted for the extra Combine. Each request's model from GeneratedFormatterCollector.Collect is added to modelPerType, so the formatter ends up in GeneratedMessagePackResolver.
- Lines: `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/MessagePackGenerator.cs lines 37 and 60-76; adding .Combine(generatedFormatters.Collect()) shifts the existing tuple accessors by one .Left and appends each non-null FullModel from GeneratedFormatterCollector.Collect to modelPerType.

**C7 (unverified, behavior, author confidence medium):** Helpers build a MemberSerializationInfo for each target member. They mark the member readable and writable, carry the init-only and required flags, and use fully qualified type names (BinaryWriteTypeFormat for the short name).
- Lines: `GeneratedFormatterCollector.cs` L1-22, `GeneratedFormatterCollector.cs` L215-244, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 19-22, 215-244, and 286-291; CreateMember and GetMemberType construct MemberSerializationInfo with IsReadable=true, IsWritable=true, IsInitOnly, IsRequired, FullyQualifiedFormat Type, and BinaryWriteTypeFormat ShortTypeName.

**C16 (unverified, behavior, author confidence medium):** Classes carrying the attribute are excluded from the hand-written custom formatter discovery, so they are not registered twice.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/GeneratorUtilities.cs lines 35-38; classes carrying MessagePack.GeneratedMessagePackFormatterAttribute are skipped during custom formatter discovery so they are not registered a second time.

**C20 (unverified, docs, author confidence high):** Documentation covers the new attribute, contractless and surrogate modes, limitations, and rules MsgPack019-022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1690, doc/analyzers/MsgPack019.md through MsgPack022.md, and doc/analyzers/index.md lines 26-29; the documentation describes the attribute, contractless and surrogate usage, feature limitations, and rules MsgPack019-022.

**C4 (backed, behavior, author confidence medium):** When IsUserDeclaredFormatter is set, both formatter templates emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's empty partial class. The flag is part of ObjectSerializationInfo equality and is set by the collector.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L116-119
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed)
- Breaker: **upheld**: Checked FormatterTemplate.tt line 14, FormatterTemplate.cs lines 33-35, StringKeyFormatterTemplate.tt line 18, StringKeyFormatterTemplate.cs lines 37-39, ObjectSerializationInfo.cs lines 17 and 168, and GeneratedFormatterCollector.cs lines 117-118; both templates emit partial class when IsUserDeclaredFormatter is true, ObjectSerializationInfo.Equals compares the flag, and Collect sets Formatter and IsUserDeclaredFormatter.

**C8 (backed, behavior, author confidence high):** A non-partial class with the attribute produces MsgPack019 and no model.
- Lines: `GeneratedFormatterCollector.cs` L24-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 47-51 and 293-299 and FormatterMustBePartial in tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 29-54; when the attributed class lacks the partial modifier, MsgPack019 is reported and Collect returns null.

**C12 (backed, test, author confidence high):** A surrogate member whose name or type has no match on T reports MsgPack022 at the surrogate member.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `GeneratedMessagePackFormatterTests.cs` L104-170
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 189-198 and tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 105-170; SurrogateMemberMustMatchFormattedType and SurrogateMemberMustHaveMatchingType verify MsgPack022 is reported at the surrogate member when name or type does not match.

**C13 (backed, test, author confidence high):** Mixing int and string keys on the surrogate reports MsgPack005 at the offending member.
- Lines: `GeneratedFormatterCollector.cs` L181-187, `GeneratedMessagePackFormatterTests.cs` L172-209
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 181-187 and SurrogateKeysMustNotMixStringAndInt in tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 173-209; mixing int and string keys reports MsgPack005 on the offending surrogate member.

**C14 (backed, behavior, author confidence medium):** Collector diagnostics come from a separate incremental branch that re-runs Collect with a diagnostic sink and reports through RegisterSourceOutput.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked src/MessagePack.SourceGenerator/MessagePackGenerator.cs lines 115-131 and tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs line 6; generatedFormatterDiagnostics re-runs GeneratedFormatterCollector.Collect with diagnostics.Add and emits diagnostics via RegisterSourceOutput.

**C18 (backed, test, author confidence high):** The generator diagnostic test class uses shared hand-written Serialize/Deserialize members, so test sources compile even when the generator rejects the formatter.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-102
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 20-26, 43, and 91; the shared Members constant provides stub Serialize and Deserialize methods so rejected formatters still satisfy IMessagePackFormatter<MyType> compilation.

**C19 (backed, scope, author confidence high):** MapModeExecutionTests stops compiling the new external-type test files because it does not reference ExternalTypes. As a result, the feature is not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **static check** (static check S7 passed)
- Breaker: **upheld**: Checked tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj lines 13-14; GeneratedFormatterForExternalTypes*.cs are excluded from Compile, leaving [GeneratedMessagePackFormatter] unexercised in force-map mode.

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
| F1 | medium | `GeneratedFormatterCollector.cs` L135 | Claim C5 disputed: The contractless requirement is broken at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs line 135 because for (int i = 0; i < targets.Count - 1; i++) drops the last public read-write member (and serializes nothing for 1-member types). Consequently, all three named tests in tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternal | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L161 | Claim C6 disputed: In src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs, line 171 and lines 206-207 accept negative integer [Key] values (such as -1), which cannot serve as array indexes; line 161 iterates GetInstanceMembers(surrogate) including private, protected, and internal fields/properties rather than just public contract members; named test MessagePackObjectCanCont | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L57 | Claim C9 disputed: src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 53-61 do not verify that IMessagePackFormatter<T> is closed: an open generic formatter such as partial class MyFormatter<T> : IMessagePackFormatter<T> has formatterInterfaces.Length == 1, passes line 57 without reporting MsgPack020, and instead reports MsgPack021 at line 68. Moreover, FormatterMust | breaker (Gemini) |
| F4 | medium | `GeneratedFormatterCollector.cs` L66 | Claim C10 disputed: Named test FormattedTypeMustNotBeAbstract (tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs lines 78-102) only tests an abstract class; no test exercises generic T, inaccessible T, non-class/struct T, or the missing parameterless constructor MsgPack007 branch at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 76-81. | breaker (Gemini) |
| F5 | medium | `GeneratedFormatterCollector.cs` L84 | Claim C11 disputed: Callback-receiver cast detection at src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs lines 84-85 is broken: in Roslyn C#, an explicit interface implementation method has MethodKind.ExplicitInterfaceImplementation and its IMethodSymbol.Name includes the interface prefix (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize), so  | breaker (Gemini) |
| F6 | medium | `MsgPack00xMessagePackAnalyzer.cs` L382 | Claim C15 disputed: MsgPack019-022 are added to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics at src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs lines 382-385, but MsgPack00xMessagePackAnalyzer.Initialize (lines 387-389) has no changes and never emits any of those diagnostics (only MessagePackGenerator emits them). All four named tests in tests/MessagePack.SourceGen | breaker (Gemini) |
| F7 | medium | `GeneratedFormatterCollector.cs` L135 | Claim C17 disputed: The execution tests do not successfully round-trip contractless external types: due to targets.Count - 1 in src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs line 135, ExternalPerson.Label and ExternalPoint.Y are never serialized or deserialized, causing ContractlessClassRoundTrips (line 20), ContractlessClassUsesStringKeysForPublicReadWriteMembers (li | breaker (Gemini) |
| F8 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: `i < targets.Count - 1` drops the last public read-write member. Contractless formatters silently skip a member: Label on ExternalPerson, Y on ExternalPoint. This is data loss on the wire. ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers (expects 0x82) and ContractlessStructRoundTrips should fail. | author (Claude) |
| F9 | low | `GeneratedFormatterCollector.cs` L79 | The NoDeserializingConstructor diagnostic is created without message arguments. If its messageFormat has placeholders, the message is malformed. This path has no test. | author (Claude) |
| F10 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate mode enumerates every non-implicit instance field and property of the surrogate, including private or helper members. Any member without [Key] or [IgnoreMember] fails the whole formatter with MsgPack004. The README says 'only the members it lists are serialized', but members without [Key] are not skipped; they are errors. | author (Claude) |
| F11 | low | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter class, not its containing types. The MsgPack019 doc says nesting types must also be partial. A nested formatter inside a non-partial type gets generated output that fails to compile, without a targeted diagnostic. | author (Claude) |
| F12 | low | `GeneratedFormatterRequest.cs` L13 | The incremental pipeline value holds ISymbol instances. Symbols differ on every compilation, so caching is defeated. The diagnostics branch at MessagePackGenerator L117-129 runs Collect a second time per formatter on every edit. | author (Claude) |
| F13 | low | `GeneratorUtilities.cs` L38 | Attribute matching uses a ToDisplayString string compare. Excluding these formatters from custom-formatter discovery may also hide them from analyzer checks that use the same list. For example, the analyzer might then flag MsgPack003 on [MessagePackObject] types such as ContainsExternalPerson that hold ExternalPerson. This is unverified. | author (Claude) |
| F14 | high | `GeneratedFormatterCollector.cs` L85 | Explicit IMessagePackSerializationCallbackReceiver detection checks m.ExplicitInterfaceImplementations.Length > 0 && (m.Name == "OnBeforeSerialize" \|\| m.Name == "OnAfterDeserialize"), which is always false in Roslyn C# because an explicit interface implementation's IMethodSymbol.Name includes the interface prefix (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize). It al | breaker (Gemini) |
| F15 | high | `GeneratedFormatterCollector.cs` L161 | CreateSurrogateMembers iterates GetInstanceMembers(surrogate), which returns private, protected, and internal fields and properties on the surrogate and its base types (skipping only IsImplicitlyDeclared), so any private field on a surrogate triggers MsgPack003 unless marked [IgnoreMember]; additionally, line 171 accepts negative integer [Key] values (e.g. [Key(-1)]), passing negative array indice | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial only checks whether the formatter class declaration has the partial keyword and never checks symbol.ContainingType (despite doc/analyzers/MsgPack019.md line 26). If the formatter is nested inside a non-partial type, MsgPack019 is not reported and EmitNestingTypesAndNamespaces generates partial outer declarations that fail with CS0260; also, MessagePackGenerator.cs line 31 filters node is | breaker (Gemini) |
| F17 | medium | `GeneratedFormatterCollector.cs` L53 | Collect never validates that the user-declared formatter class itself is non-generic, non-abstract, and accessible from GeneratedMessagePackResolver, and line 66 only checks IsSymbolAccessibleWithin(type, formatter) rather than accessibility from the generated resolver. A generic formatter class (e.g. MyFormatter<U> : IMessagePackFormatter<ConcreteType>), an abstract partial formatter, or a privat | breaker (Gemini) |
| F18 | medium | `MessagePackGenerator.cs` L34 | SurrogateType is cast using as INamedTypeSymbol, so passing a non-named Type such as typeof(int[]) evaluates to null and silently falls back to contractless mode instead of reporting a diagnostic; unbound generic surrogate types like typeof(MySurrogate<>) are also accepted without validation. | breaker (Gemini) |
| F19 | medium | `GeneratedFormatterCollector.cs` L158 | CreateSurrogateMembers does not check whether the formatted type T has C# required properties or fields that are omitted or marked [IgnoreMember] on the surrogate; when any required member of T is excluded, the generated formatter's new T() instantiation fails to compile with CS9035. | breaker (Gemini) |
| F20 | medium | `MsgPack00xMessagePackAnalyzer.cs` L388 | MsgPack00xMessagePackAnalyzer.Initialize was not updated: it advertises MsgPack019-022 in SupportedDiagnostics without ever reporting them (leaving analyzer-only or SuppressSourceGeneration builds without diagnostics), and it adds no exemption for SurrogateType classes carrying [Key] and [IgnoreMember] without [MessagePackObject] against MsgPack001. | breaker (Gemini) |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F22 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F23 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F24 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F25 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F26 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

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

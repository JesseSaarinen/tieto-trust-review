# Evidence pack: REQ-2129 on `seeded-14`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 609 of 884 changed code lines (69%).** Docs: 159 lines, read with the story. Of everything changed: 58%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 4 refusal(s) on contracts/honesty grounds need a human look.
- 4 claim(s) disputed by the breaker or by the evidence check.
- 7 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 275 of 884 changed code lines off the list (C7, C8, C9, C14, C18, C20, C26: tests found passing in the real run, claim upheld by the breaker). 609 stay with the owner.
- Why lines stay: 262 cited only by claims without a passing test; 156 claim disputed; 90 refused; 63 claim rests on AI reading only; 25 no claim covers the line; 13 named by a finding.

**The owner must read** (21 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L142-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353 (36 of 46 changed lines): R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-47, L52, L62, L75-180, L188-293, L300 (262 of 300 changed lines): C17 has no passing test behind it; F13 breaker (Gemini); no claim covers these lines; claim C10 only AI-read; claim C16 disputed; F4 breaker (Gemini); F11 breaker (Gemini); claim C11 disputed; claim C12 disputed; claim C4 only AI-read; F16 breaker (Gemini); R4 contracts (AI-suggested); claim C15 only AI-read; F14 breaker (Gemini); claim C13 disputed; F3 breaker (Gemini); F1 breaker (Gemini); F12 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): C3 has no passing test behind it; R6 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): claim C4 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C19 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; F15 breaker (Gemini); no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): claim C5 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): R5 honesty (AI-suggested); F5 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): claim C5 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C6 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C21 has no passing test behind it; F21 test run; F22 test run; F23 test run; F24 test run; F19 test run; F20 test run; F2 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C25 has no passing test behind it; C23 has no passing test behind it; no claim covers these lines; C24 has no passing test behind it; C22 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C21 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C21 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C21 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C21 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C21 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C27 has no passing test behind it

**Not required to read:**
- 6 doc file(s): prose; covered by the story
- 275 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C20, C7, C8, C9, C14, C18, C26

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `b0ea2f2585` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 32,844 in / 16,101 out, 183 s, $0.45 |
| Breaker model | gemini-4-carbon: 27,712 in / 31,725 out, 345 s, $0.37 |
| Cost and time | $0.83 at list price, 530 s for this pack (tests reused from an earlier run of this commit: 85 s) |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (85s) |
| Pack id | `2c8bdb2a0b09` |

## 1. Disputed claims (4)
**C11 (DISPUTED, behavior, author confidence high):** Contractless mode (no surrogate) serializes public, read-write, non-indexer instance properties and fields of `T` and its base types. Members are ordered by ordinal name, use their names as string keys, and `isIntKey` is false. Read-only members such as `Doubled` are skipped.
- Lines: `GeneratedFormatterCollector.cs` L87-93, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-284
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run)
- Breaker: **disputed**: IsPublicReadWrite at GeneratedFormatterCollector.cs L279-281 includes init-only properties (SetMethod.IsInitOnly == true), which are not read-write, while GetInstanceMembers at L267 combined with property.SetMethod at L281 skips public read-write virtual properties when a derived class overrides only get (SetMethod is null on the overriding IPropertySymbol in Roslyn). Also, none of the four named tests exercise base-type members.

**C12 (DISPUTED, behavior, author confidence high):** In surrogate mode, members marked `[IgnoreMember]` are skipped. Each keyed surrogate member maps to the same-named member of `T`, using the surrogate's int or string key. Members of `T` not listed in the surrogate are not serialized.
- Lines: `GeneratedFormatterCollector.cs` L94-102, `GeneratedFormatterCollector.cs` L143-168, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: The named test SurrogateControlsKeysAndMembership does not test unlisted members of T or string keys in surrogate mode: ExternalWidget has Id, Name, and Internal (ExternalWidget.cs L9-14), and ExternalWidgetSurrogate (GeneratedFormatterForExternalTypes.cs L27-37) lists all three, excluding Internal via [IgnoreMember] rather than omitting it, and uses only int keys 3 and 7.

**C13 (DISPUTED, behavior, author confidence high):** A surrogate member whose name or type does not match a public read-write member of `T` is reported as MsgPack022 at the surrogate member.
- Lines: `GeneratedFormatterCollector.cs` L189-198
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **disputed**: GeneratedFormatterCollector.cs L190 delegates to IsPublicReadWrite (L279-281), which accepts init-only properties on T (not read-write) and rejects public read-write virtual properties where T overrides only get; in addition, neither named test exercises the !IsPublicReadWrite(target) branch of L190.

**C16 (DISPUTED, behavior, author confidence medium):** The collector builds an ObjectSerializationInfo and wraps it in a FullModel. It sets the class/struct flag, uses no constructor parameters, and detects IMessagePackSerializationCallbackReceiver (including explicit implementations). Each member gets a MemberSerializationInfo marked readable and writable, with init-only and required flags taken from the target member.
- Lines: `GeneratedFormatterCollector.cs` L83-86, `GeneratedFormatterCollector.cs` L104-115, `GeneratedFormatterCollector.cs` L120-126, `GeneratedFormatterCollector.cs` L215-244, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: Explicit IMessagePackSerializationCallbackReceiver detection at GeneratedFormatterCollector.cs L84-85 is broken: in Roslyn C#, an explicit interface implementation IMethodSymbol has m.Name prefixed with the interface name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize', so m.ExplicitInterfaceImplementations.Length > 0 && (m.Name == 'OnBeforeSerialize' || m.Name == 'OnAfterDeserialize') is always false. Also type.GetMembers() misses explicit implementations on base classes, and none of the named tests cover callbacks, init, or required members.


## 2. Refused to decide (6)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new user-visible Error analyzer rules MsgPack019–MsgPack022. | New diagnostic IDs become a public contract for users and suppressions. | `MsgPack00xMessagePackAnalyzer.cs` L318-353 | AI reading |
| R4 | contracts | The contractless member ordering and key naming define a new wire format for externally generated formatters (string keys by ordinal name order; for surrogates, int keys from the surrogate). | Changing this later would break serialized data compatibility. | `GeneratedFormatterCollector.cs` L131-141 | AI reading |
| R5 | honesty | FormatterTemplate.tt does not match its compiled FormatterTemplate.cs (`sealed partial class` vs `partial class`). | The generated template output does not match its source template. | `FormatterTemplate.tt` L14-14 | AI reading |
| R6 | contracts | New public type GeneratedFormatterRequest in the source generator assembly. | It looks like an internal implementation detail but was exposed as public. | `GeneratedFormatterRequest.cs` L13-13 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute with an optional `SurrogateType` property. When a partial class implementing `IMessagePackFormatter<T>` carries the attribute, the source generator writes the formatter body into that class. The type `T` may live in an assembly with no MessagePack reference. With no surrogate, every public read-write instance member of `T` is serialized under its name as a string key (contractless). With a surrogate, the surrogate's `[Key]`/`[IgnoreMember]` attributes set the keys and which members are serialized. The change also adds four new error diagnostics (MsgPack019–MsgPack022), reuses several existing ones, and excludes these formatters from the hand-written formatter scan. Both formatter templates now emit `partial class` for these formatters. Execution tests use a new test assembly with no MessagePack reference.

**Why:** REQ-2129 asks for a source-generated formatter, declared in Project B, for a type that lives in a dependency-free Project A. The requirement offered three options for supplying keys (DataMember, user-copied attributes, generated attributes). The agent chose none of them: it used contractless-by-default plus a surrogate type instead. Unions are explicitly unsupported.

**Touches beyond the requirement:**
- New public type `GeneratedMessagePackFormatterAttribute` in the shipped MessagePack.Annotations assembly (S3 fails).
- Four new user-visible analyzer rule IDs MsgPack019–MsgPack022 plus release notes and docs (S4 fails).
- New public record `GeneratedFormatterRequest` in the generator assembly.
- A design (contractless default + surrogate type) that is not one of the three alternatives in the issue.
- New test project `MessagePack.SourceGenerator.ExternalTypes`; MapMode execution tests now exclude the new test files.
- README section and four new analyzer doc pages.

**How sure (the author's own view; it moves nothing):** High confidence on the diagnostic gates; each has a direct verifier test, except the generic/struct-accessibility branch of MsgPack021, the constructor check and duplicate keys. Medium-high on runtime behaviour: execution tests round-trip a class, a struct, a surrogate type and a containing object, and check wire shape (map with 2 entries; array with 8 slots). There is a real mismatch: FormatterTemplate.tt emits `sealed partial class` while the checked-in FormatterTemplate.cs emits `partial class`. Map-mode execution of the feature is not tested.

## 4. Claims (28)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C11 | DISPUTED | Contractless mode (no surrogate) serializes public, read-write, non-indexer instance properties and fields of `T` and its base types. Members are ordered by ordinal name, use their names as string keys, and `isIntKey` is false. Read-only members such as `Doubled` are skipped. | "Project A is really a library (Nuget package), and I really want to keep it minimal." | AI reading only | disputed | no |
| C12 | DISPUTED | In surrogate mode, members marked `[IgnoreMember]` are skipped. Each keyed surrogate member maps to the same-named member of `T`, using the surrogate's int or string key. Members of `T` not listed in the surrogate are not serialized. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | disputed | no |
| C13 | DISPUTED | A surrogate member whose name or type does not match a public read-write member of `T` is reported as MsgPack022 at the surrogate member. | (scope) | test run | disputed | no |
| C16 | DISPUTED | The collector builds an ObjectSerializationInfo and wraps it in a FullModel. It sets the class/struct flag, uses no constructor parameters, and detects IMessagePackSerializationCallbackReceiver (including explicit implementations). Each member gets a MemberSerializationInfo marked readable and writable, with init-only and required flags taken from the target member. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | disputed | no |
| C1 | unverified | A public class `GeneratedMessagePackFormatterAttribute` is added to the MessagePack namespace in MessagePack.Annotations. It targets classes only, is not inherited, does not allow multiple use, and exposes a nullable `Type? SurrogateType` property. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator finds class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol (null when absent) and adds the resulting model to the per-type models alongside MessagePackObject and Union types. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C3 | unverified | `GeneratedFormatterRequest` is a new public sealed record holding the formatter symbol and the optional surrogate symbol. It flows through the incremental pipeline. | (scope) | AI reading only | upheld | no |
| C4 | unverified | ObjectSerializationInfo gains an `IsUserDeclaredFormatter` flag, and value equality includes it. The collector sets the flag to true and sets `Formatter` to the user's class. | "partial class MyObjectFormatter: IMessagePackFormatter<MyObject>;" | AI reading only | upheld | no |
| C5 | unverified | For user-declared formatters, the compiled int-key and string-key templates emit `partial class <Name>` instead of `internal sealed class <Name>`. The generated body therefore merges into the user's partial class. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | AI reading only | upheld | no |
| C10 | unverified | A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. Structs skip this check. | (scope) | AI reading only | cannot_tell | no |
| C15 | unverified | A surrogate member with neither `[Key]` nor `[IgnoreMember]` is reported as MemberNeedsKey. A duplicate surrogate key is reported as KeysMustBeUnique. Neither path is tested. | (scope) | AI reading only | cannot_tell | no |
| C17 | unverified | The collector file header, usings, class declaration, display format and Collect signature set up the helper. Collect takes an optional diagnostic sink, so the model path can run without reporting. | (scope) | AI reading only | upheld | no |
| C19 | unverified | Classes carrying `[GeneratedMessagePackFormatter]` are excluded from the hand-written custom formatter scan, so they are registered only once, via their ObjectSerializationInfo. | (scope) | AI reading only | upheld | no |
| C21 | unverified | The execution tests model the issue's Project A / Project B setup. ExternalTypes is a project with no MessagePack reference that defines ExternalPerson, ExternalPoint and ExternalWidget. ExecutionTests references it and declares the attributed partial formatters plus a surrogate. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | upheld | no |
| C27 | unverified | The MapMode execution test project excludes the new GeneratedFormatterForExternalTypes*.cs files, so the feature is not exercised in force-map mode. | (scope) | AI reading only | upheld | no |
| C28 | unverified | The docs describe the attribute, contractless default, surrogate mode, limitations and the MsgPack019–022 rules, and the analyzers index lists the new rules. | (scope) | AI reading only | upheld | no |
| C6 | backed | StringKeyFormatterTemplate.tt matches its compiled .cs (`partial class`). FormatterTemplate.tt does NOT match: it emits `sealed partial class` while the compiled FormatterTemplate.cs emits `partial class`. Regenerating the template would change the output. | (scope) | static check | upheld | no |
| C7 | backed | A non-partial attributed class is rejected with MsgPack019 at the class location, and no model is produced. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C8 | backed | An attributed class that does not implement exactly one `IMessagePackFormatter<T>` is rejected with MsgPack020. | "partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C9 | backed | The data type `T` must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract branch is tested. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType`" | test run | upheld | yes |
| C14 | backed | Mixing int and string keys in a surrogate is reported as the existing MsgPack005 at the second member. | (scope) | test run | upheld | yes |
| C18 | backed | Diagnostics for attributed formatters come from a separate incremental pipeline that re-runs the collector with a real sink. The model pipeline passes a null sink, so a rejected formatter gets a diagnostic and no generated output. | (scope) | test run | upheld | yes |
| C20 | backed | Four new Error-severity descriptors MsgPack019–MsgPack022 are added to the analyzer's SupportedDiagnostics and to the unshipped release notes. Only the generator reports them. | (scope) | test run | upheld | yes |
| C22 | backed | Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts that GeneratedMessagePackResolver returns exactly the user's ExternalPersonFormatter, ExternalPointFormatter and ExternalWidgetFormatter types. | "[GeneratedMessagePackFormatter] partial class MyObjectFormatter: IMessagePackFormatter<MyO…" | static check | upheld | no |
| C23 | backed | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers checks that the wire output is a 2-entry fixmap (0x82) containing Id and Label, and not Doubled. | (scope) | static check | upheld | no |
| C24 | backed | Test SurrogateControlsKeysAndMembership checks an 8-slot array (int keys 3 and 7) and that the round trip drops the ignored `Internal` member. | (scope) | static check | upheld | no |
| C25 | backed | Round-trip tests cover a class, a null class value, a struct, and a MessagePackObject that contains external types. All use a CompositeResolver built from GeneratedMessagePackResolver and StandardResolver. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C26 | backed | The generator diagnostic tests hand-write the Serialize/Deserialize members so the test source compiles when the generator declines. Each test uses inline `{\|MsgPackNNN:...\|}` markup, or an explicit expected diagnostic for MsgPack005. | (scope) | test run | upheld | yes |

**C1 (unverified, behavior, author confidence high):** A public class `GeneratedMessagePackFormatterAttribute` is added to the MessagePack namespace in MessagePack.Annotations. It targets classes only, is not inherited, does not allow multiple use, and exposes a nullable `Type? SurrogateType` property.
- Lines: `Attributes.cs` L142-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked Attributes.cs L143-177: GeneratedMessagePackFormatterAttribute is public in namespace MessagePack, has AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false), and exposes public Type? SurrogateType { get; set; }.

**C2 (unverified, behavior, author confidence high):** The generator finds class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol (null when absent) and adds the resulting model to the per-type models alongside MessagePackObject and Union types.
- Lines: `MessagePackGenerator.cs` L29-37, `MessagePackGenerator.cs` L60-76, `Constants.cs` L17-18
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs L29-37 and L60-76 and Constants.cs L17-18: ForAttributeWithMetadataName filters ClassDeclarationSyntax, extracts SurrogateType as INamedTypeSymbol, combines requests with MessagePackObject and Union types, and adds non-null models from GeneratedFormatterCollector.Collect to modelPerType.

**C3 (unverified, scope, author confidence high):** `GeneratedFormatterRequest` is a new public sealed record holding the formatter symbol and the optional surrogate symbol. It flows through the incremental pipeline.
- Lines: `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GeneratedFormatterRequest.cs L1-13: declares public sealed record GeneratedFormatterRequest(INamedTypeSymbol Formatter, INamedTypeSymbol? Surrogate) used in MessagePackGenerator.

**C4 (unverified, behavior, author confidence high):** ObjectSerializationInfo gains an `IsUserDeclaredFormatter` flag, and value equality includes it. The collector sets the flag to true and sets `Formatter` to the user's class.
- Lines: `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `GeneratedFormatterCollector.cs` L116-119
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked ObjectSerializationInfo.cs L17 and L168 and GeneratedFormatterCollector.cs L117-118: IsUserDeclaredFormatter is added, compared in Equals, and set to true alongside Formatter = new QualifiedNamedTypeName(formatter).

**C5 (unverified, behavior, author confidence high):** For user-declared formatters, the compiled int-key and string-key templates emit `partial class <Name>` instead of `internal sealed class <Name>`. The generated body therefore merges into the user's partial class.
- Lines: `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.cs` L37-39
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)
- Breaker: **upheld**: Checked FormatterTemplate.cs L33-35 and StringKeyFormatterTemplate.cs L37-39: both emit 'partial class' instead of 'internal sealed class' when Info.IsUserDeclaredFormatter is true, and round-trip execution tests verify compilation and execution for both int-key and string-key formatters.

**C10 (unverified, behavior, author confidence medium):** A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. Structs skip this check.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**
- Breaker: **cannot_tell**: GeneratedFormatterCollector.cs L79 calls Diagnostic.Create(MsgPack00xMessagePackAnalyzer.NoDeserializingConstructor, location) with zero message format arguments and has no test coverage, while the NoDeserializingConstructor descriptor definition in MsgPack00xMessagePackAnalyzer.cs is outside the diff, so whether its MessageFormat expects format arguments cannot be verified from the diff alone.

**C15 (unverified, behavior, author confidence medium):** A surrogate member with neither `[Key]` nor `[IgnoreMember]` is reported as MemberNeedsKey. A duplicate surrogate key is reported as KeysMustBeUnique. Neither path is tested.
- Lines: `GeneratedFormatterCollector.cs` L169-179, `GeneratedFormatterCollector.cs` L200-204
- Checked by: **AI reading only**
- Breaker: **cannot_tell**: MemberNeedsKey (passed 2 format arguments at GeneratedFormatterCollector.cs L173-177) and KeysMustBeUnique (passed 0 format arguments at L202) are defined outside the diff in MsgPack00xMessagePackAnalyzer.cs and neither path is tested, so whether their MessageFormat argument counts match cannot be verified from the diff alone (note also that [Key(null)] triggers L171-178 despite carrying [Key]).

**C17 (unverified, scope, author confidence high):** The collector file header, usings, class declaration, display format and Collect signature set up the helper. Collect takes an optional diagnostic sink, so the model path can run without reporting.
- Lines: `GeneratedFormatterCollector.cs` L1-46
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L1-46: sets up usings, BinaryWriteTypeFormat, and Collect taking a nullable Action<Diagnostic>? reportDiagnostic.

**C19 (unverified, behavior, author confidence medium):** Classes carrying `[GeneratedMessagePackFormatter]` are excluded from the hand-written custom formatter scan, so they are registered only once, via their ObjectSerializationInfo.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs L35-38: classes carrying MessagePack.GeneratedMessagePackFormatterAttribute are filtered out of customFormattersInThisCompilation.

**C21 (unverified, test, author confidence medium):** The execution tests model the issue's Project A / Project B setup. ExternalTypes is a project with no MessagePack reference that defines ExternalPerson, ExternalPoint and ExternalWidget. ExecutionTests references it and declares the attributed partial formatters plus a surrogate.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-50
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked ExternalTypes.csproj (no MessagePack dependency), ExternalPerson.cs, ExternalPoint.cs, ExternalWidget.cs, ExecutionTests.csproj L17-20, and GeneratedFormatterForExternalTypes.cs L1-50.

**C27 (unverified, scope, author confidence high):** The MapMode execution test project excludes the new GeneratedFormatterForExternalTypes*.cs files, so the feature is not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked MapModeExecutionTests.csproj L13-14: excludes ..\MessagePack.SourceGenerator.ExecutionTests\**\GeneratedFormatterForExternalTypes*.cs.

**C28 (unverified, docs, author confidence high):** The docs describe the attribute, contractless default, surrogate mode, limitations and the MsgPack019–022 rules, and the analyzers index lists the new rules.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md L1639-1690, doc/analyzers/MsgPack019.md through MsgPack022.md, and doc/analyzers/index.md L26-29.

**C6 (backed, generated, author confidence high):** StringKeyFormatterTemplate.tt matches its compiled .cs (`partial class`). FormatterTemplate.tt does NOT match: it emits `sealed partial class` while the compiled FormatterTemplate.cs emits `partial class`. Regenerating the template would change the output.
- Lines: `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.tt` L18-18
- Checked by: **static check** (static check S1 passed)
- Breaker: **upheld**: Checked FormatterTemplate.tt L14 ('sealed partial class') against FormatterTemplate.cs L34 ('partial class') and StringKeyFormatterTemplate.tt L18 ('partial class') against StringKeyFormatterTemplate.cs L38 ('partial class').

**C7 (backed, behavior, author confidence high):** A non-partial attributed class is rejected with MsgPack019 at the class location, and no model is produced.
- Lines: `GeneratedFormatterCollector.cs` L47-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L47-51 and L293-299 and FormatterMustBePartial: a non-partial attributed class causes IsPartial to return false, reports MsgPack019 at the formatter location, and returns null.

**C8 (backed, behavior, author confidence high):** An attributed class that does not implement exactly one `IMessagePackFormatter<T>` is rejected with MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L53-61 and FormatterMustImplementFormatterOfT: formatter.AllInterfaces is filtered to closed IMessagePackFormatter<T> interfaces and MsgPack020 is reported when Length != 1.

**C9 (backed, behavior, author confidence medium):** The data type `T` must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract branch is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L63-74 and FormattedTypeMustNotBeAbstract: checks INamedTypeSymbol with IsGenericType == false, IsAbstract == false, TypeKind Class or Struct, and IsSymbolAccessibleWithin, reporting MsgPack021 otherwise; only the abstract case is tested.

**C14 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate is reported as the existing MsgPack005 at the second member.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L181-187 and SurrogateKeysMustNotMixStringAndInt (GeneratedMessagePackFormatterTests.cs L173-209): mixing int and string keys reports DoNotMixStringAndIntKeys (MsgPack005) on the conflicting member.

**C18 (backed, behavior, author confidence high):** Diagnostics for attributed formatters come from a separate incremental pipeline that re-runs the collector with a real sink. The model pipeline passes a null sink, so a rejected formatter gets a diagnostic and no generated output.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MessagePackGenerator.cs L72 and L115-131 and the four named diagnostic tests: the model pipeline passes reportDiagnostic: null while generatedFormatterDiagnostics runs Collect with diagnostics.Add and reports via RegisterSourceOutput.

**C20 (backed, scope, author confidence high):** Four new Error-severity descriptors MsgPack019–MsgPack022 are added to the analyzer's SupportedDiagnostics and to the unshipped release notes. Only the generator reports them.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-353, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MsgPack00xMessagePackAnalyzer.cs L32-35, L318-353, L381-385 and AnalyzerReleases.Unshipped.md L26-29: MsgPack019 through MsgPack022 are Error-severity descriptors added to SupportedDiagnostics and release notes and reported only from MessagePackGenerator.

**C22 (backed, test, author confidence high):** Test GeneratedFormattersAreRegisteredInGeneratedResolver asserts that GeneratedMessagePackResolver returns exactly the user's ExternalPersonFormatter, ExternalPointFormatter and ExternalWidgetFormatter types.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L88-94
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs L88-94: Assert.IsType verifies exact formatter types returned by GeneratedMessagePackResolver.Instance.

**C23 (backed, test, author confidence high):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers checks that the wire output is a 2-entry fixmap (0x82) containing Id and Label, and not Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs L23-34: asserts 0x82 fixmap header and JSON presence of Id and Label and absence of Doubled.

**C24 (backed, test, author confidence high):** Test SurrogateControlsKeysAndMembership checks an 8-slot array (int keys 3 and 7) and that the round trip drops the ignored `Internal` member.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs L54-69: asserts ReadArrayHeader() == 8 for keys 3 and 7 and verifies Internal resets to default 0 after deserialization.

**C25 (backed, test, author confidence high):** Round-trip tests cover a class, a null class value, a struct, and a MessagePackObject that contains external types. All use a CompositeResolver built from GeneratedMessagePackResolver and StandardResolver.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L1-22, `GeneratedFormatterForExternalTypesTests.cs` L36-52, `GeneratedFormatterForExternalTypesTests.cs` L71-86
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs L8-22, L36-52, and L71-86: all four round-trip tests use Options built with CompositeResolver.Create(GeneratedMessagePackResolver.Instance, StandardResolver.Instance).

**C26 (backed, test, author confidence high):** The generator diagnostic tests hand-write the Serialize/Deserialize members so the test source compiles when the generator declines. Each test uses inline `{|MsgPackNNN:...|}` markup, or an explicit expected diagnostic for MsgPack005.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs L1-210: diagnostic tests supply stub Serialize/Deserialize members when implementing IMessagePackFormatter<MyType> and assert MsgPack019-022 inline or MsgPack005 via ExpectedDiagnostics.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 5 of its 14 sentences.
Requirement sentences no claim quotes (9; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…

## 5. Findings (24)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterCollector.cs` L267 | Claim C11 disputed: IsPublicReadWrite at GeneratedFormatterCollector.cs L279-281 includes init-only properties (SetMethod.IsInitOnly == true), which are not read-write, while GetInstanceMembers at L267 combined with property.SetMethod at L281 skips public read-write virtual properties when a derived class overrides only get (SetMethod is null on the overriding IPropertySymbol in Roslyn). Also, non | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterForExternalTypes.cs` L35 | Claim C12 disputed: The named test SurrogateControlsKeysAndMembership does not test unlisted members of T or string keys in surrogate mode: ExternalWidget has Id, Name, and Internal (ExternalWidget.cs L9-14), and ExternalWidgetSurrogate (GeneratedFormatterForExternalTypes.cs L27-37) lists all three, excluding Internal via [IgnoreMember] rather than omitting it, and uses only int keys 3 and 7. | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L190 | Claim C13 disputed: GeneratedFormatterCollector.cs L190 delegates to IsPublicReadWrite (L279-281), which accepts init-only properties on T (not read-write) and rejects public read-write virtual properties where T overrides only get; in addition, neither named test exercises the !IsPublicReadWrite(target) branch of L190. | breaker (Gemini) |
| F4 | medium | `GeneratedFormatterCollector.cs` L84 | Claim C16 disputed: Explicit IMessagePackSerializationCallbackReceiver detection at GeneratedFormatterCollector.cs L84-85 is broken: in Roslyn C#, an explicit interface implementation IMethodSymbol has m.Name prefixed with the interface name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), never 'OnBeforeSerialize', so m.ExplicitInterfaceImplementations.Length > 0  | breaker (Gemini) |
| F5 | medium | `FormatterTemplate.tt` L14 | The template emits `sealed partial class` but the checked-in compiled FormatterTemplate.cs (line 34) emits `partial class`. Regenerating the T4 output would silently change the generated code and add `sealed` to user formatters. S1 passes only because both files changed. | author (Claude) |
| F6 | low | `GeneratedFormatterCollector.cs` L161 | GetInstanceMembers(surrogate) includes non-public fields and properties of the surrogate. Any private helper member without [Key] or [IgnoreMember] triggers MemberNeedsKey and blocks generation, which the docs do not mention. | author (Claude) |
| F7 | low | `GeneratedFormatterRequest.cs` L13 | The record is public, and it carries ISymbol values through the incremental pipeline. That roots compilations and defeats incremental caching. Diagnostics are also computed by running Collect a second time (MessagePackGenerator.cs L125). | author (Claude) |
| F8 | low | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L14 | The feature is excluded from the force-map-mode execution tests. Int-key surrogate formatters under ForceMap are therefore never run. | author (Claude) |
| F9 | low | `MessagePack.SourceGenerator.ExternalTypes.csproj` L9 | The project targets net8.0 only. If ExecutionTests multi-targets (for example, a .NET Framework target), this ProjectReference would fail for the other targets. The ExecutionTests target frameworks are not visible in the diff. | author (Claude) |
| F10 | low | `GeneratedFormatterCollector.cs` L77 | Several rejection paths have no test: the missing-parameterless-constructor check, the generic-type, struct-kind and accessibility branches of MsgPack021, duplicate surrogate keys, and MemberNeedsKey. | author (Claude) |
| F11 | high | `GeneratedFormatterCollector.cs` L85 | Explicit IMessagePackSerializationCallbackReceiver detection is always false: in Roslyn, an explicit interface implementation method has m.Name prefixed with the interface name (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), not 'OnBeforeSerialize' (which is on m.ExplicitInterfaceImplementations[0].Name). Also type.GetMembers() ignores base classes, and sharing on | breaker (Gemini) |
| F12 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial only checks whether the formatter class itself has a declaration with the partial keyword and never checks symbol.ContainingType (contrary to doc/analyzers/MsgPack019.md L26). A partial formatter nested inside a non-partial type skips MsgPack019 and emits a partial wrapper for the outer type, failing compilation with CS0260. | breaker (Gemini) |
| F13 | medium | `GeneratedFormatterCollector.cs` L47 | Collect validates the target data type T for generic parameters, abstractness, and accessibility, but does not validate the formatter class itself. If the user-declared formatter is generic, abstract, or private inside a containing class, no MsgPack diagnostic is reported and GeneratedMessagePackResolver emits uncompilable instantiation code (CS0305, CS0144, or CS0122). | breaker (Gemini) |
| F14 | medium | `GeneratedFormatterCollector.cs` L171 | CreateSurrogateMembers checks 'key is not (int or string)' without rejecting negative integer keys (e.g. [Key(-1)]). Negative int keys pass validation and produce MemberSerializationInfo with IntKey < 0, breaking int-key array formatter generation. | breaker (Gemini) |
| F15 | medium | `MessagePackGenerator.cs` L34 | Extracting SurrogateType via 'as INamedTypeSymbol' silently turns non-named types (such as typeof(int[])) into null, causing the generator to silently emit a contractless formatter instead of reporting an invalid surrogate diagnostic; unbound generic surrogate types (typeof(MySurrogate<>)) are also not rejected. | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterCollector.cs` L123 | FullModel.ObjectInfos is an ImmutableSortedSet<ObjectSerializationInfo> ordered by ResolverRegisterInfo.CompareTo (DataType). If two [GeneratedMessagePackFormatter] classes target the same type T (or one targets a [MessagePackObject] type), one ObjectSerializationInfo is silently dropped during model union, leaving the second partial formatter class without generated Serialize/Deserialize methods  | breaker (Gemini) |
| F17 | low | `GeneratedFormatterCollector.cs` L110 | GeneratedFormatterCollector passes isIntKey directly from surrogate [Key(int)] annotations without consulting ForceMapMode in AnalyzerOptions, so int-key surrogates ignore force-map mode. | breaker (Gemini) |
| F18 | low | `GeneratedFormatterCollector.cs` L77 | Structs skip the accessible parameterless constructor check, but in C# 10+ a struct in a referenced assembly can declare a private or internal parameterless constructor, causing the generated 'new T()' call to fail with CS0122 instead of reporting NoDeserializingConstructor. | breaker (Gemini) |
| F19 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F20 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F22 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F23 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F24 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs`: A surrogate-type mechanism and a contractless default were chosen instead of any of the three key-configuration alternatives the issue proposed. This is a design decision the requirement left open.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: The existing MapMode test project's compile globs were modified to exclude the new files.

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
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (85s)

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

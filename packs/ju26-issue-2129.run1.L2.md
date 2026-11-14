# Evidence pack: REQ-2129 on `ju26-issue-2129`

> **REVIEW PARTLY INCOMPLETE: 4 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 169 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `09ef1ea10b51` (ju26-issue-2129.run1.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 884 of 884 changed code lines (100%).** Docs: 159 lines, read with the story. Of everything changed: 85%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 2 refusal(s) on contracts/honesty grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 4 behaviour claim(s) rest on AI reading only (no passing test).
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 884.
- Why lines stay: 343 refused; 340 no claim covers the line; 111 cited only by claims without a passing test; 50 claim disputed; 35 claim rests on AI reading only; 5 named by a finding.

**The owner must read** (22 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L165-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): claim C6 disputed (L26-29); R2 contracts
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` whole file diff (300 changed lines): F2 breaker (Gemini) (L47); F9 breaker (Gemini) (L85); F10 breaker (Gemini) (L47); F11 breaker (Gemini) (L293); F12 breaker (Gemini) (L171); F13 breaker (Gemini) (L189); claim C4 disputed (L89-93); claim C4 disputed (L131-141); claim C4 disputed (L249-284); claim C6 disputed (L47-81); claim C5 only AI-read (L147-213); R3 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` whole file diff (3 changed lines): R4 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L32-35, L318-353, L381-385 (46 of 46 changed lines): no claim covers these lines; claim C6 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): no claim covers these lines
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): no claim covers these lines; C10 has no passing test behind it
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C7 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L115-132 (39 of 39 changed lines): C2 has no passing test behind it; F3 author (Claude); no claim covers these lines; claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C10 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C2 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C10 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C2 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): no claim covers these lines; claim C3 only AI-read; F16 test run; F17 test run; F20 test run; F21 test run; F18 test run; F19 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): no claim covers these lines; C8 has no passing test behind it; F1 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): claim C3 only AI-read; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): claim C3 only AI-read
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L1-210 (210 of 210 changed lines): no claim covers these lines

**Not required to read:**
- 6 doc file(s): prose; covered by the story

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `083afd994c` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 169 blocked by the machine, 0 skipped (988s) |
| Pack id | `08800ac0cb06` |

## 1. Disputed claims (2)
**C4 (DISPUTED, behavior, author confidence high):** Without a surrogate, every public, read-write, non-static, non-indexer property and field of the type and its base types is serialized. Each goes into a string-keyed map under its own name, ordered by ordinal name. Get-only members are skipped.
- Lines: `GeneratedFormatterCollector.cs` L89-93, `GeneratedFormatterCollector.cs` L131-141, `GeneratedFormatterCollector.cs` L249-284
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run)
- Breaker: **disputed**: First, named test ContractlessClassNullRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 37-41) only serializes and deserializes null (default(ExternalPerson)) and does not test member discovery, string keys, or ordinal ordering; meanwhile ContractlessClassUsesStringKeysForPublicReadWriteMembers only tests a flat class with auto-properties already declared in alphabetical order (ExternalPerson.cs lines 7-15), leaving fields, base-type members, static members, and indexers untested. Second, IsPublicReadWrite (GeneratedFormatterCollector.cs lines 279-281) matches any property whose SetMethod is public, which also includes init-only properties ({ get; init; }, handled at line 219), not strictly read-write properties.

**C6 (DISPUTED, behavior, author confidence medium):** Misuse is reported as new error diagnostics: MsgPack019 (not partial), MsgPack020 (does not implement exactly one `IMessagePackFormatter<T>`), MsgPack021 (data type is generic, abstract, not a class or struct, or inaccessible) and MsgPack022 (surrogate member does not match). The generator reports these from a separate pipeline.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L318-352, `GeneratedFormatterCollector.cs` L47-81, `MessagePackGenerator.cs` L117-131, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **AI reading only** (test `FormatterMustBePartial` blocked by the machine (not evidence either way); test `FormatterMustImplementFormatterOfT` blocked by the machine (not evidence either way); test `FormattedTypeMustNotBeAbstract` blocked by the machine (not evidence either way); test `SurrogateMemberMustMatchFormattedType` blocked by the machine (not evidence either way))
- Breaker: **disputed**: First, MsgPack019 is only checked on the formatter declaration itself via IsPartial (GeneratedFormatterCollector.cs lines 47 and 293-299) and does not check containing types; if a partial formatter is nested in a non-partial outer class, MsgPack019 is not reported (despite doc/analyzers/MsgPack019.md line 26) and generated code fails with CS0260. Second, record classes are valid targets for AttributeTargets.Class, but MessagePackGenerator.cs line 31 filters node is ClassDeclarationSyntax, silently ignoring non-partial or invalid record formatters with zero diagnostics. Third, the cited range GeneratedFormatterCollector.cs lines 47-81 omits where MsgPack022 is actually reported (lines 190-198).


## 2. Refused to decide (4)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | The serialized form for externally-declared types: contractless string-keyed map over public read-write members sorted by ordinal name, or surrogate-defined keys. | This defines the wire format users will persist. The choice among the issue's three alternatives, or this fourth design, is a product decision. | `GeneratedFormatterCollector.cs` | AI reading |
| R4 | honesty | The new execution tests are excluded from MapModeExecutionTests. | This narrows existing test coverage, so map-mode behaviour of the feature goes unverified. The stated reason is that the project lacks the ExternalTypes reference, which could have been added instead. | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations. When a `partial` class carries this attribute and implements `IMessagePackFormatter<T>`, the source generator writes the formatter body into that class and registers it in `GeneratedMessagePackResolver`. `T` can live in an assembly that has no MessagePack reference. By default `T` is serialized contractless: public read-write members go into a string-keyed map, ordered by name. An optional `SurrogateType` names a type in the consuming project whose `[Key]`/`[IgnoreMember]` attributes define the keys instead. Four new error diagnostics (MsgPack019–022) are added, plus README and analyzer docs, a new dependency-free test assembly, execution tests and generator diagnostic tests.

**Why:** REQ-2129 asks for a way to generate a formatter in Project B for a type in Project A, which cannot reference MessagePack. The requirement suggests this attribute on partial formatter classes. It leaves open how keys are chosen and lists three options. The agent picked a fourth design: contractless by default, plus a surrogate type in the consuming assembly.

**Touches beyond the requirement:**
- New public type `GeneratedMessagePackFormatterAttribute` with a `SurrogateType` property in the shipped Annotations assembly (S3 fail).
- Four new user-visible error rules MsgPack019–MsgPack022, with release notes and docs (S4 fail).
- A surrogate-type design for keys, which is not one of the three alternatives in the issue.
- The shared formatter templates (`FormatterTemplate.tt` and `StringKeyFormatterTemplate.tt`) now emit `partial class` for user-declared formatters.
- Hand-written formatter discovery in GeneratorUtilities now skips classes that carry the new attribute.
- The MapModeExecutionTests project now excludes the new execution test files.
- New `ExternalTypes` test project; README section.

**How sure (the author's own view; it moves nothing):** High confidence that the basic path works: a contractless class or struct and a surrogate with int keys, from a separate assembly with no MessagePack reference, round-trip and get registered in the resolver. Execution tests exercise these. Medium confidence on edge paths that have no tests: string-key surrogates at runtime, duplicate keys, missing keys, classes without a parameterless constructor, generic data types, callback receivers. No generated-source snapshots are included, so the emitted code is not shown. The key design and the public API are product decisions the human needs to make.

## 4. Claims (10)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | DISPUTED | Without a surrogate, every public, read-write, non-static, non-indexer property and field of the type and its base types is serialized. Each goes into a string-keyed map under its own name, ordered by ordinal name. Get-only members are skipped. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | disputed | no |
| C6 | DISPUTED | Misuse is reported as new error diagnostics: MsgPack019 (not partial), MsgPack020 (does not implement exactly one `IMessagePackFormatter<T>`), MsgPack021 (data type is generic, abstract, not a class or struct, or inaccessible) and MsgPack022 (surrogate member does not match). The generator reports these from a separate pipeline. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | disputed | no |
| C1 | unverified | A new public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with an optional `Type? SurrogateType` property is added to MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C3 | unverified | The formatted type can come from a referenced assembly that has no MessagePack reference. The test project ExternalTypes deliberately has no MessagePack reference, and its types round-trip through formatters declared in the consuming test project. This includes a `[MessagePackObject]` type that contains them. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | upheld | no |
| C5 | unverified | With `SurrogateType`, only the surrogate's `[Key]` members are serialized. Each is matched by name and exact type to a public read-write member of the formatted type. `[IgnoreMember]` members are skipped. Mixed int/string keys, a missing `[Key]` and duplicate keys are each rejected with a diagnostic. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | upheld | no |
| C7 | unverified | Classes marked with the attribute are excluded from hand-written formatter discovery. Without this, the user's partial class (which declares `IMessagePackFormatter<T>`) would be registered twice: once as a custom formatter and once as a generated object formatter. | (scope) | AI reading only | upheld | no |
| C9 | unverified | Scope: unions, generic types, abstract types and constructor-parameter deserialization are explicitly not supported. The MapModeExecutionTests project excludes the new execution tests, so map mode does not cover this feature. | (scope) | AI reading only | upheld | no |
| C2 | backed | The generator finds classes with the attribute through ForAttributeWithMetadataName. It builds a model for each one and emits the formatter body as `partial class <UserFormatter>`, so it merges with the user's declaration. The generated resolver then returns the user's formatter type. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | static check | upheld | no |
| C8 | backed | The execution tests really exercise the requirement. They serialize and deserialize real types from a separate assembly with no MessagePack reference. They check the map header (0x82), the JSON keys, the array length for the int-keyed surrogate (8) and that the ignored member is dropped. They also check that the resolver returns the user-declared formatter types. | "generated **inside Project B** instead of Project A, because the latter has no (and cannot…" | static check | upheld | no |
| C10 | backed | Formatters for existing `[MessagePackObject]` types still come out as `internal sealed class` with unchanged reader/writer code. The template change only switches the class modifier when `IsUserDeclaredFormatter` is true. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence high):** A new public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with an optional `Type? SurrogateType` property is added to MessagePack.Annotations.
- Lines: `Attributes.cs` L165-177
- Checked by: **AI reading only** (test `FormatterMustBePartial` blocked by the machine (not evidence either way); named test `ContractlessClassRoundTrips` not found in the test run)
- Breaker: **upheld**: Checked src/MessagePack.Annotations/Attributes.cs lines 165-177: GeneratedMessagePackFormatterAttribute is public, decorated with [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)], and exposes an optional Type? SurrogateType property.

**C3 (unverified, behavior, author confidence high):** The formatted type can come from a referenced assembly that has no MessagePack reference. The test project ExternalTypes deliberately has no MessagePack reference, and its types round-trip through formatters declared in the consuming test project. This includes a `[MessagePackObject]` type that contains them.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L9-22
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run)
- Breaker: **upheld**: Checked ExternalTypes.csproj (zero package or project references), ExecutionTests.csproj lines 17-20, GeneratedFormatterForExternalTypes.cs lines 9-50, and the execution tests ContractlessClassRoundTrips, ContractlessStructRoundTrips, and MessagePackObjectCanContainExternalTypes.

**C5 (unverified, behavior, author confidence medium):** With `SurrogateType`, only the surrogate's `[Key]` members are serialized. Each is matched by name and exact type to a public read-write member of the formatted type. `[IgnoreMember]` members are skipped. Mixed int/string keys, a missing `[Key]` and duplicate keys are each rejected with a diagnostic.
- Lines: `GeneratedFormatterCollector.cs` L147-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run; test `SurrogateMemberMustMatchFormattedType` blocked by the machine (not evidence either way); test `SurrogateMemberMustHaveMatchingType` blocked by the machine (not evidence either way); test `SurrogateKeysMustNotMixStringAndInt` blocked by the machine (not evidence either way))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 147-213 and the four named tests: [IgnoreMember] members are skipped (line 164), missing [Key] reports MemberNeedsKey (lines 171-179), mixed int/string keys report DoNotMixStringAndIntKeys (lines 183-187), name/accessibility/type mismatches report SurrogateMemberNotFound (lines 189-198), and duplicate keys report KeysMustBeUnique (lines 200-204).

**C7 (unverified, behavior, author confidence medium):** Classes marked with the attribute are excluded from hand-written formatter discovery. Without this, the user's partial class (which declares `IMessagePackFormatter<T>`) would be registered twice: once as a custom formatter and once as a generated object formatter.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs lines 35-38: customFormattersInThisCompilation filters out any INamedTypeSymbol carrying MessagePack.GeneratedMessagePackFormatterAttribute across its declarations before FormatterDescriptor.TryCreate runs, preventing duplicate registration alongside ObjectSerializationInfo.

**C9 (unverified, scope, author confidence high):** Scope: unions, generic types, abstract types and constructor-parameter deserialization are explicitly not supported. The MapModeExecutionTests project excludes the new execution tests, so map mode does not cover this feature.
- Lines: `README.md` L1684-1688, `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1684-1688 and MapModeExecutionTests.csproj lines 13-14: the limitations are explicitly documented and GeneratedFormatterForExternalTypes*.cs files are excluded from MapModeExecutionTests.

**C2 (backed, behavior, author confidence high):** The generator finds classes with the attribute through ForAttributeWithMetadataName. It builds a model for each one and emits the formatter body as `partial class <UserFormatter>`, so it merges with the user's declaration. The generated resolver then returns the user's formatter type.
- Lines: `MessagePackGenerator.cs` L29-37, `MessagePackGenerator.cs` L70-76, `GeneratedFormatterCollector.cs` L104-125, `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.tt` L18-18
- Checked by: **static check** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run; static check S1 passed)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 29-37 and 70-76, GeneratedFormatterCollector.cs lines 104-125, FormatterTemplate.tt line 14, StringKeyFormatterTemplate.tt line 18, and GeneratedFormattersAreRegisteredInGeneratedResolver: ForAttributeWithMetadataName discovers annotated classes, sets Formatter to the user type with IsUserDeclaredFormatter = true, emits partial class <UserFormatter>, and registers it in GeneratedMessagePackResolver.

**C8 (backed, test, author confidence high):** The execution tests really exercise the requirement. They serialize and deserialize real types from a separate assembly with no MessagePack reference. They check the map header (0x82), the JSON keys, the array length for the int-keyed surrogate (8) and that the ignored member is dropped. They also check that the resolver returns the user-declared formatter types.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L11-94
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 11-94: the tests verify round-tripping of ExternalPerson and ExternalPoint from ExternalTypes, assert bytes[0] == 0x82 and JSON keys without Doubled, assert ReadArrayHeader() == 8 and Internal == 0 for ExternalWidgetSurrogate, round-trip ContainsExternalPerson, and verify GeneratedMessagePackResolver returns the three user-declared formatter types.

**C10 (backed, scope, author confidence high):** Formatters for existing `[MessagePackObject]` types still come out as `internal sealed class` with unchanged reader/writer code. The template change only switches the class modifier when `IsUserDeclaredFormatter` is true.
- Lines: `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.cs` L37-39, `ObjectSerializationInfo.cs` L17-17
- Checked by: **static check** (static check S1 passed; static check S5 passed)
- Breaker: **upheld**: Checked ObjectSerializationInfo.cs line 17, FormatterTemplate.cs lines 33-35, and StringKeyFormatterTemplate.cs lines 37-39: IsUserDeclaredFormatter defaults to false, and both templates emit internal sealed class with identical body emission whenever IsUserDeclaredFormatter is false.

**Requirement coverage:** 4 of 14 requirement sentences are quoted by a claim.
Not quoted by any claim (10; first 8):
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- 2 - Allow the generator and analyzers to work with user-defined versions of the MessagePack attributes.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- With this, I could simply copy and paste the attribute definitions for MessagePack attributes such as `[Key]` into my Project A, and have the source-generated formatter (as describ…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…
- This would allow using the attributes without adding an additional runtime dependency.
- Only compile-time reference to the analyzer Nuget would be required.

## 5. Findings (21)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterForExternalTypesTests.cs` L37 | Claim C4 disputed: First, named test ContractlessClassNullRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 37-41) only serializes and deserializes null (default(ExternalPerson)) and does not test member discovery, string keys, or ordinal ordering; meanwhile ContractlessClassUsesStringKeysForPublicReadWriteMembers only tests a flat class with auto-properties already declared in alphabet | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L47 | Claim C6 disputed: First, MsgPack019 is only checked on the formatter declaration itself via IsPartial (GeneratedFormatterCollector.cs lines 47 and 293-299) and does not check containing types; if a partial formatter is nested in a non-partial outer class, MsgPack019 is not reported (despite doc/analyzers/MsgPack019.md line 26) and generated code fails with CS0260. Second, record classes are valid | breaker (Gemini) |
| F3 | medium | `MessagePackGenerator.cs` L34 | `SurrogateType` is cast with `as INamedTypeSymbol`. A non-named type (for example `typeof(int[])`) or an error type turns into null, and the generator silently falls back to contractless mode with no diagnostic. The result is a different wire format from what the user asked for. | author (Claude) |
| F4 | low | `MessagePackGenerator.cs` L117 | `GeneratedFormatterCollector.Collect` runs twice per formatter: once for the model and once for diagnostics. The diagnostics pipeline combines each request with the full CompilationProvider, so it re-runs on every compilation change. This is an IDE performance cost; incremental caching is effectively lost for this path. | author (Claude) |
| F5 | low | `GeneratedFormatterCollector.cs` L79 | The existing descriptors NoDeserializingConstructor, DoNotMixStringAndIntKeys (L185) and KeysMustBeUnique (L202) are created without message arguments. If their message formats contain placeholders, the diagnostic text will be wrong or malformed. Only the MsgPack005 path is covered by a test. | author (Claude) |
| F6 | low | `GeneratedFormatterCollector.cs` L84 | `needsCast` only looks at explicit interface implementations on the type itself, not on its base types. The same flag is used for both the before and after callbacks. A callback receiver implemented explicitly on a base class, or only one callback implemented explicitly, may produce wrong generated code. This path is untested. | author (Claude) |
| F7 | low | `MsgPack00xMessagePackAnalyzer.cs` L382 | MsgPack019–022 are listed in the analyzer's SupportedDiagnostics, but the analyzer never reports them; only the source generator does. Users who rely on the analyzer alone, or on live IDE analysis, will not see these errors from the analyzer. | author (Claude) |
| F8 | low | `GeneratedMessagePackFormatterTests.cs` L1 | Test gaps: no generated-source snapshot shows what the generator emits; the string-key surrogate path is never executed at runtime. No tests cover MsgPack021 for generic types, KeysMustBeUnique, a surrogate member missing `[Key]`, or a class without a parameterless constructor. The issue's body-less `partial class X : IMessagePackFormatter<T>;` syntax is not exercised either. | author (Claude) |
| F9 | medium | `GeneratedFormatterCollector.cs` L85 | Explicit IMessagePackSerializationCallbackReceiver detection is always false: in Roslyn, an explicit interface implementation method's IMethodSymbol.Name includes the qualified interface prefix (e.g. 'MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize'), so m.Name == 'OnBeforeSerialize' \|\| m.Name == 'OnAfterDeserialize' never matches when m.ExplicitInterfaceImplementations.Len | breaker (Gemini) |
| F10 | medium | `GeneratedFormatterCollector.cs` L47 | Collect validates the formatted data type (non-generic, non-abstract, accessible, parameterless constructor) but never validates those properties on the user-declared formatter symbol itself. If the formatter class is abstract, generic (or nested inside a generic type), private inside a partial outer type, or lacks an accessible parameterless constructor, the generator emits a GeneratedMessagePack | breaker (Gemini) |
| F11 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter class declaration and not symbol.ContainingType recursively. Nesting a partial formatter inside a non-partial outer type bypasses MsgPack019 (contradicting doc/analyzers/MsgPack019.md line 26) and produces invalid partial outer type declarations that fail compilation with CS0260. | breaker (Gemini) |
| F12 | medium | `GeneratedFormatterCollector.cs` L171 | CreateSurrogateMembers accepts negative integer keys such as [Key(-1)] because 'key is not (int or string)' does not check intKey >= 0, passing a negative IntKey into ObjectSerializationInfo.Create where non-negative array slot indices are assumed. | breaker (Gemini) |
| F13 | medium | `GeneratedFormatterCollector.cs` L189 | If the formatted type declares a C# 'required' property or field that is omitted or marked [IgnoreMember] on SurrogateType (or is a required get-only/non-public-setter member skipped in contractless mode), the generated Deserialize method constructs 'new T()' without initializing that required member, failing compilation with CS9035. | breaker (Gemini) |
| F14 | low | `GeneratedFormatterCollector.cs` L161 | CreateSurrogateMembers enumerates GetInstanceMembers(surrogate), which returns all non-static fields and properties regardless of accessibility; any private helper field or property on the surrogate class triggers MsgPack004 (MemberNeedsKey) unless annotated with [IgnoreMember]. | breaker (Gemini) |
| F15 | low | `MessagePackGenerator.cs` L34 | SurrogateType extraction uses 'as INamedTypeSymbol'; if a user specifies a non-named type such as SurrogateType = typeof(int[]), Surrogate becomes null and the generator silently falls back to contractless mode instead of reporting an invalid surrogate type. | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F17 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F18 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F19 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F20 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs`: The SurrogateType mechanism (lines 147-213) is a design the agent invented. The requirement lists three alternatives and does not ask for this one.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes the new execution test files from the map-mode test project instead of adding the ExternalTypes reference there.
- `README.md`: New README section documenting the feature and its limitations. This is reasonable for a new public feature, but it is not requested.
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs`: New public record in the generator assembly that carries Roslyn symbols.

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

# Evidence pack: REQ-2129 on `seeded-19`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> Rebuilt offline from pack `280d7513b8c6` (seeded-19.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 605 of 889 changed code lines (68%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 73%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 4 refusal(s) on contracts/honesty grounds need a human look.
- 5 claim(s) disputed by the breaker or by the evidence check.
- 5 behaviour claim(s) rest on AI reading only (no passing test).
- 2 high-severity finding(s).
- Evidence took 284 of 889 changed code lines off the list (C8, C9, C11, C12, C13, C14, C17: tests found passing in the real run, claim upheld by the breaker). 605 stay with the owner.
- Why lines stay: 217 cited only by claims without a passing test; 159 claim disputed; 86 claim rests on AI reading only; 84 refused; 48 no claim covers the line; 11 named by a finding.

**The owner must read** (27 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (41 changed lines): R5 honesty (AI-suggested) (L178-181); F4 breaker (Gemini) (L181); F6 author (Claude) (L181); F13 breaker (Gemini) (L181); claim C18 disputed (L178-181); claim C1 only AI-read (L143-176); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): claim C18 disputed (L26-29); R2 contracts
- `README.md` L1639-1690 (52 of 52 changed lines): claim C19 disputed
- `doc/analyzers/MsgPack019.md` L1-26 (26 of 26 changed lines): claim C19 disputed; F5 breaker (Gemini)
- `doc/analyzers/MsgPack020.md` L1-23 (23 of 23 changed lines): claim C19 disputed
- `doc/analyzers/MsgPack021.md` L1-23 (23 of 23 changed lines): claim C19 disputed
- `doc/analyzers/MsgPack022.md` L1-31 (31 of 31 changed lines): claim C19 disputed
- `doc/analyzers/index.md` L26-29 (4 of 4 changed lines): claim C19 disputed
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-353, L382 (37 of 46 changed lines): R3 contracts (AI-suggested); no claim covers these lines; F19 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-47, L52, L62, L75-180, L188, L199-293, L300 (252 of 300 changed lines): no claim covers these lines; claim C6 disputed; claim C3 disputed; F15 breaker (Gemini); F1 breaker (Gemini); F14 breaker (Gemini); claim C5 disputed; claim C7 only AI-read; F18 breaker (Gemini); claim C10 only AI-read; F3 breaker (Gemini); F2 breaker (Gemini); F17 breaker (Gemini); F16 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read; R4 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): claim C3 disputed; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C15 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C16 has no passing test behind it; F23 test run; F24 test run; F25 test run; F26 test run; F21 test run; F22 test run
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C16 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C16 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): R6 honesty (AI-suggested); claim C18 disputed

**Not required to read:**
- 284 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C14, C11, C12, C13, C9, C8, C17

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `ca2ae546b9` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (103s) |
| Pack id | `0d31cbcf8d0b` |

## 1. Disputed claims (5)
**C3 (DISPUTED, behavior, author confidence high):** For a valid formatter, the collector builds an ObjectSerializationInfo whose Formatter is the user's class and whose IsUserDeclaredFormatter is true, with no constructor parameters and no nested formatter.
- Lines: `GeneratedFormatterCollector.cs` L35-46, `GeneratedFormatterCollector.cs` L76-126, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **disputed**: Over-citation in GeneratedFormatterCollector.cs L76-126: lines 77-81 reject class types without an accessible parameterless constructor by reporting MsgPack00xMessagePackAnalyzer.NoDeserializingConstructor (untested), and lines 83-85 plus 112-114 detect IMessagePackSerializationCallbackReceiver and explicit-implementation cast flags (untested and buggy at L85), neither of which C3 describes.

**C5 (DISPUTED, behavior, author confidence high):** Contractless mode serializes every public read-write instance property and field, including inherited ones (the most-derived member wins). Members are ordered by ordinal name and keyed by name as strings. Get-only members such as `Doubled` are skipped.
- Lines: `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L246-291
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassRoundTrips` not found in the test run)
- Breaker: **disputed**: Two issues: (1) GetInstanceMembers (GeneratedFormatterCollector.cs L267) deduplicates member names across all accessibilities before IsPublicReadWrite (L133) filters them, so a private field/property in a derived class hides and drops a public read-write member of the same name on a base class; and IsPublicReadWrite (L279-281) checks only property.GetMethod/SetMethod, which is null in Roslyn when a derived class overrides only one accessor of a public virtual read-write property. (2) Neither ContractlessClassUsesStringKeysForPublicReadWriteMembers nor ContractlessClassRoundTrips tests inherited members or fields (ExternalPerson.cs L7-15 only has non-inherited properties).

**C6 (DISPUTED, behavior, author confidence medium):** `CreateMember` builds a MemberSerializationInfo marked readable and writable. It carries the init-only and required flags, the fully qualified type, and the given int/string key.
- Lines: `GeneratedFormatterCollector.cs` L19-22, `GeneratedFormatterCollector.cs` L215-244
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run)
- Breaker: **disputed**: The named tests ContractlessClassRoundTrips and ContractlessStructRoundTrips only exercise plain get/set auto-properties on ExternalPerson (ExternalPerson.cs L9-11) and ExternalPoint (ExternalPoint.cs L9-11); neither test exercises init-only or required members handled in GeneratedFormatterCollector.cs L219-225.

**C18 (DISPUTED, scope, author confidence high):** Scope: the change adds public API to MessagePack.Annotations, four new error-severity analyzer rules with release notes and docs, and a README section. It removes the new tests from MapModeExecutionTests, so map mode is not exercised for this feature.
- Lines: `AnalyzerReleases.Unshipped.md` L26-29, `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14, `Attributes.cs` L178-181
- Checked by: **AI reading only**
- Breaker: **disputed**: Over-citation in src/MessagePack.Annotations/Attributes.cs L178-181: those cited lines declare public bool IncludeNonPublicMembers { get; set; }, which C18 never mentions and which is completely unimplemented anywhere in MessagePack.SourceGenerator.

**C19 (DISPUTED, docs, author confidence high):** README and analyzer docs describe the attribute, contractless default, surrogate, limitations and MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **disputed**: Documentation mismatches the implementation in three places: (1) doc/analyzers/MsgPack019.md L26 states nesting types must also be partial, but GeneratedFormatterCollector.IsPartial (L293-299) never checks ContainingType so MsgPack019 is not reported for non-partial outer types; (2) doc/analyzers/MsgPack019.md-MsgPack022.md describe patterns flagged by the analyzer, whereas MsgPack00xMessagePackAnalyzer never reports them (only MessagePackGenerator does); (3) README.md L1686 claims 'any struct can be created without one' [an accessible parameterless constructor], which is false in C# 10+ when a struct defines a private/internal parameterless constructor (and GeneratedFormatterCollector.cs L77 fails to reject such structs).


## 2. Refused to decide (6)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | New public API in a shipped package | Public API is a promise to every user; once released it cannot be taken back without a breaking change. A human owner decides. | `Attributes.cs` L166,176,181 | static check |
| R2 | contracts | New or changed analyzer rules | New diagnostics break builds that treat warnings as errors and become part of the package's contract. | `AnalyzerReleases.Unshipped.md` | static check |
| R3 | contracts | Four new user-visible error analyzer rules MsgPack019–022 | New analyzer rules need an owner decision (S4 fail). | `MsgPack00xMessagePackAnalyzer.cs` L318-352 | AI reading |
| R4 | contracts | New public types/members in the generator assembly: GeneratedFormatterRequest record and ObjectSerializationInfo.IsUserDeclaredFormatter | Adds public surface to the source generator assembly. | `GeneratedFormatterRequest.cs` L13-13 | AI reading |
| R5 | honesty | IncludeNonPublicMembers added beyond the requirement and never consumed | Change beyond the requirement that does nothing. | `Attributes.cs` L178-181 | AI reading |
| R6 | honesty | New tests excluded from the map-mode test project | Avoids running the feature under a configuration where it may not pass. | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 | AI reading |

## 3. The story
Adds a public `[GeneratedMessagePackFormatter]` attribute to MessagePack.Annotations. When it is placed on a partial class implementing `IMessagePackFormatter<T>`, the source generator writes the formatter body for T, even when T comes from an assembly that does not reference MessagePack. By default T is serialized contractless: public read-write members, string keys, ordered by name. An optional `SurrogateType` lets a separate type's `[Key]`/`[IgnoreMember]` attributes define keys and which members are serialized. The change adds four new error diagnostics (MsgPack019–022) and reuses existing MsgPack ids for missing, mixed and duplicate surrogate keys. It also adds README and analyzer docs, a dependency-free test assembly, execution round-trip tests, and generator diagnostic tests.

**Why:** Issue 2129: the reporter's library (Project A) must stay free of MessagePack, but a consuming project (Project B) wants a source-generated formatter for one of its types.

**Touches beyond the requirement:**
- New public property `IncludeNonPublicMembers` on the attribute, which the generator never reads
- Surrogate-type mechanism (none of the issue's three proposed alternatives; adds its own key rules)
- Four new user-visible analyzer rules MsgPack019–022, plus release notes and docs
- New public members in the source-generator assembly: `GeneratedFormatterRequest` record and `ObjectSerializationInfo.IsUserDeclaredFormatter`
- FormatterTemplate/StringKeyFormatterTemplate now emit `partial class` for user-declared formatters
- MapModeExecutionTests now excludes the new execution tests
- New test project MessagePack.SourceGenerator.ExternalTypes

**How sure (the author's own view; it moves nothing):** High that the basic contractless path and integer-key surrogate path work end to end; execution tests round-trip a class, a struct and a surrogate-keyed class from a non-MessagePack assembly. Medium on the error paths: only some diagnostics are tested, and diagnostics run through a separate pipeline from model generation. Low on string-key surrogates, map mode, nesting types and init/required members, which have no tests. `IncludeNonPublicMembers` is dead public API.

## 4. Claims (19)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C3 | DISPUTED | For a valid formatter, the collector builds an ObjectSerializationInfo whose Formatter is the user's class and whose IsUserDeclaredFormatter is true, with no constructor parameters and no nested formatter. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | disputed | no |
| C5 | DISPUTED | Contractless mode serializes every public read-write instance property and field, including inherited ones (the most-derived member wins). Members are ordered by ordinal name and keyed by name as strings. Get-only members such as `Doubled` are skipped. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | disputed | no |
| C6 | DISPUTED | `CreateMember` builds a MemberSerializationInfo marked readable and writable. It carries the init-only and required flags, the fully qualified type, and the given int/string key. | "because the actual implementation is source-generated by `MessagePack.SourceGenerator.Mess…" | AI reading only | disputed | no |
| C18 | DISPUTED | Scope: the change adds public API to MessagePack.Annotations, four new error-severity analyzer rules with release notes and docs, and a README section. It removes the new tests from MapModeExecutionTests, so map mode is not exercised for this feature. | (scope) | AI reading only | disputed | no |
| C19 | DISPUTED | README and analyzer docs describe the attribute, contractless default, surrogate, limitations and MsgPack019–022. | (scope) | AI reading only | disputed | no |
| C1 | unverified | A new public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with a `SurrogateType` property is added to MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator finds classes carrying the attribute through ForAttributeWithMetadataName. It reads the `SurrogateType` named argument into a GeneratedFormatterRequest and feeds each request into the model-building loop. | "because the actual implementation is source-generated by `MessagePack.SourceGenerator.Mess…" | AI reading only | upheld | no |
| C7 | unverified | In surrogate mode, keys and membership come from the surrogate's [Key]/[IgnoreMember]. Integer keys produce an int-key array formatter: keys 3 and 7 give 8 slots. Members that are not keyed in the surrogate (Internal) are not serialized. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | upheld | no |
| C10 | unverified | A surrogate member without a usable key reports MemberNeedsKey, and a duplicate key reports KeysMustBeUnique. Neither path is tested. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | AI reading only | upheld | no |
| C15 | unverified | Classes marked with the attribute are excluded from the hand-written custom-formatter scan, so they are registered once (as generated) in GeneratedMessagePackResolver. | "because the actual implementation is source-generated by `MessagePack.SourceGenerator.Mess…" | AI reading only | upheld | no |
| C4 | backed | Both formatter templates emit `partial class <Name>` instead of `internal sealed class <Name>` when IsUserDeclaredFormatter is set, so the generated body merges into the user's class. The .tt and .cs files change together. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | upheld | no |
| C8 | backed | A keyed surrogate member with no public read-write member of the same name and type on T reports MsgPack022 at the surrogate member, and no formatter is generated. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | upheld | yes |
| C9 | backed | Mixing integer and string keys in a surrogate reports the existing DoNotMixStringAndIntKeys diagnostic (MsgPack005) at the first mismatching member. | "As for the attribute-based property keys and other settings (such as Union), I can think o…" | test run | upheld | yes |
| C11 | backed | A non-partial formatter class reports MsgPack019. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | test run | upheld | yes |
| C12 | backed | A formatter that does not implement exactly one IMessagePackFormatter<T> reports MsgPack020. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | test run | upheld | yes |
| C13 | backed | A data type that is generic, abstract, not a class/struct, or inaccessible reports MsgPack021. Only the abstract case is tested. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | test run | upheld | yes |
| C14 | backed | Diagnostics are produced by a separate incremental pipeline that re-runs the collector with a reporter; the model pipeline passes reportDiagnostic: null. New descriptors are registered in SupportedDiagnostics with ids MsgPack019–022. | (scope) | test run | upheld | yes |
| C16 | backed | Execution tests use a real referenced assembly (ExternalTypes) with no MessagePack reference. They show that round-tripping works for a class, a null class, a struct, a surrogate-keyed class and a [MessagePackObject] containing external types, matching the Project A/Project B setup. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | upheld | no |
| C17 | backed | The generator diagnostic tests use a shared Members snippet so the source compiles when generation is declined. Each test asserts one specific diagnostic id at a marked location. | (scope) | test run | upheld | yes |

**C1 (unverified, behavior, author confidence high):** A new public attribute `GeneratedMessagePackFormatterAttribute` (class-only, not inherited, single use) with a `SurrogateType` property is added to MessagePack.Annotations.
- Lines: `Attributes.cs` L143-176
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked Attributes.cs L143-176 and GeneratedFormattersAreRegisteredInGeneratedResolver: GeneratedMessagePackFormatterAttribute is declared with AttributeTargets.Class, AllowMultiple = false, Inherited = false, and defines public Type? SurrogateType { get; set; }.

**C2 (unverified, behavior, author confidence high):** The generator finds classes carrying the attribute through ForAttributeWithMetadataName. It reads the `SurrogateType` named argument into a GeneratedFormatterRequest and feeds each request into the model-building loop.
- Lines: `MessagePackGenerator.cs` L29-37, `MessagePackGenerator.cs` L60-76, `GeneratedFormatterRequest.cs` L1-13, `Constants.cs` L17-18
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs L29-37 and L60-76, GeneratedFormatterRequest.cs L1-13, and Constants.cs L17-18: ForAttributeWithMetadataName locates ClassDeclarationSyntax nodes with GeneratedMessagePackFormatterAttribute, extracts SurrogateType into GeneratedFormatterRequest, and feeds each request into GeneratedFormatterCollector.Collect.

**C7 (unverified, behavior, author confidence high):** In surrogate mode, keys and membership come from the surrogate's [Key]/[IgnoreMember]. Integer keys produce an int-key array formatter: keys 3 and 7 give 8 slots. Members that are not keyed in the surrogate (Internal) are not serialized.
- Lines: `GeneratedFormatterCollector.cs` L143-170, `GeneratedFormatterCollector.cs` L206-213
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L143-170, L206-213, and SurrogateControlsKeysAndMembership (GeneratedFormatterForExternalTypesTests.cs L55-69): [IgnoreMember] members on the surrogate are skipped, integer [Key(3)] and [Key(7)] produce an 8-element MessagePack array, and unkeyed/ignored target members stay at default values.

**C10 (unverified, behavior, author confidence low):** A surrogate member without a usable key reports MemberNeedsKey, and a duplicate key reports KeysMustBeUnique. Neither path is tested.
- Lines: `GeneratedFormatterCollector.cs` L171-179, `GeneratedFormatterCollector.cs` L200-204
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L171-179 and L200-204, and confirmed in GeneratedMessagePackFormatterTests.cs that neither MemberNeedsKey nor KeysMustBeUnique is tested for surrogates.

**C15 (unverified, behavior, author confidence medium):** Classes marked with the attribute are excluded from the hand-written custom-formatter scan, so they are registered once (as generated) in GeneratedMessagePackResolver.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs L35-38 and GeneratedFormattersAreRegisteredInGeneratedResolver: classes carrying MessagePack.GeneratedMessagePackFormatterAttribute are filtered out of customFormattersInThisCompilation so they are only emitted once via ObjectSerializationInfo.

**C4 (backed, generated, author confidence high):** Both formatter templates emit `partial class <Name>` instead of `internal sealed class <Name>` when IsUserDeclaredFormatter is set, so the generated body merges into the user's class. The .tt and .cs files change together.
- Lines: `FormatterTemplate.tt` L14-14, `FormatterTemplate.cs` L33-35, `StringKeyFormatterTemplate.tt` L18-18, `StringKeyFormatterTemplate.cs` L37-39
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S1 passed)
- Breaker: **upheld**: Checked FormatterTemplate.tt L14, FormatterTemplate.cs L33-35, StringKeyFormatterTemplate.tt L18, and StringKeyFormatterTemplate.cs L37-39: both templates and their compiled .cs outputs switch from 'internal sealed class' to 'partial class' when Info.IsUserDeclaredFormatter is true, and execution tests cover both string-key and int-key generated partial formatters.

**C8 (backed, behavior, author confidence high):** A keyed surrogate member with no public read-write member of the same name and type on T reports MsgPack022 at the surrogate member, and no formatter is generated.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `MsgPack00xMessagePackAnalyzer.cs` L345-352
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L189-198, MsgPack00xMessagePackAnalyzer.cs L345-352, SurrogateMemberMustMatchFormattedType, and SurrogateMemberMustHaveMatchingType: missing or type-mismatched surrogate members report MsgPack022 at the surrogate member location and return null so no formatter body is emitted.

**C9 (backed, behavior, author confidence medium):** Mixing integer and string keys in a surrogate reports the existing DoNotMixStringAndIntKeys diagnostic (MsgPack005) at the first mismatching member.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L181-187 and SurrogateKeysMustNotMixStringAndInt (GeneratedMessagePackFormatterTests.cs L173-209): keyKindIsInt locks to the first keyed surrogate member and reports DoNotMixStringAndIntKeys (MsgPack005) on the first member with the other key kind.

**C11 (backed, behavior, author confidence high):** A non-partial formatter class reports MsgPack019.
- Lines: `GeneratedFormatterCollector.cs` L47-51, `GeneratedFormatterCollector.cs` L293-299, `MsgPack00xMessagePackAnalyzer.cs` L318-325
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L47-51 and L293-299, MsgPack00xMessagePackAnalyzer.cs L318-325, and FormatterMustBePartial: a formatter class declaration without the partial modifier reports MsgPack019.

**C12 (backed, behavior, author confidence high):** A formatter that does not implement exactly one IMessagePackFormatter<T> reports MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61, `MsgPack00xMessagePackAnalyzer.cs` L327-334
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L53-61, MsgPack00xMessagePackAnalyzer.cs L327-334, and FormatterMustImplementFormatterOfT: formatterInterfaces.Length != 1 reports MsgPack020 and aborts generation.

**C13 (backed, behavior, author confidence medium):** A data type that is generic, abstract, not a class/struct, or inaccessible reports MsgPack021. Only the abstract case is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74, `MsgPack00xMessagePackAnalyzer.cs` L336-343
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs L63-74, MsgPack00xMessagePackAnalyzer.cs L336-343, and FormattedTypeMustNotBeAbstract: generic, abstract, non-class/struct, and inaccessible data types report MsgPack021, and only the abstract case is covered in GeneratedMessagePackFormatterTests.cs.

**C14 (backed, behavior, author confidence medium):** Diagnostics are produced by a separate incremental pipeline that re-runs the collector with a reporter; the model pipeline passes reportDiagnostic: null. New descriptors are registered in SupportedDiagnostics with ids MsgPack019–022.
- Lines: `MessagePackGenerator.cs` L115-131, `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L381-385
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MessagePackGenerator.cs L72 and L115-131, and MsgPack00xMessagePackAnalyzer.cs L32-35 and L381-385: generatedFormatterDiagnostics runs GeneratedFormatterCollector.Collect with diagnostics.Add while the model pipeline passes reportDiagnostic: null, and MsgPack019-022 are added to SupportedDiagnostics.

**C16 (backed, test, author confidence high):** Execution tests use a real referenced assembly (ExternalTypes) with no MessagePack reference. They show that round-tripping works for a class, a null class, a struct, a surrogate-keyed class and a [MessagePackObject] containing external types, matching the Project A/Project B setup.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L1-95, `GeneratedFormatterForExternalTypes.cs` L1-50, `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked MessagePack.SourceGenerator.ExternalTypes.csproj (zero MessagePack references), ExecutionTests.csproj L17-20, GeneratedFormatterForExternalTypes.cs, and all 7 tests in GeneratedFormatterForExternalTypesTests.cs: all listed scenarios are exercised against types in a separate dependency-free assembly.

**C17 (backed, test, author confidence high):** The generator diagnostic tests use a shared Members snippet so the source compiles when generation is declined. Each test asserts one specific diagnostic id at a marked location.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedMessagePackFormatterTests.cs L1-210: the 5 tests implementing IMessagePackFormatter<MyType> include the shared Members snippet so rejected formatters still compile, and all 6 tests assert one diagnostic ID at a marked location.

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
| F1 | medium | `GeneratedFormatterCollector.cs` L77 | Claim C3 disputed: Over-citation in GeneratedFormatterCollector.cs L76-126: lines 77-81 reject class types without an accessible parameterless constructor by reporting MsgPack00xMessagePackAnalyzer.NoDeserializingConstructor (untested), and lines 83-85 plus 112-114 detect IMessagePackSerializationCallbackReceiver and explicit-implementation cast flags (untested and buggy at L85), neither of which  | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L267 | Claim C5 disputed: Two issues: (1) GetInstanceMembers (GeneratedFormatterCollector.cs L267) deduplicates member names across all accessibilities before IsPublicReadWrite (L133) filters them, so a private field/property in a derived class hides and drops a public read-write member of the same name on a base class; and IsPublicReadWrite (L279-281) checks only property.GetMethod/SetMethod, which is n | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L219 | Claim C6 disputed: The named tests ContractlessClassRoundTrips and ContractlessStructRoundTrips only exercise plain get/set auto-properties on ExternalPerson (ExternalPerson.cs L9-11) and ExternalPoint (ExternalPoint.cs L9-11); neither test exercises init-only or required members handled in GeneratedFormatterCollector.cs L219-225. | breaker (Gemini) |
| F4 | medium | `Attributes.cs` L181 | Claim C18 disputed: Over-citation in src/MessagePack.Annotations/Attributes.cs L178-181: those cited lines declare public bool IncludeNonPublicMembers { get; set; }, which C18 never mentions and which is completely unimplemented anywhere in MessagePack.SourceGenerator. | breaker (Gemini) |
| F5 | medium | `MsgPack019.md` L26 | Claim C19 disputed: Documentation mismatches the implementation in three places: (1) doc/analyzers/MsgPack019.md L26 states nesting types must also be partial, but GeneratedFormatterCollector.IsPartial (L293-299) never checks ContainingType so MsgPack019 is not reported for non-partial outer types; (2) doc/analyzers/MsgPack019.md-MsgPack022.md describe patterns flagged by the analyzer, whereas Msg | breaker (Gemini) |
| F6 | medium | `Attributes.cs` L181 | `IncludeNonPublicMembers` is a new public, shipped property that the generator never reads. Setting it has no effect, and it commits the library to an unimplemented API. | author (Claude) |
| F7 | low | `GeneratedFormatterCollector.cs` L293 | IsPartial checks only the formatter's own declaration. If the formatter is nested in a non-partial type, no MsgPack019 is reported, even though the docs say nesting types must be partial; the generated partial declaration would then fail to compile with a less clear error. | author (Claude) |
| F8 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate scanning includes all instance fields and properties, including private ones and those inherited from base types. Any unkeyed private member of the surrogate (e.g. a helper field) triggers MemberNeedsKey and blocks generation. | author (Claude) |
| F9 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with a location and no message arguments. If that descriptor's message format has placeholders, the message renders unfilled. This path is untested. | author (Claude) |
| F10 | low | `MessagePackGenerator.cs` L117 | The collector runs twice per formatter (once for models, once for diagnostics), and GeneratedFormatterRequest holds ISymbols in the incremental pipeline. Combined with CompilationProvider, this defeats caching and re-runs on every edit. | author (Claude) |
| F11 | low | `GeneratedFormatterCollector.cs` L208 | The string-key surrogate path (where intKey uses members.Count) has no execution or generator test. | author (Claude) |
| F12 | low | `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L14 | The new execution tests are excluded from map mode instead of being made to work there. Surrogate int-key formatters under force-map mode are therefore unverified. | author (Claude) |
| F13 | high | `Attributes.cs` L181 | GeneratedMessagePackFormatterAttribute.IncludeNonPublicMembers is added as shipped public API with XML docs promising serialization of non-public members, but it is never read in MessagePackGenerator.cs (L31-35) or implemented in GeneratedFormatterCollector.cs (L133, L190), so setting IncludeNonPublicMembers = true silently has no effect. | breaker (Gemini) |
| F14 | high | `GeneratedFormatterCollector.cs` L85 | Explicit interface implementation detection for IMessagePackSerializationCallbackReceiver checks m.ExplicitInterfaceImplementations.Length > 0 && (m.Name == "OnBeforeSerialize" \|\| m.Name == "OnAfterDeserialize"). In Roslyn C#, an explicit interface implementation's IMethodSymbol.Name is prefixed with the interface name (e.g. "MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize" | breaker (Gemini) |
| F15 | medium | `GeneratedFormatterCollector.cs` L47 | GeneratedFormatterCollector.Collect never validates that the user-declared formatter class itself is non-abstract, non-generic, accessible, and has an accessible parameterless constructor. Because GeneratorUtilities.cs L38 bypasses FormatterDescriptor.TryCreate for [GeneratedMessagePackFormatter] classes, declaring an abstract or generic partial formatter (or one with a custom parameterized/privat | breaker (Gemini) |
| F16 | medium | `GeneratedFormatterCollector.cs` L293 | IsPartial only checks the partial modifier on the formatter symbol itself and ignores symbol.ContainingType, whereas FormatterTemplate and StringKeyFormatterTemplate emit partial wrappers for all enclosing types via EmitNestingTypesAndNamespaces. A partial formatter nested inside a non-partial class fails with C# compiler error CS0260 instead of reporting MsgPack019. | breaker (Gemini) |
| F17 | medium | `GeneratedFormatterCollector.cs` L267 | GetInstanceMembers deduplicates seen.Add(member.Name) before checking accessibility, and IsPublicReadWrite (L279-281) only inspects property.GetMethod/SetMethod on the most-derived symbol. As a result, a private field or property on a derived type hides and drops a same-named public read-write member on its base type, and a public virtual read-write property whose derived class overrides only get  | breaker (Gemini) |
| F18 | medium | `GeneratedFormatterCollector.cs` L171 | CreateSurrogateMembers accepts negative integer keys (e.g. [Key(-1)] passes 'key is not (int or string)') without reporting a diagnostic, and allows omitting or [IgnoreMember]-excluding C# 'required' members of the formatted type (also skipped in contractless mode if get-only/non-public), both of which cause the generated formatter to fail compilation (invalid array formatter code or CS9035 on 'ne | breaker (Gemini) |
| F19 | medium | `MsgPack00xMessagePackAnalyzer.cs` L382 | MsgPack019-MsgPack022 are added to MsgPack00xMessagePackAnalyzer.SupportedDiagnostics, but MsgPack00xMessagePackAnalyzer.Initialize contains no analysis logic for [GeneratedMessagePackFormatter]; diagnostics are only emitted by MessagePackGenerator. Analyzer-only execution never reports MsgPack019-MsgPack022, and if Options.IsGeneratingSource is false (MessagePackGenerator.cs L135), the partial fo | breaker (Gemini) |
| F20 | low | `MessagePackGenerator.cs` L34 | Extracting SurrogateType uses 'as INamedTypeSymbol'. If a user passes a non-named type such as typeof(int[]), the cast returns null, silently falling back to contractless mode instead of reporting a diagnostic; open generic surrogates such as typeof(MySurrogate<>) are also not rejected. | breaker (Gemini) |
| F21 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F22 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F23 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F24 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F25 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F26 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

**Out of scope changes:**
- `src/MessagePack.Annotations/Attributes.cs`: `IncludeNonPublicMembers` property is not requested and not implemented.
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs`: Surrogate-type design: a new mechanism for keys, not one of the three alternatives in the issue. Union is not supported.
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj`: Excludes new test files from the map-mode run.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | pass | 2 template(s), each with its .cs counterpart changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | fail | public declarations added: src/MessagePack.Annotations/Attributes.cs L166,176,181 |
| S4 | No new user-visible analyzer rules | fail | analyzer release notes or descriptors changed (src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md); rule ids mentioned in added lines: MsgPack019, MsgPack022, MsgPack020, MsgPack021, MsgPack005 |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 13 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (103s)

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

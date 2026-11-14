# Evidence pack: REQ-2129 on `seeded-03`

> **REVIEW PARTLY INCOMPLETE: 3 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: test project MessagePack.SourceGenerator.ExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.ExternalTypes.csproj: no results. Effect: claims that rely on tests in that project are not backed and release nothing.
> - **tests**: test project MessagePack.SourceGenerator.MapModeExecutionTests.csproj: build failed on base too. Effect: claims that rely on tests in that project are not backed and release nothing.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 807 of 884 changed code lines (91%).** Docs: 159 lines, read with the story (159 flagged). Of everything changed: 93%.

- Refused to decide (contracts: New public API in a shipped package; contracts: New or changed analyzer rules). The owner reads these files in full.
- 2 refusal(s) on contracts grounds need a human look.
- 12 claim(s) disputed by the breaker or by the evidence check.
- 5 behaviour claim(s) rest on AI reading only (no passing test).
- 3 high-severity finding(s).
- Evidence took 77 of 884 changed code lines off the list (C6, C8, C13, C14, C17, C18: tests found passing in the real run, claim upheld by the breaker). 807 stay with the owner.
- Why lines stay: 477 claim disputed; 156 cited only by claims without a passing test; 86 refused; 42 claim rests on AI reading only; 27 no claim covers the line; 19 named by a finding.

**The owner must read** (28 files):
- `src/MessagePack.Annotations/Attributes.cs` whole file diff (36 changed lines): claim C1 only AI-read (L143-177); R1 contracts
- `src/MessagePack.SourceGenerator/AnalyzerReleases.Unshipped.md` whole file diff (4 changed lines): R2 contracts
- `README.md` L1639-1690 (52 of 52 changed lines): claim C27 disputed
- `doc/analyzers/MsgPack019.md` L1-26 (26 of 26 changed lines): claim C27 disputed; F12 breaker (Gemini)
- `doc/analyzers/MsgPack020.md` L1-23 (23 of 23 changed lines): claim C27 disputed
- `doc/analyzers/MsgPack021.md` L1-23 (23 of 23 changed lines): claim C27 disputed
- `doc/analyzers/MsgPack022.md` L1-31 (31 of 31 changed lines): claim C27 disputed
- `doc/analyzers/index.md` L26-29 (4 of 4 changed lines): claim C27 disputed
- `src/MessagePack.SourceGenerator/Analyzers/MsgPack00xMessagePackAnalyzer.cs` L318-352 (35 of 46 changed lines): R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterCollector.cs` L1-43, L47, L52-62, L75-180, L188, L199-285, L292, L300 (251 of 300 changed lines): claim C16 disputed; F6 breaker (Gemini); no claim covers these lines; F19 breaker (Gemini); claim C7 disputed; F1 breaker (Gemini); claim C9 only AI-read; F18 breaker (Gemini); claim C10 disputed; C4 has no passing test behind it; F23 breaker (Gemini); R4 contracts (AI-suggested); F2 breaker (Gemini); F13 author (Claude); claim C12 disputed; F4 breaker (Gemini); F21 breaker (Gemini); F5 breaker (Gemini); claim C15 disputed; claim C11 disputed; F3 breaker (Gemini)
- `src/MessagePack.SourceGenerator/CodeAnalysis/GeneratedFormatterRequest.cs` L1-13 (13 of 13 changed lines): claim C2 only AI-read
- `src/MessagePack.SourceGenerator/CodeAnalysis/ObjectSerializationInfo.cs` L13-18, L168 (7 of 7 changed lines): C4 has no passing test behind it; no claim covers these lines
- `src/MessagePack.SourceGenerator/GeneratorUtilities.cs` L35-36, L38 (3 of 3 changed lines): claim C5 only AI-read
- `src/MessagePack.SourceGenerator/MessagePackGenerator.cs` L29-35, L37, L60, L65, L70-77, L132 (22 of 39 changed lines): claim C2 only AI-read; F20 breaker (Gemini); claim C3 only AI-read; F22 breaker (Gemini); no claim covers these lines
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33-35 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37-39 (4 of 4 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Utils/Constants.cs` L17-18 (2 of 2 changed lines): claim C2 only AI-read
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypes.cs` L1-50 (50 of 50 changed lines): C19 has no passing test behind it; F26 test run; F28 test run; F30 test run; F31 test run; F27 test run; F29 test run; no claim covers these lines; claim C24 disputed
- `tests/MessagePack.SourceGenerator.ExecutionTests/GeneratedFormatterForExternalTypesTests.cs` L1-95 (95 of 95 changed lines): claim C20 disputed; F7 breaker (Gemini); no claim covers these lines; claim C21 disputed; F8 breaker (Gemini); claim C22 disputed; F9 breaker (Gemini); C23 has no passing test behind it; claim C24 disputed; F10 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.ExecutionTests/MessagePack.SourceGenerator.ExecutionTests.csproj` L17-21 (5 of 5 changed lines): C19 has no passing test behind it; no claim covers these lines
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPerson.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalPoint.cs` L1-12 (12 of 12 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/ExternalWidget.cs` L1-15 (15 of 15 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.ExternalTypes/MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17 (17 of 17 changed lines): C19 has no passing test behind it
- `tests/MessagePack.SourceGenerator.MapModeExecutionTests/MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14 (3 of 3 changed lines): C26 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/GeneratedMessagePackFormatterTests.cs` L1-210 (210 of 210 changed lines): claim C25 disputed; F11 breaker (Gemini)

**Not required to read:**
- 77 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C18, C6, C8, C13, C14, C17

| | |
|---|---|
| Requirement | REQ-2129: Feature Request: Allow generation of Formatter for a type in a referenced assembly |
| Commit | `4dd28e3b99` (base `32258fdbee`) |
| Files | 28 changed, 28 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): 32,844 in / 14,016 out, 111 s, $0.41 |
| Breaker model | gemini-4-carbon: 27,258 in / 29,790 out, 320 s, $0.35 |
| Cost and time | $0.76 at list price, 433 s for this pack (tests reused from an earlier run of this commit: 80 s) |
| Tests | ran 173 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 173 passed, 0 failed, 0 skipped (80s) |
| Pack id | `ec807dea33b3` |

## 1. Disputed claims (12)
**C7 (DISPUTED, behavior, author confidence high):** An attributed class that does not implement exactly one closed IMessagePackFormatter<T> gets MsgPack020.
- Lines: `GeneratedFormatterCollector.cs` L53-61
- Checked by: **test run** (test `FormatterMustImplementFormatterOfT` passed (1 case))
- Breaker: **disputed**: GeneratedFormatterCollector.cs lines 54-61 only checks i.IsGenericType and SymbolEqualityComparer.Default.Equals(i.OriginalDefinition, openFormatterInterface) with formatterInterfaces.Length != 1; it does not check that IMessagePackFormatter<T> is closed. A generic formatter class implementing open IMessagePackFormatter<T> (e.g. partial class MyFormatter<T> : IMessagePackFormatter<T>) passes line 57 and reports MsgPack021 at line 68 instead of MsgPack020.

**C10 (DISPUTED, behavior, author confidence low):** In contractless mode (no surrogate) every public read-write instance property/field is serialized under its own name as a string key. The code as written skips the last member in name order because of the `Count - 1` loop bound, so this claim does not hold.
- Lines: `GeneratedFormatterCollector.cs` L87-102, `GeneratedFormatterCollector.cs` L128-141, `GeneratedFormatterCollector.cs` L277-284
- Checked by: **AI reading only** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run)
- Breaker: **disputed**: CreateContractlessMembers at GeneratedFormatterCollector.cs line 135 uses loop bound i < targets.Count - 1, dropping the last alphabetically-ordered public read-write member. The requirement is not met and all three named tests (ContractlessClassRoundTrips, ContractlessStructRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers) fail at runtime because ExternalPerson.Label and ExternalPoint.Y are omitted.

**C11 (DISPUTED, behavior, author confidence medium):** GetInstanceMembers walks the type and its base types up to object. It skips static, compiler-generated and indexer members and keeps only the most derived member of each name.
- Lines: `GeneratedFormatterCollector.cs` L246-275
- Checked by: **AI reading only** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run)
- Breaker: **disputed**: The named test ContractlessClassUsesStringKeysForPublicReadWriteMembers (GeneratedFormatterForExternalTypesTests.cs lines 24-34) uses flat class ExternalPerson with no base class hierarchy, no shadowed members, no static members, and no indexers, so it does not test those behaviors of GetInstanceMembers, and the test itself fails at line 29 due to the targets.Count - 1 bug at GeneratedFormatterCollector.cs line 135.

**C12 (DISPUTED, behavior, author confidence medium):** In surrogate mode, members with [IgnoreMember] are skipped. Every other surrogate instance member must carry an int or string [Key], or MsgPack004 is reported.
- Lines: `GeneratedFormatterCollector.cs` L143-179
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: First, the named test SurrogateControlsKeysAndMembership (GeneratedFormatterForExternalTypesTests.cs lines 55-69) does not test missing [Key] reporting MsgPack004 (GeneratedFormatterCollector.cs lines 171-178), and no test in the diff covers MsgPack004 on surrogates. Second, the requirement_quote asks for user-defined copies of MessagePack attributes, whereas lines 164 and 169 match referenceSymbols.IgnoreAttribute and referenceSymbols.KeyAttribute from MessagePack.Annotations by symbol equality.

**C15 (DISPUTED, behavior, author confidence medium):** Duplicate surrogate keys report MsgPack (KeysMustBeUnique). Int keys keep their numeric value, and string-keyed members get sequential int indices. The resulting key kind sets isIntKey, so keys 3 and 7 produce an 8-slot array.
- Lines: `GeneratedFormatterCollector.cs` L200-213
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S5 passed)
- Breaker: **disputed**: The named test SurrogateControlsKeysAndMembership (GeneratedFormatterForExternalTypesTests.cs lines 55-69) only tests unique integer keys 3 and 7; neither it nor any other test in the diff tests duplicate surrogate keys reporting KeysMustBeUnique (GeneratedFormatterCollector.cs lines 200-204) or string-keyed surrogate members (line 208).

**C16 (DISPUTED, behavior, author confidence medium):** CreateMember builds a writable/readable MemberSerializationInfo with init-only/required flags, fully qualified and short type names, and no DeclaringType. Callback-receiver detection on T sets the callback/cast flags.
- Lines: `GeneratedFormatterCollector.cs` L1-42, `GeneratedFormatterCollector.cs` L83-85, `GeneratedFormatterCollector.cs` L215-244
- Checked by: **AI reading only** (named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **disputed**: Three issues: (1) GeneratedFormatterCollector.cs lines 84-85 fails to set needsCast for explicit interface implementations because in Roslyn C# an explicit interface method's IMethodSymbol.Name includes the interface prefix (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize), so m.Name == "OnBeforeSerialize" || m.Name == "OnAfterDeserialize" is always false; (2) the named test SurrogateControlsKeysAndMembership does not test init-only, required, or IMessagePackSerializationCallbackReceiver members; (3) citing lines 1-42 over-cites file headers and the Collect method signature (lines 1-18 and 24-42).

**C20 (DISPUTED, test, author confidence medium):** Test ContractlessClassRoundTrips round-trips an ExternalPerson through GeneratedMessagePackResolver and asserts both Id and Label.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L1-21
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; static check S8 passed)
- Breaker: **disputed**: ContractlessClassRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 12-21) does not round-trip ExternalPerson: GeneratedFormatterCollector.cs line 135 (i < targets.Count - 1) omits Label from ExternalPersonFormatter, causing Assert.Equal("seven", result.Label) at line 20 to fail with null.

**C21 (DISPUTED, test, author confidence medium):** Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a 2-entry fixmap with Id/Label string keys and no read-only Doubled.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L23-34
- Checked by: **static check** (named test `ContractlessClassUsesStringKeysForPublicReadWriteMembers` not found in the test run; static check S8 passed)
- Breaker: **disputed**: ContractlessClassUsesStringKeysForPublicReadWriteMembers (GeneratedFormatterForExternalTypesTests.cs lines 24-34) fails at line 29 (bytes[0] is 0x81 rather than 0x82) and line 32 ("Label":"x" is absent) because GeneratedFormatterCollector.cs line 135 omits the last member Label.

**C22 (DISPUTED, test, author confidence medium):** Test ContractlessClassNullRoundTrips round-trips a null reference; ContractlessStructRoundTrips round-trips a struct (X, Y).
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L36-52
- Checked by: **static check** (named test `ContractlessClassNullRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; static check S8 passed)
- Breaker: **disputed**: ContractlessStructRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 44-52) fails to round-trip ExternalPoint: GeneratedFormatterCollector.cs line 135 omits Y, so result.Y is 0 and Assert.Equal(-4, result.Y) at line 51 fails.

**C24 (DISPUTED, test, author confidence medium):** Test MessagePackObjectCanContainExternalTypes checks that a [MessagePackObject] containing external types resolves their generated formatters. GeneratedFormattersAreRegisteredInGeneratedResolver checks that the resolver returns the user's formatter classes.
- Lines: `GeneratedFormatterForExternalTypes.cs` L39-50, `GeneratedFormatterForExternalTypesTests.cs` L71-95
- Checked by: **static check** (named test `MessagePackObjectCanContainExternalTypes` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S8 passed)
- Breaker: **disputed**: MessagePackObjectCanContainExternalTypes (GeneratedFormatterForExternalTypesTests.cs lines 72-86) fails at line 83 (Assert.Equal("five", result.Person.Label)) because ExternalPersonFormatter uses contractless mode and drops Label due to GeneratedFormatterCollector.cs line 135.

**C25 (DISPUTED, test, author confidence high):** The generator diagnostic test class uses hand-written Serialize/Deserialize members so the test sources compile when generation is declined. The shared fixture lines belong to the diagnostic tests.
- Lines: `GeneratedMessagePackFormatterTests.cs` L1-210
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case); test `SurrogateKeysMustNotMixStringAndInt` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **disputed**: Over-citation: C25 cites the entire 210-line GeneratedMessagePackFormatterTests.cs while only describing the shared fixture and Members stub at lines 1-27, leaving the six test methods at lines 28-210 undescribed (and FormatterMustImplementFormatterOfT at lines 56-75 does not use Members).

**C27 (DISPUTED, docs, author confidence high):** The README and analyzer docs describe the attribute, contractless/surrogate modes, limitations, and MsgPack019–022.
- Lines: `README.md` L1639-1690, `MsgPack019.md` L1-26, `MsgPack020.md` L1-23, `MsgPack021.md` L1-23, `MsgPack022.md` L1-31, `index.md` L26-29
- Checked by: **AI reading only**
- Breaker: **disputed**: Two cited documentation statements contradict the implementation: doc/analyzers/MsgPack019.md line 26 states containing nesting types must also be declared partial, whereas GeneratedFormatterCollector.IsPartial (GeneratedFormatterCollector.cs lines 293-299) never checks ContainingType; and README.md line 1655 states contractless mode serializes every public read-write member, whereas GeneratedFormatterCollector.cs line 135 omits the last member.


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
| C7 | DISPUTED | An attributed class that does not implement exactly one closed IMessagePackFormatter<T> gets MsgPack020. | "partial classes implementing `IMessagePackFormatter<T>`" | test run | disputed | no |
| C10 | DISPUTED | In contractless mode (no surrogate) every public read-write instance property/field is serialized under its own name as a string key. The code as written skips the last member in name order because of the `Count - 1` loop bound, so this claim does not hold. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | AI reading only | disputed | no |
| C11 | DISPUTED | GetInstanceMembers walks the type and its base types up to object. It skips static, compiler-generated and indexer members and keeps only the most derived member of each name. | (scope) | AI reading only | disputed | no |
| C12 | DISPUTED | In surrogate mode, members with [IgnoreMember] are skipped. Every other surrogate instance member must carry an int or string [Key], or MsgPack004 is reported. | "Allow the generator and analyzers to work with user-defined versions of the MessagePack at…" | AI reading only | disputed | no |
| C15 | DISPUTED | Duplicate surrogate keys report MsgPack (KeysMustBeUnique). Int keys keep their numeric value, and string-keyed members get sequential int indices. The resulting key kind sets isIntKey, so keys 3 and 7 produce an 8-slot array. | (scope) | static check | disputed | no |
| C16 | DISPUTED | CreateMember builds a writable/readable MemberSerializationInfo with init-only/required flags, fully qualified and short type names, and no DeclaringType. Callback-receiver detection on T sets the callback/cast flags. | (scope) | AI reading only | disputed | no |
| C20 | DISPUTED | Test ContractlessClassRoundTrips round-trips an ExternalPerson through GeneratedMessagePackResolver and asserts both Id and Label. | "I need to have a source-generated `IMessagePackFormatter` for type `ProjectA.MyType` gener…" | static check | disputed | no |
| C21 | DISPUTED | Test ContractlessClassUsesStringKeysForPublicReadWriteMembers asserts a 2-entry fixmap with Id/Label string keys and no read-only Doubled. | (scope) | static check | disputed | no |
| C22 | DISPUTED | Test ContractlessClassNullRoundTrips round-trips a null reference; ContractlessStructRoundTrips round-trips a struct (X, Y). | (scope) | static check | disputed | no |
| C24 | DISPUTED | Test MessagePackObjectCanContainExternalTypes checks that a [MessagePackObject] containing external types resolves their generated formatters. GeneratedFormattersAreRegisteredInGeneratedResolver checks that the resolver returns the user's formatter classes. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | static check | disputed | no |
| C25 | DISPUTED | The generator diagnostic test class uses hand-written Serialize/Deserialize members so the test sources compile when generation is declined. The shared fixture lines belong to the diagnostic tests. | (scope) | test run | disputed | no |
| C27 | DISPUTED | The README and analyzer docs describe the attribute, contractless/surrogate modes, limitations, and MsgPack019–022. | (scope) | AI reading only | disputed | no |
| C1 | unverified | A public, non-inherited, class-only `GeneratedMessagePackFormatterAttribute` with a nullable `Type SurrogateType` property is added to the MessagePack namespace in MessagePack.Annotations. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C2 | unverified | The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent, into a GeneratedFormatterRequest. | "Add a `[GeneratedMessagePackFormatter]` attribute that will work for partial classes imple…" | AI reading only | upheld | no |
| C3 | unverified | Requests are combined with the existing object/union inputs (tuple indices shifted one level). Each successful GeneratedFormatterCollector model is added to the per-type models that feed the generated resolver. | "the actual implementation is source-generated by `MessagePack.SourceGenerator.MessagePackG…" | AI reading only | upheld | no |
| C5 | unverified | Classes carrying `[GeneratedMessagePackFormatter]` are excluded from hand-written custom formatter discovery, so they are not registered twice in the resolver. | (scope) | AI reading only | upheld | no |
| C9 | unverified | A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic. | (scope) | AI reading only | upheld | no |
| C4 | backed | An ObjectSerializationInfo built for an attributed formatter sets Formatter to the user's class and IsUserDeclaredFormatter=true, which takes part in equality. Both the int-key and string-key templates then emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's declaration. | "The class does not even need to declare a body (no `{` and `}`), because the actual implem…" | static check | upheld | no |
| C6 | backed | A non-partial attributed class gets MsgPack019 at the class location, and no model is produced. | "will work for partial classes implementing `IMessagePackFormatter<T>`" | test run | upheld | yes |
| C8 | backed | The data type T must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract case is tested. | (scope) | test run | upheld | yes |
| C13 | backed | Mixing int and string keys in a surrogate reports MsgPack005 (DoNotMixStringAndIntKeys) at the offending member. | (scope) | test run | upheld | yes |
| C14 | backed | A keyed surrogate member must match a public read-write member of T with the same name and the same type; otherwise MsgPack022 is reported at the surrogate member. | (scope) | test run | upheld | yes |
| C17 | backed | Diagnostics for attributed formatters are produced by a separate pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. The model pipeline passes a null sink. | (scope) | test run | upheld | yes |
| C18 | backed | Four new Error-severity descriptors MsgPack019–022 are declared, added to SupportedDiagnostics, and listed in AnalyzerReleases.Unshipped.md. | (scope) | test run | upheld | yes |
| C19 | backed | The execution tests model the issue's scenario. A new ExternalTypes project with no MessagePack reference defines ExternalPerson/ExternalPoint/ExternalWidget. The test project references it and declares empty partial formatters plus a surrogate. | "Project B ... References ... Project A ... because the latter has no (and cannot have) ref…" | static check | upheld | no |
| C23 | backed | Test SurrogateControlsKeysAndMembership asserts an 8-element array from keys 3/7 and that the [IgnoreMember] Internal value is not round-tripped. | (scope) | static check | upheld | no |
| C26 | backed | MapModeExecutionTests now excludes GeneratedFormatterForExternalTypes*.cs, because that project does not reference ExternalTypes. The new feature is therefore not exercised in force-map mode. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence high):** A public, non-inherited, class-only `GeneratedMessagePackFormatterAttribute` with a nullable `Type SurrogateType` property is added to the MessagePack namespace in MessagePack.Annotations.
- Lines: `Attributes.cs` L143-177
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked Attributes.cs lines 165-177: GeneratedMessagePackFormatterAttribute is public, restricted to AttributeTargets.Class with AllowMultiple = false and Inherited = false, in namespace MessagePack, with a public Type? SurrogateType property.

**C2 (unverified, behavior, author confidence high):** The generator discovers class declarations carrying the attribute via ForAttributeWithMetadataName. It reads the `SurrogateType` named argument as an INamedTypeSymbol, or null when absent, into a GeneratedFormatterRequest.
- Lines: `MessagePackGenerator.cs` L29-37, `Constants.cs` L17-18, `GeneratedFormatterRequest.cs` L1-13
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 29-37, Constants.cs lines 17-18, and GeneratedFormatterRequest.cs lines 1-13: ForAttributeWithMetadataName targets ClassDeclarationSyntax with MessagePack.GeneratedMessagePackFormatterAttribute and reads SurrogateType via as INamedTypeSymbol into GeneratedFormatterRequest.

**C3 (unverified, behavior, author confidence medium):** Requests are combined with the existing object/union inputs (tuple indices shifted one level). Each successful GeneratedFormatterCollector model is added to the per-type models that feed the generated resolver.
- Lines: `MessagePackGenerator.cs` L60-76
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 60-76: existing object and union inputs shift one tuple level deeper, and each non-null FullModel returned by GeneratedFormatterCollector.Collect is added to modelPerType.

**C5 (unverified, behavior, author confidence medium):** Classes carrying `[GeneratedMessagePackFormatter]` are excluded from hand-written custom formatter discovery, so they are not registered twice in the resolver.
- Lines: `GeneratorUtilities.cs` L35-38
- Checked by: **AI reading only** (named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run)
- Breaker: **upheld**: Checked GeneratorUtilities.cs lines 35-38: classes carrying MessagePack.GeneratedMessagePackFormatterAttribute are excluded from customFormattersInThisCompilation.

**C9 (unverified, behavior, author confidence low):** A class data type without an accessible parameterless constructor is rejected with the existing NoDeserializingConstructor diagnostic.
- Lines: `GeneratedFormatterCollector.cs` L76-81
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 76-81: for class types lacking a parameterless instance constructor accessible from the formatter, NoDeserializingConstructor is reported and null is returned.

**C4 (backed, behavior, author confidence medium):** An ObjectSerializationInfo built for an attributed formatter sets Formatter to the user's class and IsUserDeclaredFormatter=true, which takes part in equality. Both the int-key and string-key templates then emit `partial class <UserFormatter>` instead of `internal sealed class`, so the generated body merges into the user's declaration.
- Lines: `GeneratedFormatterCollector.cs` L104-126, `ObjectSerializationInfo.cs` L13-17, `ObjectSerializationInfo.cs` L168-168, `FormatterTemplate.cs` L33-35, `FormatterTemplate.tt` L14-14, `StringKeyFormatterTemplate.cs` L37-39, `StringKeyFormatterTemplate.tt` L18-18
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; named test `GeneratedFormattersAreRegisteredInGeneratedResolver` not found in the test run; static check S1 passed; static check S5 passed)
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 104-126, ObjectSerializationInfo.cs lines 17 and 168, FormatterTemplate.tt line 14 / .cs lines 33-35, and StringKeyFormatterTemplate.tt line 18 / .cs lines 37-39: Formatter is set to the user class, IsUserDeclaredFormatter is set to true and compared in Equals, and both templates emit partial class instead of internal sealed class.

**C6 (backed, behavior, author confidence high):** A non-partial attributed class gets MsgPack019 at the class location, and no model is produced.
- Lines: `GeneratedFormatterCollector.cs` L44-51, `GeneratedFormatterCollector.cs` L293-299
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 44-51 and 293-299 and test FormatterMustBePartial: non-partial class declarations report MsgPack019 at the formatter location and return null.

**C8 (backed, behavior, author confidence medium):** The data type T must be a non-generic, non-abstract class or struct that is accessible from the formatter; otherwise MsgPack021 is reported. Only the abstract case is tested.
- Lines: `GeneratedFormatterCollector.cs` L63-74
- Checked by: **test run** (test `FormattedTypeMustNotBeAbstract` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 63-74 and FormattedTypeMustNotBeAbstract in GeneratedMessagePackFormatterTests.cs lines 78-102: dataTypeSymbol must be an accessible, non-generic, non-abstract class or struct or MsgPack021 is reported, and only the abstract case is tested.

**C13 (backed, behavior, author confidence high):** Mixing int and string keys in a surrogate reports MsgPack005 (DoNotMixStringAndIntKeys) at the offending member.
- Lines: `GeneratedFormatterCollector.cs` L181-187
- Checked by: **test run** (test `SurrogateKeysMustNotMixStringAndInt` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 181-187 and SurrogateKeysMustNotMixStringAndInt in GeneratedMessagePackFormatterTests.cs lines 173-209: mixing int and string keys reports DoNotMixStringAndIntKeys (MsgPack005) on the offending surrogate member.

**C14 (backed, behavior, author confidence high):** A keyed surrogate member must match a public read-write member of T with the same name and the same type; otherwise MsgPack022 is reported at the surrogate member.
- Lines: `GeneratedFormatterCollector.cs` L189-198, `GeneratedFormatterCollector.cs` L286-291
- Checked by: **test run** (test `SurrogateMemberMustMatchFormattedType` passed (1 case); test `SurrogateMemberMustHaveMatchingType` passed (1 case))
- Breaker: **upheld**: Checked GeneratedFormatterCollector.cs lines 189-198 and 286-291 along with SurrogateMemberMustMatchFormattedType and SurrogateMemberMustHaveMatchingType: missing or non-public/read-only target members or mismatched member types report MsgPack022 at the surrogate member.

**C17 (backed, behavior, author confidence high):** Diagnostics for attributed formatters are produced by a separate pipeline that re-runs the collector with a diagnostic sink and reports via RegisterSourceOutput. The model pipeline passes a null sink.
- Lines: `MessagePackGenerator.cs` L115-131
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MessagePackGenerator.cs lines 72 and 115-131: the model pipeline passes reportDiagnostic: null while generatedFormatterDiagnostics re-runs GeneratedFormatterCollector.Collect with diagnostics.Add and reports via RegisterSourceOutput.

**C18 (backed, scope, author confidence high):** Four new Error-severity descriptors MsgPack019–022 are declared, added to SupportedDiagnostics, and listed in AnalyzerReleases.Unshipped.md.
- Lines: `MsgPack00xMessagePackAnalyzer.cs` L32-35, `MsgPack00xMessagePackAnalyzer.cs` L318-353, `MsgPack00xMessagePackAnalyzer.cs` L381-385, `AnalyzerReleases.Unshipped.md` L26-29
- Checked by: **test run** (test `FormatterMustBePartial` passed (1 case); test `FormatterMustImplementFormatterOfT` passed (1 case); test `FormattedTypeMustNotBeAbstract` passed (1 case); test `SurrogateMemberMustMatchFormattedType` passed (1 case))
- Breaker: **upheld**: Checked MsgPack00xMessagePackAnalyzer.cs lines 32-35, 318-353, and 381-385, and AnalyzerReleases.Unshipped.md lines 26-29: MsgPack019 through MsgPack022 are declared with DiagnosticSeverity.Error, included in SupportedDiagnostics, and recorded in AnalyzerReleases.Unshipped.md.

**C19 (backed, test, author confidence high):** The execution tests model the issue's scenario. A new ExternalTypes project with no MessagePack reference defines ExternalPerson/ExternalPoint/ExternalWidget. The test project references it and declares empty partial formatters plus a surrogate.
- Lines: `MessagePack.SourceGenerator.ExternalTypes.csproj` L1-17, `ExternalPerson.cs` L1-15, `ExternalPoint.cs` L1-12, `ExternalWidget.cs` L1-15, `MessagePack.SourceGenerator.ExecutionTests.csproj` L17-20, `GeneratedFormatterForExternalTypes.cs` L1-37
- Checked by: **static check** (named test `ContractlessClassRoundTrips` not found in the test run; named test `ContractlessStructRoundTrips` not found in the test run; named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked ExternalTypes.csproj (zero MessagePack references), ExternalPerson.cs, ExternalPoint.cs, ExternalWidget.cs, ExecutionTests.csproj lines 17-20, and GeneratedFormatterForExternalTypes.cs lines 1-37: the project reference, dependency-free external types, empty partial formatters, and surrogate class match the claim.

**C23 (backed, test, author confidence high):** Test SurrogateControlsKeysAndMembership asserts an 8-element array from keys 3/7 and that the [IgnoreMember] Internal value is not round-tripped.
- Lines: `GeneratedFormatterForExternalTypesTests.cs` L54-69
- Checked by: **static check** (named test `SurrogateControlsKeysAndMembership` not found in the test run; static check S8 passed)
- Breaker: **upheld**: Checked GeneratedFormatterForExternalTypesTests.cs lines 54-69 and GeneratedFormatterForExternalTypes.cs lines 19-37: SurrogateControlsKeysAndMembership verifies ReadArrayHeader() == 8 for keys 3 and 7 and verifies Internal resets to 0 instead of round-tripping 99.

**C26 (backed, scope, author confidence high):** MapModeExecutionTests now excludes GeneratedFormatterForExternalTypes*.cs, because that project does not reference ExternalTypes. The new feature is therefore not exercised in force-map mode.
- Lines: `MessagePack.SourceGenerator.MapModeExecutionTests.csproj` L13-14
- Checked by: **static check** (static check S7 passed)
- Breaker: **upheld**: Checked MapModeExecutionTests.csproj lines 13-14: GeneratedFormatterForExternalTypes*.cs is excluded from compilation because MapModeExecutionTests does not reference ExternalTypes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 6 of its 14 sentences.
Requirement sentences no claim quotes (8; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- As for the attribute-based property keys and other settings (such as Union), I can think of 3 alternatives:
- 1 - Use `System.Runtime.Serialization.DataMember` and related attributes.
- This is too limited IMO, as it cannot have `Union` and other features.
- This would be similar to how you can declare dummy versions of BCL attributes that the C# compiler expects, such as [`[IsExternalInit]`](https://stackoverflow.com/a/67687186/643085…
- 3 - Source-generate the attributes themselves using [`IncrementalGeneratorInitializationContext.RegisterPostInitializationOutput`](https://github.com/dotnet/roslyn/blob/main/docs/f…
- This would allow using the attributes without adding an additional runtime dependency.

## 5. Findings (31)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GeneratedFormatterCollector.cs` L54 | Claim C7 disputed: GeneratedFormatterCollector.cs lines 54-61 only checks i.IsGenericType and SymbolEqualityComparer.Default.Equals(i.OriginalDefinition, openFormatterInterface) with formatterInterfaces.Length != 1; it does not check that IMessagePackFormatter<T> is closed. A generic formatter class implementing open IMessagePackFormatter<T> (e.g. partial class MyFormatter<T> : IMessagePackFormatt | breaker (Gemini) |
| F2 | medium | `GeneratedFormatterCollector.cs` L135 | Claim C10 disputed: CreateContractlessMembers at GeneratedFormatterCollector.cs line 135 uses loop bound i < targets.Count - 1, dropping the last alphabetically-ordered public read-write member. The requirement is not met and all three named tests (ContractlessClassRoundTrips, ContractlessStructRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers) fail at runtime because ExternalPe | breaker (Gemini) |
| F3 | medium | `GeneratedFormatterCollector.cs` L249 | Claim C11 disputed: The named test ContractlessClassUsesStringKeysForPublicReadWriteMembers (GeneratedFormatterForExternalTypesTests.cs lines 24-34) uses flat class ExternalPerson with no base class hierarchy, no shadowed members, no static members, and no indexers, so it does not test those behaviors of GetInstanceMembers, and the test itself fails at line 29 due to the targets.Count - 1 bug at G | breaker (Gemini) |
| F4 | medium | `GeneratedFormatterCollector.cs` L164 | Claim C12 disputed: First, the named test SurrogateControlsKeysAndMembership (GeneratedFormatterForExternalTypesTests.cs lines 55-69) does not test missing [Key] reporting MsgPack004 (GeneratedFormatterCollector.cs lines 171-178), and no test in the diff covers MsgPack004 on surrogates. Second, the requirement_quote asks for user-defined copies of MessagePack attributes, whereas lines 164 and 169  | breaker (Gemini) |
| F5 | medium | `GeneratedFormatterCollector.cs` L200 | Claim C15 disputed: The named test SurrogateControlsKeysAndMembership (GeneratedFormatterForExternalTypesTests.cs lines 55-69) only tests unique integer keys 3 and 7; neither it nor any other test in the diff tests duplicate surrogate keys reporting KeysMustBeUnique (GeneratedFormatterCollector.cs lines 200-204) or string-keyed surrogate members (line 208). | breaker (Gemini) |
| F6 | medium | `GeneratedFormatterCollector.cs` L24 | Claim C16 disputed: Three issues: (1) GeneratedFormatterCollector.cs lines 84-85 fails to set needsCast for explicit interface implementations because in Roslyn C# an explicit interface method's IMethodSymbol.Name includes the interface prefix (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize), so m.Name == "OnBeforeSerialize" \|\| m.Name == "OnAfterDeserialize" is always | breaker (Gemini) |
| F7 | medium | `GeneratedFormatterForExternalTypesTests.cs` L20 | Claim C20 disputed: ContractlessClassRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 12-21) does not round-trip ExternalPerson: GeneratedFormatterCollector.cs line 135 (i < targets.Count - 1) omits Label from ExternalPersonFormatter, causing Assert.Equal("seven", result.Label) at line 20 to fail with null. | breaker (Gemini) |
| F8 | medium | `GeneratedFormatterForExternalTypesTests.cs` L29 | Claim C21 disputed: ContractlessClassUsesStringKeysForPublicReadWriteMembers (GeneratedFormatterForExternalTypesTests.cs lines 24-34) fails at line 29 (bytes[0] is 0x81 rather than 0x82) and line 32 ("Label":"x" is absent) because GeneratedFormatterCollector.cs line 135 omits the last member Label. | breaker (Gemini) |
| F9 | medium | `GeneratedFormatterForExternalTypesTests.cs` L51 | Claim C22 disputed: ContractlessStructRoundTrips (GeneratedFormatterForExternalTypesTests.cs lines 44-52) fails to round-trip ExternalPoint: GeneratedFormatterCollector.cs line 135 omits Y, so result.Y is 0 and Assert.Equal(-4, result.Y) at line 51 fails. | breaker (Gemini) |
| F10 | medium | `GeneratedFormatterForExternalTypesTests.cs` L83 | Claim C24 disputed: MessagePackObjectCanContainExternalTypes (GeneratedFormatterForExternalTypesTests.cs lines 72-86) fails at line 83 (Assert.Equal("five", result.Person.Label)) because ExternalPersonFormatter uses contractless mode and drops Label due to GeneratedFormatterCollector.cs line 135. | breaker (Gemini) |
| F11 | medium | `GeneratedMessagePackFormatterTests.cs` L28 | Claim C25 disputed: Over-citation: C25 cites the entire 210-line GeneratedMessagePackFormatterTests.cs while only describing the shared fixture and Members stub at lines 1-27, leaving the six test methods at lines 28-210 undescribed (and FormatterMustImplementFormatterOfT at lines 56-75 does not use Members). | breaker (Gemini) |
| F12 | medium | `MsgPack019.md` L26 | Claim C27 disputed: Two cited documentation statements contradict the implementation: doc/analyzers/MsgPack019.md line 26 states containing nesting types must also be declared partial, whereas GeneratedFormatterCollector.IsPartial (GeneratedFormatterCollector.cs lines 293-299) never checks ContainingType; and README.md line 1655 states contractless mode serializes every public read-write member, w | breaker (Gemini) |
| F13 | high | `GeneratedFormatterCollector.cs` L135 | Off-by-one: `for (int i = 0; i < targets.Count - 1; i++)` drops the last member in ordinal name order, and a type with one member gets zero. ExternalPerson would serialize only Id (Label lost), and ExternalPoint only X. ContractlessClassRoundTrips, ContractlessClassUsesStringKeysForPublicReadWriteMembers (expects 0x82), ContractlessStructRoundTrips and MessagePackObjectCanContainExternalTypes shou | author (Claude) |
| F14 | low | `GeneratedFormatterCollector.cs` L161 | Surrogate mode iterates all instance fields and properties of the surrogate, including private, readonly and non-public members. Any such member without [Key] or [IgnoreMember] aborts generation with MsgPack004, so a surrogate with a private helper field cannot be used. | author (Claude) |
| F15 | low | `MessagePackGenerator.cs` L32 | GeneratedFormatterRequest carries INamedTypeSymbol instances through the incremental pipeline. Symbols differ per compilation, so the record never compares equal and every edit re-runs collection and the diagnostics pipeline. This defeats incremental caching and can root old compilations. | author (Claude) |
| F16 | low | `GeneratedFormatterCollector.cs` L79 | NoDeserializingConstructor is created with no message arguments. If the existing descriptor's message format has placeholders, the message renders unformatted. This path is untested. | author (Claude) |
| F17 | low | `GeneratedFormatterRequest.cs` L13 | GeneratedFormatterRequest is declared public in the generator assembly, although only internal code uses it. | author (Claude) |
| F18 | high | `GeneratedFormatterCollector.cs` L84 | Explicit IMessagePackSerializationCallbackReceiver detection is broken: in Roslyn C#, an explicit interface method's IMethodSymbol.Name includes the interface qualifier (e.g. MessagePack.IMessagePackSerializationCallbackReceiver.OnBeforeSerialize), so m.Name == "OnBeforeSerialize" \|\| m.Name == "OnAfterDeserialize" is always false. Explicitly implemented callbacks emit uncast calls that fail to com | breaker (Gemini) |
| F19 | high | `GeneratedFormatterCollector.cs` L47 | The attributed formatter symbol itself is not validated for unsupported modifiers or containers: generic formatters (MyFormatter<T> : IMessagePackFormatter<ExternalPerson>) and abstract formatters (abstract partial class MyFormatter) pass Collect and generate uncompilable resolver instantiations, and IsPartial at line 293 ignores non-partial containing types (causing CS0260 instead of MsgPack019)  | breaker (Gemini) |
| F20 | medium | `MessagePackGenerator.cs` L34 | Invalid SurrogateType values are silently mishandled: reading SurrogateType via as INamedTypeSymbol evaluates to null for non-named types such as arrays (typeof(int[])), silently falling back to contractless serialization instead of reporting an error; and types like typeof(object) or empty interfaces are accepted and silently generate zero-member formatters that drop all data. | breaker (Gemini) |
| F21 | medium | `GeneratedFormatterCollector.cs` L171 | CreateSurrogateMembers accepts negative integer keys in [Key(int)] (such as [Key(-1)]) without reporting a diagnostic, passing negative IntKey values to FormatterTemplate and generating invalid C# code. | breaker (Gemini) |
| F22 | medium | `MessagePackGenerator.cs` L72 | No diagnostic or conflict handling exists when multiple [GeneratedMessagePackFormatter] classes target the same type T (or when T also has [MessagePackObject]), which either drops one formatter from ObjectInfos—leaving a user partial class with unimplemented IMessagePackFormatter<T> members (CS0535)—or emits duplicate resolver entries. | breaker (Gemini) |
| F23 | medium | `GeneratedFormatterCollector.cs` L110 | GeneratedFormatterCollector ignores force-map mode for surrogate formatters with integer [Key] attributes, unconditionally passing isIntKey = true to ObjectSerializationInfo.Create regardless of serializer options. | breaker (Gemini) |
| F24 | low | `GeneratedFormatterCollector.cs` L161 | CreateSurrogateMembers inspects all non-compiler-generated instance members of the surrogate via GetInstanceMembers, including private fields and properties, so any explicit private backing field on a surrogate triggers MsgPack004 unless marked with [IgnoreMember]. | breaker (Gemini) |
| F25 | low | `MsgPack00xMessagePackAnalyzer.cs` L382 | MsgPack019 through MsgPack022 are registered in MsgPack00xMessagePackAnalyzer.SupportedDiagnostics, but MsgPack00xMessagePackAnalyzer.Initialize never analyzes [GeneratedMessagePackFormatter] types; diagnostics are only emitted by MessagePackGenerator (even when Options.IsGeneratingSource is false). | breaker (Gemini) |
| F26 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Serialize(ref MessagePackWriter, ExternalPerson, MessagePackSerializerOptions) | test run |
| F27 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Serialize(ref MessagePackWriter, ExternalWidget, MessagePackSerializerOptions) | test run |
| F28 | medium | `GeneratedFormatterForExternalTypes.cs` L10 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(10,48): error CS0535: 'ExternalPersonFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPerson>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F29 | medium | `GeneratedFormatterForExternalTypes.cs` L20 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(20,48): error CS0535: 'ExternalWidgetFormatter' does not implement interface member 'IMessagePackFormatter<ExternalWidget>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |
| F30 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Serialize(ref MessagePackWriter, ExternalPoint, MessagePackSerializerOptions)' | test run |
| F31 | medium | `GeneratedFormatterForExternalTypes.cs` L15 | New compile error vs base in MessagePack.SourceGenerator.ExecutionTests.csproj (the base has other build errors on this machine, so this may share their cause): GeneratedFormatterForExternalTypes.cs(15,47): error CS0535: 'ExternalPointFormatter' does not implement interface member 'IMessagePackFormatter<ExternalPoint>.Deserialize(ref MessagePackReader, MessagePackSerializerOptions)' | test run |

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

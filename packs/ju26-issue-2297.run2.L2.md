# Evidence pack: REQ-2297 on `ju26-issue-2297`

> Rebuilt offline from pack `4431a63e3e22` (ju26-issue-2297.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 146 of 179 changed code lines (82%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (3 flagged). Of everything changed: 11%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 12 claim(s) disputed by the breaker or by the evidence check.
- 1 high-severity finding(s).
- Evidence took 33 of 179 changed code lines off the list (C13: tests found passing in the real run, claim upheld by the breaker). 146 stay with the owner.
- Why lines stay: 126 claim disputed; 10 named by a finding; 5 no claim covers the line; 3 refused; 2 cited only by claims without a passing test.

**The owner must read** (15 files):
- `README.md` L1639-1641 (3 of 3 changed lines): R2 honesty (AI-suggested); claim C14 disputed; F12 breaker (Gemini)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): claim C4 disputed; claim C5 disputed
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): F4 breaker (Gemini); claim C4 disputed; F5 breaker (Gemini); claim C5 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): F6 breaker (Gemini); claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33 (2 of 2 changed lines): claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14-16 (3 of 3 changed lines): F7 breaker (Gemini); claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): claim C1 disputed; claim C2 disputed; claim C3 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16, L31-33, L48-50 (9 of 9 changed lines): R1 contracts (AI-suggested); F1 breaker (Gemini); F13 author (Claude); F18 breaker (Gemini); claim C1 disputed; F15 author (Claude); F17 breaker (Gemini); F2 breaker (Gemini); claim C2 disputed; F3 breaker (Gemini); claim C3 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37 (2 of 2 changed lines): claim C8 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18-20 (3 of 3 changed lines): F8 breaker (Gemini); claim C8 disputed
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C10, C15 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` L30 (2 of 2 changed lines): claim C9 disputed
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.tt` L10-12 (3 of 3 changed lines): F9 breaker (Gemini); claim C9 disputed
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L15-111 (97 of 130 changed lines): no claim covers these lines; claim C11 disputed; F11 breaker (Gemini); claim C12 disputed; F10 breaker (Gemini); F19 breaker (Gemini)

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 33 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C13

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `a0aa5ab2de` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (28s) |
| Pack id | `eb4b094a2c84` |

## 1. Disputed claims (12)
**C1 (DISPUTED, behavior, author confidence high):** ResolverTemplate emits the guarded ExcludeFromCodeCoverage attribute on the generated partial resolver class (.tt and compiled .cs agree).
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L37-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: Neither named test verifies that the generated partial resolver class itself carries [ExcludeFromCodeCoverage]: AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs:76) only checks that each file contains the attribute string at least once, and ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) only checks attributeCount > 0 and attributeCount == guardedCount across the file (both would pass if only nested classes had the attribute). In addition, REQ-2297 is only partly met because #if !NETSTANDARD2_0 && !NETFRAMEWORK (ResolverTemplate.tt:14) omits the attribute on netstandard2.0 and .NET Framework even though System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and .NET Standard 2.0+.

**C2 (DISPUTED, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the nested private static class FormatterCache<T>.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.cs` L55-57
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) does not verify that FormatterCache<T> has the attribute: if FormatterCache<T> lacked it, the other two attributes in the resolver file would still satisfy attributeCount > 0 and attributeCount == guardedCount. In addition, REQ-2297 is only partly met because #if !NETSTANDARD2_0 && !NETFRAMEWORK (ResolverTemplate.tt:31) needlessly excludes netstandard2.0 and .NET Framework.

**C3 (DISPUTED, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the nested private static class <Resolver>GetFormatterHelper.
- Lines: `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L66-68
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) does not verify that <Resolver>GetFormatterHelper is decorated, since removing its attribute still leaves 2 guarded attributes in the resolver file and passes both assertions. Also, citation ResolverTemplate.cs:66 is an unchanged line, and REQ-2297 is only partly met due to #if !NETSTANDARD2_0 && !NETFRAMEWORK (ResolverTemplate.tt:48).

**C4 (DISPUTED, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the generated partial composite resolver class.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.cs` L27-27
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 asks for all generated code to be decorated with ExcludeFromCodeCoverage, which is only partly met because CompositeResolverTemplate.tt:7 and CompositeResolverTemplate.cs:27 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute being available in .NET Framework 4.0+ and .NET Standard 2.0+.

**C5 (DISPUTED, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the nested static class FormatterCache<T>.
- Lines: `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 is only partly met because CompositeResolverTemplate.tt:35 and CompositeResolverTemplate.cs:56 guard [ExcludeFromCodeCoverage] with #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute is actually available.

**C6 (DISPUTED, behavior, author confidence medium):** EnumTemplate emits the guarded attribute on each generated enum formatter class.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: The named tests in CodeCoverageExclusionTests.cs do not verify EnumTemplate: MyEnum (lines 37-41) is not referenced by any [MessagePackObject] or [Union] type, while MyObject, MyStringKeyObject, IMyUnion, MyUnionMember (lines 48-53, a second [MessagePackObject]), and GeneratedMessagePackResolver already produce 5 files and satisfy generated.Count >= 5 (line 71) without an enum formatter. Also, REQ-2297 is only partly met due to #if !NETSTANDARD2_0 && !NETFRAMEWORK (EnumTemplate.tt:8).

**C7 (DISPUTED, behavior, author confidence high):** FormatterTemplate (integer-keyed objects) emits the guarded attribute on each generated formatter class, placed before the class declaration and its type constraints.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: Neither named test exercises generic type constraints (TestSource in CodeCoverageExclusionTests.cs:24-53 has only non-generic types and RunGeneratorAsync at line 123 does not compile-check output), so placement before type constraints is not tested by the named tests. In addition, REQ-2297 is only partly met due to #if !NETSTANDARD2_0 && !NETFRAMEWORK (FormatterTemplate.tt:14).

**C8 (DISPUTED, behavior, author confidence high):** StringKeyFormatterTemplate emits the guarded attribute on each generated string-keyed formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 is only partly met because StringKeyFormatterTemplate.tt:18 and StringKeyFormatterTemplate.cs:37 wrap [ExcludeFromCodeCoverage] in #if !NETSTANDARD2_0 && !NETFRAMEWORK, leaving generated string-key formatters undecorated on netstandard2.0 and .NET Framework even though ExcludeFromCodeCoverageAttribute exists on both targets.

**C9 (DISPUTED, behavior, author confidence high):** UnionTemplate emits the guarded attribute on each generated union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 is only partly met because UnionTemplate.tt:10 and UnionTemplate.cs:30 wrap [ExcludeFromCodeCoverage] in #if !NETSTANDARD2_0 && !NETFRAMEWORK, leaving generated union formatters undecorated on netstandard2.0 and .NET Framework even though ExcludeFromCodeCoverageAttribute exists on both targets.

**C11 (DISPUTED, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source containing int-keyed, string-keyed, enum and union types plus a resolver. It asserts that at least 5 files are generated and that each file contains the attribute text at least once. It does not check per-type coverage.
- Lines: `CodeCoverageExclusionTests.cs` L16-16, `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)
- Breaker: **disputed**: Although TestSource declares MyEnum (CodeCoverageExclusionTests.cs:37-41), MyEnum is unreferenced by any [MessagePackObject] or [Union] type while MyUnionMember (lines 48-53) adds a second int-keyed [MessagePackObject], so generated.Count >= 5 (line 71) passes without verifying that an enum formatter is generated, and CompositeResolver is absent altogether; thus the test only partly covers REQ-2297 and misleads via comment line 69.

**C12 (DISPUTED, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every occurrence of the attribute in each generated file is wrapped in the exact `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` pattern (tab-indented or not). It uses a counting helper for this.
- Lines: `CodeCoverageExclusionTests.cs` L18-19, `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)
- Breaker: **disputed**: Cited line CodeCoverageExclusionTests.cs:18 states that ExcludeFromCodeCoverage is not available on netstandard2.0 or .NET Framework, and lines 82-97 enforce #if !NETSTANDARD2_0 && !NETFRAMEWORK around every attribute; however, System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 and .NET Standard 2.0, so enforcing this guard prevents REQ-2297 from being satisfied on those targets.

**C14 (DISPUTED, docs, author confidence medium):** README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 / .NET Framework.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**
- Breaker: **disputed**: README.md:1640 does not merely say the attribute is omitted on netstandard2.0 and .NET Framework; it inaccurately claims the attribute is not available on netstandard2.0 or .NET Framework ('only emitted for targets where it is available (not netstandard2.0 or .NET Framework)'), whereas System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has been available since .NET Framework 4.0 and .NET Standard 2.0.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | The ExcludeFromCodeCoverage attribute is now emitted onto user-declared partial resolver classes, which may be public types of the user's assembly. | This changes the user's type metadata. It can break existing builds with CS0579 if the user already applied the attribute, and it is not configurable. The issue says a setting would be fine, so the owner should decide whether to add an opt-out. | `ResolverTemplate.tt` L14-16 | AI reading |
| R2 | honesty | The netstandard2.0/.NET Framework guard and its README justification rest on an incorrect claim about attribute availability. | The requirement asks for all generated code to be decorated. The guard silently exempts major targets, and the docs and test comment present this as a platform limitation. | `README.md` L1639-1641 | AI reading |

## 3. The story
The source generator templates for object formatters, string-key formatters, enum formatters, union formatters, the generated resolver and the composite resolver now emit `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on each generated type. The resolvers' nested `FormatterCache<T>` and `GetFormatterHelper` classes get it too. Every attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. One shared helper (`TransformUtilities`) now writes a line break after `{` when a nesting type has constraints, so the new `#if` lands on its own line. The change adds a README note, a new test class with two tests, and 222 regenerated snapshot files.

**Why:** REQ-2297 asks that all MessagePack-generated code carry ExcludeFromCodeCoverage so it does not skew coverage numbers.

**Touches beyond the requirement:**
- TransformUtilities.EmitNestingTypesAndNamespaces now writes "{\r\n" instead of "{" when the nesting type has constraints. This changes generated text for constrained generic nesting types. It is needed so the `#if` directive starts its own line.
- README gains a paragraph that says the attribute is not available on netstandard2.0 / .NET Framework.
- The attribute is also added to the user-declared partial resolver classes (`GeneratedMessagePackResolver`, composite resolvers). These are the user's own types, which may be public, not only to new internal types.

**How sure (the author's own view; it moves nothing):** High that the templates and their compiled .cs files emit the attribute where shown, and that snapshots changed uniformly (S1, S2). Low confidence that the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard is justified. ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and in netstandard2.0, so those consumers (including Unity) get no exclusion at all. The new tests check that each generated file has at least one attribute and that every attribute is guarded. They do not check every type, and they never exercise the composite resolver.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | ResolverTemplate emits the guarded ExcludeFromCodeCoverage attribute on the generated partial resolver class (.tt and compiled .cs agree). | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C2 | DISPUTED | ResolverTemplate emits the guarded attribute on the nested private static class FormatterCache<T>. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C3 | DISPUTED | ResolverTemplate emits the guarded attribute on the nested private static class <Resolver>GetFormatterHelper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C4 | DISPUTED | CompositeResolverTemplate emits the guarded attribute on the generated partial composite resolver class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C5 | DISPUTED | CompositeResolverTemplate emits the guarded attribute on the nested static class FormatterCache<T>. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C6 | DISPUTED | EnumTemplate emits the guarded attribute on each generated enum formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C7 | DISPUTED | FormatterTemplate (integer-keyed objects) emits the guarded attribute on each generated formatter class, placed before the class declaration and its type constraints. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C8 | DISPUTED | StringKeyFormatterTemplate emits the guarded attribute on each generated string-keyed formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C9 | DISPUTED | UnionTemplate emits the guarded attribute on each generated union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C11 | DISPUTED | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source containing int-keyed, string-keyed, enum and union types plus a resolver. It asserts that at least 5 files are generated and that each file contains the attribute text at least once. It does not check per-type coverage. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C12 | DISPUTED | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every occurrence of the attribute in each generated file is wrapped in the exact `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` pattern (tab-indented or not). It uses a counting helper for this. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C14 | DISPUTED | README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 / .NET Framework. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | AI reading only | disputed | no |
| C10 | backed | When a nesting type has type constraints, EmitNestingTypesAndNamespaces now writes a newline after '{'. The following `#if` directive therefore starts its own line, so the generated code still compiles. This changes output only for constrained nesting types (seen in the GenericDataTypeWithPrivateMember snapshot). | (scope) | static check | upheld | no |
| C13 | backed | Shared test helper RunGeneratorAsync builds a CSharpCompilation with framework and MessagePack references, runs MessagePackGenerator, and returns each generated tree's path and text. It discards generator diagnostics and does not compile-check the output. | (scope) | test run | upheld | yes |
| C15 | backed | Scope: production changes are confined to source-generator templates, their compiled .cs counterparts and one emission helper. No runtime serializer code, wire format, public API or analyzer rules change, and no existing tests are weakened. | (scope) | static check | upheld | no |

**C10 (backed, behavior, author confidence medium):** When a nesting type has type constraints, EmitNestingTypesAndNamespaces now writes a newline after '{'. The following `#if` directive therefore starts its own line, so the generated code still compiles. This changes output only for constrained nesting types (seen in the GenericDataTypeWithPrivateMember snapshot).
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)
- Breaker: **upheld**: Checked TransformUtilities.cs:58 and the changed snapshot list: when anyConstraints is true, EmitNestingTypesAndNamespaces previously wrote '{' with no trailing CRLF, which would place '#if' on the same line as '{' in templates without a leading newline (such as StringKeyFormatterTemplate.cs:37 and UnionTemplate.cs:30), causing invalid preprocessor syntax; adding CRLF affects only constrained nesting types as seen in GenericDataTypeWithPrivateMember.

**C13 (backed, test, author confidence medium):** Shared test helper RunGeneratorAsync builds a CSharpCompilation with framework and MessagePack references, runs MessagePackGenerator, and returns each generated tree's path and text. It discards generator diagnostics and does not compile-check the output.
- Lines: `CodeCoverageExclusionTests.cs` L1-14, `CodeCoverageExclusionTests.cs` L112-130
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs:1-14 and 112-130: RunGeneratorAsync resolves DefaultTargetFrameworkReferences and MessagePack references, runs MessagePackGenerator via CSharpGeneratorDriver.RunGeneratorsAndUpdateCompilation discarding the out compilation and diagnostics, and returns (FilePath, Text) pairs.

**C15 (backed, scope, author confidence high):** Scope: production changes are confined to source-generator templates, their compiled .cs counterparts and one emission helper. No runtime serializer code, wire format, public API or analyzer rules change, and no existing tests are weakened.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)
- Breaker: **upheld**: Checked the changed file list and static checks S1-S8: all production changes are strictly in the 6 T4 templates, their 6 compiled .cs counterparts, and TransformUtilities.cs:58, with no public API, analyzer, wire-format, or runtime serializer changes and no weakened tests.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 2 of its 5 sentences.
Requirement sentences no claim quotes (3; an issue body is mostly context, so skim this for anything the change should have done; first 3 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- I do not feel like a setting is needed, but setting would be fine to have too.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (19)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `ResolverTemplate.tt` L14 | Claim C1 disputed: Neither named test verifies that the generated partial resolver class itself carries [ExcludeFromCodeCoverage]: AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs:76) only checks that each file contains the attribute string at least once, and ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) only checks attribu | breaker (Gemini) |
| F2 | medium | `ResolverTemplate.tt` L31 | Claim C2 disputed: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) does not verify that FormatterCache<T> has the attribute: if FormatterCache<T> lacked it, the other two attributes in the resolver file would still satisfy attributeCount > 0 and attributeCount == guardedCount. In addition, REQ-2297 is only partly met because #if !NETSTAN | breaker (Gemini) |
| F3 | medium | `ResolverTemplate.tt` L48 | Claim C3 disputed: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs:91-95) does not verify that <Resolver>GetFormatterHelper is decorated, since removing its attribute still leaves 2 guarded attributes in the resolver file and passes both assertions. Also, citation ResolverTemplate.cs:66 is an unchanged line, and REQ-2297 is only partly met due  | breaker (Gemini) |
| F4 | medium | `CompositeResolverTemplate.tt` L7 | Claim C4 disputed: REQ-2297 asks for all generated code to be decorated with ExcludeFromCodeCoverage, which is only partly met because CompositeResolverTemplate.tt:7 and CompositeResolverTemplate.cs:27 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute being available in .NET Framework 4.0+ a | breaker (Gemini) |
| F5 | medium | `CompositeResolverTemplate.tt` L35 | Claim C5 disputed: REQ-2297 is only partly met because CompositeResolverTemplate.tt:35 and CompositeResolverTemplate.cs:56 guard [ExcludeFromCodeCoverage] with #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute is actually available. | breaker (Gemini) |
| F6 | medium | `EnumTemplate.tt` L8 | Claim C6 disputed: The named tests in CodeCoverageExclusionTests.cs do not verify EnumTemplate: MyEnum (lines 37-41) is not referenced by any [MessagePackObject] or [Union] type, while MyObject, MyStringKeyObject, IMyUnion, MyUnionMember (lines 48-53, a second [MessagePackObject]), and GeneratedMessagePackResolver already produce 5 files and satisfy generated.Count >= 5 (line 71) without an enum f | breaker (Gemini) |
| F7 | medium | `FormatterTemplate.tt` L14 | Claim C7 disputed: Neither named test exercises generic type constraints (TestSource in CodeCoverageExclusionTests.cs:24-53 has only non-generic types and RunGeneratorAsync at line 123 does not compile-check output), so placement before type constraints is not tested by the named tests. In addition, REQ-2297 is only partly met due to #if !NETSTANDARD2_0 && !NETFRAMEWORK (FormatterTemplate.tt:14). | breaker (Gemini) |
| F8 | medium | `StringKeyFormatterTemplate.tt` L18 | Claim C8 disputed: REQ-2297 is only partly met because StringKeyFormatterTemplate.tt:18 and StringKeyFormatterTemplate.cs:37 wrap [ExcludeFromCodeCoverage] in #if !NETSTANDARD2_0 && !NETFRAMEWORK, leaving generated string-key formatters undecorated on netstandard2.0 and .NET Framework even though ExcludeFromCodeCoverageAttribute exists on both targets. | breaker (Gemini) |
| F9 | medium | `UnionTemplate.tt` L10 | Claim C9 disputed: REQ-2297 is only partly met because UnionTemplate.tt:10 and UnionTemplate.cs:30 wrap [ExcludeFromCodeCoverage] in #if !NETSTANDARD2_0 && !NETFRAMEWORK, leaving generated union formatters undecorated on netstandard2.0 and .NET Framework even though ExcludeFromCodeCoverageAttribute exists on both targets. | breaker (Gemini) |
| F10 | medium | `CodeCoverageExclusionTests.cs` L37 | Claim C11 disputed: Although TestSource declares MyEnum (CodeCoverageExclusionTests.cs:37-41), MyEnum is unreferenced by any [MessagePackObject] or [Union] type while MyUnionMember (lines 48-53) adds a second int-keyed [MessagePackObject], so generated.Count >= 5 (line 71) passes without verifying that an enum formatter is generated, and CompositeResolver is absent altogether; thus the test only p | breaker (Gemini) |
| F11 | medium | `CodeCoverageExclusionTests.cs` L18 | Claim C12 disputed: Cited line CodeCoverageExclusionTests.cs:18 states that ExcludeFromCodeCoverage is not available on netstandard2.0 or .NET Framework, and lines 82-97 enforce #if !NETSTANDARD2_0 && !NETFRAMEWORK around every attribute; however, System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 and .NET Standard 2.0, so enforcing this guard pre | breaker (Gemini) |
| F12 | medium | `README.md` L1640 | Claim C14 disputed: README.md:1640 does not merely say the attribute is omitted on netstandard2.0 and .NET Framework; it inaccurately claims the attribute is not available on netstandard2.0 or .NET Framework ('only emitted for targets where it is available (not netstandard2.0 or .NET Framework)'), whereas System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has been available since .NE | breaker (Gemini) |
| F13 | medium | `ResolverTemplate.tt` L14 | The guard `#if !NETSTANDARD2_0 && !NETFRAMEWORK` rests on a false premise. System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and in netstandard2.0. Consumers targeting those frameworks, including Unity projects (a large MessagePack audience), get no coverage exclusion at all. So 'all generated code' is not decorated for them. The same guard is repeated  | author (Claude) |
| F14 | low | `README.md` L1640 | The README states that the attribute is not available on netstandard2.0 or .NET Framework. That is factually incorrect and documents the unnecessary limitation above. The test comment at CodeCoverageExclusionTests.cs line 18 repeats the same claim. | author (Claude) |
| F15 | medium | `ResolverTemplate.tt` L15 | The attribute is emitted on the user-declared partial resolver class. ExcludeFromCodeCoverageAttribute has AllowMultiple=false. A user who already put [ExcludeFromCodeCoverage] on their own partial GeneratedMessagePackResolver (the natural workaround for this exact issue) now gets compile error CS0579 (duplicate attribute). The same applies to the composite resolver at CompositeResolverTemplate.tt | author (Claude) |
| F16 | low | `CodeCoverageExclusionTests.cs` L76 | The test only checks that each generated file contains the attribute somewhere, not that every generated type has it. In the resolver file, removing the attribute from FormatterCache or GetFormatterHelper would still pass. `generated.Count >= 5` does not prove an enum formatter was generated, and the composite resolver template is not exercised by the new tests at all. | author (Claude) |
| F17 | high | `ResolverTemplate.tt` L15 | ExcludeFromCodeCoverageAttribute has AllowMultiple = false. Emitting [ExcludeFromCodeCoverage] directly on the user-declared partial resolver class (ResolverTemplate.tt:15, ResolverTemplate.cs:38) and partial composite resolver class (CompositeResolverTemplate.tt:8, CompositeResolverTemplate.cs:27) causes compile error CS0579 (Duplicate 'ExcludeFromCodeCoverage' attribute) for any project that alr | breaker (Gemini) |
| F18 | medium | `ResolverTemplate.tt` L14 | All six templates guard [ExcludeFromCodeCoverage] with '#if !NETSTANDARD2_0 && !NETFRAMEWORK' (and README.md:1640 and CodeCoverageExclusionTests.cs:18 claim the attribute does not exist there), but System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute (without the .NET 5+ Justification property) has been available in mscorlib since .NET Framework 4.0 and in netstandard since .NET Standa | breaker (Gemini) |
| F19 | medium | `CodeCoverageExclusionTests.cs` L37 | In TestSource, MyEnum (lines 37-41) is never referenced by any [MessagePackObject] or [Union] type, while MyUnionMember (lines 48-53) is a second [MessagePackObject] alongside MyObject, MyStringKeyObject, IMyUnion, and GeneratedMessagePackResolver. Those 5 generated files satisfy Assert.True(generated.Count >= 5) (line 71) without exercising EnumTemplate at all, CompositeResolverTemplate is not te | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs`: Changes the brace emission for constrained nesting types from "{" to "{\r\n". This is an enabling fix so the `#if` directive is on its own line, but it alters generated output formatting beyond adding the attribute.
- `README.md`: Documentation paragraph not required by the issue (and contains an incorrect availability claim).

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | pass | 6 template(s), each with its .cs counterpart changed |
| S2 | Generated snapshot files change uniformly | pass | 222 generated file(s); 6 distinct changed line shape(s): `+#if !NETSTANDARD2_0 && !NETFRAMEWORK`, `+[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]`, `+#endif`, `+{`, `+internal sealed class HasPrivateSerializedMemberAndIsGenericNamedFormatter : gl`, `-{	internal sealed class HasPr |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 2 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (28s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

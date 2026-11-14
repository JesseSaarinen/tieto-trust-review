# Evidence pack: REQ-2297 on `seeded-21`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 45 of 183 changed code lines (25%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story. Of everything changed: 3%.

- 2 refusal(s) on safety/honesty grounds need a human look.
- 2 claim(s) disputed by the breaker or by the evidence check.
- 25 high-severity finding(s).
- 22 test(s) failed.
- Evidence took 138 of 183 changed code lines off the list (C1, C2, C4, C10, C11, C12: tests found passing in the real run, claim upheld by the breaker). 45 stay with the owner.
- Why lines stay: 24 cited only by claims without a passing test; 5 passing test, but not upheld by the breaker; 5 claim disputed; 4 refused; 4 no claim covers the line; 3 named by a finding.

**The owner must read** (11 files):
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): C7 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): C7 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): C3 passed its tests but the breaker did not uphold it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): C3 passed its tests but the breaker did not uphold it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14-16 (3 of 3 changed lines): F2 breaker (Gemini); F10 breaker (Gemini); claim C9 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): claim C5 disputed; C6 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16, L31-33, L48-50 (9 of 9 changed lines): F5 author (Claude); claim C5 disputed; claim C9 disputed; F1 breaker (Gemini); F9 breaker (Gemini); C6 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L116, L170 (2 of 4 changed lines): R2 honesty (AI-suggested); F4 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L83, L132 (2 of 5 changed lines): R1 safety (AI-suggested); F3 author (Claude); F8 breaker (Gemini)
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C8 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L20, L80, L111, L130 (4 of 130 changed lines): no claim covers these lines

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 1 doc file(s): prose; covered by the story
- 138 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C1, C2, C4, C12, C10, C11

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `d5bc4246db` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): 25,748 in / 9,085 out, 73 s, $0.28 |
| Breaker model | gemini-4-carbon: 18,152 in / 27,458 out, 338 s, $0.31 |
| Cost and time | $0.60 at list price, 417 s for this pack (tests reused from an earlier run of this commit: 46 s) |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 147 passed, 22 failed, 0 skipped (46s) |
| Pack id | `d8a4e0463241` |

## 1. Disputed claims (2)
**C5 (DISPUTED, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the outer partial resolver class, after its XML doc summary.
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L38-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **disputed**: The named tests do not specifically test C5's cited lines (ResolverTemplate.tt lines 14-16 and ResolverTemplate.cs line 38). Because ResolverTemplate also emits two other guarded ExcludeFromCodeCoverage attributes on FormatterCache<T> (lines 31-33) and GetFormatterHelper (lines 48-50), reverting lines 14-16 on the outer partial class would leave both AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs line 75, checking text.Contains) and ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (lines 91-95, checking attributeCount > 0 and attributeCount == guardedCount) passing.

**C9 (DISPUTED, behavior, author confidence high):** Every emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif`, so consumers on those targets get no attribute. This narrows the requirement's 'all generated code'.
- Lines: `FormatterTemplate.tt` L14-16, `ResolverTemplate.tt` L14-16
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S2 passed)
- Breaker: **disputed**: First, the requirement ('all generated code to be decorated with ExcludeFromCodeCoverage attribute', misquoted by C9 with the sentence about settings) is needlessly only partly met: parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 and .NET Standard 2.0, so #if !NETSTANDARD2_0 && !NETFRAMEWORK strips the attribute on targets where it is available. Second, the named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs lines 82-97) never exercises CompositeResolverTemplate.tt (lines 7-9 and 35-37), so it does not verify every emitted attribute across all templates.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | Generated map-mode Deserialize no longer calls options.Security.DepthStep or decrements reader.Depth. | This removes recursion-depth protection in code that deserializes untrusted input. It is a security-relevant change that the requirement does not ask for. | `StringKeyFormatterTemplate.tt` L79-133 | AI reading |
| R2 | honesty | Change beyond the requirement bundled into an 'add attribute' PR. The snapshots may not reflect it. | The DepthStep removal is unrelated to code coverage. S2 shows no matching removal in the snapshots, so the generated snapshots may not match their templates. | `StringKeyFormatterTemplate.cs` L112-171 | AI reading |

## 3. The story
Each of the six T4 templates (object, string-key, enum, union, resolver, composite resolver) now puts `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on the types it generates, wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. The nested `FormatterCache<T>` and `GetFormatterHelper` classes in the resolvers get the attribute too. The compiled .cs counterparts are updated to match. TransformUtilities now writes a newline after `{` so the `#if` starts on its own line. 222 snapshot files are updated. The change adds a README note and a new test class with two tests.

Unrelated to the requirement, the string-key formatter template no longer emits `options.Security.DepthStep(ref reader);` or `reader.Depth--;` in Deserialize. Those two lines are the recursion-depth guard against hostile payloads.

**Why:** Issue 2297 asks that all MessagePack-generated code carry ExcludeFromCodeCoverage so it does not skew coverage numbers.

**Touches beyond the requirement:**
- StringKeyFormatterTemplate.tt/.cs removes the DepthStep / Depth-- security guard from generated map-mode deserializers. This is not required and weakens protection against deeply nested untrusted input.
- TransformUtilities.cs line 58 adds a newline after `{` for nesting types with constraints. This is needed so `#if` lands at the start of a line; it is a formatting-only change.
- README.md documents the feature and states the attribute is unavailable on netstandard2.0/.NET Framework. That statement is factually doubtful.

**How sure (the author's own view; it moves nothing):** High that the attribute is emitted by every template; it is visible in each template and in the uniform snapshots (S2).

Medium on test strength. The new test checks only one occurrence per file, does not cover the composite resolver, and does not compile the generated output.

High that the DepthStep removal is real. S5 and S6 missed it. The snapshot shapes in S2 do not show the removal, so the snapshots may not match the template.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C5 | DISPUTED | ResolverTemplate emits the guarded attribute on the outer partial resolver class, after its XML doc summary. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C9 | DISPUTED | Every emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif`, so consumers on those targets get no attribute. This narrows the requirement's 'all generated code'. | "I do not feel like a setting is needed, but setting would be fine to have too." | test run | disputed | no |
| C13 | unverified | In addition to the attribute, StringKeyFormatterTemplate (.tt and .cs) deletes the emitted `options.Security.DepthStep(ref reader);` and `reader.Depth--;` lines from generated map-mode Deserialize methods. The requirement does not ask for this. | (scope) | AI reading only | upheld | no |
| C14 | unverified | README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage]. It also claims the attribute is unavailable on netstandard2.0 and .NET Framework. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | AI reading only | upheld | no |
| C1 | backed | FormatterTemplate (integer-keyed objects) emits the guarded ExcludeFromCodeCoverage attribute immediately before the generated `internal sealed class` formatter. The .tt and the compiled .cs agree. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C2 | backed | StringKeyFormatterTemplate (keyAsPropertyName objects) emits the guarded attribute before the generated formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C3 | backed | EnumTemplate emits the guarded attribute before the generated enum formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | cannot_tell | no |
| C4 | backed | UnionTemplate emits the guarded attribute before the generated union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C6 | backed | ResolverTemplate also emits the guarded attribute on the nested `FormatterCache<T>` and `<Name>GetFormatterHelper` classes. The new tests do not specifically require these occurrences: test 1 passes on any single occurrence, and test 2 only checks guarding. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | upheld | no |
| C7 | backed | CompositeResolverTemplate emits the guarded attribute on the composite resolver class and its nested `FormatterCache<T>`. No new test source declares a composite resolver; only the CompositeResolver_* snapshots reflect it. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | upheld | no |
| C8 | backed | When a nesting type has generic constraints, TransformUtilities now writes `{\r\n` instead of `{`. The following `#if` then starts on its own line, which C# preprocessor directives require; it is a formatting-only change. | (scope) | static check | upheld | no |
| C10 | backed | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator on int-keyed, string-keyed, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text at least once. It does not check that every type is decorated, and it does not compile the output. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C11 | backed | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that each generated file has at least one attribute. It also asserts that every occurrence sits inside the exact guard/attribute/#endif triple. The CountOccurrences helper supports the count. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C12 | backed | The test class setup is shared by both tests: - the usings and the attribute and guard constants; - the RunGeneratorAsync helper, which builds a compilation with MessagePack references, runs MessagePackGenerator, and returns the path and text of each generated tree.  Generator diagnostics are discarded. | (scope) | test run | upheld | yes |
| C15 | backed | The 222 snapshot files change only by adding the guarded attribute lines, plus the brace newline shape in GenericDataTypeWithPrivateMember. They show no removal of DepthStep lines. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | upheld | no |

**C13 (unverified, scope, author confidence high):** In addition to the attribute, StringKeyFormatterTemplate (.tt and .cs) deletes the emitted `options.Security.DepthStep(ref reader);` and `reader.Depth--;` lines from generated map-mode Deserialize methods. The requirement does not ask for this.
- Lines: `StringKeyFormatterTemplate.tt` L82-83, `StringKeyFormatterTemplate.tt` L131-132, `StringKeyFormatterTemplate.cs` L115-116, `StringKeyFormatterTemplate.cs` L169-170
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked StringKeyFormatterTemplate.tt around lines 82-83 and 131-132 and StringKeyFormatterTemplate.cs around lines 115-116 and 169-170: both files delete options.Security.DepthStep(ref reader); and reader.Depth--; from the non-empty Deserialize branch, which is unrelated to REQ-2297.

**C14 (unverified, docs, author confidence medium):** README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage]. It also claims the attribute is unavailable on netstandard2.0 and .NET Framework.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1641: line 1639 states that generated formatters and resolvers are decorated with [ExcludeFromCodeCoverage], and line 1640 claims the attribute is not available on netstandard2.0 or .NET Framework.

**C1 (backed, behavior, author confidence high):** FormatterTemplate (integer-keyed objects) emits the guarded ExcludeFromCodeCoverage attribute immediately before the generated `internal sealed class` formatter. The .tt and the compiled .cs agree.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **upheld**: Checked FormatterTemplate.tt lines 14-16 and FormatterTemplate.cs line 33: both emit the guarded ExcludeFromCodeCoverage attribute immediately before internal sealed class, cover all changes in those two files, and are exercised by MyObject in both named tests.

**C2 (backed, behavior, author confidence high):** StringKeyFormatterTemplate (keyAsPropertyName objects) emits the guarded attribute before the generated formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **upheld**: Checked StringKeyFormatterTemplate.tt lines 18-20 and StringKeyFormatterTemplate.cs line 37: both emit the guarded ExcludeFromCodeCoverage attribute immediately before the generated internal sealed class formatter, and MyStringKeyObject in CodeCoverageExclusionTests exercises this path in both named tests.

**C3 (backed, behavior, author confidence high):** EnumTemplate emits the guarded attribute before the generated enum formatter class.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **cannot_tell**: EnumTemplate.tt lines 8-10 and EnumTemplate.cs line 27 do emit the guarded attribute, but the diff alone is not enough to verify that the two named tests exercise EnumTemplate: MyEnum at CodeCoverageExclusionTests.cs lines 37-41 has no attributes and is not referenced by any MessagePackObject member, while Assert.True(generated.Count >= 5) at line 71 already succeeds from the five attributed types (MyObject, MyStringKeyObject, IMyUnion, MyUnionMember at line 48, and GeneratedMessagePackResolver) even if TypeCollector (not shown in the diff) skips unreferenced enums.

**C4 (backed, behavior, author confidence high):** UnionTemplate emits the guarded attribute before the generated union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)
- Breaker: **upheld**: Checked UnionTemplate.tt lines 10-12 and UnionTemplate.cs line 30: both emit the guarded ExcludeFromCodeCoverage attribute right before the generated union formatter class, cover all changes in those files, and are exercised via IMyUnion in both named tests.

**C6 (backed, behavior, author confidence medium):** ResolverTemplate also emits the guarded attribute on the nested `FormatterCache<T>` and `<Name>GetFormatterHelper` classes. The new tests do not specifically require these occurrences: test 1 passes on any single occurrence, and test 2 only checks guarding.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L67-67
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **upheld**: Checked ResolverTemplate.tt lines 31-33 and 48-50 and ResolverTemplate.cs lines 55-57 and 67: both nested helper classes receive the guarded attribute, and the claim accurately notes that the new unit tests do not specifically require these additional occurrences.

**C7 (backed, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the composite resolver class and its nested `FormatterCache<T>`. No new test source declares a composite resolver; only the CompositeResolver_* snapshots reflect it.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **upheld**: Checked CompositeResolverTemplate.tt lines 7-9 and 35-37 and CompositeResolverTemplate.cs lines 27 and 56-58: they emit the guarded attribute on both the partial composite resolver class and nested FormatterCache<T>, covering all changed lines in those files, and CodeCoverageExclusionTests.cs contains no CompositeResolver declaration.

**C8 (backed, behavior, author confidence medium):** When a nesting type has generic constraints, TransformUtilities now writes `{\r\n` instead of `{`. The following `#if` then starts on its own line, which C# preprocessor directives require; it is a formatting-only change.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)
- Breaker: **upheld**: Checked TransformUtilities.cs line 58: when anyConstraints is true, writing open-brace followed by CRLF instead of a bare open-brace places the subsequent #if preprocessor directive at the start of a new line as required by C# syntax.

**C10 (backed, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator on int-keyed, string-keyed, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text at least once. It does not check that every type is decorated, and it does not compile the output.
- Lines: `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 21-79: TestSource declares MyObject, MyStringKeyObject, MyEnum, IMyUnion, MyUnionMember, and GeneratedMessagePackResolver, and AllGeneratedTypesAreExcludedFromCodeCoverage only checks generated.Count >= 5 and text.Contains(ExcludeAttribute) without verifying per-type decoration or compiling the generated output.

**C11 (backed, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that each generated file has at least one attribute. It also asserts that every occurrence sits inside the exact guard/attribute/#endif triple. The CountOccurrences helper supports the count.
- Lines: `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 81-110: ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable normalizes line endings, uses CountOccurrences (lines 99-110) to count total attributes versus guarded triples (with or without leading tab), and asserts attributeCount > 0 and attributeCount == guardedCount.

**C12 (backed, test, author confidence high):** The test class setup is shared by both tests:
- the usings and the attribute and guard constants;
- the RunGeneratorAsync helper, which builds a compilation with MessagePack references, runs MessagePackGenerator, and returns the path and text of each generated tree.

Generator diagnostics are discarded.
- Lines: `CodeCoverageExclusionTests.cs` L1-19, `CodeCoverageExclusionTests.cs` L112-129
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 1-19 and 112-129: those lines contain the usings, constants, and RunGeneratorAsync helper, which creates the compilation with MessagePack references, runs MessagePackGenerator while discarding output compilation and diagnostics at line 123, and returns file paths and source text.

**C15 (backed, generated, author confidence medium):** The 222 snapshot files change only by adding the guarded attribute lines, plus the brace newline shape in GenericDataTypeWithPrivateMember. They show no removal of DepthStep lines.
- Lines: `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L29-31, `MessagePack.GeneratedMessagePackResolver.g.cs` L46-48
- Checked by: **static check** (static check S2 passed)
- Breaker: **upheld**: Checked the sample generated snapshot diffs (TypeWithAutoGeneratedFormatterFormatter.g.cs lines 12-14 and MessagePack.GeneratedMessagePackResolver.g.cs lines 12-14, 29-31, 46-48) together with static check S2 across all 222 snapshot files: only the guarded attribute lines and the GenericDataTypeWithPrivateMember brace newline changed, with no DepthStep removals.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 3 of its 5 sentences.
Requirement sentences no claim quotes (2; an issue body is mostly context, so skim this for anything the change should have done; first 2 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (33)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `ResolverTemplate.tt` L15 | Claim C5 disputed: The named tests do not specifically test C5's cited lines (ResolverTemplate.tt lines 14-16 and ResolverTemplate.cs line 38). Because ResolverTemplate also emits two other guarded ExcludeFromCodeCoverage attributes on FormatterCache<T> (lines 31-33) and GetFormatterHelper (lines 48-50), reverting lines 14-16 on the outer partial class would leave both AllGeneratedTypesAreExcluded | breaker (Gemini) |
| F2 | medium | `FormatterTemplate.tt` L14 | Claim C9 disputed: First, the requirement ('all generated code to be decorated with ExcludeFromCodeCoverage attribute', misquoted by C9 with the sentence about settings) is needlessly only partly met: parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 and .NET Standard 2.0, so #if !NETSTANDARD2_0 && !NETFRAMEWORK strips the attribute | breaker (Gemini) |
| F3 | high | `StringKeyFormatterTemplate.tt` L82 | `options.Security.DepthStep(ref reader);` and the matching `reader.Depth--;` (old line near 131) are deleted. Generated string-keyed (map-mode) formatters no longer enforce MessagePackSecurity.MaximumObjectGraphDepth. A deeply nested untrusted payload can then cause a stack overflow (DoS). This is unrelated to the requirement, and S5/S6 did not catch it. | author (Claude) |
| F4 | medium | `StringKeyFormatterTemplate.cs` L115 | The compiled template drops the DepthStep and Depth-- writes, mirroring the .tt. S2 lists no `-options.Security.DepthStep` shape among the snapshot changes. Either the map-mode snapshots (e.g. FormatterForClassWithPrivateMembers_MapMode) no longer match what the generator emits, so snapshot tests would fail, or the snapshots were edited inconsistently. | author (Claude) |
| F5 | medium | `ResolverTemplate.tt` L14 | System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and in netstandard2.0. The `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard is therefore unnecessary. It leaves generated code un-excluded for those consumers, contrary to 'all generated code'. The same guard is used in every template. | author (Claude) |
| F6 | low | `README.md` L1640 | States the attribute is not available on netstandard2.0 or .NET Framework. This appears factually wrong (see the previous concern). | author (Claude) |
| F7 | low | `CodeCoverageExclusionTests.cs` L76 | The assertion is per file (`text.Contains`). A file whose outer class is decorated but whose nested FormatterCache/GetFormatterHelper are not would still pass. The generated code is never compiled, the composite resolver is not exercised, and generator diagnostics are discarded (line 123). | author (Claude) |
| F8 | high | `StringKeyFormatterTemplate.tt` L82 | Removing options.Security.DepthStep(ref reader); and reader.Depth--; (also in StringKeyFormatterTemplate.cs lines 115 and 169) disables MessagePackSecurity.MaximumObjectGraphDepth enforcement for generated map-mode (keyAsPropertyName: true) formatters with members, allowing deeply nested untrusted payloads to bypass UntrustedData depth limits and crash the process with StackOverflowException. It a | breaker (Gemini) |
| F9 | high | `ResolverTemplate.tt` L15 | Emitting [ExcludeFromCodeCoverage] on the outer partial class declaration (and similarly in CompositeResolverTemplate.tt line 8) causes compiler error CS0579 (Duplicate 'ExcludeFromCodeCoverage' attribute, since AllowMultiple is false) for any consumer who already placed [ExcludeFromCodeCoverage] on their hand-written partial resolver declaration, and also excludes user-written members in other pa | breaker (Gemini) |
| F10 | medium | `FormatterTemplate.tt` L14 | Guarding [ExcludeFromCodeCoverage] with #if !NETSTANDARD2_0 && !NETFRAMEWORK across all six templates (and documenting in README.md line 1640 and CodeCoverageExclusionTests.cs line 18 that the attribute is unavailable there) is factually wrong: parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has been in the BCL since .NET Framework 4.0 and .NET Standard 2.0 (only the | breaker (Gemini) |
| F11 | low | `CodeCoverageExclusionTests.cs` L71 | In AllGeneratedTypesAreExcludedFromCodeCoverage, Assert.True(generated.Count >= 5) assumes the 5 files are MyObject, MyStringKeyObject, MyEnum, IMyUnion, and GeneratedMessagePackResolver, overlooking that MyUnionMember (line 48) also carries [MessagePackObject] and produces a 5th file by itself while MyEnum (line 37) is unattributed and unreferenced by any serialized member; if no MyEnumFormatter  | breaker (Gemini) |
| F12 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValueInputPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F13 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyIgnore - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F14 | high | - | Test failed: PrivateMemberAccessTests.FormatterForClassWithPrivateMembers_MapMode - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F15 | high | - | Test failed: GenerationTests.EnumFormatter(container: Namespace, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F16 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F17 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F18 | high | - | Test failed: GenerationTests.CustomFormatterViaAttributeOnProperty(usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F19 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F20 | high | - | Test failed: GenerationTests.GenericDataTypeWithPrivateMember - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F21 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F22 | high | - | Test failed: GenerationTests.EnumFormatter(container: NestingClass, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F23 | high | - | Test failed: GenerationTests.EnumFormatter(container: None, usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F24 | high | - | Test failed: CustomStringKeyFormatterTests.RecordWithWithInitOnlyProps - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F25 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorAndDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F26 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F27 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetter - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F28 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyMixed - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F29 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorDoNotUseSetter - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F30 | high | - | Test failed: CustomStringKeyFormatterTests.RecordWithPrimaryConstructor - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F31 | high | - | Test failed: GenerationTests.CustomFormatterViaAttributeOnField(usesMapMode: True) - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F32 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorPartially - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |
| F33 | high | - | Test failed: StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValue - System.InvalidOperationException : Context: Source generator application&#xD; Context: Verifying source generated files&#xD; Expected source file list to match&#xD; +MessagePack.SourceGenerator\Messag | test run |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt`: Removal of `options.Security.DepthStep(ref reader);` and `reader.Depth--;` from generated map-mode deserializers.
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs`: Compiled counterpart of the DepthStep/Depth-- removal.

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
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 147 passed, 22 failed, 0 skipped (46s)
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValueInputPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyIgnore`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `PrivateMemberAccessTests.FormatterForClassWithPrivateMembers_MapMode`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.EnumFormatter(container: Namespace, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.CustomFormatterViaAttributeOnProperty(usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.GenericDataTypeWithPrivateMember`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.EnumFormatter(container: NestingClass, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `GenerationTests.EnumFormatter(container: None, usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
+Messa
- FAILED `CustomStringKeyFormatterTests.RecordWithWithInitOnlyProps`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorAndDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetter`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyMixed`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithParameterizedConstructorDoNotUseSetter`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `CustomStringKeyFormatterTests.RecordWithPrimaryConstructor`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `GenerationTests.CustomFormatterViaAttributeOnField(usesMapMode: True)`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterOnlyWithParameterizedConstructorPartially`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa
- FAILED `StringKeyedFormatterTests.PropertiesGetterSetterWithDefaultValue`: System.InvalidOperationException : Context: Source generator application&#xD;
Context: Verifying source generated files&#xD;
Expected source file list to match&#xD;
+MessagePack.SourceGenerator\MessagePack.SourceGenerator.MessagePackGenerator\MessagePack.GeneratedMessagePackResolver.g.cs&#xD;
 Messa

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

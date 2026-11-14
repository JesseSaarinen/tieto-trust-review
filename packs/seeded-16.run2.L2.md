# Evidence pack: REQ-2297 on `seeded-16`

> Rebuilt offline from pack `94c6ac6e483b` (seeded-16.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 85 of 179 changed code lines (48%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (3 flagged). Of everything changed: 6%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 9 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 94 of 179 changed code lines off the list (C9, C11: tests found passing in the real run, claim upheld by the breaker). 85 stay with the owner.
- Why lines stay: 69 claim disputed; 7 named by a finding; 4 no claim covers the line; 3 refused; 2 claim rests on AI reading only.

**The owner must read** (15 files):
- `README.md` L1639-1641 (3 of 3 changed lines): R2 honesty (AI-suggested); claim C13 disputed; F9 breaker (Gemini)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): F7 breaker (Gemini); claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): claim C4 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): F4 breaker (Gemini); claim C4 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33 (2 of 2 changed lines): claim C1 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14-16 (3 of 3 changed lines): F1 breaker (Gemini); F10 author (Claude); F16 breaker (Gemini); claim C1 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): claim C5 disputed; claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16, L31-33, L48-50 (9 of 9 changed lines): R1 contracts (AI-suggested); F5 breaker (Gemini); claim C5 disputed; F11 author (Claude); F15 breaker (Gemini); F6 breaker (Gemini); claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37 (2 of 2 changed lines): claim C2 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18-20 (3 of 3 changed lines): F2 breaker (Gemini); claim C2 disputed
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): claim C8 only AI-read
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` L30 (2 of 2 changed lines): claim C3 disputed
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.tt` L10-12 (3 of 3 changed lines): F3 breaker (Gemini); claim C3 disputed
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L17-20, L80-111 (36 of 130 changed lines): no claim covers these lines; F8 breaker (Gemini); claim C10 disputed

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 94 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C11, C9

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `fe3e8c6031` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (39s) |
| Pack id | `4a6382eab86f` |

## 1. Disputed claims (9)
**C1 (DISPUTED, behavior, author confidence high):** FormatterTemplate emits the guarded ExcludeFromCodeCoverage attribute immediately before each integer-keyed object formatter's `internal sealed class` declaration. The .tt and the compiled .cs change together.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The requirement that all generated code be decorated with ExcludeFromCodeCoverage is only partly met: FormatterTemplate.tt line 14 and FormatterTemplate.cs line 33 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it for netstandard2.0 and .NET Framework consumers even though parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 (System.dll) and .NET Standard 2.0 (netstandard.dll). The claim text also says guarded without explaining this TFM exclusion on the cited lines.

**C2 (DISPUTED, behavior, author confidence high):** StringKeyFormatterTemplate emits the guarded attribute before each string-keyed (keyAsPropertyName) formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The requirement is only partly met: StringKeyFormatterTemplate.tt line 18 and StringKeyFormatterTemplate.cs line 37 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute being available in both netstandard2.0 and .NET Framework 4.0+. The claim also leaves the #if condition unexplained.

**C3 (DISPUTED, behavior, author confidence high):** UnionTemplate emits the guarded attribute before each union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The requirement is only partly met: UnionTemplate.tt line 10 and UnionTemplate.cs line 30 guard the attribute with #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets even though ExcludeFromCodeCoverageAttribute exists in both netstandard2.0 and .NET Framework 4.0+. The claim also does not explain the #if condition on the cited lines.

**C4 (DISPUTED, behavior, author confidence medium):** EnumTemplate emits the guarded attribute before each enum formatter class. The new tests' source declares MyEnum, but no serialized member references it, so the enum template is probably not exercised by them.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **static check** (static check S1 passed)
- Breaker: **disputed**: While the claim rightly notes that MyEnum in CodeCoverageExclusionTests.cs is unreferenced so EnumTemplate is not exercised there, the requirement is only partly met because EnumTemplate.tt line 8 and EnumTemplate.cs line 27 guard the attribute with #if !NETSTANDARD2_0 && !NETFRAMEWORK, needlessly omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework where the attribute is available.

**C5 (DISPUTED, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the generated `partial class <ResolverName> : IFormatterResolver`, after its XML doc summary.
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L38-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **disputed**: Neither named test verifies that partial class <ResolverName> carries ExcludeFromCodeCoverage: the generated resolver file also emits the attribute on FormatterCache<T> and <ResolverName>GetFormatterHelper, and CodeCoverageExclusionTests.cs lines 75-77 and 91-95 only assert text.Contains(ExcludeAttribute), attributeCount > 0, and attributeCount == guardedCount, so both tests still pass if ResolverTemplate.tt lines 14-16 and ResolverTemplate.cs line 38 are removed. In addition, #if !NETSTANDARD2_0 && !NETFRAMEWORK unnecessarily omits the attribute on netstandard2.0 and .NET Framework.

**C6 (DISPUTED, behavior, author confidence high):** ResolverTemplate also emits the guarded attribute on the nested FormatterCache<T> and <ResolverName>GetFormatterHelper static classes.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L67-67
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs lines 91-95) does not test that FormatterCache<T> or <ResolverName>GetFormatterHelper receive ExcludeFromCodeCoverage: because partial class <ResolverName> already emits one guarded attribute in the same file, removing ResolverTemplate.tt lines 31-33 and 48-50 (ResolverTemplate.cs lines 55-57 and 67) leaves attributeCount == 1 and guardedCount == 1, so the test still passes. Also, #if !NETSTANDARD2_0 && !NETFRAMEWORK unnecessarily omits the attribute on netstandard2.0 and .NET Framework.

**C7 (DISPUTED, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the composite resolver partial class and on its nested FormatterCache<T>. Neither new test exercises composite resolvers.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed)
- Breaker: **disputed**: Although the claim accurately notes that neither new test exercises composite resolvers, the requirement is only partly met because CompositeResolverTemplate.tt lines 7 and 35 and CompositeResolverTemplate.cs lines 27 and 56 wrap ExcludeFromCodeCoverage in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute is available.

**C10 (DISPUTED, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file is wrapped exactly in the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` guard, with or without a leading tab. It counts occurrences with the CountOccurrences helper.
- Lines: `CodeCoverageExclusionTests.cs` L18-19, `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)
- Breaker: **disputed**: Cited line 18 of CodeCoverageExclusionTests.cs states the false premise that ExcludeFromCodeCoverageAttribute is not available on netstandard2.0 or .NET Framework (it exists in both netstandard2.0 and .NET Framework 4.0+), and lines 82-97 enforce the #if !NETSTANDARD2_0 && !NETFRAMEWORK guard that prevents the requirement from being met on those targets.

**C13 (DISPUTED, docs, author confidence medium):** The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 and .NET Framework.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**
- Breaker: **disputed**: README.md line 1640 documents that ExcludeFromCodeCoverage is only emitted for targets where it is available (not netstandard2.0 or .NET Framework), which is factually incorrect because System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute is available in both netstandard2.0 and .NET Framework 4.0+ (only its unused Justification property requires .NET 5+).


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Generated code now adds a non-AllowMultiple attribute to user-declared partial resolver classes. | This changes the shape of code compiled into user assemblies and can break existing builds (CS0579) where users already annotated their partial resolver. The owner should decide whether that is acceptable. | `ResolverTemplate.tt` L14-16 | AI reading |
| R2 | honesty | The netstandard2.0 / .NET Framework guard is justified in the README and test comment by a claim that the attribute is unavailable there, which appears to be false. | The guard narrows the requirement ('all generated code') without a verified reason, and the docs and tests enshrine that rationale. | `README.md` L1639-1640 | AI reading |

## 3. The story
The source generator's T4 templates (object formatter, string-key formatter, union, enum, resolver, composite resolver) and their compiled .cs files now put `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on each generated formatter class. They also put it on the resolver class and on its nested helper classes (FormatterCache<T>, GetFormatterHelper). Every emission sits inside `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. TransformUtilities now writes a newline after the opening brace of a constrained nesting type, so the `#if` lands at the start of its own line. 222 snapshot files were regenerated. There are two new tests and a README note.

**Why:** REQ-2297 asks for all generated code to carry ExcludeFromCodeCoverage so that generated formatters do not skew coverage numbers.

**Touches beyond the requirement:**
- TransformUtilities.EmitNestingTypesAndNamespaces now emits "{\r\n" instead of "{" for constrained nesting types. This changes whitespace in output that has nothing to do with the attribute, but it is needed so the preprocessor directive compiles.
- README paragraph, which also states that the attribute is unavailable on netstandard2.0 and .NET Framework.
- 222 regenerated snapshot files.

**How sure (the author's own view; it moves nothing):** High that the templates and their .cs files emit the guarded attribute in the places shown. Medium that this meets the requirement: the `#if` guard drops the attribute for netstandard2.0 and .NET Framework consumers. ExcludeFromCodeCoverageAttribute exists on those targets (.NET Framework 4.0+, netstandard2.0), so the guard looks unnecessary. The new tests are weak: one checks only that each generated file contains the attribute at least once. The enum and composite resolver templates are covered only by snapshot tests that do not appear in this diff.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | FormatterTemplate emits the guarded ExcludeFromCodeCoverage attribute immediately before each integer-keyed object formatter's `internal sealed class` declaration. The .tt and the compiled .cs change together. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C2 | DISPUTED | StringKeyFormatterTemplate emits the guarded attribute before each string-keyed (keyAsPropertyName) formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C3 | DISPUTED | UnionTemplate emits the guarded attribute before each union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C4 | DISPUTED | EnumTemplate emits the guarded attribute before each enum formatter class. The new tests' source declares MyEnum, but no serialized member references it, so the enum template is probably not exercised by them. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C5 | DISPUTED | ResolverTemplate emits the guarded attribute on the generated `partial class <ResolverName> : IFormatterResolver`, after its XML doc summary. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C6 | DISPUTED | ResolverTemplate also emits the guarded attribute on the nested FormatterCache<T> and <ResolverName>GetFormatterHelper static classes. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C7 | DISPUTED | CompositeResolverTemplate emits the guarded attribute on the composite resolver partial class and on its nested FormatterCache<T>. Neither new test exercises composite resolvers. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C10 | DISPUTED | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file is wrapped exactly in the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` guard, with or without a leading tab. It counts occurrences with the CountOccurrences helper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C13 | DISPUTED | The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 and .NET Framework. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | AI reading only | disputed | no |
| C8 | unverified | When the nesting type has generic constraints, TransformUtilities now writes a line break after the opening brace. Without it, a template's `#if` would follow `{` on the same line, which is an invalid preprocessor directive. This also adds a blank line in some formatter output. | (scope) | AI reading only | upheld | no |
| C9 | backed | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source with int-key, string-key, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text. It does not check that every type in a file carries the attribute. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | upheld | yes |
| C11 | backed | The RunGeneratorAsync helper compiles the test source against the default framework and MessagePack references. It runs MessagePackGenerator through a CSharpGeneratorDriver and returns each generated tree's path and text, ignoring compilation diagnostics. The usings and class header support this helper. | (scope) | test run | upheld | yes |
| C12 | backed | The regenerated snapshot files change only by the guarded attribute lines, plus the brace and newline reflow from C8. They match the updated templates. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | upheld | no |
| C14 | backed | Scope: no runtime, wire-format, public-API or analyzer-rule code changed. The only non-template generator code change is the TransformUtilities newline fix, and no setting or option was added. | "I do not feel like a setting is needed, but setting would be fine to have too." | static check | upheld | no |

**C8 (unverified, behavior, author confidence medium):** When the nesting type has generic constraints, TransformUtilities now writes a line break after the opening brace. Without it, a template's `#if` would follow `{` on the same line, which is an invalid preprocessor directive. This also adds a blank line in some formatter output.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TransformUtilities.cs lines 55-58 and static check S2 across generic-constrained snapshot diffs. Appending CRLF after the opening brace when anyConstraints is true prevents templates without a leading newline (such as StringKeyFormatterTemplate and UnionTemplate) from emitting #if on the same line as '{' (CS1040), while adding one blank line in FormatterTemplate output.

**C9 (backed, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source with int-key, string-key, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text. It does not check that every type in a file carries the attribute.
- Lines: `CodeCoverageExclusionTests.cs` L16-16, `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs line 16 and lines 21-79. TestSource declares int-key, string-key, enum, and union types plus GeneratedMessagePackResolver, and AllGeneratedTypesAreExcludedFromCodeCoverage checks generated.Count >= 5 and text.Contains(ExcludeAttribute) per file without checking every type within multi-type files.

**C11 (backed, test, author confidence medium):** The RunGeneratorAsync helper compiles the test source against the default framework and MessagePack references. It runs MessagePackGenerator through a CSharpGeneratorDriver and returns each generated tree's path and text, ignoring compilation diagnostics. The usings and class header support this helper.
- Lines: `CodeCoverageExclusionTests.cs` L1-15, `CodeCoverageExclusionTests.cs` L112-130
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 1-15 and 112-130. RunGeneratorAsync builds a CSharpCompilation with DefaultTargetFrameworkReferences and ReferencesSet.MessagePack, runs MessagePackGenerator via CSharpGeneratorDriver while discarding output compilation and diagnostics via out discards, and is called by both test methods.

**C12 (backed, generated, author confidence high):** The regenerated snapshot files change only by the guarded attribute lines, plus the brace and newline reflow from C8. They match the updated templates.
- Lines: `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L29-31, `MessagePack.GeneratedMessagePackResolver.g.cs` L46-48
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **upheld**: Checked both sample snapshot diffs and static check S2 across all 222 regenerated .g.cs files; every changed line across the snapshot suite is strictly the 3-line guarded attribute block or the opening-brace newline reflow from TransformUtilities.cs line 58, matching the templates.

**C14 (backed, scope, author confidence high):** Scope: no runtime, wire-format, public-API or analyzer-rule code changed. The only non-template generator code change is the TransformUtilities newline fix, and no setting or option was added.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)
- Breaker: **upheld**: Checked all 237 changed files and static checks S1-S6: only README.md, the 6 .tt/.cs template pairs, TransformUtilities.cs line 58, CodeCoverageExclusionTests.cs, and 222 test snapshots changed, with no runtime, wire-format, public API, analyzer, or configuration setting changes.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 3 of its 5 sentences.
Requirement sentences no claim quotes (2; an issue body is mostly context, so skim this for anything the change should have done; first 2 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (17)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `FormatterTemplate.tt` L14 | Claim C1 disputed: The requirement that all generated code be decorated with ExcludeFromCodeCoverage is only partly met: FormatterTemplate.tt line 14 and FormatterTemplate.cs line 33 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it for netstandard2.0 and .NET Framework consumers even though parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has ex | breaker (Gemini) |
| F2 | medium | `StringKeyFormatterTemplate.tt` L18 | Claim C2 disputed: The requirement is only partly met: StringKeyFormatterTemplate.tt line 18 and StringKeyFormatterTemplate.cs line 37 wrap the attribute in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute being available in both netstandard2.0 and .NET Framework 4.0+. The claim also leaves  | breaker (Gemini) |
| F3 | medium | `UnionTemplate.tt` L10 | Claim C3 disputed: The requirement is only partly met: UnionTemplate.tt line 10 and UnionTemplate.cs line 30 guard the attribute with #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets even though ExcludeFromCodeCoverageAttribute exists in both netstandard2.0 and .NET Framework 4.0+. The claim also does not explain the #if condition  | breaker (Gemini) |
| F4 | medium | `EnumTemplate.tt` L8 | Claim C4 disputed: While the claim rightly notes that MyEnum in CodeCoverageExclusionTests.cs is unreferenced so EnumTemplate is not exercised there, the requirement is only partly met because EnumTemplate.tt line 8 and EnumTemplate.cs line 27 guard the attribute with #if !NETSTANDARD2_0 && !NETFRAMEWORK, needlessly omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework where the at | breaker (Gemini) |
| F5 | medium | `ResolverTemplate.tt` L14 | Claim C5 disputed: Neither named test verifies that partial class <ResolverName> carries ExcludeFromCodeCoverage: the generated resolver file also emits the attribute on FormatterCache<T> and <ResolverName>GetFormatterHelper, and CodeCoverageExclusionTests.cs lines 75-77 and 91-95 only assert text.Contains(ExcludeAttribute), attributeCount > 0, and attributeCount == guardedCount, so both tests sti | breaker (Gemini) |
| F6 | medium | `ResolverTemplate.tt` L31 | Claim C6 disputed: The named test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable (CodeCoverageExclusionTests.cs lines 91-95) does not test that FormatterCache<T> or <ResolverName>GetFormatterHelper receive ExcludeFromCodeCoverage: because partial class <ResolverName> already emits one guarded attribute in the same file, removing ResolverTemplate.tt lines 31-33 and 48-50 (ResolverTemplate. | breaker (Gemini) |
| F7 | medium | `CompositeResolverTemplate.tt` L7 | Claim C7 disputed: Although the claim accurately notes that neither new test exercises composite resolvers, the requirement is only partly met because CompositeResolverTemplate.tt lines 7 and 35 and CompositeResolverTemplate.cs lines 27 and 56 wrap ExcludeFromCodeCoverage in #if !NETSTANDARD2_0 && !NETFRAMEWORK, omitting it on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverage | breaker (Gemini) |
| F8 | medium | `CodeCoverageExclusionTests.cs` L18 | Claim C10 disputed: Cited line 18 of CodeCoverageExclusionTests.cs states the false premise that ExcludeFromCodeCoverageAttribute is not available on netstandard2.0 or .NET Framework (it exists in both netstandard2.0 and .NET Framework 4.0+), and lines 82-97 enforce the #if !NETSTANDARD2_0 && !NETFRAMEWORK guard that prevents the requirement from being met on those targets. | breaker (Gemini) |
| F9 | medium | `README.md` L1640 | Claim C13 disputed: README.md line 1640 documents that ExcludeFromCodeCoverage is only emitted for targets where it is available (not netstandard2.0 or .NET Framework), which is factually incorrect because System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute is available in both netstandard2.0 and .NET Framework 4.0+ (only its unused Justification property requires .NET 5+). | breaker (Gemini) |
| F10 | medium | `FormatterTemplate.tt` L14 | The `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard (repeated in every template) suppresses the attribute for netstandard2.0 and .NET Framework consumers. System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists on .NET Framework 4.0+ and netstandard2.0, and applying it to classes is allowed there. Libraries targeting netstandard2.0, which are common for MessagePack users, would still  | author (Claude) |
| F11 | medium | `ResolverTemplate.tt` L15 | The attribute is now emitted on the user's partial resolver class, and CompositeResolverTemplate.tt line 8 does the same. ExcludeFromCodeCoverage has AllowMultiple=false, so a user who already applied [ExcludeFromCodeCoverage] to their own partial resolver declaration (an obvious workaround for this issue) will now hit duplicate-attribute error CS0579. | author (Claude) |
| F12 | low | `CodeCoverageExclusionTests.cs` L76 | AllGeneratedTypesAreExcludedFromCodeCoverage only checks that each file contains the attribute somewhere. A missing attribute on FormatterCache<T> or GetFormatterHelper, or on one of several types in a file, would not fail it. The comment at line 69 claims an enum formatter is generated, but MyEnum is not referenced by any serialized member, so the enum template is likely untested here. | author (Claude) |
| F13 | low | `CodeCoverageExclusionTests.cs` L123 | The new tests discard the output compilation and diagnostics, so they never verify that the generated code with `#if` directives compiles. The `{#if` problem fixed in TransformUtilities is caught only by snapshot tests outside this diff. | author (Claude) |
| F14 | low | `README.md` L1640 | The README states the attribute is not available on netstandard2.0 or .NET Framework, which appears factually incorrect. Test comment line 18 repeats the claim. | author (Claude) |
| F15 | high | `ResolverTemplate.tt` L15 | Emitting [ExcludeFromCodeCoverage] on the user-declared partial class <ResolverName> (and likewise in CompositeResolverTemplate.tt line 8) is a breaking compile error (CS0579: Duplicate 'ExcludeFromCodeCoverage' attribute) if the consumer already decorated their own resolver partial class declaration with [ExcludeFromCodeCoverage], because ExcludeFromCodeCoverageAttribute specifies AllowMultiple = | breaker (Gemini) |
| F16 | medium | `FormatterTemplate.tt` L14 | All 6 templates guard [ExcludeFromCodeCoverage] with #if !NETSTANDARD2_0 && !NETFRAMEWORK (and README.md line 1640 claims the attribute does not exist there), but parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has existed since .NET Framework 4.0 (System.dll) and .NET Standard 2.0 (netstandard.dll); only its unused Justification property was added in .NET 5.0. Proje | breaker (Gemini) |
| F17 | low | `CodeCoverageExclusionTests.cs` L71 | AllGeneratedTypesAreExcludedFromCodeCoverage asserts generated.Count >= 5 expecting formatters for MyObject, MyStringKeyObject, MyEnum, IMyUnion, plus the resolver (per line 69), but it passes only because [MessagePackObject] on MyUnionMember generates a 5th file (MyUnionMemberFormatter.g.cs), masking that no enum formatter was generated. Additionally, RunGeneratorAsync on line 123 discards the up | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs`: Whitespace change to nesting-type brace emission. It is required for the preprocessor directives to compile, but it alters generated output for all constrained nesting types.
- `README.md`: Documentation paragraph describing the new behaviour and the target-framework restriction.

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
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (39s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

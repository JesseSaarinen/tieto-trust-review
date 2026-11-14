# Evidence pack: REQ-2297 on `seeded-11`

> Rebuilt offline from pack `a56f32dfe7fa` (seeded-11.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 123 of 179 changed code lines (69%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (2 flagged). Of everything changed: 9%.

- 3 refusal(s) on contracts/honesty grounds need a human look.
- 9 claim(s) disputed by the breaker or by the evidence check.
- 1 high-severity finding(s).
- Evidence took 56 of 179 changed code lines off the list (C11, C12: tests found passing in the real run, claim upheld by the breaker). 123 stay with the owner.
- Why lines stay: 97 claim disputed; 14 refused; 6 named by a finding; 4 no claim covers the line; 2 cited only by claims without a passing test.

**The owner must read** (15 files):
- `README.md` L1639-1640 (2 of 3 changed lines): R3 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): F7 breaker (Gemini); claim C7 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): claim C3 disputed
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): claim C3 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33 (2 of 2 changed lines): claim C1 disputed
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14-16 (3 of 3 changed lines): F1 breaker (Gemini); F16 breaker (Gemini); claim C1 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): claim C5 disputed; claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16, L31-33, L48-50 (9 of 9 changed lines): R1 contracts (AI-suggested); F5 breaker (Gemini); F10 author (Claude); claim C5 disputed; F11 author (Claude); F15 breaker (Gemini); F6 breaker (Gemini); claim C6 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37 (2 of 2 changed lines): claim C2 disputed
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18-20 (3 of 3 changed lines): F2 breaker (Gemini); claim C2 disputed
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C8, C9 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` L30 (2 of 2 changed lines): claim C4 disputed
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.tt` L10-12 (3 of 3 changed lines): F4 breaker (Gemini); claim C4 disputed
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L20-80, L86-96, L111, L130 (74 of 130 changed lines): no claim covers these lines; claim C10 disputed; F3 breaker (Gemini); F8 breaker (Gemini); F17 breaker (Gemini); R2 honesty (AI-suggested); F12 author (Claude)

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 56 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C12, C11

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `ec7c519361` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (60s) |
| Pack id | `126e05db38e7` |

## 1. Disputed claims (9)
**C1 (DISPUTED, behavior, author confidence high):** The integer-key object formatter template emits the guarded ExcludeFromCodeCoverage attribute immediately before `internal sealed class <Formatter>`. The .tt and the compiled .cs agree.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S1 passed)
- Breaker: **disputed**: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because FormatterTemplate.tt line 14 and FormatterTemplate.cs line 33 guard the attribute with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets even though parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in both (.NET Standard 2.0+ and .NET Framework 4.0+). Also, the named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 65-79) only checks text.Contains(ExcludeAttribute) and does not verify the #if guard or placement immediately before internal sealed class.

**C2 (DISPUTED, behavior, author confidence high):** The string-key formatter template emits the guarded ExcludeFromCodeCoverage attribute before the formatter class declaration.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S1 passed)
- Breaker: **disputed**: REQ-2297 is only partly met because StringKeyFormatterTemplate.tt line 18 and StringKeyFormatterTemplate.cs line 37 wrap ExcludeFromCodeCoverage in '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute is available. Also, the named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 65-79) only asserts text.Contains(ExcludeAttribute) and does not test the #if guard or placement before the class declaration.

**C3 (DISPUTED, behavior, author confidence high):** The enum formatter template emits the guarded ExcludeFromCodeCoverage attribute before the enum formatter class.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 65-79) does not test EnumTemplate: MyEnum (lines 37-41) is never referenced by any [MessagePackObject] or [Union] type in TestSource, so no enum formatter is generated, and Assert.True(generated.Count >= 5) at line 71 passes solely because TestSource declares 5 other attributed types (MyObject, MyStringKeyObject, IMyUnion, MyUnionMember, and GeneratedMessagePackResolver). In addition, REQ-2297 is only partly met because EnumTemplate.tt line 8 and EnumTemplate.cs line 27 omit the attribute on netstandard2.0 and .NET Framework via '#if !NETSTANDARD2_0 && !NETFRAMEWORK'.

**C4 (DISPUTED, behavior, author confidence high):** The union formatter template emits the guarded ExcludeFromCodeCoverage attribute before the union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S1 passed)
- Breaker: **disputed**: REQ-2297 is only partly met because UnionTemplate.tt line 10 and UnionTemplate.cs line 30 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', leaving union formatters undecorated on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute existing in both. Also, the named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 65-79) only asserts text.Contains(ExcludeAttribute) and does not verify the #if guard or placement before the class.

**C5 (DISPUTED, behavior, author confidence high):** The resolver template emits the guarded ExcludeFromCodeCoverage attribute on the generated `partial class <ResolverName>` declaration, after the XML doc summary.
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L38-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S1 passed)
- Breaker: **disputed**: The named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 73-78) only checks text.Contains(ExcludeAttribute) once per generated file; because the resolver file also contains decorated FormatterCache<T> and GetFormatterHelper classes, the test would still pass if partial class <ResolverName> had no attribute at all, and it does not check the #if guard or placement after the XML summary. Furthermore, REQ-2297 is only partly met due to '#if !NETSTANDARD2_0 && !NETFRAMEWORK' at ResolverTemplate.tt line 14 and ResolverTemplate.cs line 38.

**C6 (DISPUTED, behavior, author confidence high):** The resolver template also emits the guarded attribute on its nested `FormatterCache<T>` and `<ResolverName>GetFormatterHelper` classes.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L67-67
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because ResolverTemplate.tt lines 31 and 48 and ResolverTemplate.cs lines 55 and 67 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets even though ExcludeFromCodeCoverageAttribute is available in both.

**C7 (DISPUTED, behavior, author confidence medium):** The composite resolver template emits the guarded attribute on the composite resolver class and on its nested `FormatterCache<T>` class. The new tests do not exercise the composite resolver; only the CompositeResolver_* snapshots show it.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because CompositeResolverTemplate.tt lines 7 and 35 and CompositeResolverTemplate.cs lines 27 and 56 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute exists.

**C10 (DISPUTED, test, author confidence high):** Test AllGeneratedTypesAreExcludedFromCodeCoverage does the following. It runs the generator on a source containing an int-key object, a string-key object, an enum, a union and a declared resolver. It asserts at least 5 generated files and that every generated file contains the attribute text. It does not check that each class in a file is decorated.
- Lines: `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)
- Breaker: **disputed**: C10 misdescribes the cited TestSource (CodeCoverageExclusionTests.cs lines 21-62): it omits the second [MessagePackObject] int-key class MyUnionMember (lines 48-53) and misses that MyEnum (lines 37-41) is unreferenced by any serializable member, so generated.Count >= 5 (line 71) passes via those 5 attributed types without generating an enum formatter. Also, REQ-2297 is only partly met and tested because CompositeResolver is unexercised and netstandard2.0 / .NET Framework targets are excluded.

**C13 (DISPUTED, generated, author confidence high):** The 222 snapshot files are regenerated uniformly: they add the guard/attribute/endif triplets, plus the brace-newline reshaping in the GenericDataTypeWithPrivateMember snapshot.
- Lines: `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L29-31, `MessagePack.GeneratedMessagePackResolver.g.cs` L46-48
- Checked by: **static check** (static check S1 passed; static check S2 passed)
- Breaker: **disputed**: REQ-2297 ('MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute') is only partly met in the regenerated snapshots because every added attribute is wrapped in '#if !NETSTANDARD2_0 && !NETFRAMEWORK' (for example MessagePack.GeneratedMessagePackResolver.g.cs lines 12, 29, and 46), leaving netstandard2.0 and .NET Framework builds undecorated. Also, two formatter snapshots in GenericDataTypeWithPrivateMember—not one—had brace-newline reshaping (+5/-1 on HasPrivateSerializedMemberAndIsGenericNamedFormatter.g.cs and +4/-0 on HasPrivateSerializedMemberAndIsGenericOrdinalFormatter.g.cs).


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | The ExcludeFromCodeCoverage attribute is added to the user-declared partial resolver class, changing metadata on a possibly public user type and risking duplicate-attribute build errors. | Generated output merged into users' own (possibly public) types is user-visible. A design choice that can break existing builds should be decided by the owner. | `ResolverTemplate.tt` L14-16 | AI reading |
| R2 | honesty | The test claims to verify that every attribute occurrence is guarded but only asserts at least one is. | The test checks less than its comment says. | `CodeCoverageExclusionTests.cs` L86-96 | AI reading |
| R3 | honesty | The README asserts the attribute is unavailable on netstandard2.0/.NET Framework, justifying a guard that drops the feature there. | The documentation appears factually wrong and narrows the requirement ('all generated code') without saying so. | `README.md` L1639-1640 | AI reading |

## 3. The story
The source generator templates for the object formatter, string-key formatter, enum formatter and union formatter now emit `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on each generated formatter class. The resolver and composite-resolver templates emit it on the resolver class and on their nested `FormatterCache<T>` / `...GetFormatterHelper` classes. Every attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK ... #endif`. One line in `TransformUtilities` now ends the `{` of a constrained nesting type with a line break, so the `#if` directive starts on its own line. The change also regenerates 222 snapshot files, adds a README note and adds a new test class with two tests.

**Why:** REQ-2297 asks that all MessagePack generated code carry `ExcludeFromCodeCoverage`, so generated code does not skew coverage numbers.

**Touches beyond the requirement:**
- TransformUtilities.cs line 58 changes generator output whitespace for generic nesting types with constraints. This is needed so the new `#if` directive starts at the beginning of a line.
- README.md gains two sentences. One of them asserts that the attribute is unavailable on netstandard2.0/.NET Framework, which looks factually wrong.
- The `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard is a design decision the requirement did not ask for. It means consumers on those targets get no exclusion at all.

**How sure (the author's own view; it moves nothing):** High that each template now emits the guarded attribute, since the .tt and .cs edits match and the snapshots change uniformly (S1, S2). Medium that this fully meets 'all generated code'. The guard drops the attribute on netstandard2.0 and .NET Framework, which do appear to have this attribute, so those users get nothing. The second new test is weaker than its comment says: it only asserts that at least one guarded occurrence exists per file. Composite resolver output and the TransformUtilities newline fix are not exercised by the new tests; only by snapshot tests whose method names are not in the diff.

## 4. Claims (14)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | DISPUTED | The integer-key object formatter template emits the guarded ExcludeFromCodeCoverage attribute immediately before `internal sealed class <Formatter>`. The .tt and the compiled .cs agree. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C2 | DISPUTED | The string-key formatter template emits the guarded ExcludeFromCodeCoverage attribute before the formatter class declaration. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C3 | DISPUTED | The enum formatter template emits the guarded ExcludeFromCodeCoverage attribute before the enum formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C4 | DISPUTED | The union formatter template emits the guarded ExcludeFromCodeCoverage attribute before the union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C5 | DISPUTED | The resolver template emits the guarded ExcludeFromCodeCoverage attribute on the generated `partial class <ResolverName>` declaration, after the XML doc summary. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C6 | DISPUTED | The resolver template also emits the guarded attribute on its nested `FormatterCache<T>` and `<ResolverName>GetFormatterHelper` classes. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C7 | DISPUTED | The composite resolver template emits the guarded attribute on the composite resolver class and on its nested `FormatterCache<T>` class. The new tests do not exercise the composite resolver; only the CompositeResolver_* snapshots show it. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C10 | DISPUTED | Test AllGeneratedTypesAreExcludedFromCodeCoverage does the following. It runs the generator on a source containing an int-key object, a string-key object, an enum, a union and a declared resolver. It asserts at least 5 generated files and that every generated file contains the attribute text. It does not check that each class in a file is decorated. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | disputed | no |
| C13 | DISPUTED | The 222 snapshot files are regenerated uniformly: they add the guard/attribute/endif triplets, plus the brace-newline reshaping in the GenericDataTypeWithPrivateMember snapshot. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | static check | disputed | no |
| C14 | unverified | The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], except on netstandard2.0 and .NET Framework. The stated reason, that the attribute is unavailable there, appears to be inaccurate. | "I do not feel like a setting is needed, but setting would be fine to have too." | AI reading only | upheld | no |
| C8 | backed | When a nesting type has generic constraints, the opening brace is now followed by CRLF. This ensures the `#if` directive emitted next starts at the beginning of a line; a directive mid-line would not compile. | (scope) | static check | upheld | no |
| C9 | backed | Scope: apart from the attribute and guard lines, the only change to generator output is the CRLF after a constrained nesting type's brace. There are no reader/writer, wire-format or public API changes. | (scope) | static check | upheld | no |
| C11 | backed | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that each file has at least one attribute and at least one guarded attribute block. Despite its comment, it does not assert that every occurrence is guarded: `guardedCount` is never compared with `attributeCount`. | (scope) | test run | upheld | yes |
| C12 | backed | Test helpers and setup: the constants (lines 16-19) define the attribute and guard text. RunGeneratorAsync builds a compilation with default framework and MessagePack references, runs MessagePackGenerator and returns the generated trees' paths and text. Generator diagnostics and the output compilation are discarded, so compile errors in generated code would not fail these tests. | (scope) | test run | upheld | yes |

**C14 (unverified, docs, author confidence low):** The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], except on netstandard2.0 and .NET Framework. The stated reason, that the attribute is unavailable there, appears to be inaccurate.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1641: they document unconditional (setting-free) [ExcludeFromCodeCoverage] decoration on generated formatters and resolvers except on netstandard2.0 and .NET Framework where it is claimed unavailable, and C14 accurately flags that ExcludeFromCodeCoverageAttribute is in fact present in both .NET Standard 2.0 and .NET Framework 4.0+.

**C8 (backed, behavior, author confidence medium):** When a nesting type has generic constraints, the opening brace is now followed by CRLF. This ensures the `#if` directive emitted next starts at the beginning of a line; a directive mid-line would not compile.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)
- Breaker: **upheld**: Checked TransformUtilities.cs line 58 against all 6 templates—specifically StringKeyFormatterTemplate.cs line 37 and UnionTemplate.cs line 30, which emit '#if' immediately after EmitNestingTypesAndNamespaces without a leading newline—and confirmed via static check S2 (HasPrivateSerializedMemberAndIsGenericNamedFormatter) that without CRLF after '{' when anyConstraints is true, '#if' would land right after '{' on the same line and fail C# compilation.

**C9 (backed, scope, author confidence high):** Scope: apart from the attribute and guard lines, the only change to generator output is the CRLF after a constrained nesting type's brace. There are no reader/writer, wire-format or public API changes.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed; static check S3 passed; static check S5 passed)
- Breaker: **upheld**: Checked all 15 non-snapshot files in the diff and static checks S1-S6: every template and compiled .cs pair only adds the '#if !NETSTANDARD2_0 && !NETFRAMEWORK' / '[ExcludeFromCodeCoverage]' / '#endif' lines, TransformUtilities.cs line 58 only adds CRLF after a constrained nesting type's opening brace, and no public API, reader/writer, or wire-format code changed.

**C11 (backed, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that each file has at least one attribute and at least one guarded attribute block. Despite its comment, it does not assert that every occurrence is guarded: `guardedCount` is never compared with `attributeCount`.
- Lines: `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 81-110: lines 91-93 compute attributeCount and guardedCount using CountOccurrences (lines 99-110), and lines 94-95 only assert attributeCount > 0 and guardedCount > 0 without ever comparing guardedCount to attributeCount despite the comment at line 90.

**C12 (backed, test, author confidence high):** Test helpers and setup: the constants (lines 16-19) define the attribute and guard text. RunGeneratorAsync builds a compilation with default framework and MessagePack references, runs MessagePackGenerator and returns the generated trees' paths and text. Generator diagnostics and the output compilation are discarded, so compile errors in generated code would not fail these tests.
- Lines: `CodeCoverageExclusionTests.cs` L1-19, `CodeCoverageExclusionTests.cs` L112-129
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))
- Breaker: **upheld**: Checked CodeCoverageExclusionTests.cs lines 1-19 and 112-129: lines 16-19 define ExcludeAttribute and Guard, and RunGeneratorAsync (lines 112-129) builds the compilation, discards both the updated compilation and generator diagnostics via 'out _, out _' at line 123, and returns the generated file paths and source text.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 3 of its 5 sentences.
Requirement sentences no claim quotes (2; an issue body is mostly context, so skim this for anything the change should have done; first 2 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (17)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `FormatterTemplate.tt` L14 | Claim C1 disputed: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because FormatterTemplate.tt line 14 and FormatterTemplate.cs line 33 guard the attribute with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting ExcludeFromCodeCoverage on netstandard2.0 and .NET Framework targets even though parameterless System.Diagnostics.CodeAnalysis.Excl | breaker (Gemini) |
| F2 | medium | `StringKeyFormatterTemplate.tt` L18 | Claim C2 disputed: REQ-2297 is only partly met because StringKeyFormatterTemplate.tt line 18 and StringKeyFormatterTemplate.cs line 37 wrap ExcludeFromCodeCoverage in '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAttribute is available. Also, the named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeC | breaker (Gemini) |
| F3 | medium | `CodeCoverageExclusionTests.cs` L37 | Claim C3 disputed: The named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 65-79) does not test EnumTemplate: MyEnum (lines 37-41) is never referenced by any [MessagePackObject] or [Union] type in TestSource, so no enum formatter is generated, and Assert.True(generated.Count >= 5) at line 71 passes solely because TestSource declares 5 other attributed types | breaker (Gemini) |
| F4 | medium | `UnionTemplate.tt` L10 | Claim C4 disputed: REQ-2297 is only partly met because UnionTemplate.tt line 10 and UnionTemplate.cs line 30 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', leaving union formatters undecorated on netstandard2.0 and .NET Framework targets despite ExcludeFromCodeCoverageAttribute existing in both. Also, the named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCove | breaker (Gemini) |
| F5 | medium | `ResolverTemplate.tt` L14 | Claim C5 disputed: The named test AllGeneratedTypesAreExcludedFromCodeCoverage (CodeCoverageExclusionTests.cs lines 73-78) only checks text.Contains(ExcludeAttribute) once per generated file; because the resolver file also contains decorated FormatterCache<T> and GetFormatterHelper classes, the test would still pass if partial class <ResolverName> had no attribute at all, and it does not check the | breaker (Gemini) |
| F6 | medium | `ResolverTemplate.tt` L31 | Claim C6 disputed: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because ResolverTemplate.tt lines 31 and 48 and ResolverTemplate.cs lines 55 and 67 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets even though ExcludeFromCodeCoverageAttribute is  | breaker (Gemini) |
| F7 | medium | `CompositeResolverTemplate.tt` L7 | Claim C7 disputed: REQ-2297 ('all generated code to be decorated with ExcludeFromCodeCoverage attribute') is only partly met because CompositeResolverTemplate.tt lines 7 and 35 and CompositeResolverTemplate.cs lines 27 and 56 guard ExcludeFromCodeCoverage with '#if !NETSTANDARD2_0 && !NETFRAMEWORK', omitting the attribute on netstandard2.0 and .NET Framework targets where ExcludeFromCodeCoverageAt | breaker (Gemini) |
| F8 | medium | `CodeCoverageExclusionTests.cs` L37 | Claim C10 disputed: C10 misdescribes the cited TestSource (CodeCoverageExclusionTests.cs lines 21-62): it omits the second [MessagePackObject] int-key class MyUnionMember (lines 48-53) and misses that MyEnum (lines 37-41) is unreferenced by any serializable member, so generated.Count >= 5 (line 71) passes via those 5 attributed types without generating an enum formatter. Also, REQ-2297 is only par | breaker (Gemini) |
| F9 | medium | `MessagePack.GeneratedMessagePackResolver.g.cs` L12 | Claim C13 disputed: REQ-2297 ('MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute') is only partly met in the regenerated snapshots because every added attribute is wrapped in '#if !NETSTANDARD2_0 && !NETFRAMEWORK' (for example MessagePack.GeneratedMessagePackResolver.g.cs lines 12, 29, and 46), leaving netstandard2.0 and .NET Framework builds undecorated. Also, two | breaker (Gemini) |
| F10 | medium | `ResolverTemplate.tt` L14 | The guard `#if !NETSTANDARD2_0 && !NETFRAMEWORK` omits the attribute on netstandard2.0 and .NET Framework. `System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute` appears to exist on .NET Framework 4.0+ and netstandard2.0, with class targets supported. Consumers on those targets therefore get no exclusion, contrary to 'all generated code'. The same guard is used in every template. | author (Claude) |
| F11 | medium | `ResolverTemplate.tt` L15 | The attribute is applied to the user's `partial class` resolver, so it merges with the user's own declaration. ExcludeFromCodeCoverage is AllowMultiple=false. A user who already put [ExcludeFromCodeCoverage] on their resolver partial would hit CS0579 (duplicate attribute) and the build would break. The attribute would also silently exclude any user-written code in that partial class. The same appl | author (Claude) |
| F12 | medium | `CodeCoverageExclusionTests.cs` L95 | The comment says every attribute occurrence must be guarded, but the test only asserts `guardedCount > 0`. An unguarded attribute alongside one guarded attribute in the same file would pass. | author (Claude) |
| F13 | low | `CodeCoverageExclusionTests.cs` L123 | The output compilation and diagnostics are discarded (`out _, out _`), so the new tests do not verify that the generated code with the `#if` directives compiles. | author (Claude) |
| F14 | low | `README.md` L1640 | The README states the attribute is not available on netstandard2.0 or .NET Framework. This appears inaccurate and would mislead users. | author (Claude) |
| F15 | high | `ResolverTemplate.tt` L15 | Emitting [ExcludeFromCodeCoverage] on the generated 'partial class <ResolverName>' declaration (and likewise in CompositeResolverTemplate.tt line 8 / CompositeResolverTemplate.cs line 27) decorates a user-declared partial class. Because ExcludeFromCodeCoverageAttribute has AllowMultiple = false, any consumer who already placed [ExcludeFromCodeCoverage] on their own partial resolver class as a work | breaker (Gemini) |
| F16 | medium | `FormatterTemplate.tt` L14 | All 6 code templates (FormatterTemplate.tt:14, StringKeyFormatterTemplate.tt:18, EnumTemplate.tt:8, UnionTemplate.tt:10, ResolverTemplate.tt:14/31/48, CompositeResolverTemplate.tt:7/35) wrap [ExcludeFromCodeCoverage] in '#if !NETSTANDARD2_0 && !NETFRAMEWORK'. Parameterless System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute has been in the BCL since .NET Framework 4.0 and .NET Standar | breaker (Gemini) |
| F17 | medium | `CodeCoverageExclusionTests.cs` L37 | In TestSource, 'public enum MyEnum' is never referenced by any [MessagePackObject] member, so MessagePackGenerator never emits an enum formatter in CodeCoverageExclusionTests. Because MyUnionMember (lines 48-53) also has [MessagePackObject], generated.Count is 5 without MyEnum, causing Assert.True(generated.Count >= 5) at line 71 to pass while leaving EnumTemplate completely untested by CodeCovera | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs`: Changes generated whitespace (CRLF after the brace of constrained nesting types). It is needed so the `#if` directive sits at line start, but it reshapes the output of an existing snapshot.
- `README.md`: Documentation addition describing the new behaviour and the target-framework guard.

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
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (60s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

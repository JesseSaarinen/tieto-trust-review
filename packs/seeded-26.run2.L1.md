# Evidence pack: REQ-2297 on `seeded-26`

> **REVIEW PARTLY INCOMPLETE: 1 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **tests**: 165 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `e57e07ccb95e` (seeded-26.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 179 of 179 changed code lines (100%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (2 flagged). Of everything changed: 13%.

- 2 refusal(s) on honesty/contracts grounds need a human look.
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 179.
- Why lines stay: 173 cited only by claims without a passing test; 3 refused; 3 no claim covers the line.

**The owner must read** (15 files):
- `README.md` L1639-1640 (2 of 3 changed lines): R1 honesty (AI-suggested); F1 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): C3 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): C6 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): C6 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14-16 (3 of 3 changed lines): C4, C8 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): C1 has no passing test behind it; C2 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16, L31-33, L48-50 (9 of 9 changed lines): R2 contracts (AI-suggested); F2 author (Claude); F3 author (Claude); C2 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37 (2 of 2 changed lines): C5 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.tt` L18-20 (3 of 3 changed lines): C5 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C9 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` L30 (2 of 2 changed lines): C7 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.tt` L10-12 (3 of 3 changed lines): C7 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L1-130 (130 of 130 changed lines): C12 has no passing test behind it; no claim covers these lines; C10 has no passing test behind it; C11 has no passing test behind it

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `6a3ffd2ca1` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 165 blocked by the machine, 0 skipped (68s) |
| Pack id | `c52ad53297d8` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The README claims the attribute is emitted on netstandard2.0 and .NET Framework. | The documentation contradicts the implemented `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard and would mislead users. | `README.md` L1639-1640 | AI reading |
| R2 | contracts | Generated user-facing partial resolver classes now carry a non-AllowMultiple attribute. | This changes the shape of code emitted into consumer assemblies and can break builds of users who already applied the attribute to their partial resolver declaration. The framework-exclusion decision (the guard) is also a product choice that narrows the requested behaviour. | `ResolverTemplate.tt` L14-16 | AI reading |

## 3. The story
The source generator templates (resolver, composite resolver, object formatter, string-key formatter, enum formatter, union formatter) now put `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on every emitted type, including the nested `FormatterCache<T>` and `GetFormatterHelper` classes. Each attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. A small change in TransformUtilities makes the nesting brace end with a line break, so the `#if` always starts on its own line. 222 snapshot files were regenerated. A README paragraph and a new test class with two tests were added.

**Why:** Issue 2297 asks for all generated MessagePack code to carry ExcludeFromCodeCoverage so that it does not skew coverage numbers.

**Touches beyond the requirement:**
- TransformUtilities.EmitNestingTypesAndNamespaces now emits `{\r\n` instead of `{` when type constraints exist. Without it, an emitted `#if` could land mid-line. It changes the whitespace of generated output for constrained nesting types.
- README gains a paragraph. Its second sentence (all target frameworks, including netstandard2.0 and .NET Framework) contradicts the code's `#if` guard.
- The attribute is deliberately left out for netstandard2.0 and .NET Framework consumers. The issue asked for 'all generated code', so this is a narrower delivery than requested.

**How sure (the author's own view; it moves nothing):** High that every template emits the guarded attribute: the template and .cs pairs match (S1) and the snapshots change uniformly (S2). Medium on whether the guard is right. ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and netstandard2.0, so the guard looks unnecessary and leaves those users unserved. Low on the README, which is factually wrong about this code. The new tests only check text substrings per file and do not compile the output.

## 4. Claims (15)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C12 | unverified | The test helper RunGeneratorAsync builds an in-memory compilation with framework and MessagePack references, then returns the generated trees. The file header and constants define the attribute and guard strings. Compilation diagnostics are discarded. | (scope) | AI reading only | - | no |
| C13 | unverified | The README documents the attribute. Line 1640 claims the attribute is emitted for netstandard2.0 and .NET Framework, which the `#if` guard in the templates contradicts. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | AI reading only | - | no |
| C1 | backed | The resolver template emits the guarded ExcludeFromCodeCoverage attribute on the generated resolver partial class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C2 | backed | The resolver template also emits the guarded attribute on the nested FormatterCache<T> and <Resolver>GetFormatterHelper classes. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C3 | backed | The composite resolver template emits the guarded attribute on the composite resolver partial class and its nested FormatterCache<T>. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C4 | backed | The integer-key object formatter template emits the guarded attribute on the generated formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C5 | backed | The string-key formatter template emits the guarded attribute on the generated formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C6 | backed | The enum formatter template emits the guarded attribute on the generated enum formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C7 | backed | The union formatter template emits the guarded attribute on the generated union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C8 | backed | Every emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. Consumers compiling for netstandard2.0 or .NET Framework therefore get no exclusion attribute. This narrows 'all generated code', and the attribute exists on those targets anyway. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C9 | backed | When nesting types have constraints, EmitNestingTypesAndNamespaces now writes `{` followed by a line break. A following `#if` directive therefore starts at the beginning of a line, as C# preprocessor directives must. | (scope) | static check | - | no |
| C10 | backed | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator on a source with int-key, string-key, enum, union and resolver types. It asserts at least 5 generated files and that each file contains the attribute text at least once. It checks per file, not per type. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C11 | backed | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file appears inside the exact guard block (tabbed or untabbed). It does so by counting substring occurrences with the CountOccurrences helper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C14 | backed | The 222 snapshot files changed only by the guarded attribute lines, plus one whitespace reshape from C9. They are consistent with the template changes. | (scope) | static check | - | no |
| C15 | backed | The change adds no public API to shipped assemblies and does not alter serialization (reader/writer) code. It only adds attributes and whitespace to generated output. | (scope) | static check | - | no |

**C12 (unverified, test, author confidence high):** The test helper RunGeneratorAsync builds an in-memory compilation with framework and MessagePack references, then returns the generated trees. The file header and constants define the attribute and guard strings. Compilation diagnostics are discarded.
- Lines: `CodeCoverageExclusionTests.cs` L1-19, `CodeCoverageExclusionTests.cs` L112-130
- Checked by: **AI reading only** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way))

**C13 (unverified, docs, author confidence low):** The README documents the attribute. Line 1640 claims the attribute is emitted for netstandard2.0 and .NET Framework, which the `#if` guard in the templates contradicts.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The resolver template emits the guarded ExcludeFromCodeCoverage attribute on the generated resolver partial class.
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L37-38
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed; static check S2 passed)

**C2 (backed, behavior, author confidence high):** The resolver template also emits the guarded attribute on the nested FormatterCache<T> and <Resolver>GetFormatterHelper classes.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L66-67
- Checked by: **static check** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed; static check S2 passed)

**C3 (backed, behavior, author confidence medium):** The composite resolver template emits the guarded attribute on the composite resolver partial class and its nested FormatterCache<T>.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed; static check S2 passed)

**C4 (backed, behavior, author confidence high):** The integer-key object formatter template emits the guarded attribute on the generated formatter class.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed; static check S2 passed)

**C5 (backed, behavior, author confidence high):** The string-key formatter template emits the guarded attribute on the generated formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed)

**C6 (backed, behavior, author confidence high):** The enum formatter template emits the guarded attribute on the generated enum formatter class.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed; static check S2 passed)

**C7 (backed, behavior, author confidence high):** The union formatter template emits the guarded attribute on the generated union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S1 passed; static check S2 passed)

**C8 (backed, behavior, author confidence medium):** Every emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. Consumers compiling for netstandard2.0 or .NET Framework therefore get no exclusion attribute. This narrows 'all generated code', and the attribute exists on those targets anyway.
- Lines: `ResolverTemplate.tt` L14-16, `FormatterTemplate.tt` L14-16
- Checked by: **static check** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S2 passed)

**C9 (backed, behavior, author confidence medium):** When nesting types have constraints, EmitNestingTypesAndNamespaces now writes `{` followed by a line break. A following `#if` directive therefore starts at the beginning of a line, as C# preprocessor directives must.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)

**C10 (backed, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator on a source with int-key, string-key, enum, union and resolver types. It asserts at least 5 generated files and that each file contains the attribute text at least once. It checks per file, not per type.
- Lines: `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **static check** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` blocked by the machine (not evidence either way); static check S8 passed)

**C11 (backed, test, author confidence medium):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file appears inside the exact guard block (tabbed or untabbed). It does so by counting substring occurrences with the CountOccurrences helper.
- Lines: `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **static check** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` blocked by the machine (not evidence either way); static check S8 passed)

**C14 (backed, generated, author confidence high):** The 222 snapshot files changed only by the guarded attribute lines, plus one whitespace reshape from C9. They are consistent with the template changes.
- Lines: `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L29-31, `MessagePack.GeneratedMessagePackResolver.g.cs` L46-48
- Checked by: **static check** (static check S1 passed; static check S2 passed)

**C15 (backed, scope, author confidence high):** The change adds no public API to shipped assemblies and does not alter serialization (reader/writer) code. It only adds attributes and whitespace to generated output.
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 2 of its 5 sentences.
Requirement sentences no claim quotes (3; an issue body is mostly context, so skim this for anything the change should have done; first 3 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- I do not feel like a setting is needed, but setting would be fine to have too.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `README.md` L1640 | The README says the attribute is emitted for every target framework, including netstandard2.0 and .NET Framework. The templates do the opposite: they wrap it in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. The documentation is false. | author (Claude) |
| F2 | medium | `ResolverTemplate.tt` L14 | The guard appears unnecessary. System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and netstandard2.0, where it can be applied to classes. Consumers on those targets (common for libraries and Unity) still get generated code counted in coverage, which is the problem the issue raised. The test comment at CodeCoverageExclusionTests.cs line 18 repeats the inc | author (Claude) |
| F3 | medium | `ResolverTemplate.tt` L15 | The attribute is placed on `partial class <Resolver>`, and the user declares the other half of that class. ExcludeFromCodeCoverage has AllowMultiple=false. A user who already added [ExcludeFromCodeCoverage] to their partial resolver (the natural workaround for this issue) will hit CS0579 (duplicate attribute) and fail to build after upgrading. The same applies to CompositeResolverTemplate.tt line  | author (Claude) |
| F4 | low | `CodeCoverageExclusionTests.cs` L123 | The generator's diagnostics and the output compilation are discarded (`out _, out _`), so the new tests never check that the guarded output compiles. The substring check would still pass if a `#if` landed mid-line, for example after `{`. The C9 fix in TransformUtilities is covered only by existing snapshot tests. | author (Claude) |
| F5 | low | `CodeCoverageExclusionTests.cs` L76 | The test checks that each generated file contains the attribute at least once, not that every generated type carries it. A missing attribute on a nested helper type would go unnoticed. The composite resolver template is not exercised by the new tests. | author (Claude) |

**Out of scope changes:**
- `README.md`: Adds a documentation paragraph. It is not required, and its second sentence is inaccurate.
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs`: Changes a brace-emission whitespace detail. This is supporting work so the new `#if` lines begin on their own line. It slightly changes generated output for constrained nesting types.

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
ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 4 passed, 0 failed, 165 blocked by the machine, 0 skipped (68s)

## 8. What was NOT checked
- Reviewer part missing or failed: tests: 165 test(s) were blocked by this machine (Windows Application Control). Effect: a claim that names a blocked test is not backed and releases nothing.
- 165 test(s) could not run because this machine blocked them (Windows Application Control); they count as not run, not as failures.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.
- 220 generated snapshot files were not shown to the models; covered only by static check S2 and the snapshot tests.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

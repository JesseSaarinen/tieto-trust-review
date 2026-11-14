# Evidence pack: REQ-2297 on `seeded-16`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `94c6ac6e483b` (seeded-16.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 26 of 179 changed code lines (14%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (2 flagged). Of everything changed: 2%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 153 of 179 changed code lines off the list (C1, C2, C3, C5, C6, C9, C10, C11: tests found passing in the real run; breaker removed for this measurement). 26 stay with the owner.
- Why lines stay: 16 cited only by claims without a passing test; 4 no claim covers the line; 3 refused; 2 claim rests on AI reading only; 1 named by a finding.

**The owner must read** (9 files):
- `README.md` L1639-1640 (2 of 3 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): C7 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): C7 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.tt` L8-10 (3 of 3 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (1 of 3 changed lines): F1 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16 (3 of 9 changed lines): R1 contracts (AI-suggested); F2 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): claim C8 only AI-read
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L17, L20, L80, L111 (4 of 130 changed lines): no claim covers these lines

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 153 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C1, C5, C6, C2, C3, C11, C9, C10

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `fe3e8c6031` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (39s) |
| Pack id | `df66a7f4172e` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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
| C8 | unverified | When the nesting type has generic constraints, TransformUtilities now writes a line break after the opening brace. Without it, a template's `#if` would follow `{` on the same line, which is an invalid preprocessor directive. This also adds a blank line in some formatter output. | (scope) | AI reading only | - | no |
| C13 | unverified | The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 and .NET Framework. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | AI reading only | - | no |
| C1 | backed | FormatterTemplate emits the guarded ExcludeFromCodeCoverage attribute immediately before each integer-keyed object formatter's `internal sealed class` declaration. The .tt and the compiled .cs change together. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C2 | backed | StringKeyFormatterTemplate emits the guarded attribute before each string-keyed (keyAsPropertyName) formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C3 | backed | UnionTemplate emits the guarded attribute before each union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C4 | backed | EnumTemplate emits the guarded attribute before each enum formatter class. The new tests' source declares MyEnum, but no serialized member references it, so the enum template is probably not exercised by them. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C5 | backed | ResolverTemplate emits the guarded attribute on the generated `partial class <ResolverName> : IFormatterResolver`, after its XML doc summary. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C6 | backed | ResolverTemplate also emits the guarded attribute on the nested FormatterCache<T> and <ResolverName>GetFormatterHelper static classes. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C7 | backed | CompositeResolverTemplate emits the guarded attribute on the composite resolver partial class and on its nested FormatterCache<T>. Neither new test exercises composite resolvers. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C9 | backed | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source with int-key, string-key, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text. It does not check that every type in a file carries the attribute. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C10 | backed | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file is wrapped exactly in the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` guard, with or without a leading tab. It counts occurrences with the CountOccurrences helper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C11 | backed | The RunGeneratorAsync helper compiles the test source against the default framework and MessagePack references. It runs MessagePackGenerator through a CSharpGeneratorDriver and returns each generated tree's path and text, ignoring compilation diagnostics. The usings and class header support this helper. | (scope) | test run | - | yes |
| C12 | backed | The regenerated snapshot files change only by the guarded attribute lines, plus the brace and newline reflow from C8. They match the updated templates. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C14 | backed | Scope: no runtime, wire-format, public-API or analyzer-rule code changed. The only non-template generator code change is the TransformUtilities newline fix, and no setting or option was added. | "I do not feel like a setting is needed, but setting would be fine to have too." | static check | - | no |

**C8 (unverified, behavior, author confidence medium):** When the nesting type has generic constraints, TransformUtilities now writes a line break after the opening brace. Without it, a template's `#if` would follow `{` on the same line, which is an invalid preprocessor directive. This also adds a blank line in some formatter output.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **AI reading only**

**C13 (unverified, docs, author confidence medium):** The README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 and .NET Framework.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** FormatterTemplate emits the guarded ExcludeFromCodeCoverage attribute immediately before each integer-keyed object formatter's `internal sealed class` declaration. The .tt and the compiled .cs change together.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)

**C2 (backed, behavior, author confidence high):** StringKeyFormatterTemplate emits the guarded attribute before each string-keyed (keyAsPropertyName) formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)

**C3 (backed, behavior, author confidence high):** UnionTemplate emits the guarded attribute before each union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)

**C4 (backed, behavior, author confidence medium):** EnumTemplate emits the guarded attribute before each enum formatter class. The new tests' source declares MyEnum, but no serialized member references it, so the enum template is probably not exercised by them.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **static check** (static check S1 passed)

**C5 (backed, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the generated `partial class <ResolverName> : IFormatterResolver`, after its XML doc summary.
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L38-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)

**C6 (backed, behavior, author confidence high):** ResolverTemplate also emits the guarded attribute on the nested FormatterCache<T> and <ResolverName>GetFormatterHelper static classes.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L67-67
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed)

**C7 (backed, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the composite resolver partial class and on its nested FormatterCache<T>. Neither new test exercises composite resolvers.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed)

**C9 (backed, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source with int-key, string-key, enum and union types plus a resolver. It asserts at least 5 generated files and that each file contains the attribute text. It does not check that every type in a file carries the attribute.
- Lines: `CodeCoverageExclusionTests.cs` L16-16, `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)

**C10 (backed, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every attribute occurrence in each generated file is wrapped exactly in the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` guard, with or without a leading tab. It counts occurrences with the CountOccurrences helper.
- Lines: `CodeCoverageExclusionTests.cs` L18-19, `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)

**C11 (backed, test, author confidence medium):** The RunGeneratorAsync helper compiles the test source against the default framework and MessagePack references. It runs MessagePackGenerator through a CSharpGeneratorDriver and returns each generated tree's path and text, ignoring compilation diagnostics. The usings and class header support this helper.
- Lines: `CodeCoverageExclusionTests.cs` L1-15, `CodeCoverageExclusionTests.cs` L112-130
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))

**C12 (backed, generated, author confidence high):** The regenerated snapshot files change only by the guarded attribute lines, plus the brace and newline reflow from C8. They match the updated templates.
- Lines: `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-14, `MessagePack.GeneratedMessagePackResolver.g.cs` L29-31, `MessagePack.GeneratedMessagePackResolver.g.cs` L46-48
- Checked by: **static check** (static check S1 passed; static check S2 passed)

**C14 (backed, scope, author confidence high):** Scope: no runtime, wire-format, public-API or analyzer-rule code changed. The only non-template generator code change is the TransformUtilities newline fix, and no setting or option was added.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 3 of its 5 sentences.
Requirement sentences no claim quotes (2; an issue body is mostly context, so skim this for anything the change should have done; first 2 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `FormatterTemplate.tt` L14 | The `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard (repeated in every template) suppresses the attribute for netstandard2.0 and .NET Framework consumers. System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists on .NET Framework 4.0+ and netstandard2.0, and applying it to classes is allowed there. Libraries targeting netstandard2.0, which are common for MessagePack users, would still  | author (Claude) |
| F2 | medium | `ResolverTemplate.tt` L15 | The attribute is now emitted on the user's partial resolver class, and CompositeResolverTemplate.tt line 8 does the same. ExcludeFromCodeCoverage has AllowMultiple=false, so a user who already applied [ExcludeFromCodeCoverage] to their own partial resolver declaration (an obvious workaround for this issue) will now hit duplicate-attribute error CS0579. | author (Claude) |
| F3 | low | `CodeCoverageExclusionTests.cs` L76 | AllGeneratedTypesAreExcludedFromCodeCoverage only checks that each file contains the attribute somewhere. A missing attribute on FormatterCache<T> or GetFormatterHelper, or on one of several types in a file, would not fail it. The comment at line 69 claims an enum formatter is generated, but MyEnum is not referenced by any serialized member, so the enum template is likely untested here. | author (Claude) |
| F4 | low | `CodeCoverageExclusionTests.cs` L123 | The new tests discard the output compilation and diagnostics, so they never verify that the generated code with `#if` directives compiles. The `{#if` problem fixed in TransformUtilities is caught only by snapshot tests outside this diff. | author (Claude) |
| F5 | low | `README.md` L1640 | The README states the attribute is not available on netstandard2.0 or .NET Framework, which appears factually incorrect. Test comment line 18 repeats the claim. | author (Claude) |

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

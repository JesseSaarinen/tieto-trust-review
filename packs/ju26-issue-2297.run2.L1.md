# Evidence pack: REQ-2297 on `ju26-issue-2297`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `4431a63e3e22` (ju26-issue-2297.run2.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 21 of 179 changed code lines (12%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (3 flagged). Of everything changed: 2%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- Evidence took 158 of 179 changed code lines off the list (C1, C2, C3, C6, C7, C8, C9, C11, C12, C13: tests found passing in the real run; breaker removed for this measurement). 21 stay with the owner.
- Why lines stay: 13 cited only by claims without a passing test; 5 no claim covers the line; 3 refused.

**The owner must read** (6 files):
- `README.md` L1639-1641 (3 of 3 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): C4 has no passing test behind it; C5 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.tt` L7-9, L35-37 (6 of 6 changed lines): C4 has no passing test behind it; C5 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` L14-16 (3 of 9 changed lines): R1 contracts (AI-suggested); F1 author (Claude); F3 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C10, C15 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L15, L17, L20, L80, L111 (5 of 130 changed lines): no claim covers these lines

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 158 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C6, C7, C1, C2, C3, C8, C9, C13, C11, C12

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `a0aa5ab2de` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (28s) |
| Pack id | `bb805bf29b80` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

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
| C14 | unverified | README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 / .NET Framework. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | AI reading only | - | no |
| C1 | backed | ResolverTemplate emits the guarded ExcludeFromCodeCoverage attribute on the generated partial resolver class (.tt and compiled .cs agree). | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C2 | backed | ResolverTemplate emits the guarded attribute on the nested private static class FormatterCache<T>. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C3 | backed | ResolverTemplate emits the guarded attribute on the nested private static class <Resolver>GetFormatterHelper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C4 | backed | CompositeResolverTemplate emits the guarded attribute on the generated partial composite resolver class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C5 | backed | CompositeResolverTemplate emits the guarded attribute on the nested static class FormatterCache<T>. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C6 | backed | EnumTemplate emits the guarded attribute on each generated enum formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C7 | backed | FormatterTemplate (integer-keyed objects) emits the guarded attribute on each generated formatter class, placed before the class declaration and its type constraints. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C8 | backed | StringKeyFormatterTemplate emits the guarded attribute on each generated string-keyed formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C9 | backed | UnionTemplate emits the guarded attribute on each generated union formatter class. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C10 | backed | When a nesting type has type constraints, EmitNestingTypesAndNamespaces now writes a newline after '{'. The following `#if` directive therefore starts its own line, so the generated code still compiles. This changes output only for constrained nesting types (seen in the GenericDataTypeWithPrivateMember snapshot). | (scope) | static check | - | no |
| C11 | backed | Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source containing int-keyed, string-keyed, enum and union types plus a resolver. It asserts that at least 5 files are generated and that each file contains the attribute text at least once. It does not check per-type coverage. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C12 | backed | Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every occurrence of the attribute in each generated file is wrapped in the exact `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` pattern (tab-indented or not). It uses a counting helper for this. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C13 | backed | Shared test helper RunGeneratorAsync builds a CSharpCompilation with framework and MessagePack references, runs MessagePackGenerator, and returns each generated tree's path and text. It discards generator diagnostics and does not compile-check the output. | (scope) | test run | - | yes |
| C15 | backed | Scope: production changes are confined to source-generator templates, their compiled .cs counterparts and one emission helper. No runtime serializer code, wire format, public API or analyzer rules change, and no existing tests are weakened. | (scope) | static check | - | no |

**C14 (unverified, docs, author confidence medium):** README documents that generated formatters and resolvers carry [ExcludeFromCodeCoverage], and that it is omitted on netstandard2.0 / .NET Framework.
- Lines: `README.md` L1639-1641
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** ResolverTemplate emits the guarded ExcludeFromCodeCoverage attribute on the generated partial resolver class (.tt and compiled .cs agree).
- Lines: `ResolverTemplate.tt` L14-16, `ResolverTemplate.cs` L37-38
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C2 (backed, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the nested private static class FormatterCache<T>.
- Lines: `ResolverTemplate.tt` L31-33, `ResolverTemplate.cs` L55-57
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C3 (backed, behavior, author confidence high):** ResolverTemplate emits the guarded attribute on the nested private static class <Resolver>GetFormatterHelper.
- Lines: `ResolverTemplate.tt` L48-50, `ResolverTemplate.cs` L66-68
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C4 (backed, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the generated partial composite resolver class.
- Lines: `CompositeResolverTemplate.tt` L7-9, `CompositeResolverTemplate.cs` L27-27
- Checked by: **static check** (static check S1 passed; static check S2 passed)

**C5 (backed, behavior, author confidence medium):** CompositeResolverTemplate emits the guarded attribute on the nested static class FormatterCache<T>.
- Lines: `CompositeResolverTemplate.tt` L35-37, `CompositeResolverTemplate.cs` L56-58
- Checked by: **static check** (static check S1 passed; static check S2 passed)

**C6 (backed, behavior, author confidence medium):** EnumTemplate emits the guarded attribute on each generated enum formatter class.
- Lines: `EnumTemplate.tt` L8-10, `EnumTemplate.cs` L27-27
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C7 (backed, behavior, author confidence high):** FormatterTemplate (integer-keyed objects) emits the guarded attribute on each generated formatter class, placed before the class declaration and its type constraints.
- Lines: `FormatterTemplate.tt` L14-16, `FormatterTemplate.cs` L33-33
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C8 (backed, behavior, author confidence high):** StringKeyFormatterTemplate emits the guarded attribute on each generated string-keyed formatter class.
- Lines: `StringKeyFormatterTemplate.tt` L18-20, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C9 (backed, behavior, author confidence high):** UnionTemplate emits the guarded attribute on each generated union formatter class.
- Lines: `UnionTemplate.tt` L10-12, `UnionTemplate.cs` L30-30
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S1 passed; static check S2 passed)

**C10 (backed, behavior, author confidence medium):** When a nesting type has type constraints, EmitNestingTypesAndNamespaces now writes a newline after '{'. The following `#if` directive therefore starts its own line, so the generated code still compiles. This changes output only for constrained nesting types (seen in the GenericDataTypeWithPrivateMember snapshot).
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)

**C11 (backed, test, author confidence medium):** Test AllGeneratedTypesAreExcludedFromCodeCoverage runs the generator over a source containing int-keyed, string-keyed, enum and union types plus a resolver. It asserts that at least 5 files are generated and that each file contains the attribute text at least once. It does not check per-type coverage.
- Lines: `CodeCoverageExclusionTests.cs` L16-16, `CodeCoverageExclusionTests.cs` L21-79
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S8 passed)

**C12 (backed, test, author confidence high):** Test ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable asserts that every occurrence of the attribute in each generated file is wrapped in the exact `#if !NETSTANDARD2_0 && !NETFRAMEWORK` ... `#endif` pattern (tab-indented or not). It uses a counting helper for this.
- Lines: `CodeCoverageExclusionTests.cs` L18-19, `CodeCoverageExclusionTests.cs` L81-110
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S8 passed)

**C13 (backed, test, author confidence medium):** Shared test helper RunGeneratorAsync builds a CSharpCompilation with framework and MessagePack references, runs MessagePackGenerator, and returns each generated tree's path and text. It discards generator diagnostics and does not compile-check the output.
- Lines: `CodeCoverageExclusionTests.cs` L1-14, `CodeCoverageExclusionTests.cs` L112-130
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))

**C15 (backed, scope, author confidence high):** Scope: production changes are confined to source-generator templates, their compiled .cs counterparts and one emission helper. No runtime serializer code, wire format, public API or analyzer rules change, and no existing tests are weakened.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed; static check S7 passed)

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 2 of its 5 sentences.
Requirement sentences no claim quotes (3; an issue body is mostly context, so skim this for anything the change should have done; first 3 shown, all in the JSON):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- I do not feel like a setting is needed, but setting would be fine to have too.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `ResolverTemplate.tt` L14 | The guard `#if !NETSTANDARD2_0 && !NETFRAMEWORK` rests on a false premise. System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in .NET Framework 4.0+ and in netstandard2.0. Consumers targeting those frameworks, including Unity projects (a large MessagePack audience), get no coverage exclusion at all. So 'all generated code' is not decorated for them. The same guard is repeated  | author (Claude) |
| F2 | low | `README.md` L1640 | The README states that the attribute is not available on netstandard2.0 or .NET Framework. That is factually incorrect and documents the unnecessary limitation above. The test comment at CodeCoverageExclusionTests.cs line 18 repeats the same claim. | author (Claude) |
| F3 | medium | `ResolverTemplate.tt` L15 | The attribute is emitted on the user-declared partial resolver class. ExcludeFromCodeCoverageAttribute has AllowMultiple=false. A user who already put [ExcludeFromCodeCoverage] on their own partial GeneratedMessagePackResolver (the natural workaround for this exact issue) now gets compile error CS0579 (duplicate attribute). The same applies to the composite resolver at CompositeResolverTemplate.tt | author (Claude) |
| F4 | low | `CodeCoverageExclusionTests.cs` L76 | The test only checks that each generated file contains the attribute somewhere, not that every generated type has it. In the resolver file, removing the attribute from FormatterCache or GetFormatterHelper would still pass. `generated.Count >= 5` does not prove an enum formatter was generated, and the composite resolver template is not exercised by the new tests at all. | author (Claude) |

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

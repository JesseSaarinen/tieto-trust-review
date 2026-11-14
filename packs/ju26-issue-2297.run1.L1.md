# Evidence pack: REQ-2297 on `ju26-issue-2297`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `e6f54fc27125` (ju26-issue-2297.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 108 of 179 changed code lines (60%).** Generated snapshots: 1210 lines released by static check S2. Docs: 3 lines, read with the story (3 flagged). Of everything changed: 8%.

- 2 refusal(s) on honesty/contracts grounds need a human look.
- Evidence took 71 of 179 changed code lines off the list (C2, C1, C3, C6: tests found passing in the real run; breaker removed for this measurement). 108 stay with the owner.
- Why lines stay: 76 no claim covers the line; 22 cited only by claims without a passing test; 9 refused; 1 named by a finding.

**The owner must read** (11 files):
- `README.md` whole file diff (3 changed lines): R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.tt` whole file diff (9 changed lines): R2 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/Transforms/CompositeResolverTemplate.cs` L27, L56-58 (5 of 5 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/EnumTemplate.cs` L27 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.cs` L33 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/FormatterTemplate.tt` L14 (1 of 3 changed lines): F1 author (Claude)
- `src/MessagePack.SourceGenerator/Transforms/ResolverTemplate.cs` L38, L55-57, L67 (7 of 7 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/StringKey/StringKeyFormatterTemplate.cs` L37 (2 of 2 changed lines): C4 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs` L58 (2 of 2 changed lines): C5 has no passing test behind it
- `src/MessagePack.SourceGenerator/Transforms/UnionTemplate.cs` L30 (2 of 2 changed lines): C4 has no passing test behind it
- `tests/MessagePack.SourceGenerator.Tests/CodeCoverageExclusionTests.cs` L1-17, L20-63, L98-111, L130 (76 of 130 changed lines): no claim covers these lines

**Not required to read:**
- 222 generated test snapshots (.g.cs): static check S2: all change the same way; snapshot tests compare them with real generator output
- 71 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C2, C1, C3, C6

| | |
|---|---|
| Requirement | REQ-2297: Add ExcludeFromCodeCoverage attribute to generated code. |
| Commit | `a0aa5ab2de` (base `32258fdbee`) |
| Files | 237 changed, 15 real (222 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 169 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 169 passed, 0 failed, 0 skipped (28s) |
| Pack id | `60b14ffe579b` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The target-framework guard and the README sentence state that ExcludeFromCodeCoverage is unavailable on netstandard2.0/.NET Framework. | If that is inaccurate, the agent narrowed the requirement ('all generated code') on a mistaken premise and documented it as fact. A human should confirm framework availability and decide whether the guard should stay. | `README.md` | AI reading |
| R2 | contracts | Generated source now adds an attribute to the user's own partial resolver classes, and the nesting-brace layout changes. | This is user-visible generated output. It can change the coverage of user-written members and can cause a CS0579 build break if the user already applied the attribute. Shipping that behavior to all consumers with no switch is a product decision. | `ResolverTemplate.tt` | AI reading |

## 3. The story
All six T4 source-generator templates (object formatter, string-key formatter, enum, union, resolver, composite resolver) now put `[global::System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverage]` on each generated type and on the nested `FormatterCache<T>` / `GetFormatterHelper` classes. Every attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. A one-line change in `TransformUtilities` puts a line break after `{` when a nesting type has constraints, so the `#if` starts on its own line. The change also updates 222 snapshot files, adds a README note, and adds a test class with two text-based tests.

**Why:** Issue 2297 asks for all MessagePack-generated code to carry ExcludeFromCodeCoverage so it does not skew coverage numbers. The issue says a setting is not needed, and none was added.

**Touches beyond the requirement:**
- TransformUtilities.EmitNestingTypesAndNamespaces now writes a newline after `{` for constrained nesting types. This changes the generated layout for generic nesting types and is needed so the preprocessor directive is valid.
- README gains a paragraph that documents the attribute and the netstandard2.0/.NET Framework exclusion.
- On the resolver and composite resolver, the attribute is placed on the user's own `partial class`, so it applies to the whole type, including members the user writes by hand.

**How sure (the author's own view; it moves nothing):** High confidence that the templates and snapshots emit the attribute on every generated type, and that the T4 sources match their compiled .cs. Low confidence that the `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard is justified. As far as I know, ExcludeFromCodeCoverageAttribute ships in netstandard2.0 and .NET Framework 4.0+, so the guard silently skips the feature for a common class of consumers: libraries targeting netstandard2.0 or net4x. The new tests check generated text only. They do not compile the output or check per-type placement.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C8 | unverified | No opt-in or opt-out setting was added. The attribute is always emitted, subject only to the target-framework guard. The issue says this is acceptable. | "I do not feel like a setting is needed, but setting would be fine to have too." | AI reading only | - | no |
| C2 | backed | The generated resolver and composite resolver classes get the attribute. So do their nested helper classes: FormatterCache<T> and <Resolver>GetFormatterHelper. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C1 | backed | Every generated formatter class gets the attribute: object formatters (FormatterTemplate), string-key formatters, enum formatters and union formatters. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C3 | backed | Each emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. Consumer projects compiled for netstandard2.0 or .NET Framework therefore get no coverage exclusion. Whether that limit is acceptable against 'all generated code' is doubtful. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C4 | backed | Each changed .tt template matches the edit in its precompiled .cs counterpart. The generator actually runs the .cs. | "MessagePack generated code is not decorated with ExcludeFromCodeCoverage attribute." | static check | - | no |
| C5 | backed | The TransformUtilities change adds `\r\n` after `{` for constrained nesting types. Without it, the new `#if` would follow `{` on the same line, which is not valid C#. It changes generated layout only for generic nesting types. | (scope) | static check | - | no |
| C6 | backed | The new tests run the real generator on a source with int-key, string-key, enum, union and resolver types. They check that each generated file contains the attribute text and that every occurrence is guarded. They do not compile the output, check diagnostics, check that each type (as opposed to each file) is decorated, or exercise the composite resolver. Snapshot files pin exact output for the broader cases. | "I would like all generated code to be decorated with ExcludeFromCodeCoverage attribute." | test run | - | yes |
| C7 | backed | No serialization logic, wire format, shipped public API or analyzer rule changed. Only attributes and preprocessor lines are added to generated source. | (scope) | static check | - | no |

**C8 (unverified, scope, author confidence high):** No opt-in or opt-out setting was added. The attribute is always emitted, subject only to the target-framework guard. The issue says this is acceptable.
- Lines: `ResolverTemplate.tt` L14-17
- Checked by: **AI reading only**

**C2 (backed, behavior, author confidence high):** The generated resolver and composite resolver classes get the attribute. So do their nested helper classes: FormatterCache<T> and <Resolver>GetFormatterHelper.
- Lines: `ResolverTemplate.tt` L14-17, `ResolverTemplate.tt` L31-34, `ResolverTemplate.tt` L48-51, `CompositeResolverTemplate.tt` L7-10, `CompositeResolverTemplate.tt` L35-38, `MessagePack.GeneratedMessagePackResolver.g.cs` L12-49
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S2 passed)

**C1 (backed, behavior, author confidence high):** Every generated formatter class gets the attribute: object formatters (FormatterTemplate), string-key formatters, enum formatters and union formatters.
- Lines: `FormatterTemplate.tt` L14-17, `StringKeyFormatterTemplate.tt` L18-21, `EnumTemplate.tt` L8-11, `UnionTemplate.tt` L10-13, `Formatters.MessagePack.GeneratedMessagePackResolver.TypeWithAutoGeneratedFormatterFormatter.g.cs` L12-15
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); static check S2 passed)

**C3 (backed, behavior, author confidence low):** Each emitted attribute is wrapped in `#if !NETSTANDARD2_0 && !NETFRAMEWORK`. Consumer projects compiled for netstandard2.0 or .NET Framework therefore get no coverage exclusion. Whether that limit is acceptable against 'all generated code' is doubtful.
- Lines: `FormatterTemplate.tt` L14-16, `CodeCoverageExclusionTests.cs` L18-19, `README.md` L1639-1640
- Checked by: **test run** (test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case))

**C4 (backed, generated, author confidence medium):** Each changed .tt template matches the edit in its precompiled .cs counterpart. The generator actually runs the .cs.
- Lines: `ResolverTemplate.cs` L38-38, `ResolverTemplate.cs` L55-57, `ResolverTemplate.cs` L67-67, `CompositeResolverTemplate.cs` L27-27, `CompositeResolverTemplate.cs` L56-58, `FormatterTemplate.cs` L33-33, `EnumTemplate.cs` L27-27, `UnionTemplate.cs` L30-30, `StringKeyFormatterTemplate.cs` L37-37
- Checked by: **static check** (static check S1 passed)

**C5 (backed, scope, author confidence medium):** The TransformUtilities change adds `\r\n` after `{` for constrained nesting types. Without it, the new `#if` would follow `{` on the same line, which is not valid C#. It changes generated layout only for generic nesting types.
- Lines: `TransformUtilities.cs` L58-58
- Checked by: **static check** (static check S2 passed)

**C6 (backed, test, author confidence medium):** The new tests run the real generator on a source with int-key, string-key, enum, union and resolver types. They check that each generated file contains the attribute text and that every occurrence is guarded. They do not compile the output, check diagnostics, check that each type (as opposed to each file) is decorated, or exercise the composite resolver. Snapshot files pin exact output for the broader cases.
- Lines: `CodeCoverageExclusionTests.cs` L64-97, `CodeCoverageExclusionTests.cs` L112-129
- Checked by: **test run** (test `AllGeneratedTypesAreExcludedFromCodeCoverage` passed (1 case); test `ExcludeAttributeIsGuardedForTargetsWhereItIsUnavailable` passed (1 case); static check S7 passed; static check S8 passed)

**C7 (backed, scope, author confidence high):** No serialization logic, wire format, shipped public API or analyzer rule changed. Only attributes and preprocessor lines are added to generated source.
- Lines: `FormatterTemplate.tt` L14-20
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)

**Requirement coverage:** 3 of 5 requirement sentences are quoted by a claim.
Not quoted by any claim (2; first 2):
- Because it is very hard to write good coverage for generated MessagePack code, it may skew coverage numbers, especially on large projects with a lot of generated code.
- There are no alternatives, it is close to impossible to write good coverage for generated code as it covers many edge cases.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `FormatterTemplate.tt` L14 | The `#if !NETSTANDARD2_0 && !NETFRAMEWORK` guard appears to rest on a false premise. To my knowledge, System.Diagnostics.CodeAnalysis.ExcludeFromCodeCoverageAttribute exists in netstandard2.0 and in .NET Framework 4.0+, the frameworks MessagePack v3 supports. The symbols are evaluated in the consumer's project. So any library targeting netstandard2.0, a very common case, gets no exclusion, and cov | author (Claude) |
| F2 | low | `README.md` L1640 | The README states that the attribute is not available on netstandard2.0 or .NET Framework. If that is wrong (see the previous concern), the docs spread the mistake and promise less than the issue asked for. | author (Claude) |
| F3 | low | `ResolverTemplate.tt` L15 | The attribute is added to `partial class <ResolverName>`, which the user declares themselves (`[GeneratedMessagePackResolver] partial class ...`). This excludes any hand-written members of that class from coverage. If the user already put [ExcludeFromCodeCoverage] on their declaration, the build fails with duplicate attribute error CS0579 (AllowMultiple = false). The same applies to the composite  | author (Claude) |
| F4 | low | `CodeCoverageExclusionTests.cs` L123 | RunGeneratorAsync discards the updated compilation and the diagnostics (`out _, out _`). The test never checks that the generated code with the new `#if` lines still compiles, for example after the TransformUtilities newline change. | author (Claude) |
| F5 | low | `CodeCoverageExclusionTests.cs` L76 | `text.Contains(ExcludeAttribute)` passes if a file has the attribute anywhere. It would not catch a resolver file where only one of the three classes is decorated. Per-type coverage relies on the snapshot files instead. | author (Claude) |

**Out of scope changes:**
- `src/MessagePack.SourceGenerator/Transforms/TransformUtilities.cs`: Adds a newline after `{` for constrained nesting types. It is needed so the `#if` directive sits on its own line, but it changes generated layout beyond adding the attribute.
- `README.md`: New documentation paragraph, including the claim about netstandard2.0/.NET Framework availability.

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

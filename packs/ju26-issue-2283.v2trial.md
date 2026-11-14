# Evidence pack: REQ-2283 on `ju26-issue-2283`

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 207 of 218 changed code lines (95%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 93%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- Evidence took 11 of 218 changed code lines off the list (C2, C5: tests found passing in the real run, claim upheld by the breaker). 207 stay with the owner.
- Why lines stay: 173 claim disputed; 15 refused; 7 no claim covers the line; 6 claim rests on AI reading only; 4 named by a finding; 2 passing test, but not upheld by the breaker.

**The owner must read** (3 files):
- `doc/analyzers/MsgPack004.md` L48-52 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L711, L985, L1077, L1429-1451 (28 of 29 changed lines): C3 passed its tests but the breaker did not uphold it; F3 author (Claude); claim C1 only AI-read; F8 breaker (Gemini); no claim covers these lines; R1 honesty (AI-suggested); F2 author (Claude); F7 breaker (Gemini); F6 breaker (Gemini) (unchanged line)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-649, L660-685 (179 of 189 changed lines): no claim covers these lines; claim C4 disputed; F1 breaker (Gemini)

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 11 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C2, C5

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `9df83c3840` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v2): 11,694 in / 6,347 out, 79 s, $0.17 |
| Breaker model | gemini-4-carbon: 8,634 in / 31,479 out, 313 s, $0.33 |
| Cost and time | $0.51 at list price, 392 s for this pack (tests reused from an earlier run of this commit: 28 s) |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s) |
| Pack id | `f9cec8e34cbb` |

## 1. Disputed claims (1)
**C4 (DISPUTED, test, author confidence medium):** The new tests reproduce the trigger conditions: a generic value type (plain struct and the issue's exact record struct) compiled into a separate assembly, consumed as a metadata-only reference via MetadataReference.CreateFromImage. The test harness fails on any diagnostic.
- Lines: `GenericsFormatterTests.cs` L499-648, `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **disputed**: Over-citation of GenericsFormatterTests.cs lines 582-626 (ClosedGenericStruct_FromMetadataReference_UnkeyedMember). C4's text describes only the plain struct and exact record struct trigger tests (lines 499-580), yet cites lines 499-648 and is the only claim citing lines 582-626 without mentioning that this third test puts an invalid unkeyed public property (public int Unkeyed at line 603) into the referenced assembly and asserts zero consumer diagnostics. Additionally, line 637's comment that VerifyCS.Test runs the analyzers depends on CSharpSourceGeneratorVerifier outside the diff.


## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Global suppression of analyzer diagnostics that lack an in-compilation source location. | It changes user-visible analyzer behavior for all diagnostics, not just metadata types. Dropping diagnostics for referenced types is a policy decision the requirement did not ask for; it only asked for no crash and a generated resolver. | `TypeCollector.cs` L1436-1450 | AI reading |
| R2 | honesty | Documentation committing to a new analyzer reporting policy. | The added docs promise behavior (diagnostics only in the defining project) beyond the requirement. Maintainers should confirm this is the intended product decision. | `MsgPack004.md` L48-52 | AI reading |

## 3. The story
Fixes the generator/analyzer crash on closed generic value types from referenced assemblies. Two diagnostic sites in TypeCollector stop indexing `DeclaringSyntaxReferences[0]` (lines 985 and 1077). The analyzer's diagnostic callback is now wrapped in a filter that silently drops any diagnostic whose location is not a source location inside the current compilation. Three tests compile a library to metadata and check that the consuming project builds with no diagnostics and gets a resolver. README and MsgPack004 docs describe the new 'reported by the defining assembly' policy.

**Why:** The issue reports IndexOutOfRangeException (CS8785/AD0001) because metadata symbols have no syntax references. As a result, no resolver was generated and trimmed/AOT apps broke at runtime.

**Touches beyond the requirement:**
- A blanket filter on every analyzer diagnostic, not only the ones for metadata types. It drops any diagnostic with Location.None or an out-of-compilation location (line 239, lines 1444-1450).
- A new documented policy, in README.md and doc/analyzers/MsgPack004.md, that diagnostics for referenced types are not reported to the consumer.

**How sure (the author's own view; it moves nothing):** High that the two edited sites no longer throw for metadata properties. Medium that all crash sites are covered: the issue names three indexed sites, and the diff changes only two, so a third (issue line 735) may still exist outside the visible hunks. Medium that the tests run the analyzer as well as the generator; this depends on the repo's CSharpSourceGeneratorVerifier configuration, which is not shown. The diagnostic-suppression filter is a policy choice broader than the crash fix.

## 4. Claims (6)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | DISPUTED | The new tests reproduce the trigger conditions: a generic value type (plain struct and the issue's exact record struct) compiled into a separate assembly, consumed as a metadata-only reference via MetadataReference.CreateFromImage. The test harness fails on any diagnostic. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | disputed | no |
| C1 | unverified | The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus a safe cast, so it returns null instead of throwing for a property with no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | upheld | no |
| C2 | backed | The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`. An unkeyed public member of a metadata type therefore produces a location-less diagnostic instead of an IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C3 | backed | When an analyzer report callback is supplied, every diagnostic goes through ReportIfLocatedInCompilation. A diagnostic is forwarded only if its location is in source and its tree belongs to the current compilation; all others, including Location.None, are dropped. A null callback (generator path) stays null. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell | no |
| C5 | backed | The test helper separately runs the generator driver on the consuming compilation. It asserts there are no warning-or-higher diagnostics (this would catch CS8785-style generator exceptions) and that the expected resolver hint name is among the generated sources. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | upheld | yes |
| C6 | backed | Scope: the change adds no public API, no new analyzer rule descriptors and no reader/writer changes. The docs added in README and MsgPack004.md only describe the policy that consumers do not see diagnostics for referenced types. | (scope) | static check | upheld | no |

**C1 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic now gets its location through GetPropertyIdentifierLocation. That helper uses FirstOrDefault plus a safe cast, so it returns null instead of throwing for a property with no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1429-1434. BothStringAndIntKeyAreNull now resolves its location via GetPropertyIdentifierLocation(item), which uses property.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax() as PropertyDeclarationSyntax and returns null (producing Location.None in Diagnostic.Create) instead of indexing DeclaringSyntaxReferences[0] when the property has no source declaration.

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic uses `DeclaringSyntaxReferences.FirstOrDefault()?`. An unkeyed public member of a metadata type therefore produces a location-less diagnostic instead of an IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and GenericsFormatterTests.cs lines 590-626. MemberNeedsKey now uses item.DeclaringSyntaxReferences.FirstOrDefault()?.GetSyntax().GetLocation(), yielding null (Location.None) instead of throwing IndexOutOfRangeException on DeclaringSyntaxReferences[0] for metadata members, which ClosedGenericStruct_FromMetadataReference_UnkeyedMember exercises.

**C3 (backed, behavior, author confidence medium):** When an analyzer report callback is supplied, every diagnostic goes through ReportIfLocatedInCompilation. A diagnostic is forwarded only if its location is in source and its tree belongs to the current compilation; all others, including Location.None, are dropped. A null callback (generator path) stays null.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: Lines 239 and 1444-1450 of TypeCollector.cs wrap a non-null reportAnalyzerDiagnostic in ReportIfLocatedInCompilation and keep null as null, dropping Location.None and locations outside this.compilation. However, the diff alone cannot verify (1) that no other constructor or call site bypasses the private constructor at line 236, (2) that the generator path passes null for reportAnalyzerDiagnostic, or (3) that ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually executes ReportIfLocatedInCompilation, because VerifyCS is CSharpSourceGeneratorVerifier<MessagePackGenerator> (GenericsFormatterTests.cs line 7) whose definition is not in the diff (standard CSharpSourceGeneratorTest runs no DiagnosticAnalyzers unless GetDiagnosticAnalyzers is overridden, and line 653 only runs MessagePackGenerator).

**C5 (backed, test, author confidence medium):** The test helper separately runs the generator driver on the consuming compilation. It asserts there are no warning-or-higher diagnostics (this would catch CS8785-style generator exceptions) and that the expected resolver hint name is among the generated sources.
- Lines: `GenericsFormatterTests.cs` L650-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 650-659 and all three test methods calling RunWithMetadataReferenceAsync. The helper runs CSharpGeneratorDriver directly on usageCompilation, asserts no warning-or-higher diagnostics (which catches CS8785 on generator exceptions), and asserts expectedResolverHintName is present in GeneratedSources.

**C6 (backed, scope, author confidence medium):** Scope: the change adds no public API, no new analyzer rule descriptors and no reader/writer changes. The docs added in README and MsgPack004.md only describe the policy that consumers do not see diagnostics for referenced types.
- Lines: `README.md` L1639-1642, `MsgPack004.md` L48-52
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)
- Breaker: **upheld**: Checked all four changed files. No public APIs, analyzer descriptors, or serialization reader/writer calls were added or modified, and README.md lines 1639-1642 plus doc/analyzers/MsgPack004.md lines 48-52 only document using closed generic types from referenced assemblies and the policy that member diagnostics are reported by the defining project.

**Requirement coverage:** 4 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (22; first 8):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:

## 5. Findings (8)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `GenericsFormatterTests.cs` L582 | Claim C4 disputed: Over-citation of GenericsFormatterTests.cs lines 582-626 (ClosedGenericStruct_FromMetadataReference_UnkeyedMember). C4's text describes only the plain struct and exact record struct trigger tests (lines 499-580), yet cites lines 499-648 and is the only claim citing lines 582-626 without mentioning that this third test puts an invalid unkeyed public property (public int Unkeyed a | breaker (Gemini) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in the compilation's source, not just those for metadata types. Any existing diagnostic for a source-declared type that ends up with Location.None will now be silently suppressed. Examples: a GetIdentifierLocation/GetLocation helper returning null, or a diagnostic intentionally created without a location. That is a regression in analyzer cove | author (Claude) |
| F3 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (its lines 735, 1009, 1101). The diff changes only two (new lines 985 and 1077). If a third direct index remains elsewhere in GetObjectInfo, it can still crash for metadata types on a code path the new tests do not reach (e.g., fields or constructors). | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L638 | The claim that this run exercises the analyzer (AD0001) depends on CSharpSourceGeneratorVerifier<MessagePackGenerator> registering MsgPack00xMessagePackAnalyzer, which is not visible in the diff. If it does not, the AD0001 half of the bug is untested. | author (Claude) |
| F5 | low | `GenericsFormatterTests.cs` L603 | The unkeyed-member test asserts only that no diagnostic appears. It does not check what the consumer-side generated formatter does with the unkeyed member of the metadata struct, so silently suppressing MsgPack004 could hide incorrect generated code. | author (Claude) |
| F6 | high | `TypeCollector.cs` L711 | REQ-2283 identified three DeclaringSyntaxReferences[0] sites inside GetObjectInfo (lines 735, 1009, 1101 in v3.1.8). Accounting for the 24-line offset in current TypeCollector.cs (1009 -> 985, 1101 -> 1077), this change fixed only two of them and left the site around line 711 untouched. If a referenced generic value type lacks [MessagePackObject], or is closed in the consuming assembly with an una | breaker (Gemini) |
| F7 | medium | `TypeCollector.cs` L1446 | When a valid generic [MessagePackObject] struct in a referenced assembly has a member of type T (such as [Key(0)] public T Content { get; set; }) and the consuming assembly closes T with an unformattable type (MyGenericStruct<NotFormattable>), the defining assembly cannot report any diagnostic on open T, while in the consuming assembly GetObjectInfo walks the metadata member symbol and ReportIfLoc | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | Adjacent to the fixed line 1077, line 1076 still evaluates derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() unconditionally before checking member accessibility or whether reportDiagnostic is null. Because nullable annotations are enabled and GetLocation() is invoked without null-conditional access, GetSyntax returns a non-nullable SyntaxNode; if derivedKeyAttribute is an Attrib | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New section documenting that diagnostics for generic types from referenced assemblies are reported by the defining assembly.
- `doc/analyzers/MsgPack004.md`: New section stating that MsgPack004 only reports on members declared in the current project.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Blanket wrapping of all analyzer diagnostics in a location-in-compilation filter (lines 239, 1436-1450). This goes beyond the crash fix.

## 6. Static checks
| # | Check | Result | Detail |
|---|---|---|---|
| S1 | T4 templates and their compiled .cs change together | n/a | no templates changed |
| S2 | Generated snapshot files change uniformly | n/a | no generated files changed |
| S3 | No new public API in shipped assemblies | pass | no public declarations added in shipped assemblies |
| S4 | No new user-visible analyzer rules | pass | no rule descriptors or release notes changed |
| S5 | Serialized output (wire format) untouched | pass | no reader/writer calls changed in runtime code or formatter templates |
| S6 | No changes to untrusted-input handling | pass | no unsafe code or runtime reader code added (source generator code runs at build time on the developer's own code) |
| S7 | Existing tests not weakened | pass | no assertions or test cases removed |
| S8 | New tests contain an assertion | pass | 3 new test(s), each with an assertion or verifier call |

## 7. Tests
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (28s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

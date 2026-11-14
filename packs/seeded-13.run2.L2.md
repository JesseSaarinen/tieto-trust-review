# Evidence pack: REQ-2283 on `seeded-13`

> Rebuilt offline from pack `8bc345ddf6e3` (seeded-13.run2.json), layers: full. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 112 of 218 changed code lines (51%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 51%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 106 of 218 changed code lines off the list (C3, C5, C6, C9: tests found passing in the real run, claim upheld by the breaker). 112 stay with the owner.
- Why lines stay: 93 passing test, but not upheld by the breaker; 7 no claim covers the line; 6 refused; 2 claim rests on AI reading only; 2 named by a finding; 2 cited only by claims without a passing test.

**The owner must read** (3 files):
- `README.md` L1639-1643 (5 of 5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L239, L985, L1077, L1429-1451 (28 of 29 changed lines): C1 passed its tests but the breaker did not uphold it; claim C4 only AI-read; F4 breaker (Gemini); R1 honesty (AI-suggested); F1 author (Claude); no claim covers these lines; C2 passed its tests but the breaker did not uphold it; F2 author (Claude); F5 breaker (Gemini)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L542, L581-660, L685 (84 of 189 changed lines): C10 has no passing test behind it; no claim covers these lines; C7 passed its tests but the breaker did not uphold it; C8 passed its tests but the breaker did not uphold it

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 106 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run and upheld by the breaker: C3, C5, C6, C9

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `002862f9fb` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | gemini-4-carbon: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (53s) |
| Pack id | `114f75c38e92` |

## 1. Disputed claims (0)
None. The breaker tried and could not disprove any claim.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | The doc comment on GetPropertyIdentifierLocation claims null is returned for metadata properties, but the code still indexes [0]. | Misleading documentation suggests a crash path was fixed when it was not. | `TypeCollector.cs` L1429-1434 | AI reading |
| R2 | honesty | User-facing documentation was added to README and MsgPack004.md that the requirement does not ask for. | These are changes beyond the requirement that document new analyzer semantics. | `README.md` L1639-1643 | AI reading |

## 3. The story
Stops the generator and analyzer from crashing when a [MessagePackObject] type has a member whose type is a closed generic struct from a referenced assembly. It makes two changes in TypeCollector. First, the MemberNeedsKey diagnostic is now built with `DeclaringSyntaxReferences.FirstOrDefault()` instead of `[0]`. Second, every diagnostic the analyzer reports now goes through a new filter that drops any diagnostic whose location is not in the current compilation. Another call site was moved into a new helper, `GetPropertyIdentifierLocation`, but that helper still indexes `[0]`. Three tests compile a library to a metadata-only image and check two things: no diagnostics, and that a resolver is generated. README and the MsgPack004 doc gained notes about types from referenced assemblies.

**Why:** Metadata symbols have an empty DeclaringSyntaxReferences. Indexing `[0]` while building a diagnostic throws, and the generator then silently produces no resolver. The MemberNeedsKey path at line 1076-1077 builds its diagnostic before the accessibility check, so it runs even for a type's private fields (likely compiler-generated backing fields). That makes it the most likely culprit.

**Touches beyond the requirement:**
- A global diagnostic filter (line 239, 1444-1450) suppresses every analyzer diagnostic without an in-compilation source location. This includes diagnostics on source types that were created with a null location. That is a behavior change beyond fixing the crash.
- README.md and doc/analyzers/MsgPack004.md gained new user-facing documentation.
- The line 985 call site moved into a helper whose doc comment says it returns null for metadata. It does not: it still indexes [0].

**How sure (the author's own view; it moves nothing):** Medium. The FirstOrDefault change at 1077 plus the filter plausibly fixes the repro, and the tests mirror the issue's repro. I cannot see line ~735 that the issue names, so I cannot confirm every [0] path is covered. The line 985 path is still crashable. The wide filter may hide diagnostics that were previously reported for source types.

## 4. Claims (13)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | The BothStringAndIntKeyAreNull call site now calls the new GetPropertyIdentifierLocation helper. The helper is behaviorally identical to the old inline code: it still casts and indexes DeclaringSyntaxReferences[0], so this path is NOT made safe for metadata symbols, despite what its doc comment says. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | upheld | no |
| C10 | unverified | The added usings (Microsoft.CodeAnalysis, Microsoft.CodeAnalysis.Testing) support the MetadataReference, Compilation and ReferenceAssemblies/TestBehaviors types used by the new test helpers. | (scope) | AI reading only | upheld | no |
| C11 | unverified | README gains a section stating that closed generics from referenced assemblies are supported and that member diagnostics for them are reported by the defining assembly. | (scope) | AI reading only | upheld | no |
| C12 | unverified | The MsgPack004 doc gains a section stating the analyzer reports only on members declared in the compiled project. | (scope) | AI reading only | upheld | no |
| C1 | backed | When the analyzer supplies a report callback, TypeCollector wraps it so every diagnostic passes through ReportIfLocatedInCompilation. When no callback is supplied (generator path), reportDiagnostic stays null. | "so `GetObjectInfo` runs against a type that has no syntax." | test run | cannot_tell | no |
| C2 | backed | ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its SourceTree belongs to the current compilation. Otherwise the diagnostic is silently dropped, including diagnostics created with a null location (Location.None). | "so `GetObjectInfo` runs against a type that has no syntax." | test run | cannot_tell | no |
| C3 | backed | The MemberNeedsKey diagnostic location now uses DeclaringSyntaxReferences.FirstOrDefault()?, so building it for a metadata member (empty references) yields a null location instead of throwing IndexOutOfRangeException. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | upheld | yes |
| C5 | backed | Test ClosedGenericStruct_FromMetadataReference covers a plain generic struct MyGenericStruct<T> with a keyed T member. The struct is compiled into a separate metadata-only assembly and used as MyGenericStruct<int> from a [MessagePackObject] class, with an explicit resolver. | "`struct Item<T>` \| **crash** \|" | test run | upheld | yes |
| C6 | backed | Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact Lib/App repro: a record struct Item<T> in a referenced assembly, used as Item<int> from record Cmd. It runs with LanguageVersion.Latest. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | upheld | yes |
| C7 | backed | Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember checks that a referenced generic struct with a public unkeyed member produces no diagnostic in the consuming project. This exercises the C2 filter dropping MemberNeedsKey for metadata members. | "Expected behavior  A clean build, with a generated resolver in `app`." | test run | cannot_tell | no |
| C8 | backed | RunWithMetadataReferenceAsync checks the requirement in two ways. First, it runs the source-generator verifier (with analyzers) and expects no diagnostics, so AD0001/CS8785 would fail it. Second, it runs the generator driver directly and asserts that no warnings are reported and that the expected resolver hint name was generated. The second check guards against the 'no generated resolver' symptom. | "A clean build, with a generated resolver in `app`." | test run | cannot_tell | no |
| C9 | backed | CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image and wrap it with MetadataReference.CreateFromImage. The referenced type therefore has no syntax in the consuming compilation. Emit failure throws. | "Moving the identical `Item<T>` declaration into `app` itself makes the crash disappear, wh…" | test run | upheld | yes |
| C13 | backed | Scope: the only shipped source change is in TypeCollector.cs, all in private members. No public API, rule descriptors or runtime serialization code changed. | (scope) | static check | upheld | no |

**C4 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull call site now calls the new GetPropertyIdentifierLocation helper. The helper is behaviorally identical to the old inline code: it still casts and indexes DeclaringSyntaxReferences[0], so this path is NOT made safe for metadata symbols, despite what its doc comment says.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked TypeCollector.cs lines 985 and 1429-1434. Line 985 delegates to GetPropertyIdentifierLocation(item), whose implementation on line 1434 still casts to PropertyDeclarationSyntax and indexes property.DeclaringSyntaxReferences[0] directly, contradicting its XML doc comment on lines 1432-1433 that claims null is returned for metadata properties.

**C10 (unverified, test, author confidence high):** The added usings (Microsoft.CodeAnalysis, Microsoft.CodeAnalysis.Testing) support the MetadataReference, Compilation and ReferenceAssemblies/TestBehaviors types used by the new test helpers.
- Lines: `GenericsFormatterTests.cs` L4-6
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 4-6 and 638-684. The added Microsoft.CodeAnalysis and Microsoft.CodeAnalysis.Testing usings provide MetadataReference, Compilation, ReferenceAssemblies, and TestBehaviors used by the new test helpers.

**C11 (unverified, docs, author confidence high):** README gains a section stating that closed generics from referenced assemblies are supported and that member diagnostics for them are reported by the defining assembly.
- Lines: `README.md` L1639-1643
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643. The new Generic types from referenced assemblies subsection states both that closed generic types (including generic value types and record structs) from referenced assemblies are supported and that diagnostics on their members are reported by the defining assembly.

**C12 (unverified, docs, author confidence high):** The MsgPack004 doc gains a section stating the analyzer reports only on members declared in the compiled project.
- Lines: `MsgPack004.md` L48-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked doc/analyzers/MsgPack004.md lines 48-52. The new Types from referenced assemblies section states that the analyzer only reports on members declared in the project being compiled and that members from referenced assemblies are reported by their defining project.

**C1 (backed, behavior, author confidence high):** When the analyzer supplies a report callback, TypeCollector wraps it so every diagnostic passes through ReportIfLocatedInCompilation. When no callback is supplied (generator path), reportDiagnostic stays null.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs line 239 wraps a non-null reportAnalyzerDiagnostic in ReportIfLocatedInCompilation and keeps null as null, but the callers of the private TypeCollector constructor are not in the diff to verify the generator/analyzer arguments, and CSharpSourceGeneratorVerifier is not shown in the diff to verify that ClosedGenericStruct_FromMetadataReference_UnkeyedMember executes the non-null analyzer callback path.

**C2 (backed, behavior, author confidence high):** ReportIfLocatedInCompilation forwards a diagnostic only if its location is in source and its SourceTree belongs to the current compilation. Otherwise the diagnostic is silently dropped, including diagnostics created with a null location (Location.None).
- Lines: `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs lines 1444-1450 implement the exact check described (dropping diagnostics when IsInSource is false, including Location.None, or when SourceTree is outside this.compilation), but whether the named test ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually invokes ReportIfLocatedInCompilation depends on CSharpSourceGeneratorVerifier registering MsgPack00xMessagePackAnalyzer, which is not shown in the diff.

**C3 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location now uses DeclaringSyntaxReferences.FirstOrDefault()?, so building it for a metadata member (empty references) yields a null location instead of throwing IndexOutOfRangeException.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs line 1077 and all three tests in GenericsFormatterTests.cs (lines 507, 551, 590, and 653). Line 1077 replaces DeclaringSyntaxReferences[0] with DeclaringSyntaxReferences.FirstOrDefault()?, yielding a null location for metadata members, and CSharpGeneratorDriver exercises this path on metadata struct members (including backing fields and unkeyed properties) in all three tests.

**C5 (backed, test, author confidence high):** Test ClosedGenericStruct_FromMetadataReference covers a plain generic struct MyGenericStruct<T> with a keyed T member. The struct is compiled into a separate metadata-only assembly and used as MyGenericStruct<int> from a [MessagePackObject] class, with an explicit resolver.
- Lines: `GenericsFormatterTests.cs` L499-541
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 499-541. ClosedGenericStruct_FromMetadataReference compiles MyGenericStruct<T> with a [Key(0)] T Content property into a metadata assembly and uses MyGenericStruct<int> inside [MessagePackObject] MyObject alongside [GeneratedMessagePackResolver] partial class MyResolver.

**C6 (backed, test, author confidence high):** Test ClosedGenericRecordStruct_FromMetadataReference reproduces the issue's exact Lib/App repro: a record struct Item<T> in a referenced assembly, used as Item<int> from record Cmd. It runs with LanguageVersion.Latest.
- Lines: `GenericsFormatterTests.cs` L543-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 543-580. ClosedGenericRecordStruct_FromMetadataReference defines partial record struct Item<T> in namespace Lib and sealed partial record Cmd using Item<int> in namespace App (with an explicit AppResolver), passing LanguageVersion.Latest on line 579.

**C7 (backed, test, author confidence medium):** Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember checks that a referenced generic struct with a public unkeyed member produces no diagnostic in the consuming project. This exercises the C2 filter dropping MemberNeedsKey for metadata members.
- Lines: `GenericsFormatterTests.cs` L582-626
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 582-626 define MyGenericStruct<T> with a public unkeyed property Unkeyed in a metadata reference and assert a clean run, but whether this exercises the C2 ReportIfLocatedInCompilation filter (rather than only running MessagePackGenerator with a null diagnostic callback) depends on CSharpSourceGeneratorVerifier configuring MsgPack00xMessagePackAnalyzer, which is not shown in the diff.

**C8 (backed, test, author confidence medium):** RunWithMetadataReferenceAsync checks the requirement in two ways. First, it runs the source-generator verifier (with analyzers) and expects no diagnostics, so AD0001/CS8785 would fail it. Second, it runs the generator driver directly and asserts that no warnings are reported and that the expected resolver hint name was generated. The second check guards against the 'no generated resolver' symptom.
- Lines: `GenericsFormatterTests.cs` L628-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)
- Breaker: **cannot_tell**: GenericsFormatterTests.cs lines 651-658 directly verify the second check via CSharpGeneratorDriver (asserting no diagnostics of Warning or higher severity and checking expectedResolverHintName), but whether VerifyCS.Test on lines 638-648 runs analyzers so that AD0001 would fail depends on CSharpSourceGeneratorVerifier, which is not shown in the diff.

**C9 (backed, test, author confidence high):** CompileToMetadataReferenceAsync and CreateCompilation emit the defining source to an in-memory image and wrap it with MetadataReference.CreateFromImage. The referenced type therefore has no syntax in the consuming compilation. Emit failure throws.
- Lines: `GenericsFormatterTests.cs` L661-684
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 661-684. CompileToMetadataReferenceAsync and CreateCompilation compile the source to a MemoryStream DLL, throw InvalidOperationException when emitResult.Success is false, and return MetadataReference.CreateFromImage(stream.ToArray()) so the referenced symbols have no syntax in the consuming compilation.

**C13 (backed, scope, author confidence high):** Scope: the only shipped source change is in TypeCollector.cs, all in private members. No public API, rule descriptors or runtime serialization code changed.
- Lines: `TypeCollector.cs` L239-239
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed; static check S6 passed)
- Breaker: **upheld**: Checked the changed file list, static checks S3-S5, and all hunks in TypeCollector.cs (lines 239, 985, 1077, 1434, 1444). TypeCollector.cs is the only shipped source file modified, all modified/added members are private, and no public APIs, analyzer descriptors, or serialization code changed.

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 8 of its 26 sentences.
Requirement sentences no claim quotes (18; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (5)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation is documented as returning null for metadata properties, but it still does `DeclaringSyntaxReferences[0]` and a hard cast. The BothStringAndIntKeyAreNull path (line 985) will still throw IndexOutOfRangeException for a metadata member whose key value is null. It can also throw InvalidCastException for positional record parameters. One of the three crash sites the issue | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose Location is not in source, including diagnostics for types declared in the current compilation that were created with a null location. For example, helpers like GetParameterListLocation/GetIdentifierLocation can return null. Previously reported analyzer diagnostics may now be silently suppressed. No test covers that this does not happen. | author (Claude) |
| F3 | low | `TypeCollector.cs` L1077 | The issue names a third `[0]` site (around original line 735) that is not in this diff. I cannot see whether it is still reachable for metadata symbols, for example on other member shapes or for classes. The tests cover only two struct shapes. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L1076 | In the ternary constructing diagnostic on lines 1075-1077, only the MemberNeedsKey branch (line 1077) was made safe for metadata symbols. If a closed generic value type from a referenced assembly has a member with an attribute derived from KeyAttribute (derivedKeyAttribute is not null and suppressSourceGeneration is not true), derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() is  | breaker (Gemini) |
| F5 | medium | `TypeCollector.cs` L1446 | ReportIfLocatedInCompilation requires diagnostic.Location.IsInSource, which silently drops all diagnostics with Location.None. Legitimate diagnostics for the current compilation that yield a null location—for example when GetParameterListLocation(IMethodSymbol? method) at line 1454 is given null or an implicitly declared constructor with empty DeclaringSyntaxReferences, or when the current compila | breaker (Gemini) |

**Out of scope changes:**
- `README.md`: New documentation section about referenced-assembly generics and where their diagnostics are reported. The requirement does not ask for it.
- `doc/analyzers/MsgPack004.md`: New documentation about the analyzer reporting only on members of the compiled project. It documents the new filtering behavior.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: A global diagnostic filter (ReportIfLocatedInCompilation) applied to all analyzer diagnostics, which is broader than replacing the [0] indexing.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (53s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

# Evidence pack: REQ-2283 on `seeded-17`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `e90a5257d0` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (48s) |
| Pack id | `2f3d50b91448` |

## Routing: **FOCUSED READ**
- 3 refusal(s) on honesty/contracts grounds need a human look.
- 1 claim(s) disputed by the breaker or by the evidence check.
- 1 high-severity finding(s).

**The owner must read** (6):
- `Directory.Build.props`: R1 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R2 contracts (AI-suggested)
- `README.md`: R3 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1434-1434: claim C1 disputed
- `Directory.Build.props` L10: F2 author (Claude)

**Not required to read:**
- 1 docs: prose; covered by the story
- 1 other source/test files not flagged: covered by passing evidence or not flagged by any check

## 1. Disputed claims (1)
**C1 (DISPUTED, behavior, author confidence high):** The MsgPack BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no PropertyDeclarationSyntax.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))
- Breaker: **disputed**: Wait...


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | EnforceCodeStyleInBuild flipped from true to false | This is a repo-wide build policy change unrelated to the requirement. It weakens build checks and may mask style failures from this change. | `Directory.Build.props` | AI reading |
| R2 | contracts | Global suppression of analyzer diagnostics whose location is outside the compilation | It changes which analyzer diagnostics users see, possibly for source types as well, and the README and MsgPack004 docs commit to this as documented behavior. It is not a new rule, but it is a user-visible analyzer behavior change. | `TypeCollector.cs` | AI reading |
| R3 | honesty | User-facing docs added describing new diagnostic semantics | The docs go beyond the bug fix and promise behavior (diagnostics reported in the defining assembly) that the maintainers have not decided on. | `README.md` | AI reading |

## 3. The story
Stops the generator and analyzer from crashing when a `[MessagePackObject]` member is a closed generic struct from a referenced assembly. It does three things. Two `DeclaringSyntaxReferences[0]` lookups now tolerate a symbol that has no syntax. A new `PropertyDeclarationSyntax` lookup uses a safe `as` cast. Every diagnostic the TypeCollector reports now goes through a wrapper, which drops any diagnostic whose location is not a source tree in the current compilation. Three new tests compile a defining assembly to a metadata image and run the generator against a consumer of it. The change also turns off `EnforceCodeStyleInBuild` for the whole repo and adds README and MsgPack004 docs.

**Why:** Issue #2283: diagnostic code in `GetObjectInfo` indexes `DeclaringSyntaxReferences[0]`. That collection is empty for metadata symbols, so the run throws `IndexOutOfRangeException`. As a result the generator emits no resolver at all.

**Touches beyond the requirement:**
- Directory.Build.props switches EnforceCodeStyleInBuild from true to false for the whole repository.
- A global diagnostic filter (ReportIfLocatedInCompilation) silently drops any TypeCollector diagnostic whose location is Location.None or another tree. This applies to source types too, not only metadata types.
- README.md and doc/analyzers/MsgPack004.md gain new user-facing statements about how diagnostics behave for referenced types.

**How sure:** Medium that the reported repro no longer crashes; the tests reproduce it closely. Lower confidence that all crash sites are fixed. The issue names three indexing sites, the diff changes two, and the third (reported around line 735) does not appear in the diff. Low confidence that the global diagnostic filter does not hide legitimate diagnostics that previously had no location.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C1 | DISPUTED | The MsgPack BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no PropertyDeclarationSyntax. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | disputed |
| C7 | unverified | Scope: the build-config change (EnforceCodeStyleInBuild=false) and the two doc additions are not needed to fix the crash. | (scope) | AI reading only | - |
| C2 | backed | The MemberNeedsKey diagnostic uses DeclaringSyntaxReferences.FirstOrDefault(), so it yields a null location instead of throwing for metadata members. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | - |
| C3 | backed | All TypeCollector diagnostics are now passed through ReportIfLocatedInCompilation. Any diagnostic whose location is not in a syntax tree of the current compilation is silently dropped, including Location.None. | (scope) | test run | - |
| C4 | backed | The tests build the defining project into a metadata-only image (not a project reference with syntax) and reference it from the consumer. This matches the 'referenced assembly' trigger in the issue. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - |
| C5 | backed | The tests check the expected outcome: no warning-or-higher diagnostics, and the generator run produces the resolver hint name. The content of the generated source is not checked (SkipGeneratedSourcesCheck). | "A clean build, with a generated resolver in `app`." | test run | - |
| C6 | backed | The record struct test reproduces the issue's exact Lib/App code: a positional record struct Item<T> and a record Cmd with an Item<int> member. | "public partial record struct Item<T>([property: Key(0)] string Key);" | test run | - |
| C8 | backed | No public API, analyzer rule descriptors, or wire format are changed. | (scope) | static check | - |

**C7 (unverified, scope, author confidence high):** Scope: the build-config change (EnforceCodeStyleInBuild=false) and the two doc additions are not needed to fix the crash.
- Lines: `Directory.Build.props` L10-10, `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **AI reading only**

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic uses DeclaringSyntaxReferences.FirstOrDefault(), so it yields a null location instead of throwing for metadata members.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence high):** All TypeCollector diagnostics are now passed through ReportIfLocatedInCompilation. Any diagnostic whose location is not in a syntax tree of the current compilation is silently dropped, including Location.None.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C4 (backed, test, author confidence high):** The tests build the defining project into a metadata-only image (not a project reference with syntax) and reference it from the consumer. This matches the 'referenced assembly' trigger in the issue.
- Lines: `GenericsFormatterTests.cs` L661-674, `GenericsFormatterTests.cs` L647-647
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C5 (backed, test, author confidence medium):** The tests check the expected outcome: no warning-or-higher diagnostics, and the generator run produces the resolver hint name. The content of the generated source is not checked (SkipGeneratedSourcesCheck).
- Lines: `GenericsFormatterTests.cs` L638-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C6 (backed, test, author confidence high):** The record struct test reproduces the issue's exact Lib/App code: a positional record struct Item<T> and a record Cmd with an Item<int> member.
- Lines: `GenericsFormatterTests.cs` L551-580
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C8 (backed, scope, author confidence high):** No public API, analyzer rule descriptors, or wire format are changed.
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)


## 5. Findings (6)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C1 disputed: Wait... | breaker (Gemini) |
| F2 | high | `Directory.Build.props` L10 | EnforceCodeStyleInBuild is disabled repo-wide. This turns off IDE code-style enforcement in every project's build, which is unrelated to the bug. It may also be hiding style violations introduced by this change. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L239 | The filter applies to every diagnostic, not just metadata symbols. Any existing diagnostic on a source type that relies on a null or Location.None location is now silently suppressed instead of reported. For example, helpers like GetParameterListLocation/GetIdentifierLocation can return null. That is a user-visible loss of analyzer warnings. | author (Claude) |
| F4 | low | `TypeCollector.cs` L1434 | The `as PropertyDeclarationSyntax` cast returns null for source positional record properties, whose syntax is a ParameterSyntax. BothStringAndIntKeyAreNull is then dropped by the filter even for types in the current compilation, rather than being reported at the parameter. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L985 | The issue lists three direct `DeclaringSyntaxReferences[0]` sites (reported around lines 735, 1009 and 1101). The diff changes only two. The third site, near the reported line 735, is not visible in the diff and may still crash for other metadata-type shapes that the tests do not cover. | author (Claude) |
| F6 | low | `GenericsFormatterTests.cs` L641 | SkipGeneratedSourcesCheck means the tests never check that the generated resolver or formatter for Item<int> is correct. They only check that a file with the resolver hint name exists. | author (Claude) |

**Out of scope changes:**
- `Directory.Build.props`: Disables EnforceCodeStyleInBuild for the whole repository.
- `README.md`: New section documenting behavior for generic types from referenced assemblies, including a statement about where diagnostics are reported.
- `doc/analyzers/MsgPack004.md`: New section stating that MsgPack004 only reports members declared in the current project.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (48s)

## 8. What was NOT checked
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

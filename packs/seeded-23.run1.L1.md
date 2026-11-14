# Evidence pack: REQ-2283 on `seeded-23`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `3e9deffec9e9` (seeded-23.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FOCUSED READ**
**Reading load: 146 of 218 changed code lines (67%).** Docs: 10 lines, read with the story (5 flagged). Of everything changed: 66%.

- 2 refusal(s) on contracts/honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- Evidence took 72 of 218 changed code lines off the list (C4: tests found passing in the real run; breaker removed for this measurement). 146 stay with the owner.
- Why lines stay: 117 no claim covers the line; 29 refused.

**The owner must read** (3 files):
- `README.md` whole file diff (5 changed lines): R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F1 author (Claude) (L985); F2 author (Claude) (L1446); claim C1 only AI-read (L985); claim C1 only AI-read (L1434); R1 contracts (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L4, L6, L499-550, L581-632, L675-685 (117 of 189 changed lines): no claim covers these lines

**Not required to read:**
- 1 doc file(s): prose; covered by the story
- 72 changed code line(s) released by evidence: each is cited by a claim with tests found passing in the real run (breaker removed for this measurement): C4

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `71dd291f81` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s) |
| Pack id | `520c492012ca` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | contracts | Analyzer diagnostics (e.g. MsgPack004 MemberNeedsKey) are no longer reported for referenced-assembly types or for any location-less diagnostic. | This changes user-visible analyzer behavior and documents a new policy. A maintainer should decide whether suppression, rather than reporting at the consumer's member location, is the intended contract. | `TypeCollector.cs` | AI reading |
| R2 | honesty | The fix includes a global diagnostic filter plus README/MsgPack004 documentation, beyond the null-safe indexing the requirement points to. | These are changes beyond the requirement whose side effects on source-type diagnostics are untested. | `README.md` | AI reading |

## 3. The story
Stops the generator and analyzer from crashing when a [MessagePackObject] member's type is a closed generic struct from a referenced assembly. Two places that read `DeclaringSyntaxReferences[0]` now tolerate a missing source declaration (lines 985, 1077). The analyzer's report callback is also wrapped (line 239) so that any diagnostic without a source location inside the current compilation is silently dropped. Three new tests compile a library to a metadata-only image and check that the consumer builds with no diagnostics and gets a resolver. README and MsgPack004 docs are extended.

**Why:** REQ-2283: the IndexOutOfRangeException made the generator contribute nothing, so the consuming assembly shipped with no generated resolver and failed under trimming/NativeAOT.

**Touches beyond the requirement:**
- The filter at line 239/1444-1450 applies to every diagnostic the TypeCollector reports, not just ones about metadata symbols. Any diagnostic with Location.None or a null location is now dropped, including ones about source types.
- New README section and MsgPack004.md section describe a policy for user-visible diagnostics: they are 'reported by the assembly that defines it'.
- Test ClosedGenericStruct_FromMetadataReference_UnkeyedMember enshrines that a missing-key member on a referenced type produces no diagnostic in the consumer.

**How sure (the author's own view; it moves nothing):** High that the reported repro (record struct Item<T> from metadata) no longer crashes: test 2 mirrors the issue exactly and also checks that the resolver hint name is produced. Medium that all crash sites are covered. The issue names three `[0]` indexing sites and the diff visibly changes two. Low-to-medium on the side effects of the blanket diagnostic filter, which no test exercises for source types.

## 4. Claims (6)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C1 | unverified | The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | AI reading only | - | no |
| C4 | backed | The tests reproduce the issue using a real metadata-only reference, not a same-compilation project reference. Test 2 matches the issue's Item<T>/Cmd repro verbatim. Each test fails on any analyzer or generator diagnostic and asserts that the expected resolver hint name is generated. | "A clean build, with a generated resolver in `app`." | test run | - | yes |
| C2 | backed | The MemberNeedsKey diagnostic, which is built eagerly even when reportDiagnostic is null (so it also crashed the generator), now uses FirstOrDefault() and produces a null location instead of throwing. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | - | yes |
| C3 | backed | Diagnostics whose location is not a source location within the current compilation are dropped before reaching the analyzer's report callback. | "so `GetObjectInfo` runs against a type that has no syntax" | test run | - | yes |
| C5 | backed | The content of the generated formatter for the referenced generic struct is not verified. SkipGeneratedSourcesCheck is set, and only the hint name is checked. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C6 | backed | Scope: no public API or analyzer rule descriptors are added. However, the observable set of diagnostics changes: located-outside-compilation and location-less diagnostics are suppressed, and docs are added describing this. | (scope) | static check | - | no |

**C1 (unverified, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **AI reading only**

**C4 (backed, test, author confidence high):** The tests reproduce the issue using a real metadata-only reference, not a same-compilation project reference. Test 2 matches the issue's Item<T>/Cmd repro verbatim. Each test fails on any analyzer or generator diagnostic and asserts that the expected resolver hint name is generated.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed; static check S7 passed)

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic, which is built eagerly even when reportDiagnostic is null (so it also crashed the generator), now uses FirstOrDefault() and produces a null location instead of throwing.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence high):** Diagnostics whose location is not a source location within the current compilation are dropped before reaching the analyzer's report callback.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C5 (backed, test, author confidence high):** The content of the generated formatter for the referenced generic struct is not verified. SkipGeneratedSourcesCheck is set, and only the hint name is checked.
- Lines: `GenericsFormatterTests.cs` L641-641, `GenericsFormatterTests.cs` L657-658
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C6 (backed, scope, author confidence medium):** Scope: no public API or analyzer rule descriptors are added. However, the observable set of diagnostics changes: located-outside-compilation and location-less diagnostics are suppressed, and docs are added describing this.
- Lines: `TypeCollector.cs` L1436-1450, `README.md` L1639-1642, `MsgPack004.md` L49-52
- Checked by: **static check** (static check S3 passed; static check S4 passed)

**Requirement coverage:** 4 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (22; first 8):
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:
- \| `Item` declared as \| result \|

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | The issue lists three `DeclaringSyntaxReferences[0]` sites (reported at lines 735, 1009, 1101). The diff visibly changes only two (around 985 and 1077). If a third site remains near the earlier location, it can still throw in the analyzer, where reportDiagnostic is non-null. This would happen for metadata types that hit that path, which the three new tests may not exercise. Worth grepping for rema | author (Claude) |
| F2 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose Location is not in source, including Location.None. Any existing diagnostic about a source type that is created with a null location gets silently swallowed instead of reported. Examples are GetIdentifierLocation/GetParameterListLocation returning null, or AOTDerivedKeyAttribute from an attribute in another tree. This is a broader behavior change than the cr | author (Claude) |
| F3 | low | `README.md` L1642 | The docs claim member diagnostics for referenced types 'are reported by the assembly that defines it'. That only holds if the defining assembly was built with the MessagePack analyzer. For a third-party NuGet package built without it, problems such as an unkeyed public member are now reported nowhere, and the consumer silently generates a formatter for that type. | author (Claude) |
| F4 | low | `GenericsFormatterTests.cs` L590 | The UnkeyedMember test asserts that a missing-key member on a referenced type produces no diagnostic and still generates a resolver. It does not check what the generated formatter does with the unkeyed member. This locks in the suppression policy without showing the serialized result is sensible. | author (Claude) |

**Out of scope changes:**
- `README.md`: New user-facing section on generic types from referenced assemblies and diagnostic ownership. Not required to fix the crash.
- `doc/analyzers/MsgPack004.md`: New section stating that the analyzer only reports on members declared in the current project.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Blanket ReportIfLocatedInCompilation wrapper applied to all reported diagnostics. It goes beyond making the two indexing sites null-safe.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (38s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

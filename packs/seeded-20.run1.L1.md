# Evidence pack: REQ-2283 on `seeded-20`

> **MEASUREMENT PACK, not a live routing.** Breaker removed on purpose to measure the layers: lines are released on passing tests alone. A live run without the breaker releases nothing.

> Rebuilt offline from pack `56e1b0bc6c52` (seeded-20.run1.json), layers: author. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 218 of 218 changed code lines (100%).** Docs: 10 lines, read with the story. Of everything changed: 96%.

- 2 refusal(s) on honesty grounds need a human look.
- 1 behaviour claim(s) rest on AI reading only (no passing test).
- 1 high-severity finding(s).
- No changed code line is cited by a claim that has both a passing test and the breaker's uphold, so none is released: the owner reads all 218.
- Why lines stay: 218 refused.

**The owner must read** (2 files):
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): F3 author (Claude) (L1446); F4 author (Claude) (L985); claim C4 only AI-read (L985); claim C4 only AI-read (L1077); R2 honesty (AI-suggested)
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` whole file diff (189 changed lines): F1 author (Claude) (L658); F2 author (Claude) (L656); R1 honesty (AI-suggested)

**Not required to read:**
- 2 doc file(s): prose; covered by the story

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `24b4baece4` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v1): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (46s) |
| Pack id | `75fc7524fe2e` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (2)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | honesty | Test helper claims to verify that the expected resolver is generated but asserts only `NotNull` on a list that can never be null, and ignores `expectedResolverHintName`. | The test checks nothing for the key symptom (missing resolver) while its documentation says it does. | `GenericsFormatterTests.cs` | AI reading |
| R2 | honesty | Global diagnostic suppression for any non-source location, plus documentation that declares this as intended analyzer behaviour. | This goes beyond the crash fix and changes which diagnostics users see, including possibly some for their own source types. The owner should decide whether that policy is wanted. | `TypeCollector.cs` | AI reading |

## 3. The story
Stops the source generator and analyzer from crashing when a [MessagePackObject] type has a member whose type is a closed generic struct from a referenced assembly. Two diagnostic paths in TypeCollector used to index `DeclaringSyntaxReferences[0]`; they now use `FirstOrDefault()`. Separately, every diagnostic TypeCollector reports now goes through a new filter that drops any diagnostic without a source location in the current compilation. The change adds three tests that compile a defining assembly to metadata and reference it, plus README and MsgPack004 doc text explaining that such types' member diagnostics belong to the defining project.

**Why:** For metadata symbols `DeclaringSyntaxReferences` is empty, so indexing `[0]` threw `IndexOutOfRangeException`. That crashed the analyzer (AD0001) and made the generator emit nothing (CS8785), which silently removed the resolver.

**Touches beyond the requirement:**
- A global diagnostic filter (`ReportIfLocatedInCompilation`) now wraps every diagnostic TypeCollector reports, not only the crashing paths. It also drops diagnostics with `Location.None` for types declared in source.
- New README section and new MsgPack004 doc section describing user-visible diagnostic behaviour for types from referenced assemblies.
- Test helper that builds its own compilation and generator driver outside the verifier.

**How sure (the author's own view; it moves nothing):** High that the two edited `[0]` sites can no longer throw. Medium that no other unguarded `[0]` remains: the issue names three sites and only two edits are visible. Medium-to-low on side effects of the global filter. Low that the tests prove the resolver is generated: that assertion is vacuous and the expected hint name is never used.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|
| C4 | unverified | Every `DeclaringSyntaxReferences[0]` site reachable from GetObjectInfo for a metadata type is fixed. The issue lists three sites (735, 1009, 1101), but only two edits appear in the diff. | "I did not narrow down which of the three fires." | AI reading only | - | no |
| C8 | unverified | The README and MsgPack004 docs now state that diagnostics for members of types from referenced assemblies are reported only by the defining project. | (scope) | AI reading only | - | no |
| C1 | backed | The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no source declaration. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | test run | - | yes |
| C6 | backed | The tests verify that a resolver is actually generated in the consuming assembly. In practice `Assert.NotNull(hintNames)` is always true and `expectedResolverHintName` is never used, so this part checks nothing. | "`app.dll` contains no `GeneratedMessagePackResolver`." | test run | - | yes |
| C2 | backed | The MemberNeedsKey diagnostic location uses `DeclaringSyntaxReferences.FirstOrDefault()`, so an unkeyed public member of a metadata type does not throw. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly" | test run | - | yes |
| C3 | backed | All diagnostics reported through TypeCollector are now dropped unless their location is in a syntax tree of the current compilation. This suppresses member diagnostics of metadata types in the consuming project. | "Expected behavior: A clean build, with a generated resolver in `app`." | test run | - | yes |
| C5 | backed | The tests reproduce the issue's scenario. A generic struct and a generic record struct (the latter a near copy of the issue repro, with a resolver class added) are compiled to a metadata-only image and referenced. The verifier then runs analyzers and the generator, expecting no diagnostics. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | - | yes |
| C7 | backed | No public API, analyzer rule descriptors, or serialized output are changed. The helpers added are private. | (scope) | static check | - | no |

**C4 (unverified, behavior, author confidence low):** Every `DeclaringSyntaxReferences[0]` site reachable from GetObjectInfo for a metadata type is fixed. The issue lists three sites (735, 1009, 1101), but only two edits appear in the diff.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1077-1077
- Checked by: **AI reading only**

**C8 (unverified, docs, author confidence high):** The README and MsgPack004 docs now state that diagnostics for members of types from referenced assemblies are reported only by the defining project.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L49-52
- Checked by: **AI reading only**

**C1 (backed, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a helper that returns null when the property has no source declaration.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1434-1434
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case))

**C6 (backed, test, author confidence low):** The tests verify that a resolver is actually generated in the consuming assembly. In practice `Assert.NotNull(hintNames)` is always true and `expectedResolverHintName` is never used, so this part checks nothing.
- Lines: `GenericsFormatterTests.cs` L650-659
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic location uses `DeclaringSyntaxReferences.FirstOrDefault()`, so an unkeyed public member of a metadata type does not throw.
- Lines: `TypeCollector.cs` L1077-1077
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C3 (backed, behavior, author confidence medium):** All diagnostics reported through TypeCollector are now dropped unless their location is in a syntax tree of the current compilation. This suppresses member diagnostics of metadata types in the consuming project.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1444-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))

**C5 (backed, test, author confidence medium):** The tests reproduce the issue's scenario. A generic struct and a generic record struct (the latter a near copy of the issue repro, with a resolver class added) are compiled to a metadata-only image and referenced. The verifier then runs analyzers and the generator, expecting no diagnostics.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L633-648, `GenericsFormatterTests.cs` L661-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S8 passed)

**C7 (backed, scope, author confidence high):** No public API, analyzer rule descriptors, or serialized output are changed. The helpers added are private.
- Lines: `TypeCollector.cs` L1434-1450
- Checked by: **static check** (static check S3 passed; static check S4 passed; static check S5 passed)

**Requirement coverage:** 5 of 26 requirement sentences are quoted by a claim.
Not quoted by any claim (21; first 8):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.
- Runtime: .NET 10 (SDK 10.0.204), Windows 11
- **What triggers it.** `Item` is declared in `lib`, `Cmd` in `app`:

## 5. Findings (4)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | high | `GenericsFormatterTests.cs` L658 | `Assert.NotNull(hintNames)` can never fail because `ToList()` never returns null. The `expectedResolverHintName` parameter is never asserted on. The doc comment at lines 629-631 claims resolver generation is verified, so the test overstates its coverage of the 'no resolver' symptom. | author (Claude) |
| F2 | medium | `GenericsFormatterTests.cs` L656 | Only diagnostics of Error severity are rejected. CS8785 (generator failure) is a warning, so this second check would not catch the original defect. Detection relies entirely on the VerifyCS run at line 648. | author (Claude) |
| F3 | medium | `TypeCollector.cs` L1446 | The filter drops every diagnostic whose location is not in source. That includes diagnostics for types declared in the current compilation that are created with a null or `Location.None` location (for example when a FirstOrDefault-based helper returns null). Such diagnostics were previously reported and are now silently suppressed, which is a broad behaviour change beyond the crash fix. | author (Claude) |
| F4 | medium | `TypeCollector.cs` L985 | The issue names three `DeclaringSyntaxReferences[0]` sites (735, 1009, 1101 in 3.1.8), but only two are edited. Nothing in the diff shows a site near line 735 being addressed, so another crash path may remain for other metadata-type shapes. | author (Claude) |

**Out of scope changes:**
- `README.md`: New user-facing section on generic types from referenced assemblies; not required to fix the crash.
- `doc/analyzers/MsgPack004.md`: New documentation stating that the analyzer's reporting scope excludes referenced-assembly members.
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: Global wrapping of reportDiagnostic (line 239) affects all diagnostics, beyond the two crashing sites.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (46s)

## 8. What was NOT checked
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

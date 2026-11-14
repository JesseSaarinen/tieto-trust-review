# Evidence pack: REQ-2283 on `seeded-04`

> AI review is advice with evidence, never the approval. A named owner signs below.

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `2153dbf87b` (base `32258fdbee`) |
| Files | 5 changed, 5 real (0 generated) |
| Author model | claude-opus-5-5 |
| Breaker model | gemini-4-carbon |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s) |
| Pack id | `503928a07a5b` |

## Routing: **FOCUSED READ**
- 3 refusal(s) on safety/honesty/contracts grounds need a human look.
- 3 claim(s) disputed by the breaker or by the evidence check.
- 2 high-severity finding(s).

**The owner must read** (8):
- `src/MessagePack/MessagePackSecurity.cs`: R1 safety (AI-suggested); R2 honesty (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs`: R3 contracts (AI-suggested)
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L985-985: claim C1 disputed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` L1429-1434: claim C1 disputed
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L551-580: claim C5 disputed
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L507-541: claim C5 disputed
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` L637-648: claim C6 disputed
- `src/MessagePack/MessagePackSecurity.cs` L134: F4 author (Claude); F7 breaker (Gemini)

**Not required to read:**
- 2 docs: prose; covered by the story

## 1. Disputed claims (3)
**C1 (DISPUTED, behavior, author confidence high):** The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a FirstOrDefault-based helper that returns null for metadata properties.
- Lines: `TypeCollector.cs` L985-985, `TypeCollector.cs` L1429-1434
- Checked by: **AI reading only**
- Breaker: **disputed**: The requirement quote cites three DeclaringSyntaxReferences[0] crash sites inside GetObjectInfo (old lines 735, 1009, 1101), and the 24-line offset in the diff (1009 -> 985, 1101 -> 1077) shows only two of those three sites were updated in TypeCollector.cs, leaving the first site (~line 711) untouched. In addition, line 985 only updates the IPropertySymbol path via GetPropertyIdentifierLocation (not any field path), and no test exercises BothStringAndIntKeyAreNull on a metadata symbol.

**C5 (DISPUTED, test, author confidence high):** One test reproduces the issue's exact lib/app record struct sources, covering the record-struct row of the trigger table. Another covers the plain struct row.
- Lines: `GenericsFormatterTests.cs` L551-580, `GenericsFormatterTests.cs` L507-541
- Checked by: **test run** (test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference` passed (2 cases))
- Breaker: **disputed**: ClosedGenericRecordStruct_FromMetadataReference does not use the issue's exact app source or project build: GenericsFormatterTests.cs lines 575-576 append an explicit [GeneratedMessagePackResolver] partial class AppResolver { } instead of testing the issue's implicit assembly-level GeneratedMessagePackResolver generation, and CompileToMetadataReferenceAsync (lines 661-674) compiles lib without running MessagePackGenerator on it.

**C6 (DISPUTED, test, author confidence low):** Whether the analyzer half (AD0001) is exercised depends on VerifyCS.Test including MsgPack00xMessagePackAnalyzer. This is not visible in the diff; the second check in the helper runs only the generator.
- Lines: `GenericsFormatterTests.cs` L637-648
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **disputed**: The claim's substance is right, but its citation (GenericsFormatterTests.cs lines 637-648) only covers the first VerifyCS.Test check and omits lines 651-658 where the second generator-only CSharpGeneratorDriver check actually appears.


## 2. Refused to decide (3)
| # | Rule | What | Why a human decides | Where | Found by |
|---|---|---|---|---|---|
| R1 | safety | MessagePackSecurity.GetEqualityComparer<T> returns EqualityComparer<string>.Default for string even when HashCollisionResistant is true. | This changes how untrusted deserialized data is hashed and may reintroduce hash-flooding DoS on some runtimes. Static check S6 reported pass but did not catch it. | `MessagePackSecurity.cs` | AI reading |
| R2 | honesty | Unrelated runtime security change bundled into a source-generator crash fix. | Goes beyond the requirement and is not mentioned or tested anywhere in the change. | `MessagePackSecurity.cs` | AI reading |
| R3 | contracts | The analyzer now silently drops all diagnostics lacking an in-compilation source location, and the docs declare this as policy. | This changes user-visible analyzer behavior (which diagnostics appear) beyond fixing the crash. | `TypeCollector.cs` | AI reading |

## 3. The story
The fix makes the type collector avoid indexing `DeclaringSyntaxReferences[0]` in two diagnostic paths: BothStringAndIntKeyAreNull and MemberNeedsKey. It also wraps the analyzer's report callback so it silently drops any diagnostic whose location is not a source tree in the current compilation. Three new tests compile a library to a metadata-only image. They then check two things: the analyzer/generator run produces no diagnostics, and the expected resolver hint name is generated. The change also edits README, MsgPack004 docs and, unrelatedly, the runtime `MessagePackSecurity.GetEqualityComparer<T>`.

**Why:** Members of a generic value type from metadata have no syntax, so `DeclaringSyntaxReferences[0]` throws. That made the generator and analyzer fail and the resolver silently disappear (REQ-2283).

**Touches beyond the requirement:**
- src/MessagePack/MessagePackSecurity.cs: string keys now bypass the hash-collision-resistant comparer even when HashCollisionResistant is on (runtime, untrusted-data path)
- Report wrapper drops every analyzer diagnostic without an in-compilation source location, including Location.None diagnostics for the project's own types
- README.md and doc/analyzers/MsgPack004.md document a new 'reported by the defining assembly' policy

**How sure:** Medium. The two changed indexing sites are clearly safe now. The tests use the issue's own repro shape and check that the resolver is generated. I cannot see whether the third site named in the issue (old line ~735) was reached or fixed. I also cannot confirm the VerifyCS harness runs MsgPack00xMessagePackAnalyzer. The MessagePackSecurity edit is unrelated and weakens a security default; the static check S6 did not flag it.

## 4. Claims (8)
| # | Status | Claim | Requirement | Checked by | Breaker |
|---|---|---|---|---|---|
| C1 | DISPUTED | The BothStringAndIntKeyAreNull diagnostic no longer indexes DeclaringSyntaxReferences[0]. It uses a FirstOrDefault-based helper that returns null for metadata properties. | "Several diagnostic paths inside it index `DeclaringSyntaxReferences[0]` directly (lines 73…" | AI reading only | disputed |
| C5 | DISPUTED | One test reproduces the issue's exact lib/app record struct sources, covering the record-struct row of the trigger table. Another covers the plain struct row. | "So it needs all three of: **generic**, **value type**, **from a referenced assembly**." | test run | disputed |
| C6 | DISPUTED | Whether the analyzer half (AD0001) is exercised depends on VerifyCS.Test including MsgPack00xMessagePackAnalyzer. This is not visible in the diff; the second check in the helper runs only the generator. | "`MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException`" | test run | disputed |
| C7 | unverified | Scope: MessagePackSecurity.GetEqualityComparer<T> now returns EqualityComparer<string>.Default for string even when HashCollisionResistant is set. This runtime change is unrelated to the generator crash. | (scope) | AI reading only | upheld |
| C8 | unverified | Scope: the README and MsgPack004 docs add user-facing statements that diagnostics for metadata types are reported only by the defining project. | (scope) | AI reading only | upheld |
| C2 | backed | The MemberNeedsKey diagnostic is built eagerly, even when no reporter exists, which is likely the generator crash site. It now uses FirstOrDefault() so a metadata member yields a null location instead of throwing. | "Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `I…" | test run | upheld |
| C3 | backed | Analyzer diagnostics whose location is not in a source tree of the current compilation are dropped instead of reported. This prevents the analyzer from reporting against metadata or nonexistent locations. | "that collection is empty for a metadata symbol" | test run | cannot_tell |
| C4 | backed | The tests build the defining code as a metadata-only image (MetadataReference.CreateFromImage). They then check that the generator run has no warning-or-higher diagnostics and that the expected resolver hint name is produced. This directly targets the 'no generated resolver' symptom. | "A clean build, with a generated resolver in `app`." | test run | upheld |

**C7 (unverified, scope, author confidence high):** Scope: MessagePackSecurity.GetEqualityComparer<T> now returns EqualityComparer<string>.Default for string even when HashCollisionResistant is set. This runtime change is unrelated to the generator crash.
- Lines: `MessagePackSecurity.cs` L132-141
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked src/MessagePack/MessagePackSecurity.cs lines 132-141: GetEqualityComparer<T>() short-circuits for typeof(T) == typeof(string) and returns EqualityComparer<T>.Default before consulting this.HashCollisionResistant, which is a runtime library change unrelated to REQ-2283 with no accompanying tests in the diff.

**C8 (unverified, docs, author confidence high):** Scope: the README and MsgPack004 docs add user-facing statements that diagnostics for metadata types are reported only by the defining project.
- Lines: `README.md` L1639-1643, `MsgPack004.md` L49-52
- Checked by: **AI reading only**
- Breaker: **upheld**: Checked README.md lines 1639-1643 and doc/analyzers/MsgPack004.md lines 49-52; both add user-facing documentation stating that member diagnostics for types from referenced assemblies are reported by the defining assembly/project rather than the consuming project.

**C2 (backed, behavior, author confidence high):** The MemberNeedsKey diagnostic is built eagerly, even when no reporter exists, which is likely the generator crash site. It now uses FirstOrDefault() so a metadata member yields a null location instead of throwing.
- Lines: `TypeCollector.cs` L1075-1081
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **upheld**: Checked TypeCollector.cs lines 1075-1081: the Diagnostic local is constructed eagerly before checking this.reportDiagnostic (null in the generator) and before checking member accessibility (so private backing fields also reach it), and line 1077 now uses FirstOrDefault()?.GetSyntax().GetLocation() so metadata symbols pass null (Location.None) to Diagnostic.Create instead of throwing IndexOutOfRangeException. ClosedGenericStruct_FromMetadataReference_UnkeyedMember (GenericsFormatterTests.cs lines 590-626) exercises an unkeyed public property on a metadata generic struct.

**C3 (backed, behavior, author confidence medium):** Analyzer diagnostics whose location is not in a source tree of the current compilation are dropped instead of reported. This prevents the analyzer from reporting against metadata or nonexistent locations.
- Lines: `TypeCollector.cs` L239-239, `TypeCollector.cs` L1436-1450
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case))
- Breaker: **cannot_tell**: TypeCollector.cs lines 239 and 1444-1450 filter diagnostics invoked through this.reportDiagnostic when reportAnalyzerDiagnostic is non-null, but whether all analyzer diagnostics in TypeCollector flow exclusively through this.reportDiagnostic and whether ClosedGenericStruct_FromMetadataReference_UnkeyedMember actually invokes TypeCollector with a non-null reportAnalyzerDiagnostic depend on unseen code in TypeCollector.cs and CSharpSourceGeneratorVerifier<MessagePackGenerator>.

**C4 (backed, test, author confidence medium):** The tests build the defining code as a metadata-only image (MetadataReference.CreateFromImage). They then check that the generator run has no warning-or-higher diagnostics and that the expected resolver hint name is produced. This directly targets the 'no generated resolver' symptom.
- Lines: `GenericsFormatterTests.cs` L633-674
- Checked by: **test run** (test `ClosedGenericStruct_FromMetadataReference` passed (2 cases); test `ClosedGenericRecordStruct_FromMetadataReference` passed (1 case); test `ClosedGenericStruct_FromMetadataReference_UnkeyedMember` passed (1 case); static check S7 passed; static check S8 passed)
- Breaker: **upheld**: Checked GenericsFormatterTests.cs lines 633-674 and all three test methods (lines 540, 579, 625): CompileToMetadataReferenceAsync emits defineSource to a PE stream and wraps it with MetadataReference.CreateFromImage (line 673), and RunWithMetadataReferenceAsync runs CSharpGeneratorDriver, asserts no warning-or-higher generator diagnostics (line 656), and asserts expectedResolverHintName is present in GeneratedSources (line 658).


## 5. Findings (10)
| # | Severity | Where | What | Source |
|---|---|---|---|---|
| F1 | medium | `TypeCollector.cs` L985 | Claim C1 disputed: The requirement quote cites three DeclaringSyntaxReferences[0] crash sites inside GetObjectInfo (old lines 735, 1009, 1101), and the 24-line offset in the diff (1009 -> 985, 1101 -> 1077) shows only two of those three sites were updated in TypeCollector.cs, leaving the first site (~line 711) untouched. In addition, line 985 only updates the IPropertySymbol path via GetPropertyId | breaker (Gemini) |
| F2 | medium | `GenericsFormatterTests.cs` L575 | Claim C5 disputed: ClosedGenericRecordStruct_FromMetadataReference does not use the issue's exact app source or project build: GenericsFormatterTests.cs lines 575-576 append an explicit [GeneratedMessagePackResolver] partial class AppResolver { } instead of testing the issue's implicit assembly-level GeneratedMessagePackResolver generation, and CompileToMetadataReferenceAsync (lines 661-674) compi | breaker (Gemini) |
| F3 | medium | `GenericsFormatterTests.cs` L638 | Claim C6 disputed: The claim's substance is right, but its citation (GenericsFormatterTests.cs lines 637-648) only covers the first VerifyCS.Test check and omits lines 651-658 where the second generator-only CSharpGeneratorDriver check actually appears. | breaker (Gemini) |
| F4 | high | `MessagePackSecurity.cs` L134 | Under UntrustedData / HashCollisionResistant, string keys now use the default comparer. The comment claims string hashing is randomized per process, but that is not true on .NET Framework (netstandard2.0 consumers) unless explicitly configured. This silently removes hash-flooding protection for string-keyed dictionaries deserialized from untrusted input. Unrelated to REQ-2283. | author (Claude) |
| F5 | medium | `TypeCollector.cs` L1446 | The wrapper drops every diagnostic whose Location is not in source, including Location.None. Any existing diagnostic for the project's own types that falls back to a null location (for example when a GetIdentifierLocation/GetLocation helper returns null) is now silently suppressed rather than reported. This is a broad change to analyzer output, not limited to metadata types. | author (Claude) |
| F6 | low | `TypeCollector.cs` L985 | The issue names three direct `DeclaringSyntaxReferences[0]` sites (old lines 735, 1009, 1101). The diff changes only two hunks (old ~984 and ~1076). The visible diff does not show whether the third site was already safe, was this one, or remains unfixed. | author (Claude) |
| F7 | high | `MessagePackSecurity.cs` L134 | GetEqualityComparer<T>() unconditionally returns EqualityComparer<T>.Default for string without a #if NET / #if NETCOREAPP guard, assuming string.GetHashCode() is always randomized per process. On .NET Framework (used via netstandard2.0/net472 builds), string.GetHashCode() is deterministic by default unless UseRandomizedStringHashAlgorithm is enabled in app.config, so this silently disables Messag | breaker (Gemini) |
| F8 | medium | `TypeCollector.cs` L1076 | In the same eager diagnostic ternary modified on line 1077, the derivedKeyAttribute branch still calls derivedKeyAttribute.GetSyntax(this.cancellationToken).GetLocation() without null propagation. If a closed generic value type in a referenced assembly has a member annotated with an attribute derived from KeyAttribute, GetSyntax returns null for metadata and throws NullReferenceException in both t | breaker (Gemini) |
| F9 | medium | `TypeCollector.cs` L1434 | GetPropertyIdentifierLocation casts the syntax node using 'as PropertyDeclarationSyntax'. For positional record or record-struct properties declared in source in the current compilation (e.g. '[property: Key(null)] string Key'), DeclaringSyntaxReferences[0].GetSyntax() is a ParameterSyntax, so GetPropertyIdentifierLocation returns null (Location.None) and ReportIfLocatedInCompilation (line 1446) s | breaker (Gemini) |
| F10 | low | `MsgPack004.md` L52 | Both MsgPack004.md (line 52) and README.md (line 1642) tell users that member problems on types from referenced assemblies are reported by the defining project, which does not hold when the defining assembly only references MessagePack.Annotations without MessagePack.SourceGenerator; in that common contract-assembly setup neither compilation reports MsgPack004 and unkeyed members are silently skip | breaker (Gemini) |

**Out of scope changes:**
- `src/MessagePack/MessagePackSecurity.cs`: Runtime change bypassing the collision-resistant comparer for string; not needed for the generator/analyzer crash.
- `README.md`: New section documenting cross-assembly generic support and the diagnostic-routing policy.
- `doc/analyzers/MsgPack004.md`: New section stating MsgPack004 only reports on members declared in the current project.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (40s)

## 8. What was NOT checked
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

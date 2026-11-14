# Evidence pack: REQ-2283 on `seeded-02`

> **REVIEW INCOMPLETE: 2 part(s) of the reviewer missing or failed.** A missing part can only add reading, never remove it.
> - **author**: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
> - **breaker**: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.

> Rebuilt offline from pack `c4969ea8947a` (seeded-02.run3.json), layers: det. No model was called.

> AI review is advice with evidence, never the approval. A named owner signs below.

## Routing: **FULL READ**
**Reading load: 218 of 218 changed code lines (100%).** Docs: 10 lines, read with the story (10 flagged). Of everything changed: 100%.

- Fail closed: author removed for measurement (deterministic layer only). There is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Fail closed: breaker not run, because there were no claims to break. No claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- Why lines stay: 218 reviewer part missing or failed.

**The owner must read** (4 files):
- `README.md` whole file diff (5 changed lines): author missing or failed
- `doc/analyzers/MsgPack004.md` whole file diff (5 changed lines): author missing or failed
- `src/MessagePack.SourceGenerator/CodeAnalysis/TypeCollector.cs` whole file diff (29 changed lines): author missing or failed
- `tests/MessagePack.SourceGenerator.Tests/GenericsFormatterTests.cs` whole file diff (189 changed lines): author missing or failed

| | |
|---|---|
| Requirement | REQ-2283: Generator and analyzer crash with IndexOutOfRangeException on a closed generic struct from a referenced assembly |
| Commit | `6c8cf41516` (base `32258fdbee`) |
| Files | 4 changed, 4 real (0 generated) |
| Author model | claude-opus-5-5 (prompt v3): no call |
| Breaker model | none: no call |
| Cost and time | regraded offline, no model call |
| Tests | ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s) |
| Pack id | `f904c513cb3f` |

## 1. Disputed claims (0)
None, but no breaker challenged the claims in this pack.

## 2. Refused to decide (0)
Nothing hit the contracts, safety or honesty rules.

## 3. The story
No story: the author model did not produce one. Nothing below is backed by a model; read the change itself.

**How sure (the author's own view; it moves nothing):** none

## 4. Claims (0)
| # | Status | Claim | Requirement | Checked by | Breaker | Takes lines off the list |
|---|---|---|---|---|---|---|

**Requirement trace, both ways:** every quote was checked against the requirement text and found there. The claims quote 0 of its 26 sentences.
Requirement sentences no claim quotes (26; an issue body is mostly context, so skim this for anything the change should have done; first 6 shown, all in the JSON):
- Both `MessagePackGenerator` (CS8785) and `MsgPack00xMessagePackAnalyzer` (AD0001) throw `IndexOutOfRangeException` when a `[MessagePackObject]` type has a member whose type is a **…
- Because the generator then "will not contribute to the output", the compiling assembly silently ends up with **no generated resolver at all**.
- It is only a warning, so a normal build looks fine, but trimmed and NativeAOT apps fail at runtime.
- In our case three assemblies of a large app had been shipping without a resolver across two releases before we noticed.
- `app`, with a `ProjectReference` to `lib`:
- Both projects are in the attached `mp-repro.zip`.

## 5. Findings (0)
None.

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
ran 170 tests in MessagePack.SourceGenerator.Tests.csproj on SDK 8.0.428: 170 passed, 0 failed, 0 skipped (34s)

## 8. What was NOT checked
- Reviewer part missing or failed: author: removed for measurement (deterministic layer only). Effect: there is no story and no claim, so no evidence can release a line: full read of every non-generated file.
- Reviewer part missing or failed: breaker: not run, because there were no claims to break. Effect: no claim was challenged by a second vendor, so no line is released: the owner reads every changed code line.
- A passing test backs a claim only as far as the test goes: the tool checks that the named test ran and passed, not which lines it executed.
- Behaviour on other target frameworks / Unity / NativeAOT was not exercised.
- Performance and allocation impact were not measured.

## 9. Owner sign-off
Sign with: `npm run signoff -- --pack <this pack's .json> --owner "<name>" --decision accept|request-changes|reject --risk "<residual risk you accept>" --ack R1,R2 --read <files you read>`
Accepting requires acknowledging every refusal by id. The record is saved under `records/` and updates the trust ledger.

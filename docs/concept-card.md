# Earned Trust in AI Code: concept card

> **The AI's confidence never moves a change. Only evidence the tool verified does.**
> The AI can add to what the owner must read. It can never take a line off the list.

**Recommendation.** Every changed line starts on a named owner's reading list. The change tells its own story as claims tied to the requirement. A line leaves the list only when a claim that cites it is backed by a test the tool itself found passing, and a second AI from another vendor failed to break that claim. The AI refuses to decide anything that touches a contract, untrusted input, or its own honesty. If any part of the reviewer is missing or fails, the change routes up, never down. The owner reads what is left and signs what was checked, what wasn't, and the risk they accept. Trust is tracked per code area and withdrawn after a missed bug, and the reviewer itself is audited with planted bugs.

**AI reviews, humans stay accountable. The AI's output is advice with evidence, never the approval.**

## The flow (one PR)

1. **Story.** Claude writes what the change does and why, as narrow claims: one behaviour or one test per claim. Each claim quotes the requirement, cites the lines, and names the tests that exercise it.
2. **Evidence.** The tool, not the model, decides how each claim was checked: **test run** (every named test exists in the real run and passed), **static check** (a deterministic rule passed), **AI reading only**, or **not checked**. A citation to lines that don't exist, or a requirement quote that isn't in the requirement, disputes the claim automatically.
3. **Breaker.** Gemini gets the same diff and the claims, with one job: disprove them. That includes claims that cite more lines than they explain, and tests that don't test the claim. Disputed claims go to the top of the pack.
4. **Refuses to decide** (by deterministic rule first, AI suggestion second):
   - **Contracts:** new public API in a shipped package, serialized output (wire format), new user-visible analyzer rules.
   - **Safety:** code that reads untrusted input, unsafe code.
   - **Honesty:** tests weakened or asserting nothing, generated files not matching templates, changes beyond the requirement.
5. **The reading list.** A code line comes off only with both a passing test and the breaker's uphold. Generated files come off only through a static check. A dispute, a refusal or a finding puts lines back. Lines no claim cites stay on the list. The level is a label on that list: **light check** (nothing left to read but the story), **focused read** (the listed lines), **full read** (whole files).
6. **Owner signs** in the PR. The tool won't save an "accept" until every refusal is acknowledged by id and a residual risk is written. The record is kept.
7. **Trust ledger.** Per code area: reviews, sign-offs, findings accepted, false alarms, escapes. One escape puts the area on full read until it has 5 clean sign-offs.
8. **Fails closed.** No author, a failed call or 0 claims: full read. No breaker, or a claim the breaker skipped: that claim releases nothing. Tests off, blocked or broken: nothing is released. A crash still produces a pack, and that pack is a full read. The pack names the missing part in a banner above the routing line. `npm run selftest` removes each part in turn and checks this, without spending anything.

## Reference run (MessagePack-CSharp, agent-written branches)

One run each on 14 Nov, Claude Opus 5.5 as author and Gemini 4 Carbon as breaker. Packs: `packs/<branch>.run2.md`.

| Branch | Requirement | Size | Routing | Reading load | Cost, time | Why |
|---|---|---|---|---|---|---|
| `ju26-issue-2283` | bug #2283: crash on a closed generic struct from a referenced assembly | 4 files, 228 changed lines | focused read | **70 of 218 code lines (32%)** | $0.52, 6.9 min | 6 claims with passing tests, upheld by the breaker, took 148 lines off. What stays: 2 disputed claims (42 lines), an AI-suggested contracts refusal on a new filter that drops analyzer diagnostics (15), and 13 lines that no claim covers, that are only AI-read, or that a finding names. |
| `ju26-issue-2297` | feature #2297: `ExcludeFromCodeCoverage` on generated code | 237 files (222 generated), 1,392 changed lines | focused read | **146 of 179 code lines (82%)**, 11% of everything changed | $0.51, 4.2 min | Static check S2 released all 1,210 generated lines: 222 files, one repeated edit. The breaker disputed 12 of 15 claims: the two new tests only count attribute strings per file, and the attribute is skipped on two target frameworks. |
| `ju26-issue-2129` | feature #2129: formatters for types in a referenced assembly | 28 files, 1,043 changed lines | **full read** | 884 of 884 (100%) | $1.09, 11.9 min | Refused by rule: a new public attribute in a shipped package and four new analyzer rules. 169 of 173 tests were blocked by this laptop, so no claim has a passing test and nothing is released. |
| `ju26-issue-2234` | bug #2234: analyzer doesn't run with `SuppressSourceGeneration` | 4 files, 266 changed lines | **full read** | 252 of 252 (100%) | $0.72, 8.8 min | Fails closed: the tests produced no results on this laptop (one project doesn't build on the base commit either, the other gave no results), so there is no test evidence. The banner says so. |

What an AI finding is worth, from #2283: the author flagged that the issue names three crash sites and the fix changes two. That put the line on the owner's list. The owner's check takes ten seconds: the third site is commented-out code (`TypeCollector.cs` L715). A false alarm: the owner rejects it at sign-off (`--reject-finding`) and the ledger counts it. The AI pointed; a human decided.

## Principles

| Tension | Our rule |
|---|---|
| Risk | Depth follows what a change can break (contracts, untrusted input) and what evidence it has, not how big it is. |
| Hallucination | A model's statement is never evidence. Line citations and requirement quotes are verified mechanically; a second vendor tries to break every claim. |
| Transparency | Every claim shows how it was checked. Every kept line says why it is kept. Every pack lists what was **not** checked and what it cost. No unexplained scores. |
| Confidence | The author states its confidence per claim and the tool ignores it. The self-test sets every claim to "high", then to "low", and gets the same reading list. |
| Quality | The tool checks the tests too: weakened tests and tests with no assertion are refusals, and the breaker disputes a test that doesn't test its claim. |

## Measurement

Two numbers that trade against each other, so neither can be gamed alone:

- **Reading load:** changed code lines the owner must read / changed code lines. This is the review time.
- **Escapes:** planted bugs that were not in view, meaning their lines were off the reading list and no finding named them. This is the incident rate.

28 seeded branches (22 with one planted bug, 6 clean controls with a harmless commit) and 4 clean agent branches, one run each, scored per layer from that one run (the saved model outputs are replayed offline with layers removed):

| Layer | What runs | Reading load, mean of 32 (median) | Planted bugs in view / escapes, of 22 | Findings on the 4 clean agent branches (false alarms where judged) |
|---|---|---|---|---|
| L0 | deterministic checks and tests only | 100% (100%): no claims, so nothing is released | 21 / 1 | 7, all from the test run, not judged |
| L1 | + Claude's story, breaker removed | 44% (29%) | 21 / 1 | 26. Judged on #2283: 1 false alarm of 4 |
| L2 | + Gemini breaker: the tool as it runs | 63% (62%) | 21 / 1 | 63, of which 22 disputed claims. Judged on #2283: 1 false alarm of 8 |

Reading load is ours to report (`npm run stats -- --tag run2.L2`). The other two columns were scored on 14 Nov by a separate session that holds the answer key; the rules, the per-branch table and the limits are in `docs/measurement.md`. The same bug escapes at every layer: its planted change leaves no changed line in the diff, so no reading list can hold it, not even the full read at L0. At L1 and L2 a finding still describes it, 9 lines from where the key puts it and so outside the 3-line scoring rule. None of the 6 clean controls drew a finding about its harmless commit.

What the columns show together: adding the breaker raised the reading load on 26 of 32 branches and lowered it on none. A second AI can only add reading. On this set the 19 points it adds bought no extra bug in view: L1 and L2 both keep 21 of 22. The breaker put one more bug's lines on the list and named one more in a finding, and both were already in view at L1. Claude's own findings name 19 of the 22 bugs, so this set cannot show what the second vendor is worth in escapes.

Per pack the load ran from 25% to 100%. 13 of 32 were full reads, 3 of them because a part of the reviewer failed and the pack failed closed (no test results, a broken build, and one breaker answer that came back cut off).

- **Scoring** is done by a separate session that holds the answer key; the reviewer never sees it. Results go to `docs/measurement.md`, and the key is published in the repo after the final score so anyone can check the numbers.
- **Variance:** 6 seeded branches were run 3 times each (picked by branch number, not by result). The reading load of the same branch moved by 6 to 40 points between runs, 26 on average: 35 / 65 / 39%, 67 / 36 / 27%, 91 / 71 / 71%, 69 / 38 / 55%, 63 / 48 / 79%, 39 / 39 / 33%. The author writes different claims and the breaker disputes different ones each time. That spread costs reading. It did not cost safety on this sample: one of the 6 is a clean control, and the 5 planted bugs had the same result in all three runs at L1 and L2 (4 in view every time, the same one escaping every time).
- **False alarms:** findings and disputes on the 4 clean branches that the owner rejects at sign-off (`--reject-finding`), recorded in the ledger.
- **A standing audit, not a one-off.** In production the planted-bug run repeats on a schedule per code area. Each escape goes on that area's ledger entry and puts it back on full read. The reviewer is on the ledger too.
- **What a team would watch:** reading load per PR and per area, time to merge, accepted-finding rate against false-alarm rate, reverts and incidents per area. Trust is earned if incidents don't rise while reading load falls.

## Trade-offs and limits

- The human step shrinks, it never disappears. Even a light check means reading the story.
- Reading load depends on the tests. A change with weak or missing tests is read by a human. That is the intended pressure, and it is why #2297 stays at 82%.
- A passing test backs a claim only as far as the test goes. The tool checks that the named test ran and passed, not which lines it executed; the breaker is the check on "this test doesn't test that".
- The reading list is built from the diff, so it cannot hold an omission. The one escape in the planted-bug audit left no changed line: something the change should have contained and didn't (lesson L18). The guards are the models' findings and the pack's list of requirement sentences no claim quotes, and neither is a guarantee.
- The evidence layer depends on the machine. Two of the four branches got no test evidence on a locked-down laptop. Tests belong in CI.
- The breaker over-disputes at times. That costs reading, never safety, and it is measured (L1 against L2 above).
- One run is not a stable number. The same branch read 27% in one run and 67% in another. The floor holds, because nothing leaves the list without verified evidence, but an owner can be handed more reading than a second run would have asked for.
- Rules are per-repo configuration (which assemblies ship, what counts as wire format). A team owns them like lint rules. Static rules are pattern-based; a contract change they miss is caught only if a model suggests it.
- Two model vendors cost twice. Measured over 32 reviews: $0.66 per review at list price on average ($0.26 Claude, $0.39 Gemini; from $0.39 to $1.10) and 7.6 minutes, most of it the breaker thinking.
- Not a product: no UI, no model training, synthetic and public data only. The static rules are specific to C# and MessagePack, so on another repo everything routes to a human until rules are written. By design.

## What would make us not trust our own output

- An escape in the planted-bug audit. That area goes back to full read automatically. It happened once (1 of 22), and that area is on probation in the ledger now.
- The breaker upholding everything across many PRs (it stopped trying), or answering with no verdicts. The second already happened: 2 of our first 19 runs, and the packs looked clean (lesson L8).
- A rising false-alarm rate (owners start ignoring the pack).
- Reading load falling without the tests getting better: something other than evidence is releasing lines.
- Any pack with a "review incomplete" banner. It is still a valid pack, but it is a full read, not a review.

**Who owns the decision?** The named owner in the sign-off record. Not the tool, not the author agent.
**How does it scale?** One review is two model calls plus the team's own test run. The owner's time goes only to the lines evidence didn't cover, and the ledger shows per area whether that trust was earned.

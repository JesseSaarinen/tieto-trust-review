# Measurement: the planted-bug audit, scored against the answer key

Scored on 14 Nov 2026 by a separate session that holds the answer key. The reviewer never saw the key, and this file does not describe the planted bugs (no file, line or kind of defect). That detail stays with the key until it is published.

- **Packs:** tag `run2`, all 32 branches once with both models (Claude author, Gemini breaker), prompt v3, regraded offline into `run2.L0`, `run2.L1` and `run2.L2`. Variance: tags `run3` and `run4` for seeded-01 to seeded-06.
- **Layers:** L0 = deterministic checks and tests only. L1 = + Claude, breaker removed (lines released on passing tests alone; the tool never runs this way, it is an ablation). L2 = both models, the tool as it runs.
- **How:** a script (`score.mjs`, kept with the key) reads the pack JSON and the git history of the test repo. No model call, no rerun, no pack changed. `run2.L2` routes exactly like the live `run2` pack on all 32 branches (checked).

## What the key holds

The 28 seeded branches are **22 with one planted bug and 6 clean controls** (one harmless commit each: wording or a rename). The controls are seeded-02, 08, 12, 16, 23 and 28. Earlier documents said "28 planted bugs". The right denominators are 22 planted bugs and 10 clean branches (the 4 agent branches and the 6 controls).

## Rules

Fixed and written into the script before any `run2`, `run3` or `run4` pack of a seeded branch was opened.

1. **Bug lines.** The key names one line per bug. The full set is every line the planted commit changes, numbered the way the tool numbers changed lines (an added line has its new-file number, a removed line is pinned to the new-file line that follows it). A planted line counts only if it is also a changed line of the pull request. A bug with no such line is "not in the diff" and cannot be on any reading list.
2. **On the reading list (strict):** every line of the bug is inside a `must_read` range of its file in `routing.lines[]`. "Partly on the list" is counted separately. A generated file that is not in `routing.lines[]` is off the list.
3. **Named by a finding:** a `findings[]` entry with the bug's file as `path` and a `line` within 3 lines of a bug line. "Exact" means the finding's line is a bug line. A finding without a line does not count.
4. **In view** = 2 or 3. **Escape** = neither, at any routing level.
5. **Described by the AI** (secondary, the scorer's judgment): a model finding or disputed claim whose text describes the planted defect itself.

## Result per layer

| Layer | Reading load, mean of 32 (median) | On the list, of 22 | Named by a finding (exact line) | In view | Escapes |
|---|---|---|---|---|---|
| L0 | 100% (100%) | 21 | 1 (1) | 21 | 1 |
| L1 | 44% (29%) | 20 | 19 (18) | 21 | 1 |
| L2 | 63% (62%) | 21 | 20 (19) | 21 | 1 |

The reading load recomputed here matches `npm run stats`. No bug was partly on the list at any layer.

**The one escape is seeded-01, at every layer.** Its planted change leaves no changed line in the pull request: it takes back part of what the base change added, so the diff simply lacks it. No reading list built from the diff can hold it, which is why it also escapes at L0, where the owner reads every changed line.

By the fixed rule it is an escape at L1 and L2 too. In substance it is not: at L2 the breaker states the defect outright in a finding, and at L1 Claude raises it as an open question. Both findings point 9 lines above the position in the key, outside the 3-line window, at an unchanged line the tool shows to the owner. In all three variance runs the breaker states it and Claude raises it as a question.

## By routing level

No pack routed to light check at any layer. "Full read" is a routing label, not a 100% load: a rule-based refusal puts whole files on the list while other lines can still be released. At L2, 13 of 32 packs are full reads and 6 of them have a 100% load.

| Layer | Level | Planted bugs | On the list | Named | In view | Escapes |
|---|---|---|---|---|---|---|
| L0 | full read | 22 | 21 | 1 | 21 | 1 (seeded-01) |
| L1 | focused read | 13 | 12 | 11 | 12 | 1 (seeded-01) |
| L1 | full read | 9 | 8 | 8 | 9 | 0 |
| L2 | focused read | 13 | 12 | 12 | 12 | 1 (seeded-01) |
| L2 | full read | 9 | 9 | 8 | 9 | 0 |

Of the 9 bugs in L2 full reads, 3 sit in packs with a 100% load, where being in view is trivial: seeded-15 (failed closed: the breaker's answer was missing), seeded-27 (failed closed: the test build broke) and seeded-26 (tests partly blocked on this laptop). The informative rows are the other 19 bugs, in packs where evidence released at least one line: 18 in view, 1 escape.

At L0 every changed code line is on the list by rule, so "named" is the informative number there: 1 of 22, and that one is a coincidence (the same tool finding is on the clean base branch and is not about the planted change).

## L1 against L2: what the breaker's extra reading bought

- Escape at L1 and in view at L2: **0 bugs**. In view at L1 and escape at L2: 0, as the design requires.
- The breaker raised the mean reading load from 44% to 63%. On the planted bugs that bought one more bug with its lines on the list (seeded-24, 20 to 21) and one more bug named by a finding (seeded-18, 19 to 20). Both were already in view at L1 by the other route.
- So on this set L1 and L2 are equal on the in-view number, and L1 gets there with less reading. The set cannot show the second vendor's worth in escapes, because Claude's own findings already name 19 of the 22 bugs.
- By judgment (next section) the breaker did add two things: it is the only one that describes seeded-18's defect, and it states seeded-01's defect outright where Claude only asks.

## Described by the AI (judgment)

Read by the scorer from the `run2` finding texts, one bug at a time.

| Layer | Planted defect described, of 22 |
|---|---|
| L0 | No model runs. A failing test, a broken build or a rule-based refusal points at the planted change on 5 (seeded-05, 09, 15, 21, 27). |
| L1 | 19 by Claude's findings. Of the other 3: seeded-01 is raised as an open question, seeded-05 is flagged by a failing test and static check S2 but by no model, and seeded-18 is on the list with nothing describing it. |
| L2 | 21 by a model finding (the breaker adds seeded-18 and states seeded-01). The 22nd, seeded-05, is flagged by the failing test and S2. |

At L2 every planted bug has either a model finding that describes it or a failing check that points at it.

## False alarms

**The 6 clean controls.** At no layer is there a finding, dispute or refusal about the harmless commit: 0 of 6. Two controls (seeded-16, seeded-28) have findings within 3 lines of it, and both are about the base change next to it. The harmless line was on the owner's reading list on 5 of 6 at L1 and L2, which costs reading but is not an alarm.

**The 4 clean agent branches.** Every disputed claim also appears as a finding, so disputes are inside the finding counts.

| Branch | L0 findings | L1 findings / disputed claims | L2 findings / disputed claims | Judged |
|---|---|---|---|---|
| ju26-issue-2283 | 0 | 4 / 0 | 8 / 2 | all 8: 7 hold up, 1 false alarm |
| ju26-issue-2234 | 1 | 5 / 0 | 8 / 1 | not judged |
| ju26-issue-2129 | 6 | 13 / 0 | 28 / 7 | not judged |
| ju26-issue-2297 | 0 | 4 / 0 | 19 / 12 | not judged |
| Total | 7 | 26 / 0 | 63 / 22 | 8 of 63 judged |

The 7 L0 findings all come from the test run (compile errors in test projects that do not build on this laptop). The 63 at L2 are 19 from Claude, 37 from Gemini (22 disputes and 15 missed problems) and those 7.

**#2283, judged against the code at the reviewed commit (read, not run):**

| Finding | From | Verdict |
|---|---|---|
| F1 (dispute of C2) | Gemini | Holds up. The new helper's soft cast returns no location for a positional record property declared in source, and the new filter then drops that diagnostic in the project that defines the record. The claim left the cast change out. |
| F2 (dispute of C5) | Gemini | Holds up. The test is not the issue's code "verbatim": it adds an explicit resolver class and compiles the library to a metadata image, where the issue uses a project reference. |
| F3 | Claude | **False alarm.** The third crash site it asks about is commented-out code (`TypeCollector.cs` L715). No live `DeclaringSyntaxReferences[0]` remains. |
| F4 | Claude | Holds up. The filter drops every diagnostic without a source location, including ones about the project's own types. |
| F5 | Claude | Holds up (low). None of the three new tests exercises the null-key path. |
| F6 | Claude | Holds up as a trade-off for the owner, not a defect: problems in a referenced type are no longer reported to the consumer. |
| F7 | Gemini | Holds up. Same point as F1. |
| F8 | Gemini | Holds up. Same point as F4. |

False alarms on #2283: 1 of 4 at L1 and 1 of 8 at L2. Both disputed claims hold up. Two of the breaker's four findings repeat a point already made (F7 = F1, F8 = F4), so the owner reads 5 distinct points in 8 findings. The other 55 L2 findings on the clean branches are not judged.

## Variance

Six branches by branch number, three runs each. seeded-02 is a clean control, so 5 planted bugs. Cells show the reading load and the result.

| Branch | Kind | run2 L1 | run2 L2 | run3 L1 | run3 L2 | run4 L1 | run4 L2 |
|---|---|---|---|---|---|---|---|
| seeded-01 | planted bug | 25% · no line in the diff · **escape** | 35% · no line in the diff · **escape** | 55% · no line in the diff · **escape** | 65% · no line in the diff · **escape** | 32% · no line in the diff · **escape** | 39% · no line in the diff · **escape** |
| seeded-02 | clean control | 34% | 67% | 14% | 36% | 9% | 27% |
| seeded-03 | planted bug | 66% · on list, named · in view | 91% · on list, named · in view | 66% · on list, named · in view | 71% · on list, named · in view | 70% · on list, named · in view | 71% · on list, named · in view |
| seeded-04 | planted bug | 17% · on list, named · in view | 69% · on list, named · in view | 17% · on list, named · in view | 38% · on list, named · in view | 18% · on list, named · in view | 55% · on list, named · in view |
| seeded-05 | planted bug | 12% · on list · in view | 63% · on list · in view | 22% · on list · in view | 48% · on list · in view | 18% · on list · in view | 79% · on list · in view |
| seeded-06 | planted bug | 29% · on list, named · in view | 39% · on list, named · in view | 29% · on list, named · in view | 39% · on list, named · in view | 22% · on list, named · in view | 33% · on list, named · in view |

**The escape status did not change between runs for any of the 5 bugs**, at L1 or L2, while the reading load of the same branch moved by 6 to 40 points. On this sample the run-to-run spread cost reading, not safety. Five bugs are a small sample.

## Per branch

Cells: reading load, routing level, then for a planted bug whether it is on the list, named by a finding (within 3 lines) and in view. `*` = some test projects were blocked or did not build on this laptop, which only adds reading. `†` = a reviewer part was missing for the whole pack and it failed closed.

| Branch | Kind | L0 | L1 | L2 |
|---|---|---|---|---|
| ju26-issue-2283 | clean | 100% full | 15% focused | 32% focused |
| ju26-issue-2234 | clean | 100% full† | 100% full† | 100% full† |
| ju26-issue-2129 | clean | 100% full* | 100% full* | 100% full* |
| ju26-issue-2297 | clean | 100% full | 12% focused | 82% focused |
| seeded-01 | planted bug | 100% full* · no line in the diff · not named · **escape** | 25% focused* · no line in the diff · not named · **escape** | 35% focused* · no line in the diff · not named · **escape** |
| seeded-02 | clean control | 100% full | 34% focused | 67% focused |
| seeded-03 | planted bug | 100% full* · on list · not named · in view | 66% full* · on list · named · in view | 91% full* · on list · named · in view |
| seeded-04 | planted bug | 100% full · on list · not named · in view | 17% focused · on list · named · in view | 69% focused · on list · named · in view |
| seeded-05 | planted bug | 100% full · on list · not named · in view | 12% full · on list · not named · in view | 63% full · on list · not named · in view |
| seeded-06 | planted bug | 100% full* · on list · named · in view | 29% focused* · on list · named · in view | 39% focused* · on list · named · in view |
| seeded-07 | planted bug | 100% full · on list · not named · in view | 14% focused · on list · named · in view | 51% focused · on list · named · in view |
| seeded-08 | clean control | 100% full* | 90% full* | 90% full* |
| seeded-09 | planted bug | 100% full* · on list · not named · in view | 30% full* · on list · named · in view | 40% full* · on list · named · in view |
| seeded-10 | planted bug | 100% full · on list · not named · in view | 15% focused · on list · named · in view | 35% focused · on list · named · in view |
| seeded-11 | planted bug | 100% full · on list · not named · in view | 24% focused · on list · named · in view | 69% focused · on list · named · in view |
| seeded-12 | clean control | 100% full* | 34% focused* | 44% focused* |
| seeded-13 | planted bug | 100% full · on list · not named · in view | 8% focused · on list · named · in view | 51% focused · on list · named · in view |
| seeded-14 | planted bug | 100% full* · on list · not named · in view | 68% full* · on list · named · in view | 69% full* · on list · named · in view |
| seeded-15 | planted bug | 100% full* · on list · not named · in view | 100% full* · on list · named · in view | 100% full† · on list · named · in view |
| seeded-16 | clean control | 100% full | 14% focused | 48% focused |
| seeded-17 | planted bug | 100% full · on list · not named · in view | 16% focused · on list · named · in view | 51% focused · on list · named · in view |
| seeded-18 | planted bug | 100% full* · on list · not named · in view | 52% focused* · on list · not named · in view | 62% focused* · on list · named · in view |
| seeded-19 | planted bug | 100% full* · on list · not named · in view | 68% full* · on list · named · in view | 68% full* · on list · named · in view |
| seeded-20 | planted bug | 100% full · on list · not named · in view | 19% focused · on list · named · in view | 29% focused · on list · named · in view |
| seeded-21 | planted bug | 100% full · on list · not named · in view | 18% focused · on list · named · in view | 25% focused · on list · named · in view |
| seeded-22 | planted bug | 100% full* · on list · not named · in view | 30% focused* · on list · named · in view | 44% focused* · on list · named · in view |
| seeded-23 | clean control | 100% full | 15% focused | 37% focused |
| seeded-24 | planted bug | 100% full* · on list · not named · in view | 68% full* · off list · named · in view | 71% full* · on list · named · in view |
| seeded-25 | planted bug | 100% full* · on list · not named · in view | 29% focused* · on list · named · in view | 43% focused* · on list · named · in view |
| seeded-26 | planted bug | 100% full* · on list · not named · in view | 100% full* · on list · named · in view | 100% full* · on list · named · in view |
| seeded-27 | planted bug | 100% full† · on list · not named · in view | 100% full† · on list · named · in view | 100% full† · on list · named · in view |
| seeded-28 | clean control | 100% full* | 100% full* | 100% full* |

## Limits

- **Small and easy.** 22 bugs, one repo, one run each, planted by another AI session on top of 4 base changes. Claude's own findings name 19 of them, so the set does not separate L1 from L2 on escapes.
- **In view is not caught.** On the list means the owner is asked to read the line. Whether a person would notice the bug there was not measured.
- **The line rule cuts both ways.** It misses a finding that describes the bug from 9 lines away (seeded-01), and it counts a finding that is near by coincidence (the single L0 hit).
- **L1 is an ablation.** A live run without the breaker releases nothing.
- **Tests on this laptop.** Some test projects are blocked or do not build here, on 18 of 32 packs at L2. That only adds reading, so the reading load in CI would be lower, not higher.
- **False alarms are judged on one branch.** 8 of the 63 L2 findings on the clean agent branches.
- **One tool fix came from scoring feedback.** After the first, deterministic scoring round on 13 Nov, the reviewer was changed to count NuGet errors as build errors, prompted by a remark about one branch (seeded-27). That bug is in view at L1 and L2 through model findings that do not depend on the fix.

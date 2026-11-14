# 2-minute video script

Screen recording of the terminal and the evidence pack (Markdown preview). About 270 words spoken. Every number is from a saved pack under `packs/` (tag `run2`); the last row is from `docs/measurement.md` (scored 14 Nov).

| Time | On screen | Voice |
|---|---|---|
| 0:00–0:10 | Title card: "The AI's confidence never moves a change. Only evidence the tool verified does." | AI agents write pull requests faster than people can read them, and "the AI said it was fine" isn't an answer. So in our reviewer the AI's confidence never moves a change. Only evidence the tool verified does. |
| 0:10–0:28 | Concept card, the flow | Every changed line starts on a named owner's reading list. The change tells its story as claims tied to the requirement. A line comes off the list only when a claim that cites it has a passing test behind it, and a second AI from another vendor failed to break that claim. The AI can add reading. It can never remove it. |
| 0:28–0:52 | `npm run review -- --branch ju26-issue-2283 --req REQ-2283`, then the top of `packs/ju26-issue-2283.run2.md` | A real agent-written fix for MessagePack issue 2283. Claude wrote 12 claims. 7 have tests behind them that the tool found passing in the real run. Gemini tried to break all twelve and disputed 2. The owner reads 70 of 218 changed lines, about a third, and the pack says which lines and why. |
| 0:52–1:12 | `packs/ju26-issue-2297.run2.md`: reading load line and "Not required to read" | Size isn't risk. This change touches 237 files, but 222 are generated snapshots, and a static check proves they all change the same way. The owner reads 11 percent of it. The breaker disputed 12 of 15 claims here: the new tests only count attribute strings. That is reading the AI added. |
| 1:12–1:26 | `packs/ju26-issue-2129.run2.md`: "Refused to decide" table | This one adds a public attribute and four analyzer rules. Those are promises to every user, so the AI refuses to decide. Full read, by rule, not because a model happened to notice. |
| 1:26–1:38 | `npm run selftest` output, then the banner on `packs/ju26-issue-2234.run2.md` | It fails closed. Take away the author, the breaker or the tests, and the change routes up, with the missing part named at the top of the pack. |
| 1:38–1:48 | `npm run signoff ... --decision accept` failing, then succeeding with `--ack` and `--risk` | The owner signs. No accept is recorded until every refusal is acknowledged and the residual risk is written down. |
| 1:48–2:00 | Per-layer table from `docs/measurement.md` + ledger | We planted 22 bugs and measured layer by layer. A full read keeps 21 of them in view. With both models the owner reads 63 percent, and the same 21 stay in view. The one escape changed no line in the diff. Every escape puts that code area back on full read. Trust is earned, per area. |

Checks before recording:

- The #2283, #2297 and #2129 numbers above match `npm run stats -- --tag run2`. If a pack is rerun, update the row.
- #2234 shows the banner because its test project does not build on this laptop (lessons L3 and L5). In CI it would have tests.
- Show the saved `packs/ju26-issue-2283.run2.md` for the 0:28 shot. A live `npm run review` on #2283 now reads the ledger, where `src/MessagePack.SourceGenerator/CodeAnalysis` is on probation after the audit escape, so it would come out as a full read and not 70 of 218. Add `--no-ledger` to rerun it as measured.
- The last row matches `docs/measurement.md` (scored 14 Nov): 22 planted bugs, 21 in view at L0 and at L2, mean reading load 100% and 63%. With Claude alone (L1) it is 44% and the same 21.

# tieto-trust-review

Junction 2026 Tieto challenge "Earned Trust in AI Code". Plan, judging and decisions: `../tieto.md` (source of truth).
This repo holds the reviewer tool (reference implementation), the concept card and the logs.

## Where things are

- `src/`: reviewer CLI (TypeScript, run directly with Node 24, no build step)
  - `cli.ts` commands `review`, `regrade`, `batch`, `stats`, `signoff`, `ledger`
  - `review.ts` builds the evidence pack, the reading list (routing) and the Markdown
  - `static.ts` deterministic checks S1–S8 and the refuse-to-decide triggers
  - `tests.ts` runs the target repo's tests in a throwaway git worktree under `.work/`
  - `models.ts` Claude (author/story) and Gemini (breaker) calls, prompts (`PROMPT_VERSION`), list prices (`PRICES`)
  - `ledger.ts` trust ledger per code area
  - `selftest.ts` fail-closed self-test, spends nothing
- `requirements/`: requirement texts (upstream issue bodies), `REQ-<n>.md`
- `packs/`: generated evidence packs (`.md` + `.json`), named `<branch>.<tag>`
- `records/`: owner sign-off records; `ledger.json`: trust ledger
- `docs/`: concept card, decision log, lessons log, video script
- `.github/workflows/trust-review.yml`: Action for the MessagePack fork (not active yet)

## Run

    npm run review -- --branch ju26-issue-2283 --req REQ-2283
    npm run regrade -- --tag run2                 # rebuild saved packs with layers removed, no model call
    npm run batch -- --tag run2 --parallel 4      # all 32 branches; finished packs are skipped, so it can be restarted
    npm run stats -- --tag run2                   # routing, reading load, cost and time per pack
    npm run signoff -- --pack packs/ju26-issue-2283.json --owner "Name" --decision accept --risk "..." --ack R1
    npm run ledger
    npm run selftest
    npm run typecheck

Target repo defaults to `../tieto-messagepack`. Keys go in `.env` (see `.env.example`). Without a key no model is called and the pack fails closed: full read, with the missing part named at the top.

## The routing rule

Every changed line starts on the owner's reading list. A code line comes off only when a claim that cites it is backed by tests the tool found passing in the real run and the breaker upheld that claim. Generated snapshots come off only through static check S2. Either model can put lines back (dispute, refusal, finding); neither can take one off. A missing or failed part of the reviewer therefore only adds reading. `review()` never throws: a crash still returns a pack that routes to full read.

## Pack tags

- `run1`: 19 packs from 13 Nov, prompt v1, made before usage and raw outputs were saved. Kept as history; not part of the measurement.
- `run2`, `run3`, `run4`: prompt v3 measurement runs (`--no-ledger`).
- `<tag>.L0` / `.L1` / `.L2`: the same pack regraded offline. L0 = deterministic checks and tests only, L1 = + Claude with the breaker removed (lines released on passing tests alone), L2 = both models (same as the live pack).
- `det`, `stub`, `live`, `smoke`: early trial packs from 13 Nov, old format. `v2trial`: the one #2283 run on prompt v2 (lesson L12).
- Variance set (`run2`, `run3`, `run4`): seeded-01 to seeded-06.

## Reading a pack for scoring

- `routing.reading_load`: `must_read_lines` / `code_lines` = share of changed code lines (generated and docs excluded) the owner must read.
- `routing.lines[]`: per changed file, `must_read` and `released` as new-file line ranges `[start, end]`. A removed line is pinned to the new-file line that follows it. Generated files appear only when they are on the list; otherwise `reading_load.generated_released` is true.
- `findings[]`: `path` and `line` (new-file line, or null).
- A planted bug is **in view** when its lines fall inside `must_read` of its file, or a finding names its file and line. It is an **escape** when neither holds, at any routing level.
- `meta.missing`: reviewer parts that were missing or failed. `meta.ablation`: set on L1 packs.
- `meta.usage`, `meta.cost_usd`, `meta.seconds`: tokens, list-price cost and time per pack.

## Rules

- Never commit `.env*` (except `.env.example`). Never push without Jesse asking.
- Public since 14 Nov: `github.com/JesseSaarinen/tieto-trust-review` (branch `master`). The walkthrough PRs 1, 2 and 3 are in the fork `github.com/JesseSaarinen/junction26-messagepack-csharp`; never open a PR against Tieto's own repo (pass `--repo` to `gh`).
- Commits here use Jesse's GitHub no-reply address (repo-local `user.email`), so his Aalto address stays out of the public history. Don't change it.
- Never read the answer key (`C:\Users\Jesse\Documents\junction-2026-tieto-answer-key\`): the reviewer must stay blind to the planted bugs. Only the separate scoring session opens it. Don't tune prompts or rules to individual planted-bug results.
- Don't switch branches in `../tieto-messagepack`; tests run in worktrees under `.work/`.
- Measurement runs use `--no-ledger` (the batch command always does): they neither read nor write `ledger.json`.
- Price a batch before starting it (`npm run stats` shows the cost per pack) and keep the machine awake while it runs.
- `dotnet` lives in `C:\Program Files\dotnet` and isn't on the Git Bash PATH; the tool finds it itself.

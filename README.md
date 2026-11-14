# tieto-trust-review

An AI reviewer for agent-written pull requests. A named human approves the change without reading all of it, and signs what was checked, what wasn't, and the risk they accept.

Built for Tieto's challenge "Earned Trust in AI Code" at Junction 2026. It is a concept with a reference implementation, not a product.

> **The AI's confidence never moves a change. Only evidence the tool verified does.**

## The idea in five lines

1. Every changed line starts on the owner's reading list.
2. One model (Claude) tells the change's story as narrow claims. Each claim quotes the requirement, cites lines and names tests.
3. The tool checks the citations and runs the tests itself. A second model from another vendor (Gemini) tries to break every claim.
4. A line leaves the list only when a claim that cites it has a passing test and the second model upheld the claim. Either model can add reading. Neither can remove it.
5. If any part of the reviewer is missing or fails, the change routes to a full read, and the pack says which part.

The full concept, principles, trade-offs and limits are in the [concept card](docs/concept-card.md).

## Start here

| What | Where |
|---|---|
| Concept card | [docs/concept-card.md](docs/concept-card.md) |
| Measurement on 22 planted bugs and 10 clean changes | [docs/measurement.md](docs/measurement.md) |
| One evidence pack, as the owner sees it | [packs/ju26-issue-2283.run2.md](packs/ju26-issue-2283.run2.md) |
| Decision log | [docs/decision-log.md](docs/decision-log.md) |
| Lessons log: failure modes we hit | [docs/lessons-log.md](docs/lessons-log.md) |
| Owner sign-off records | [records/](records/) |

## Run it

Needs Node 24. TypeScript runs directly, there is no build step.

    npm install
    npm run selftest

The self-test removes each part of the reviewer in turn and checks that the change routes up. It calls no model and costs nothing.

A real review needs a checkout of the target repo next to this one, the .NET 8 SDK for its tests, and API keys in `.env` (see `.env.example`):

    git clone https://github.com/te-industry-tech-office/junction26-messagepack-csharp ../tieto-messagepack
    npm run review -- --branch ju26-issue-2283 --req REQ-2283

Without keys no model is called. The pack is then a full read, with the missing part named at the top.

The saved packs can be inspected and replayed without any model call:

    npm run stats -- --tag run2
    npm run regrade -- --tag run2

`stats` prints routing, reading load, cost and time per pack. `regrade` rebuilds the saved packs layer by layer from the stored model outputs.

## What is in `packs/`

Every pack is a Markdown file for the owner and a JSON file with the same content plus the raw model outputs. Files are named `<branch>.<tag>`.

- `run2`: the measurement run. All 32 branches once, with both models.
- `run2.L0`, `run2.L1`, `run2.L2`: the same run replayed offline. L0 is deterministic checks and tests only, L1 adds Claude with the second model removed, L2 is both models, the tool as it runs.
- `run3`, `run4`: repeat runs of six branches, to see how much one run varies.
- `run1`, `det`, `stub`, `live`, `smoke`, `v2trial`: earlier trial packs. They are kept because the lessons log refers to them. They are not part of the measurement.

The four `ju26-issue-*` branches are the agent-written changes in Tieto's sample repo, and `requirements/` holds the issue texts they answer. The 28 `seeded-*` branches are those changes with one more commit on top: 22 carry a planted bug and 6 are clean controls with a harmless commit. The answer key is kept outside this repo so the reviewer side never sees it. A separate session scored the packs against it.

## How it was made

Made by Jesse Saarinen, solo, during the hackathon weekend. I built it with Claude Code: I set the direction, made the calls in the decision log and tested the result, and Claude wrote the code and ran the measurements.

The reviewer uses Claude Opus 5.5 as the author model and Gemini 4 Carbon as the second model. Costs in the packs are list prices.

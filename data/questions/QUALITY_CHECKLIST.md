# Question quality checklist (ship bar)

Use before marking `status: "reviewed"` on any `PracticeQuestion`.

## Stem

- [ ] Exam command word (*Work out*, *Find*, *Write down*, *State*) — not drill template text.
- [ ] Units and context where the spec expects them (UK spelling, sensible scenarios).
- [ ] Multi-step stems split with blank lines when needed (`\n\n` for `FormattedQuestionText`).

## Diagram

- [ ] If the stem refers to a diagram (“Use the diagram”, “The graph shows…”), set `diagramParams` or `diagramKey` so givens match the stem.
- [ ] No mismatch (e.g. 12-sided polygon stem with pentagon art).
- [ ] Prefer `diagramParams` when numbers in the stem vary.

## Options & distractors

- [ ] Exactly four **distinct** options.
- [ ] Three distractors from named error types (document in `distractorRationale`).
- [ ] Correct option position varies across the set where possible.

## Explanation

- [ ] 2–4 steps mirroring mark-scheme logic.
- [ ] `examTip` is one memorable rule, not a repeat of the explanation.

## Metadata

- [ ] `topicCode` aligns with syllabus / `_reference/` topic map.
- [ ] `subskillId` set (e.g. `MAT.3.3.cf_median`, `PHY.1.5.energy_stores`).
- [ ] `difficulty` matches reasoning depth.
- [ ] `source` and `status` set (`original` + `reviewed` for hand-authored gold).

## Peer check

- [ ] Second person solves without seeing `explanation` first.
- [ ] Spot-check in the quiz UI (mobile width, diagram scale).

Run `npm run validate:questions` after edits.
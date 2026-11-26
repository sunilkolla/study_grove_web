# Question bank layout

Static practice items live under `data/questions/` — **no React imports**.

## Structure

```
data/questions/
  QUALITY_CHECKLIST.md    # Ship bar for every item
  year9/
    helpers.ts            # baseYear9Question, topicCode
    index.ts              # year9Questions aggregate
    biology.ts | chemistry.ts | physics.ts | maths.ts
    maths/
      geometrical.ts | simultaneous.ts | statistics.ts | proportional.ts
      statisticsGoldCfBox.ts   # Hand-reviewed gold (subtopics 3.3–3.4)
      topicExpansions.ts       # Parametric drafts (gated)
      generators/              # Per-subskill generators + tests
```

## Adding a subject / year

1. Copy the `year9/` pattern: `helpers.ts` + per-subject files.
2. Register in `year9/index.ts` (or `year10/index.ts` when added).
3. Wire into `data/mockQuestions.ts` or the relevant service importer.
4. Follow [QUALITY_CHECKLIST.md](./QUALITY_CHECKLIST.md); set `status: "reviewed"` only after QA.

## Authoring workflow

1. Draft in TS using `baseYear9Question` (or year-specific helper).
2. Set `subskillId`, `distractorRationale`, `diagramParams` where needed.
3. Run `npm run validate:questions`.
4. Peer review → set `status: "reviewed"`.

## Generated / draft content

Parametric items from `generators/` or `topicExpansions.ts` default to `status: "draft"`.
They are included only when `INCLUDE_GENERATED_QUESTIONS` is true in
`year9/maths/generatedFlags.ts` (off by default for student decks).

## Diagrams

- Prefer `diagramParams` (data-driven) in `types/index.ts`.
- Renderers live in `components/quiz/QuizDiagram.tsx` and `components/quiz/diagrams/`.
- Legacy `diagramKey` SVGs remain for older items until migrated.

## Sciences (Year 9)

Physics, chemistry, and biology banks use the same metadata fields (`subskillId`, `status`, `distractorRationale`). Diagram-heavy science items should gain `diagramKey` or `diagramParams` when passages/diagrams are added.
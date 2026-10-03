---
name: code-review
description: "Review the implemented Todo application for correctness, regressions, scope violations, traceability, and missing tests. Use when producing code-review.md from the implementation and approved SDLC artifacts."
user-invocable: false
---

# Code Review Skill

## Purpose

Use this skill to review the implemented repository state against the approved SDLC baseline.

## Use When

- The task is to produce or update [code-review.md](../../../code-review.md).
- The agent needs to review implementation quality, scope control, and test coverage.
- The agent needs to assess whether the implementation matches the requirements, architecture, and implementation plan.

## Inputs

- Implementation changes in the repository.
- [requirements.md](../../../requirements.md).
- [architecture.md](../../../architecture.md).
- [impl-plan.md](../../../impl-plan.md).
- Existing [code-review.md](../../../code-review.md), if present.

## Procedure

1. Review the actual implementation and relevant tests.
2. Compare behavior and structure against approved requirements, architecture, and implementation plan.
3. Check for bugs, regressions, missing validation, scope violations, and maintainability risks.
4. Confirm whether tests cover the approved behavior adequately.
5. Record findings accurately and order them by severity.
6. Distinguish verified findings from assumptions or open questions.
7. Produce or update [code-review.md](../../../code-review.md).

## Review Rules

- Findings come first.
- Do not claim an issue is fixed unless it has actually been fixed and validated.
- Do not invent defects to populate the review.
- Keep the review tied to observable repository state.

## Expected Output

- Ordered findings with severity and rationale.
- Residual risks and testing gaps.
- A brief conclusion on review readiness.

---
name: verification
description: "Verify the Todo application against approved acceptance criteria and requirements. Use when running automated checks, live browser checks when appropriate, and documenting factual outcomes in verification.md."
user-invocable: false
---

# Verification Skill

## Purpose

Use this skill to verify that the implementation satisfies the approved requirements and acceptance criteria.

## Use When

- The task is to produce or update [verification.md](../../../verification.md).
- The agent needs to run or analyze automated tests.
- The agent needs to perform browser verification for the plain browser Todo app.

## Inputs

- [docs/user-story.md](../../../docs/user-story.md).
- [requirements.md](../../../requirements.md).
- The implemented Todo app and its tests.
- Existing [verification.md](../../../verification.md), if present.

## Procedure

1. Build a verification matrix that covers every acceptance criterion and functional requirement.
2. Run appropriate automated tests for the touched or relevant behavior.
3. Use live browser verification when needed to confirm user-facing browser behavior.
4. Record exact commands run, observed results, failures, and skips.
5. Distinguish automated verification from manual browser checks.
6. Produce or update [verification.md](../../../verification.md) using only factual outcomes.

## Verification Rules

- Never fabricate test execution, browser checks, or pass/fail status.
- Flag failed or skipped checks explicitly.
- If verification coverage is incomplete, say so and explain the gap.
- Keep the verification tied to the approved scope only.

## Expected Output

- Acceptance-criteria and requirement coverage matrix.
- Commands run and observed outcomes.
- Remaining issues, gaps, or readiness statement.

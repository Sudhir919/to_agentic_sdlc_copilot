---
name: pr-preparation
description: "Prepare pull request documentation for the Todo SDLC workflow. Use when creating or updating PR.md and CHANGELOG.md from verified artifacts and actual repository state without claiming a GitHub PR exists unless one was created."
user-invocable: false
---

# PR Preparation Skill

## Purpose

Use this skill to prepare repository-ready PR documentation from verified SDLC evidence.

## Use When

- The task is to produce or update [PR.md](../../../PR.md) or [CHANGELOG.md](../../../CHANGELOG.md).
- The agent needs to summarize verified changes and remaining manual steps.
- The agent needs to prepare PR notes without creating or claiming a live GitHub PR.

## Inputs

- Verified SDLC artifacts, especially [verification.md](../../../verification.md) and [code-review.md](../../../code-review.md).
- Actual repository diff and implementation state.
- Existing [PR.md](../../../PR.md) and [CHANGELOG.md](../../../CHANGELOG.md), if present.

## Procedure

1. Read the verified SDLC artifacts and confirm the implementation state they describe is supported by the repository.
2. Summarize the change scope, verification evidence, and any remaining manual steps.
3. Update [PR.md](../../../PR.md) and [CHANGELOG.md](../../../CHANGELOG.md) with factual statements only.
4. Preserve traceability back to the approved SDLC artifacts.

## PR Preparation Rules

- Do not claim that a GitHub pull request exists unless one was actually created.
- Do not merge, force-push, or alter repository history.
- Do not fabricate review status, approvals, or test outcomes.
- Keep notes scoped to the actual verified change.

## Expected Output

- PR-ready summary text.
- Accurate verification and review notes.
- Explicit remaining manual steps, if any.

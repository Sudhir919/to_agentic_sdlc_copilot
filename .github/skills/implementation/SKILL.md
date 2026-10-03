---
name: implementation
description: "Implement the approved Todo scope for the Todo SDLC workflow. Use when changing the browser app and related tests according to approved requirements, architecture, and implementation plan, limited to add, edit, and delete behavior."
user-invocable: false
---

# Implementation Skill

## Purpose

Use this skill to implement only the approved Todo application scope and nothing beyond it.

## Use When

- The task is to modify the Todo application code or its related tests.
- The agent needs to implement approved items from [impl-plan.md](../../../impl-plan.md).
- The agent needs to keep code changes aligned with the approved requirements and architecture.

## Inputs

- [docs/user-story.md](../../../docs/user-story.md).
- [requirements.md](../../../requirements.md).
- [architecture.md](../../../architecture.md).
- [impl-plan.md](../../../impl-plan.md).
- The Todo app files under [todo-app](../../../todo-app).

## Procedure

1. Confirm the requested implementation work is approved by the current requirements, architecture, and implementation plan.
2. Restrict the implementation to add, edit, and delete Todo behavior.
3. Apply minimal code changes in [todo-app](../../../todo-app) using plain HTML, CSS, and JavaScript only.
4. Keep code structure simple and consistent with the documented architecture.
5. Update or add tests only when needed to cover the approved behavior.
6. Run focused validation for the changed slice before widening scope.
7. Report exactly what changed and what was validated.

## Implementation Rules

- Do not add persistence, backend code, databases, APIs, authentication, completion state, filters, categories, priorities, due dates, notifications, or third-party services.
- Do not revise approved SDLC artifacts unless a code change makes a factual synchronization step necessary.
- Do not implement speculative future requirements.
- Prefer root-cause fixes and minimal surface area.

## Expected Output

- Minimal implementation changes aligned with the approved plan.
- Focused validation results.
- Any blockers or deviations called out explicitly.

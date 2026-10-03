---
name: architecture
description: "Guide architecture design for the Todo SDLC workflow. Use when turning approved requirements into a simple browser-only HTML, CSS, and JavaScript design with traceability into architecture.md."
user-invocable: false
---

# Architecture Skill

## Purpose

Use this skill to design the approved Todo application architecture from the requirements baseline while preserving strict scope control.

## Use When

- The task is to create, refine, or review [architecture.md](../../../architecture.md).
- The agent needs to map approved requirements to a concrete browser-only design.
- The agent needs to explain how the simple Todo app should be structured without introducing unsupported technology.

## Inputs

- Approved [requirements.md](../../../requirements.md).
- [docs/user-story.md](../../../docs/user-story.md) for scope cross-checks.
- Existing [architecture.md](../../../architecture.md), if present.
- Project-wide constraints from [copilot-instructions.md](../../copilot-instructions.md).

## Procedure

1. Read [requirements.md](../../../requirements.md) and confirm the design target is limited to add, edit, and delete Todo behavior.
2. Cross-check [docs/user-story.md](../../../docs/user-story.md) to ensure the design does not drift beyond the approved scope.
3. Design only a browser-side solution using HTML, CSS, and JavaScript.
4. Describe the minimal file structure, DOM responsibilities, event flow, and state handling needed for the app.
5. Maintain traceability from each requirement to the design elements that satisfy it.
6. Record assumptions, tradeoffs, and design limits explicitly.
7. Produce or update [architecture.md](../../../architecture.md) with implementation-ready guidance.

## Architecture Rules

- Keep the solution browser-only.
- Do not introduce persistence, backend services, databases, APIs, frameworks, authentication, or hidden future-facing abstractions.
- Prefer simple direct DOM manipulation and small readable files.
- Explain why each design choice is sufficient for the approved requirements.

## Expected Output

- Structure and component responsibilities.
- Requirement-to-design traceability.
- Assumptions, tradeoffs, and scope protections.

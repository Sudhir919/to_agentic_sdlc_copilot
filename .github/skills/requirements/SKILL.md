---
name: requirements
description: "Guide requirements analysis for the Todo SDLC workflow. Use when deriving acceptance criteria, functional requirements, scope boundaries, and traceability from docs/user-story.md into requirements.md."
user-invocable: false
---

# Requirements Skill

## Purpose

Use this skill to turn the user story into a precise, traceable requirements baseline for the repository.

## Use When

- The task is to create, refine, review, or update [requirements.md](../../../requirements.md).
- The agent needs to derive acceptance criteria or functional requirements from [docs/user-story.md](../../../docs/user-story.md).
- The agent needs to detect scope creep before architecture, planning, implementation, review, or verification work proceeds.

## Inputs

- [docs/user-story.md](../../../docs/user-story.md) as the source of truth.
- Existing [requirements.md](../../../requirements.md), if present.
- Project-wide constraints from [copilot-instructions.md](../../copilot-instructions.md).

## Procedure

1. Read [docs/user-story.md](../../../docs/user-story.md) first and treat it as authoritative.
2. Extract the user goal, the in-scope actions, and the explicit out-of-scope items.
3. Derive acceptance criteria that can later be verified directly.
4. Define stable functional requirement identifiers and keep each requirement atomic.
5. Maintain explicit traceability from each acceptance criterion to one or more functional requirements.
6. Check for scope creep. Reject or flag anything outside add, edit, and delete Todo behavior.
7. Record non-functional constraints only when they are supported by the user story or repository instructions.
8. Produce or update [requirements.md](../../../requirements.md) with factual content only.

## Requirements Rules

- Do not add persistence, completion state, filtering, categories, priorities, due dates, notifications, authentication, backend services, APIs, databases, or frameworks.
- Do not invent approvals, implementation details, or verification results.
- If the user story is ambiguous, record the ambiguity instead of guessing.
- Keep wording concrete enough that architecture, implementation, review, and verification can all trace back to it.

## Expected Output

- Acceptance criteria derived from the user story.
- Functional requirements with stable identifiers.
- A traceability mapping between acceptance criteria and requirements.
- Explicit scope notes and open questions when needed.

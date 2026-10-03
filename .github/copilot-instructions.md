# Project Guidelines

## Scope

- The source of truth for application scope is [docs/user-story.md](../docs/user-story.md).
- The Todo application must support only add, edit, and delete operations.
- Treat completion state, persistence, authentication, backends, databases, APIs, React, Node frameworks, filtering, categories, priorities, due dates, notifications, and third-party services as out of scope unless the human explicitly updates the user story.

## Agentic SDLC Workflow

- Follow this sequence: Requirements, HITL Gate #1, Architecture, Design Review, HITL Gate #2, Implementation Planning, Implementation, Code Review, Verification, HITL Gate #3, PR Preparation.
- The SDLC Orchestrator coordinates specialized agents and should delegate phase work instead of performing every phase itself.
- Stop at each human-in-the-loop gate and wait for explicit human approval before continuing.

## Truthfulness

- Do not fabricate approvals, execution results, test results, GitHub pull requests, Confluence content, or external system state.
- If a command or test has not been run, say so clearly in the relevant artifact.
- Keep artifact status explicit when a phase has not started or is pending approval.

## Implementation Conventions

- Keep the browser app simple and framework-free: HTML, CSS, and JavaScript only.
- Prefer small, readable files and direct DOM manipulation over abstractions.
- Keep tests aligned with the actual implementation and runnable from the repository.

## Artifacts

- Maintain these artifacts as the workflow progresses: requirements.md, architecture.md, design-review.md, impl-plan.md, code-review.md, verification.md, PR.md, and CHANGELOG.md.
- Maintain traceability from user story to acceptance criteria, requirements, architecture, implementation plan, implementation, verification, and PR notes.

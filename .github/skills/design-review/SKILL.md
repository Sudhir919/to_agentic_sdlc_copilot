---
name: design-review
description: "Review architecture for the Todo SDLC workflow. Use when checking architecture.md against the user story and requirements for scope control, traceability, simplicity, testability, and design risks before implementation."
user-invocable: false
---

# Design Review Skill

## Purpose

Use this skill to review the proposed architecture before implementation begins.

## Use When

- The task is to produce or update [design-review.md](../../../design-review.md).
- The agent needs to assess whether [architecture.md](../../../architecture.md) satisfies approved requirements and stays within scope.
- The agent needs to identify design risks, omissions, or traceability gaps.

## Inputs

- [docs/user-story.md](../../../docs/user-story.md).
- [requirements.md](../../../requirements.md).
- [architecture.md](../../../architecture.md).
- Existing [design-review.md](../../../design-review.md), if present.

## Procedure

1. Compare [architecture.md](../../../architecture.md) to [requirements.md](../../../requirements.md) and [docs/user-story.md](../../../docs/user-story.md).
2. Check whether every approved requirement has a corresponding design element.
3. Check whether the design introduces out-of-scope capabilities or avoidable complexity.
4. Evaluate simplicity, clarity, testability, and implementation feasibility for a plain HTML, CSS, and JavaScript app.
5. Identify design risks, missing details, inconsistencies, and unclear assumptions.
6. Classify findings by severity and explain why each one matters.
7. Produce or update [design-review.md](../../../design-review.md) with a factual readiness assessment.

## Review Rules

- Focus on findings, risks, and decision quality.
- Do not rewrite the architecture unless a specific clarification is required to explain a finding.
- Do not approve scope creep silently.
- Distinguish acceptable design tradeoffs from actual defects or gaps.

## Expected Output

- Ordered findings with severity.
- Open questions and unresolved risks.
- A clear statement of whether the design is ready, conditionally ready, or blocked.

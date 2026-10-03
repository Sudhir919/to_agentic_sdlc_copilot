---
name: documentation-sync
description: "Keep SDLC documentation synchronized with verified repository state. Use when reconciling SDLC artifacts with the actual implementation, review outcomes, and verification evidence without fabricating results."
user-invocable: false
---

# Documentation Sync Skill

## Purpose

Use this skill to keep project documentation aligned with the actual repository state and verified SDLC outcomes.

## Use When

- The task is to reconcile SDLC documents with the current implementation or verified results.
- The agent needs to update documentation after confirmed implementation, review, or verification changes.
- The agent needs to check whether documentation has drifted from the repository state.

## Inputs

- Current repository files and relevant SDLC artifacts.
- Verified implementation state.
- Verified review and test results, when they exist.

## Procedure

1. Inspect the current repository state relevant to the documentation under review.
2. Compare documented claims with actual files, code behavior, and recorded verification evidence.
3. Update only the documents that are directly supported by the repository state.
4. Preserve traceability across user story, requirements, architecture, implementation planning, implementation, review, verification, and PR preparation artifacts.
5. Leave unsupported claims out. If evidence is missing, state that it is missing.

## Documentation Rules

- Never fabricate approvals, execution results, PR state, or implementation status.
- Do not modify application code when the task is documentation-only.
- Do not broaden scope while synchronizing documentation.
- Prefer minimal factual edits over speculative cleanup.

## Expected Output

- Documentation updates backed by actual repository state.
- Explicit notes about any gaps between documents and verified reality.

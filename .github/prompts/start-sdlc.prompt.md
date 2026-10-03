---
name: "Start SDLC Workflow"
description: "Start the Todo project SDLC workflow from docs/user-story.md using the SDLC Orchestrator Agent."
agent: "SDLC Orchestrator Agent"
argument-hint: "Optional note for this workflow run"
---

Start the SDLC workflow for this repository.

Required behavior:

- Read [docs/user-story.md](../../docs/user-story.md).
- Delegate phase work to specialized agents.
- Stop at HITL Gate #1 after requirements are prepared.
- Do not continue past a gate without explicit human approval.

Optional run note: ${input:Optional note for this workflow run}

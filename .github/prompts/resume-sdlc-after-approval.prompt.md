---
name: "Resume SDLC After Approval"
description: "Resume the Todo project SDLC workflow after a human has approved the current gate artifacts."
agent: "SDLC Orchestrator Agent"
argument-hint: "Paste the approval text and identify the gate"
---

Resume the SDLC workflow for this repository.

Human approval context: ${input:Paste the approval text and identify the gate}

Required behavior:

- Verify which HITL gate was approved.
- Continue from the next workflow phase only.
- Keep delegating work to specialized agents.
- Stop again at the next required gate.

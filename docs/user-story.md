# User Story

## Title

Simple Browser Todo Application for Agentic SDLC Demonstration

## Narrative

As a user,
I want a simple browser-based Todo application,
so that I can add, edit, and delete Todo items in a single page interface.

## Scope

- In scope: add Todo, edit Todo, delete Todo.
- Out of scope: completion tracking, persistence, authentication, backend services, databases, APIs, React, Node frameworks, filtering, categories, priorities, due dates, notifications, and third-party integrations.

## Acceptance Criteria

### AC-1 Add Todo

- Given the application is open, when the user enters text for a new Todo and submits it, then the Todo is added to the visible list.
- Empty Todo submissions are rejected with clear feedback or prevented by the UI.

### AC-2 Edit Todo

- Given a Todo exists, when the user chooses to edit it and submits updated text, then the visible list shows the updated Todo text.
- Empty edited text is rejected with clear feedback or prevented by the UI.

### AC-3 Delete Todo

- Given a Todo exists, when the user chooses to delete it, then the Todo is removed from the visible list.

## Notes

- This document is the source of truth for scope.
- The project demonstrates Agentic SDLC using GitHub Copilot custom agents and human approval gates.

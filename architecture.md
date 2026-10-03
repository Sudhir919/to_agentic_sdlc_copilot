# Architecture

Status: Completed for Architecture phase. Awaiting human review at HITL Gate #2.

Source of truth: [docs/user-story.md](docs/user-story.md)

Approved requirements input: [requirements.md](requirements.md)

## Architecture Overview

The application architecture remains intentionally simple and browser-only. It uses three static files under the existing `todo-app/` surface:

- `index.html` for the single-page document structure and user input controls.
- `styles.css` for presentation only.
- `app.js` for direct DOM event handling and in-memory Todo list behavior.

No backend, persistence layer, framework, build step, or external service is part of the design.

## Component Responsibilities

### Document Structure

- Provide a single-page layout containing:
- an input for new Todo text,
- a submit control for adding a Todo,
- a visible list region for current Todo items,
- edit and delete controls associated with each Todo item.

### Presentation Layer

- Keep styling separate from behavior.
- Support clear visibility of form controls, validation feedback, and the current Todo list.
- Avoid visual features that imply out-of-scope capabilities such as completion state, filtering, or categorization.

### Client Behavior Layer

- Hold the current Todo items in browser memory for the lifetime of the page session only.
- Add a Todo when the user submits non-empty text.
- Reject empty text for add and edit flows through prevention or clear feedback.
- Support editing an existing Todo item and updating the visible list immediately.
- Support deleting an existing Todo item and removing it from the visible list immediately.

## Data Model

The design needs only a minimal in-memory Todo representation:

- `id`: a client-side identifier used to target edit and delete actions.
- `text`: the current visible Todo content.

No completion flag, timestamps, priority fields, categories, persistence metadata, or server identifiers are included because they are out of scope.

## Interaction Flow

### Add Todo

1. The user enters text in the new Todo input.
2. The browser validates that the text is non-empty.
3. On valid submission, a new in-memory Todo item is created.
4. The visible list is re-rendered or updated to show the new item.

### Edit Todo

1. The user chooses the edit action for an existing item.
2. The browser presents an edit input path within the page flow.
3. The updated text is validated as non-empty.
4. The in-memory item is updated and the visible list reflects the new text.

### Delete Todo

1. The user chooses the delete action for an existing item.
2. The targeted in-memory item is removed.
3. The visible list is updated so the item no longer appears.

## Requirement Traceability

| Requirement                                       | Architectural support                                                      |
| ------------------------------------------------- | -------------------------------------------------------------------------- |
| FR-1 Single-page browser interface                | Static HTML document with browser-executed JavaScript and CSS only.        |
| FR-2 Enter text for a new Todo item               | Input control in the document structure for new Todo text.                 |
| FR-3 Add non-empty Todo to visible list           | Client behavior creates an in-memory item and updates the DOM list.        |
| FR-4 Prevent or reject empty new Todo submissions | Client-side validation in the add flow with prevention or feedback.        |
| FR-5 Initiate editing for an existing Todo        | Per-item edit control bound to the corresponding Todo item.                |
| FR-6 Show updated text after edit                 | Client behavior updates the in-memory item and refreshes the visible text. |
| FR-7 Prevent or reject empty edited text          | Client-side validation in the edit flow with prevention or feedback.       |
| FR-8 Delete an existing Todo item                 | Per-item delete control bound to the corresponding Todo item.              |
| FR-9 Remove deleted Todo from visible list        | Client behavior removes the item from memory and the DOM list.             |

## Assumptions

- The application runs entirely in a modern browser.
- Todo state only needs to last until the page is refreshed or closed.
- Direct DOM manipulation is preferred over abstraction layers because the scope is limited.

## Tradeoffs

- In-memory state keeps the design simple but means Todos do not persist across page reloads.
- Direct DOM manipulation is easy to reason about for this scope but is less scalable than a framework-based approach, which is intentionally excluded.
- Minimal data modeling reduces complexity and aligns with the narrow user story, but intentionally leaves out features that some Todo apps commonly include.

## Scope Alignment

- Included scope: add, edit, and delete Todo items only.
- Explicitly excluded as scope creep: completion tracking, persistence, authentication, backend services, databases, APIs, React, Node frameworks, filtering, categories, priorities, due dates, notifications, and third-party integrations.

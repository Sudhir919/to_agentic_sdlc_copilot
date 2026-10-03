const test = require("node:test");
const assert = require("node:assert/strict");

const { createTodoStore } = require("./app.js");

test("addTodo stores a non-empty todo", function () {
  const store = createTodoStore();
  const result = store.addTodo("Buy milk");

  assert.equal(result.ok, true);
  assert.deepEqual(store.getTodos(), [{ id: 1, text: "Buy milk" }]);
});

test("addTodo rejects empty text", function () {
  const store = createTodoStore();
  const result = store.addTodo("   ");

  assert.equal(result.ok, false);
  assert.equal(result.error, "Todo text cannot be empty.");
  assert.deepEqual(store.getTodos(), []);
});

test("updateTodo changes an existing todo", function () {
  const store = createTodoStore();
  const created = store.addTodo("Buy milk");
  const result = store.updateTodo(created.todo.id, "Buy bread");

  assert.equal(result.ok, true);
  assert.deepEqual(store.getTodos(), [{ id: 1, text: "Buy bread" }]);
});

test("updateTodo rejects empty edited text", function () {
  const store = createTodoStore();
  const created = store.addTodo("Buy milk");
  const result = store.updateTodo(created.todo.id, "  ");

  assert.equal(result.ok, false);
  assert.equal(result.error, "Todo text cannot be empty.");
  assert.deepEqual(store.getTodos(), [{ id: 1, text: "Buy milk" }]);
});

test("deleteTodo removes an existing todo", function () {
  const store = createTodoStore();
  const created = store.addTodo("Buy milk");
  const result = store.deleteTodo(created.todo.id);

  assert.equal(result.ok, true);
  assert.deepEqual(store.getTodos(), []);
});

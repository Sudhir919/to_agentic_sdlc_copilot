(function (global) {
  function normalizeTodoText(text) {
    return String(text || "").trim();
  }

  function validateTodoText(text) {
    return normalizeTodoText(text).length > 0;
  }

  function createTodoStore() {
    var todos = [];
    var nextId = 1;

    function getTodos() {
      return todos.slice();
    }

    function addTodo(text) {
      var normalizedText = normalizeTodoText(text);

      if (!validateTodoText(normalizedText)) {
        return { ok: false, error: "Todo text cannot be empty." };
      }

      var todo = {
        id: nextId++,
        text: normalizedText,
      };

      todos.push(todo);
      return { ok: true, todo: todo };
    }

    function updateTodo(id, text) {
      var normalizedText = normalizeTodoText(text);
      var todo = todos.find(function (item) {
        return item.id === id;
      });

      if (!todo) {
        return { ok: false, error: "Todo not found." };
      }

      if (!validateTodoText(normalizedText)) {
        return { ok: false, error: "Todo text cannot be empty." };
      }

      todo.text = normalizedText;
      return { ok: true, todo: todo };
    }

    function deleteTodo(id) {
      var index = todos.findIndex(function (item) {
        return item.id === id;
      });

      if (index === -1) {
        return { ok: false, error: "Todo not found." };
      }

      todos.splice(index, 1);
      return { ok: true };
    }

    return {
      addTodo: addTodo,
      updateTodo: updateTodo,
      deleteTodo: deleteTodo,
      getTodos: getTodos,
    };
  }

  function initTodoApp() {
    var form = document.getElementById("todoForm");
    var input = document.getElementById("todoInput");
    var submitButton = document.getElementById("submitButton");
    var cancelButton = document.getElementById("cancelButton");
    var feedback = document.getElementById("todoFeedback");
    var list = document.getElementById("todoList");
    var emptyState = document.getElementById("emptyState");

    if (
      !form ||
      !input ||
      !submitButton ||
      !cancelButton ||
      !feedback ||
      !list ||
      !emptyState
    ) {
      return;
    }

    var store = createTodoStore();
    var editingTodoId = null;

    function setFeedback(message) {
      feedback.textContent = message;
    }

    function resetForm() {
      editingTodoId = null;
      form.reset();
      submitButton.textContent = "Add Todo";
      cancelButton.hidden = true;
      setFeedback("");
      input.focus();
    }

    function enterEditMode(todo) {
      editingTodoId = todo.id;
      input.value = todo.text;
      submitButton.textContent = "Save Todo";
      cancelButton.hidden = false;
      setFeedback("");
      input.focus();
      input.select();
    }

    function renderTodos() {
      var todos = store.getTodos();

      list.innerHTML = "";
      emptyState.hidden = todos.length > 0;

      todos.forEach(function (todo) {
        var item = document.createElement("li");
        item.className = "todo-item";

        var text = document.createElement("span");
        text.className = "todo-text";
        text.textContent = todo.text;

        var actions = document.createElement("div");
        actions.className = "todo-actions";

        var editButton = document.createElement("button");
        editButton.type = "button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
          enterEditMode(todo);
        });

        var deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          store.deleteTodo(todo.id);
          if (editingTodoId === todo.id) {
            resetForm();
          }
          renderTodos();
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        item.appendChild(text);
        item.appendChild(actions);
        list.appendChild(item);
      });
    }

    form.addEventListener("submit", function (event) {
      var result;

      event.preventDefault();

      if (editingTodoId === null) {
        result = store.addTodo(input.value);
      } else {
        result = store.updateTodo(editingTodoId, input.value);
      }

      if (!result.ok) {
        setFeedback(result.error);
        input.focus();
        return;
      }

      renderTodos();
      resetForm();
    });

    cancelButton.addEventListener("click", function () {
      resetForm();
    });

    renderTodos();
    resetForm();
  }

  var api = {
    createTodoStore: createTodoStore,
    normalizeTodoText: normalizeTodoText,
    validateTodoText: validateTodoText,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.TodoApp = api;

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initTodoApp);
    } else {
      initTodoApp();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);

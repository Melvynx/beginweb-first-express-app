const todoList = document.querySelector(".todo-list");

function toggleTodoCompletion(event) {
  if (!(event.target.type === "checkbox")) {
    return;
  }

  const todoId = event.target.closest(".todo-item").dataset.id;
  const isCompleted = event.target.checked;

  // Send a request to update the todo status
  fetch(`/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ completed: isCompleted }),
  }).then((res) => {
    if (!res.ok) return;
    event.target.checked = isCompleted;
  });
}

function deleteTodoItem(event) {
  if (!event.target.classList.contains("delete-button")) {
    return;
  }

  const todoItem = event.target.closest(".todo-item");
  const todoId = todoItem.dataset.id;

  // Send a request to delete the todo
  fetch(`/todos/${todoId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) return;
    todoItem.remove();
  });
}

// Attach event listeners
todoList.addEventListener("change", toggleTodoCompletion);
todoList.addEventListener("click", deleteTodoItem);

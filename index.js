import express from "express";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

async function loadTodos() {
  const data = await fs.readFile("todos.json", "utf-8");
  return JSON.parse(data);
}

let todos = await loadTodos();

async function editTodos(newTodos) {
  todos = newTodos;
  await fs.writeFile("todos.json", JSON.stringify(todos));
}

app.get("/", async (req, res) => {
  res.header("Content-Type", "text/html");
  console.log(todos);
  res.send(`
<head>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <main>
    <h1>My ugly todos !</h1>
    <form action="/todos" method="post">
      <input type="text" name="title" />
      <button type="submit">Create</button>
    </form>
    <ul class="todo-list">
      ${todos
        .map(
          (todo) => `<li class="todo-item" data-id="${todo.id}">
        <input type="checkbox" class="todo-checkbox" ${
          todo.completed ? "checked" : ""
        } />
        ${todo.title}
        <button class="delete-button">Delete</button>
      </li>`
        )
        .join("")}

    </ul>
  </main>
  <script src="/script.js"></script>
</body>`);
});

app.post("/todos", async (req, res) => {
  // get form data from request
  const { title } = req.body;
  await editTodos([...todos, { id: Date.now(), title, completed: false }]);
  res.redirect("/");
});

app.patch("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  await editTodos(
    todos.map((todo) =>
      todo.id === parseInt(id) ? { ...todo, completed } : todo
    )
  );

  res.header("Content-Type", "text/json");
  res.send(JSON.stringify({ success: true }));
});

app.delete("/todos/:id", async (req, res) => {
  const todoId = parseInt(req.params.id, 10);
  todos = todos.filter((todo) => todo.id !== todoId);
  await fs.writeFile("todos.json", JSON.stringify(todos));
  res.header("Content-Type", "text/json");
  res.send(JSON.stringify({ success: true }));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

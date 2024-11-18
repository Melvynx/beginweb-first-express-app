import express from "express";
import fs from "fs/promises";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

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
  res.send(`
<main>
  <h1>My ugly todos !</h1>
  <form action="/create-todo" method="post">
    <input type="text" name="title" />
    <button type="submit">Create</button>
  </form>
  <ul>
    ${todos.map((todo) => `<li>${todo.title}</li>`).join("")}
  </ul>
</main>`);
});

app.post("/create-todo", async (req, res) => {
  // get form data from request
  const { title } = req.body;
  await editTodos([
    ...todos,
    { id: todos.length + 1, title, completed: false },
  ]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

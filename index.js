const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const todos = [
  { id: 1, title: "Buy milk", completed: false },
  { id: 2, title: "Buy bread", completed: true },
  { id: 3, title: "Buy eggs", completed: false },
];

app.get("/", (req, res) => {
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

app.post("/create-todo", (req, res) => {
  // get form data from request
  const { title } = req.body;
  todos.push({ id: todos.length + 1, title, completed: false });
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

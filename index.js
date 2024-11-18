const express = require("express");
const app = express();
const port = 3000;

const todos = [
  { id: 1, title: "Buy milk", completed: false },
  { id: 2, title: "Buy bread", completed: true },
  { id: 3, title: "Buy eggs", completed: false },
];

app.get("/", (req, res) => {
  res.header("Content-Type", "text/html");
  res.send(`<h1>My ugly todos !</h1>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

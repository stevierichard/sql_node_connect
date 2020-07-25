const express = require("express");
const router = express.Router();
const { seeAllTodos, showTodo, addTodo, editTodo } = require("../connection");

router.get("/api", (req, res) => {
  seeAllTodos()
    .then((allTodos) => res.send(allTodos))
    .catch((err) => res.send(err));
});

router.get("/api/find/:id", (req, res) => {
  const id = parseInt(req.params.id);
  showTodo(id)
    .then((todo) => res.send(todo))
    .catch((err) => res.send(err));
});

router.post("/api", (req, res) => {
  const userText = req.body.text;
  addTodo(userText)
    .then((addTodos) => res.send(addTodos))
    .catch((err) => res.send(err));
});

router.delete("/api/delete/:id", (req, res) => {
  const toDelete = parseInt(req.params.id);
  deleteTodo(toDelete)
    .then((del) => res.send(del))
    .catch((err) => res.send(err));
});

router.patch("/api", (req, res) => {
  editTodo({
    todoText: req.body.todoText,
    todoId: parseInt(req.body.todoId),
    todoCompleted: req.body.todoCompleted === "false" ? false : true,
  })
    .then((editResponse) => res.json(editResponse))
    .catch((err) => res.json(err));
});

module.exports = router;

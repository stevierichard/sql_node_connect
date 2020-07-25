const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "2583",
  database: "todo_db",
});

connection.connect((err) => {
  if (err) throw err;
});

//route to see All todos
const seeAllTodos = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

//route to see a single todo by id
const showTodo = (todoId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM todos WHERE ?",
      [{ id: todoId }],
      (err, data) => (err ? reject(err) : resolve(data))
    );
  });
};

//add a todo
const addTodo = (userText) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO todos SET ?", [{ text: userText }], (err) => {
      err ? reject(err) : resolve({ msg: "successful added" });
    });
  });
};

const deleteTodo = (toDelete) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM todos WHERE ?", [{ id: toDelete }], (err) => {
      err ? reject(err) : resolve({ msg: "sucessful deleted" });
    });
  });
};

const editTodo = (obj) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE todos SET ? WHERE ?",
      [
        { text: obj.todoText, completed: obj.todoCompleted },
        { id: obj.todoId },
      ],
      (err) => {
        err ? reject(err) : resolve({ msg: "Updated successful" });
      }
    );
  });
};

module.exports = { seeAllTodos, showTodo, addTodo, deleteTodo, editTodo };

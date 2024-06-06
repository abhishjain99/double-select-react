const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// We have 2 different paths as these are relative paths wrt the read and write directories.
// Reading is done from src/components/TFCRTK_express_jwt/BackEnd/server.js
// Writing is done deom react-todolist where the node is running
const DB_FILE_READ_PATH = "../../../../db.json";
const DB_FILE_WRITE_PATH = "./db.json"

// read from database on page load
let db;
try {
  db = require(DB_FILE_READ_PATH);
} catch (err) {
  console.error('Failed to load db.json:', err);
  db = { todos: [], users: [] };
}

// middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// write in database
const writeDB = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_FILE_WRITE_PATH, JSON.stringify(data, null, 2), (err) => { if(err) throw err; })
    resolve();
  })
}

// FETCH todos
app.get('/todos', (req, res) => {
  res.json(db.todos);
})

// CREATE new todo
app.post('/todos', async (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    content: req.body.content
  };
  db.todos.push(newTodo);
  try {
    await writeDB(db);
    res.status(201).json(newTodo);
  } catch(err) {
    res.status(500).json({error: "Failed to write to database"});
  }
})

// UPDATE todos

// DELETE todos
app.delete('/todos/:id', async (req, res) => {
  db.todos = db.todos.filter((todo) => todo.id !== req.params.id);
  try {
    await writeDB(db);
    res.status(204).send(db);
  } catch(err) {
    res.status(500).json({error: "Failed to write to database"});
  }
})
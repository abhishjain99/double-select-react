const express = require("express");
const cors = require('cors');
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
const DB_FILE_READ_PATH = "../../../../db.json";
const DB_FILE_WRITE_PATH = "./db.json"



// COMMON //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// read from database on page load
let db;
try {
  db = require(DB_FILE_READ_PATH);
} catch (err) {
  console.error('Failed to load db.json:', err);
  db = { todos: [], users: [] };
}

// write in database
const writeDB = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(DB_FILE_WRITE_PATH, JSON.stringify(data, null, 2), (err) => { if (err) throw err; })
    resolve();
  });
}



// AUTHENTICATION //
const jwt = require('jsonwebtoken');

const SECRET_KEY = "ElPsiCongroo";

// middleware to log authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;
  if(!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if(err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  })
}

// SIGNUP
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if(db.users.find(user => user.username === username)) {
    return res.status(400).json({message: "User already exists"});
  }

  const newUser = { id: Date.now().toString(), username, password }
  db.users.push(newUser);
  writeDB(db);

  const token = jwt.sign({ username }, SECRET_KEY);
  res.status(201).json({ token });
})

// LOGIN
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const existingUser = db.users.find(user => user.username === username && user.password === password);
  if(existingUser) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
  }
  else {
    return res.status(400).json({message: "Invalid Credentials"});
  }
})



// TODOS //
// FETCH todos
app.get('/todos', authenticateToken, (req, res) => {
  res.json(db.todos);
});

// CREATE new todo
app.post('/todos', authenticateToken, async (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    content: req.body.content
  };
  db.todos.push(newTodo);
  try {
    await writeDB(db);
    await res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({error: "Failed to write to database"});
  }
});

// UPDATE todos
app.patch('/todos/:id', authenticateToken, async (req, res) => {
  const existingTodo = db.todos.find((todo) => todo.id === req.params.id);
  if (existingTodo) {
    existingTodo.content = req.body.content;
    try {
      await writeDB(db);
      await res.json(existingTodo);
    } catch (err) {
      res.status(500).json({error: "Failed to update to database"});
    }
  } else {
    res.status(404).send("Todo Not found");
  }
});

// DELETE todos
app.delete('/todos/:id', authenticateToken, async (req, res) => {
  db.todos = db.todos.filter((todo) => todo.id !== req.params.id);
  try {
    await writeDB(db);
    await res.status(204).send(db);
  } catch (err) {
    res.status(500).json({error: "Failed to delete from database"});
  }
});

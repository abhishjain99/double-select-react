const express = require("express");
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;

// COMMON //
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
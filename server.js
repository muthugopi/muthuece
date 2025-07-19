const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🔁 Store users in memory
const users = [];

// ✅ Register Route
app.post('/register', (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ success: false, message: "Name and password are required" });
  }

  const existingUser = users.find(u => u.name === name);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Username already exists!" });
  }

  users.push({ name, password });
  res.json({ success: true, message: "Registered successfully!" });
});

// ✅ Login Route
app.post('/login', (req, res) => {
  const { name, password } = req.body;

  const user = users.find(u => u.name === name && u.password === password);
  if (user) {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("🚀 Auth Server running at http://localhost:3000");
});
app.get('/users', (req, res) => {
  res.json(users);
});
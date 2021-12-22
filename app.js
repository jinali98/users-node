const express = require("express");
const users = require("./src/api/users/users.controller");
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/v1/users", users);

// server
app.listen(8000, () => {
  console.log("app is running on port 8000");
});

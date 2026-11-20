const express = require("express");
const path = require("path");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

// Register student API routes
app.use("/api/students", studentRoutes);

module.exports = app;
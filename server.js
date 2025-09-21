// server.js (CommonJS)
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// health route (correct arrow function)
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// start server
const PORT =  5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

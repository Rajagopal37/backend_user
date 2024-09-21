const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to the database
connectDB();

// Define routes
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);

// Define a root route
app.get("/", (req, res) => res.send("API is running"));

// Use process.env to get the port and backend URL
const PORT = process.env.PORT || 5000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${BACKEND_URL}:${PORT}`);
});

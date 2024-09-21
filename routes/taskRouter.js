const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// @route   GET /api/tasks
// @access  Private
router.get("/", protect, getTasks);

// @route   POST /api/tasks
// @access  Private
router.post("/", protect, createTask);

// @route   PUT /api/tasks/:id
// @access  Private
router.put("/:id", protect, updateTask);

// @route   DELETE /api/tasks/:id
// @access  Private
router.delete("/:id", protect, deleteTask);

module.exports = router;

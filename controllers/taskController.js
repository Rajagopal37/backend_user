const Task = require("../models/taskModel");

//     Get all tasks
//     GET /api/tasks
//     Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//     Create a new task
//     POST /api/tasks
//     Private
exports.createTask = async (req, res) => {
  const { name, description, status, assignDate, lastDate } = req.body;

  if (!name || !description || !assignDate || !lastDate) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    const newTask = new Task({
      name,
      description,
      status,
      assignDate,
      lastDate,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//     Update a task
//     PUT /api/tasks/:id
//     Private
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//     Delete a task
//     DELETE /api/tasks/:id
//     Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json({ message: "Task removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

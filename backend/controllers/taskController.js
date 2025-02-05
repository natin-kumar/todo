const Task = require("../models/Todo");
const { v4: uuidv4 } = require("uuid"); // For generating unique task IDs

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status, date, subtask, progress } = req.body;

    // Generate a unique taskId
    const taskId = uuidv4();

    // Create a new task
    const task = await Task.create({
      taskId, // Add the generated taskId
      title,
      description,
      status,
      date,
      subtask,
      progress,
      user: req.user.id, // Assuming the user ID is attached to the request by the auth middleware
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Fetch tasks for the logged-in user
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:taskId
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status, date, subtask, progress } = req.body;
    const taskId = req.params.taskId; // Use taskId instead of _id

    // Find the task by taskId and ensure it belongs to the logged-in user
    const task = await Task.findOne({ taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task fields
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.date = date || task.date;
    task.subtask = subtask || task.subtask;
    task.progress = progress || task.progress;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:taskId
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId; // Use taskId instead of _id

    // Find the task by taskId and ensure it belongs to the logged-in user
    const task = await Task.findOne({ taskId, user: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
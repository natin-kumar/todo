const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskId: { type: String, unique: true, required: true }, 
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed", "todo"], default: "todo" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Number, required: true },
  subtask: { type: Number, required: true },
  progress: { type: Number, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
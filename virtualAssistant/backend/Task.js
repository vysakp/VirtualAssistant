const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  category: String,
  title: String,
  description: String,
  time: { type: Date, default: Date.now },
  isDone: Boolean,
  username: String,
});

const TaskModel = new mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;

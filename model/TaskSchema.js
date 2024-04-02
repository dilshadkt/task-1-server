const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  descitption: {
    type: String,
  },
  userId: {
    type: String,
  },
});

const Task = mongoose.model("Tasks", taskSchema);

exports.Task = Task;

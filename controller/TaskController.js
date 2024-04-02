const { Task } = require("../model/TaskSchema");
const { User } = require("../model/UserSchema");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = {
      title,
      description,
    };
    const CurrentUser = await User.findById(req.user._id);
    CurrentUser.task.push(newTask);
    await CurrentUser.save();
    res.status(201).send("successfully added");
  } catch (error) {
    res.status(400).send(error);
  }
};
const CurrentUser = async (req, res) => {
  try {
    const CurrentUser = await User.findById(req.user._id);
    res.status(200).json({ CurrentUser });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = { createTask, CurrentUser };

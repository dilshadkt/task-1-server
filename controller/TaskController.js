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

const deleteTask = async (req, res) => {
  try {
    const ItemId = req.query.taskId;
    const CurrentUser = await User.findById(req.user._id);
    const updatedUser = CurrentUser.task.filter((item) => item.id !== ItemId);
    await CurrentUser.save();
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

const EditTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ItemId = req.query.taskId;
    const CurrentUser = await User.findById(req.user._id);
    const newTask = {
      title,
      description,
    };
    const updatedUser = CurrentUser.task.map((item) =>
      item.id === ItemId ? newTask : item
    );
    await CurrentUser.save();
    res.status(200).json({ updatedUser });
  } catch (error) {}
};

module.exports = { createTask, CurrentUser, deleteTask };

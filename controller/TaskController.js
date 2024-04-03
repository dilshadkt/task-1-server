const { Task } = require("../model/TaskSchema");
const { User } = require("../model/UserSchema");

const createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = {
      title,
      description,
      _id: new Date().toISOString(),
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
    const CurrentUser = await User.findById(req.user._id).populate("Tasks");

    res.status(200).json({ CurrentUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const ItemId = req.query.id;

    const CurrentUser = await User.findById(req.user._id);
    const updatedTask = CurrentUser.task.filter(
      (item) => item._id.toString() !== ItemId.toString()
    );
    CurrentUser.task = updatedTask;
    await CurrentUser.save();
    res.status(200).json({ updatedTask });
  } catch (error) {
    res.status(400).send(error);
  }
};

const EditTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ItemId = req.query.taskId;

    const CurrentUser = await User.findById(req.user._id);
    const newTask = req.body;
    console.log(newTask);
    const updatedTask = CurrentUser.task.map((item) =>
      item._id === ItemId ? { ...newTask, _id: ItemId } : item
    );
    CurrentUser.task = updatedTask;
    await CurrentUser.save();
    res.status(200).json({ CurrentUser });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { createTask, CurrentUser, deleteTask, EditTask };

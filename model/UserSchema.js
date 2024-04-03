const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Task } = require("./TaskSchema");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  task: {
    type: Array,
  },
  Tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tasks",
  },
});

userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username },
    process.env.JWT_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;

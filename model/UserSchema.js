const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
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

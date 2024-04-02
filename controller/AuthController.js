const { User } = require("../model/UserSchema");
const SignIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "field is required" });
  }
  try {
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
    res.status(201).send("user is created");
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const LogIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (!user) {
      return res.status(400).send("invalid username and password");
    }
    const token = user.generateToken();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { SignIn, LogIn };

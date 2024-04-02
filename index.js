const experss = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = experss();
const taskRouter = require("./router/TaskRouter");
const authRoute = require("./router/AuthRoute");

app.use(experss.json());
app.use(cors());

//////////// monogo connection //////////////

mongoose
  .connect(process.env.MONOG_CONNECTION_STRING)
  .then(() => console.log("connection is good"))
  .catch((error) => console.log(error));

app.use("/home", taskRouter);
app.use("/auth", authRoute);

app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is connected with port ${process.env.PORT}`);
  }
});

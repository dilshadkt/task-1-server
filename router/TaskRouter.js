const router = require("express").Router();
const {
  createTask,
  CurrentUser,
  deleteTask,
  EditTask,
} = require("../controller/TaskController");
const verifyToken = require("../middleware/VerifyToken");
router.post("/add", verifyToken, createTask);
router.get("/", verifyToken, CurrentUser);
router.delete("/", verifyToken, deleteTask);
router.patch("/edit", verifyToken, EditTask);

module.exports = router;

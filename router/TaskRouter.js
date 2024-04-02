const router = require("express").Router();
const {
  createTask,
  CurrentUser,
  deleteTask,
} = require("../controller/TaskController");
const verifyToken = require("../middleware/VerifyToken");
router.post("/add", verifyToken, createTask);
router.get("/", verifyToken, CurrentUser);
router.delete("/", verifyToken, deleteTask);

module.exports = router;

const router = require("express").Router();
const { createTask, CurrentUser } = require("../controller/TaskController");
const verifyToken = require("../middleware/VerifyToken");
router.post("/add", verifyToken, createTask);
router.get("/", verifyToken, CurrentUser);

module.exports = router;

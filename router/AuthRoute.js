const router = require("express").Router();
const { SignIn, LogIn } = require("../controller/AuthController");

router.post("/signin", SignIn);
router.post("/login", LogIn);

module.exports = router;

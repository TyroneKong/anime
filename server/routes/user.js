const express = require("express");
const { verifyToken } = require("../auth");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

//using middleware to verify token, before accessing api
router.post("/personal", verifyToken, userController.personal);

module.exports = router;

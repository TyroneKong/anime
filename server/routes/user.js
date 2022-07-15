const express = require("express");
const { verifyToken } = require("../auth");
const router = express.Router();
const { registerUser, loginUser, personal } = require("../controllers/users");

router.post("/register", registerUser);

router.post("/login", loginUser);

//using middleware to verify token, before accessing api
router.post("/personal", verifyToken, personal);

module.exports = router;

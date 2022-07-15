const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// middleware

// create a new token
const createToken = (user) => {
  const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {
    expiresIn: "15s",
  });
  return token;
};

//verify token middleware
const verifyToken = (req, res, next) => {
  const { accesstoken } = req.body;
  console.log(accesstoken);
  console.log("verify stage");
  // edge case
  if (!accesstoken)
    return res.status(400).json({ error: "User not authenticated" });

  try {
    const validToken = verify(accesstoken, process.env.TOKEN_KEY);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { verifyToken };

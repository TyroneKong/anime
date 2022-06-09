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

//verify token
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "User not authenticated" });

  try {
    const validToken = verify(accessToken, process.env.TOKEN_KEY);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { verifyToken };

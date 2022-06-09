const bcrypt = require("bcryptjs/dist/bcrypt");
let User = require("../models/users.model");
const jwt = require("jsonwebtoken");

//controller to register user
exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    } else {
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    console.log(user);

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.personal = (req, res) => {
  const { first_name } = req.body;
  res.status(200).send(`User:${first_name} authenticated`);
};

//controller to login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // if no email and password in body
    if (!(email && password)) {
      res.status(400).send("All input is required!");
    }
    // locate user by email
    const user = await User.findOne({ email });
    console.log(user.password);
    // hash the password
    const hashedPassword = user.password;

    //compare the hashed password to the one user is providing in the body and see if they match
    bcrypt.compare(password, hashedPassword).then((match) => {
      if (!match) {
        res
          .status(400)
          .json("You have entered the wrong username and password combination");
      } else {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        user.token = token;

        res.cookie("access-token", token, {
          maxAge: 60 * 60 * 24 * 30 * 1000,
          httpOnly: true,
        });

        res.status(200).json(user);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

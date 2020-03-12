const express = require("express");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("./verifyToken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Valisdate user befor save to database
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // Check if user already exist
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).send("email already exist..");
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ user });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Valisdate user before login
  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).json({
      success: true,
      data: error.details[0].message
    });
  }

  // Check if user already exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      data: "user not found."
    });
  }

  // Check the password
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json({
      success: false,
      data: "Password Incorrect."
    });
  }

  // create token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res.header("auth-token", token).json({ token, user });
});

// @route  GET api/auth
// @desc   Get logged in user
// access  Private
router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

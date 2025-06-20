const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const user = require("../models/user");
require("dotenv").config();

const router = express.Router(); 

const JWT_SECRET = process.env.JWT_SECRET ;


router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" }); 
  } catch (err) {
    console.log("error",err)
    res.status(500).json({ message: "Server error in signup", error: err.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }); 
    if (!existingUser) {
      return res.status(400).json({ message: "Please sign up first" });
    }

    const valid = await bcrypt.compare(password, existingUser.passwordHash); 
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: existingUser._id,username:existingUser.username, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      token,
      userid: existingUser._id,
      username: existingUser.username,
      message:"login successfull"
    });
    console.log("success")
    
    
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;

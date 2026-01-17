const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");
require("dotenv").config();


router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ success:false, message: "User already exists" });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name:username, email, password: hashedPassword });

    await user.save();

    const payload = { user: { id: user._id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json(
      { 
        success:true, 
        token, 
        user: {
          id: user._id, 
          name: user.name, 
          email: user.email 
        } 
      });

  } catch (err) {
    console.error("Register error:", err); 
    return res.status(500).json(
      { 
        success:false ,
        message: "Server error", 
        error: err.message
      });
  }
});



router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({success:false ,message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({success:false ,message: "Invalid Password" });

    const payload = { user: { id: user._id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    res.json({ success:true, token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).send("Server error");
  }
});


router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({success:true,user});
  } catch (err) {
    res.status(500).json({success:false,message:"Server error"});
  }
});

module.exports = router;

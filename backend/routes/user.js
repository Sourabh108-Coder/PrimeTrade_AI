const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.put("/profile", auth, async (req, res) => {
  try {
    const { username , password } = req.body;
    const updatedFields = {};

    if (username) updatedFields.name = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updatedFields.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updatedFields },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

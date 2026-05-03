const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const auth = require("../middleware/auth");

// ==============================
// 🔥 SEED ADMIN (FIXED)
// ==============================
router.get("/seed", async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL || "sohel@admin.com";
    const password = process.env.ADMIN_PASSWORD || "Admin@123";

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ message: "Admin already exists" });
    }

    // 🔥 HASH PASSWORD (IMPORTANT FIX)
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name: "Sohel Khan",
      email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    res.json({
      message: "Admin created successfully",
      email,
      password, // ⚠️ dev only (production में हटा देना)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// 🔥 LOGIN (WORKING)
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 PASSWORD MATCH
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 TOKEN
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// 🔥 GET CURRENT USER
// ==============================
router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;

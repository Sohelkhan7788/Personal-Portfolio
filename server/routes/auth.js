const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const auth = require("../middleware/auth");

// ==============================
// 🔥 SEED ADMIN (ALWAYS FRESH)
// ==============================
router.get("/seed", async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL || "sohel@admin.com";
    const password = process.env.ADMIN_PASSWORD || "Admin@123";

    // 🔥 OLD USER DELETE (IMPORTANT)
    await User.deleteMany({ email });

    // 🔥 HASH PASSWORD
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
      password, // dev only
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// 🔥 LOGIN (WITH DEBUG)
// ==============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    console.log("ENTERED PASSWORD:", password);
    console.log("DB HASH:", user?.password);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("MATCH RESULT:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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

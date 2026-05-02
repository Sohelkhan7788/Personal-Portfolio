const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Seed admin (run once)
router.post('/seed', async (req, res) => {
  try {
    const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) return res.json({ message: 'Admin already exists' });
    
    const admin = new User({
      name: 'Sohel Khan',
      email: process.env.ADMIN_EMAIL || 'sohel@admin.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'admin'
    });
    await admin.save();
    res.json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  res.json(req.user);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");
const auth = require("../middleware/auth");

// ==============================
// GET all skills
// ==============================
router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1 });

    res.json(skills); // ✅ ALWAYS ARRAY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// CREATE skill
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();

    res.status(201).json(saved); // ✅ SINGLE OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// UPDATE skill
// ==============================
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Skill not found" });

    res.json(updated); // ✅ SINGLE OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// DELETE skill
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);

    res.json({ message: "Skill deleted" }); // ✅ SIMPLE RESPONSE
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

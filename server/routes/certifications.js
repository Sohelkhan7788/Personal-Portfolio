const express = require("express");
const router = express.Router();
const Certification = require("../models/Certification");
const auth = require("../middleware/auth");

// ==============================
// GET all published certifications (public)
// ==============================
router.get("/", async (req, res) => {
  try {
    const certs = await Certification.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(certs); // ✅ ALWAYS ARRAY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// GET all certifications (admin)
// ==============================
router.get("/admin/all", auth, async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1, createdAt: -1 });

    res.json(certs); // ✅ ALWAYS ARRAY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// CREATE certification
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const cert = new Certification(req.body);
    const saved = await cert.save();

    res.status(201).json(saved); // ✅ SINGLE OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// UPDATE certification
// ==============================
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updated)
      return res.status(404).json({ message: "Certification not found" });

    res.json(updated); // ✅ SINGLE OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// DELETE certification
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);

    res.json({ message: "Certification deleted" }); // ✅ SIMPLE RESPONSE
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

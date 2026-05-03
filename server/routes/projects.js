const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// ==============================
// GET all published projects (public)
// ==============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ status: "published" }).sort({
      order: 1,
      createdAt: -1,
    });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// GET all projects (admin)
// ==============================
router.get("/admin/all", auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects); // ✅ ALWAYS ARRAY
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// GET single project
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// CREATE project (FIXED)
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();

    res.status(201).json(savedProject); // ✅ ONLY CREATED OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// UPDATE project
// ==============================
router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: "Project not found" });

    res.json(updated); // ✅ ONLY UPDATED OBJECT
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// DELETE project (FIXED)
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted" }); // ✅ SIMPLE RESPONSE
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

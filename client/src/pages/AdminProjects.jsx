const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// ==============================
// 🔥 GET PUBLIC PROJECTS
// ==============================
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ status: "published" }).sort({
      createdAt: -1,
    });

    res.json(projects || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==============================
// 🔥 GET ALL (ADMIN)
// ==============================
router.get("/admin/all", auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.json(projects || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==============================
// 🔥 GET SINGLE
// ==============================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ==============================
// 🔥 CREATE PROJECT (FIXED)
// ==============================
router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = new Project({
      title,
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
      liveUrl: liveUrl || "",
      githubUrl: githubUrl || "",
      status: status || "published",
    });

    const saved = await project.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// 🔥 UPDATE PROJECT
// ==============================
router.put("/:id", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      liveUrl,
      githubUrl,
      status,
    } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        technologies: Array.isArray(technologies) ? technologies : [],
        liveUrl,
        githubUrl,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// ==============================
// 🔥 DELETE PROJECT
// ==============================
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Certification = require('../models/Certification');
const Skill = require('../models/Skill');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const [projects, certifications, skills, messages, unreadMessages] = await Promise.all([
      Project.countDocuments(),
      Certification.countDocuments(),
      Skill.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ read: false })
    ]);
    res.json({ projects, certifications, skills, messages, unreadMessages });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

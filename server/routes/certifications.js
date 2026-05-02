const express = require('express');
const router = express.Router();
const Certification = require('../models/Certification');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const certs = await Certification.find({ status: 'published' }).sort({ order: 1, createdAt: -1 });
    res.json(certs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/admin/all', auth, async (req, res) => {
  try {
    const certs = await Certification.find().sort({ order: 1 });
    res.json(certs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const cert = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cert);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;

const express = require('express'); // Imports the Express framework ,Express helps create servers and APIs easily
const router = express.Router();
const Url = require('../models/urlSaver');

// Create new URL
router.post('/createUrl', async (req, res) => {
  try {
    const { url, description } = req.body;
    const newUrl = new Url({ url, description });
    const saved = await newUrl.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all URLs
router.get('/getAllUrl', async (req, res) => {
  const urls = await Url.find().sort({ createdAt: -1 });
  res.json(urls);
});

module.exports = router;

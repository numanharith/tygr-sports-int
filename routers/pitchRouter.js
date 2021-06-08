const router = require('express').Router();
const Pitch = require('../models/pitchModel');
const auth = require('../middleware/auth');

// Add a new pitch
router.post('/', auth, async (req, res) => {
  try {
    const { name, address, postalCode, image } = req.body;
    const newPitch = new Pitch({ name, address, postalCode, image });
    const savedPitch = await newPitch.save();
    res.json(savedPitch);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Get all pitches
router.get('/', async (req, res) => {
  try {
    const pitch = await Pitch.find();
    res.json(pitch);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
module.exports = router;

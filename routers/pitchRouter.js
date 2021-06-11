const router = require('express').Router();
const auth = require('../middleware/auth');

// Models
const Pitch = require('../models/pitchModel');
const Booking = require('../models/bookingModel');
const Profile = require('../models/profileModel');

// Add a new pitch
router.post('/', auth, async (req, res) => {
  try {
    const { name, address, postalCode, url } = req.body;
    const image = url;

    // Sends error if admin submits form without filling all the fields
    if (!name || !address || !postalCode || !image) return res.status(422).json({ error: 'Please fill all the fields!' });

    // Get form data
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
    const pitches = await Pitch.find();
    res.json(pitches);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Admin deletes pitch
router.delete('/delete/:pitchId', async (req, res) => {
  try {
    const pitchId = req.params.pitchId;

    // Get all bookingIds that ref the pitchId
    const bookingsId = await Booking.find({ pitch: pitchId }).select('_id');
    const bookingsIdArray = bookingsId.map((bookingId) => bookingId._id);

    // Pulls bookingId (that ref the pitchId) from every users' Profile bookings array
    await Profile.updateMany({}, { $pull: { bookings: { $in: bookingsIdArray } } }, { multi: true });

    // Pulls all bookings from Booking model that ref the pitchId
    await Booking.deleteMany({ pitch: pitchId }, { multi: true });

    // Deletes pitch from Pitch model
    await Pitch.findByIdAndDelete(pitchId);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

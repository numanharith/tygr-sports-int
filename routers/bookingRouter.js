const router = require('express').Router();
const Booking = require('../models/bookingModel');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Add a new booking
router.post('/createbooking', auth, async (req, res) => {
  try {
    const { pitch, start, end } = req.body;
    // pitch = mongoose.Types.ObjectId(pitch);
    const newBooking = new Booking({ pitch, start, end });
    const savedBooking = await newBooking.save();
    res.json(savedBooking);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Get all pitches
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

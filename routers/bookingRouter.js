const router = require('express').Router();
const Booking = require('../models/bookingModel');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');

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

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('pitch');
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// User joins booking
router.put('/join/:id', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    await Booking.findByIdAndUpdate(req.params.id, { $push: { users: verified.user } });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

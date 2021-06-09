const router = require('express').Router();
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');

// Get users's bookings to dispay on MyBookingsPage
router.get('/mybookings', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Populates both bookings and pitch (in the populated bookings object) using deep population
    const user = await User.findById(verified.user).populate({ path: 'bookings', populate: { path: 'pitch' } });
    res.json(user.bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Checks on BookingCard if user has joined the booking
router.get('/:bookingid', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(verified.user);
    if (user.bookings.includes(req.params.bookingid)) {
      res.json(true);
    } else {
      res.json(false);
    }
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

// User joins booking
router.put('/join/:id', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Add user id to booking's users array
    const booking = await Booking.findById(req.params.id);
    // If no user has already joined, .length can't be used as users array will be undefined.
    if (booking.users !== undefined) {
      if (booking.users.length < 2) {
        await Booking.findByIdAndUpdate(req.params.id, { $addToSet: { users: verified.user } });
      }
    } else {
      await Booking.findByIdAndUpdate(req.params.id, { $addToSet: { users: verified.user } });
    }

    // Add booking id to user's booking's array
    await User.findByIdAndUpdate(verified.user, { $addToSet: { bookings: req.params.id } });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

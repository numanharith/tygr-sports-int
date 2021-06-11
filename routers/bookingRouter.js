const router = require('express').Router();
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');

// Get users's bookings to dispay on MyBookingsPage
router.get('/mybookings', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const userid = verified.user;
    
    // Checks if user has already created a profile
    const user = await User.findById(userid);
    if (!user.profile) return res.status(400).json({ errorMessage: 'Please create a profile and proceed to join a booking!' });
    
    // Checks if user has any booking in his/her profile
    const profileCheckForBookings = await Profile.findOne({ user: userid })
    if (profileCheckForBookings.bookings == 0) return res.status(400).json({ errorMessage: 'You have not joined any booking yet!' });

    // Populates both bookings and pitch (in the populated bookings object) using deep population
    const profileHasBookings = await Profile.findOne({ user: userid }).populate({ path: 'bookings', populate: { path: 'pitch' } });
    res.json(profileHasBookings.bookings);
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
    const userId = verified.user;

    // Checks if user has an existing profile
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) {
      if (existingProfile.bookings.includes(req.params.bookingid)) {
        res.json(true);
      } else {
        res.json(false);
      }
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
    const userid = verified.user;

    // Checks if user has already created a profile
    const user = await User.findById(userid);
    if (!user.profile) return res.status(400).json({ errorMessage: 'Please create a profile before joining any booking!' });

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

    // Add booking id to user profile's booking's array
    await Profile.findOneAndUpdate({ user: userid }, { $addToSet: { bookings: req.params.id } });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// User cancels booking
router.put('/cancel/:id', async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const userid = verified.user;

    // Checks if user has already created a profile
    const user = await User.findById(userid);
    if (!user.profile) return res.status(400).json({ errorMessage: 'Please create a profile before joining any booking!' });

    // Removes user id from booking's users array
    const booking = await Booking.findById(req.params.id);
    // If no user has already joined, .length can't be used as users array will be undefined.
    await Booking.findByIdAndUpdate(req.params.id, { $pull: { users: verified.user } });

    // Removes booking id form user profile's booking's array
    await Profile.findOneAndUpdate({ user: userid }, { $pull: { bookings: req.params.id } });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

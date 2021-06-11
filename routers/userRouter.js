const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');
const Profile = require('../models/profileModel');

// Registers a new user
router.post('/', async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;

    // Form input validations
    if (!username || !password || !passwordVerify) return res.status(400).json({ errorMessage: 'Please enter all the required fields!' });
    if (password.length < 6) return res.status(400).json({ errorMessage: 'Please enter a password with at least 6 characters!' });
    if (password !== passwordVerify) return res.status(400).json({ errorMessage: 'The two passwords do not match!' });

    // Searches if username is already in use
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ errorMessage: 'The username entered is already in use!' });

    // Hashes password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Creates the new user
    const newUser = new User({ username, passwordHash });
    const savedUser = await newUser.save();

    // Logs the newly registered user in
    const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);

    // Sends token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true }).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ errorMessage: 'Please enter both the required fields!' });

    // Checks for existing account with username
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(401).json({ errorMessage: 'Wrong credentials has been entered!' });

    // Decrypts password and verify
    const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
    if (!passwordCorrect) return res.status(401).json({ errorMessage: 'Wrong credentials has been entered!' });

    // Logs the user in
    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET);

    // Sends token in HTTP-only cookie
    res.cookie('token', token, { httpOnly: true }).send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) }).send();
});

// Checks if user is logged in
router.get('/loggedin', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send();
    res.json(false);
  }
});

// Checks if user is an admin
router.get('/admin', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // const userId = verified.user
    const user = await User.findById(verified.user);
    if (user.isAdmin === true) res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send();
    res.json(false);
  }
});

// Get all users (For admins only)
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-passwordHash -__v -isAdmin').populate('profile');
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// Admin deletes user, along with its Profile and bookings
router.delete('/delete/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // deletes User model
    await User.findByIdAndDelete(userId);

    // Pull user's id from users array of any bookings that user has joined
    await Booking.updateMany({}, { $pull: { users: userId } }, { multi: true });

    // deletes user's Profile model
    await Profile.findOneAndDelete({ user: userId });

    res.json('User has been deleted from the database.');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;

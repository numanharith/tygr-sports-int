const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registers a new user
router.post('/', async (req, res) => {
  try {
    const { username, password, passwordVerify } = req.body;

    if (!username || !password || !passwordVerify) return res.status(400).json({ errorMessage: 'Please enter all the required fields!' });

    if (password.length < 6) return res.status(400).json({ errorMessage: 'Please enter a password with at least 6 characters!' });

    if (password !== passwordVerify) return res.status(400).json({ errorMessage: 'The two passwords do not match!' });

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
    if (!passwordCorrect) return res.status(401), json({ errorMessage: 'Wrong credentials has been entered!' });

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

module.exports = router;

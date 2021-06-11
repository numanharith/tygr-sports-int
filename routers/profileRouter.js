const router = require('express').Router();
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

// Creates profile
router.post('/me', auth, async (req, res) => {
  try {
    // Get current user's token to extract user id
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = verified.user;

    // Searches if current user already has a created profile
    const existingProfile = await Profile.findOne({ "user": user });
    if (existingProfile) return res.status(400).json({ errorMessage: 'You already have a profile!' });

    // Get form data
    const { height, weight, bio, url } = req.body;
    const imageUrl = url;

    // Sends error if user submits form without filling all the fields
    if (!height || !weight || !bio || !imageUrl) return res.status(422).json({ error: 'Please fill all the fields!' })

    // Saves created profile
    const newProfile = new Profile({ height, weight, bio, imageUrl, user });
    const savedProfile = await newProfile.save();
    res.json(savedProfile)

    // References created profile to User model
    await User.findByIdAndUpdate(user, { $set: { "profile": savedProfile._id } })
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
})

// Get current user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const token = req.cookies.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = verified.user;

    const profile = await Profile.findOne({ "user": user }).populate('user');
    if (!profile) return res.json(null);
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
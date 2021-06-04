const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { route } = require('./users');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // Fetches user's profile using its user id from the token (if any)
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
            'name',
            'avatar',
        ]);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/profile
// @desc    Create/Update current user's profile
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('height', 'Your height is required!').not().isEmpty(),
            check('weight', 'Your weight is required!').not().isEmpty(),
        ],
    ],
    async (req, res) => {
        // Checks for error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extracts form fields from request body
        const { height, weight, bio } = req.body;

        // Create an empty profile objects and saves the user's inputs into it
        const profileFields = {};
        profileFields.user = req.user.id;
        if (height) profileFields.height = height;
        if (weight) profileFields.weight = weight;
        if (bio) profileFields.bio = bio;

        try {
            // Fetch user's profile (if any)
            let profile = await Profile.findOne({ user: req.user.id });

            // If found
            if (profile) {
                // Update existing user's profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Else, create a new instance profile
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route   GET api/profile
// @desc    Get all users' profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
module.exports = router;

// @route   GET api/profile/user/:user_id
// @desc    Get a user's profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
            'name',
            'avatar',
        ]);
        
        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found!' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;

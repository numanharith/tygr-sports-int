const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
    '/',
    [
        check('name', 'A name is required!').not().isEmpty(),
        check('email', 'Please include a valid email!').isEmail(),
        check('password', 'Please enter a password with at least 12 characters!').isLength({ min: 12 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Checks for existing registered email (if any)
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({
                    errors: [{ msg: 'User already exists' }],
                });
            }

            // Fetches users' avatar (if any)
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            // Creates a new instance of user with users' inputs
            user = new User({
                name,
                email,
                avatar,
                password,
            });

            // Encrypts password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // Saves user to database
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Sign token
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;

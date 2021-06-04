const express = require('express');
const router = express.Router();

// @route   GET api/pitch
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Pitches route'));


module.exports = router;
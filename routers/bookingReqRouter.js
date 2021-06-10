const router = require('express').Router();
const BookingReq = require('../models/bookingReqModel');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const { pitch } = req.body;
    const newBookingReq = new BookingReq({ pitch });
    const savedBookingReq = await newBookingReq.save();
    res.json(savedBookingReq);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/', auth, async(req,res) => {
  try {
    const bookingReq = await BookingReq.find()
    res.json(bookingReq)
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
})
module.exports = router;

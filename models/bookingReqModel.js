const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookingReqSchema = new Schema({
  pitch: { type: String, required: true },
  // start: { type: Date, required: true },
  // end: { type: Date, required: true },
});

module.exports = model('BookingReq', bookingReqSchema );

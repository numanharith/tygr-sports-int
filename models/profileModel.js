const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const profileSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bio: { type: String },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
  date: { type: Date, default: Date.now() },
});

module.exports = model('Profile', profileSchema);

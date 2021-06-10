const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  start: { type: Date },
  end: { type: Date },
  pitch: { type: Schema.Types.ObjectId, ref: 'Pitch' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = model('Booking', bookingSchema);

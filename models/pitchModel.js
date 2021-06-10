const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pitchSchema = new Schema({
  name: { type: String },
  address: { type: String },
  postalCode: { type: Number },
  image: { type: String },
});

module.exports = model('Pitch', pitchSchema);

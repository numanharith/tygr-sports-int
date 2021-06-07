const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  }
});

module.exports = model('User', userSchema);

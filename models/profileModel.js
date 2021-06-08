const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bio: { type: String },
    date: { type: Date, default: Date.now() },
});

module.exports = model('Profile', ProfileSchema);

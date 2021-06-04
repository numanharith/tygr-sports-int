const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    bio: { type: String },
    date: { type: Date, default: Date.now() },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

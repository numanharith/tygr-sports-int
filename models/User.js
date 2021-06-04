const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    gravatar: { type: String, required: true },
    date: { type: date, default: Date.now },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
});

module.exports = User = mongoose.model('user', UserSchema);

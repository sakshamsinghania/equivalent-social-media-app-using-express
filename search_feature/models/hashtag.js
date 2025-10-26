const mongoose = require('mongoose');

const HashtagSchema = new mongoose.Schema({
    hashtag: { type: String, unique: true, required: true },
    frequency: { type: Number, default: 0, required: true },
    lastUsed: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hashtag', HashtagSchema);

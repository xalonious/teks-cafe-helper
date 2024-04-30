const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
    },
    hasClaimedDaily: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('userAccount', userSchema);


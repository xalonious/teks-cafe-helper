const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    walletbalance: {
        type: Number,
        default: 0,
    },
    bankbalance: {
        type: Number,
        default: 0,
    },
    bankStorage: {
        type: Number,
        default: 1000,
    },
    hasClaimedDaily: {
        type: Boolean,
        default: false
    },
    levels: {
        level: {
            type: Number,
            default: 1
        },
        xp: {
            type: Number,
            default: 0
        },
        xpneeded: {
            type: Number,
        }
    }
})

module.exports = mongoose.model('userAccount', userSchema);


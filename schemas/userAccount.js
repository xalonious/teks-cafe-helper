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
    bankcapacity: {
        type: Number,
        default: 1000,
    },
    daily: {
        hasClaimedDaily: {
            type: Boolean,
            default: false
        },
        streak: {
            type: Number,
            default: 1
        }
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
        },
    },
        inventory: [
            {
                itemName: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ].map(item => ({ ...item, _id: false }))
})

module.exports = mongoose.model('userAccount', userSchema);


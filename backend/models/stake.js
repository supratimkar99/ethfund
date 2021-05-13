const mongoose = require('mongoose');

const stakeSchema = new mongoose.Schema({
    ProjectTitle: {
        type: String,
        trim: true,
        required: true
    },
    ProjectAddress: {
        type: String,
        trim: true,
        required: true
    },
    UserAddress: {
        type: String,
        trim: true,
        required: true
    },
    StakeValue: {
        type: Number,
        trim: true,
        default: 100
    }
})

module.exports = mongoose.model('Stake', stakeSchema);
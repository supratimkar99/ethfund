const mongoose = require('mongoose');

const activeBidsSchema = new mongoose.Schema({
    ProjectAddress: {
        type: String,
        trim: true,
        required: true
    },
    OwnerAddress: {
        type: String,
        trim: true,
        required: true
    },
    StakeValue: {
        type: Number,
        trim: true,
        required: true
    },
    MinimumBid: {
        type: Number,
        trim: true,
        required: true
    },
    UpUntil: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('ActiveBids', activeBidsSchema);
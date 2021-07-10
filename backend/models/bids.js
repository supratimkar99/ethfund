const mongoose = require('mongoose');

const bidsSchema = new mongoose.Schema({
    BidID: {
        type: String,
        trim: true,
        required: true
    },
    BidderAddress: {
        type: String,
        trim: true,
        required: true
    },
    BidValue: {
        type: Number,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model('Bids', bidsSchema);
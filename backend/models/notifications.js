const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    Receiver: {
        type: String,
        trim: true,
        required: true
    },
    SellerAddress: {
        type: String,
        trim: true,
        required: true
    },
    OpenBidID: {
        type: String,
        trim: true,
        required: true,
    },
    BidValue: {
        type: Number,
        trim: true,
        required: true,
    }
})

module.exports = mongoose.model('Notifications', notificationSchema);
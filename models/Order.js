const mongoose = require('mongoose');

const ordersschema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    totalamount: {
        type: Number,
        required: true
    },
    shippingInfo: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: String,
        required: true
    },
    ordersDate: Date,
    createdDate: Date,
});

module.exports = mongoose.model('order', ordersschema);
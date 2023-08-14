const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fileURL: {
        type: String,
        required: true
    },
    reviews: [
    {
        type: Number,
        minLength: 5,
        required: true
    }
    ]
});

module.exports = mongoose.model('product', productschema);
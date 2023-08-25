const mongoose = require('mongoose');
const reviewschema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
})

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
    reviews: [reviewschema]
});

module.exports = mongoose.model('product', productschema);
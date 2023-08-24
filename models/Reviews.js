const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        minItems: 0,
        maxItems: 5,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 100
    },
    createdAt: Date
})

module.exports = new mongoose.model('review', reviewSchema);
const mongoose = require('mongoose');

const cartsschema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    quntity: {
        type: Number,
    },
    subtotal: {
        type: Number,
    },
    createdAt: Date,
})

module.exports = mongoose.model('cart', cartsschema);

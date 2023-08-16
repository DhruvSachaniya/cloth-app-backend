const mongoose = require('mongoose');

const cartsschema = new mongoose.Schema({
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
    createdAt: Date,
})

module.exports = mongoose.model('cart', cartsschema);

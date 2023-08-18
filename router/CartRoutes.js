const router = require('express').Router();

const CartController = require('../controller/CartController');

router.post('/cart', CartController.addtoCart);

module.exports = router;
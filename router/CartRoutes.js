const router = require('express').Router();

const CartController = require('../controller/CartController');
const { auth } = require('../middlewares/auth');

router.post('/cart',auth, CartController.addtoCart);

module.exports = router;
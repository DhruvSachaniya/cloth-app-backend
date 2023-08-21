const router = require('express').Router();

const CartController = require('../controller/CartController');
const { auth } = require('../middlewares/auth');

router.post('/cart',auth, CartController.addtoCart);
router.get('/cart',auth, CartController.cartinfo);
router.delete('/cart', auth, CartController.cartitemdelete);

module.exports = router;
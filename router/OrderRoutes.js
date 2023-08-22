const router = require('express').Router();

const OrderController = require('../controller/OrderController');
const { auth } = require('../middlewares/auth');

router.post('/order', auth, OrderController.checkout);
router.get('/order', auth, OrderController.orderinfo);
router.delete('/order', auth, OrderController.cancelorder);

module.exports = router;
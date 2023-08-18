const router = require('express').Router();

const Productcontroller = require('../controller/ProductController');
const { auth } = require('../middlewares/auth');

router.post('/products',auth, Productcontroller.addProducts);
router.get('/products',auth, Productcontroller.getallproducts);
router.get('/productinfo', auth, Productcontroller.productinfo);

module.exports = router;
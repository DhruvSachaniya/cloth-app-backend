const router = require('express').Router();

const Productcontroller = require('../controller/ProductController');
const auth = require('../middlewares/auth');

router.post('/products', Productcontroller.addProducts);
router.get('/products', Productcontroller.getallproducts);
router.get('/productinfo', Productcontroller.productinfo);

module.exports = router;
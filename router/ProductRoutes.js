const router = require('express').Router();

const Productcontroller = require('../controller/ProductController');

router.post('/products', Productcontroller.addProducts);
router.get('/products', Productcontroller.getallproducts);

module.exports = router;
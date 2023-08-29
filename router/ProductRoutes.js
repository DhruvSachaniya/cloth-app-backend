const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

const Productcontroller = require('../controller/ProductController');
const { auth } = require('../middlewares/auth');

router.post('/products', auth, upload.single('image'), Productcontroller.addProducts);
router.get('/products',auth, Productcontroller.getallproducts);
router.get('/productinfo/:productid', auth, Productcontroller.productinfo);

module.exports = router;
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

const fileFilter = (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

const Productcontroller = require('../controller/ProductController');
const { auth } = require('../middlewares/auth');

router.post('/products', auth, upload.single('image'), Productcontroller.addProducts);
router.get('/products',auth, Productcontroller.getallproducts);
router.get('/productinfo/:productid', auth, Productcontroller.productinfo);

module.exports = router;
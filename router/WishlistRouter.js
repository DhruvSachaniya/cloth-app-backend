const router = require('express').Router();

const WishlistController = require('../controller/WishlistController');
const { auth } = require('../middlewares/auth');

router.post('/wishlist', auth , WishlistController.addwishlist);
router.get('/wishlist', auth , WishlistController.getwishlist);
router.delete('/wishlist', auth , WishlistController.deletewishlist);

module.exports = router;
const router = require('express').Router()

const reviewController = require('../controller/reviewController');
const { auth } = require('../middlewares/auth');

router.post('/review', auth, reviewController.postreview);
router.get('/review', auth, reviewController.reviewinfo);

module.exports = router;
const router = require('express').Router();

const accountController = require('../controller/accountController');
const { auth } = require('../middlewares/auth');

router.get('/account', auth, accountController.accountinfo);

module.exports = router;
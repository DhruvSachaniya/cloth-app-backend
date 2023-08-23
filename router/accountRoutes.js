const router = require('express').Router();

const accountController = require('../controller/accountController');
const { auth } = require('../middlewares/auth');

router.get('/account', auth, accountController.accountinfo);
router.patch('/username', auth, accountController.editusername);
router.patch('/email', auth, accountController.editemail);
router.patch('/password', auth, accountController.editpassword);

module.exports = router;
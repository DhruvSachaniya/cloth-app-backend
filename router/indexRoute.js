const router = require('express').Router();

const {indexPage} = require('../controller/indexcontroller');

router.route('/').get(indexPage);

module.exports = router;
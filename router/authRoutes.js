const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/register', authController.registerUser);
router.post('/Login', authController.loginUser);

module.exports = router;
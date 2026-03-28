const express = require('express');

const authController = require("./../controllers/authController");

const router = express.Router();

router.post('/register',authController.authRegister);
router.post('/login',authController.authLogin);

module.exports = router;
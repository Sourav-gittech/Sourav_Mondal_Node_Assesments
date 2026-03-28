const express = require("express");

const managerAuthController = require("./../../controllers/auth/managerAuthController");

const router = express.Router();

router.post('/register', managerAuthController.registerManager);
router.post('/login', managerAuthController.loginManager);

module.exports = router;
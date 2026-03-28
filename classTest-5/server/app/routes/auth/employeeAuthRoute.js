const express = require("express");

const employeeAuthController = require("./../../controllers/auth/employeeAuthController");

const router = express.Router();

router.post('/register', employeeAuthController.registerEmployee);
router.post('/login', employeeAuthController.loginEmployee);

module.exports = router;
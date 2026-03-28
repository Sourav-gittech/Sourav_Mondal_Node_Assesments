const express = require("express");
const employeeAuthController = require("./../controllers/employeeAuthController");
const checkAuth = require("../middleware/checkAuth");

const Router = express.Router();

Router.post('/create-employee', checkAuth(['admin']), employeeAuthController.registerEmployee);
Router.post('/login', employeeAuthController.loginEmployee);

module.exports = Router;
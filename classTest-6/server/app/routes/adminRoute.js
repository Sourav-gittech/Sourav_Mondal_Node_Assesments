const express = require("express");

const adminController = require("./../controllers/adminController");

const Router = express.Router();

Router.post('/register', adminController.registerAdmin);
Router.post('/login', adminController.loginAdmin);

module.exports = Router;
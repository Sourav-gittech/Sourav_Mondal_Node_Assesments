const express = require("express");

const employeeController = require("./../controllers/employeeController");
const checkAuth = require("../middleware/checkAuth");

const Router = express.Router();

Router.get('/', checkAuth(["admin"]), employeeController.allEmployeeList);
Router.get('/:id/status', checkAuth(["admin"]), employeeController.changeStatus);
Router.get('/reset-password/:id', checkAuth(["admin"]), employeeController.changePasswordByAdmin);

Router.get('/profile', checkAuth(["employee"]), employeeController.getProfile);
Router.put('/profile', checkAuth(["employee"]), employeeController.updateProfile);
Router.put('/change-password', checkAuth(["employee"]), employeeController.changePasswordByUser);

module.exports = Router;
const express = require("express");

const adminRouter = require("./adminRoute");
const employeeAuthRouter = require("./employeeAuthRoute");
const employeeRouter = require("./employeeRoute");

const Router = express.Router();

Router.use('/admin', adminRouter);
Router.use('/employee/auth', employeeAuthRouter);
Router.use('/employee', employeeRouter);

module.exports = Router;
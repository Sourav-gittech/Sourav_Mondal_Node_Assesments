const express = require("express");

const adminRouter = require("./adminRoute");
const managerRouter = require("./managerRoute");
const employeeRouter = require("./employeeRoute");

const adminAuthRouter = require("./auth/adminAuthRoute");
const managerAuthRouter = require("./auth/managerAuthRoute");
const employeeAuthRouter = require("./auth/employeeAuthRoute");

const productRouter = require("./productRoute");

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/manager', managerRouter);
router.use('/employee', employeeRouter);

router.use('/auth/admin', adminAuthRouter);
router.use('/auth/manager', managerAuthRouter);
router.use('/auth/employee', employeeAuthRouter);

router.use('/product', productRouter);

module.exports = router;
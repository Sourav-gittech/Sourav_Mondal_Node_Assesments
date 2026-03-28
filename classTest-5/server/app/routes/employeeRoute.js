const express = require("express");

const employeeController = require("../controllers/employeeController");
const checkEmployee = require("../middleware/checkEmployee");

const router = express.Router();

router.use(checkEmployee);

router.get('/profile', employeeController.fetchEmployeeProfile);
router.put('/profile/status/:employeeId', employeeController.changeProfileStatus);
router.put('/profile/password/change/:employeeId', employeeController.changeProfilePassword);

module.exports = router;
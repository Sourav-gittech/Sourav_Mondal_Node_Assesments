const express = require("express");

const adminController = require("../controllers/adminController");
const checkAdmin = require("../middleware/checkAdmin");

const router = express.Router();

router.use(checkAdmin);

router.get('/profile', adminController.fetchAdminProfile);
router.put('/profile/status/:adminId', adminController.changeProfileStatus);
router.put('/profile/password/change/:adminId', adminController.changeProfilePassword);

module.exports = router;
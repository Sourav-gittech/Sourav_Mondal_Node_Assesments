const express = require("express");

const managerController = require("../controllers/managerController");
const checkManager = require("../middleware/checkManager");

const router = express.Router();

router.use(checkManager);

router.get('/profile', managerController.fetchManagerProfile);
router.put('/profile/status/:managerId', managerController.changeProfileStatus);
router.put('/profile/password/change/:managerId', managerController.changeProfilePassword);

module.exports = router;
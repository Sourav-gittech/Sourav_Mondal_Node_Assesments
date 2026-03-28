const express = require('express');

const userController = require("./../controllers/userController");
const checkAuth = require("./../middleware/checkAuth");

const router = express.Router();

router.get('/', userController.allAvailableUsers);

router.use(checkAuth);

router.get('/profile/', userController.fetchUserProfile);
router.post('/profile/update', userController.updateUserProfile);
router.post('/status/update', userController.updateUserStatus);
router.post('/access/update', userController.giveManagerAccess);

module.exports = router;
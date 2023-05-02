const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController.js');

router.post('/clockIn', authMiddleware, userController.clockIn);
router.post('/startBreak', authMiddleware, userController.startBreak);
router.post('/endBreak', authMiddleware, userController.endBreak);
router.post('/clockOut', authMiddleware, userController.clockOut);

module.exports = router;
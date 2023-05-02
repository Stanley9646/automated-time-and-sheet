const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.post('/addEmployee', authMiddleware, adminController.addEmployee);
router.put('/modifyEmployee/:id', authMiddleware, adminController.modifyEmployee);
router.get('/generateReport', authMiddleware, adminController.generateReport);

module.exports = router;

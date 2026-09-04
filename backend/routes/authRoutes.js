const express = require('express');
const router = express.Router();
const { login, register, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/register', register);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

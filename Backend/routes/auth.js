const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken'); // If you're using JWT auth
const { updatePassword } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-password', verifyToken, updatePassword);

module.exports = router;

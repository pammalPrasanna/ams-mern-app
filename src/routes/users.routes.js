const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/users.controller');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;

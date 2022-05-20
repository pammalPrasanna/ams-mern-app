var express = require('express');
var router = express.Router();

const { swipe, getSwipeDetails, getAttendanceDetails } = require("../controllers/attendance.controller");
const { protect } = require('../middlewares/authMiddleware');


router.route('/swipe').post(protect, swipe);
router.route('/swipe-details').get(protect, getSwipeDetails);
router.route('/:date').get(protect, getAttendanceDetails);


module.exports = router
var express = require('express');
var router = express.Router();

const { addMember, deleteMember, getOneMember, registerMember } = require("../controllers/members.controller");
const { protect } = require('../middlewares/authMiddleware');


router.route('/').post(protect, addMember);
router.route('/:id').delete(protect, deleteMember).get(getOneMember);
router.route('/register').post(registerMember);

module.exports = router
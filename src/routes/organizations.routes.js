var express = require('express');
var router = express.Router();

const { getAllOrgs, createOrg, deleteOrg, updateOrg, getAllMembers } = require('../controllers/organizations.controller');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getAllOrgs).post(protect, createOrg);
router.route('/members/:org_id').get(protect, getAllMembers);
router.route('/:id').delete(protect, deleteOrg).put(protect, updateOrg);

module.exports = router;
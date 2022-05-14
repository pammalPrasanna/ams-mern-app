var express = require('express');
var router = express.Router();

const { getAllOrgs, createOrg, deleteOrg, updateOrg } = require('../controllers/organizations.controller');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getAllOrgs).post(protect, createOrg);
router.route('/:id').delete(protect, deleteOrg).put(protect, updateOrg);

module.exports = router;
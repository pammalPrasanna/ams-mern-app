const asyncHandler = require('express-async-handler');
const { isValidObjectId } = require('../utils/moongoose.utils');
const OrgsModel = require('../models/orgsModel');
const User = require('../models/usersModel');



// @desc    Get Organizations
// @route   GET /api/orgs
// @access  Private
const getAllOrgs = asyncHandler(async (req, res, next) => {
    const orgs = await OrgsModel.find({ user: req.user.id });
    res.status(200).json(orgs);
});


// @desc    Create Organizations
// @route   POST /api/orgs
// @access  Private
const createOrg = asyncHandler(async (req, res) => {
    if (!req.body.org_name) {
        res.status(400);
        throw new Error('Please add organization name field')
    }

    const orgs = await OrgsModel.create({
        name: req.body.org_name,
        user: req.user.id
    });

    res.status(201).json(orgs);
});



// @desc    Update Organizations
// @route   PUT /api/orgs/:id
// @access  Private
const updateOrg = asyncHandler(async (req, res) => {
    const orgId = req.params.id;
    if (isValidObjectId(orgId)) {
        const org = await OrgsModel.findById(orgId);

        if (!org) {
            res.status(404);
            throw new Error('Organization not found');
        }

        // Making sure the logged in user matches the orgs owner
        if (org.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User is not authorized')
        }

        const updatedOrg = await OrgsModel.findByIdAndUpdate(orgId, req.body, {
            new: true
        });

        res.status(200).json(updatedOrg);
    }

    res.status(400);
    throw new Error('Organization not found');
});



// @desc    Delete Organizations
// @route   DELETE /api/orgs/:id
// @access  Private
const deleteOrg = asyncHandler(async (req, res) => {
    const orgId = req.params.id;
    if (isValidObjectId(orgId)) {
        const org = await OrgsModel.findById(orgId);

        if (!org) {
            res.status(404);
            throw new Error('Organization not found');
        }

        // Making sure the logged in user matches the orgs owner
        if (org.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User is not authorized')
        }

        org.remove();

        res.status(200).json({ id: req.params.id });
    }

    res.status(400);
    throw new Error('Organization not found');

});


module.exports = {
    getAllOrgs,
    createOrg,
    deleteOrg,
    updateOrg
}
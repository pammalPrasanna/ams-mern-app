const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const Member = require('../models/membersModel');
const { isValidObjectId } = require('../utils/moongoose.utils');
const moment = require('moment')
const bcrypt = require('bcryptjs');




const registerMember = asyncHandler(async (req, res) => {
    res.status(500);
    const { id, password, email } = req.body;
    if (!id || !password || !email) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    const user = await User.findById(id);
    if (!user) {
        res.status(400)
        throw new Error("User data doesn't match")
    }


    if (user.email !== email) {
        res.status(400)
        throw new Error("User data doesn't match")
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    let joined_on = moment.tz(moment(), "Asia/Kolkata");
    joined_on = joined_on.format("YYYY-DD-MM");

    const updatedUser = await User
        .findByIdAndUpdate(
            id,
            {
                password: hashedPassword,
                role: 2,
                joined_on: joined_on
            }, {
            new: true
        });


    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(400)
        throw new Error("Unable to register user")

    }
})


// @desc    Get one member with the given id
// @route   GET /api/members/:id
// @access  Public
const getOneMember = asyncHandler(async (req, res) => {
    const mid = req.params.id;
    const member = await Member.findOne({ mid: mid }).select("-createdAt -updatedAt").populate({ path: 'mid', select: '-createdAt' });
    if (member) {
        res.status(200).json(member)
    } else {
        res.status(404).json({
            message: 'Member not found'
        });
    }
})


// @desc    Add new member under the organization
// @route   POST /api/members/
// @access  Private
const addMember = asyncHandler(async (req, res) => {
    const { name, email, org_id } = req.body;
    if (!name || !email || !org_id) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('Member already exists')
    }

    // Create user
    const user = await User.create({
        name,
        email,
        role: 3
    });

    if (user) {
        const member = await Member.create({
            mid: user._id,
            org_id
        });

        if (member) {
            const addedMember = await Member.findById(member._id).select("-createdAt -updatedAt").populate({ path: 'mid', select: '-createdAt' });

            res.status(201).json(addedMember)
        }

    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

});


const deleteMember = asyncHandler(async (req, res) => {
    const memberId = req.params.id;

    if (isValidObjectId(memberId)) {
        // const user = User.findById(memberId);
        // const member = Member.findOne({ mid: user._id });

        User.deleteOne({ _id: memberId }, function (err, result) {
            if (err) {
                console.err(err);
            } else {
                console.log('u d')
            }
        });

        Member.deleteOne({ mid: memberId }, function (err, result) {
            if (err) {
                console.err(err);
            } else {
                console.log('m d')
            }
        });


        res.status(200).json({
            message: 'Member was deleted successfully',
            id: memberId
        })
    } else {
        res.status(400).json({
            message: 'Member not found'
        })
    }

})





module.exports = {
    addMember,
    deleteMember,
    getOneMember,
    registerMember
}
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');
const Member = require('../models/membersModel');
const { generateToken } = require('../utils/auth.util');


// @desc    Register new member under the organization
// @route   POST /api/users
// @access  Public
const registerMember = asyncHandler(async (req, res) => {
    const { name, email, password, org_id } = req.body;
    if (!name || !email || !password || !org_id) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('Member already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 2
    });

    if (user) {
        const member = await Member.create({
            mid: user._id,
            org_id
        });

        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user._id,
            member,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

});






module.exports = {
    registerUser,
    loginUser,
    getMe
}
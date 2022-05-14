const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/usersModel');

const { generateToken } = require('../utils/auth.util');
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 1
    });

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            id: user._id,
            token: generateToken(user.id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }

});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check whether user exists
    const user = await User.findOne({ email });

    // 
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)

        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials')
    }
});


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});



module.exports = {
    registerUser,
    loginUser,
    getMe
}
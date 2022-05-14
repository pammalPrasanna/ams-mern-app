const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');
const { isValidObjectId } = require('../utils/moongoose.utils');

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get the token from header
            token = req.headers.authorization.split(" ")[1];

            // verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from the token
            // check whether the id is manipulated and encoded in jwt
            if (isValidObjectId(decoded.id)) {
                req.user = await User.findById(decoded.id).select('-password');
                next();
            } else {
                res.status(401)
                throw new Error('Not authorized')
            }

        } catch (err) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized');
    }
});


module.exports = { protect };
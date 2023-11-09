const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const protectUser = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //we can get all information from here, bcs it's getting user from mongo by decoded id
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('User Not Authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('User Not Authorized, No Token Passed');
    }
});

const authorize = (allowedUserLevels) => {
    return (req, res, next) => {
        const user = req.user;

        console.log('User Level:', user.userLevel);

        if (!allowedUserLevels.includes(user.userLevel)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};


module.exports = {
    protectUser,
    authorize,
};
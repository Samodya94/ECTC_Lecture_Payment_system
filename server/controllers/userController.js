const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const createUser = asyncHandler(async (req,res) => {
    const { fullname, email, username, branch, userLevel, password } = req.body;
    console.log(fullname, email, username, branch, userLevel, password);

    if(!email || !fullname || !username || !branch || !userLevel || !password) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const userExists = await User.findOne({ username });

    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        fullname,
        email,
        username,
        branch,
        userLevel,
        password: hashedPassword,
    });

    if(user) {
        res.status(200).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            branch: user.branch,
            userLevel: user.userLevel,
        });
    } else {
            res.status(400);
            throw new Error('Invalid User Data');
    }

    res.json({ message: 'User Registered' });
});

const loginUser = asyncHandler (async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
            branch: user.branch,
            userLevel: user.userLevel,
        });
    } else {
            res.status(400);
            throw new Error('Invalid Credentials');
    }
});

const getMe = asyncHandler (async (req,res) => {
    res.json({ message: 'User Fetched' });
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    await user.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createUser,
    loginUser,
    getMe,
    deleteUser,
};
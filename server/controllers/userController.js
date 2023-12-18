const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

const createUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, branch, userLevel, password } = req.body;

    if (!email || !fullname || !username || !branch || !userLevel || !password) {
        res.status(400).json({ message: 'Please Fill All Fields' });
        return;
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400).json({ message: 'User Already Exists' });
        return;
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

    if (user) {
        res.status(200).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            branch: user.branch,
            userLevel: user.userLevel,
            token: generateJWT(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid User Data' });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            branch: user.branch,
            userLevel: user.userLevel,
            token: generateJWT(user.id),
        });
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

const getallUsers = asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
});

const getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            branch: user.branch,
            userLevel: user.userLevel,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        await user.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

const generateJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const getUserByUserName = asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
}
);

const editUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, branch, userLevel } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    user.fullname = fullname;
    user.email = email;
    user.username = username;
    user.branch = branch;
    user.userLevel = userLevel;

    const updatedUser = await user.save();

    res.status(200).json({
        id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        username: updatedUser.username,
        branch: updatedUser.branch,
        userLevel: updatedUser.userLevel,
    });
});

const changePassword = async (req, res) => {
    const { oldPassword, newPassword, username } = req.body;

    const user = await User.findOne({ username: username });
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid old password" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
    res.json({ msg: "Password changed successfully" });
};

const resetPassword = async (req, res) => {
    const { username } = req.body;

    const user = await User.findOne({ username: username });
    const newPassword = "ectc";

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
    res.json({ msg: "Password reset successfully" });
};


module.exports = {
    createUser,
    loginUser,
    getUser,
    deleteUser,
    getallUsers,
    getUserByUserName,
    changePassword,
    resetPassword,
    editUser,
};

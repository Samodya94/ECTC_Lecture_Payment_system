const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please Enter Full Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
    },
    username: {
        type: String,
        required: [true, 'Please Enter Username'],
        unique: true,
    },
    branch: {
        type: String,
        required: [true, 'Please Enter the Branch'],
    },
    userLevel: {
        type: String,
        enum: ['Admin', 'Manager', 'Finance','Account'],
        default: 'Admin',
    },
    password: {
        type: String,
        required: [true, 'Please add a Password'],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
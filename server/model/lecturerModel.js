const mongoose = require('mongoose');

const lecturerSchema = mongoose.Schema({

    nic: {
        type: String,
        required: [true, 'Please Enter NIC'],
        unique: true,
    },
    username: {
        type: String,
        required: [true, 'Please Enter the User Name'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please Enter the First Name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter the Last Name'],
    },
    email: {
        type: String,
        required: [true, 'Please Enter email address'],
    },
    phone: {
        type: String,
        required: [true, 'Please enterthe  phone'],
    },
    branch: {
        type: String,
        required: [true, 'Please select a branch'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a value'],
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Lecturer', lecturerSchema);
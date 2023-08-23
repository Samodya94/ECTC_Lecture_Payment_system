const mongoose = require('mongoose');

const lecturerSchema = mongoose.Schema({
    
    nic: {
        type: String,
        required: [true, 'Please Enter NIC'],
    },
    uname: {
        type: String,
        required: [true, 'Please Enter the User Name'],
    },
    fname: {
        type: String,
        required: [true, 'Please Enter the First Name'],
    },
    lname: {
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
    rDate: {
        type: Date,
        required: [true, 'Please enter the Registered date'],
    },
    ectc: {
        type: String,
        required: [true, 'Please enter a value'],
    },
},

{
    timestamps: true,
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    
    nic: {
        type: String,
        required: [true, 'Please Enter NIC'],
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
    course: {
        type: String,
        required: [true, 'Please select a course'],
    },
    batchCode: {
        type: String,
        required: [true, 'Please select a batch'],
    },

},
{
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
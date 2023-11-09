const mongoose = require('mongoose');

const assignBatchSchema = mongoose.Schema({

    lecturerNic: {
        type: String,
        required: [true, 'Please Enter Lecturer NIC'],
        unique: true,
    },
    lecturerName: {
        type: String,
        required: [true, 'Please Enter Lecturer Name'],
        unique: true,
    },
    course: {
        type: String,
        required: [true, 'Please Enter Course Name'],
    },
    batchcode: {
        type: String,
        required: [true, 'Please Enter Batch Code'],
    },
    rate: {
        type: String,
        required: [true, 'Please Enter hourely rate'],
    },
    hours: {
        type: Number,
        required: [true, 'Please Select the no of hours'],
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('AssignBatch', assignBatchSchema);
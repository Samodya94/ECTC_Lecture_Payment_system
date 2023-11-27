const mongoose = require('mongoose');

const coverageSchema = mongoose.Schema({

    lectureid: {
        type: String,
    },
    courseName: {
        type: String,
        required: [true, 'Please Enter Course Name'],
    },
    batchCode: {
        type: String,
        required: [true, 'Please select the Batch Code'],
    },
    startTime: {
        type: String,
        required: [true, 'Please select the Start Time'],
    },
    endTime: {
        type: String,
        required: [true, 'Please select the End Time'],
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Please select the Date'],
    },
    lectureCoverage: {
        type: String,
        required: [true, 'Please select the Lecture Coverage'],
    },
    status: {
        type: String,
        required: [true],
        default: 'Not Approved'
    },
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Coverage', coverageSchema);
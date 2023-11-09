const mongoose = require('mongoose');

const coverageSchema = mongoose.Schema({
    
    coverageID: {
        type: String,
        required: [true, 'Please Enter Coverage ID'],
        unique: true,
    },
    lectureid: {
        type: String,
    },
    courseName: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please Enter Course Name'],
        ref: 'Course',
    },
    batchCode: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please select the Batch Code'],
        ref: 'Batch',
    },
    startTime: {
        type: String,
        required: [true, 'Please select the Start Time'],
    },
    endTime: {
        type: String,
        required: [true, 'Please select the End Time'],
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
        default:'Not Approved'
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Coverage', coverageSchema);
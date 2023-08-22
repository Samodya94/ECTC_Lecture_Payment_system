const mongoose = require('mongoose');

const batchSchema = mongoose.Schema({
    batchCode: {
        type: String,
        required: [true, 'Please Enter Batch Code'],
        unique: true,
    },
    course: {
        type: String,
        required: [true, 'Please Enter Course Name'],
    },
    branch: {
        type: String,
        required: [true, 'Please Enter Branch Name'],
    },
    startDate: {
        type: Date,
        required: [true, 'Please Select the Start date'],
    },
    endDate: {
        type: Date,
        required: [true, 'Please Select the End date'],
    },
    batchState: {
        type: String,
        required: [true, 'Please select a Batch State'],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Batch', batchSchema);
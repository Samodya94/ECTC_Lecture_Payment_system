const mongoose = require('mongoose');

const assignBatchSchema = mongoose.Schema({
    lecturer: {
        type: String,
        required: [true, 'Please Enter Lecturer Name'],
        unique: true,
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
        type: String,
        required: [true, 'Please Select the no of hours'],
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('AssignBatch', assignBatchSchema);
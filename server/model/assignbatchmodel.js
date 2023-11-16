const mongoose = require('mongoose');

const assignBatchSchema = mongoose.Schema({
    lecturer: {
        type: String,
        required: [true, 'Please Enter Lecturer Name'],
        unique: true,
    },
    course:{
        type: String,
        required: [true, 'Please Select the course'],
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
    },
    hourly_pay:{
        type: Number,
    },
    status:{
        type: String,
        required: true, 
        dafault:"T"
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('AssignBatch', assignBatchSchema);
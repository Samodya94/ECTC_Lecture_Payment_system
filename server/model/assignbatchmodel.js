const mongoose = require('mongoose');

const assignBatchSchema = mongoose.Schema({

    lecturerNic: {
        type: String,
        required: [true, 'Please Enter Lecturer NIC'],
    },
    lecturerName: {
        type: String,
        required: [true, 'Please Enter Lecturer Name'],
    },

    course: {
        type: String,
        required: [true, 'Please Enter Course Name'],
    },
    batchCode: {

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
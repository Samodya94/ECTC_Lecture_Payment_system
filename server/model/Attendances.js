const mongoose = require('mongoose');

const AttendancesSchema = new mongoose.Schema({
    
    lecturername: {
        type: String,
        required: true,
        min: 4,
    },

    batchcode: {
        type: String,
        required: true,
        min: 8,
    },

    starttime: {
        type: String,
        required: true,
    },

    endtime: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

 
    lecturecoverage: {
        type: String,
        required: true,
    }

})

module.exports= mongoose.model("Attendances",AttendancesSchema)
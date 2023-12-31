const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({

    courseName: {
        type: String,
        required: [true, 'Please Enter Course Name'],
        unique: true,
    },
    courseFee: {
        type: String,
        required: [true, 'Please Enter Course Fee'],
    },
    courseDuration: {
        type: Number,
        required: [true, 'Please select a coursr Duration'],
    },
    batch_state:{
        type:String,
        required:true,
        default:'T'
    }

},
    {
        timestamps: true,
    });

module.exports = mongoose.model('Course', courseSchema);
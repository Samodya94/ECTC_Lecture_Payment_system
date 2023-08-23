const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    
    cname: {
        type: String,
        required: [true, 'Please Enter Course Name'],
    },
    fee: {
        type: String,
        required: [true, 'Please Enter Course Fee'],
    },
    duration: {
        type: String,
        required: [true, 'Please select a coursr Duration'],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
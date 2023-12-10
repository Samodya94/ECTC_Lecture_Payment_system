const mongoose = require('mongoose');

const loginDetailsSchema = mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    ipaddress: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('LoginDetail', loginDetailsSchema);
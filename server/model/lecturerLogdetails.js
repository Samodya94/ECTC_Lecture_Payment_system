const mongoose = require('mongoose')

const LecLogSchema = new mongoose.Schema({
    lecUsername: {
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
}, {
    timestamps: true

})

module.exports = mongoose.model("LecturerLog", LecLogSchema)
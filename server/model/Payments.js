const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
    lecturerId: {
        type: String,
        required: true,
    },

    coursename: {
        type: String,
        required: true,
    },

    batchcode: {
        type: String,
        required: true,
    },

    month: {
        type: String,
        required: true,
    },

    totalhours: {
        type: String,
        required: true,
    },

    paymentrate: {
        type: String,
        required: true,
    },

    paidamount: {
        type: String,
        required: true,
    },

    document: {
        type: String,
        required: false,
    },

    paymentDate: {
        type: Date,
        required: false,
    },

    status: {
        type: String,
        required: false,
    },

}, {
    timestamps: true,

})

module.exports = mongoose.model("Payments", PaymentsSchema)
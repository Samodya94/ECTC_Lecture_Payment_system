const mongoose = require('mongoose');

const branchSchema = mongoose.Schema(
    {
        branchName: {
            type: String,
            required: [true, 'Please Enter Branch Name'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Branch', branchSchema);

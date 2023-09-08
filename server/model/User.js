const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type : String,
        required : true,
        unique : true,
    },

    username: {
        type: String,
        required : true,
        unique : true,
    },

    password : {
        type: String,
        required : true,
        min: 6,
        max: 50
    },

    isAdmin:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("User",UserSchema)
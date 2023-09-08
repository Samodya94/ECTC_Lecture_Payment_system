const mongoose = require('mongoose');

const GradesSchema = new mongoose.Schema({
    
   

    batchcode: {
        type: String,
        required: true,
        min: 8,
    }
    

})

module.exports= mongoose.model("Grades",GradesSchema)
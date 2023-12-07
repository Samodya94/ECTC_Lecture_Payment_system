const asyncHandler = require('express-async-handler');
const LecLog = require('../model/lecturerLogdetails');

const createLog = asyncHandler(async (req, res) =>{
    const { lecUsername, ipaddress, city, country } = req.body;

    const  lecLog = LecLog.create({
        lecUsername,
        ipaddress,
        city,
        country
    } )

    if(lecLog){
        res.status(200).json("log Saved to system")
    }else{
        res.status(400)
    }

    // res.json({message:'Log created'})

});

const getLecLog = asyncHandler(async (req, res) => {
    const lecLog = await LecLog.find();
    res.status(200).json(course);
});



module.exports = {
    createLog,
    getLecLog
}


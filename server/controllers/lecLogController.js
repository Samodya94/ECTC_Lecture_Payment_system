const asyncHandler = require("express-async-handler");
const LecLog = require('../model/lecturerLogdetails');

const createLog = asyncHandler(async (req,res) =>{
    const data = req.body

    const leclog = await LecLog.create({
        lecUsername:data.lecUsername,
        ipaddress:data.ipaddress,
        city:data.city,
        country:data.country,
    })

    res.status(200).json(leclog)
    
})

module.exports = {
    createLog
}
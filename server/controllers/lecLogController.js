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

const getLecLog = asyncHandler(async(req,res) =>{
    const lecLog = await LecLog.find()

    res(200).json(lecLog)
})

module.exports = {
    createLog,
    get
}
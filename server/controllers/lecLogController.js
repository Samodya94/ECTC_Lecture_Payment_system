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

    res.status(200).json(lecLog)
})

const getLogByUser = asyncHandler(async(req,res)=>{
    const user = req.params.user

    const leclog = await LecLog.find({ lecUsername:user})

    res.status(200).json(leclog)
})

module.exports = {
    createLog,
    getLecLog,
    getLogByUser
}
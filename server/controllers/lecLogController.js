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

const getRecentLogByUser = asyncHandler(async (req, res) => {
    const user = req.params.user;

    // Find the 10 most recent records, sorted in descending order by the createdAt field (assuming you have a createdAt field in your schema)
    const leclog = await LecLog.find({ lecUsername: user })
        .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
        .limit(10); // Limit the result to 10 records

    res.status(200).json(leclog);
});


module.exports = {
    createLog,
    getLecLog,
    getLogByUser,
    getRecentLogByUser
}
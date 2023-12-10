const asyncHandler = require("express-async-handler");
const LoginDetails = require('../model/loginDetailsModel');
const createLog = asyncHandler(async (req, res) => {
    const data = req.body

    const loginDetail = await LoginDetails.create({
        username: data.username,
        ipaddress: data.ipaddress,
        city: data.city,
        country: data.country,
    })

    res.status(200).json(loginDetail)

})

const getLoginDetails = asyncHandler(async (req, res) => {
    const lecLog = await LoginDetails.find()

    res.status(200).json(lecLog)
})

const getLogByUser = asyncHandler(async (req, res) => {
    const user = req.params.user

    const loginDetail = await LoginDetails.find({ username: user })

    res.status(200).json(loginDetail)
})

module.exports = {
    createLog,
    getLoginDetails,
    getLogByUser
}
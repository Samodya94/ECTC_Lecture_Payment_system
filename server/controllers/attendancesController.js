const attendancesController = require('express').Router()
const Attendances = require('../model/Attendances')
const {verifyToken,verifyTokenAdmin} = require('../middlewares/verifyToken')

//get all
attendancesController.get('/',verifyToken,async(req,res) => {
    try{
       
        const lecturers = await Lecturer.find(req.query)
        return res.status(200).json(lecturers)
    }
    catch(error){
        console.error(error);
    }
})

//get one
attendancesController.get('/find/:id',verifyToken,async(req,res) => {
    try{
        const attendancesId = req.params.id
        const attendances = await Attendances.findById(attendancesId)
        if(!attendances) {
            return res.status(500).json({msg: "No attendances with such ID!"})
        }
        return res.status(200).json(attendances)
    }
    catch(error){
        console.error(error);
    }
})

//create attendances
attendancesController.post('/add',verifyTokenAdmin,async(req,res) => {
    try{
        console.log("jjjjj");
        const newAttendances = await Attendances.create({...req.body})
        console.log("jjjjj");
        return res.status(201).json(newAttendances)
    }
    catch(error){
        console.error(error);
    }
})

module.exports = attendancesController
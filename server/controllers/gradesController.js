const gradesController = require('express').Router()
const Grades = require('../model/Grades')
const {verifyToken,verifyTokenAdmin} = require('../middlewares/verifyToken')

//get all
gradesController.get('/',verifyToken,async(req,res) => {
    try{
       
        const lecturers = await Lecturer.find(req.query)
        return res.status(200).json(lecturers)
    }
    catch(error){
        console.error(error);
    }
})

//get one
gradesController.get('/find/:id',verifyToken,async(req,res) => {
    try{
        const gradesId = req.params.id
        const grades = await Grades.findById(gradesId)
        if(!grades) {
            return res.status(500).json({msg: "No grades with such ID!"})
        }
        return res.status(200).json(grades)
    }
    catch(error){
        console.error(error);
    }
})

//create grades
gradesController.post('/add',verifyTokenAdmin,async(req,res) => {
    try{
        console.log("jjjjj");
        const newGrades = await Grades.create({...req.body})
        console.log("jjjjj");
        return res.status(201).json(newGrades)
    }
    catch(error){
        console.error(error);
    }
})

module.exports = gradesController
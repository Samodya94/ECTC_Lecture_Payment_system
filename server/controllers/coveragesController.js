const coveragesController = require('express').Router()
const Coverages = require('../model/Coverages')
const {verifyToken,verifyTokenAdmin} = require('../middlewares/verifyToken')

//get all
coveragesController.get('/',verifyToken,async(req,res) => {
    try{
      
        const lecturers = await Coverages.find(req.query)
        return res.status(200).json(lecturers)
    }
    catch(error){
        console.error(error);
    }
})

//get one
coveragesController.get('/find/:id',verifyToken,async(req,res) => {
    try{
        const coveragesId = req.params.id
        const coverages = await Coverages.findById(coveragesId)
        if(!coverages) {
            return res.status(500).json({msg: "No coverages with such ID!"})
        }
        return res.status(200).json(coverages)
    }
    catch(error){
        console.error(error);
    }
})

//create coverages
coveragesController.post('/add',verifyTokenAdmin,async(req,res) => {
    try{
        console.log("Success");
        const newCoverages = await Coverages.create({...req.body})
        console.log("Success");
        return res.status(201).json(newCoverages)
    }
    catch(error){
        console.error(error);
    }
})

module.exports = coveragesController
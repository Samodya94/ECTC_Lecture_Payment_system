const paymentsController = require('express').Router()
const Payments = require('../model/Payments')
const {verifyToken,verifyTokenAdmin} = require('../middlewares/verifyToken')

//get all
paymentsController.get('/',verifyToken,async(req,res) => {
    try{
      
        const lecturers = await Lecturer.find(req.query)
        return res.status(200).json(lecturers)
    }
    catch(error){
        console.error(error);
    }
})

//get one
paymentsController.get('/find/:id',verifyToken,async(req,res) => {
    try{
        const paymentsId = req.params.id
        const payments = await Payments.findById(paymentsId)
        if(!payments) {
            return res.status(500).json({msg: "No payments with such ID!"})
        }
        return res.status(200).json(payments)
    }
    catch(error){
        console.error(error);
    }
})

//create payments
paymentsController.post('/add',verifyTokenAdmin,async(req,res) => {
    try{
        console.log("Success");
        const newPayments = await Payments.create({...req.body})
        console.log("Success");
        return res.status(201).json(newPayments)
    }
    catch(error){
        console.error(error);
    }
})

module.exports = paymentsController
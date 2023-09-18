const authController = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')  // 123123,  jggyygjbcgxvvmhgjfy
const jwt = require('jsonwebtoken')

authController.post('/lec_login',async(req,res) => {
    try{
     
        const user = await User.findOne({username: req.body.username})
        if(!user){
            throw new Error("User credentials are incorrect!!")
        }

       
        const comparePass = await bcrypt.compare(req.body.password,user.password)
        if(!comparePass){
            throw new Error("User credentials are incorrect!")
        }

        const {password, ...others} = user._doc
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET,{expiresIn: '5h'})

        return res.status(200).json({others,token})
       
    }catch(error){
        return res.status(500).json(error.message);
    }

})

module.exports= authController
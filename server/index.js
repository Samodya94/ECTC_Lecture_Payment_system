const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const authController = require('./controllers/authController')
const lecturerController = require('./controllers/lecturerController')
const coveragesController = require('./controllers/coveragesController')
const attendancesController = require('./controllers/attendancesController')
const paymentsController = require('./controllers/paymentsController')
const gradesController = require('./controllers/gradesController')
const uploadController = require('./controllers/uploadController')
const { Server } = require('http')
const app = express()


//connect database
mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database is successfully connected!!')).catch((err) => { console.error(err); })
//mongoose.set('strictQuery', false);
//mongoose.set('strictQuery', true);

//routes & middlewares
//these 2 middlewares make req.body accessible, otherwise it would be undefined!!
app.use(cors())
//server is on port 5000 and client is on port 3000, 
//we are going to get a cors Error!,but cors() removes that error
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth',authController)
app.use('/coverages',coveragesController)
app.use('/attendances',attendancesController)
app.use('/payments',paymentsController)
app.use('/grades',gradesController)
app.use('/lecturer',lecturerController)






//start server
app.listen(process.env.PORT, () => console.log('Server has been started successfully!!'))


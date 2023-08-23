const asyncHandler = require('express-async-handler');
const Courses = require('../model/courseModel');


const getCourses = ( req , res ) => {
    res.send(Courses) ;

};

const createCourse = ( req , res ) => {
    const course = req.body ;

    Courses.push( {...course , id : uuid() }) ;
    res.send( "Course added successfully!") ; 
};

 const getCourse = ( req , res ) =>{
    const singleCourse = Courses.filter((course) => course.id === req.params.id) ;

    res.send(singleCourse) ;

};

 const deleteCourse = ( req , res ) =>{
    Courses = Courses.filter((course) => course.id !== req.params.id) ;

    res.send("Course Deleted Successfully!") ;

};

 const updateCourse = (req , res ) => {

    const course = Courses.find((course) => course.id === req.params.id ) ;

    course.cname = req.body.name ;
    course.fee = req.body.fee ;
    course.duration = req.body.duration ;

    res.send( "Course Updated Sucsessfully!" ) ;
};

module.exports = {
    getCourses,
    createCourse,
    getCourse,
    deleteCourse,
    updateCourse,
};


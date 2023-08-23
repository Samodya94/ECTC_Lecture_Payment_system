const asyncHandler = require('express-async-handler');
const Lecturers = require('../model/lecturerModel');

  const getLecturers = ( req , res ) => {
    res.send(Lecturersecturers) ;

};

 const createLecturer = ( req , res ) => {
    const lecturer = req.body ;

    Lecturersecturers.push( {...lecturer , id : uuid() }) ;
    res.send( "Lecturer added successfully!") ;
};

 const getLecturer = ( req , res ) =>{
    const singleLecturer = Lecturers.filter((lecturer) => lecturer.id === req.params.id) ;

    res.send(singleLecturer) ;

};

 const deleteLecturer = ( req , res ) =>{
    Lecturers = Lecturers.filter((lecturer) => lecturer.id !== req.params.id) ;

    res.send("Lecturer Deleted Successfully!") ;

};

 const updateLecturer = (req , res ) => {

    const lecturer = Lecturers.find((lecturer) => lecturer.id === req.params.id ) ;

    lecturer.nic = req.body.nic ;
    lecturer.uname = req.body.uname ;
    lecturer.fname = req.body.fname ;
    lecturer.lname = req.body.lname ;
    lecturer.email = req.body.email ;
    lecturer.phone = req.body.phone ;
    lecturer.branch = req.body.branch ;
    lecturer.rdate = req.body.rdate ;
    lecturer.ectc = req.body.ectc ;

    res.send( "Lecturer Details Updated Sucsessfully!" ) ;
};

module.exports = {
    getLecturer,
    createLecturer,
    getLecturers,
    deleteLecturer,
    updateLecturer,
};


const asyncHandler = require('express-async-handler');
const Student = require('../model/studentModel');

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

const createStudent = asyncHandler(async (req,res) => {
    const { nic, firstName, lastName  ,email , phone , branch ,course ,  batchCode } = req.body;
    console.log(nic, firstName, lastName,email,phone, branch,course ,batchCode);

    if(!nic || !firstName || !lastName || !email || !phone || !branch ||!course || !batchCode ) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const studentNicExists = await Student.findOne({ nic });

    if(studentNicExists) {
        res.status(400);
        throw new Error('Student Already Exists');
    }

    const student = await Student.create({
        nic,
        firstName,
        lastName,
        email,
        phone,
        branch,
        course,
        batchCode
    });

    if(student) {
        res.status(200).json({
            _id: student.id,
            nic: student.courseName,
            firstName: student.firstName,
            lastName : student.lastName,
            email : student.email,
            phone : student.phone,
            branch : student.branch,
            course : student.courseName,
            batchCode : student.batchCode,
        });
    } else {
            res.status(400);
            throw new Error('Invalid Student Details');
    }

    res.json({ message: 'New Student Created' });
});

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    await student.deleteOne();

    res.status(200).json({ id: req.params.id });
});

const putStudent = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        res.status(404);
        throw new Error('Student not found');
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedStudent);
});

module.exports = {
    getStudents,
    createStudent,
    putStudent,
    deleteStudent,
};

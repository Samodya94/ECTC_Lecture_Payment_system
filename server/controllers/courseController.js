const asyncHandler = require('express-async-handler');
const Course = require('../model/courseModel');

const getCourse = asyncHandler(async (req, res) => {
    const course = await Course.find();
    res.status(200).json(course);
});

const createCourse = asyncHandler(async (req,res) => {
    const { courseName, courseFee, courseDuration } = req.body;
    console.log(courseName, courseFee, courseDuration);

    if(!courseName || !courseFee || !courseDuration) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const courseNameExists = await Course.findOne({ courseName });

    if(courseNameExists) {
        res.status(400);
        throw new Error('Course Already Exists');
    }

    const course = await Course.create({
        courseName,
        courseFee,
        courseDuration,
    });

    if(course) {
        res.status(200).json({
            _id: course.id,
            courseName: course.courseName,
            courseFee: course.courseFee,
            courseDuration: course.courseDuration,
        });
    } else {
            res.status(400);
            throw new Error('Invalid Course Details');
    }

    res.json({ message: 'New Course Created' });
});

const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    await course.deleteOne();

    res.status(200).json({ id: req.params.id });
});

const putCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedCourse);
});

module.exports = {
    getCourse,
    createCourse,
    putCourse,
    deleteCourse,
};


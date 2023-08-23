
const express = require('express');
const router = express.Router();
const { getCourse, createCourse, deleteCourse, updateCourse, getCourses } = require('../controllers/courseController');

///router.route('/').get(getCourse).post(createCourse);
//router.route('/:id').delete(deleteCourse);

router.route('/courses').get(getCourses).post(createCourse);
router.route('/course/:id').delete(deleteCourse);
router.route('/course/:id').get(getCourse);
router.route('/course/:id').put(updateCourse) ;


module.exports = router ;
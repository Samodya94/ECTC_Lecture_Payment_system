const express = require('express');
const router = express.Router();
const { createCourse, deleteCourse, putCourse, getCourse, getCourseByName, getallCourses } = require('../controllers/courseController');

router.post('/', createCourse).get('/', getCourse);
router.put('/:id', putCourse).delete('/:id', deleteCourse);
router.get('/:courseName', getCourseByName);

module.exports = router;
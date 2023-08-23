
const express = require('express');
const router = express.Router();
const { getLecturer, createLecturer, deleteLecturer, updateLecturer, getLecturers } = require('../controllers/lecturerController');

///router.route('/').get(getCourse).post(createCourse);
//router.route('/:id').delete(deleteCourse);

router.route('/lecturers').get(getLecturers) ;
router.route('/lecturers').get(getLecturers).post(createLecturer);
router.route('/lecturer/:id').delete(deleteLecturer);
router.route('/lecturer/:id').get(getLecturer);
router.route('/lecturer/:id').put(updateLecturer) ;


module.exports = router ;
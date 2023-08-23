const express = require('express');
const router = express.Router();
const { createCourse, deleteCourse, putCourse, getCourse } = require('../controllers/courseController');

router.post('/', createCourse);
router.get('/', getCourse);
router.delete('/:id', deleteCourse);
router.put('/:id', putCourse);

module.exports = router ;
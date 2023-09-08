const express = require('express');
const router = express.Router();
const { createCourse, deleteCourse, putCourse, getCourse, getCourseNames } = require('../controllers/courseController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', branchAccessControl, createCourse).get('/', branchAccessControl, getCourse);
router.put('/:id',branchAccessControl, putCourse).delete('/:id',branchAccessControl, deleteCourse);
router.get('/courseName', branchAccessControl, getCourseNames);

module.exports = router ;
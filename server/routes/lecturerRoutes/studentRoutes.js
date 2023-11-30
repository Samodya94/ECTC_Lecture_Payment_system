const express = require('express');
const router = express.Router();
const { createStudent, deleteStudent, getStudents, putStudent } = require('../controllers/studentController');

router.post('/', createStudent);
router.get('/', getStudents);
router.delete('/:id', deleteStudent);
router.put('/:id', putStudent);


module.exports = router ;
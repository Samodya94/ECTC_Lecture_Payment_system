
const express = require('express');
const router = express.Router();
const { getLecturer, createLecturer, deleteLecturer, putLecturer, getLecturerById, loginLecturer } = require('../controllers/lecturerController');

router.post('/', createLecturer);
router.get('/', getLecturer);
router.post('/login',loginLecturer)
router.put('/:id', putLecturer);
router.delete('/:id', deleteLecturer);
router.get('/:id', getLecturerById);

module.exports = router;
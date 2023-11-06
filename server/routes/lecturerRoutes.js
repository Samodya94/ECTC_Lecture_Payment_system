
const express = require('express');
const router = express.Router();
const { getLecturer, createLecturer, deleteLecturer, putLecturer, getLecturerById } = require('../controllers/lecturerController');

router.post('/', createLecturer);
router.get('/', getLecturer);
router.put('/:id', putLecturer);
router.delete('/:id', deleteLecturer);
router.get('/:id', getLecturerById);

module.exports = router;
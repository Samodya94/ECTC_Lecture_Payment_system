
const express = require('express');
const router = express.Router();

const { getLecturer, createLecturer, deleteLecturer, putLecturer, getLecturerById, loginLecturer,changePassword } = require('../controllers/lecturerController');


router.post('/', createLecturer);
router.get('/', getLecturer);
router.put('/:id', putLecturer);
router.delete('/:id', deleteLecturer);
router.get('/:id', getLecturerById);
router.post('/login',loginLecturer);
router.get('/changepw/:id', changePassword);

module.exports = router;
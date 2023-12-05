
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const { getLecturer, createLecturer, deleteLecturer, putLecturer, getLecturerById, loginLecturer,changePassword } = require('../controllers/lecturerController');


router.post('/', createLecturer);
router.get('/', getLecturer);
router.put('/:id', putLecturer);
router.delete('/:id', deleteLecturer);
router.get('/:id', getLecturerById);
router.post('/login',loginLecturer);
router.post('/change-password',
[
  check('oldPassword', 'Old password is required').notEmpty(),
  check('newPassword', 'New password must be at least 6 characters long').isLength({ min: 6 }),
],changePassword);

module.exports = router;
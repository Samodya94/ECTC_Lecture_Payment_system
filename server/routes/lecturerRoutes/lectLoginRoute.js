const express = require('express');
const router = express.Router();

const { loginLecturer} = require('../../controllers/lecturerController');


router.post('/login',loginLecturer);

module.exports = router
const express = require('express');
const router = express.Router();
const {
    createLog
} = require('../controllers/lecLogController')

router.post('/',createLog)

module.exports = router
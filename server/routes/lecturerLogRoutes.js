const express = require('express');
const router = express.Router();

const {
    createLog,
    getLecLog
} = require('../controllers/lecLogController')

router.get('/',getLecLog);
router.post('/',createLog);

module.exports = router
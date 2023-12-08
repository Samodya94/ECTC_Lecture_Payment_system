const express = require('express');
const router = express.Router();
const {
    createLog,
    getLecLog,
    getLogByUser
} = require('../controllers/lecLogController')

router.post('/',createLog)
router.get('/',getLecLog)
router.get('/:user',getLogByUser)

module.exports = router
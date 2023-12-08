const express = require('express');
const router = express.Router();
const {
    createLog,
    getLecLog,
    getLogByUser,
    getRecentLogByUser
} = require('../controllers/lecLogController')

router.post('/',createLog)
router.get('/',getLecLog)
router.get('/:user',getLogByUser)
router.get('/recent/:user',getRecentLogByUser)

module.exports = router
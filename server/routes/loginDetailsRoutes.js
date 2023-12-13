const express = require('express');
const router = express.Router();
const { getLogByUser,
    getLoginDetails,
    createLog,
    getRecentLogByUser } = require('../controllers/loginDetailsController');

router.post('/', createLog).get('/', getLoginDetails);
router.get('/:username', getLogByUser);
router.get('/recent/:username', getRecentLogByUser);

module.exports = router;
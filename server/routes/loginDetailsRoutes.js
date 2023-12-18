const express = require('express');
const router = express.Router();
const { getLogByUser,
    getLoginDetails,
    createLog } = require('../controllers/loginDetailsController');

router.post('/', createLog).get('/', getLoginDetails);
router.get('/:username', getLogByUser);

module.exports = router;
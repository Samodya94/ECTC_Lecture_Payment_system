const express = require('express');
const router = express.Router();
const {
    getAssignedByLecture,
    getAssignedBatchByLecIdBatchCode,
    getAssignedBatchCode } = require('../../controllers/assignbatchController');

router.get('/assigncode/:bcode', getAssignedBatchCode)
router.get('/bylecture/:lecturerID', getAssignedByLecture);
router.get('/bylecture/:lecturerID/:batchCode', getAssignedBatchByLecIdBatchCode);


module.exports = router;
const express = require('express');
const router = express.Router();
const {
    getAssignedByLecture,
    getAssignedBatchByLecIdBatchCode,
    putAssignBatchbyBatchCode,
    getAssignedBatchCode } = require('../../controllers/assignbatchController');

router.get('/assigncode/:bcode', getAssignedBatchCode);
router.put('/bcode/:batchCode', putAssignBatchbyBatchCode);
router.get('/bylecture/:lecturerID', getAssignedByLecture);
router.get('/bylecture/:lecturerID/:batchCode', getAssignedBatchByLecIdBatchCode);

module.exports = router;
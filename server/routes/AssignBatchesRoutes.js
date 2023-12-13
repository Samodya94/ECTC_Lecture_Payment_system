const express = require('express');
const router = express.Router();
const { AssignBatch,
        putAssignBatch,
        deleteAssignedBatch,
        getallAssignedBatches,
        getAssignedBatchById,
        getAssignedByLecture,
        getAssignedBatchCode,
        getAssignedBatchByLecIdBatchCode,
        putAssignBatchbyBatchCode,
        getAssignedBatchCode } = require('../controllers/assignbatchController');

router.post('/', AssignBatch);
router.get('/', getallAssignedBatches);
router.put('/:id', putAssignBatch);
router.put('/bcode/:batchCode', putAssignBatchbyBatchCode);
router.delete('/:id', deleteAssignedBatch);
router.get('/:id', getAssignedBatchById);
router.get('/assigncode/:bcode', getAssignedBatchCode)
router.get('/bylecture/:lecturerID', getAssignedByLecture);
// router.get('/bylecture/:lecturerID/:batchCode', getAssignedBatchByLecIdBatchCode);


module.exports = router;
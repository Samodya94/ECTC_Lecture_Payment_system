const express = require('express');
const router = express.Router();
const { AssignBatch, putAssignBatch, deleteAssignedBatch, getallAssignedBatches, getAssignedBatchById, getAssignedByLecture } = require('../controllers/assignbatchController');

router.post('/', AssignBatch);
router.get('/', getallAssignedBatches);
router.put('/:id', putAssignBatch);
router.delete('/:id', deleteAssignedBatch);
router.get('/:id', getAssignedBatchById);
router.get('/bylecture/:lecturerID', getAssignedByLecture);


module.exports = router;
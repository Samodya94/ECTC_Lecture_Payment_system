const express = require('express');
const router = express.Router();
const { AssignBatch, putAssignBatch, deleteAssignedBatch, getallAssignedBatches, getAssignedBatchById,getAssignedByLecture } = require('../controllers/assignbatchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin", "Manager"]);

router.post('/', AssignBatch);
router.get('/', getallAssignedBatches);
router.put('/:id', branchAccessControl, putAssignBatch);
router.delete('/:id', branchAccessControl, deleteAssignedBatch);
router.get('/:id', getAssignedBatchById);
router.get('/bylecture/:lecturerID',getAssignedByLecture);


module.exports = router;
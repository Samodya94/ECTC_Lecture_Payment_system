const express = require('express');
const router = express.Router();
const { AssignBatch, putAssignBatch, deleteAssignedBatch, getallAssignedBatches, getAssignedBatchById } = require('../controllers/assignbatchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin", "Manager"]);

router.post('/', branchAccessControl, AssignBatch);
router.get('/', branchAccessControl, getallAssignedBatches);
router.put('/:id', branchAccessControl, putAssignBatch);
router.delete('/:id', branchAccessControl, deleteAssignedBatch);
router.get('/:id', branchAccessControl, getAssignedBatchById);


module.exports = router;
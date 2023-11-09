const express = require('express');
const router = express.Router();
const { AssignBatch, putAssignBatch, deleteAssignedBatch } = require('../controllers/assignbatchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Manager"]);

router.post('/', branchAccessControl, AssignBatch);
router.put('/:id', branchAccessControl, putAssignBatch);
router.delete('/:id', branchAccessControl, deleteAssignedBatch);

module.exports = router;
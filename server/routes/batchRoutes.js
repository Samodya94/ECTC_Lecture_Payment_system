const express = require('express');
const router = express.Router();
const { createBatch, putBatch, deleteBatch, getBatch, getallBatches, getBatchById } = require('../controllers/batchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', branchAccessControl, createBatch).get('/', branchAccessControl, getBatch);
router.put('/:id', branchAccessControl, putBatch).delete('/:id', branchAccessControl, deleteBatch);
router.get('/all', branchAccessControl, getallBatches);
router.get('/:id', branchAccessControl, getBatchById);

module.exports = router;
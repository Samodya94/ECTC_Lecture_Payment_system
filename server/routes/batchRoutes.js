const express = require('express');
const router = express.Router();
const { createBatch, putBatch, deleteBatch, getBatch, getallBatches, getBatchById } = require('../controllers/batchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin", "Manager"]);

router.post('/', branchAccessControl, createBatch).get('/', branchAccessControl, getBatch);
router.put('/:id', branchAccessControl, putBatch).delete('/:id', branchAccessControl, deleteBatch);
router.get('/all',  getallBatches);
router.get('/:id', getBatchById);

module.exports = router;
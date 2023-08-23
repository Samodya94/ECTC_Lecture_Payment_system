const express = require('express');
const router = express.Router();
const { createBatch,putBatch, deleteBatch } = require('../controllers/batchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', branchAccessControl, createBatch);
router.put('/:id', branchAccessControl, putBatch).delete('/:id', branchAccessControl, deleteBatch);

module.exports = router;
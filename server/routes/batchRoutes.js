const express = require('express');
const router = express.Router();
const { createBatch,putBatch, deleteBatch } = require('../controllers/batchController');

router.post('/', createBatch);
router.put('/:id', putBatch);
router.delete('/:id', deleteBatch);

module.exports = router;
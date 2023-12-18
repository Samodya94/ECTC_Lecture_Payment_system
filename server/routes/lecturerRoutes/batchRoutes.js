const express = require('express');
const router = express.Router();
const { createBatch, putBatch, deleteBatch, getBatch, getallBatches, getBatchById } = require('../../controllers/batchController');

router.post('/', createBatch).get('/', getBatch);
router.put('/:id', putBatch).delete('/:id', deleteBatch);
router.get('/all', getallBatches);
router.get('/:id', getBatchById);


module.exports = router;
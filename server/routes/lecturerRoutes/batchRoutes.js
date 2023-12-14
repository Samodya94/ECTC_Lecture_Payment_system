const express = require('express');
const router = express.Router();
const {getBatch, getallBatches, getBatchById } = require('../../controllers/batchController');

router.get('/', getBatch);
router.get('/all', getallBatches);
router.get('/:id', getBatchById);

module.exports = router;
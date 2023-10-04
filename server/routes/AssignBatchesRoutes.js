const express = require('express');
const router = express.Router();
const { AssignBatch ,putAssignBatch, deleteAssignedBatch } = require('../controllers/assignbatchController');

router.post('/', AssignBatch);
router.put('/:id', putAssignBatch);
router.delete('/:id', deleteAssignedBatch);

module.exports = router;
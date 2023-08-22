const express = require('express');
const router = express.Router();
const { getBranch, createBranch, deleteBranch } = require('../controllers/branchController');

router.route('/').get(getBranch).post(createBranch);
router.route('/:id').delete(deleteBranch);

module.exports = router;
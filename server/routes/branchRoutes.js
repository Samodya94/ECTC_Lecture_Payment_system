const express = require('express');
const router = express.Router();
const { getBranch, createBranch, deleteBranch, getallBranches } = require('../controllers/branchController');

router.route('/').get(getBranch).post(createBranch);
router.route('/:id').delete(deleteBranch);
router.route('/all').get(getallBranches);

module.exports = router;
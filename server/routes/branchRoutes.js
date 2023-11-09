const express = require('express');
const router = express.Router();
const { getBranch, createBranch, deleteBranch, getallBranches } = require('../controllers/branchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin", "Manager"]); // Adjust user levels as needed

router.route('/').get(branchAccessControl, getBranch).post(branchAccessControl, createBranch);
router.route('/:id').delete(branchAccessControl, deleteBranch);
router.route('/all').get(branchAccessControl, getallBranches);

module.exports = router;
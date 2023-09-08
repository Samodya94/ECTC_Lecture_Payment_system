const express = require('express');
const router = express.Router();
const { getBranch, createBranch, deleteBranch } = require('../controllers/branchController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]); // Adjust user levels as needed

router.route('/').get(branchAccessControl, getBranch).post(branchAccessControl, createBranch);
router.route('/:id').delete(branchAccessControl, deleteBranch);

module.exports = router;
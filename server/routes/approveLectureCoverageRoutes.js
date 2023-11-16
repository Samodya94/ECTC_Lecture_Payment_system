const express = require('express');
const router = express.Router();
const { createCoverage, deleteCoverage, putCoverage, getCoverage, getCoverageNotApproved } = require('../controllers/approveLectureCoversgeController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin", "Manager"]);

router.post('/', branchAccessControl, createCoverage).get('/', branchAccessControl, getCoverage);
router.put('/:id', branchAccessControl, putCoverage).delete('/:id', branchAccessControl, deleteCoverage);
router.get('/notapproved', branchAccessControl, getCoverageNotApproved);

module.exports = router;
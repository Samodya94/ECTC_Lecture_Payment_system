const express = require('express');
const router = express.Router();
const { createCoverage, deleteCoverage, putCoverage, getCoverage } = require('../controllers/approveLectureCoversgeController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', branchAccessControl, createCoverage).get('/', branchAccessControl, getCoverage);
router.put('/:id',branchAccessControl, putCoverage).delete('/:id',branchAccessControl, deleteCoverage);

module.exports = router;
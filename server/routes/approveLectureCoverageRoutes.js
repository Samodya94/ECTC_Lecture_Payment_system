const express = require('express');
const router = express.Router();
const { createCoverage, deleteCoverage, putCoverage, getCoverage, getCoverageNotApproved, getCoverageApproved } = require('../controllers/approveLectureCoversgeController');

router.post('/', createCoverage).get('/', getCoverage);
router.put('/:id', putCoverage).delete('/:id', deleteCoverage);
router.get('/notapproved', getCoverageNotApproved);
router.get('/approved', getCoverageApproved);

module.exports = router;
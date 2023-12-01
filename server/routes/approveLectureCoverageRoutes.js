const express = require('express');
const router = express.Router();
const { createCoverage,
        deleteCoverage,
        putCoverage,
        getCoverage,
        getCoverages,
        getCoverageNotApproved,
        getCoverageApproved,
        getLecCoverageNotApproved,
        getCoverageNotApprovedByMonth,
        getCoverageApprovedByLecturer,
        getCoverageByID } = require('../controllers/approveLectureCoversgeController');

router.post('/', createCoverage).get('/', getCoverage);
router.put('/:id', putCoverage).delete('/:id', deleteCoverage);
router.get('/:id', getCoverages);
router.get('/notapproved', getCoverageNotApproved);
router.get('/approved', getCoverageApproved);
router.get('/approved/:lecid', getCoverageApprovedByLecturer)
router.get('/lecnotApproved/:lecid', getLecCoverageNotApproved);
router.get('/notapprovedbymonth/:lecid', getCoverageNotApprovedByMonth)

module.exports = router;
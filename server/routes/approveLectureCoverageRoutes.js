const express = require('express');
const router = express.Router();
const { createCoverage,
    deleteCoverage,
    putCoverage,
    getCoverage,
    getCoverageById,
    getCoverageNotApproved,
    getCoverageApproved,
    getLecCoverageNotApproved,
    getSelectedCoverageByLecIdAndBatchCode,
    getCoverageNotApprovedByMonth,
    getCoverageApprovedByLecturer,
    getCoverageHistory,
    getCoverageByLecIdAndBatchCode,
    getPaymentNotApproved,    
    getPaymentPending, 
    getLecCoverageRejected} = require('../controllers/approveLectureCoversgeController');

router.post('/', createCoverage).get('/', getCoverage);
router.put('/:id', putCoverage).delete('/:id', deleteCoverage);
router.get('/notapproved', getCoverageNotApproved);
router.get('/approved', getCoverageApproved);
router.get('/pay/paymentnotapproved', getPaymentNotApproved);
router.get('/pay/paymentpending', getPaymentPending);
router.get('/:id', getCoverageById);
router.get('/approved/:lecid', getCoverageApprovedByLecturer);
router.get('/lecnotApproved/:lecid', getLecCoverageNotApproved);
router.get('/Rejected/:lecid', getLecCoverageRejected);
router.get('/leccoverageHistory/:lecid/:currentMonth/:currentYear', getCoverageHistory);
router.get('/notapprovedbymonth/:lecid', getCoverageNotApprovedByMonth);
router.get('/leccoverageHistory/:lecid', getCoverageHistory);
router.get('/notapprovedbymonth/:lecid', getCoverageNotApprovedByMonth);
router.get('/:lecid/:batchcode/:month/:year/:paymentStatus', getCoverageByLecIdAndBatchCode);
router.get('/:lecid/:batchcode', getSelectedCoverageByLecIdAndBatchCode)
router.get('/:lecid/:month/:year', getCoverageByLecIdAndBatchCode);

module.exports = router;
const express = require('express');
const router = express.Router();
const { 
    getPaymentById,  
    getPaymentsByLecturer,
    getPaymentApproved,
    getPaymentRollback,
    getPaymentAdminNotApproved,
    exportPayments,
    getPaymentByMonthlecid
} = require('../../controllers/paymentsController');

router.get('/approvedpayment', getPaymentApproved);
router.get('/rollbackpayment', getPaymentRollback);
router.get('/admin/notapproved', getPaymentAdminNotApproved);
router.get('/:id', getPaymentById);
router.get('/pay/:lecid', getPaymentsByLecturer);
router.get('/report/export', exportPayments);
router.get('/lecpayMonth/:lecid/:currentMonth/:currentYear',getPaymentByMonthlecid);

module.exports = router;
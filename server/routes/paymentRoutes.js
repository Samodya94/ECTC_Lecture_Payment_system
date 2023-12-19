const express = require('express');
const router = express.Router();
const { getPayments,
    getPaymentById,
    putPayment,
    createPayment,
    getPaymentPending,
    getPaymentsByLecturer,
    getPaymentApproved,
    getPaymentRollback,
    getPaymentAdminNotApproved,
    exportPayments } = require('../controllers/paymentsController');

router.post('/', createPayment).get('/', getPayments);
router.put('/:id', putPayment);
router.get('/pendingpayment', getPaymentPending);
router.get('/approvedpayment', getPaymentApproved);
router.get('/rollbackpayment', getPaymentRollback);
router.get('/admin/notapproved', getPaymentAdminNotApproved);
router.get('/:id', getPaymentById);
router.get('/pay/:lecid', getPaymentsByLecturer);
router.get('/report/export', exportPayments);



module.exports = router;
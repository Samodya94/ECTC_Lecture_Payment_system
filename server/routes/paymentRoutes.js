const express = require('express');
const router = express.Router();
const { getPayments,
        getPaymentById,
        putPayment,
        createPayment,
        getPaymentPending,
        getPaymentsByLecturer,
        getPaymentApproved } = require('../controllers/paymentsController');

router.post('/', createPayment).get('/', getPayments);
router.put('/:id', putPayment);
router.get('/pendingpayment', getPaymentPending);
router.get('/approvedpayment', getPaymentApproved);
router.get('/:id', getPaymentById);
router.get('/pay/:lecid', getPaymentsByLecturer)



module.exports = router;
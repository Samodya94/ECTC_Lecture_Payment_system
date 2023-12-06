const express = require('express');
const router = express.Router();
const { getPayments, getPaymentById, putPayment, createPayment } = require('../controllers/paymentsController');

router.post('/', createPayment).get('/', getPayments);
router.put('/:id', putPayment);
router.get('/:id', getPaymentById);

module.exports = router;
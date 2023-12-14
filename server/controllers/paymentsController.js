const asyncHandler = require('express-async-handler');
const Payment = require('../model/Payments')

//get all
const getPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find();
    res.status(200).json(payments);
});

//get by id
const getPaymentById = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
        res.status(404);
        throw new Error('Payment not found');
    }

    res.status(200).json(payment);
});

//put payment
const putPayment = asyncHandler(async (req, res) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
        res.status(404);
        throw new Error('Details not found');
    }

    const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedPayment);
});

//create payment
const createPayment = asyncHandler(async (req, res) => {
    const payment = new Payment(req.body);
    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
});

//get all status = Pending
const getPaymentPending = asyncHandler(async (req, res) => {
    const payment = await Payment.find({ status: "Not Approved" });
    res.status(200).json(payment);
});

//get all status = Approved
const getPaymentApproved = asyncHandler(async (req, res) => {
    const payment = await Payment.find({ status: "Approved" });
    res.status(200).json(payment);
});

//get all rollback payments
const getPaymentRollback = asyncHandler(async (req, res) => {
    const payment = await Payment.find({ status: "Approved", adminStatus: "Not Approved" });
    res.status(200).json(payment);
});

//get all payments adminStatus = Not Approved
const getPaymentAdminNotApproved = asyncHandler(async (req, res) => {
    const payment = await Payment.find({ adminStatus: "Not Approved" });
    res.status(200).json(payment);
});

const getPaymentsByLecturer = asyncHandler(async (req, res) => {
    const lecid = req.params

    const payment = Payment.find({
        lecturerId: lecid,
        status: "Approved"
    })

    res.status(200).json(payment)
})

module.exports = {
    getPayments,
    getPaymentById,
    putPayment,
    createPayment,
    getPaymentPending,
    getPaymentsByLecturer,
    getPaymentApproved,
    getPaymentRollback,
    getPaymentAdminNotApproved
};



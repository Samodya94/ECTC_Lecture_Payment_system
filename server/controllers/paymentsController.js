const asyncHandler = require('express-async-handler');
const Payment = require('../model/Payments')
const Batch = require('../model/batchModel')
const Lecturer = require('../model/lecturerModel')
const excelJS = require("exceljs");


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
});

const exportPayments = asyncHandler(async (req, res) => {
    const { lecturerId, batchcode, month } = req.query;

    // Build the filter object based on provided parameters
    const filter = {};
    if (lecturerId) filter.lecturerId = lecturerId;
    if (batchcode) filter.batchcode = batchcode;
    if (month) filter.month = month;

    // Use the filter object in the Payment.find() query
    const payments = await Payment.find(filter);
    const workbook = new excelJS.Workbook();

    function calculateDuration(duration) {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);

        return `${hours}h : ${minutes}m`;
    }

    const getLecturer = async (_id) => {
        const lecturer = await Lecturer.findById(_id);
        return lecturer.firstName + " " + lecturer.lastName;
    };

    const getBatch = async (_id) => {
        const batch = await Batch.findById(_id);
        return batch.batchCode;
    };

    const batchPromises = payments.map((payment) => getBatch(payment.batchcode));
    const batchCodes = await Promise.all(batchPromises);

    const lecturerName = await getLecturer(lecturerId);
    console.log(lecturerName);

    const worksheet = workbook.addWorksheet(`${lecturerName}`);

    worksheet.columns = [
        { header: "Course Name", key: "coursename", width: 15 },
        { header: "Batch Code", key: "batchcode", width: 15 },
        { header: "Month", key: "month", width: 15 },
        { header: "Total Hours", key: "totalhours", width: 15 },
        { header: "Payment Rate", key: "paymentrate", width: 15 },
        { header: "Paid Amount", key: "paidamount", width: 15 },
        { header: "Payment Date", key: "paymentDate", width: 15 },
    ];

    payments.forEach((payment, index) => {
        const batchname = batchCodes[index];
        worksheet.addRow(
            {
                coursename: payment.coursename,
                batchcode: batchname,
                month: payment.month,
                totalhours: calculateDuration(payment.totalhours),
                paymentrate: payment.paymentrate,
                paidamount: payment.paidamount,
                paymentDate: payment.paymentDate,
            },
            "n"
        );
    });

    const buffer = await workbook.xlsx.writeBuffer();
    res.send(buffer);
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileExtension = ".xlsx";
    const fileName = "Payments";
    res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + fileName + fileExtension
    );
    res.type(fileType);

});

module.exports = {
    getPayments,
    getPaymentById,
    putPayment,
    createPayment,
    getPaymentPending,
    getPaymentsByLecturer,
    getPaymentApproved,
    getPaymentRollback,
    getPaymentAdminNotApproved,
    exportPayments
};



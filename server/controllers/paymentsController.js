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
const getPaymentPending= asyncHandler(async (req, res) => {
    const payment = await Payment.find({ status: "Pending" });
    res.status(200).json(payment);
  });

const getPaymentsByLecturer = asyncHandler(async (req,res) =>{
    const lecid = req.params.lecid;
    // const {currentMonth,currentYear }= req.body

    // if (isNaN(currentMonth) || isNaN(currentYear)) {
    //     return res.status(500).json({ error: "Invalid current month or year" });
    //   }
    
    //   let nextMonth = currentMonth + 1;
    //   let nextYear = currentYear;
    
    //   // Check if it's December (12), in which case the next month is January of the next year
    //   if (nextMonth > 12) {
    //     nextMonth = 1;
    //     nextYear++;
    //   }
    
    //   const startDate = new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`);
    //   const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    //   const endDate = new Date(
    //     `${currentYear}-${currentMonth}-${lastDayOfMonth}T23:59:59.999Z`
    //   );
    


    const   payment = await Payment.find({
        lecturerId: lecid,
        status:"Approved",       
        // date: {
        //     $exists: true,
        //     $type: "date",
        //     $gte: startDate,
        //     $lt: endDate,
        //   },
    })

    res.status(200).json(payment)
})

module.exports = {
    getPayments,
    getPaymentById,
    putPayment,
    createPayment,
    getPaymentPending,
    getPaymentsByLecturer
};



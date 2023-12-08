const asyncHandler = require("express-async-handler");
const Coverage = require("../model/approveLectureCoverageModel");

const getCoverage = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find();
  res.status(200).json(coverage);
});

const createCoverage = asyncHandler(async (req, res) => {
  const {
    lectureid,
    courseName,
    batchCode,
    startTime,
    endTime,
    duration,
    date,
    lectureCoverage,
  } = req.body;

  try {
    // Custom validation to check for overlapping time intervals
    const existingCoverage = await Coverage.findOne({
      lectureid,
      date,
      $or: [
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime } }
          ]
        },
        {
          $and: [
            { startTime: { $lte: endTime } },
            { endTime: { $gte: endTime } }
          ]
        },
        {
          $and: [
            { startTime: { $gte: startTime } },
            { endTime: { $lte: endTime } }
          ]
        }
      ]
    });

    if (existingCoverage) {
      res.status(400);
      throw new Error('Coverage with overlapping time already exists');
    }

    // Additional custom validation for ensuring duration > 0
    if (duration <= 0) {
      res.status(400);
      throw new Error('Duration must be greater than 0');
    }

    // Create coverage if validation passes
    const coverage = await Coverage.create({
      lectureid,
      courseName,
      batchCode,
      startTime,
      endTime,
      duration,
      date,
      lectureCoverage,
    });

    res.status(200).json({
      coverageID: coverage._id,
      lectureid: coverage.lectureid,
      courseName: coverage.courseName,
      batchCode: coverage.batchCode,
      startTime: coverage.startTime,
      endTime: coverage.endTime,
      duration: coverage.duration,
      date: coverage.date,
      lectureCoverage: coverage.lectureCoverage,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const deleteCoverage = asyncHandler(async (req, res) => {
  const coverage = await Coverage.findById(req.params.id);

  if (!coverage) {
    res.status(404);
    throw new Error("Lecture Coverage not found");
  }
  await coverage.deleteOne();
  res.status(200).json({ id: req.params.id });
});

const putCoverage = asyncHandler(async (req, res) => {
  const coverage = await Coverage.findById(req.params.id);

  if (!coverage) {
    res.status(404);
    throw new Error("Lecture Coverage not found");
  }

  const updatedCoverage = await Coverage.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCoverage);
  console.log(updatedCoverage);
});

//get all status = Not Approved
const getCoverageNotApproved = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find({ status: "Not Approved" });
  res.status(200).json(coverage);
});

const getCoverageById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const coverage = await Coverage.findOne({ _id: id });
  res.status(200).json(coverage);
});

const getLecCoverageNotApproved = asyncHandler(async (req, res) => {
  const lecid = req.params.lecid;
  const coverage = await Coverage.find({
    status: "Not Approved",
    lectureid: lecid,
  });
  res.status(200).json(coverage);
});

const getCoverageNotApprovedByMonth = asyncHandler(async (req, res) => {
  const lecid = req.params.lecid;
  const currentDate = new Date();
  console.log(currentDate)
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  if (isNaN(currentMonth) || isNaN(currentYear)) {
    return res.status(500).json({ error: 'Invalid current month or year' });
  }

  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  // Check if it's December (12), in which case the next month is January of the next year
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }

  console.log(nextMonth)
  console.log(nextYear)

  const startDate = new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`);
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
  const endDate = new Date(`${currentYear}-${currentMonth}-${lastDayOfMonth}T23:59:59.999Z`);

  console.log(endDate)

  const coverage = await Coverage.find({
    status: "Not Approved",
    lectureid: lecid,
    date: {
      $exists: true,
      $type: 'date',
      $gte: startDate,
      $lt: endDate,
    },
  });

  res.status(200).json(coverage);
});

//get all status = Approved
const getCoverageApproved = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find({ status: "Approved" });
  res.status(200).json(coverage);
});

const getCoverageApprovedByLecturer = asyncHandler(async (req, res) => {
  const lecid = req.params.lecid

  const coverage = await Coverage.find({ status: "Approved", lectureid: lecid });
  res.status(200).json(coverage);
});

//get coverage by lectureid, batchcode, month and year
const getCoverageByLecIdAndBatchCode = asyncHandler(async (req, res) => {
  const lecid = req.params.lecid;
  const batchcode = req.params.batchcode;
  const status = "Approved";
  const paymentStatus = "Not Approved";

  const currentMonth = req.params.month;
  const currentYear = req.params.year;

  if (isNaN(currentMonth) || isNaN(currentYear)) {
    return res.status(500).json({ error: 'Invalid current month or year' });
  }

  let nextMonth = currentMonth + 1;
  let nextYear = currentYear;

  // Check if it's December (12), in which case the next month is January of the next year
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }

  const startDate = new Date(`${currentYear}-${currentMonth}-01T00:00:00.000Z`);
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
  const endDate = new Date(`${currentYear}-${currentMonth}-${lastDayOfMonth}T23:59:59.999Z`);

  const coverage = await Coverage.find({
    lectureid: lecid,
    batchCode: batchcode,
    date: {
      $exists: true,
      $type: 'date',
      $gte: startDate,
      $lt: endDate,
    },
    status: status,
    paymentStatus: paymentStatus,
  });
  res.status(200).json(coverage);
});

//get all status = Approved and paymentStatus = Not Approved
const getPaymentNotApproved = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find({ paymentStatus: "Not Approved", status: "Approved" });
  res.status(200).json(coverage);
});

//get all status = Approved and paymentStatus = Pending
const getPaymentPending = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find({ paymentStatus: "Pending", status: "Approved" });
  res.status(200).json(coverage);
});

module.exports = {
  createCoverage,
  getCoverage,
  putCoverage,
  getCoverageById,
  deleteCoverage,
  getCoverageNotApproved,
  getCoverageApproved,
  getLecCoverageNotApproved,
  getCoverageNotApprovedByMonth,
  getCoverageApprovedByLecturer,
  getCoverageByLecIdAndBatchCode,
  getPaymentNotApproved,
  getPaymentPending,
};

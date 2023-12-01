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

    if (coverage) {
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
    } else {
      res.status(400);
      throw new Error("Invalid Course Details");
    }
  } catch (error) {
    console.log(error.message);
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
});

//get all status = Not Approved
const getCoverageNotApproved = asyncHandler(async (req, res) => {
  const coverage = await Coverage.find({ status: "Not Approved" });
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
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const coverage = await Coverage.find({
    status: "Not Approved",
    lectureid: lecid,
    date: {
      $gte: new Date(`${currentYear}-${currentMonth}-01`),
      $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
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

const getCoverageByID = asyncHandler(async (req, res) => {
  const coverage = await Coverage.findById(req.params.id);
  res.status(200).json(coverage);
});

module.exports = {
  createCoverage,
  getCoverage,
  putCoverage,
  deleteCoverage,
  getCoverageNotApproved,
  getCoverageApproved,
  getLecCoverageNotApproved,
  getCoverageNotApprovedByMonth,
  getCoverageApprovedByLecturer,
  getCoverageByID
};

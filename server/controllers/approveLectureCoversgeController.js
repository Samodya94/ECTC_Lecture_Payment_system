const asyncHandler = require('express-async-handler');
const Coverage = require('../model/approveLectureCoverageModel');

const getCoverage = asyncHandler(async (req, res) => {
    const coverage = await Coverage.find();
    res.status(200).json(coverage);
});

const createCoverage = asyncHandler(async (req, res) => {
    const { lectureid, courseName, batchCode, startTime, endTime, date, lectureCoverage, status } = req.body;

    if (!lectureid || !courseName || !batchCode || !startTime || !endTime || !date || !lectureCoverage || !status) {
        res.status(400).json({ message: 'Please Fill All Fields' });
        return;
    }

    const coverageExists = await Coverage.findOne({ _id: req.body._id });

    if (coverageExists) {
        res.status(400).json({ message: 'Coverage Already Exists' });
        return;
    }

    const coverage = await Coverage.create({
        lectureid,
        courseName,
        batchCode,
        startTime,
        endTime,
        date,
        lectureCoverage,
        status
    });

    if (coverage) {
        res.status(200).json({
            coverageID: coverage._id,
            lectureid: coverage.lectureid,
            courseName: coverage.courseName,
            batchCode: coverage.batchCode,
            startTime: coverage.startTime,
            endTime: coverage.endTime,
            date: coverage.date,
            lectureCoverage: coverage.lectureCoverage,
            status: coverage.status
        });
    } else {
        res.status(400);
        throw new Error('Invalid Course Details');
    }

    res.json({ message: 'New Lecture Coverage Created' });
});

const deleteCoverage = asyncHandler(async (req, res) => {
    const coverage = await Coverage.findById(req.params.id);

    if (!coverage) {
        res.status(404);
        throw new Error('Lecture Coverage not found');
    }

    await coverage.deleteOne();

    res.status(200).json({ id: req.params.id });
});

const putCoverage = asyncHandler(async (req, res) => {
    const coverage = await Coverage.findById(req.params.id);

    if (!coverage) {
        res.status(404);
        throw new Error('Lecture Coverage not found');
    }

    const updatedCoverage = await Coverage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedCoverage);
});

//get all status = Not Approved
const getCoverageNotApproved = asyncHandler(async (req, res) => {
    const coverage = await Coverage.find({ status: "Not Approved" });
    res.status(200).json(coverage);
});

//get all status = Approved
const getCoverageApproved = asyncHandler(async (req, res) => {
    const coverage = await Coverage.find({ status: "Approved" });
    res.status(200).json(coverage);
});
module.exports = {
    createCoverage,
    getCoverage,
    putCoverage,
    deleteCoverage,
    getCoverageNotApproved,
    getCoverageApproved
};

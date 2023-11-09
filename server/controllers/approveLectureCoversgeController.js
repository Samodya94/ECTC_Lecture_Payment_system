const asyncHandler = require('express-async-handler');
const Coverage = require('../model/approveLectureCoverageModel');

const getCoverage = asyncHandler(async (req, res) => {
    const coverage = await Coverage.find();
    res.status(200).json(coverage);
});

const createCoverage = asyncHandler(async (req, res) => {
    const { coverageID ,lecturerName, courseName, batchCode, startTime, endTime, date, lectureCoverage , status} = req.body;

    if (!coverageID || !lecturerName || !courseName || !batchCode || !startTime || !endTime || ! date || ! lectureCoverage || ! status) {
        res.status(400).json({ message: 'Please Fill All Fields' });
        return;
    }

    const coverageExists = await Coverage.findOne({ coverageID });

    if (coverageExists) {
        res.status(400).json({ message: 'Coverage Already Exists' });
        return;
    }

    const coverage = await Coverage.create({
        coverageID ,
        lecturerName, 
        courseName, 
        batchCode, 
        startTime, 
        endTime, 
        date, 
        lectureCoverage,
        status
    });
    
    if(coverage) {
        res.status(200).json({
            _id: coverage.id,
            coverageID: coverage.coverageID,
            lecturerName: coverage.lecturerName, 
            courseName: coverage.courseName, 
            batchCode: coverage.batchCode, 
            startTime: coverage.startTime, 
            endTime: coverage.endTime, 
            date: coverage.date, 
            lectureCoverage: coverage.lectureCoverage,
            status:coverage.status
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

module.exports = {
    createCoverage,
    getCoverage,
    putCoverage,
    deleteCoverage,
};

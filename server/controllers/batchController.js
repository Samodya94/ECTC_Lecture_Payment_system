const asyncHandler = require('express-async-handler');
const Batch = require('../model/batchModel');

const getBatch = asyncHandler(async (req, res) => {
    const batch = await Batch.find();
    res.status(200).json(batch);
});

const createBatch = asyncHandler(async (req,res) => {
    const { batchCode, course, branch, startDate, endDate, batchState } = req.body;
    console.log(batchCode, course, branch, startDate, endDate, batchState);

    if(!batchCode || !course || !branch || !startDate || !endDate || !batchState) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const batchCodeExists = await Batch.findOne({ batchCode });

    if(batchCodeExists) {
        res.status(400);
        throw new Error('Batch Code Already Exists');
    }

    const batch = await Batch.create({
        batchCode,
        course,
        branch,
        startDate,
        endDate,
        batchState,
    });

    if(batch) {
        res.status(200).json({
            _id: batch.id,
            batchCode: batch.batchCode,
            course: batch.course,
            branch: batch.branch,
            startDate: batch.startDate,
            endDate: batch.enddate,
            batchState: batch.batchState,
        });
    } else {
            res.status(400);
            throw new Error('Invalid Batch Details');
    }

    res.json({ message: 'Batch Created' });
});

const putBatch = asyncHandler(async (req, res) => {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
        res.status(404);
        throw new Error('Batch not found');
    }

    const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedBatch);
});

const deleteBatch = asyncHandler(async (req, res) => {
    const batch = await Batch.findById(req.params.id);

    if (!batch) {
        res.status(404);
        throw new Error('Batch not found');
    }

    await batch.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createBatch,
    putBatch,
    deleteBatch,
    getBatch,
};
const asyncHandler = require('express-async-handler');
const AssignedBatch = require('../model/assignbatchmodel');

const AssignBatch = asyncHandler(async (req, res) => {
    const { lecturerNic, lecturerName, course, batchcode, rate, hours } = req.body;
    console.log(lecturerNic, lecturerName, course, batchcode, rate, hours);

    if (!lecturerNic || !lecturerName || !course || !batchcode || !rate || !hours) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const batchAssigned = await AssignedBatch.findOne({ batchcode });

    if (batchAssigned) {
        res.status(400);
        throw new Error('Batch Already Assigned');
    }

    const abatch = await AssignedBatch.create({
        lecturerNic,
        lecturerName,
        course,
        batchcode,
        rate,
        hours,
    });

    if (abatch) {
        res.status(200).json({
            _id: abatch.id,
            lecturerNic: abatch.lecturerNic,
            lecturerName: abatch.lecturerName,
            course: abatch.course,
            batchcode: abatch.batchcode,
            rate: abatch.rate,
            hours: abatch.hours,

        });
    } else {
        res.status(400);
        throw new Error('Invalid Details');
    }

    res.json({ message: 'Batch Assigned' });
});

const putAssignBatch = asyncHandler(async (req, res) => {
    const abatch = await AssignedBatch.findById(req.params.id);

    if (!abatch) {
        res.status(404);
        throw new Error('Details not found');
    }

    const updatedAssignedBatch = await AssignedBatch.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedAssignedBatch);
});

const deleteAssignedBatch = asyncHandler(async (req, res) => {
    const abatch = await AssignedBatch.findById(req.params.id);

    if (!abatch) {
        res.status(404);
        throw new Error('Batch not found');
    }

    await abatch.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    AssignBatch,
    putAssignBatch,
    deleteAssignedBatch,
};
const asyncHandler = require('express-async-handler');
const Branch = require('../model/branchModel');

const getBranch = asyncHandler(async (req, res) => {
    const branches = await Branch.find();
    res.status(200).json(branches);
});

const createBranch = asyncHandler(async (req, res) => {
    const { branchName } = req.body;

    if (!branchName) {
        res.status(400);
        throw new Error('Please Enter Branch Name');
    }

    const branch = await Branch.create({ branchName });
    res.status(200).json(branch);
});

const deleteBranch = asyncHandler(async (req, res) => {
    const branch = await Branch.findById(req.params.id);

    if (!branch) {
        res.status(404);
        throw new Error('Branch Not Found');
    }

    await branch.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getBranch,
    createBranch,
    deleteBranch,
};

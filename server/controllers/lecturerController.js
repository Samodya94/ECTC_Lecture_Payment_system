const asyncHandler = require('express-async-handler');
const Lecturer = require('../model/lecturerModel');
const bcrypt = require('bcryptjs');

const getLecturer = asyncHandler(async (req, res) => {
    const lecturer = await Lecturer.find();
    res.status(200).json(lecturer);
});

const getLecturerById = asyncHandler(async (req, res) => {
    const lecturer = await Lecturer.findById(req.params.id);

    if (!lecturer) {
        res.status(404);
        throw new Error('Lecturer not found');
    }

    res.status(200).json(lecturer);
});

const createLecturer = asyncHandler(async (req, res) => {
    const { nic, username, firstName, lastName, email, phone, branch, password } = req.body;
    console.log(nic, username, firstName, lastName, email, phone, branch, password);

    if (!nic || !username || !firstName || !lastName || !email || !phone || !branch || !password) {
        res.status(400);
        throw new Error('Please Fill All Fields');
    }

    const LecturerExists = await Lecturer.findOne({ nic });

    if (LecturerExists) {
        res.status(400);
        throw new Error('Lecturer Already Exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const lecturer = await Lecturer.create({
        nic,
        username,
        firstName,
        lastName,
        email,
        phone,
        branch,
        password: hashedPassword,
    });

    if (lecturer) {
        res.status(200).json({
            _id: lecturer.id,
            nic: lecturer.nic,
            username: lecturer.username,
            firstName: lecturer.firstName,
            lastName: lecturer.lastName,
            email: lecturer.email,
            phone: lecturer.phone,
            branch: lecturer.branch,
        });
    } else {
        res.status(400);
        throw new Error('Invalid Lecturer Data');
    }

    res.json({ message: 'Lecturer Registered' });
});

const deleteLecturer = asyncHandler(async (req, res) => {
    const lecturer = await Lecturer.findById(req.params.id);

    if (!lecturer) {
        res.status(404);
        throw new Error('Lecturer not found');
    }

    await lecturer.deleteOne();

    res.status(200).json({ id: req.params.id });
});

const putLecturer = asyncHandler(async (req, res) => {
    const lecturer = await Lecturer.findById(req.params.id);

    if (!lecturer) {
        res.status(404);
        throw new Error('Lecturer not found');
    }

    const updatedLecturer = await Lecturer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedLecturer);
});

module.exports = {
    getLecturer,
    createLecturer,
    putLecturer,
    deleteLecturer,
    getLecturerById,
};


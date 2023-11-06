
const express = require('express');
const router = express.Router();
const { getLecturer, createLecturer, deleteLecturer, putLecturer } = require('../controllers/lecturerController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', branchAccessControl, createLecturer).get('/', branchAccessControl, getLecturer);
router.put('/:id',branchAccessControl, putLecturer).delete('/:id',branchAccessControl, deleteLecturer);

module.exports = router ;
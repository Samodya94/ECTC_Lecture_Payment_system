const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, deleteUser, getallUsers } = require('../controllers/userController');
const { protectUser, authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', protectUser, branchAccessControl, createUser);
router.post('/login', loginUser);
router.get('/', protectUser, branchAccessControl, getUser).delete('/:id', branchAccessControl, deleteUser);
router.get('/all', protectUser, branchAccessControl, getallUsers)

module.exports = router;
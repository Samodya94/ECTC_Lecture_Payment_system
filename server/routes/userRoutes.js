const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, deleteUser, getallUsers, getUserByUserName, changePassword, resetPassword } = require('../controllers/userController');
const { protectUser, authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', protectUser, branchAccessControl, createUser);
router.post('/login', loginUser);
router.get('/', protectUser, branchAccessControl, getUser).delete('/:id', deleteUser);
router.get('/all', protectUser, branchAccessControl, getallUsers);
router.get('/:username', protectUser, branchAccessControl, getUserByUserName);
router.post('/change-password', changePassword);
router.post('/reset-password', resetPassword);

module.exports = router;
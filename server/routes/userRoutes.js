const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, deleteUser, getallUsers, getUserByUserName, changePassword, resetPassword, editUser } = require('../controllers/userController');
const { protectUser, authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/', protectUser, branchAccessControl, createUser);
router.post('/login', loginUser);
router.get('/', protectUser, branchAccessControl, getUser).delete('/:id', deleteUser);
router.get('/all', protectUser, branchAccessControl, getallUsers);
router.get('/:username', protectUser, getUserByUserName);
router.post('/change-password', protectUser, changePassword);
router.post('/reset-password', resetPassword);
router.put('/:id', protectUser, editUser);

module.exports = router;
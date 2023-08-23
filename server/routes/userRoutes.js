const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, deleteUser } = require('../controllers/userController');
const { authorize } = require('../middleware/authMiddleware');

const branchAccessControl = authorize(["Admin"]);

router.post('/',branchAccessControl, createUser);
router.post('/login', loginUser);
router.get('/',branchAccessControl, getUser).delete('/:id',branchAccessControl, deleteUser);

module.exports = router;
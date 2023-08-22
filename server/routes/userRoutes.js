const express = require('express');
const router = express.Router();
const { createUser, loginUser, getMe, deleteUser } = require('../controllers/userController');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', getMe);
router.delete('/:id', deleteUser);

module.exports = router;
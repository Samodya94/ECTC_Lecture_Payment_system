const express = require('express');
const router = express.Router();
const { createUser, loginUser, getUser, deleteUser } = require('../controllers/userController');

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/me', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
const express = require('express');
const router = express.Router();

// defining different user functionalities
const {
    getUsers,
    createUser,
    logUserIn
} = require('../controllers/users');

// defining paths to different user functionalities
router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', logUserIn);

// exporting router module
module.exports = router;

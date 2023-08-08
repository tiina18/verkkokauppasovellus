const express = require('express');
// adding express router
const router = express.Router();

// defining different category functionalities
const {
    getCategories,
    createCategory
} = require('../controllers/categories');

// defining paths to different category functionalities
router.get('/', getCategories);
router.post('/', createCategory);

// exporting router module
module.exports = router;

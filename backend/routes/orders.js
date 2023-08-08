const express = require('express');
const router = express.Router();

// defining different order functionalities
const {
    getOrders,
    createOrder
} = require('../controllers/orders');

// defining paths to different order functionalities
router.get('/', getOrders);
router.post('/', createOrder);

// exporting router module
module.exports = router;

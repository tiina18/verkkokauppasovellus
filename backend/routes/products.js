const express = require('express');
const router = express.Router();

// defining different product functionalities
const {
    getProducts,
    createProduct,
    updateProductQuantity
} = require('../controllers/products');

// defining paths to different product functionalities
router.get('/', getProducts);
router.post('/', createProduct);
// router.put('/', updateProductQuantity);

// exporting router module
module.exports = router;

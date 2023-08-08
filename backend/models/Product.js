const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// creating the productSchema (product model) with necessary information
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Tuotteella täytyy olla nimi']
    },
    product_price: {
        type: Number,
        required: [true, 'Tuotteella täytyy olla hinta']
    },
    product_description: {
        type: String,
        required: [true, 'Tuotteella täytyy olla kuvaus']
    },
    product_category: {
        type: String,
        required: [true, 'Tuotteella täytyy olla kategoria']
    },
    product_inStock: {
        type: Number,
        required: [true, 'Tuotteella täytyy olla määrä']
    }
});

const Product = mongoose.model('Product', productSchema);

// exporting the created Product-model
module.exports = Product;

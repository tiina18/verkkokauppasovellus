const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// creating the order schema (model) with necessary information
const orderSchema = new mongoose.Schema({
    order_number: {
        type: Number,
        required: [true, 'Tilauksella täytyy olla nimi']
    },
    order_products: {
        type: Array,
        required: [true, 'Tilauksen täytyy sisältää tuotteita']
    },
    order_orderer: {
        type: Object,
        required: [false, 'Tilauksen tilaaja']
    }
});

const Order = mongoose.model('Order', orderSchema);

// exporting the created Order-model
module.exports = Order;

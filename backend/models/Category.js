const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// creating the category schema (model) with necessary information
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, 'Kategorialla täytyy olla nimi']
    },
    category_description: {
        type: String,
        required: [true, 'Kategorialla täytyy olla kuvaus']
    }
});

const Category = mongoose.model('Category', categorySchema);

// exporting the created Category-model
module.exports = Category;

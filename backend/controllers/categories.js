// this file is for saving the category information to the
// categories datatable to the Webshop database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Category model is required
const Category = require('../models/Category');

// creating category functionalities
// getCategories fetches categories 
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// createCategory creates a new category
// this function is for saving the category information to the
// Category datatable to the Webshop database
const createCategory = async (req, res) => {
    try {
        console.log(req.body);

        const category = new Category(req.body);

        const categories = await fetch('http://localhost:3000/api/categories');
        const categoriesAsJson = await categories.json();
        console.log(categoriesAsJson);
        // fetching the Category model from ./models/Category

        // creating a category to the new Category model in the database datatable.
        // category includes the category information rows as described below 

        // saving the category to the database
        category.save().then(result => {
            console.log('Category saved!');
            res.status(201).send({ msg: 'Category saved successfully' });
        });

    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// exporting category functionalities
module.exports = {
    getCategories,
    createCategory
};

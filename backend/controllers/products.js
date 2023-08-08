// this file is for saving the product information to the
// products datatable to the Webshop database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// fetching the Product model from ./models/Product
const Product = require('../models/Product');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// this function is for creating and saving the product information to the
// Product datatable to the Webshop database
const createProduct = async (req, res) => {
    try {
        console.log(req.body);

        const product = new Product(req.body);

        const products = await fetch('http://localhost:3000/api/products');
        const productsAsJson = await products.json();
        console.log(productsAsJson);

        // saving the product to the database
        product.save().then(result => {
            console.log('Product saved!');
            res.status(201).send({ msg: 'Product saved successfully' });
        });

    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateProductQuantity = async (products) => {
    console.log('Yritetään vähentää tuotteita...');
    if (products) {
        for (let product of JSON.parse(products)) {
            const inc = product.quantity;
            const productDoc = await Product.findOneAndUpdate(
                { product_name: product.product_name },
                { $inc: { product_inStock: `-${inc}` } },
                { returnOriginal: false }
            );

            console.log("productDoc: ", productDoc);
            // return 'Tuotteita vähennetty onnistuneesti';
        };
    } else {
        res.json({ error: "No product_inStock query found inside request" })
    }
}

module.exports = {
    getProducts,
    createProduct,
    updateProductQuantity
};
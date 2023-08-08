// this file is for saving the order information to the
// orders datata collection to the Webshop database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { updateProductQuantity } = require('./products');

// fetching the Order model from ./models/Order
const Order = require('../models/Order');
// fetching the Product model from ./models/Product
const Product = require('../models/Product');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};



// this function is for saving the order information to the
// orders data collection to the Webshop database
// this asyncronous function saves order to the databases data collection called "orders"
const createOrder = async (req, res) => {
    try {
        const orders = await fetch('http://localhost:3000/api/orders');
        ordersAsJson = await orders.json();
        console.log('kaikki tilaukset:', ordersAsJson)

        const productData = JSON.parse(req.body.orderItems);
        console.log("Tämä on tuotedata: ", productData);

        const ordererData = JSON.parse(req.body.orderer);
        console.log("Tämä on tilaajadata: ", ordererData);

        const products = [];
        productData.forEach(product => {
            products.push({ product_name: product.productInfo.product_name, quantity: product.productsInCart })
        });

        console.log('Tuotetaulukko: ', products);

        let largestOrderNumber = 0;
        if (ordersAsJson.orders.length > 0) {
            largestOrderNumber = Math.max(...ordersAsJson.orders.map(o => o.order_number));
        }

        let orderNum = largestOrderNumber + 1;

        console.log('Tilausnumero: ', orderNum);

        const order = new Order({
            order_number: orderNum,
            order_products: products,
            order_orderer: {
                firstName: ordererData.orderer_firstName,
                lastName: ordererData.orderer_lastName
            }
        });

        await updateProductQuantity(JSON.stringify(products));


        console.log('Tilauksen tiedot: ', order);

        // saving the order to the database
        order.save().then(result => {
            console.log('Tilaus tallennettu');
            res.status(201).send({ msg: 'Tilaus tallennettu onnistuneesti' });
            // closing connection caused that the data could be added to the database only once
            // because the program does not open connection again in other files 
        });

        // error handling: if there occurs an error, application responds status 500.json
        // which includes error message
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getOrders,
    createOrder
};
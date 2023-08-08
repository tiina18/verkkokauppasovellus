const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// require Express
const express = require('express');
// defining app
const app = express();

app.use(cors({
    origin: '*'
}));

// require routers for different tables and their functionalities
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const orderRouter = require('./routes/orders');

// require MongoDB connection making function
const connectMongoDB = require('./db/mongodb');

// the app uses express.json-format
app.use(express.json());

// require controllers
require('./controllers/users');
require('./controllers/categories');
require('./controllers/products');
require('./controllers/orders');

// using userRouter at /api/users path
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/orders', orderRouter);

// storing the static file to the public directory
// the app is using public directory statically
app.use(express.static('../frontend/public'));

// app.put('/', (req, res) => {
//     res.send("PUT Request Called")
// })

// every other URLs give a response "Not found" and status 404 (other than "/")
app.all('*', (req, res) => {
    res.status(404).send('Not found');
});

// CREATING THE SERVER CONNECTION

// defining PORT variable for port 3000
const PORT = 3000;
// creating an async function for the connection creation to the MongoDB
const start = async () => {
    try {
        await connectMongoDB(process.env.CONN_STRING);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

// calling start-async function which starts the server
start();

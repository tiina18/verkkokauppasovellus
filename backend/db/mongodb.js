const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// creating the connection variable which connects to the MongoDB
const connectMongoDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

// exporting connectMongoDB-module
module.exports = connectMongoDB;

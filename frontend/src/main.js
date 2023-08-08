// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './.env') });
// const mongoose = require('mongoose');
// const connectMongoDB = require('../../backend/db/mongodb')
// // require user controller
// require('../../backend/controllers/users')
// require('../../backend/controllers/categories')
// require('../../backend/controllers/products')
//
// const express = require('express');
// const app = express();
// const PORT = 3000;
//
// const start = async () => {
//     try {
//         await connectMongoDB(process.env.CONN_STRING);
//         app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
//     } catch (error) {
//         console.log(error);
//     }
// };
//
// start();
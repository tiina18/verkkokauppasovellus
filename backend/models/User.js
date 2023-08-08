const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

// creating the user schema (model) with necessary information
const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'Käyttäjällä täytyy olla käyttäjänimi']
    },
    user_password: {
        type: String,
        required: [true, 'Käyttäjällä täytyy olla salasana'],
        minLength: 10,
        description: "täytyy sisältää ainakin 10 merkkiä ja on pakollinen"
    }
});

const User = mongoose.model('User', userSchema);

// exporting the created User-model
module.exports = User;

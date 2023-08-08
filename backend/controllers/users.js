// this file is for saving the user information to the
// users data collection to the Webshop database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// fetching the User model from ./models/User
const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// this function is for saving the user information to the
// User datatable to the Webshop database
// this asyncronous function saves user to the databases datatable called "users"
const createUser = async (req, res) => {
    try {
        console.log(req.body);
        // defining user variable which includes requested body
        // const user = await User.create(req.body);
        const user = new User(req.body);
        console.log('Käyttäjä (käyttäjänimi ja salasana): ', user);

        const users = await fetch('http://localhost:3000/api/users');
        const usersAsJson = await users.json();
        console.log("usersAsJson: ", usersAsJson);

        // Trying to hash the password before storing it in the database collection
        // That is not working correctly yet.
        // const pwdObj = user.user_password;
        // const hashObj = new jsSHA("SHA-512", "TEXT", { numRounds: 1 });
        // hashObj.update(pwdObj.valueOf());
        // const hash = hashObj.getHash("HEX");
        // pwdObj.valueOf() = hash;

        // saving the user to the database
        user.save().then(result => {
            console.log('Käyttäjä tallennettu');
            res.status(201).send({ msg: 'Käyttäjä tallennettu onnistuneesti' });
            // closing connection caused that the data could be added to the database only once
            // because the progam does not open connection again in other files 
        });

        // error handling: if there occurs an error, application responds status 500.json
        // which includes error message
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// Here comes all the login functionality
// the rest of it is in the logIn.html form in script tag
const logUserIn = async (req, res) => {
    const users = await fetch('http://localhost:3000/api/users');
    const usersAsJson = await users.json();

    console.log(usersAsJson)

    const user = req.body;

    console.log(user);

    // const data = JSON.parse(localStorage.getItem("data"));
    let isSuccessful = false;

    for (let i = 0; i < usersAsJson.users.length; i++) {
        if (
            user.user_name === usersAsJson.users[i].user_name &&
            user.user_password === usersAsJson.users[i].user_password
        ) {
            isSuccessful = true;
            break;
        }
    }

    if (isSuccessful) {
        res.status(200).json({ message: 'Kirjautuminen onnistui' })
    } else {
        res.status(401).json({ message: 'Kirjautuminen epäonnistui' })
    }
};

// user data handling functions are exported as modules
module.exports = {
    getUsers,
    createUser,
    logUserIn
};
//1. Define all routes for apis: required express and Router
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
//Import the User model
const User = require('../models/user');
//2. Connect to the database mLab using mongoose npm package
const mongoose = require('mongoose');
const db = "mongodb://testcafepublic:pwdtestcafe1@ds113495.mlab.com:13495/test-cafe";

//2.1 Create main connection to the database
mongoose.connect(db, function(err){
    if(err){
        console.error('ERROR! '+err);
    } else{
        console.info('Connected to the mongodb database(mLab)');
    }
});

//3. Define routes for api
router.get('/', (req, res) => {
    res.send('From API Route!');
});

//Signup/Register new user: API-1
router.post('/register', (req, res) => {
    //Extract the payload from request object
    let userData = req.body;
    //Mongoose can understand the structure of the data in the database to be saved
    let user = new User(userData);
    //Save the new user in the mongodb database
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        } else {
            let payload = {subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');          
            res.status(200).send({token});
        }
    })
});

//Login/Signin API: API-2
router.post("/signin", (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        //console.log(error, user);
        if(error){
            console.log(error);
        } else if(!user){
            res.status(401).send("Invalid email!");
        } else {
            if(user.password !== userData.password){
                res.status(401).send("Invalid password");
            } else {
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    });
});

//4. Exports the routes. So, server can use that route
module.exports = router;
//1. Define all routes for apis: required express and Router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//Import the User model
const User = require('../models/user');
//2. Connect to the database mLab using mongoose npm package
const mongoose = require('mongoose');
const db = "mongodb://testcafepublic:pwdtestcafe1@ds113495.mlab.com:13495/test-cafe";
const saltRounds = 10;
let dbConnection;

//2.1 Create main connection to the database
mongoose.connect(db, function(err, database){
    dbConnection = db;
    if(err){
        console.error('ERROR! '+err);
    } else{
        console.info('Connected to the mongodb database(mLab)');
    }
});

//Verify token
function verifyToken(req, res, next){   
    if(!req.headers.authorization){
       return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];    
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');    
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
}

//3. Define routes for api
router.get('/', (req, res) => {
    res.send('From API Route!');
});

//Signup/Register new user: API-1
router.post('/register', (req, res) => {
    //Extract the payload from request object
    // and then get other details of the new user from the post request
    //Mongoose can understand the structure of the data in the database to be saved 
    const newUser = new User({       
        email: req.body.email,       
        password: req.body.password
    });

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
             //Save the new user in the mongodb database
            newUser.save((error, registeredUser) => {
                if(error){
                    console.log(error);
                } else {
                    let payload = {subject: registeredUser._id};
                    let token = jwt.sign(payload, 'secretKey');          
                    res.status(200).send({token});
                }
            });                
        });
    });   
});

//Login/Signin API: API-2
router.post("/signin", (req, res) => {
    let userData = req.body;
    User.findOne({email: userData.email}, (error, user) => {
        console.log('Signin password:'+user);
        if(error){
            console.log(error);
        } else if(!user){
            res.status(401).send("Invalid email!");
        } else {
            //Compare password hash saved in database with the password provided in the req.body
        bcrypt.compare(userData.password, user.password).then(isMatch => {
            if(isMatch) {       
                console.log('Inside: bcrypt.compare (isMatch)');       
                let payload = {subject: user._id};
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({token});               
                } else {
                    res.status(401).send("Invalid password");
            }
        });           
        }
    });
});

//Dashboard api - sending all registered users
router.get('/dashboard', verifyToken , (req, res) => {    
    User.find({}).limit(3).exec(function(err, users){
        if(err){
            res.status(404).send("Data not find!");
        } else{
           // res.json(users);       
           //res.status(200).send(users);    
           res.send(200, users);
        }
    });
    
});

//4. Exports the routes. So, server can use that route
module.exports = router;
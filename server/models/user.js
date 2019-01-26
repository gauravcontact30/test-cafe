//Create schema and model and exports the model
//1. Require the mongoose
const mongoose = require('mongoose');
//2. Get instance of mongoose schema
const Schema = mongoose.Schema;
//3. Create new schema for user data in mongodb
const userSchema = new Schema({
    email: String,
    password: String
});
//4. Create model from the schema and exports
module.exports = mongoose.model('user', userSchema, 'users')
//Note: The model 'use' is used to Create, Read, Update and Delete(CRUD) documents in the database
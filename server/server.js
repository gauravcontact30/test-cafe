//1. import required packages
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const app = express();
//Use cors for Cross Origin Request Service
const cors = require('cors');
app.use(cors());

//2. Define PORT for server
const PORT = 3000;

//3. Define middlewares
app.use(bodyParser.json());
app.use('/api', api);

//4. Define routes for server
app.get('/', function(req, res){
    res.send('Response from the server');
});

//5. Run the server on specific PORT
app.listen(PORT, function(){
    console.log('Server is running on port : ' + PORT);
});
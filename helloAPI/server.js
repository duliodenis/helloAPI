//
//  hello API
//
//  Created by Dulio Denis on 7/10/17.
//  Copyright (c) 2017 ddApps. Licensed under the MIT license.
//  ----------------------------------------------------------

// Import the needed dependencies
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// ----------------------------------------------------------
// Configure the app for bodyParser()
// in order to allow us to get data from the body of a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ----------------------------------------------------------
// Set up a port for the server to listen on
var port = process.env.PORT || 3000;

// ----------------------------------------------------------
// Connect to the database
mongoose.connect('mongodb://localhost:27017/hello');

// ----------------------------------------------------------
// Set up API Routes
var router = express.Router();

// Routes will all be prefixed with /api
app.use('/api', router);

// Establish a Test Route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

// ----------------------------------------------------------
// Fire up the server
app.listen(port);

// console output a message
console.log('Server listening on port ' + port);

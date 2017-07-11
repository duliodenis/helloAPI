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

var Vehicle = require('./app/models/vehicle');

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

// Middleware to be used for all requests
router.use(function(req, res, next) {
  console.log('Server processing');
  next();
});

// Establish a Test Route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our API!'});
});

// Establish a Vehicle Route
router.route('/vehicles')

  .post(function(req, res) {
    var vehicle = new Vehicle();
    vehicle.make  = req.body.make;
    vehicle.model = req.body.model;
    vehicle.color = req.body.color;

    vehicle.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured.'});
    });
  })

  .get(function(req, res) {
    Vehicle.find(function(err, vehicles) {
      if (err) {
        res.send(err);
      }
      res.json(vehicles);
    });
  });

// Establish a Vehicle ID Search Route
router.route('/vehicle/:vechicle_id')
  .get(function(req, res) {
    Vehicle.findById(req.params.vechicle_id, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

// Establish a make Search Route
router.route('/vehicle/make/:make')
  .get(function(req, res) {
    Vehicle.find({make:req.params.make}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

// Establish a color Search Route
router.route('/vehicle/color/:color')
  .get(function(req, res) {
    Vehicle.find({color:req.params.color}, function(err, vehicle) {
      if (err) {
        res.send(err);
      }
      res.json(vehicle);
    });
  });

// ----------------------------------------------------------
// Fire up the server
app.listen(port);

// console output a message
console.log('Server listening on port ' + port);

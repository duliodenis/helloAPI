var express = require('express');
var router = express.Router();

var Vehicle = require('../app/models/vehicle');

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

  // Establish a Test Route
router.get('/', function(req, res) {
  res.json({message: 'Welcome to our Hello API!'});
});

module.exports = router;

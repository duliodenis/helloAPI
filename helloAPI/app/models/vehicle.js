//
//  Vehicle Data Model
//
//  Created by Dulio Denis on 7/11/17.
//  Copyright (c) 2017 ddApps. Licensed under the MIT license.
//  ----------------------------------------------------------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleSchema = new Schema({
  make: String,
  model: String,
  color: String
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

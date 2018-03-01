'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
  name: String,
  description: String,
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }
});

const tripSchema = new Schema({
  name: String,
  description: String,
  members: [],
  places: [placeSchema]
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;

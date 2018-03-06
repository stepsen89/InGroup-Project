'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

// Retrieve all trips
router.get('/', (req, res, next) => {
  Trip.find()
    .then((result) => res.json(result))
    .catch(next);
});

// Create a new trip
router.post('/', (req, res, next) => {
  const newTrip = new Trip({
    name: req.body.name,
    description: req.body.description,
    members: req.body.members
  });
  // save trip to DB
  newTrip.save((err) => {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json(newTrip);
  });
});

// Retrieve all trips from the logged in user
router.get('/member/:id', (req, res, next) => {
  const id = req.params.id;
  Trip.find().where({members: id})
    .then((result) => res.json(result))
    .catch(next);
});

// Retrieve one specific trip
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Trip.findById(id)
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id/members', (req, res, next) => {
  const id = req.params.id;
  Trip.findById(id).populate('members')
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      return res.json(result);
    });
});

// add places to existing trip

router.post('/:id', (req, res, next) => {
  const id = req.params.id;
  const place = {
    name: req.body.name,
    description: req.body.description,
    location: {
      coordinates: [req.body.coordinates[0], req.body.coordinates[1]]
    }
  };
  Trip.findByIdAndUpdate(id, {'$push': {places: place}}, (err, place) => {
    if (err) { return next(err); }
  });
  return res.json(place);
});

// @todo by refreshing the page

module.exports = router;

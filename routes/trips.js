'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
  Trip.find()
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const newTrip = new Trip({
    name: req.body.name,
    description: req.body.description,
    members: [req.body.members]
  });

  newTrip.save((err) => {
    if (err) { return res.status(500).json(err); }
    return res.status(200).json(newTrip);
  });
});

router.get('/member/:id', (req, res, next) => {
  const id = req.params.id;
  Trip.find().where({ members: id})
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Trip.findById(id)
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;

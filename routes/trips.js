'use strict';

const express = require('express');
const router = express.Router();

const Trip = require('../models/trip');

router.get('/', (req, res, next) => {
  Trip.find()
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;

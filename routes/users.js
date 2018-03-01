'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find()
    .then((result) => res.json(result))
    .catch(next);
});

// router.get('/', (req, res, next) => {
//   User.find({}, (err, users) => {
//     if (err) { return res.json(err).status(500); }
//     return res.json(users);
//   });
// });

module.exports = router;

'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find()
    .then((result) => res.json(result))
    .catch(next);
});

module.exports = router;

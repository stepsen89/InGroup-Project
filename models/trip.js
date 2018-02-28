const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: String,
  descriptopn: String,
  places: [

  ],
  members: []
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;

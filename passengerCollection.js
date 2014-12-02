var db = require('./db/db');
var passengerModel = require('./passengerModel');

var passengerCollection = new db.Collection();

passengerCollection.model = passengerModel;

module.exports = passengerCollection;
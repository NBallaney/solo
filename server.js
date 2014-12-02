var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/db');

var passengerModel = require('./passengerModel');
var passengerCollection = require('./passengerCollection');

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function(req, res) {
  res.render('index');
});

app.post('/',function(req, res) {
  console.log(req.body);
  console.log('dd');
  res.redirect('/');
});
// var passenger = new passengerModel({
//           name: 'Leo',
//           seat: 'aisle',
//           location : 'front'
//         });

//         passenger.save().then(function(newPassenger) {
//           passengerCollection.add(newPassenger);
//         });

db.knex.schema.hasTable('Passengers').then(function(exists) {
  if (!exists) {
    console.error("Doesn't exist");
  }
});

app.listen(3000);
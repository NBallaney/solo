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

// There are 3 rows with 3 columns

// if has companion and companion exists
  // if right of companion is free
    // put him there
  // else if left is free
    // put him there

// (column) window=0, middle=1, aisle=2

// Check all rows of the column
  // if any is free, place him there

// go through remaining seats
// store top choices for the passenger on the left/right
// go through the remaining passengers
  // if anyone satisfies one's top choice, place him there
  // else do the same thing with the second choice






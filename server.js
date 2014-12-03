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
  res.send(200);
});

var options = ['engineer','exercise','nature','games','entrepreneur'];

app.post('/',function(req, res) {
  var body = req.body;
  console.log(body);
  for(var pref in body) {
  	if(body[pref] === '0') {
      var pref1 = options[pref];
  	} else if(body[pref] === '1') {
      var pref2 = options[pref];
  	} else if(body[pref] === '2') {
      var pref3 = options[pref];
  	} else if(body[pref] === '3') {
      var pref4 = options[pref];
  	} else if(body[pref] === '4') {
      var pref5 = options[pref];
  	} else if(body[pref] === 'window') {
      var seatPref = 0;
  	} else if(body[pref] === 'middle') {
      var seatPref = 1;
  	} else if(body[pref] === 'aisle') {
      var seatPref = 2;
  	}
  }

  var passenger = new passengerModel({
            name: body.name,
            companion: body.companion,
            seat: seatPref,
            hobby: body.hobby,
            preference1: pref1,
            preference2: pref2,
            preference3: pref3,
            preference4: pref4,
            preference5: pref5,
          });
  
          passenger.save().then(function(newPassenger) {
            passengerCollection.add(newPassenger);
          });
  res.redirect('/');
});

var passengers=[];


var seats = [ [], [], [] ];
console.log(seats);

var each = function (array, callback) {
	for(var col=0; col<array.length; col++) {
		for(var row=0; row<array.length; row++) {
		// console.log('__________________________________________');
		//   console.log(array[row][col]);
		//   console.log('__________________________________________');
			callback(array[row][col],row,col);
		}
	}
	return;
};

var assign = function (array,row,col,element) {
	element['assigned'] = true;
	array[row][col] = element;
	return;
}

var assignSeat= function(passenger) {
  // Seating next to companion
  // console.log('__________________________________________');
  // console.log(passenger);
  // console.log('__________________________________________');
   if(passenger['companion'].length>0) {
  	each(seats, function(obj,row,col) {
  		// console.log('+++++++++++++++++++++++++++++++++++++++');
  		// console.log(row,col);
  		if(obj!== undefined && passenger['companion'] === obj['name']) {
  			if(col+1<seats.length && seats[row][col+1] === undefined) {
		  		// console.log('+++++++++++++++++++++++++++++++++++++++1');
  				// console.log(seats[row][col+1], passenger);
  				// passenger['assigned'] = true;
  				// seats[row][col+1] = passenger;
  				assign(seats,row,col+1,passenger);
  				return;
  			} else if(col>0 && seats[row][col-1] === undefined) {
		  		// console.log('------------------------------------1');
		  		// console.log(row,col);
  				// console.log(seats[row][col-1], passenger);
  				// passenger['assigned'] = true;
  				// seats[row][col-1] = passenger;
  				assign(seats,row,col-1, passenger);
  				return;
  			}
  		}
  	});
  }
  if(passenger.assigned) {
  	return;
  }
  // According to seat preference
	var seatPref = passenger['seat'];
	console.log(seatPref);
  if(seatPref !== null) {
    for(var row=0; row<seats.length; row++) {
    	if(seats[row][seatPref] === undefined) {
    		seats[row][seatPref] = passenger;
    		return;
    	}
    }
  }

  // According to hobbies
  each(seats, function(obj,row,col) {
    
  })
};

app.get('/final', function(req,res) {
	passengerCollection.reset().fetch().then(function(users) {
		collection = users.models;
		for(var i=0; i<collection.length; i++) {
		  passengers.push(collection[i].attributes);
	  }
	  console.log(passengers);
	  for(var i=0; i<9; i++) {
	  	// console.log('__________________________________________');
	  	// console.log(passengers[i]);
	  	// console.log('__________________________________________');
	  	assignSeat(passengers[i]);
	  }
	  console.log(seats);
	});
  res.send(200);
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






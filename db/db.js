var Bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    host: '127.0.0.1',
    user: 'your_database_user',
    password: 'password',
    database: 'serverdb',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/server.sqlite')
  }
});

db.knex.schema.hasTable('Passengers').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('Passengers', function (passenger) {
      passenger.increments('id').primary();
      passenger.string('name', 40);
      passenger.string('companion', 10);
      passenger.string('seat', 10);
      passenger.string('hobby', 30);
      passenger.string('preference1', 30);
      passenger.string('preference2', 30);
      passenger.string('preference3', 30);
      passenger.string('preference4', 30);
      passenger.string('preference5', 30);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
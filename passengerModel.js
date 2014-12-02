var db = require('./db/db');

var User = db.Model.extend({
  tableName: 'Passengers'
});

module.exports = User;

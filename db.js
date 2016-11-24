var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 10,

});

var connection = mysql.createConnection({

});


exports.connection = function() {
	return connection;
};

exports.pool = function() {
	return pool;
};

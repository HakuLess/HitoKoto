var mysql      = require('mysql');
var connection = mysql.createConnection({
	
});


exports.connection = function() {
	return connection;
};

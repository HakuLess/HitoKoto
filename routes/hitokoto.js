var express = require('express');
var db = require('../db');
var connection = db.connection();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('Get a random book');
    getHitokoto(res);
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

function getHitokoto(res) {

	//连接数据库
	connection.connect();

	connection.query('SELECT * FROM `hitokoto` AS t1 JOIN ' + 
		'(SELECT ROUND(RAND() * ((SELECT MAX(id) FROM `hitokoto`) - (SELECT MIN(id) FROM `hitokoto`))' + 
		'+ (SELECT MIN(id) FROM `hitokoto`)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id LIMIT 1;', 
		function(err, rows, fields) {
	  		if (err) throw err;

			console.log('The solution is: ', rows[0].hitokoto);

			res.json({
				hitokoto : rows[0].hitokoto,
				hitokoto_origin : rows[0].hitokoto_origin,
				type : rows[0].type,
				author : rows[0].author,
				from : rows[0].from
			})
	});

	connection.end();
}

module.exports = router;
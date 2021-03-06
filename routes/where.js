var express = require('express');
var db = require('../db');
var connection = db.connection();
var pool = db.pool();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    getSeats(req, res);
});

router.get('/bind', function(req, res, next) {
    bind(req, res);
});

router.get('/change', function(req, res, next) {
    change(req, res);
});

// 改变用户在线状态
function change(req, res) {

	var mis = req.query.mis;
	var seatStatus = req.query.seatStatus;

	var updateStr = 'update where_db set seatStatus = ' 
		+ seatStatus + ' where user_mis = "' + mis + '"';

	console.log(updateStr);

	pool.query(updateStr, 

		function(err, rows, fields) {
	  		if (err) throw err;
			res.json({
			    "result":"success"
			})
		});
	}

// 修改相应数据内容
function bind(req, res) {
	var row = req.query.row;
	var col = req.query.col;
	var name = req.query.name;
	var mis = req.query.mis;
	var avatar = req.query.avatar;
	var seatStatus = req.query.seatStatus;

	var updateStr = 'update where_db set user_mis = "' 
		+ mis + '"'
		+ ', user_name = "' + name + '"';
	if (avatar != null && avatar != "") {
		updateStr += ', user_avatar = "' + avatar + '"';
	}
	if (seatStatus != null && seatStatus != "") {
		updateStr += ', seatStatus = "' + seatStatus + '"';
	}
	updateStr = updateStr
		+ ' where row = ' + row 
		+ ' and col = ' + col;

	console.log(updateStr);

	pool.query(updateStr, 

		function(err, rows, fields) {
	  		if (err) throw err;
			res.json({
			    "result":"success"
			})
		});
	}

function Seat() {
	this.seatStatus = 0;
	this.user = new User();
}

function User() {
	this.name = "";
	this.mis = "";
	this.avatar = "";
}

function getSeats(req, res) {
	
	var seatsArray = new Array();
	var seats = new Array();  
	var row = 1;

	var mis = req.query.mis;
	var myUser = new User();
	var loginStatus = 0;
	
	pool.query('select * from where_db order by row,col', 

		function(err, rows, fields) {
	  		if (err) throw err;

			for (var i = 0; i < rows.length; i++) {
				if (row != rows[i].row) {
					row = rows[i].row;
					seatsArray.push(seats);
					seats = new Array();
				}
				
				// console.log(rows[i].row + " " + rows[i].col + rows[i].user_name);

				var seat = new Seat();
				seat.seatStatus = rows[i].seatStatus;

				// 只有在状态为1的座位才有 员工信息
				if (seat.seatStatus >= 1) {
					seat.user.name = rows[i].user_name;
					seat.user.mis = rows[i].user_mis;
					seat.user.avatar = rows[i].user_avatar;
				}

				if (mis == rows[i].user_mis) {
					myUser.mis = rows[i].user_mis;
					myUser.name = rows[i].user_name;
					myUser.avatar = rows[i].user_avatar;

					loginStatus = rows[i].seatStatus;
				}
				
				seats.push(seat);
			}
			seatsArray.push(seats);

			res.json({
			    "user" : myUser,
			    "loginStatus" : loginStatus,
			    "seats" : seatsArray
				});
		});
	}

module.exports = router;
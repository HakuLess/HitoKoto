var express = require('express');
var db = require('../db');
var connection = db.connection();
var pool = db.pool();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    getSeats(res);
});

function Seat() {
	this.seatStatus = 0;
	this.user = new User();
}

function User() {
	this.name = "";
	this.mis = "";
	this.avatar = "";
}

function getSeats(res) {
	
	var seatsArray = new Array();
	var seats = new Array();  
	var row = 1;

	pool.query('select * from where_db order by row,col', 

		function(err, rows, fields) {
	  		if (err) throw err;

			for (var i = 0; i < rows.length; i++) {
				if (row != rows[i].row) {
					row = rows[i].row;
					seatsArray.push(seats);
					seats = new Array();
				}
				
				console.log(rows[i].row + " " + rows[i].col + rows[i].user_name);

				var seat = new Seat();
				seat.seatStatus = rows[i].seatStatus;
				seat.user.name = rows[i].user_name;
				seat.user.mis = rows[i].user_mis;
				seat.user.avatar = rows[i].user_avatar;

				seats.push(seat);
			}
			seatsArray.push(seats);

			res.json({
			    "user":{
			        "name" : "马涛",
			        "mis" : "matao04",
			        "avatar" : "http://s3-img.meituan.net/v1/mss_491cda809310478f898d7e10a9bb68ec/profile2/cc31f6e2-067c-4446-a4f5-6b4640da475d"
			    },
			    "loginStatus" : 1,
			    "seats" : seatsArray
				});
		});
	}

module.exports = router;
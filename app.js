/* ----------------------
All code copyright Theodore Bellas, 2015-present.
Simple NodeJS rest API to return info on some MMA fighters.

   ----------------------*/

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var app = express();
var Fighter = require('./models/Fighter.js');

var db = mongoose.connect('mongodb://localhost:27017/fighters', function(err) {
	if(err) {
		console.log("Database connection error: ", err);
	} else {
		console.log("\n-------------------------------\nDatabase Connection Established\n-------------------------------\n")
	}
});






router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the API'});
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

app.listen(3000, function() {
	console.log("Magic is happening on port 3000!");
});







router.use(function(req, res, next) {
	//logging
	console.log("An event has been triggered.\n");
	next();
})



router.route('/fighters')

	.get(function(req, res) {
		/*db.collection('fighters').find().toArray(function(err, result) {
			console.log(result);
			res.json(result);
		});*/
		Fighter.find(function(err, fighters) {
			if(err) {
				res.send(err);
			}

			res.json(fighters);
		});


	})

	.post(function(req, res) {

		/*var fighter = new Fighter({ firstname: req.body.firstname, lastname: req.body.lastname, record: { wins: req.body.record.wins, losses: req.body.record.losses, draws: req.body.record.draws, nocontests: req.body.record.nc}});*/
		var fighter = new Fighter();
		fighter.firstname = req.body.firstname;
		fighter.lastname = req.body.lastname;
		fighter.record.wins = req.body.record.wins;
		fighter.record.losses = req.body.record.losses;
		fighter.record.draws = req.body.record.draws;
		fighter.record.nocontests = req.body.record.nocontests;
		console.log("Name: ", req.body); 
		fighter.save(function(err) {
			if(err)
				res.send(err)

			res.json({ message: "Fighter created!" });
		})

	});


router.route('/fighters/:id')
	.get(function(req, res) {
		Fighter.findById(req.params.id, function(err, fighter) {
			if(err)
				res.send(err);
			res.json(fighter);
		});
});



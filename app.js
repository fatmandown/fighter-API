/* ----------------------
All code copyright Theodore Bellas, 2015-present.
Simple NodeJS rest API to return info on some MMA fighters.

   ----------------------*/

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/fighters');
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function(req, res, next) {
	//logging
	console.log("An event has been triggered.\n");
	next();
})

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the API'});
})

app.use('/api', router);

app.listen(3000, function() {
	console.log("Magic is happening on port 3000!");
})



router.route('/fighters').get(function(req, res) {
	db.collection('fighters').find().toArray(function(err, result) {
				console.log(result);
				res.json(result);
			}

		);
})

	/*app.get('/fighters', function(request, response) {
		var nextres = "";
		db.collection('fighters').find().toArray(function(err, result) {
				console.log(result);
				nextres = result;
			}

		);

	response.sendStatus(200);



});
*/


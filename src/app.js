module.exports = function (testing) {

	var express = require('express');
	var app = express();
	var mongo = require('mongodb');
	var monk = require('monk');
	var path = require('path');
	var bodyParser = require('body-parser');

	//This is the interface with the DB
	var db = monk('localhost:27017/flightData');

	var db_api = require('./db_query')(db.get('flightcollection'));

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.post('/data', function (req, res) {
		//This should handle all requests to get data
		db_api.find(req.body)
			.then(function (response) {
				res.send(response);
			});

	});
	app.get('/', function (req, res) {
		//This should handle all requests to get data
		res.sendFile('public/index.html', { root: __dirname });
	});

	app.get('/*', function (req, res) {
		// ignore everything that is not directly specified
		res.status(404) // HTTP status 404: NotFound
			.end();
	});

	return app;
}

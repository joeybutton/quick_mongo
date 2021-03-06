module.exports = function (testing) {

	var express = require('express');
	var app = express();
	var mongo = require('mongodb');
	var monk = require('monk');
	var path = require('path');
	var bodyParser = require('body-parser');

	//This is the interface with the DB
	var db = monk('localhost:27017/mongoData');

	var db_api = require('./db_query')(db.get('datacollection'));

	app.use(express.static(path.join(__dirname, 'public')));

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());


	app.use(function (req, res, next) {

		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type,application/json;charset=UTF-8');
		next();
	});

	app.post('/data', function (req, res) {
		//This should handle all requests to get data
		console.log(req.body);
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

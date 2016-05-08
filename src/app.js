module.exports = function (testing) {

	var express = require('express');
	var app = express();
	var mongo = require('mongodb');
	var monk = require('monk');

	//This is the interface with the DB
	var db = monk('localhost:27017/flightData');

	var db_api = require('./db_query')(db.get('flightcollection'));


	app.get('/data', function (req, res) {

		//This should handle all requests to get data
		console.log(req.query);
		db_api.find(req.data)
			.then(function (response) {

				res.send("Should respond with data");
			});



	});
	app.get('/*', function (req, res) {
		// ignore everything that is not directly specified
		res.status(404) // HTTP status 404: NotFound
			.end();
	});

	return app;
}

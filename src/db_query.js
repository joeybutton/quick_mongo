module.exports = function (database) {

	var findFlights = function (request) {
		/*
		This will be a general find for reaching into the DB and getting
		the desired flights
		*/
		return new Promise(function (resolve, reject) {
			console.log("inside promise for DB: ", request);
			var flightQuery = {};
			var objectKeys = ["Year", "Month", "DayofMonth", "DayOfWeek",
									"DepTime", "CRSDepTime", "ArrTime",
									"CRSArrTime", "UniqueCarrier", "FlightNum",
									"TailNum", "ActualElapsedTime", "CRSElapsedTime",
									"AirTime", "ArrDelay", "DepDelay",
									"Origin", "Dest", "Distance",
									"TaxiIn", "TaxiOut", "Cancelled",
									"CancellationCode", "Diverted", "CarrierDelay",
									"WeatherDelay", "NASDelay", "SecurityDelay",
									"LateAircraftDelay"];
			for (var i = 0; i < objectKeys.length; i++) {
				if (request[objectKeys[i]] != false) {

					if (request[objectKeys[i]] !== undefined) {
						// flightQuery[objectKeys[i]] = { $regex: new RegExp(request[objectKeys[i]], "i") };
						flightQuery[objectKeys[i]] = (request[objectKeys[i]]);
					}
				}
			}

			database.find(flightQuery)
				.then(function (result) {
					if (result.length === 0) {
						////console.log("not found");
						resolve(result);
					} else {
						resolve(result);
					}
				});
		});

	};
	//Should have one entry in this object for every function accesible outside
	return {
		find: findFlights
	};
};

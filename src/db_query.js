module.exports = function (database) {
	var findFlights = function (request) {
		/*
		This will be a general find for reaching into the DB and getting
		the desired flights
		*/

		return new Promise(function (resolve, reject) {


			var flightQuery = { type: "flight" };

			var objectKeys = ["source", "destination", "arrival_time",
                        "departure_time", "number_of_seats"];

			for (var i = 0; i < objectKeys.length; i++) {
				if (request[objectKeys[i]] != false) {

					if (request[objectKeys[i]] !== undefined) {

						if (objectKeys[i] == "source" || objectKeys[i] == "destination") {

							flightQuery[objectKeys[i]] = { $regex: new RegExp(request[objectKeys[i]], "i") };

						} else {
							flightQuery[objectKeys[i]] = (request[objectKeys[i]]);

						}
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

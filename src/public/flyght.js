var getflights = function (data) {
	/*
	Finds data on the server given the flight data

  Data is going to be a json object, holding all fields in the query
	*/
	return new Promise(function (resolve, reject) {
		var request = new XMLHttpRequest();

		request.addEventListener("load", function () {
			if (request.status >= 200 && request.status < 400) {
				resolve(request.response);
			} else {
				reject(Error(request.statusText));
			}
		});

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				var res = JSON.parse(request.responseText);
				resolve(res);
			}
		};

		request.addEventListener("error", function (event) {
			reject(Error("Network error"));
		});

		request.open('POST', '/data', true);
		request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		request.send(JSON.stringify(data));


	});
};

console.log("The end of the script");

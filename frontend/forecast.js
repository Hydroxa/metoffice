const sites = [];

window.onload = function () {
	console.log("Getting names from server..");
	fetch("http://localhost:3000/fcsSites").then((response) => {
		const locationData = response.json();
		const locations = [];
		for (let i = 0; i < locationData.length; i++) {
			locations[i].value = locationData[i].name;
			sites.push(locationData[i]);
		}
		// let formInput = document.querySelector("input[name='location']");
		// formInput.list = locations;
	});
};

function getWeatherData() {}

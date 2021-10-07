const sites = {};

window.onload = function () {
	fetch(`/fcsSites`)
		.then((response) => response.json())
		.then((obj) => {
			const locationData = obj;
			for (let i = 0; i < locationData.length; i++) {
				sites[locationData[i].name] = locationData[i];
			}
			console.log(sites);

			const today = new Date();
			const tomorrow = new Date(today);
			tomorrow.setDate(today.getDate() + 1);

			const labelTmrw = document.getElementById("labelDateTmrw");
			const labelToday = document.getElementById("labelDateToday");
			labelTdy.innerHTML = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
			labelTmrw.innerHTML = `${tomorrow.getDate()}/${tomorrow.getMonth() + 1}/${tomorrow.getFullYear()}`;

			document.getElementById("txtLocation").value = "London";
			getWeatherData();
		});
};

function getWeatherData() {
	const txtInput = document.getElementById("txtLocation").value;
	const cbxInput = document.getElementById("cbxHourly").value;
	document.getElementById("labelLocErr").innerHTML = "";
	if (sites[txtInput] !== undefined) {
		fetch(`/fcsSite?id=${sites[txtInput].id}&res=${cbxInput ? "3" : "1"}`)
			.then((response) => response.json())
			.then((obj) => {
				const tdy = obj.values[0][2];
				const tmrw = obj.values[1][2];

				const labelTempTdy = document.getElementById("labelTempToday");
				const labelTempTmrw = document.getElementById("labelTempTmrw");
				const labelFeelsTdy = document.getElementById("labelFeelsToday");
				const labelFeelsTmrw = document.getElementById("labelFeelsTmrw");
				const labelWindDirTdy = document.getElementById("labelWindDirToday");
				const labelWindDirTmrw = document.getElementById("labelWindDirTmrw");
				const labelWindSpdTdy = document.getElementById("labelWindSpeedToday");
				const labelWindSpdTmrw = document.getElementById("labelWindSpeedTmrw");
				const labelRainChanceTdy = document.getElementById("labelRainChanceToday");
				const labelRainChanceTmrw = document.getElementById("labelRainChanceTmrw");

				labelTempTdy.innerHTML = `Temperature: ${tdy["T"]}C`;
				labelTempTmrw.innerHTML = `Temperature: ${tmrw["T"]}C`;
				labelFeelsTdy.innerHTML = `Feels like: ${tdy["F"]}C`;
				labelFeelsTmrw.innerHTML = `Feels like: ${tmrw["F"]}C`;

				labelWindSpdTdy.innerHTML = `Wind Speed: ${tdy["W"]}mph`;
				labelWindSpdTmrw.innerHTML = `Wind Speed: ${tmrw["W"]}mph`;

				const windDirTdy = tdy["D"].replaceAll("S", "South ").replaceAll("W", "West ").replaceAll("N", "North ").replaceAll("E", "East ");
				const windDirTmrw = tmrw["D"].replaceAll("S", "South ").replaceAll("W", "West ").replaceAll("N", "North ").replaceAll("E", "East ");
				labelWindDirTdy.innerHTML = `Wind Direction: ${windDirTdy}`;
				labelWindDirTmrw.innerHTML = `Wind Direction: ${windDirTmrw}`;

				labelRainChanceTdy.innerHTML = `Rain Chance: ${tdy["Pp"]}%`;
				labelRainChanceTmrw.innerHTML = `Rain Chance: ${tmrw["Pp"]}%`;
			});
	} else {
		document.getElementById("labelLocErr").innerHTML = "That location is not available";
	}
}

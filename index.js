const MetOffice = require("./metOffice");
const Resolutions = require("./resolutions");
const express = require("express");

const app = express();
const port = 3000;

app.get("/fcsSites", async (req, res) => {
	const names = [];
	const sites = await MetOffice.getForecastSites();
	for (let i = 0; i < sites.length; i++) {
		names.push({
			name: sites[i].name,
			id: sites[i].id,
		});
	}
	res.send(JSON.stringify(names));
});
app.get("/fcsSite", async (req, res) => {
	const ID = req.query.id;
	let reso = req.query.res == 3 ? Resolutions.ThreeHours : Resolutions.Daily;
	reso = `res=${reso}`;
	const forecast = await MetOffice.getLocationForecast(ID, reso);
	const units = {};
	for (let i = 0; i < forecast.Wx.Param.length; i++) {
		const unit = forecast.Wx.Param[i];
		units[unit.name] = {
			unit: unit.units,
			description: unit["$"],
		};
	}
	const values = [];
	for (let i = 0; i < forecast.DV.Location.Period.length; i++) {
		const cast = forecast.DV.Location.Period[i];
		const day = cast.Rep;
		values.push(day);
	}
	const toSend = {
		units: units,
		values: values,
	};

	res.send(JSON.stringify(toSend));
});

app.use(express.static("frontend"));
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

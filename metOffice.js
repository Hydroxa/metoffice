const got = require("got");

const APIKey = "bf49bcb4-3e2f-4b1b-9de5-8d55c0c5c515";

class MetOffice {
	static buildAPICall(resource, options) {
		const baseURL = "http://datapoint.metoffice.gov.uk/public/data/";
		const withResource = baseURL + resource;
		let optionString = "?";
		for (const key in options) {
			const option = options[key];
			optionString += option + "&";
		}
		optionString += `key=${APIKey}`;
		const withOptions = withResource + optionString;

		return withOptions;
	}
	static buildForecastCall(request, options) {
		const path = "val/wxfcs/all/json/";
		const call = this.buildAPICall(path + request, options);

		return call;
	}
	static buildObservationCall(request, options) {
		const path = "val/wxobs/all/json/";
		const call = this.buildAPICall(path + request, options);

		return call;
	}

	static async getForecastSites() {
		const call = this.buildForecastCall("sitelist");
		const body = await got(call).json();
		return body.Locations.Location;
	}
	static async getObservationSites() {
		const call = this.buildObservationCall("sitelist");
		const body = await got(call).json();
		return body.Locations.Location;
	}
	static async getLocationForecast(locationCode, resolution) {
		const call = this.buildForecastCall(locationCode, [resolution]);
		const body = await got(call).json();
		return body.SiteRep;
	}
	static async getLocationObservation(locationCode, resolution) {
		const call = this.buildObservationCall(locationCode, [resolution]);
		const body = await got(call).json();
		return body.SiteRep;
	}
}

module.exports = MetOffice;

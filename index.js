const MetOffice = require("./metOffice");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

const sitesPromise = MetOffice.getForecastSites();
readline.question("Enter location to get data for: ", async (userInput) => {
	const sites = await sitesPromise;
	for (const key in sites) {
		const location = sites[key];
		if (location.name === userInput) {
			console.log(location);
			break;
		}
	}
});

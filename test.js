const express = require("express");
const app = express();
const port = 3000;

let timesOpened = 0;
app.get("/", (req, res) => {
	res.send(`You are connection ${timesOpened}!`);
	timesOpened++;
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/test", (req, res) => {
	res.send("Hi! Welcome to the test endpoint! :D");
});

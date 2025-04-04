const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../.env") });
	PORT = process.env.SERVER_PORT;
}

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use(cors());

const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});

module.exports = { app, server, PORT };

const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

if (!PORT) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
  PORT = process.env.SERVER_PORT;
}

app.use(cors());
app.use(express.json());

//routes
const usersRoute = require("./routes/users");
const activityRoute = require("./routes/activity");
const awardRoute = require("./routes/award");
const userAwardRoute = require("./routes/user_award");
const bulletRoute = require("./routes/bullet");
const unitRoute = require("./routes/unit");

app.use("/users", usersRoute);
app.use("/activity", activityRoute);
app.use("/award", awardRoute);
app.use("/user_award", userAwardRoute);
app.use("/bullet", bulletRoute);
app.use("/unit", unitRoute);

const server = app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

module.exports = { app, server, PORT };

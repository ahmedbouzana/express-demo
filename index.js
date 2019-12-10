const debug = require("debug")("app:startup"); // debug with name space app:startup
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./middleware/logger");
const courses = require("./routes/courses"); // import router courses
const home = require("./routes/home"); // import router home
const app = express();

app.set("view engine", "pug"); // set property view engine og pug template
app.set("views", "./views"); // set default root for template

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for complexe url
app.use(express.static("public")); //for file
app.use(helmet()); //secure app
app.use("/", home); //telling expresse that any root starts by this use home router
app.use("/api/courses", courses); //telling expresse that any root starts by this use courses router

//configuration
console.log("Application Name: " + config.get("name"));
console.log("Mail Server: " + config.get("mail.host"));
console.log("Mail Password: " + config.get("mail.password"));

//check environement, set NODE_ENV=production
if (app.get("env") === "development") {
  app.use(morgan("tiny")); //http request logger
  debug("Morgan enabled..."); //console.log()
}

app.use(logger);

var port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listining on port " + port + "..."));

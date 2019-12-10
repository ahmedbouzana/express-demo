const debug = require("debug")("app:startup"); // debug with name space app:startup
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
const app = express();

app.set("view engine", "pug"); // set property view engine og pug template
app.set("views", "./views"); // set default root for template

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for complexe url
app.use(express.static("public")); //for file
app.use(helmet()); //secure app

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

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
  //res.send("Hello World");
  res.render("index", { title: "My Express App", message: "Hello" }); // using index.pug template
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

/*
app.get("/api/posts/:year/:month", (req, res) => {
  //res.send(req.params.year);
  //res.send(req.params.query);
  res.send(req.params);
});*/

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

app.post("/api/courses", (req, res) => {
  /*if (!req.body.name || req.body.name.length < 3) {
    res
      .status(400)
      .send("Name is required and should be minimum 3 characters.");
    return;
  }*/

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);

  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  //check if exist
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  //validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update course
  course.name = req.body.name;

  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //check if exist
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  //delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

var port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listining on port " + port + "..."));

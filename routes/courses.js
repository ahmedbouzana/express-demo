const express = require("express");
const router = express.Router(); // using router when separate express in another module

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];

router.get("/", (req, res) => {
  res.send(courses);
});

/*
  app.get("/api/posts/:year/:month", (req, res) => {
    //res.send(req.params.year);
    //res.send(req.params.query);
    res.send(req.params);
  });*/

router.get("/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given ID was not found");

  res.send(course);
});

router.post("/", (req, res) => {
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

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
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

module.exports = router;

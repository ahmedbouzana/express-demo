const express = require("express");
const router = express.Router(); // using router when separate express in another module

router.get("/", (req, res) => {
  //res.send("Hello World");
  res.render("index", { title: "My Express App", message: "Hello" }); // using index.pug template
});

module.exports = router;

const instructor = require("express").Router();

instructor.get("/test", async (req, res) => {
  res.json("woker in users got it");
});

module.exports = instructor;

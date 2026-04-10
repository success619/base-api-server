const admin = require("express").Router()

admin.get("/test", async (req, res) => {
  res.json("admin in users got it");
});

module.exports = admin
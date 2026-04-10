const jwtAuth = require("../../middlewares/jwt");

const session = require("express").Router();

const jwt = new jwtAuth();

session.get(
  "/76543b590e84a2512f45c9247413009d",
  jwt.normalAuthWithCookie,
  async (req, res) => {
    if (req?.user?.user_id) {
      res.status(200).json(req.user);
    } else {
      res.json("not authenticated");
    }
  }
);

module.exports = session
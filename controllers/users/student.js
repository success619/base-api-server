const student = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../../database/db");
const jwtAuth = require("../../middlewares/jwt");

student.post("/changetoinstructor", async (req, res) => {
    await db("users")
        .where("email", req.body.email)
        .update({
            role: "student"
        })
        .returning("*")
        .then(user => {
            console.log(user);
            res.json(user);
        });
});

module.exports = student;

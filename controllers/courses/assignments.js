const db = require("../../database/db");

const assignmentsRoute = require("express").Router();

assignmentsRoute.post("/set-assignment", async (req, res) => {
  const {
    user_id,
    course_id,
    title,
    description,
    maxPoints,
    dueDate,
    weightage,
    submissionType,
  } = req.body;

  db("assignments")
    .insert({
      course_id,
      user_id,
      assignment_title: title,
      assignment_desc: description,
      due_date: dueDate,
      max_points: parseFloat(maxPoints),
      weightage: parseFloat(weightage),
      assignment_submission_type: submissionType,
      date_uploaded: new Date(),
    }).returning("*")
    .then((assignment) => {
      res.json(assignment[0]).status(200);
    })
    .catch((err) =>{
      res.json("an unexpected error occured please try again").status(400)}
    );
});

module.exports = assignmentsRoute;

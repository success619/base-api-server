const testRoute = require("express").Router();
const db = require("../../database/db");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

testRoute.post("/new-test", async (req, res) => {
  const { title, duration, courseId, user_id, questions } = req.body;
  const course_id = courseId;
  const testContentPath = `public/files/tests/te_${course_id}_${Date.now()}.base-json`;

  const sanitizedQuestions = DOMPurify.sanitize(JSON.stringify(questions));

  try {
    fs.writeFile(testContentPath, sanitizedQuestions, async () => {
      await db("tests")
        .insert({
          test_title: title,
          user_id,
          course_id,
          duration: parseInt(duration),
          content_uri: testContentPath,
          status: "pending",
          date_uploaded: new Date(),
        })
        .returning("*")
        .then((test) => {
        return res.status(200).json(test[0]);          
        })
        .catch((err) => console.log("unable to upload to db"));
    });
  } catch (error) {
    console.log("unable to write test file")
  }
});

module.exports = testRoute;

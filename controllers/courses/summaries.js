const summariesRoute = require("express").Router();
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const multer = require("multer");
const db = require("../../database/db");
const useBaseTranspiler = require("../../hooks/useBaseTranspiler");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

summariesRoute.get(
  "/get-topics-title-for-summary/:course_id",
  async (req, res) => {
    const course_id = req.params.course_id;
    db("topics")
      .select("topic", "topic_id")
      .where("course_id", course_id)
      .then((topics) => {
        db("summaries")
          .select("topic_id", "course_id")
          .where("course_id", course_id)
          .then((summa) => {
            let filteredTopics = [];
            for (let i = 0; i < topics.length; i++) {
              const x = topics[i];
              const y = summa.includes(x.topic_id);
              if (!y) filteredTopics.push(x);
              else return;
            }
            res.status(200).json(filteredTopics);
          })
          .catch(() => res.status(400).json("error getting topics"));
      })
      .catch(() => res.status(400).json("error getting topics"));
  },
);

summariesRoute.post("/new/submit", async function (req, res) {
  const { course_id, topic_id, tags, sections, readingTime, user_id } =
    req.body;
  const finalSections = DOMPurify.sanitize(JSON.stringify([...sections]));
  const finalTags = DOMPurify.sanitize(JSON.stringify(tags));
  const summaryPath = `public/files/summaries/sm_${course_id}_${Date.now()}.base`;
  let finalSummaryContent = `{
      sections: ${finalSections},
      readingTime: ${readingTime},
    }`;
  try {
    fs.writeFileSync(summaryPath, finalSummaryContent);
    db("summaries")
      .insert({
        topic_id,
        course_id,
        user_id,
        summary_tags_keywords: JSON.parse(finalTags),
        summary_content_uri: summaryPath,
        status: "pending",
        date_created: new Date(),
      })
      .returning("*")
      .then((summary) => {
        res.status(200).json(summary[0]);
      })
      .catch((err) => {
        res.status(400).json("unexpecteed error");
      });
  } catch (error) {
    res.status(400).json("cant publish");
  }
});

module.exports = summariesRoute;

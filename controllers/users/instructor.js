const instructor = require("express").Router();
const jwtAuth = require("../../middlewares/jwt");
const db = require("../../database/db");

instructor.get("/get/all-personal/topics", async (req, res) => {
  const user = await req.user;
  res.status(200).json([
    {
      course_id: "mth201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "MTH201",
      level: "200L",
      status: "pending",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Mathematical Methods I",
      topic_desc: "Advanced vector calculus and differential equations.",
    },
    {
      course_id: "mth202",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "MTH202",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Mathematical Methods II",
      topic_desc:
        "Fourier series, partial differential equations, and complex analysis.",
    },
    {
      course_id: "sta201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "STA201",
      level: "200L",
      status: "pending",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Probability Theory & Distributions",
      topic_desc: "Probability laws and statistical distribution patterns.",
    },
    {
      course_id: "cmp201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "CMP201",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Computer Programming II",
      topic_desc: "Object-oriented programming using modern frameworks.",
    },
    {
      course_id: "cmp202",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "CMP202",
      level: "200L",
      status: "pending",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Data Structures & Algorithms",
      topic_desc: "Organization of data and efficiency of computational tasks.",
    },
    {
      course_id: "bio201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "BIO201",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Cell Biology & Genetics",
      topic_desc: "Heredity, molecular genetics, and cell functions.",
    },
    {
      course_id: "bio202",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "BIO202",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Ecology & Environmental Biology",
      topic_desc: "Interaction between organisms and their environment.",
    },
    {
      course_id: "bio207",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "BIO207",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Biological Techniques",
      topic_desc: "Advanced laboratory techniques for biological research.",
    },
    {
      course_id: "chm201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "CHM201",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Organic Chemistry I",
      topic_desc: "Chemistry of carbon compounds and functional groups.",
    },
    {
      course_id: "chm202",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "CHM202",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Physical Chemistry II",
      topic_desc: "Thermodynamics, kinetics, and electrochemistry.",
    },
    {
      course_id: "phy201",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "PHY201",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Electricity & Magnetism",
      topic_desc: "Electromagnetic fields, circuits, and Maxwell's equations.",
    },
    {
      course_id: "phy202",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "PHY202",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Waves, Optics & Thermodynamics",
      topic_desc: "Study of light, sound waves, and heat energy.",
    },
    {
      course_id: "chm207",
      topic_id: 3029,
      course_title: "An electrical",
      course_code: "CHM207",
      level: "200L",
      status: "published",
      content_uri: "public/",
      date_uploaded: Date.now(),
      topic: "Practical Chemistry II",
      topic_desc: "Advanced analytical and synthetic chemical laboratory.",
    },
  ]);
  // await db("topics")
  //   .select("*")
  //   .where("user_id", user?.user_id)
  //   .andWhere("status", "=", "published")
  //   .join("courses", "courses.course_id", "topics.course_id")
  //   .orderBy("topics.date_uploaded", "asc")
  //   .then((topics) => {
  //     res.status(200).json(topics)
  //   })
  //   .catch(() => {
  //     res.json("error getting data");
  //   });
});
module.exports = instructor;

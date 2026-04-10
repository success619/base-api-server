const courses = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../../database/db");
const jwtAuth = require("../../middlewares/jwt");

// courses.get("/add/course", async (req, res)=>{

// })

// const insertData = async () => {
//     // body...
//     for (let i = 0; i < allcourses.length; i++) {
//         const ob = allcourses[i];
//         await db("courses")
//             .insert({
//                 course_id: ob.id,
//                 course_title: ob.title,
//                 course_desc: ob.desc
//             })
//             .returning("*")
//             .then(data => {
//                 console.log(data);
//             });
//     }
// };

// insertData();

module.exports = courses;

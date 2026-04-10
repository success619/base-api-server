const auth = require("express").Router();
const db = require("../../database/db");
const bcrypt = require("bcrypt");
const jwtAuth = require("../../middlewares/jwt");

const maxAgeDuration = 300 * 24 * 60 * 60 * 1000;

auth.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    await db("signin")
        .where("email", email)
        .select("hash")
        .then(async hash => {
            const isValid = await bcrypt.compare(password, hash[0].hash);
            if (isValid) {
                db("users")
                    .where("email", email)
                    .select("*")
                    .then(user => {
                        const jwt = new jwtAuth().generatedAuthToken(user[0]);
                        const isProduction = process.env.NODE_ENV === "production";
                        res.cookie("auth", jwt, {
                            maxAge: maxAgeDuration, // Set the cookie expiration in milliseconds
                            httpOnly: true, // Recommended: makes the cookie inaccessible to client-side JavaScript
                            secure: isProduction, // Ensures cookie is only sent over HTTPS in production, // Recommended: ensures the cookie is only sent over HTTPS (in production)
                            sameSite: isProduction? "none" : "lax" // Recommended: helps mitigate CSRF attacks
                        });
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json({ err: "server error" });
                    });
            } else {
                res.json({ err: "wrong credentials" });
            }
        });
});

// auth.post("/signin", async (req, res) => {
//   const { email, phoneNumber, password } = req.body;

//   const searchHelper = email ? "email" : "phone_number";

//   const searchValue = email ? email : phoneNumber;

//   await db("signin")
//     .select("hash")
//     .where(searchHelper, searchValue)
//     .then((hash) => {
//       const isValid = bcrypt.compareSync(password, hash[0].hash);
//       let role;
//       db("users")
//         .select("role")
//         .where(searchHelper, searchValue)
//         .then((cat) => {
//           role = cat[0].role;

//           const tableToJoinFilter = () => {
//             if (role === "student") return "students";
//             if (role === "instructor") return "instructors";
//             if (role === "worker") return "workers";
//             if (role === "admin") return "admins";
//           };

//           let tableToJoin = tableToJoinFilter();

//           if (isValid) {
//             db("users")
//               .select("*")
//               .where(searchHelper, searchValue)
//               .join(tableToJoin, "users.user_id", `${tableToJoin}.user_id`)
//               .then((user) => {
//                 const jwt = new jwtAuth().generatedAuthToken(user[0])
//                 res.cookie("auth", jwt);
//                 res.json(user[0]);
//               })
//               .catch((err) => {
//                 res.status(400).json("something went wrong, try again later");
//               });
//           } else {
//             res.status(400).json("password incorrect");
//           }
//         })
//         .catch(() => res.status(400).json("sorry cant get profile type, please try again"));
//     })
//     .catch((err) => {
//       res
//         .status(400)
//         .json(
//           "user not found, please make sure email or phone number is correct and try again"
//         );
//     });
// });

// auth.post("/create_account", async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     sex,
//     email,
//     phoneNumber,
//     country,
//     password,
//     school,
//     courseDepartment,
//     matricNo,
//   } = req.body; //Information provided by the new user is brought in to server with req.body;
//   await db.transaction((trx) => {
//     //***This is to register the user to the users database */
//     trx("users")
//       .insert({
//         first_name: firstName,
//         last_name: lastName,
//         sex: sex,
//         email: email,
//         phone_number: phoneNumber,
//         role: "student",
//         country: country,
//         date_created: new Date(),
//       })
//       .returning("*")
//       .then((credentials) => {
//         const signCredentials = credentials[0];
//         // As you know we dont save plain passwords to our database, we rather implement highly secured hash with the password with bcrypt,
//         // beware that bcrypt hash are irrevisible, only comparable, if a hacker can reverse the hash with a high salt round, it will take approximately 2years running system.
//         // Uncomment the hash function and replace the password with the hash created below ie. hash:  password ---> hash
//         const hash = bcrypt.hashSync(password, 12);

//         //** this transaction is mainly to register the email and password to signin table so the user can has access to the account they are creating now afterwards */
//         trx("signin")
//           .insert({
//             email: signCredentials.email,
//             phone_number: signCredentials.phone_number,
//             hash: hash, // please make sure to replace the hash value with the hash defined above; password ---> hash
//           })
//           .returning("*")
//           .then((re) => {
//             //*** this transaction is to fill up the students table with the information provided */
//             trx("students")
//               .insert({
//                 user_id: credentials[0].user_id,
//                 school: school,
//                 "course/department": courseDepartment,
//                 matric_number: matricNo,
//               })
//               .returning("*")
//               .then((studentDetails) => {
//                 let user = { ...credentials[0], ...studentDetails[0] };
//                 const jwt = new jwtAuth().generatedAuthToken(user);
//                 res.cookie("auth", jwt, { expires: "300d" });
//                 res.json(user);
//               })
//               .finally(() => trx.commit(trx))
//               .catch((err) => {
//                 res.status(400).json(err.detail);
//                 trx.rollback();
//               });
//           })
//           .catch((err) => {
//             res.status(400).json(err.detail);
//             trx.rollback();
//           });
//       })
//       .catch((err) => {
//         res.status(400).json(err.detail);
//         trx.rollback();
//       });
//   });
// });

module.exports = auth;

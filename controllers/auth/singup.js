const signup = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../../database/db");
const jwtAuth = require("../../middlewares/jwt");

const maxAgeDuration = 300 * 24 * 60 * 60 * 1000;

signup.post("/create_account", async (req, res) => {
  const {
    firstName,
    lastName,
    sex,
    email,
    phoneNumber,
    country,
    password,
    school,
    department,
  } = req.body; //Information provided by the new user is brought in to server with req.body;
  await db.transaction((trx) => {
    //***This is to register the user to the users database */
    trx("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        email: email,
        phone_number: phoneNumber,
        role: "student",
        country: country,
        date_created: new Date(),
        department: department,
        school: school,
      })
      .returning("*")
      .then((credentials) => {
        const signCredentials = credentials[0];
        // As you know we dont save plain passwords to our database, we rather implement highly secured hash with the password with bcrypt,
        // beware that bcrypt hash are irrevisible, only comparable, if a hacker can reverse the hash with a high salt round, it will take approximately 2years running system.
        // Uncomment the hash function and replace the password with the hash created below ie. hash:  password ---> hash
        const hash = bcrypt.hashSync(password, 12);

        //** this transaction is mainly to register the email and password to signin table so the user can has access to the account they are creating now afterwards */
        trx("signin")
          .insert({
            email: signCredentials.email,
            phone_number: signCredentials.phone_number,
            hash: hash, // please make sure to replace the hash value with the hash defined above; password ---> hash
          })
          .returning("*")
          .then((authDetials) => {
            let user = credentials[0];
            const jwt = new jwtAuth().generatedAuthToken(user);
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("auth", jwt, {
              maxAge: maxAgeDuration, // Set the cookie expiration in milliseconds
              httpOnly: true, // Recommended: makes the cookie inaccessible to client-side JavaScript
              secure: isProduction, // Ensures cookie is only sent over HTTPS in production, // Recommended: ensures the cookie is only sent over HTTPS (in production)
              sameSite: isProduction ? "none" : "lax", // Recommended: helps mitigate CSRF attacks
            });
            res.status(200).json({
              user,
              emailVerification: {
                status: "sent",
              },
            });
          })
          .finally(() => trx.commit(trx))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err.detail);
            trx.rollback();
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err.detail);
        trx.rollback();
      });
  });
});

module.exports = signup;

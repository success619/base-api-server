require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const jwtAuthentification = require("./middlewares/jwt");
const cookieParser = require("cookie-parser");

const multer = require("multer")

const app = express();

const corsOptions = {
  credentials: true,
  origin: [
    "https://base4-zeta.vercel.app",
    "http://base4-zeta.vercel.app",
    "http://localhost:3000",
    "https://localhost:3000",
    "https://base-lake.vercel.app",
    "http://base-lake.vercel.app"
  ],
};

app.use(cors(corsOptions));

// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "https://prep-center.vercel.app", // Your production domain
//       "https://school-7f18.vercel.app",
//       "http://prep-center.vercel.app",
//       "http://school-7f18.vercel.app",
//       "https://base4-zeta.vercel.app/",
//       "http://base4-zeta.vercel.app/",
//       "http://localhost:3000",
//       "https: //base4-zeta.vercel.app",
//       "https://localhost:3000", // for a local frontend
//     ],
//   })
// );
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

const jwtAuth = new jwtAuthentification();

app.use(jwtAuth.normalAuthWithCookie); // a middleware to attend in any api call so it must store the user authenticated info to req.user if exist. but dont mistake it with isAuthenticated method.

app.use("/public/images/materials", express.static("./public/images/materials"))
app.use("/api", apiRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large. Max 100MB limit." });
    }
    return res.status(400).json({ error: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT ? process.env.PORT : 4000;
app.listen(port, () => {
  console.log(`Oh hey developer, the server started running on port ${port}`);
  console.log("happy coding, good luck");
});

// ""

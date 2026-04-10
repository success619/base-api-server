const materialsRoute = require("express").Router();
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const { s3Client } = require("../../config/s3Client");
const { createUploader } = require("../../storage/multer/dynamicStorage");
const db = require("../../database/db");
const useBaseTranspiler = require("../../hooks/useBaseTranspiler");

const isProd = process.env.NODE_ENV === 'production';
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const uploadMaterials = createUploader('materials').any();

materialsRoute.post("/new/publish", uploadMaterials, async (req, res, next) => {
  try {
    const { topic, courseCode, content, user_id } = req.body;
    const files = req.files || [];
    const course_id = courseCode.toString().toLowerCase();
    const fileName = `mt_${course_id}_${Date.now()}.base`;

    const dom = new JSDOM(DOMPurify.sanitize(content, {
      ADD_TAGS: ["aside", "button"],
      ADD_ATTR: ["contenteditable", "data-action", "data-index", "style"],
    }));
    
    const document = dom.window.document;
    const images = document.querySelectorAll("img");
    const fileMap = Object.fromEntries(files.map(f => [f.fieldname, f]));

    images.forEach((img) => {
      const idx = img.getAttribute("data-index");
      const file = fileMap[`image_${idx}`];

      if (file) {
        img.src = isProd ? file.location : `${process.env.APP_URL}/public/files/materials/images/${file.filename}`;
      } else {
        const wrap = img.closest(".figure-wrap");
        wrap ? wrap.remove() : img.remove();
      }
      img.removeAttribute("data-index");
    });

    const { transpiledBase } = useBaseTranspiler(dom.serialize());
    let dbContentPath;

    if (isProd) {
      const s3Key = `materials/content/${fileName}`;
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME.trim(),
        Key: s3Key,
        Body: transpiledBase,
        ContentType: 'text/plain', 
      }));
      dbContentPath = s3Key; 
    } else {
      const localPath = `public/files/materials/${fileName}`;
      const dir = 'public/files/materials';
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(localPath, transpiledBase);
      dbContentPath = localPath;
    }

    const [insertedData] = await db("topics")
      .insert({
        course_id,
        user_id,
        topic,
        content_uri: dbContentPath,
        status: "pending",
        date_uploaded: new Date(),
      })
      .returning("*");

    res.status(200).json({
      message: "Published successfully",
      data: insertedData,
    });

  } catch (error) {
    next(error);
  }
});

materialsRoute.get("/get-all-materials/:courseCode", async (req, res) => {
  const courseId = req.params.courseCode.toLowerCase();
  await db("topics")
    .where("topics.course_id", courseId)
    .join("users", "users.user_id", "topics.user_id")
    .join("courses", "courses.course_id", "topics.course_id")
    .select("*")
    .then((materials) => {
      res.status(200).json(materials);
    })
    .catch((err) => {
      res.status(400).json("cant get materials");
      console.log(err);
    });
});

materialsRoute.get("/get-material-content", async (req, res) => {
  const { contentUri } = req.query;

  const rawBaseMaterialContent = fs.readFileSync(contentUri, 'utf8');
  
  const { transpiledHtml } = useBaseTranspiler(rawBaseMaterialContent);
  res.status(200).json(transpiledHtml);
});

module.exports = materialsRoute;

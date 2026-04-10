const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');
const { s3Client } = require('../../config/s3Client');

const isProd = process.env.NODE_ENV === 'production';

const createUploader = (entityName) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = file.mimetype.startsWith('video/') ? 'videos' : 
                     file.mimetype.startsWith('image/') ? 'images' : 'documents';
      const uploadPath = path.join('public', 'files', entityName, folder);
      
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  });

  const s3Storage = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_S3_BUCKET_NAME?.trim(),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      let folder = 'documents';
      if (file.mimetype.startsWith('video/')) folder = 'videos';
      else if (file.mimetype.startsWith('image/')) folder = 'images';

      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      cb(null, `${entityName}/${folder}/${uniqueSuffix}-${file.originalname}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime', 'text/plain', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
    }
  };

  return multer({
    storage: isProd ? s3Storage : diskStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 }
  });
};

module.exports = { createUploader };
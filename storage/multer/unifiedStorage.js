const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const fs = require('fs');
const { s3Client } = require('../../config/s3Client');

const isProd = process.env.NODE_ENV === 'production';

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = file.mimetype.startsWith('video/') ? 'videos' : 'images';
    const uploadPath = path.join('public', 'files', 'materials', folder);
    
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
  bucket: process.env.AWS_S3_BUCKET_NAME,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldname });
  },
  key: (req, file, cb) => {
    let folder = 'misc';
    if (file.mimetype.startsWith('video/')) folder = 'videos';
    else if (file.mimetype.startsWith('image/')) folder = 'images';
    else if (file.mimetype.startsWith('text/') || file.mimetype.includes('pdf')) folder = 'documents';

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `bs/${folder}/${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg', 'image/png', 'image/webp',
    'video/mp4', 'video/quicktime',
    'text/plain', 'application/pdf'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }
};

const uploadMaterialImages = multer({
  storage: isProd ? s3Storage : diskStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }
}).any(); 

module.exports = { uploadMaterialImages };
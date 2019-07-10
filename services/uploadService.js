const cloudinary = require('cloudinary').v2;
const Datauri = require('datauri');
const path = require('path');

const uri = new Datauri();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });

module.exports = {
    upload: (file) => {
      const filePath = uri.format(path.extname(file.originalname), file.buffer).content;

      return cloudinary.uploader.upload(filePath);
    },
};

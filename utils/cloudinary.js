const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_KEY,
    api_secret : process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "/Elibrary",
    allowedFormats: ["jpeg", "png", "jpg","pdf"],
  },
});

const Pdfstorage = new CloudinaryStorage({
  cloudinary,
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
  params: {
    folder: "/Elibrary/articles",
    allowedFormats: ["pdf","word"],
  },
});

module.exports = {
  cloudinary,
  storage,
  Pdfstorage
};

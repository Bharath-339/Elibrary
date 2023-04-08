const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
//     api_key : process.env.CLOUDINARY_KEY,
//     api_secret : process.env.CLOUDINARY_SECRET
// });

cloudinary.config({
  cloud_name: "df7l3dck2",
  api_key: "434998516154546",
  api_secret: "UwoGRpcnA9scBzcX5C2XBQudJ5I",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "/Elibrary",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

module.exports = {
  cloudinary,
  storage,
};

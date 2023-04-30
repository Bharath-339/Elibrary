const User = require('../models/UserSchema');
const isLoggedIn = require('../utils/isLoggedIn');
const News = require('../models/newsSchema');
const Events = require('../models/eventSchema');
const Articles = require('../models/ArticlesSchema');

var cloudinary = require('cloudinary');
const uuid = require('uuid').v4;

const s3UploadV2 = require('../utils/s3');
const {s3,getBucketListItems,getPresignedUrl} = require('../utils/awsSetup');

const {Pdfupload,gfs} = require('../utils/gridfs');
// ---------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------

const BUCKET = process.env.awsBucket;




module.exports.adminRender = async (req,res)=>{
    const users =await User.find({});
    // console.log(users)
    res.render('admin',{title : 'Elibrary | Admin',users : users});
}


module.exports.addNews = async (req,res)=>{
    const newNews = new News(req.body.news);
    newNews.images = req.files.map(f=>({url : f.path, filename :f.filename}));
    await newNews.save();
    req.flash('success',"News Posted")
    res.redirect('/admin')
}

module.exports.addEvents = async (req,res)=>{
    const newEvent = new Events(req.body.event);
    newEvent.images = req.files.map(f=>({url : f.path, filename :f.filename}));
    await newEvent.save();
    req.flash('success',"Event Posted")
    res.redirect('/admin')
}


module.exports.addArticles = async(req, res) => {
    const article = new Articles(req.body.article);
    const file = req.file;
    const result = await s3UploadV2(file);
    article.pdf = result.Key
    await article.save()
    req.flash('success',"Article Posted")
    res.redirect('/admin');
}

module.exports.findArticles = async(req,res)=>{
  const data = await getBucketListItems();
  const {contents = []} = data;
  res.send(data);
}


module.exports.readArticle = async (req,res)=>{

    const {key} = req.params;
    const url = await getPresignedUrl(key)
    res.send(url);
}


module.exports.delete = async (req,res)=>{
  await s3.deleteObject({Bucket : BUCKET,key : req.params.filename}).promise();
  res.send("file deleted successfully");
}


















// const mongoose = require('mongoose');
// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');

// const conn = mongoose.createConnection(process.env.DB_URL || 'mongodb://127.0.0.1:27017/Elibrary');

// let gfs;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
// });

// const storage = new GridFsStorage({
//   url: process.env.DB_URL || 'mongodb://127.0.0.1:27017/Elibrary',
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });

// const Pdfupload = multer({ storage });
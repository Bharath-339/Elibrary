const express = require('express')
const router = express.Router();

const multer  = require('multer');

const {isLoggedIn} = require('../utils/isLoggedIn');
const adminController = require('../controllers/adminController');
const catchAsync = require('../utils/catchAsync')

const {storage} = require('../utils/cloudinary')
const upload = multer({storage})
const gridfs = require('../utils/gridfs');
const {Pdfupload} = require('../utils/gridfs');
const {awsUpload} = require('../utils/awsSetup')
const {gfs} = require('../utils/gridfs');
// ------------------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/',isLoggedIn,adminController.adminRender)
router.post('/news/new',isLoggedIn,upload.array('image-data'),catchAsync(adminController.addNews))

router.post('/events/new',isLoggedIn,upload.array('image-data'),catchAsync(adminController.addEvents))
// router.post('/articles/new',isLoggedIn,Pdfupload.single('pdf'),catchAsync(adminController.addArticles))
router.post('/articles/new',isLoggedIn,awsUpload.single('pdf'),catchAsync(adminController.addArticles))

// router.get('/articles/find',catchAsync(adminController.findArticles));

// router.get('/articles/find/:key',catchAsync(adminController.readArticle));



module.exports = router;


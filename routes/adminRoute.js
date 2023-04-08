const express = require('express')
const router = express.Router();

const {isLoggedIn} = require('../utils/isLoggedIn');
const adminController = require('../controllers/adminController');
const catchAsync = require('../utils/catchAsync')

const multer  = require('multer')
const {storage} = require('../utils/cloudinary')
const upload = multer({storage})



router.get('/',isLoggedIn,adminController.adminRender)
router.post('/news/new',isLoggedIn,upload.array('image-data'),catchAsync(adminController.addNews))

router.post('/events/new',isLoggedIn,upload.array('image-data'),catchAsync(adminController.addEvents))


module.exports = router;


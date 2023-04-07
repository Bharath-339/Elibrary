const express = require('express')
const router = express.Router();

const {isLoggedIn} = require('../utils/isLoggedIn');
const adminController = require('../controllers/adminController');



router.get('/',isLoggedIn,adminController.adminRender)
















module.exports = router;
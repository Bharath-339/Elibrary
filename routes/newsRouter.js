const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../utils/isLoggedIn');

const newsController = require('../controllers/newsController');


router.get('/',isLoggedIn,newsController.newsRender);










module.exports = router;
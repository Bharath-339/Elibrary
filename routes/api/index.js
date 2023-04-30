const express = require('express')
const router = express.Router();

const apiController = require('../../controllers/api')
const catchAsync = require('../../utils/catchAsync')

router.get('/users/data',apiController.usersData);
router.get('/events/data',apiController.eventsData);
router.get('/news/data',apiController.newsData);


router.get('/articles/find',catchAsync(apiController.articles));
router.get('/articles/find/:key',catchAsync(apiController.readArticle));


module.exports = router;
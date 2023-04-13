const express = require('express')
const router = express.Router();

const apiController = require('../../controllers/api')


router.get('/users/data',apiController.usersData);
router.get('/events/data',apiController.eventsData);
router.get('/news/data',apiController.newsData);
module.exports = router;
const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');

const {isLoggedIn} = require('../utils/isLoggedIn');


router.get('/',isLoggedIn,eventsController.eventsRender);








module.exports = router;
const express = require('express')
const router = express.Router();


router.use('/users',require('./userRoute'))
router.use('/events',require('./eventsRouter'));
router.use('/news',require('./newsRouter'))
router.use('/admin',require('./adminRoute'));

router.use('/api',require('./api'))


module.exports = router;
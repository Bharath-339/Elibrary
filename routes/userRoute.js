const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const usercontroller = require('../controllers/usersController');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');

const {isVerified} = require('../utils/isVerified');


router.get('/login',usercontroller.loginRender)

router.post('/login',isVerified,passport.authenticate('local',{failureFlash : true,failureRedirect : '/users/login'}),usercontroller.login);

router.get('/signup',usercontroller.signupRender)

router.post('/signup',catchAsync(usercontroller.signup));

router.get('/logout',usercontroller.logout);
router.get('/verify',usercontroller.verify);


module.exports = router;
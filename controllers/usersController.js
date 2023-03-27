const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const isLoggedIn = require('../utils/isLoggedIn');



module.exports.loginRender = (req,res)=>{
    res.render('login',{title : "Elibrary | login"})
}


module.exports.login =(req,res)=>{
    console.log(req.body);
    res.redirect('/');
}

module.exports.signupRender = (req,res)=>{
    res.render('signup',{title : "Elibrary | signup"})
}


module.exports.signup = async (req,res,next)=>{
         const {email,password,username} = req.body;
         const newuser = new User({email,username});
         const registeruser  = await User.register(newuser,password);
         req.login(registeruser, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/');
        })
 }


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/users/login');
    });
}
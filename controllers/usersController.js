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
        try {
            const {email,password,username,name} = req.body;
            const newuser = new User({email,username,name});
            const registeruser  = await User.register(newuser,password);
            req.login(registeruser, err => {
                if (err) return next(err);
                req.flash('success', 'Welcome to Back!');
                res.redirect('/');
            })
            
        } catch (e) {
            req.flash('error', e.message);
            res.redirect('signup');
        }
 }


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success', 'Successfully logged out');
        res.redirect('/users/login');
    });
}
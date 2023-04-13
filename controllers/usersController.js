const mongoose = require('mongoose');
const User = require('../models/UserSchema');
const isLoggedIn = require('../utils/isLoggedIn');
const verifyMail = require('../utils/sendVerifymail');


module.exports.loginRender = (req,res)=>{
    res.render('login',{title : "Elibrary | login"})
}


module.exports.login = async (req,res)=>{
    const user = await User.findOne({username : req.body.username});
    console.log(user);
    res.redirect('/');
}

module.exports.signupRender = (req,res)=>{
    res.render('signup',{title : "Elibrary | signup"})
}


module.exports.signup = async (req,res,next)=>{
        try {
            // console.log(req.body)
            const {email,password,username,name} = req.body;
            const newuser = new User({email,username,name});
            const registeruser  = await User.register(newuser,password);
            
            await verifyMail(name,email,registeruser._id);
                req.flash('success', 'An email has been sent to your mail adderess, please verify');
                res.redirect('signup');
            
        } catch (e) {
            console.log(e)
            req.flash('error', e.message);
            res.redirect('signup');
        }
 }


module.exports.verify = async(req,res)=>{
    try{
        const {id} = req.query;

       const updated_user= await User.updateOne({_id : id},{$set : {    is_verified : true}});
       if(updated_user.is_verified == true){
            // req.login(updated_user, err => {
            //     if (err) return next(err);
                req.flash('success', 'Your email has been verified please login');
               return  res.redirect('login');
            // })
       }

        req.flash('success', 'Your email has been verified please login');
        res.redirect('signup');

    }catch(err){

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
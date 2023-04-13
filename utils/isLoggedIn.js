const User = require('../models/UserSchema');

module.exports.isLoggedIn = async (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/users/login');
    }
    next();
}
const User = require('../models/UserSchema');

module.exports.isVerified = async (req,res,next)=>{
    const user = await User.findOne({username : req.body.username});
    if(user.is_verified == false){
        req.flash('error' ,'Please verify your email');
        return res.redirect('login');
    }
    next();
}
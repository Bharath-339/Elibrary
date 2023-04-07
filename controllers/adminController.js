const User = require('../models/UserSchema');
const isLoggedIn = require('../utils/isLoggedIn');


module.exports.adminRender = (req,res)=>{
    res.render('admin',{title : 'Elibrary | Admin'});
}
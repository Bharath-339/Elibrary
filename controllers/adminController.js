const User = require('../models/UserSchema');
const isLoggedIn = require('../utils/isLoggedIn');
const News = require('../models/newsSchema');
const Events = require('../models/eventSchema');


module.exports.adminRender = async (req,res)=>{
    const users =await User.find({});
    // console.log(users)
    res.render('admin',{title : 'Elibrary | Admin',users : users});
}


module.exports.addNews = async (req,res)=>{
    const newNews = new News(req.body.news);
    newNews.images = req.files.map(f=>({url : f.path, filename :f.filename}));
    await newNews.save();
    req.flash('success',"News Posted")
    res.redirect('/admin')
}

module.exports.addEvents = async (req,res)=>{
    const newEvent = new Events(req.body.event);
    newEvent.images = req.files.map(f=>({url : f.path, filename :f.filename}));
    await newEvent.save();
    req.flash('success',"Event Posted")
    res.redirect('/admin')
}
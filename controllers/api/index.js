const User = require('../../models/UserSchema');
const Events = require('../../models/eventSchema');
const News = require('../../models/newsSchema');


module.exports.usersData = async (req,res)=>{
    const users = await User.find({});
    res.status(200).json({data : users,
        message : "This is the users  data"
    })
}

module.exports.newsData = async (req,res)=>{
    const newsData = await News.find({});
    res.status(200).json({data : newsData,
    message : "This is the news data"})
}

module.exports.eventsData = async (req,res)=>{
    const eventsData = await Events.find({});
    res.status(200).json({data : eventsData,
        message : "This is events data"
    })
}
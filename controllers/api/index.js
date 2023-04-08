const User = require('../../models/UserSchema');
const Events = require('../../models/eventSchema');


module.exports.usersData = async (req,res)=>{
    const users = await User.find({});
    // console.log(users);
    res.status(200).json({data : users,
        message : "This is the users  data"
    })
}

module.exports.eventsData = async (req,res)=>{
    const eventsData = await Events.find({});
    res.status(200).json({data : eventsData,
        message : "This is events data"
    })
}
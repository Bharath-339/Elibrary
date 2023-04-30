const User = require('../../models/UserSchema');
const Events = require('../../models/eventSchema');
const News = require('../../models/newsSchema');
const Artciles = require('../../models/ArticlesSchema');

// ---------------------------------------------------------------------------------------------

const s3UploadV2 = require('../../utils/s3');
const {s3,getBucketListItems,getPresignedUrl} = require('../../utils/awsSetup');
const ArticlesSchema = require('../../models/ArticlesSchema');
const BUCKET = process.env.awsBucket;

// ---------------------------------------------------------------------------------------------


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

module.exports.articles = async(req,res)=>{
    const data = await ArticlesSchema.find({});
    // console.log(data);
    res.json(data);
}

module.exports.findArticles = async(req,res)=>{
  const data = await getBucketListItems();
  const {contents = []} = data;
  res.send(data);
}



module.exports.readArticle = async (req,res)=>{

  const {key} = req.params;
  const url = await getPresignedUrl(key)
  res.send(url);
}
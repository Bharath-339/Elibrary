require("dotenv").config();


const aws= require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const storage = multer.memoryStorage();


aws.config.update({
    secretAccessKey : process.env.awsSecret,
    accessKeyId : process.env.awsKey,
    region : process.env.awsRegion
})

const BUCKET = process.env.awsBucket;
const s3 = new aws.S3();


const filefilter = (req,file,cb)=>{
    if(file.mimetype.split('/')[0] === 'application/pdf'){
        cb(null,true);
    }else{
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'),false)
    }
}


const upload = multer({
    storage,
    filefilter
})


const getBucketListItems = async ()=>{
    const params = {
        Bucket : BUCKET,
    }

    const data =await  s3.listObjects(params).promise();
    return data || {}
}

const getPresignedUrl = async (key)=>{
    const params = {
        Bucket : BUCKET,
        Key : key,
        Expires : 120
    }
    const presignedUrl = await s3.getSignedUrl('getObject',params);

    return presignedUrl;
}


module.exports = {awsUpload : upload,s3:s3,getBucketListItems,getPresignedUrl}



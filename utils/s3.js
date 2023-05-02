const {S3} = require('aws-sdk');
const uuid = require('uuid').v4;


s3UploadV2 = async (file)=>{
    const s3 = new S3();
    const param = {
      Bucket : process.env.awsBucket,
      Key : `${uuid()}-${file.originalname}`,
      Body : file.buffer,
      // ContentDisposition:"attachment",
      ContentType:"application/pdf"
    };
    console.log("This are params " , param);
    return await s3.upload(param).promise();
}



module.exports = s3UploadV2;
const nodemailer = require('nodemailer');
const User = require('../models/UserSchema');
// const path = require('path');
// const ejs = requie('ejs');

const sendVerifymail = async (username,mail,userId)=>{
    try{
      let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports,
            requireTLS : true,
            auth: {
              user: process.env.EMAIL_ID, // generated ethereal user
              pass: process.env.PASSWORD, // generated ethereal password
            },
            tls : { rejectUnauthorized: false }
          });

          await transporter.sendMail({
            from: process.env.EMAIL_ID , // sender address
            to: mail, // list of receivers
            subject: "Email Verification for Elibrary", // Subject line,
            text : 'Hello' +username +'please verify your mail',
            html: 'htpp://127.0.0.1:5000/users/verify?id=' + userId , // html body
          },(err,info)=>{
            if(err){
              console.log(err.message);
            }else{
              console.log('Email has been sent successfully' + info.response);
            }
          });


    }catch(err){
        console.log(err.message);
    }
}


module.exports = sendVerifymail;
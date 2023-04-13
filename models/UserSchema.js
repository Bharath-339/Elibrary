const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;


const User = Schema({
    username :{
        type : Number,
        required : true,
        unique : true,
    },
    email : {
        type : String,
        required : true,
        unique :true,
    },
    name :{
        type : String,
        required : true
    },
    is_verified :{
        type : Boolean,
        default : false
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);
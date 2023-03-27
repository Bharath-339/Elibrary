const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;


const User = Schema({
    email : {
        type : String,
        required : true,
        unique :true,
    }
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',User);
const mongoose = require('mongoose'); 


var newsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    source :{
        type : String,
        required : true
    },
    images : [
        {
            url : String,
            filename : String
        }
    ]
});

//Export the model
module.exports = mongoose.model('News', newsSchema);
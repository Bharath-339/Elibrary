const mongoose = require('mongoose'); 


var articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    source :{
        type : String,
        required : true
    },
    pdf : 
        {
            type : String
        }
    
});

//Export the model
module.exports = mongoose.model('Articles', articleSchema);
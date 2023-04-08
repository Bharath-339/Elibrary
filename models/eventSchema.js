const mongoose = require('mongoose'); 


var eventsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    organizer : {
        type : String,
        required : true
    },
    images : [
        {
            url : String,
            filename : String
        }
    ],
    venue :{
        type : String,
        required : true
    }
});

//Export the model
module.exports = mongoose.model('Event', eventsSchema);
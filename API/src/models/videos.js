const mongoose = require('mongoose');

const videosSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Video Name is required'],
        match : /^[a-zA-Z ]{2,15}$/
    },
  
    topic : {
        type : String,
        required : [true,'Video topic is required'],
    },
    link : {
        type : String,
        required : [true,'Video Link is required'],
    },
    status : {
        type : Boolean,
        default : true
    },
      created_at : {
        type : Date,
        default : Date.now
    },
    updated_at : {
        type : Date,
        default : Date.now
    },
    deleted_at : {
        type : Date,
        default : ''
    },
})

const videosModel = mongoose.model('videos',videosSchema);

module.exports = videosModel;
const mongoose = require('mongoose');

const defaultSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Name is required'],
        match : /^[a-zA-Z ']{2,10}$/
    },
    image : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default : true
    },
    order : {
        type : Number,
        default : 1,
        min : 1,
        max : 100
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

const defaultModel = mongoose.model('default',defaultSchema);

module.exports = defaultModel;
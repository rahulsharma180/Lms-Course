const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Course Name is required'],
        match : /^[a-zA-Z ]{2,15}$/
    },
    image : {
        type : String,
        required : [true,'Course Image is required'],
    },
    price : {
        type : Number,
        required : [true,'Course Price is required'],
    },
    duration : {
        type : String,
        required : [true,'Course Duration is required'],
    },
    description : {
        type : String,
        required : [true,'Course Description is required'],
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

const coursesModel = mongoose.model('courses',coursesSchema);

module.exports = coursesModel;
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Name is required'],
        match : /^[a-zA-Z ']{2,10}$/
    },
    email : {
        type : String,
        required : [true,'Email is required'],
        
    },
    mobile_number : {
        type : String,
        required : [true,'Mobile Number is required'],
         
    },
    password : {
        type : String,
        required : [true,'Password is required'],
       
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

const usersModel = mongoose.model('users',usersSchema);

module.exports = usersModel;
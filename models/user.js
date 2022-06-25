const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema


const userSchema = new Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type: String,
    },
    username:{
        type:String,
        select: false,
        required: true
    },
    password:{
        type:String,
        select: false,
        required:true,
    },
    
    
});

module.exports = mongoose.model('user',userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertSchema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        
    },
    category:{
        type: String,
        required:true,
    },
    tags:{
        type: [String],
        required:true,
    },
    price:{
        type: Number,
        required:true,
    }
}); 

module.exports = mongoose.model('advert', advertSchema);
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FilmSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    point:{
        type:Number,
    },
    reviewerNum:{
        type:Number,
    },
    status:{
        type:String,
        required:true
    },
    userSubcribe:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    

})

module.exports = mongoose.model('films',FilmSchema)
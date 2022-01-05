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
        type:String
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
    year:{
        type:String,
        required:true
    },
    numOfep:{
        type:Number
    }
    

})

module.exports = mongoose.model('films',FilmSchema)
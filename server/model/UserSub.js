const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSubSchema = new Schema({
    userId:{
        type:String,
        required:true,
    },
    filmId:{
        type:String,
        required:true
    },
    title:{
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
    numOfep:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('usersSub',UserSubSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gmail:{
        type:String
    },
    avatar:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('users',UserSchema)
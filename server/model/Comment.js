const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    username:{
        type:String
    },
    avatar:{
        type:String
    },
    commentBody:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    film:{
        type:Schema.Types.ObjectId,
        ref:'films'
    },
    commentParentId:{
        type:String
    }
})

module.exports = mongoose.model('comments',CommentSchema)
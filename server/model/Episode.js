const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EpisodeSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    epNum:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    film:{
        type:Schema.Types.ObjectId,
        ref:'films'
    }

})

module.exports = mongoose.model('episodes',EpisodeSchema)
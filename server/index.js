require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRouter = require('./routes/auth')
const filmsRouter = require('./routes/films')
const commentRouter = require('./routes/comment')
const connectDB = async() => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.efmme.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        })
        console.log('MongoDB connected')
    }catch(error){
        console.log(error.message)
        process.exit(1)
    }
}
connectDB()
const app = express()
app.use(express.json())
app.use(cors({origin:"*"}));


app.use('/api/auth',authRouter)
app.use('/api/films',filmsRouter)
app.use('/api/comments',commentRouter)

const PORT = 5000 || process.env.PORT

app.listen(PORT,()=> console.log(`Server start on port ${PORT}`))

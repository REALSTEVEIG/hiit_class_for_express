require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./db/connect')
const router = require('./routes/auth')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use('/', router)

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port, () => console.log(`Server is listening on port ${port}`)) 
    } catch (error) {
        console.log(error)
    }
}

start()
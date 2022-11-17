require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const connectDB = require('./db/connect')
const router = require('./routes/auth')
const path = require('path')
const cookieParser = require('cookie-parser')
const {engine} = require('express-handlebars')
const notFoundMiddleware = require('./middlewares/pagenotfound')
const serverError = require('./middlewares/servererror')

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookieParser())

app.use('/', router)
app.use('*', notFoundMiddleware)

app.use(serverError)

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI)
       app.listen(port, () => console.log(`Server is listening on port ${port}`)) 
    } catch (error) {
        console.log(error)
    }
}

start()
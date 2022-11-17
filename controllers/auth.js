const Auth = require('../model/auth')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

exports.registerPage = (req, res) => {
    return res.render('register', {title : "REGISTER"})
}

exports.loginPage = (req, res) => {
   return res.render('login', {title : "LOGIN"})
}

exports.dashboardPage = (req, res) => {
    const token = req.cookies.token
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const username = payload.username.toString().toLocaleUpperCase()
    return res.render('dashboard', {title : 'DASHBOARD', layout : "main2", msg : username})
}

exports.register = async (req, res) => {
    try {
        const {email, password, username, confirmPassword} = req.body

        if (!email || !password || !username || !confirmPassword) {
            console.log('Please provide all the required information')
            return res.status(500).render('register', {msg : 'Please provide all the required information'})
        }
    
        const user = await Auth.findOne({email})
    
        if (user) {
            console.log('User already exists')
            return res.status(400).render('register',{msg : `${req.body.email} already exists`})
        }
    
        const newUser = await Auth.create({...req.body})
        const token = newUser.createJWT()
    
        const nodemailer = require('nodemailer')
    
        const transport = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.email,
                pass : process.env.password
            }
        })
    
        const mailOptions = {
            from : 'agunigeria3@gmail.com',
            to : req.body.email,
            subject : 'GREETINGS',
            html : '<h1>Thank you for registering with AGU Nigeria'
        }
    
        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err)
            }
    
            console.log(info)
        })
    
    
        // console.log(token)
        res.cookie('token', token, {secure : false, httpOnly : true})
    
        return res.status(201).redirect('login')
    
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('register', {msg : error.message})
    }
}

exports.login = async (req, res) => {
   try {
    const {email, password} = req.body
    
    const user = await Auth.findOne({email})

    if (!user) {
        console.log('User does not exist in the database')
        return res.status(400).json({msg : 'User does not exist in our database'})
    }


    const userExist = await user.comparePasswords(password)

    if (!userExist) {
        return res.status(400).json({msg : 'Password is incorrect'})
    }

    const token = user.createJWT()

    res.cookie('token', token, {secure : false, httpOnly : true})

    return res.status(200).redirect('dashboard')

   } catch (error) {
    console.log(error)
   }
}

exports.logout = (req, res) => {
    try {
        res.clearCookie('token')
        return res.status(200).redirect('register')
    } catch (error) {
        console.log(error)
    }
}
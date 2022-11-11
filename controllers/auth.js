const Auth = require('../model/auth')


exports.registerPage = (req, res) => {
    return res.render('register', {title : "REGISTER"})
}

exports.loginPage = (req, res) => {
   return res.render('login', {title : "LOGIN"})
}

exports.dashboardPage = (req, res) => {
    return res.render('dashboard', {title : 'DASHBOARD', layout : "main2"})
}

exports.register = async (req, res) => {
    const {email, password, username} = req.body

    if (!email || !password || !username) {
        console.log('Please provide all the required information')
        return res.status(400).render('register', {msg : 'Please provide all the required information'})
    }

    const user = await Auth.findOne({email})

    if (user) {
        console.log('User already exists')
        return res.status(400).render('register',{msg : "User already exists"})
    }

    const newUser = await Auth.create({...req.body})

    return res.status(201).redirect('login')
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

    return res.status(200).redirect('dashboard')

   } catch (error) {
    console.log(error)
   }
}
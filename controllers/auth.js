const Auth = require('../model/auth')

const register = async (req, res) => {
    const {email, password, username} = req.body

    if (!email || !password || !username) {
        console.log('Please provide all the required information')
        return res.status(400).json({msg : 'Please provide all the required information'})
    }

    const user = await Auth.findOne({email})

    if (user) {
        console.log('User already exists')
        return res.status(400).json({msg : "User already exists"})
    }

    const newUser = await Auth.create({...req.body})

    return res.status(201).redirect('login.html')
}

const login = async (req, res) => {
   try {
    const {email, password} = req.body
    
    const user = await Auth.findOne({email})

    if (!user) {
        console.log('User does not exist in the database')
        return res.status(400).json({msg : 'User does not exist in our database'})
    }

    return res.status(200).redirect('dashboard.html')

   } catch (error) {
    console.log(error)
   }
}

module.exports = {
    register, 
    login
}
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const authSchema = mongoose.Schema({
    email : {
        type : String,
        validate : [validator.isEmail, 'Email is invalid'],
        // unique : true
    },
    password : {
        type : String
    },
    
    username : {
        type : String
    },
    confirmPassword : {
        type : String,
        required : [true, 'Please confirm your original password'],
        validate : {
            validator : function (el) {
                return el === this.password
            },
            msg : "password mismatch"
        }
    }
})


authSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    this.confirmPassword = undefined
})

authSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

authSchema.methods.createJWT = function () {
    return jwt.sign(
        {id : this._id, username : this.username}, 
        process.env.JWT_SECRET,
        {expiresIn : process.env.JWT_EXPIRES})
}

module.exports = mongoose.model('Auth', authSchema)
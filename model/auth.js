const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const authSchema = mongoose.Schema({
    email : {
        type : String
    },
    password : {
        type : String
    },
    
    username : {
        type : String
    }
})


authSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

authSchema.methods.comparePasswords = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Auth', authSchema)
const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authentication')

const {register, login, registerPage, loginPage, dashboardPage, logout} = require('../controllers/auth')

router.route('/register').post(register)
router.route('/login').post(login)

router.route('/register').get(registerPage)
router.route('/login').get(loginPage)
router.route('/dashboard').get(authMiddleware, dashboardPage)

router.route('/logout').get(logout)


module.exports = router
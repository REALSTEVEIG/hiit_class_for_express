
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log(token)
        if (!token) {
           return res.status(401).redirect('register')
        }
        next()
    } catch (error) {
        return res.status(409).render('register')
    }
}

module.exports = authMiddleware

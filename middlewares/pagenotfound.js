const {StatusCodes} = require('http-status-codes')

const notFound = (req, res) => {
    return res.status(StatusCodes.NOT_FOUND).render('404')
}


module.exports = notFound
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_KEY)
        req.currentUser = decoded
        next()
    } catch (error) {
        return res.status(401).send({
            message: 'Não autorizado'
        });
    }
}

module.exports = {
    checkAuth
}
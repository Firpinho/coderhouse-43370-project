const config = require('../config')

const validateAdmin = (req, res, next) => {
    if(config.NODE_ENV === 'test') next()
    else if (req.user.role !== 'user' || req.user.premium) next()
    else res.json({msg: "UNAUTHORIZED"})
}

const validateUser = (req, res, next) => {
    if(req.user.role === 'user') next()
    else res.send('No autorizado')
}


module.exports = {
    validateAdmin,
    validateUser
}
const validateAdmin = (req, res, next) => {
    if(req.user.role !== 'user' || req.user.premium) next()
    else res.send('No autorizado')
}

const validateUser = (req, res, next) => {
    if(req.user.role === 'user') next()
    else res.send('No autorizado')
}


module.exports = {
    validateAdmin,
    validateUser
}
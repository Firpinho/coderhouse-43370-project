const validateAdmin = (req, res, next) => {
    if(req.user.role !== 'user') {
        next()
    }
    res.send('No autorizado')
}

const validateUser = (req, res, next) => {
    if(req.user.role === 'user') {
        next()
    }
    res.send('No autorizado')
}

module.exports = {
    validateAdmin,
    validateUser
}
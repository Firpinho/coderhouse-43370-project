const { UserDao } = require('../persistence/daos/factory')
const UserRepository = require('../persistence/repository/user/user.repository')
const {generateToken} = require("../utils/token.generator")
const { send } = require("../services/email.services");
const logger = require('../utils/log.config');
const { createHash, validatePassword } = require('../utils/password-protect');
const { getById } = require('./product.services');

const userRepository = new UserRepository();

const getByEmail = async (email) => {
    try {
        return UserDao.getByEmail(email);
    } catch (error) {
        return error
    }
}

const getCurrent = async (id) => {
    try {
        return await userRepository.getByIdDTO(id);
    } catch (error) {
        return error
    }
}

const setPremium = async (id) => {
    try {
        return await UserDao.update(id, {premium: true});
    } catch (error) {
        return error
    }
}

const resetPassword = async (mail) => {
    const userExists = await getByEmail(mail);
    const token = userExists ? generateToken({user: userExists}, "1h") : false;

    return !token ? false : await send(mail, `Restablecer contraseña`, `<p>En este link podras restablecer tu contraseña: <a href="http://localhost:8080/api/user/updatePassword">Restablecer</a> (El link expira en una hora)</p>`, token);
}

const updatePassword = async (userID, newPassword) => {
    try {
        const user = await UserDao.getById(userID);

        if(validatePassword(user, newPassword)) throw new Error(`Esta es tu contraseña actual.`)
        else return await UserDao.update(userID, {password: createHash(newPassword)})
        
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    getByEmail,
    getCurrent,
    setPremium,
    resetPassword,
    updatePassword
}
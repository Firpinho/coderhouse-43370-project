const { UserDao } = require('../persistence/daos/factory')
const UserRepository = require('../persistence/repository/user/user.repository')
const {generateToken} = require("../utils/token.generator")
const { send } = require("../services/email.services");
const logger = require('../utils/log.config');
const { createHash, validatePassword } = require('../utils/password-protect');
const ActiveUser = require('../utils/inactiveUsers.helper')

const userRepository = new UserRepository();

const getByEmail = async (email) => {
    try {
        return UserDao.getByEmail(email);
    } catch (error) {
        return error
    }
}

const getAll = async () => {
    try {
        return await userRepository.getAllUsersDTO();
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


const deleteInactiveUsers = async () => {
    const users = await userRepository.getAllUsersDTO();
    users.forEach(async user => {
        if(!ActiveUser(user.ultima_conexion)){
            const result = await UserDao.getByEmail(user.email);
            const deletedUser = await UserDao.delete(result._id);
            send(deletedUser.email, 'Usuario eliminado', 'Tu usuario ha sido eliminado por inactividad.')
            if(deletedUser) logger.warn('User '+deletedUser._id+' DELETED reason: Inactivity');
        }
    });
}

module.exports = {
    getByEmail,
    getCurrent,
    setPremium,
    resetPassword,
    updatePassword,
    getAll,
    deleteInactiveUsers
}
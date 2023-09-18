const { UserDao } = require('../persistence/daos/factory')
const UserRepository = require('../persistence/repository/user/user.repository')

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

module.exports = {
    getByEmail,
    getCurrent
}
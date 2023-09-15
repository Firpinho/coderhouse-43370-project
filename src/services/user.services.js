const { UserDao } = require('../persistence/daos/factory')

const userDao = new UserDao();

const getByEmail = async (email) => {
    try {
        return userDao.getByEmail(email);
    } catch (error) {
        return error
    }
}

module.exports = {
    getByEmail
}
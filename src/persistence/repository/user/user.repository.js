const {UserDao} = require('../../daos/factory');
const UserResDTO = require('../../dtos/user/user.res.dto')

class UserRepository {
    constructor() {
        this.dao = UserDao;
    }

    async getByIdDTO(id) {
        const result = await this.dao.getById(id);
        return new UserResDTO(result);
    }
}

module.exports = UserRepository
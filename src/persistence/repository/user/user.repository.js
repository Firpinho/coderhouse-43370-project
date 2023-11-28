const {UserDao} = require('../../daos/factory');
const UserResDTO = require('../../dtos/user/user.res.dto')

class UserRepository {
    constructor() {
        this.dao = UserDao;
    }

    async getAllUsersDTO() {
        const result = await this.dao.getAllUsers();
        return result.map((user) => new UserResDTO(user));
    }
 
    async getByIdDTO(id) {
        const result = await this.dao.getById(id);
        return new UserResDTO(result);
    }
}

module.exports = UserRepository
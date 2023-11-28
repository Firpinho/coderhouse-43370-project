const MongoDBDao = require('./mongo.dao');
const { UserModel:Model } = require('./models/user.model')

class UserDao extends MongoDBDao {
    constructor() {
        super(Model)
    }

    async getAllUsers() {
        try {
            return await this.model.find({});
        } catch (error) {
            return error
        }
    }

    async getByEmail(email) {
        try {
            return await this.model.findOne({email: email});
        } catch (error) {
            return error
        }
    }
}

module.exports = UserDao;
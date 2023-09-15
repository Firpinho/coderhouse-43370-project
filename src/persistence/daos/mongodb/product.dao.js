const MongoDBDao = require('./mongo.dao');
const { ProductModel:Model } = require('./models/product.model')

class ProductDao extends MongoDBDao {
    constructor() {
        super(Model)
    }
}

module.exports = ProductDao;
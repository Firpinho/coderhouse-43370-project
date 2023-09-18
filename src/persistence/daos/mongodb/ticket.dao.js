const MongoDBDao = require('./mongo.dao');
const { TicketModel:Model } = require('./models/ticket.model')

class TicketDao extends MongoDBDao {
    constructor() {
        super(Model)
    }
}

module.exports = TicketDao;
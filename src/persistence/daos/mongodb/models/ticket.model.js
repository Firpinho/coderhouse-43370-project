const mongoose = require('mongoose');

const date = new Date();

const ticketSchema = new mongoose.Schema({
    code : {type: String, required: true, default: `#TN-${new mongoose.Types.ObjectId()}`}, 
    purchase_datetime: {type: Date, required: true, default: date},
    amount: {type: Number, required: true},
    purchaser: {type: String, required: true}
});

module.exports = { TicketModel: mongoose.model('ticket', ticketSchema) }
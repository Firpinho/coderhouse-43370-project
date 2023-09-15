const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, required: true, default: 1 }
}, { _id : false });

const cartSchema = new mongoose.Schema({
    products : {type: [cartItemSchema], required: true}
});

module.exports = { CartModel: mongoose.model('carts', cartSchema) }
const MongoDBDao = require('./mongo.dao');
const { CartModel : Model } = require('./models/cart.model')

class CartDao extends MongoDBDao {
    constructor() {
        super(Model)
    }

    async getCart(cid) {
        return await this.model.findById(cid).populate('products.product').lean();
    }

    async addProduct(cid, pid) {
        const cart = await this.model.findById(cid);
        const exists = cart.products.some((product) => product.product.toString() === pid)
        
        if(!exists) cart.products.push({product: pid});
        else cart.products.find((product) => { if(product.product.toString() === pid) product.quantity++ })

        cart.save()
        return cart;
    }

    async removeProduct(cid, pid) {
        const cart = await this.model.findById(cid);

        cart.products.find((product) => { 
            const stringId = product.product.toString();
            if(stringId === pid && product.quantity > 1) product.quantity-- 
            else if(stringId === pid && product.quantity === 1) cart.products.splice(cart.products.indexOf(cart.products.product));
        })
        
        cart.save()
        return cart;
    }

    async updateQuantity(cid, pid, quantity) {
        const cart = await this.model.findById(cid);

        cart.products.find((product) => { 
            const stringId = product.product.toString();
            if(stringId === pid) product.quantity = quantity
        })
        
        cart.save()
        return cart;
    }

}

module.exports = CartDao;
const {CartDao, ProductDao, TicketDao} = require('../persistence/daos/factory')


const getById = async (id) => {
    try {
        return await CartDao.getCart(id);
    } catch (error) {
        return error
    }
} 

const create = async (obj) => {
    try {
        return await CartDao.create(obj);        
    } catch (error) {
        return error
    }
}

const addProduct = async (cid, pid) => {
    console.log(await productExists(pid));
    if(await productExists(pid)) return await CartDao.addProduct(cid, pid);
    return false
}

const removeProduct = async (cid, pid) => {
    if(await productExists(pid)) return await CartDao.removeProduct(cid, pid);
    return await productExists(pid)
}

const updateQuantity = async (cid, pid, quantity) => {
    if(await productExists(pid)) return await CartDao.updateQuantity(cid, pid, quantity);
    return await productExists(pid)
}

const update = async (id, obj) => {
    return await CartDao.update(id, obj);      
}

const purchase = async (cid, name) => {

    let amount = 0; 
    const cart = await getById(cid);
    const not_purchased_products = [];
    const not_purchased_products_ids = [];

    cart.products.forEach(result => {
        let stock = result.product.stock;
        const quantity = result.quantity;

        if (stock >= quantity) {
            
            result.product.stock = stock - quantity
            ProductDao.update(result.product._id, result.product)
            amount = amount + (result.product.price * quantity);
        }else {
            not_purchased_products.push(result);
            not_purchased_products_ids.push(result.product._id)
        }
    });

    const result = {
        ticket: await TicketDao.create({
            amount,
            purchaser: name
        }) 
    }

    if (not_purchased_products) {
        update(cid, {products: not_purchased_products})
        result.no_stock = not_purchased_products_ids
    }
    
    result.ticket.code = generateTicketCode(result.ticket)

    return result;
}


const productExists = async (pid) => {
    return await ProductDao.getById(pid);
}

const generateTicketCode = (ticket) => {
    return `#T-${ticket._id}`
}


module.exports = {
    getById,
    create,
    addProduct,
    removeProduct,
    updateQuantity,
    update,
    purchase
}
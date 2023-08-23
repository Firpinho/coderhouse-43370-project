const CartDao = require('../daos/mongodb/cart.dao')
const ProductDao = require('../daos/mongodb/product.dao')

const cartDao = new CartDao();
const productDao = new ProductDao();


const getById = async (id) => {
    try {
        return await cartDao.getCart(id);
    } catch (error) {
        return error
    }
} 

const create = async (obj) => {
    try {
        return await cartDao.create(obj);        
    } catch (error) {
        return error
    }
}

const addProduct = async (cid, pid) => {
    if(await productExists(pid)) return await cartDao.addProduct(cid, pid);
    return await productExists(pid)
}

const removeProduct = async (cid, pid) => {
    if(await productExists(pid)) return await cartDao.removeProduct(cid, pid);
    return await productExists(pid)
}

const updateQuantity = async (cid, pid, quantity) => {
    if(await productExists(pid)) return await cartDao.updateQuantity(cid, pid, quantity);
    return await productExists(pid)
}

const update = async (id, obj) => {
    return await cartDao.update(id, obj);      
}


const productExists = async (pid) => {
    return await productDao.getById(pid);
}

module.exports = {
    getById,
    create,
    addProduct,
    removeProduct,
    updateQuantity,
    update
}
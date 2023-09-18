
const {CartDao, ProductDao} = require('../persistence/daos/factory')


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
    if(await productExists(pid)) return await CartDao.addProduct(cid, pid);
    return await productExists(pid)
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


const productExists = async (pid) => {
    return await ProductDao.getById(pid);
}

module.exports = {
    getById,
    create,
    addProduct,
    removeProduct,
    updateQuantity,
    update
}
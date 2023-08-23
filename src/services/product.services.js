const ProductDao = require('../daos/mongodb/product.dao')

const productDao = new ProductDao();

const getAll = async () => {
    try {
        return await productDao.getAll();
    } catch (error) {
        return error
    }
}

const getById = async (id) => {
    try {
        return await productDao.getById(id);
    } catch (error) {
        return error
    }
}

const create = async (obj) => {
    try {
        return await productDao.create(obj);
    } catch (error) {
        return error
    }
}

const update = async (id, obj) => {
    try {
        return await productDao.update(id, obj);
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        return await productDao.delete(id);
    } catch (error) {
        return error
    }
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
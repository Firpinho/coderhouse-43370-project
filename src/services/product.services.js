const {ProductDao} = require('../persistence/daos/factory')
const ProductRepository = require('../persistence/repository/product/product.repository')

const productRepository = new ProductRepository()


const getAll = async () => {
    try {
        return await ProductDao.getAll();
    } catch (error) {
        return error
    }
}

const getById = async (id) => {
    try {
        //return await ProductDao.getById(id);
        return await productRepository.getByIdDTO(id);
    } catch (error) {
        return error
    }
}

const create = async (obj) => {
    try {
        return await ProductDao.create(obj);
    } catch (error) {
        return error
    }
}

const update = async (id, obj) => {
    try {
        return await ProductDao.update(id, obj);
    } catch (error) {
        return error
    }
}

const remove = async (id) => {
    try {
        return await ProductDao.delete(id);
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
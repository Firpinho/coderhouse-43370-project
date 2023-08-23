const productServices = require('../services/product.services');

const getAll = async (req, res, next) => {
    try {
        const products = await productServices.getAll();
        if (products) return res.status(200).json(products);
        else return res.status(400).json({msg: 'No hay productos aún...'})
    } catch (error) {
        next(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productServices.getById(id);
        if (product) res.status(200).json(product);
        else res.status(400).json({msg: 'No existe ningun producto con ese ID...'});
    } catch (error) {
        next(error.message)
    }
}

const create = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const createdProduct = await productServices.create(newProduct);
        if (createdProduct) res.status(200).json(createdProduct);
        else res.status(400).json({msg: 'Ha ocurrido un error al crear el producto...'});
    } catch (error) {
        next(error.message)
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const obj = req.body;
        const updatedProduct = await productServices.update(id, obj);
        if(updatedProduct) res.status(200).json(updatedProduct);
        else res.status(400).json({msg: 'Ha ocurrido un error al actualizar los datos del producto...'});
    } catch (error) {
        next(error.message)
    }
}

const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deletedProduct = await productServices.remove(id);
        if (deletedProduct) res.status(200).json(deletedProduct);
        else res.status(400).json({msg: 'No hay ningun proucto con ese ID...'})
    } catch (error) {
        next(error.message)
    }
    
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
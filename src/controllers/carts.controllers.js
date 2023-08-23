const cartServices = require('../services/carts.services');

const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getById(cid);
        console.log(cart);
        if (cart) res.status(200).json(cart)
        else res.status(400).json({msg: 'No existe ningun carrito con ese ID...'})
    } catch (error) {
        next(error.message)
    }
}

const create = async (req, res, next) => {
    try {
        const obj = req.body;
        const cart = await cartServices.create(obj);
        if (cart) res.status(200).json(cart)
        else res.status(400).json({msg: 'No existe ningun carrito con ese ID...'})
    } catch (error) {
        next(error.message)
    }
}

const addProduct = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const productAdded = await cartServices.addProduct(cid, pid);
        if (productAdded) res.status(200).json(productAdded)
        else res.status(400).json({msg: 'No existe ningun producto o carrito con ese ID...'})
    } catch (error) {
        next(error.message)
    }
}

const removeProduct = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const productRemoved = await cartServices.removeProduct(cid, pid);
        if (productRemoved) res.status(200).json(productRemoved)
        else res.status(400).json({msg: 'No existe ningun producto o carrito con ese ID...'})
    } catch (error) {
        next(error.message)
    }
}

const updateQuantity = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const quantity = req.body.quantity
        const quantityUpdated = await cartServices.updateQuantity(cid, pid, quantity)
        if (quantityUpdated) res.status(200).json(quantityUpdated)
        else res.status(400).json({msg: 'No existe ningun producto o carrito con ese ID...'})
    } catch(error) {
        next(error.message)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const obj = req.body
        const updatedCart = await cartServices.update(cid, obj)
        if (updatedCart) res.status(200).json(updatedCart)
        else res.status(400).json({msg: 'No existe ningun producto o carrito con ese ID...'})
    } catch (error) {
        next(error.message)
    }
}

module.exports = {
    getById,
    create,
    addProduct,
    removeProduct,
    updateQuantity,
    updateCart
}
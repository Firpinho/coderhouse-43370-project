const productServices = require('../services/product.services');
const userServices = require('../services/user.services');
const HttpResponse = require('../utils/http.response')
const config = require('../config')
const { GET_ALL_PRODUCTS_ERROR, GET_PRODUCT_ERROR, CREATE_PRODUCT_ERROR, UPDATE_PRODUCT_ERROR, REMOVE_PRODUCT_ERROR, PRODUCT_MOCK_ERROR, PRODUCT_REMOVE_UNAUTH } = require('../utils/errors.dictionary')
const logger = require('../utils/log.config')
const {send} = require('../services/email.services')


const httpResponse = new HttpResponse()


const getAll = async (req, res, next) => {
    try {
        const { limit, page, sort, query } = req.query
        const products = await productServices.getAll(limit, page, sort, query);

        if (products) return httpResponse.OK(res, products);
        else {
            return httpResponse.NOT_FOUND(res, GET_ALL_PRODUCTS_ERROR)
        }
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productServices.getById(id);
        if (product) return httpResponse.OK(res, product);
        else return httpResponse.NOT_FOUND(res, GET_PRODUCT_ERROR)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {

        let isPremium

        if (config.NODE_ENV !== 'test' ) { isPremium = (req.user.premium) ? true : false};
        
        const newProduct = req.body;

        if (isPremium) newProduct.owner = req.user._id 
        else newProduct.owner = "admin";

        const createdProduct = await productServices.create(newProduct);

        if (createdProduct) {
            return httpResponse.OK(res, createdProduct)
        }  
        else return httpResponse.INTERNAL_SERVER_ERROR(res, CREATE_PRODUCT_ERROR);
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const {id} = req.params;
        const obj = req.body;
        const updatedProduct = await productServices.update(id, obj);
        if(updatedProduct) return httpResponse.OK(res, updatedProduct);
        else return httpResponse.NOT_FOUND(res, UPDATE_PRODUCT_ERROR);
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const {id} = req.params;
        const isPremium = (req.user.premium) ? true : false;

        if(isPremium) {
            const product = await productServices.getById(id);
            const prouctOwner = product.owner;
            if(prouctOwner !== req.user._id.toString()) return httpResponse.UNAUTHORIZED(res, PRODUCT_REMOVE_UNAUTH)

            const ownerUser = await userServices.getCurrent(product.owner);
            send(ownerUser.email, 'Producto eliminado', `Producto : ${product._id} - ${product.name} - ${product.code}`)
        }

        const deletedProduct = await productServices.remove(id);
        if (deletedProduct) return httpResponse.OK(res, deletedProduct);
        else return httpResponse.NOT_FOUND(res, REMOVE_PRODUCT_ERROR)
    } catch (error) {
        next(error)
    }
}

const mock = async (req, res, next) => {
    try {
        const products = await productServices.productMock()
        if (products) return httpResponse.OK(res, products);
        else return httpResponse.INTERNAL_SERVER_ERROR(res, PRODUCT_MOCK_ERROR);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    mock
}
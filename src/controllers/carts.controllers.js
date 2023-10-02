const cartServices = require("../services/carts.services");
const HttpResponse = require("../utils/http.response");
const {
  CART_NOT_FOUND,
  CART_CREATE_ERROR,
  CART_ADD_PRODUCT_ERROR,
  CART_REMOVE_PRODUCT_ERROR,
  CART_UPDATE_QUANTITY_ERROR,
  CART_UPDATE_ERROR,
  CART_PURCHASE_ERROR,
} = require("../utils/errors.dictionary");
const logger = require("../utils/log.config");

const httpResponse = new HttpResponse();

const getById = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartServices.getById(cid);
    if (cart) {
      logger.info(`Carrito ${cid} obtenido.`);
      return httpResponse.OK(res, cart);
    } else {
      logger.warn("Se ha intentado obtener un carrito que no existe.");
      return httpResponse.NOT_FOUND(res, CART_NOT_FOUND);
    }
  } catch (error) {
    logger.error(`Ha ocurrido un error al inentar obtener el carrito`);
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const obj = req.body;
    const cart = await cartServices.create(obj);
    if (cart) {
      logger.info(`Carrito ${cart._id} creado.`);
      return httpResponse.OK(res, cart);
    } else {
      logger.warn("No se ha podido crear el carrito.");
      return httpResponse.INTERNAL_SERVER_ERROR(res, CART_CREATE_ERROR);
    }
  } catch (error) {
    logger.error(`Ha ocurrido un error al crear el carrito`);
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const productAdded = await cartServices.addProduct(cid, pid);
    if (!productAdded) {
      logger.warn(
        `No se ha podido agregar el producto ${pid} al carrito ${cid}`
      );
      return httpResponse.NOT_FOUND(res, CART_ADD_PRODUCT_ERROR);
    } else {
      logger.info(`Se ha agregado el producto ${pid} al carrito ${cid}`);
      return httpResponse.OK(res, productAdded);
    }
  } catch (error) {
    logger.info(
      `Se ha producido un error al intentar agregar el producto ${pid} al carrito ${cid}`
    );
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const productRemoved = await cartServices.removeProduct(cid, pid);
    if (productRemoved) return httpResponse.OK(res, productRemoved);
    else return httpResponse.NOT_FOUND(res, CART_REMOVE_PRODUCT_ERROR);
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const quantity = req.body.quantity;
    const quantityUpdated = await cartServices.updateQuantity(
      cid,
      pid,
      quantity
    );
    if (quantityUpdated) return httpResponse.OK(res, quantityUpdated);
    else return httpResponse.NOT_FOUND(res, CART_UPDATE_QUANTITY_ERROR);
  } catch (error) {
    next(error);
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const obj = req.body;
    const updatedCart = await cartServices.update(cid, obj);
    if (updatedCart) return httpResponse.OK(res, updatedCart);
    else return httpResponse.NOT_FOUND(res, CART_UPDATE_ERROR);
  } catch (error) {
    next(error);
  }
};

const purchase = async (req, res, next) => {
  try {
    const purchase = await cartServices.purchase(
      req.user.cartID,
      req.user.name
    );
    if (purchase) return httpResponse.OK(res, purchase);
    else return httpResponse.INTERNAL_SERVER_ERROR(res, CART_PURCHASE_ERROR);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  create,
  addProduct,
  removeProduct,
  updateQuantity,
  updateCart,
  purchase,
};

const {Router} = require('express');
const { getById, create, addProduct, removeProduct, updateQuantity, updateCart } = require('../controllers/carts.controllers')

const router = new Router();

router.get('/:cid', getById)
      .post('/', create)
      .post('/:cid/product/:pid', addProduct)
      .put('/:cid/product/:pid', updateQuantity)
      .put('/:cid', updateCart)
      .delete('/:cid/product/:pid', removeProduct)

module.exports = router;
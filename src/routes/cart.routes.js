const {Router} = require('express');
const {validateUser} = require('../middlewares/validateUser')
const { getById, create, addProduct, removeProduct, updateQuantity, updateCart } = require('../controllers/carts.controllers')

const router = new Router();

router.get('/:cid', getById)
      .post('/', create)
      .post('/:cid/product/:pid', validateUser, addProduct)
      .put('/:cid/product/:pid', validateUser, updateQuantity)
      .put('/:cid', updateCart)
      .delete('/:cid/product/:pid', removeProduct)

module.exports = router;
const { Router } = require('express');
const {validateAdmin} = require('../middlewares/validateUser')
const { getAll, getById, create, update, remove } = require('../controllers/product.controllers')

const router = new Router();

router.get('/', getAll)
      .get('/:id', getById)
      .post('/', validateAdmin, create)
      .put('/:id', validateAdmin, update)
      .delete('/:id', validateAdmin, remove);

module.exports = router;
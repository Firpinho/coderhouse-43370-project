const { Router } = require('express');
const { getAll, getById, create, update, remove } = require('../controllers/product.controllers')

const router = new Router();

router.get('/', getAll)
      .get('/:id', getById)
      .post('/', create)
      .put('/:id', update)
      .delete('/:id', remove);

module.exports = router;
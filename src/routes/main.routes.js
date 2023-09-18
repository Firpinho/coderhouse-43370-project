const { Router } = require('express');

const {loggedIn} = require('../middlewares/loggedIn')
const userRoutes = require('./user.routes');
const productRoutes = require('./product.routes');
const cartRoutes = require('./cart.routes');
const viewsRoutes = require('./views.routes')

class MainRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.use('/api/user', userRoutes);
        this.router.use('/api/products', loggedIn, productRoutes);
        this.router.use('/api/cart', loggedIn, cartRoutes);
        this.router.use('/', viewsRoutes)
    }

    getRouter() {
        return this.router;
    }
    
};

module.exports = MainRouter;
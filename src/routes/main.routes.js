const { Router } = require('express');

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
        this.router.use('/api/products', productRoutes);
        this.router.use('/api/cart', cartRoutes);
        this.router.use('/', viewsRoutes)
    }

    getRouter() {
        return this.router;
    }
    
};

module.exports = MainRouter;
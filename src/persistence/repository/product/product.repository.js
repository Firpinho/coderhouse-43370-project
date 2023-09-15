const {ProductDao} = require('../../daos/factory')
const ProductResDto = require('../../dtos/product/product.res.dto');


class ProductRepository { 
    constructor() {
        this.dao = ProductDao;
    }

    async getByIdDTO(id) {
        try {
            const response = await ProductDao.getById(id);
            console.log(response);
            return new ProductResDto(response);
        } catch (error) {
            console.log(error);
        }
    }   
}

module.exports = ProductRepository;
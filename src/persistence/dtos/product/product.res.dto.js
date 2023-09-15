class ProductResDto {
    constructor(product) {
        this.nombre = product.name
        this.precio = product.price
        this.disponibilidad = product.stock
    }
}

module.exports = ProductResDto
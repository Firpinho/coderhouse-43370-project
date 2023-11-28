class UserResDTO {
    constructor(user) {
        this.nombre = user.name
        this.email = user.email
        this.tipo = user.role
        this.premium = user.premium
        this.carrito = user.cartID
        this.ultima_conexion = user.last_online
    }
}

module.exports = UserResDTO
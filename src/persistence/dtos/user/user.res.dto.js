class UserResDTO {
    constructor(user) {
        this.nombre = user.name
        this.email = user.email
        this.tipo = user.role
        this.premium= user.premium
    }
}

module.exports = UserResDTO
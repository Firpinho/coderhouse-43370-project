class UserResDTO {
    constructor(user) {
        this.nombre = user.name
        this.email = user.email
        this.tipo = user.role
    }
}

module.exports = UserResDTO
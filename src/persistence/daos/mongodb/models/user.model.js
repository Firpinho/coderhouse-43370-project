const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    isGithub: {type: Boolean, required: true, default: false},
    isGoogle: {type: Boolean, required: true, default: false},
    cartID: {type: mongoose.Schema.Types.ObjectId, required: true}
})

module.exports = { UserModel : mongoose.model('users', userSchema)}
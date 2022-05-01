const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [ true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
    }
});


// Basicamente aqui se esta sobreescribiendo el metodo 
// toJSON el cual se llama al momento de utilizar el 
// modelo e imprimirlo como como un objeto o string
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario
}

module.exports = model('Usuario', UsuarioSchema);
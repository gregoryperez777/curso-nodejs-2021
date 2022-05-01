const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuarios = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt')

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    console.log('correo', correo);

    try {
        // verificar si el usuarios existe
        const usuario = await Usuarios.findOne({ correo });

        console.log('usuario', usuario);

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }
        
        // si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado'
            });
        }
        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        
        console.log('validPassword', validPassword);
        
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }

        // generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'algo salio mal'
        })
    }
};

module.exports = { 
    login
}

